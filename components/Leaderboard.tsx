"use client";

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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import {
  type LeaderboardEntry,
  getRankEmoji,
  formatLeaderboardEmail,
  getHighestBadge,
} from "@/lib/gamification";

interface LeaderboardProps {
  /** Array of leaderboard entries */
  entries: LeaderboardEntry[];
  /** Current user's email (for highlighting) */
  currentUserEmail?: string;
  /** Number of entries to show initially */
  initialDisplayCount?: number;
  /** Whether to show full leaderboard or compact */
  variant?: "full" | "compact";
  /** Custom CSS classes */
  className?: string;
}

export default function Leaderboard({
  entries,
  currentUserEmail,
  initialDisplayCount = 10,
  variant = "full",
  className = "",
}: LeaderboardProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sort entries by referral count (descending)
  const sortedEntries = [...entries].sort(
    (a, b) => b.referralCount - a.referralCount
  );

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
  const currentUserRank = rankedEntries.find(
    (e) => e.email === currentUserEmail
  )?.rank;

  if (entries.length === 0) {
    return (
      <div
        className={`bg-old-paper border-2 border-walnut rounded-lg p-8 text-center ${className}`}
      >
        <Trophy className="w-12 h-12 mx-auto mb-4 text-walnut/40" />
        <p className="text-walnut/60 font-handwritten text-xl">
          Все още няма класиране. Бъди първият лидер!
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-old-paper border-2 border-walnut rounded-lg shadow-vintage ${className}`}>
      {/* Header */}
      <div className="bg-walnut text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6" />
          <h3 className="text-xl font-handwritten tracking-wide">
            {variant === "full" ? "Топ Лидери" : "Класиране"}
          </h3>
        </div>
        {currentUserRank && (
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <span className="text-sm">Твоята позиция:</span>
            <span className="font-bold text-sunflower">#{currentUserRank}</span>
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
              className={`
                mb-3 border-2 rounded-lg p-4 transition-all
                ${
                  entry.isCurrentUser
                    ? "border-bulgarian-red bg-sunflower/10 shadow-lg scale-[1.02]"
                    : "border-walnut/20 bg-white hover:border-walnut/40 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Rank badge */}
                <div
                  className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  ${
                    entry.rank === 1
                      ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-walnut shadow-lg"
                      : entry.rank === 2
                      ? "bg-gradient-to-br from-gray-300 to-gray-400 text-walnut shadow-md"
                      : entry.rank === 3
                      ? "bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-md"
                      : "bg-old-paper text-walnut border-2 border-walnut/20"
                  }
                `}
                >
                  {entry.rank <= 3 ? (
                    <span className="text-2xl">{getRankEmoji(entry.rank)}</span>
                  ) : (
                    <span>#{entry.rank}</span>
                  )}
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-walnut truncate">
                      {entry.name}
                    </h4>
                    {entry.isCurrentUser && (
                      <span className="text-xs bg-bulgarian-red text-white px-2 py-0.5 rounded-full font-bold">
                        ТИ
                      </span>
                    )}
                  </div>

                  {variant === "full" && (
                    <p className="text-xs text-walnut/60 font-mono">
                      {formatLeaderboardEmail(entry.email)}
                    </p>
                  )}

                  {/* Badges */}
                  {entry.badges && entry.badges.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      {entry.badges
                        .filter((b) => b.earned)
                        .slice(0, 3)
                        .map((badge) => (
                          <span
                            key={badge.id}
                            title={badge.name}
                            className="text-xl"
                          >
                            {badge.icon}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-col items-end gap-1 text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-bulgarian-red">
                      {entry.referralCount}
                    </span>
                    <div className="text-xs text-walnut/60">
                      <div>покани</div>
                    </div>
                  </div>

                  {variant === "full" && (
                    <div className="text-xs text-sunflower font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      +{entry.bonusEntries} участия
                    </div>
                  )}
                </div>
              </div>

              {/* Special decorations for top 3 */}
              {entry.rank === 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg"
                >
                  <Crown className="w-4 h-4 text-walnut" />
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
            className="w-full mt-4 py-3 border-2 border-dashed border-walnut/30 rounded-lg text-walnut hover:border-walnut hover:bg-walnut/5 transition-colors flex items-center justify-center gap-2 font-handwritten text-lg"
          >
            <ChevronDown className="w-5 h-5" />
            Покажи още {rankedEntries.length - displayCount} лидера
          </motion.button>
        )}

        {isExpanded && displayCount > initialDisplayCount && (
          <motion.button
            onClick={handleShowLess}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 border-2 border-dashed border-walnut/30 rounded-lg text-walnut hover:border-walnut hover:bg-walnut/5 transition-colors flex items-center justify-center gap-2 font-handwritten text-lg"
          >
            <ChevronUp className="w-5 h-5" />
            Покажи по-малко
          </motion.button>
        )}
      </div>

      {/* Footer note */}
      {variant === "full" && (
        <div className="border-t-2 border-walnut/10 px-6 py-3 bg-walnut/5">
          <p className="text-xs text-walnut/60 text-center">
            Класирането се актуализира в реално време. Всяка покана носи +3 допълнителни участия!
          </p>
        </div>
      )}
    </div>
  );
}
