-- ============================================
-- BACHO ILIYA - REFERRAL SYSTEM MIGRATION
-- ============================================
-- Run this SQL in Supabase Dashboard to add referral tracking
-- SQL Editor -> New Query -> Paste -> Run
-- ============================================

-- Add referral tracking columns to giveaway_entries
ALTER TABLE giveaway_entries
  ADD COLUMN IF NOT EXISTS share_count INTEGER DEFAULT 0 NOT NULL,
  ADD COLUMN IF NOT EXISTS referred_by VARCHAR(50),
  ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0 NOT NULL,
  ADD COLUMN IF NOT EXISTS referral_entries INTEGER DEFAULT 0 NOT NULL;

-- Add index for referral lookups
CREATE INDEX IF NOT EXISTS idx_giveaway_entries_referred_by
  ON giveaway_entries(referred_by);

-- Add comments
COMMENT ON COLUMN giveaway_entries.share_count IS 'Number of times user shared (for tracking social engagement)';
COMMENT ON COLUMN giveaway_entries.referred_by IS 'Entry ID of the user who referred this participant';
COMMENT ON COLUMN giveaway_entries.referral_count IS 'Number of people this user successfully referred';
COMMENT ON COLUMN giveaway_entries.referral_entries IS 'Bonus entries earned through referrals (+3 per referral)';

-- Success message
SELECT 'Referral tracking columns added successfully! ✅' AS message;

-- Show updated schema
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'giveaway_entries'
  AND column_name IN ('share_count', 'referred_by', 'referral_count', 'referral_entries')
ORDER BY column_name;
