'use client';

/**
 * User Stats Dashboard - Complete Gamification Control Panel
 *
 * Comprehensive dashboard displaying:
 * - User's referral code with copy/share functionality
 * - Referral statistics (count, bonus entries)
 * - Achievement badges progress
 * - Leaderboard position
 * - Share buttons with tracking
 * - Milestone celebrations
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Copy,
  Check,
  TrendingUp,
  Users,
  Gift,
  Trophy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import AchievementBadges from './AchievementBadges';
import Leaderboard from './Leaderboard';
import SocialShare from './SocialShare';
import {
  type ReferralStats,
  type LeaderboardEntry,
  generateReferralUrl,
  saveReferralCodeToStorage,
  getReferralCodeFromStorage,
  incrementShareCount,
  getShareCount,
  getMilestoneMessage,
} from '@/lib/gamification';

interface UserStatsDashboardProps {
  /** User's referral code */
  referralCode: string;
  /** User's referral statistics */
  stats: ReferralStats;
  /** User's email (for leaderboard highlighting) */
  userEmail: string;
  /** User's name */
  userName: string;
  /** Leaderboard data */
  leaderboard: LeaderboardEntry[];
  /** Display variant */
  variant?: 'full' | 'compact';
  /** Custom CSS classes */
  className?: string;
  /** Callback when user shares */
  onShare?: (platform: string) => void;
}

export default function UserStatsDashboard({
  referralCode,
  stats,
  userEmail,
  userName,
  leaderboard,
  variant = 'full',
  className = '',
  onShare,
}: UserStatsDashboardProps) {
  const [copied, setCopied] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState<ReturnType<
    typeof getMilestoneMessage
  > | null>(null);

  const referralUrl = generateReferralUrl(referralCode);

  // Save referral code to localStorage
  useEffect(() => {
    saveReferralCodeToStorage(referralCode);
  }, [referralCode]);

  // Check for milestone celebrations
  useEffect(() => {
    const milestone = getMilestoneMessage(stats.totalReferrals);
    if (milestone) {
      setMilestoneMessage(milestone);
      setShowMilestone(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowMilestone(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [stats.totalReferrals]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = (platform: string) => {
    incrementShareCount();
    if (onShare) onShare(platform);
  };

  // Stats cards data
  const statsCards = [
    {
      icon: Users,
      label: 'Покани',
      value: stats.totalReferrals,
      color: 'bg-blue-500',
      description: 'приятели поканени',
    },
    {
      icon: Gift,
      label: 'Бонус Участия',
      value: stats.bonusEntries,
      color: 'bg-sunflower',
      description: `+${stats.totalReferrals * 3} допълнителни шанса`,
    },
    {
      icon: Trophy,
      label: 'Позиция',
      value: stats.rank || '-',
      color: 'bg-bulgarian-red',
      description: stats.rank ? `#${stats.rank} в класацията` : 'Все още без ранг',
    },
    {
      icon: Sparkles,
      label: 'Значки',
      value: stats.badges.filter((b) => b.earned).length,
      color: 'bg-purple-500',
      description: `от ${stats.badges.length} общо`,
    },
  ];

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`bg-old-paper border-walnut rounded-lg border-2 p-4 ${className}`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-handwritten text-walnut text-xl">Твоята Статистика</h3>
          <div className="flex items-center gap-2">
            <Trophy className="text-sunflower h-5 w-5" />
            <span className="text-walnut font-bold">{stats.totalReferrals} покани</span>
          </div>
        </div>

        {/* Referral code */}
        <div className="border-walnut/20 flex items-center gap-2 rounded-lg border-2 bg-white p-3">
          <div className="flex-1">
            <p className="text-walnut/60 mb-1 text-xs">Твоят реферален код:</p>
            <p className="font-handwritten text-bulgarian-red font-bold">{referralCode}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyCode}
            className="bg-walnut rounded-lg p-2 text-white"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </motion.button>
        </div>

        {/* Quick stats */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="border-walnut/10 rounded-lg border bg-white/50 p-2 text-center">
            <p className="text-walnut/60 text-xs">Бонус участия</p>
            <p className="text-sunflower text-lg font-bold">+{stats.bonusEntries}</p>
          </div>
          <div className="border-walnut/10 rounded-lg border bg-white/50 p-2 text-center">
            <p className="text-walnut/60 text-xs">Позиция</p>
            <p className="text-bulgarian-red text-lg font-bold">
              {stats.rank ? `#${stats.rank}` : '-'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full variant - complete dashboard
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Milestone celebration toast */}
      <AnimatePresence>
        {showMilestone && milestoneMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 z-50 mx-4 w-full max-w-md -translate-x-1/2"
          >
            <div className="from-sunflower to-bulgarian-red rounded-lg border-4 border-white bg-gradient-to-r p-6 text-white shadow-2xl">
              <div className="text-center">
                <div className="mb-2 text-5xl">{milestoneMessage.emoji}</div>
                <h3 className="mb-2 text-2xl font-bold">{milestoneMessage.title}</h3>
                <p className="text-sm opacity-90">{milestoneMessage.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with user info */}
      <div className="from-bulgarian-red to-sunflower shadow-vintage rounded-lg bg-gradient-to-br p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-handwritten mb-1 text-2xl tracking-wide">
              Здравей, {userName}! 👋
            </h2>
            <p className="text-sm opacity-90">Твоята gamification статистика и постижения</p>
          </div>
          <Trophy className="h-12 w-12 opacity-80" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
            >
              <card.icon className="mb-2 h-6 w-6 opacity-80" />
              <p className="mb-1 text-2xl font-bold">{card.value}</p>
              <p className="text-xs opacity-75">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Referral code section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-old-paper border-walnut shadow-vintage rounded-lg border-2 p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="text-walnut h-5 w-5" />
            <h3 className="font-handwritten text-walnut text-lg">Твоят Реферален Линк</h3>
          </div>
          <span className="bg-sunflower/20 text-walnut rounded-full px-2 py-1 text-xs font-semibold">
            +3 участия на покана
          </span>
        </div>

        <p className="text-walnut/70 mb-4 text-sm">
          Сподели този линк с приятели. За всяка успешна покана получаваш +3 допълнителни участия в
          раздаването!
        </p>

        {/* Referral URL display */}
        <div className="border-walnut/20 mb-4 rounded-lg border-2 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-walnut/60 mb-1 text-xs">Твоят уникален линк:</p>
              <p className="font-handwritten text-bulgarian-red truncate text-sm font-bold">
                {referralUrl}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCode}
              className="bg-walnut hover:bg-walnut/90 flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Копирано!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Копирай
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Social share buttons */}
        <SocialShare
          url={referralUrl}
          title={`Спечели продукти Бачо Илия с моята покана!`}
          description={`Използвай моя реферален код ${referralCode} и получи допълнителни участия в раздаването. Качествени млечни продукти с богата традиция!`}
          hashtags={['БачоИлия', 'РаздаванеБГ', 'МлечниПродукти', 'Giveaway']}
          onShare={handleShare}
          className="w-full"
        />

        <p className="text-walnut/60 mt-4 text-center text-xs">Споделено {getShareCount()} пъти</p>
      </motion.div>

      {/* Achievement Badges */}
      <AchievementBadges
        referralCount={stats.totalReferrals}
        previousBadges={stats.badges}
        variant="full"
      />

      {/* Leaderboard */}
      <Leaderboard
        entries={leaderboard}
        currentUserEmail={userEmail}
        initialDisplayCount={10}
        variant="full"
      />

      {/* Tips section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="from-sunflower/20 to-bulgarian-red/20 border-walnut/30 rounded-lg border-2 border-dashed bg-gradient-to-r p-6"
      >
        <div className="flex items-start gap-3">
          <TrendingUp className="text-bulgarian-red mt-1 h-6 w-6 flex-shrink-0" />
          <div>
            <h4 className="text-walnut mb-2 font-bold">Съвети за повече покани:</h4>
            <ul className="text-walnut/80 space-y-1 text-sm">
              <li>• Сподели в семейни WhatsApp групи</li>
              <li>• Публикувай във Facebook групи за готвене</li>
              <li>• Изпрати на колеги в Viber</li>
              <li>• Остави коментар в Instagram</li>
              <li>• Всяка покана = +3 допълнителни участия!</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Call-to-action */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-walnut cursor-pointer rounded-lg p-6 text-center text-white shadow-lg"
      >
        <Sparkles className="mx-auto mb-3 h-8 w-8" />
        <h4 className="font-handwritten mb-2 text-xl">Искаш още повече участия?</h4>
        <p className="mb-4 text-sm opacity-90">
          Сподели своя линк в социалните мрежи и гледай как растат твоите шансове!
        </p>
        <div className="text-sunflower flex items-center justify-center gap-2 font-bold">
          <span>Текуща позиция: #{stats.rank || '?'}</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </motion.div>
    </div>
  );
}
