import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

// Helper to create JSON response
const jsonResponse = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!verifyAdminAuth(request)) {
      return unauthorizedResponse();
    }

    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      return jsonResponse({
        success: false,
        error: 'Базата данни не е конфигурирана',
      }, 503);
    }

    // Get query parameters for sorting and filtering
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'submitted_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const searchQuery = searchParams.get('search') || '';

    console.log('📊 Admin: Fetching all giveaway entries', {
      sortBy,
      sortOrder,
      searchQuery,
    });

    // Build query
    let query = supabaseAdmin
      .from('giveaway_entries')
      .select('*');

    // Apply search filter if provided
    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data: entries, error } = await query;

    if (error) {
      console.error('❌ Error fetching entries:', error);
      return jsonResponse({
        success: false,
        error: 'Грешка при зареждане на участията',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      }, 500);
    }

    // Calculate total entries per participant (for winner selection)
    const enrichedEntries = entries?.map((entry) => {
      // Base entry: 1
      // + completed tasks: 3 (1 per task if all completed)
      // + referral entries: from referral_entries field
      const taskEntries =
        (entry.task_facebook ? 1 : 0) +
        (entry.task_instagram ? 1 : 0) +
        (entry.task_share ? 1 : 0);

      const totalEntries = 1 + taskEntries + (entry.referral_entries || 0);

      return {
        ...entry,
        total_entries: totalEntries,
        selected_products_parsed: entry.selected_products
          ? JSON.parse(entry.selected_products)
          : [],
      };
    });

    console.log(`✅ Found ${enrichedEntries?.length || 0} entries`);

    return jsonResponse({
      success: true,
      data: {
        entries: enrichedEntries,
        total: enrichedEntries?.length || 0,
      },
    }, 200);

  } catch (error) {
    console.error('❌ Admin entries error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return jsonResponse({
      success: false,
      error: 'Грешка при зареждане на участията',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    }, 500);
  }
}
