/**
 * Gamification & Referral System Utilities
 *
 * Provides comprehensive gamification features for the Bacho Ilia giveaway:
 * - Referral code generation and validation
 * - Achievement badge system (Bronze → Platinum)
 * - Leaderboard calculations
 * - Milestone celebrations
 * - User stats tracking
 *
 * @module gamification
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ReferralCode {
  code: string;
  generatedAt: Date;
  userId?: string;
}

export interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  bonusEntries: number;
  rank?: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  description: string;
  icon: string;
  requiredReferrals: number;
  earned: boolean;
  earnedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  referralCount: number;
  bonusEntries: number;
  badges: Badge[];
  isCurrentUser?: boolean;
}

export interface MilestoneMessage {
  title: string;
  message: string;
  emoji: string;
  celebrationType: 'confetti' | 'fireworks' | 'sparkles';
}

// ============================================
// BADGE SYSTEM CONFIGURATION
// ============================================

export const BADGE_TIERS: Omit<Badge, 'earned' | 'earnedAt'>[] = [
  {
    id: 'bronze-starter',
    name: 'Бронзов Новобранец',
    level: 'bronze',
    description: 'Сподели с първия си приятел',
    icon: '🥉',
    requiredReferrals: 1,
  },
  {
    id: 'bronze-enthusiast',
    name: 'Бронзов Ентусиаст',
    level: 'bronze',
    description: 'Покани 3 приятели',
    icon: '🥉',
    requiredReferrals: 3,
  },
  {
    id: 'silver-influencer',
    name: 'Сребърен Влиятел',
    level: 'silver',
    description: 'Покани 5 приятели',
    icon: '🥈',
    requiredReferrals: 5,
  },
  {
    id: 'silver-champion',
    name: 'Сребърен Шампион',
    level: 'silver',
    description: 'Покани 10 приятели',
    icon: '🥈',
    requiredReferrals: 10,
  },
  {
    id: 'gold-legend',
    name: 'Златна Легенда',
    level: 'gold',
    description: 'Покани 20 приятели',
    icon: '🥇',
    requiredReferrals: 20,
  },
  {
    id: 'platinum-master',
    name: 'Платинен Майстор',
    level: 'platinum',
    description: 'Покани 50+ приятели - Върхов постижение!',
    icon: '💎',
    requiredReferrals: 50,
  },
];

// ============================================
// REFERRAL CODE GENERATION
// ============================================

/**
 * Generates a unique referral code from user's email and timestamp
 *
 * Format: FIRSTFOUR-TIMESTAMP6 (e.g., "JOHN-A3F9K2")
 *
 * @param email - User's email address
 * @returns Unique referral code string
 */
export function generateReferralCode(email: string): string {
  if (!email || typeof email !== 'string') {
    throw new Error('Valid email is required to generate referral code');
  }

  // Extract first part of email before @
  const emailPart = email.split('@')[0].toUpperCase();

  // Take first 4 characters (or pad if shorter)
  const prefix = emailPart.substring(0, 4).padEnd(4, 'X');

  // Generate 6-character suffix from timestamp + random
  const timestamp = Date.now().toString(36).slice(-3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  const suffix = timestamp + random;

  return `${prefix}-${suffix}`;
}

/**
 * Validates referral code format
 *
 * @param code - Referral code to validate
 * @returns true if valid format
 */
export function isValidReferralCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;

  // Check format: XXXX-XXXXXX (4 chars, dash, 6 chars)
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{6}$/;
  return pattern.test(code);
}

// ============================================
// BADGE CALCULATION
// ============================================

/**
 * Calculates which badges a user has earned based on referral count
 *
 * @param referralCount - Number of successful referrals
 * @param previousBadges - Previously earned badges (optional)
 * @returns Array of Badge objects with earned status
 */
export function calculateEarnedBadges(referralCount: number, previousBadges?: Badge[]): Badge[] {
  return BADGE_TIERS.map((tier) => {
    const earned = referralCount >= tier.requiredReferrals;

    // Preserve earnedAt date if badge was previously earned
    const previousBadge = previousBadges?.find((b) => b.id === tier.id);
    const earnedAt = previousBadge?.earnedAt || (earned ? new Date() : undefined);

    return {
      ...tier,
      earned,
      earnedAt,
    };
  });
}

/**
 * Gets the next badge the user can earn
 *
 * @param currentReferralCount - User's current referral count
 * @returns Next badge to earn, or undefined if all earned
 */
export function getNextBadge(
  currentReferralCount: number
): (Badge & { progress: number; remaining: number }) | undefined {
  const nextTier = BADGE_TIERS.find((tier) => tier.requiredReferrals > currentReferralCount);

  if (!nextTier) return undefined;

  const previousTier = BADGE_TIERS.filter(
    (tier) => tier.requiredReferrals <= currentReferralCount
  ).pop();

  const baseReferrals = previousTier?.requiredReferrals || 0;
  const targetReferrals = nextTier.requiredReferrals;
  const rangeSize = targetReferrals - baseReferrals;
  const currentProgress = currentReferralCount - baseReferrals;
  const progress = Math.min((currentProgress / rangeSize) * 100, 100);

  return {
    ...nextTier,
    earned: false,
    progress: Math.round(progress),
    remaining: targetReferrals - currentReferralCount,
  };
}

/**
 * Gets the highest earned badge
 *
 * @param badges - Array of user's badges
 * @returns Highest earned badge, or undefined
 */
export function getHighestBadge(badges: Badge[]): Badge | undefined {
  return badges
    .filter((b) => b.earned)
    .sort((a, b) => b.requiredReferrals - a.requiredReferrals)[0];
}

// ============================================
// LEADERBOARD UTILITIES
// ============================================

/**
 * Formats email for leaderboard display (privacy protection)
 *
 * Example: john.doe@gmail.com → j***e@g***.com
 *
 * @param email - Email to format
 * @returns Masked email string
 */
export function formatLeaderboardEmail(email: string): string {
  if (!email || typeof email !== 'string') return '***@***.***';

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return '***@***.***';

  // Mask local part (show first and last char)
  const maskedLocal =
    localPart.length > 2 ? `${localPart[0]}***${localPart[localPart.length - 1]}` : '***';

  // Mask domain (show first char and TLD)
  const domainParts = domain.split('.');
  const maskedDomain =
    domainParts.length > 1
      ? `${domainParts[0][0]}***.${domainParts[domainParts.length - 1]}`
      : '***';

  return `${maskedLocal}@${maskedDomain}`;
}

/**
 * Gets emoji for leaderboard rank
 *
 * @param rank - User's rank position
 * @returns Emoji string
 */
export function getRankEmoji(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return rank <= 10 ? '🏆' : '⭐';
  }
}

/**
 * Calculates total bonus entries from referrals
 *
 * Each referral gives 3 bonus entries
 *
 * @param referralCount - Number of successful referrals
 * @returns Total bonus entries earned
 */
export function calculateBonusEntries(referralCount: number): number {
  return referralCount * 3;
}

// ============================================
// MILESTONE MESSAGES
// ============================================

/**
 * Gets celebration message for reaching a milestone
 *
 * @param referralCount - New referral count
 * @returns Milestone message object, or undefined
 */
export function getMilestoneMessage(referralCount: number): MilestoneMessage | undefined {
  const milestones: Record<number, MilestoneMessage> = {
    1: {
      title: 'Първи Успех! 🎉',
      message: 'Поздравления! Поканихте първия си приятел. Получихте +3 допълнителни участия!',
      emoji: '🎊',
      celebrationType: 'confetti',
    },
    3: {
      title: 'На добър път! 🔥',
      message: 'Вече имате 3 покани! Получихте бронзова значка и 9 допълнителни участия!',
      emoji: '🥉',
      celebrationType: 'sparkles',
    },
    5: {
      title: 'Сребърен Влиятел! ✨',
      message: 'Невероятно! 5 покани означават сребърна значка и 15 допълнителни участия!',
      emoji: '🥈',
      celebrationType: 'fireworks',
    },
    10: {
      title: 'Шампион! 🏆',
      message: 'Достигнахте 10 покани! Вие сте истински шампион с 30 допълнителни участия!',
      emoji: '🏆',
      celebrationType: 'fireworks',
    },
    20: {
      title: 'Златна Легенда! 👑',
      message: 'Невероятни 20 покани! Вие сте легенда със златна значка и 60 допълнителни участия!',
      emoji: '🥇',
      celebrationType: 'fireworks',
    },
    50: {
      title: 'Платинен Майстор! 💎',
      message: 'НЕВЕРОЯТНО! 50+ покани! Вие сте абсолютен майстор със 150+ допълнителни участия!',
      emoji: '💎',
      celebrationType: 'fireworks',
    },
  };

  return milestones[referralCount];
}

// ============================================
// LOCALSTORAGE MANAGEMENT
// ============================================

const STORAGE_KEYS = {
  REFERRAL_CODE: 'bacho_ilia_referral_code',
  REFERRAL_STATS: 'bacho_ilia_referral_stats',
  SHARED_COUNT: 'bacho_ilia_shared_count',
} as const;

/**
 * Saves user's referral code to localStorage
 *
 * @param code - Referral code to save
 */
export function saveReferralCodeToStorage(code: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, code);
  } catch (error) {
    console.error('Failed to save referral code to localStorage:', error);
  }
}

/**
 * Gets user's referral code from localStorage
 *
 * @returns Referral code string, or null
 */
export function getReferralCodeFromStorage(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(STORAGE_KEYS.REFERRAL_CODE);
  } catch (error) {
    console.error('Failed to get referral code from localStorage:', error);
    return null;
  }
}

/**
 * Saves user's referral stats to localStorage
 *
 * @param stats - ReferralStats to save
 */
export function saveReferralStatsToStorage(stats: ReferralStats): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.REFERRAL_STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save referral stats to localStorage:', error);
  }
}

/**
 * Gets user's referral stats from localStorage
 *
 * @returns ReferralStats object, or null
 */
export function getReferralStatsFromStorage(): ReferralStats | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REFERRAL_STATS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get referral stats from localStorage:', error);
    return null;
  }
}

/**
 * Increments share count in localStorage
 *
 * @returns New share count
 */
export function incrementShareCount(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const current = parseInt(localStorage.getItem(STORAGE_KEYS.SHARED_COUNT) || '0', 10);
    const newCount = current + 1;
    localStorage.setItem(STORAGE_KEYS.SHARED_COUNT, newCount.toString());
    return newCount;
  } catch (error) {
    console.error('Failed to increment share count:', error);
    return 0;
  }
}

/**
 * Gets share count from localStorage
 *
 * @returns Current share count
 */
export function getShareCount(): number {
  if (typeof window === 'undefined') return 0;

  try {
    return parseInt(localStorage.getItem(STORAGE_KEYS.SHARED_COUNT) || '0', 10);
  } catch (error) {
    console.error('Failed to get share count:', error);
    return 0;
  }
}

// ============================================
// REFERRAL URL GENERATION
// ============================================

/**
 * Generates shareable referral URL
 *
 * @param referralCode - User's referral code
 * @param baseUrl - Base URL (defaults to bacho-ilia.eu)
 * @returns Complete referral URL
 */
export function generateReferralUrl(
  referralCode: string,
  baseUrl: string = 'https://bacho-ilia.eu'
): string {
  if (!isValidReferralCode(referralCode)) {
    throw new Error('Invalid referral code format');
  }

  return `${baseUrl}/?ref=${referralCode}`;
}

/**
 * Extracts referral code from URL
 *
 * @param url - URL to parse (defaults to current window.location)
 * @returns Referral code, or null
 */
export function extractReferralCodeFromUrl(url?: string): string | null {
  if (typeof window === 'undefined' && !url) return null;

  try {
    const targetUrl = url || window.location.href;
    const urlObj = new URL(targetUrl);
    const refParam = urlObj.searchParams.get('ref');

    return refParam && isValidReferralCode(refParam) ? refParam : null;
  } catch (error) {
    console.error('Failed to extract referral code from URL:', error);
    return null;
  }
}
