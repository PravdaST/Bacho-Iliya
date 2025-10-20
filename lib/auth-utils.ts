/**
 * Authentication Utilities
 * Handles password hashing, verification, and JWT token management
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Constants
const SALT_ROUNDS = 12; // Higher = more secure but slower
const JWT_EXPIRATION = '30m'; // 30 minutes
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-change-in-production';

// Types
export interface AuthToken {
  userId: string;
  role: 'admin';
  iat: number;
  exp: number;
}

export interface RateLimitStore {
  [key: string]: {
    attempts: number;
    lastAttempt: number;
    lockedUntil?: number;
  };
}

// ==================================
// PASSWORD HASHING
// ==================================

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verify a password against a hash
 * @param password - Plain text password to verify
 * @param hash - Hashed password to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

/**
 * Check if password meets security requirements
 * @param password - Password to validate
 * @returns Object with validation result and error message
 */
export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
} {
  if (!password || password.length < 12) {
    return {
      valid: false,
      error: 'Password must be at least 12 characters long',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one number',
    };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one special character',
    };
  }

  return { valid: true };
}

// ==================================
// JWT TOKEN MANAGEMENT
// ==================================

/**
 * Generate a JWT token for authenticated admin
 * @param userId - Admin user identifier
 * @returns Signed JWT token
 */
export function generateAuthToken(userId: string = 'admin'): string {
  try {
    const payload = {
      userId,
      role: 'admin',
    };

    const token = jwt.sign(payload, SESSION_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate auth token');
  }
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyAuthToken(token: string): AuthToken | null {
  try {
    const decoded = jwt.verify(token, SESSION_SECRET) as AuthToken;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.warn('JWT token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.warn('Invalid JWT token');
    } else {
      console.error('Error verifying JWT token:', error);
    }
    return null;
  }
}

/**
 * Extract JWT token from Authorization header
 * @param authHeader - Authorization header value
 * @returns Token string or null
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  return token;
}

// ==================================
// RATE LIMITING
// ==================================

// In-memory rate limit store (use Redis in production)
const rateLimitStore: RateLimitStore = {};

const MAX_ATTEMPTS = 5; // Maximum login attempts
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const RESET_WINDOW = 60 * 1000; // 1 minute - reset counter after this time

/**
 * Check if IP/identifier is rate limited
 * @param identifier - IP address or user identifier
 * @returns Object with rate limit status
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockedUntil?: Date;
  error?: string;
} {
  const now = Date.now();
  const record = rateLimitStore[identifier];

  // No previous attempts
  if (!record) {
    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS,
    };
  }

  // Check if currently locked out
  if (record.lockedUntil && now < record.lockedUntil) {
    const lockedUntilDate = new Date(record.lockedUntil);
    return {
      allowed: false,
      remainingAttempts: 0,
      lockedUntil: lockedUntilDate,
      error: `Too many failed attempts. Try again after ${lockedUntilDate.toLocaleTimeString()}`,
    };
  }

  // Reset if past the reset window
  if (now - record.lastAttempt > RESET_WINDOW) {
    delete rateLimitStore[identifier];
    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS,
    };
  }

  // Calculate remaining attempts
  const remainingAttempts = MAX_ATTEMPTS - record.attempts;

  if (remainingAttempts <= 0) {
    // Lock the account
    const lockedUntil = now + LOCKOUT_DURATION;
    rateLimitStore[identifier].lockedUntil = lockedUntil;

    return {
      allowed: false,
      remainingAttempts: 0,
      lockedUntil: new Date(lockedUntil),
      error: `Too many failed attempts. Try again in 15 minutes.`,
    };
  }

  return {
    allowed: true,
    remainingAttempts,
  };
}

/**
 * Record a failed login attempt
 * @param identifier - IP address or user identifier
 */
export function recordFailedAttempt(identifier: string): void {
  const now = Date.now();
  const record = rateLimitStore[identifier];

  if (!record) {
    rateLimitStore[identifier] = {
      attempts: 1,
      lastAttempt: now,
    };
  } else {
    rateLimitStore[identifier] = {
      ...record,
      attempts: record.attempts + 1,
      lastAttempt: now,
    };
  }
}

/**
 * Clear rate limit record for successful login
 * @param identifier - IP address or user identifier
 */
export function clearRateLimit(identifier: string): void {
  delete rateLimitStore[identifier];
}

/**
 * Clean up expired rate limit records (call periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();

  Object.keys(rateLimitStore).forEach((key) => {
    const record = rateLimitStore[key];

    // Remove if past lockout and past reset window
    if (
      (!record.lockedUntil || now > record.lockedUntil) &&
      now - record.lastAttempt > RESET_WINDOW
    ) {
      delete rateLimitStore[key];
    }
  });
}

// ==================================
// UTILITY FUNCTIONS
// ==================================

/**
 * Get client IP address from request
 * @param headers - Request headers
 * @returns IP address
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

// Clean up rate limit store every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
