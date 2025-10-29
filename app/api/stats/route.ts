import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic'; // Disable caching for real-time data
export const revalidate = 0;

// Helper to create JSON response
const jsonResponse = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
};

// Helper to format time ago
function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'преди малко';
  if (diffMins < 60) return `преди ${diffMins} ${diffMins === 1 ? 'минута' : 'минути'}`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `преди ${diffHours} ${diffHours === 1 ? 'час' : 'часа'}`;

  const diffDays = Math.floor(diffHours / 24);
  return `преди ${diffDays} ${diffDays === 1 ? 'ден' : 'дни'}`;
}

export async function GET() {
  try {
    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      return jsonResponse(
        {
          success: false,
          error: 'Database not configured',
        },
        503
      );
    }

    // Get total count
    const { count: totalCount, error: countError } = await supabaseAdmin
      .from('giveaway_entries')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error getting total count:', countError);
      return jsonResponse(
        {
          success: false,
          error: 'Failed to get statistics',
        },
        500
      );
    }

    // Get recent entries (last 5)
    const { data: recentEntries, error: recentError } = await supabaseAdmin
      .from('giveaway_entries')
      .select('name, submitted_at')
      .order('submitted_at', { ascending: false })
      .limit(5);

    if (recentError) {
      console.error('❌ Error getting recent entries:', recentError);
    }

    // Format recent entries
    const formattedRecent =
      recentEntries?.map((entry) => {
        // Extract first name only
        const firstName = entry.name.split(' ')[0];

        return {
          name: firstName,
          timeAgo: timeAgo(entry.submitted_at),
        };
      }) || [];

    // Get product popularity (count selected_products array)
    const { data: allEntries, error: productsError } = await supabaseAdmin
      .from('giveaway_entries')
      .select('selected_products');

    let productStats: Record<string, number> = {};

    if (!productsError && allEntries) {
      allEntries.forEach((entry) => {
        try {
          const products = JSON.parse(entry.selected_products);
          products.forEach((productId: string) => {
            productStats[productId] = (productStats[productId] || 0) + 1;
          });
        } catch {
          // Skip invalid JSON
        }
      });
    }

    // Sort products by popularity
    const topProducts = Object.entries(productStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id, count]) => ({ id, count }));

    return jsonResponse({
      success: true,
      data: {
        totalParticipants: totalCount || 0,
        recentEntries: formattedRecent,
        topProducts,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Unexpected error in stats API:', error);
    return jsonResponse(
      {
        success: false,
        error: 'Internal server error',
      },
      500
    );
  }
}
