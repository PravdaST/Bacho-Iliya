import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/my-tickets/login?error=missing_token', request.url));
    }

    // Verify JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect(new URL('/my-tickets/login?error=invalid_token', request.url));
    }

    // Check token type
    if (decoded.type !== 'magic-link') {
      return NextResponse.redirect(new URL('/my-tickets/login?error=invalid_token', request.url));
    }

    // Create session token (expires in 7 days)
    const sessionToken = jwt.sign(
      {
        email: decoded.email,
        entryId: decoded.entryId,
        type: 'session',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to /my-tickets with session cookie
    const response = NextResponse.redirect(new URL('/my-tickets', request.url));

    // Set session cookie (httpOnly for security)
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('❌ Token verification error:', error);
    return NextResponse.redirect(new URL('/my-tickets/login?error=server_error', request.url));
  }
}
