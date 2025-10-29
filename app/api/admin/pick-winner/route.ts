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

/**
 * Weighted random selection
 * Each participant gets multiple "tickets" based on their total entries
 */
function pickWeightedWinner(entries: any[]): any {
  // Calculate total entries for each participant
  const participants = entries.map((entry) => {
    const taskEntries =
      (entry.task_facebook ? 1 : 0) + (entry.task_instagram ? 1 : 0) + (entry.task_share ? 1 : 0);
    const totalEntries = 1 + taskEntries + (entry.referral_entries || 0);

    return {
      ...entry,
      total_entries: totalEntries,
    };
  });

  // Create weighted array (each participant appears multiple times based on entries)
  const weightedPool: any[] = [];
  participants.forEach((participant) => {
    for (let i = 0; i < participant.total_entries; i++) {
      weightedPool.push(participant);
    }
  });

  // Pick random winner from weighted pool
  const randomIndex = Math.floor(Math.random() * weightedPool.length);
  const winner = weightedPool[randomIndex];

  return winner;
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!verifyAdminAuth(request)) {
      return unauthorizedResponse();
    }

    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      return jsonResponse(
        {
          success: false,
          error: 'Базата данни не е конфигурирана',
        },
        503
      );
    }

    console.log('🎲 Admin: Picking random winner...');

    // Fetch all entries
    const { data: entries, error } = await supabaseAdmin.from('giveaway_entries').select('*');

    if (error) {
      console.error('❌ Error fetching entries:', error);
      return jsonResponse(
        {
          success: false,
          error: 'Грешка при зареждане на участията',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        500
      );
    }

    if (!entries || entries.length === 0) {
      return jsonResponse(
        {
          success: false,
          error: 'Няма регистрирани участници',
        },
        400
      );
    }

    // Pick weighted random winner
    const winner = pickWeightedWinner(entries);

    // Calculate statistics
    const totalParticipants = entries.length;
    const totalEntriesSum = entries.reduce((sum, entry) => {
      const taskEntries =
        (entry.task_facebook ? 1 : 0) + (entry.task_instagram ? 1 : 0) + (entry.task_share ? 1 : 0);
      return sum + (1 + taskEntries + (entry.referral_entries || 0));
    }, 0);

    // Parse winner's selected products
    let selectedProducts = [];
    try {
      selectedProducts = JSON.parse(winner.selected_products || '[]');
    } catch (e) {
      selectedProducts = [];
    }

    console.log('🏆 Winner selected:', {
      name: winner.name,
      entry_id: winner.entry_id,
      total_entries: winner.total_entries,
    });

    return jsonResponse(
      {
        success: true,
        message: 'Победителят е избран успешно!',
        data: {
          winner: {
            id: winner.id,
            entry_id: winner.entry_id,
            name: winner.name,
            email: winner.email,
            phone: winner.phone,
            selected_products: selectedProducts,
            total_entries: winner.total_entries,
            task_facebook: winner.task_facebook,
            task_instagram: winner.task_instagram,
            task_share: winner.task_share,
            referral_count: winner.referral_count || 0,
            referral_entries: winner.referral_entries || 0,
            submitted_at: winner.submitted_at,
          },
          statistics: {
            total_participants: totalParticipants,
            total_entries: totalEntriesSum,
            winner_probability: ((winner.total_entries / totalEntriesSum) * 100).toFixed(2) + '%',
          },
        },
      },
      200
    );
  } catch (error) {
    console.error('❌ Pick winner error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return jsonResponse(
      {
        success: false,
        error: 'Грешка при избор на победител',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      500
    );
  }
}
