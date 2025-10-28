import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface SessionData {
  email: string;
  entryId: string;
  type: 'session';
}

/**
 * Validates session cookie and returns decoded session data
 * Returns null if session is invalid or expired
 */
export async function validateSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return null;
    }

    const decoded = jwt.verify(sessionCookie.value, JWT_SECRET) as SessionData;

    // Check if it's a session token
    if (decoded.type !== 'session') {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}

/**
 * Clears session cookie
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
