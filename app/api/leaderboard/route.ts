import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to anonymize name (e.g., "Иван Петров" → "Иван П.")
function anonymizeName(fullName: string): string {
  const parts = fullName.trim().split(' ');
  if (parts.length === 0) return 'Анонимен';
  if (parts.length === 1) return parts[0];

  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1].charAt(0);

  return `${firstName} ${lastInitial}.`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const currentUserEntryId = searchParams.get('entryId');

    // Fetch top participants from Supabase
    const { data, error } = await supabase
      .from('giveaway_entries')
      .select('entry_id, name, email, tickets_count, submitted_at')
      .order('tickets_count', { ascending: false })
      .order('submitted_at', { ascending: true }) // Earlier registration wins ties
      .limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leaderboard data' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          entries: [],
          currentUserRank: null,
          total: 0,
        },
      });
    }

    // Build leaderboard entries
    const entries = data.map((entry, index) => ({
      rank: index + 1,
      name: anonymizeName(entry.name),
      tickets: entry.tickets_count || 1,
      isCurrentUser: currentUserEntryId === entry.entry_id,
    }));

    // Find current user's rank if not in top 10
    let currentUserRank: number | null = null;
    let currentUserTickets: number | null = null;

    if (currentUserEntryId) {
      const userInTop = entries.find((e) => e.isCurrentUser);

      if (!userInTop) {
        // User not in top 10, find their actual rank
        const { data: allEntries, error: rankError } = await supabase
          .from('giveaway_entries')
          .select('entry_id, tickets_count')
          .order('tickets_count', { ascending: false })
          .order('submitted_at', { ascending: true });

        if (!rankError && allEntries) {
          const userIndex = allEntries.findIndex((e) => e.entry_id === currentUserEntryId);
          if (userIndex !== -1) {
            currentUserRank = userIndex + 1;
            currentUserTickets = allEntries[userIndex].tickets_count || 1;
          }
        }
      }
    }

    // Get total participant count
    const { count: totalCount, error: countError } = await supabase
      .from('giveaway_entries')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      data: {
        entries,
        currentUserRank,
        currentUserTickets,
        total: totalCount || data.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
