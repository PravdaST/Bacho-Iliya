import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

const jsonResponse = (data: object, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

/**
 * GET - Fetch all winners from database
 */
export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminAuth(request)) {
      return unauthorizedResponse();
    }

    if (!isSupabaseConfigured()) {
      return jsonResponse({ success: false, error: 'Database not configured' }, 503);
    }

    const { data: winners, error } = await supabaseAdmin
      .from('giveaway_winners')
      .select('*')
      .order('draw_position', { ascending: true });

    if (error) {
      console.error('Failed to fetch winners:', error);
      return jsonResponse({ success: false, error: 'Failed to fetch winners' }, 500);
    }

    return jsonResponse({
      success: true,
      data: {
        winners: winners || [],
        count: winners?.length || 0,
      },
    });
  } catch (error) {
    console.error('Get winners error:', error);
    return jsonResponse({ success: false, error: 'Failed to fetch winners' }, 500);
  }
}

/**
 * DELETE - Clear all winners (for reset)
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!verifyAdminAuth(request)) {
      return unauthorizedResponse();
    }

    if (!isSupabaseConfigured()) {
      return jsonResponse({ success: false, error: 'Database not configured' }, 503);
    }

    const { error } = await supabaseAdmin
      .from('giveaway_winners')
      .delete()
      .neq('id', 0); // Delete all records

    if (error) {
      console.error('Failed to clear winners:', error);
      return jsonResponse({ success: false, error: 'Failed to clear winners' }, 500);
    }

    return jsonResponse({
      success: true,
      message: 'All winners cleared successfully',
    });
  } catch (error) {
    console.error('Clear winners error:', error);
    return jsonResponse({ success: false, error: 'Failed to clear winners' }, 500);
  }
}
