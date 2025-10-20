-- ============================================
-- BACHO ILIYA - DATABASE SETUP
-- ============================================
-- Run this SQL in Supabase Dashboard:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project: lrtbkvbmciqalpfvxxrh
-- 3. Click "SQL Editor" in left menu
-- 4. Click "New Query"
-- 5. Copy and paste this entire file
-- 6. Click "Run" button
-- ============================================

-- ============================================
-- GIVEAWAY ENTRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS giveaway_entries (
  id SERIAL PRIMARY KEY,
  entry_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  selected_products TEXT NOT NULL,
  task_facebook BOOLEAN DEFAULT false NOT NULL,
  task_instagram BOOLEAN DEFAULT false NOT NULL,
  task_share BOOLEAN DEFAULT false NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_entry_id ON giveaway_entries(entry_id);
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_email ON giveaway_entries(email);
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_submitted_at ON giveaway_entries(submitted_at);

-- Add comment
COMMENT ON TABLE giveaway_entries IS 'Stores all giveaway entries from users';

-- ============================================
-- QUIZ RESPONSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_responses (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  weapon VARCHAR(255) NOT NULL,
  motivation VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_city ON quiz_responses(city);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_submitted_at ON quiz_responses(submitted_at);

-- Add comment
COMMENT ON TABLE quiz_responses IS 'Stores quiz responses from users';

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
-- This ensures data security at the database level

ALTER TABLE giveaway_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================
-- Allow anyone to insert (register for giveaway)
CREATE POLICY "Anyone can insert giveaway entries"
  ON giveaway_entries
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to insert quiz responses
CREATE POLICY "Anyone can insert quiz responses"
  ON quiz_responses
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update/delete (for admin panel later)
CREATE POLICY "Service role can do everything on giveaway_entries"
  ON giveaway_entries
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on quiz_responses"
  ON quiz_responses
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'Database tables created successfully! ✅' AS message;

-- Show table counts
SELECT
  'giveaway_entries' AS table_name,
  COUNT(*) AS row_count
FROM giveaway_entries
UNION ALL
SELECT
  'quiz_responses' AS table_name,
  COUNT(*) AS row_count
FROM quiz_responses;
