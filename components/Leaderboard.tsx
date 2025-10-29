'use client';

/**
 * Leaderboard Component - Referral Rankings Display
 *
 * Shows top referrers in a vintage-styled leaderboard with:
 * - Rank medals (🥇 🥈 🥉)
 * - Referral counts
 * - Badge displays
 * - Current user highlighting
 * - Animated entry reveals
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import {
  type LeaderboardEntry,
  getRankEmoji,
  formatLeaderboardEmail,
  getHighestBadge,
} from '@/lib/gamification';

interface LeaderboardProps {
  /** Array of leaderboard entries */
  entries: LeaderboardEntry[];
  /** Current user's email (for highlighting) */
  currentUserEmail?: string;
  /** Number of entries to show initially */
  initialDisplayCount?: number;
  /** Whether to show full leaderboard or compact */
  variant?: 'full' | 'compact';
  /** Custom CSS classes */
  className?: string;
}

export default function Leaderboard({
  entries,
  currentUserEmail,
  initialDisplayCount = 10,
  variant = 'full',
  className = '',
}: LeaderboardProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sort entries by referral count (descending)
  const sortedEntries = [...entries].sort((a, b) => b.referralCount - a.referralCount);

  // Add ranks
  const rankedEntries: LeaderboardEntry[] = sortedEntries.map((entry, index) => ({
    ...entry,
    rank: index + 1,
    isCurrentUser: entry.email === currentUserEmail,
  }));

  // Get visible entries
  const visibleEntries = rankedEntries.slice(0, displayCount);
  const hasMore = rankedEntries.length > displayCount;

  const handleShowMore = () => {
    setDisplayCount((prev) => Math.min(prev + 10, rankedEntries.length));
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setDisplayCount(initialDisplayCount);
    setIsExpanded(false);
  };

  // Find current user's rank
  const currentUserRank = rankedEntries.find((e) => e.email === currentUserEmail)?.rank;

  if (entries.length === 0) {
    return (
      <div
        className={`bg-old-paper border-walnut rounded-lg border-2 p-8 text-center ${className}`}
      >
        <Trophy className="text-walnut/40 mx-auto mb-4 h-12 w-12" />
        <p className="text-walnut/60 font-handwritten text-xl">
          Все още няма класиране. Бъди първият лидер!
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-old-paper border-walnut shadow-vintage rounded-lg border-2 ${className}`}>
      {/* Header */}
      <div className="bg-walnut flex items-center justify-between px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6" />
          <h3 className="font-handwritten text-xl tracking-wide">
            {variant === 'full' ? 'Топ Лидери' : 'Класиране'}
          </h3>
        </div>
        {currentUserRank && (
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <span className="text-sm">Твоята позиция:</span>
            <span className="text-sunflower font-bold">#{currentUserRank}</span>
          </div>
        )}
      </div>

      {/* Leaderboard entries */}
      <div className="p-4">
        <AnimatePresence mode="popLayout">
          {visibleEntries.map((entry, index) => (
            <motion.div
              key={entry.email}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`mb-3 rounded-lg border-2 p-4 transition-all ${
                entry.isCurrentUser
                  ? 'border-bulgarian-red bg-sunflower/10 scale-[1.02] shadow-lg'
                  : 'border-walnut/20 hover:border-walnut/40 bg-white hover:shadow-md'
              } `}
            >
              <div className="flex items-center gap-4">
                {/* Rank badge */}
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                    entry.rank === 1
                      ? 'text-walnut bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg'
                      : entry.rank === 2
                        ? 'text-walnut bg-gradient-to-br from-gray-300 to-gray-400 shadow-md'
                        : entry.rank === 3
                          ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-md'
                          : 'bg-old-paper text-walnut border-walnut/20 border-2'
                  } `}
                >
                  {entry.rank <= 3 ? (
                    <span className="text-2xl">{getRankEmoji(entry.rank)}</span>
                  ) : (
                    <span>#{entry.rank}</span>
                  )}
                </div>

                {/* User info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-walnut truncate font-semibold">{entry.name}</h4>
                    {entry.isCurrentUser && (
                      <span className="bg-bulgarian-red rounded-full px-2 py-0.5 text-xs font-bold text-white">
                        ТИ
                      </span>
                    )}
                  </div>

                  {variant === 'full' && (
                    <p className="text-walnut/60 font-handwritten text-xs">
                      {formatLeaderboardEmail(entry.email)}
                    </p>
                  )}

                  {/* Badges */}
                  {entry.badges && entry.badges.length > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      {entry.badges
                        .filter((b) => b.earned)
                        .slice(0, 3)
                        .map((badge) => (
                          <span key={badge.id} title={badge.name} className="text-xl">
                            {badge.icon}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-col items-end gap-1 text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-bulgarian-red text-2xl font-bold">
                      {entry.referralCount}
                    </span>
                    <div className="text-walnut/60 text-xs">
                      <div>покани</div>
                    </div>
                  </div>

                  {variant === 'full' && (
                    <div className="text-sunflower flex items-center gap-1 text-xs font-semibold">
                      <Sparkles className="h-3 w-3" />+{entry.bonusEntries} участия
                    </div>
                  )}
                </div>
              </div>

              {/* Special decorations for top 3 */}
              {entry.rank === 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 rounded-full bg-yellow-400 p-2 shadow-lg"
                >
                  <Crown className="text-walnut h-4 w-4" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Show More/Less button */}
        {hasMore && !isExpanded && (
          <motion.button
            onClick={handleShowMore}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-walnut/30 text-walnut hover:border-walnut hover:bg-walnut/5 font-handwritten mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-3 text-lg transition-colors"
          >
            <ChevronDown className="h-5 w-5" />
            Покажи още {rankedEntries.length - displayCount} лидера
          </motion.button>
        )}

        {isExpanded && displayCount > initialDisplayCount && (
          <motion.button
            onClick={handleShowLess}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-walnut/30 text-walnut hover:border-walnut hover:bg-walnut/5 font-handwritten mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-3 text-lg transition-colors"
          >
            <ChevronUp className="h-5 w-5" />
            Покажи по-малко
          </motion.button>
        )}
      </div>

      {/* Footer note */}
      {variant === 'full' && (
        <div className="border-walnut/10 bg-walnut/5 border-t-2 px-6 py-3">
          <p className="text-walnut/60 text-center text-xs">
            Класирането се актуализира в реално време. Всяка покана носи +3 допълнителни участия!
          </p>
        </div>
      )}
    </div>
  );
}
