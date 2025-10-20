-- ============================================
-- BACHO ILIA GIVEAWAY DATABASE MIGRATION
-- ============================================
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/lrtbkvbmciqalpfvxxrh/editor)

-- ============================================
-- 1. GIVEAWAY ENTRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS giveaway_entries (
  id SERIAL PRIMARY KEY,
  entry_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  selected_products TEXT NOT NULL, -- JSON array of product IDs
  task_facebook BOOLEAN NOT NULL DEFAULT false,
  task_instagram BOOLEAN NOT NULL DEFAULT false,
  task_share BOOLEAN NOT NULL DEFAULT false,
  share_count INTEGER NOT NULL DEFAULT 0, -- Track number of times user shared (for extra entries)
  user_agent TEXT,
  ip_address VARCHAR(45), -- IPv4 or IPv6
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_email ON giveaway_entries(email);
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_entry_id ON giveaway_entries(entry_id);
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_submitted_at ON giveaway_entries(submitted_at DESC);

-- ============================================
-- 2. QUIZ RESPONSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_responses (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  weapon VARCHAR(255) NOT NULL,
  motivation VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_submitted_at ON quiz_responses(submitted_at DESC);

-- ============================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS for both tables
ALTER TABLE giveaway_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for giveaway_entries
CREATE POLICY "Allow service role full access to giveaway_entries"
  ON giveaway_entries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated insert to giveaway_entries"
  ON giveaway_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for quiz_responses
CREATE POLICY "Allow service role full access to quiz_responses"
  ON quiz_responses
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated insert to quiz_responses"
  ON quiz_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================
-- 4. VERIFICATION QUERIES
-- ============================================
-- Run these to verify the migration worked:

-- Check giveaway_entries structure
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'giveaway_entries';

-- Check quiz_responses structure
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'quiz_responses';

-- Test insert into giveaway_entries
-- INSERT INTO giveaway_entries (entry_id, name, email, phone, selected_products)
-- VALUES ('TEST-001', 'Test User', 'test@example.com', '0888123456', '["sirene", "kashkaval"]');

-- View recent entries
-- SELECT * FROM giveaway_entries ORDER BY submitted_at DESC LIMIT 5;
