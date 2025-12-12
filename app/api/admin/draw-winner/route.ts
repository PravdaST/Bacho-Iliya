import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

const jsonResponse = (data: object, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

interface DrawRequest {
  excludeEntryIds?: string[];
  drawPosition: number;
  testMode?: boolean;
}

/**
 * Calculate total entries for a participant
 */
function calculateTotalEntries(entry: any): number {
  const taskEntries =
    (entry.task_facebook ? 1 : 0) +
    (entry.task_instagram ? 1 : 0) +
    (entry.task_share ? 1 : 0);
  return 1 + taskEntries + (entry.referral_entries || 0);
}

/**
 * Get top N participants by total entries (guaranteed winners)
 */
function getTopParticipants(entries: any[], excludeIds: string[], position: number): any | null {
  // Filter out already drawn winners
  const eligibleEntries = entries
    .filter((entry) => !excludeIds.includes(entry.entry_id))
    .map((entry) => ({
      ...entry,
      total_entries: calculateTotalEntries(entry),
    }))
    .sort((a, b) => b.total_entries - a.total_entries);

  // Position 1 = index 0, Position 2 = index 1, etc.
  const index = position - 1;
  return eligibleEntries[index] || null;
}

/**
 * Weighted random selection - excludes already drawn winners
 */
function pickWeightedWinner(entries: any[], excludeIds: string[]): any | null {
  const eligibleEntries = entries.filter(
    (entry) => !excludeIds.includes(entry.entry_id)
  );

  if (eligibleEntries.length === 0) {
    return null;
  }

  const participants = eligibleEntries.map((entry) => ({
    ...entry,
    total_entries: calculateTotalEntries(entry),
  }));

  // Create weighted array
  const weightedPool: any[] = [];
  participants.forEach((participant) => {
    for (let i = 0; i < participant.total_entries; i++) {
      weightedPool.push(participant);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedPool.length);
  return weightedPool[randomIndex];
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminAuth(request)) {
      return unauthorizedResponse();
    }

    if (!isSupabaseConfigured()) {
      return jsonResponse({ success: false, error: 'Database not configured' }, 503);
    }

    const body: DrawRequest = await request.json();
    const { excludeEntryIds = [], drawPosition, testMode = false } = body;

    // Fetch all entries
    const { data: entries, error: entriesError } = await supabaseAdmin
      .from('giveaway_entries')
      .select('*');

    if (entriesError || !entries) {
      return jsonResponse({ success: false, error: 'Failed to fetch entries' }, 500);
    }

    if (entries.length === 0) {
      return jsonResponse({ success: false, error: 'No participants found' }, 400);
    }

    let winner: any;
    let isGuaranteed = false;

    // TOP 3 positions are GUARANTEED to the leaderboard leaders
    if (drawPosition <= 3) {
      winner = getTopParticipants(entries, excludeEntryIds, drawPosition);
      isGuaranteed = true;
    } else {
      // Positions 4-10 use weighted random selection
      winner = pickWeightedWinner(entries, excludeEntryIds);
    }

    if (!winner) {
      return jsonResponse({ success: false, error: 'No eligible participants remaining' }, 400);
    }

    // Save winner to database if not in test mode
    if (!testMode) {
      const { error: insertError } = await supabaseAdmin
        .from('giveaway_winners')
        .insert({
          entry_id: winner.entry_id,
          name: winner.name,
          email: winner.email,
          phone: winner.phone || '',
          prize_set: 'full_set',
          draw_position: drawPosition,
        });

      if (insertError) {
        console.error('Failed to save winner:', insertError);
      }
    }

    // Calculate remaining eligible participants
    const remainingCount = entries.filter(
      (e) => !excludeEntryIds.includes(e.entry_id) && e.entry_id !== winner.entry_id
    ).length;

    // Calculate total entries for statistics
    const totalEntriesSum = entries.reduce((sum, entry) => {
      return sum + calculateTotalEntries(entry);
    }, 0);

    return jsonResponse({
      success: true,
      testMode,
      isGuaranteed, // Flag to show if this was a guaranteed winner
      data: {
        winner: {
          entry_id: winner.entry_id,
          name: winner.name,
          email: winner.email,
          phone: winner.phone,
          total_entries: winner.total_entries,
          task_facebook: winner.task_facebook,
          task_instagram: winner.task_instagram,
          task_share: winner.task_share,
          referral_entries: winner.referral_entries || 0,
        },
        statistics: {
          total_participants: entries.length,
          remaining_participants: remainingCount,
          total_entries: totalEntriesSum,
          winner_probability: isGuaranteed
            ? 'TOP ' + drawPosition + ' (Гарантиран)'
            : ((winner.total_entries / totalEntriesSum) * 100).toFixed(2) + '%',
          draw_position: drawPosition,
        },
      },
    });
  } catch (error) {
    console.error('Draw winner error:', error);
    return jsonResponse({ success: false, error: 'Failed to draw winner' }, 500);
  }
}
