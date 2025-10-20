import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken, extractTokenFromHeader } from './auth-utils';

/**
 * Verify admin authentication from request headers using JWT
 * Returns true if authenticated with valid JWT token, false otherwise
 */
export function verifyAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    console.warn('⚠️ No authorization header provided');
    return false;
  }

  // Extract token from "Bearer <token>" format
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    console.warn('⚠️ Invalid authorization header format');
    return false;
  }

  // Verify JWT token
  const decoded = verifyAuthToken(token);

  if (!decoded) {
    console.warn('⚠️ Invalid or expired JWT token');
    return false;
  }

  // Check if user has admin role
  if (decoded.role !== 'admin') {
    console.warn('⚠️ User does not have admin role');
    return false;
  }

  console.log('✅ Admin authentication verified');
  return true;
}

/**
 * Get unauthorized response for API endpoints
 */
export function unauthorizedResponse() {
  return new NextResponse(JSON.stringify({
    success: false,
    error: 'Неоторизиран достъп. Моля, влезте отново.',
  }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
