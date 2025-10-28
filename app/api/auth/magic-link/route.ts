import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { sendMagicLinkEmail } from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email е задължителен' },
        { status: 400 }
      );
    }

    // Check if user exists in database
    const { data: user, error } = await supabase
      .from('giveaway_entries')
      .select('entry_id, name, email')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: 'Този имейл не е регистриран в раздаването' },
        { status: 404 }
      );
    }

    // Generate JWT token (expires in 15 minutes)
    const token = jwt.sign(
      {
        email: user.email,
        entryId: user.entry_id,
        type: 'magic-link',
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Create magic link URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const loginUrl = `${baseUrl}/api/auth/verify?token=${token}`;

    // Send email with magic link
    const emailResult = await sendMagicLinkEmail({
      email: user.email,
      name: user.name,
      loginUrl,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: 'Грешка при изпращане на имейл' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Magic link изпратен на имейла ти! Провери входящата си поща.',
    });
  } catch (error) {
    console.error('❌ Magic link error:', error);
    return NextResponse.json(
      { success: false, error: 'Грешка при генериране на magic link' },
      { status: 500 }
    );
  }
}
