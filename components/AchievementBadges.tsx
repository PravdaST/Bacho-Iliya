'use client';

/**
 * Achievement Badges Component - Gamification Badge Display
 *
 * Shows user's earned and upcoming badges with:
 * - Visual badge icons (🥉 🥈 🥇 💎)
 * - Progress bars for next badge
 * - Animated badge unlocks
 * - Tooltip descriptions
 * - Vintage Bacho Ilia styling
 *
 * @component
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, Sparkles, TrendingUp, Target } from 'lucide-react';
import {
  type Badge,
  calculateEarnedBadges,
  getNextBadge,
  getHighestBadge,
} from '@/lib/gamification';

interface AchievementBadgesProps {
  /** Current referral count */
  referralCount: number;
  /** Previously earned badges (for preserving earnedAt dates) */
  previousBadges?: Badge[];
  /** Display variant */
  variant?: 'full' | 'compact' | 'progress-only';
  /** Custom CSS classes */
  className?: string;
  /** Callback when badge is clicked */
  onBadgeClick?: (badge: Badge) => void;
}

export default function AchievementBadges({
  referralCount,
  previousBadges,
  variant = 'full',
  className = '',
  onBadgeClick,
}: AchievementBadgesProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Calculate badges
  const badges = calculateEarnedBadges(referralCount, previousBadges);
  const earnedBadges = badges.filter((b) => b.earned);
  const nextBadge = getNextBadge(referralCount);
  const highestBadge = getHighestBadge(badges);

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    if (onBadgeClick) onBadgeClick(badge);
  };

  // Badge level colors
  const getBadgeColor = (level: Badge['level']) => {
    switch (level) {
      case 'bronze':
        return 'from-orange-400 to-orange-600';
      case 'silver':
        return 'from-gray-300 to-gray-500';
      case 'gold':
        return 'from-yellow-300 to-yellow-600';
      case 'platinum':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  // Compact variant - just show highest badge
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {highestBadge ? (
          <>
            <span className="text-2xl">{highestBadge.icon}</span>
            <div>
              <p className="text-walnut text-sm font-semibold">{highestBadge.name}</p>
              <p className="text-walnut/60 text-xs">
                {earnedBadges.length} / {badges.length} значки
              </p>
            </div>
          </>
        ) : (
          <>
            <Lock className="text-walnut/40 h-6 w-6" />
            <p className="text-walnut/60 text-sm">Все още без значки</p>
          </>
        )}
      </div>
    );
  }

  // Progress-only variant - show only next badge progress
  if (variant === 'progress-only') {
    if (!nextBadge) {
      return (
        <div
          className={`rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white ${className}`}
        >
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8" />
            <div>
              <p className="text-lg font-bold">Постигнахте всички значки!</p>
              <p className="text-sm opacity-90">Вие сте Платинен Майстор 💎</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`border-walnut/20 rounded-lg border-2 bg-white p-4 ${className}`}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="text-sunflower h-5 w-5" />
            <p className="text-walnut font-semibold">Следваща значка</p>
          </div>
          <span className="text-2xl">{nextBadge.icon}</span>
        </div>

        <p className="text-walnut/80 mb-3 text-sm">{nextBadge.name}</p>

        {/* Progress bar */}
        <div className="bg-old-paper border-walnut/20 relative h-3 overflow-hidden rounded-full border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${nextBadge.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${getBadgeColor(nextBadge.level)}`}
          />
        </div>

        <div className="text-walnut/60 mt-2 flex items-center justify-between text-xs">
          <span>{nextBadge.progress}% завършено</span>
          <span>Още {nextBadge.remaining} покани</span>
        </div>
      </div>
    );
  }

  // Full variant - show all badges grid
  return (
    <div className={`bg-old-paper border-walnut shadow-vintage rounded-lg border-2 ${className}`}>
      {/* Header */}
      <div className="bg-walnut px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6" />
            <h3 className="font-handwritten text-xl tracking-wide">Твоите Постижения</h3>
          </div>
          <div className="rounded-full bg-white/10 px-3 py-1">
            <span className="text-sm font-bold">
              {earnedBadges.length} / {badges.length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Badges grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.button
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: badge.earned ? 1.05 : 1 }}
              whileTap={{ scale: badge.earned ? 0.95 : 1 }}
              onClick={() => badge.earned && handleBadgeClick(badge)}
              disabled={!badge.earned}
              className={`relative rounded-lg border-2 p-4 transition-all ${
                badge.earned
                  ? `bg-gradient-to-br ${getBadgeColor(badge.level)} border-walnut cursor-pointer shadow-lg`
                  : 'bg-old-paper/50 border-walnut/20 cursor-not-allowed opacity-40'
              } `}
            >
              {/* Badge icon */}
              <div className="mb-2 text-center text-4xl">
                {badge.earned ? badge.icon : <Lock className="text-walnut/40 mx-auto h-8 w-8" />}
              </div>

              {/* Badge name */}
              <p
                className={`text-center text-xs font-semibold ${
                  badge.earned ? 'text-white' : 'text-walnut/60'
                }`}
              >
                {badge.name}
              </p>

              {/* Earned indicator */}
              {badge.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-bulgarian-red absolute -top-2 -right-2 rounded-full p-1 shadow-md"
                >
                  <Sparkles className="h-3 w-3 text-white" />
                </motion.div>
              )}

              {/* Requirement */}
              <p className="mt-1 text-center text-[10px] opacity-80">
                {badge.requiredReferrals} покани
              </p>
            </motion.button>
          ))}
        </div>

        {/* Next badge progress */}
        {nextBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-sunflower rounded-lg border-2 border-dashed bg-white/60 p-4 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="text-3xl">{nextBadge.icon}</div>
              <div className="flex-1">
                <p className="text-walnut flex items-center gap-2 font-bold">
                  {nextBadge.name}
                  <TrendingUp className="text-sunflower h-4 w-4" />
                </p>
                <p className="text-walnut/60 text-xs">{nextBadge.description}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-old-paper border-walnut/20 relative h-4 overflow-hidden rounded-full border-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${nextBadge.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${getBadgeColor(nextBadge.level)} flex items-center justify-end pr-2`}
              >
                {nextBadge.progress > 20 && (
                  <span className="text-xs font-bold text-white">{nextBadge.progress}%</span>
                )}
              </motion.div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-walnut/70 text-xs">
                {referralCount} / {nextBadge.requiredReferrals} покани
              </span>
              <span className="text-bulgarian-red text-xs font-semibold">
                Още {nextBadge.remaining} покани!
              </span>
            </div>
          </motion.div>
        )}

        {/* All badges earned celebration */}
        {!nextBadge && badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-6 text-center text-white"
          >
            <Award className="mx-auto mb-3 h-12 w-12" />
            <h4 className="mb-2 text-xl font-bold">Невероятно постижение!</h4>
            <p className="text-sm opacity-90">
              Достигнахте всички {badges.length} значки! Вие сте истинска легенда! 💎
            </p>
          </motion.div>
        )}
      </div>

      {/* Badge detail modal */}
      <AnimatePresence>
        {selectedBadge && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedBadge(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="mb-4 text-6xl">{selectedBadge.icon}</div>
                  <h3 className="text-walnut mb-2 text-2xl font-bold">{selectedBadge.name}</h3>
                  <p className="text-walnut/70 mb-4">{selectedBadge.description}</p>

                  {selectedBadge.earnedAt && (
                    <p className="text-walnut/50 text-xs">
                      Открито на{' '}
                      {new Date(selectedBadge.earnedAt).toLocaleDateString('bg-BG', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBadge(null)}
                    className="bg-bulgarian-red hover:bg-bulgarian-red/90 mt-6 w-full rounded-lg py-2 font-semibold text-white transition-colors"
                  >
                    Затвори
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
