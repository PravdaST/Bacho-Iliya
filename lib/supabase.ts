import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Create Supabase client for server-side operations
// Using service role key for admin access (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// TypeScript types for database tables

// Ticket history entry type
export type TicketHistoryEntry = {
  type: 'registration' | 'referral';
  tickets: number;
  date: string;
  description: string;
};

export type GiveawayEntry = {
  id?: number;
  entry_id: string;
  name: string;
  email: string;
  phone: string;
  selected_products: string; // JSON string
  task_facebook: boolean;
  task_instagram: boolean;
  task_share: boolean;
  share_count: number; // Track number of times user shared (for extra entries)
  referred_by?: string | null; // Entry ID of the referrer
  referral_count: number; // Number of people this user referred
  referral_entries: number; // Bonus entries from referrals (+3 per referral)
  tickets_count?: number | null; // Total lottery tickets (1 base + 3 per referral)
  tickets_history?: TicketHistoryEntry[] | null; // Array of ticket earning history (JSONB)
  user_agent?: string | null;
  ip_address?: string | null;
  submitted_at?: string;
};

export type QuizResponse = {
  id?: number;
  city: string;
  weapon: string;
  motivation: string;
  email: string;
  user_agent?: string | null;
  ip_address?: string | null;
  submitted_at?: string;
};

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseServiceKey);
};

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabaseAdmin.from('giveaway_entries').select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Supabase connection test failed:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Supabase connection test failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
};
