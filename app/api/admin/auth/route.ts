import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPassword,
  validatePassword,
  generateAuthToken,
  verifyAuthToken,
  extractTokenFromHeader,
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  getClientIP,
} from '@/lib/auth-utils';

// Helper to create JSON response
const jsonResponse = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // Security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  });
};

/**
 * POST /api/admin/auth
 * Admin login endpoint with bcrypt password verification and JWT token generation
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Admin login attempt');

    // Get client IP for rate limiting
    const clientIP = getClientIP(request.headers);
    console.log('📍 Client IP:', clientIP);

    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      console.warn(`⚠️ Rate limit exceeded for IP: ${clientIP}`);
      return jsonResponse(
        {
          success: false,
          error: rateLimitCheck.error || 'Too many login attempts. Please try again later.',
          lockedUntil: rateLimitCheck.lockedUntil,
        },
        429
      ); // 429 Too Many Requests
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      recordFailedAttempt(clientIP);
      return jsonResponse(
        {
          success: false,
          error: 'Невалидни данни в заявката',
        },
        400
      );
    }

    const { password } = body;

    // Validate input
    if (!password) {
      recordFailedAttempt(clientIP);
      return jsonResponse(
        {
          success: false,
          error: 'Паролата е задължителна',
        },
        400
      );
    }

    // Check password strength (optional, good for debugging)
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      console.warn('⚠️ Weak password attempt:', passwordValidation.error);
      // Don't return the validation error to avoid giving hints to attackers
      // Instead, just say invalid password
    }

    // Get admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD not configured in .env.local');
      return jsonResponse(
        {
          success: false,
          error: 'Администраторската парола не е конфигурирана',
        },
        503
      ); // 503 Service Unavailable
    }

    // DEBUG: Log hash format (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 ADMIN_PASSWORD starts with:', adminPassword.substring(0, 20) + '...');
      console.log('🔍 Hash is bcrypt format:', adminPassword.startsWith('$2b$'));
    }

    // Verify password (constant-time comparison via bcrypt)
    const isPasswordValid = await verifyPassword(password, adminPassword);

    if (!isPasswordValid) {
      console.warn(`❌ Invalid password attempt from IP: ${clientIP}`);
      recordFailedAttempt(clientIP);

      const remainingAttempts = checkRateLimit(clientIP).remainingAttempts;

      return jsonResponse(
        {
          success: false,
          error: 'Невалидна парола',
          remainingAttempts,
          hint: remainingAttempts <= 2 ? `Остават ${remainingAttempts} опита` : undefined,
        },
        401
      ); // 401 Unauthorized
    }

    // Success! Clear rate limit and generate JWT token
    clearRateLimit(clientIP);
    const authToken = generateAuthToken('admin');

    console.log('✅ Admin login successful from IP:', clientIP);

    return jsonResponse(
      {
        success: true,
        message: 'Успешно влизане',
        authToken,
        expiresIn: '30m',
      },
      200
    );
  } catch (error) {
    console.error('❌ Admin auth error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return jsonResponse(
      {
        success: false,
        error: 'Грешка при автентикация',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      500
    );
  }
}

/**
 * GET /api/admin/auth
 * Verify JWT token validity
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Verifying admin token');

    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return jsonResponse(
        {
          success: false,
          error: 'Липсва authorization header',
        },
        401
      );
    }

    // Extract token from header
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return jsonResponse(
        {
          success: false,
          error: 'Невалиден authorization header формат',
        },
        401
      );
    }

    // Verify JWT token
    const decoded = verifyAuthToken(token);

    if (!decoded) {
      console.warn('❌ Invalid or expired token');
      return jsonResponse(
        {
          success: false,
          error: 'Невалиден или изтекъл токен',
        },
        401
      );
    }

    // Check if token is about to expire (< 5 minutes left)
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;
    const shouldRefresh = timeLeft < 5 * 60; // Less than 5 minutes

    console.log('✅ Token verified successfully');

    return jsonResponse(
      {
        success: true,
        message: 'Токенът е валиден',
        user: {
          userId: decoded.userId,
          role: decoded.role,
        },
        expiresAt: new Date(decoded.exp * 1000).toISOString(),
        shouldRefresh,
      },
      200
    );
  } catch (error) {
    console.error('❌ Token verification error:', error);
    return jsonResponse(
      {
        success: false,
        error: 'Грешка при проверка на токена',
      },
      500
    );
  }
}

/**
 * PUT /api/admin/auth
 * Refresh JWT token (extend session)
 */
export async function PUT(request: NextRequest) {
  try {
    console.log('🔄 Refreshing admin token');

    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return jsonResponse(
        {
          success: false,
          error: 'Липсва authorization header',
        },
        401
      );
    }

    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return jsonResponse(
        {
          success: false,
          error: 'Невалиден authorization header формат',
        },
        401
      );
    }

    // Verify current token
    const decoded = verifyAuthToken(token);

    if (!decoded) {
      return jsonResponse(
        {
          success: false,
          error: 'Невалиден или изтекъл токен',
        },
        401
      );
    }

    // Generate new token
    const newToken = generateAuthToken(decoded.userId);

    console.log('✅ Token refreshed successfully');

    return jsonResponse(
      {
        success: true,
        message: 'Токенът е обновен',
        authToken: newToken,
        expiresIn: '30m',
      },
      200
    );
  } catch (error) {
    console.error('❌ Token refresh error:', error);
    return jsonResponse(
      {
        success: false,
        error: 'Грешка при обновяване на токена',
      },
      500
    );
  }
}
