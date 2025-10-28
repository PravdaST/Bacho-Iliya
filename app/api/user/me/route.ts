import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateSession } from '@/lib/auth-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Validate session
    const session = await validateSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Не си logged in' },
        { status: 401 }
      );
    }

    // Fetch user data from database
    const { data: user, error } = await supabase
      .from('giveaway_entries')
      .select('*')
      .eq('entry_id', session.entryId)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: 'Потребителят не е намерен' },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json({
      success: true,
      data: {
        entryId: user.entry_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        selectedProducts: user.selected_products,
        ticketsCount: user.tickets_count || 1,
        ticketsHistory: user.tickets_history || [],
        referralCount: user.referral_count || 0,
        submittedAt: user.submitted_at,
      },
    });
  } catch (error) {
    console.error('❌ User data fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Грешка при извличане на данни' },
      { status: 500 }
    );
  }
}
