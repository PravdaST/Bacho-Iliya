"use client";

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

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Lock, Sparkles, TrendingUp, Target } from "lucide-react";
import {
  type Badge,
  calculateEarnedBadges,
  getNextBadge,
  getHighestBadge,
} from "@/lib/gamification";

interface AchievementBadgesProps {
  /** Current referral count */
  referralCount: number;
  /** Previously earned badges (for preserving earnedAt dates) */
  previousBadges?: Badge[];
  /** Display variant */
  variant?: "full" | "compact" | "progress-only";
  /** Custom CSS classes */
  className?: string;
  /** Callback when badge is clicked */
  onBadgeClick?: (badge: Badge) => void;
}

export default function AchievementBadges({
  referralCount,
  previousBadges,
  variant = "full",
  className = "",
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
  const getBadgeColor = (level: Badge["level"]) => {
    switch (level) {
      case "bronze":
        return "from-orange-400 to-orange-600";
      case "silver":
        return "from-gray-300 to-gray-500";
      case "gold":
        return "from-yellow-300 to-yellow-600";
      case "platinum":
        return "from-purple-400 to-pink-500";
      default:
        return "from-gray-200 to-gray-400";
    }
  };

  // Compact variant - just show highest badge
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {highestBadge ? (
          <>
            <span className="text-2xl">{highestBadge.icon}</span>
            <div>
              <p className="text-sm font-semibold text-walnut">
                {highestBadge.name}
              </p>
              <p className="text-xs text-walnut/60">
                {earnedBadges.length} / {badges.length} значки
              </p>
            </div>
          </>
        ) : (
          <>
            <Lock className="w-6 h-6 text-walnut/40" />
            <p className="text-sm text-walnut/60">Все още без значки</p>
          </>
        )}
      </div>
    );
  }

  // Progress-only variant - show only next badge progress
  if (variant === "progress-only") {
    if (!nextBadge) {
      return (
        <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg ${className}`}>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <p className="font-bold text-lg">Постигнахте всички значки!</p>
              <p className="text-sm opacity-90">Вие сте Платинен Майстор 💎</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-white border-2 border-walnut/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-sunflower" />
            <p className="font-semibold text-walnut">Следваща значка</p>
          </div>
          <span className="text-2xl">{nextBadge.icon}</span>
        </div>

        <p className="text-sm text-walnut/80 mb-3">{nextBadge.name}</p>

        {/* Progress bar */}
        <div className="relative h-3 bg-old-paper rounded-full overflow-hidden border border-walnut/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${nextBadge.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${getBadgeColor(nextBadge.level)}`}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-walnut/60">
          <span>{nextBadge.progress}% завършено</span>
          <span>Още {nextBadge.remaining} покани</span>
        </div>
      </div>
    );
  }

  // Full variant - show all badges grid
  return (
    <div className={`bg-old-paper border-2 border-walnut rounded-lg shadow-vintage ${className}`}>
      {/* Header */}
      <div className="bg-walnut text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6" />
            <h3 className="text-xl font-handwritten tracking-wide">
              Твоите Постижения
            </h3>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full">
            <span className="text-sm font-bold">
              {earnedBadges.length} / {badges.length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Badges grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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
              className={`
                relative p-4 rounded-lg border-2 transition-all
                ${
                  badge.earned
                    ? `bg-gradient-to-br ${getBadgeColor(badge.level)} border-walnut shadow-lg cursor-pointer`
                    : "bg-old-paper/50 border-walnut/20 opacity-40 cursor-not-allowed"
                }
              `}
            >
              {/* Badge icon */}
              <div className="text-4xl mb-2 text-center">
                {badge.earned ? (
                  badge.icon
                ) : (
                  <Lock className="w-8 h-8 mx-auto text-walnut/40" />
                )}
              </div>

              {/* Badge name */}
              <p
                className={`text-xs font-semibold text-center ${
                  badge.earned ? "text-white" : "text-walnut/60"
                }`}
              >
                {badge.name}
              </p>

              {/* Earned indicator */}
              {badge.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-bulgarian-red rounded-full p-1 shadow-md"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              )}

              {/* Requirement */}
              <p className="text-[10px] text-center mt-1 opacity-80">
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
            className="bg-white/60 backdrop-blur-sm border-2 border-dashed border-sunflower rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">{nextBadge.icon}</div>
              <div className="flex-1">
                <p className="font-bold text-walnut flex items-center gap-2">
                  {nextBadge.name}
                  <TrendingUp className="w-4 h-4 text-sunflower" />
                </p>
                <p className="text-xs text-walnut/60">{nextBadge.description}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-4 bg-old-paper rounded-full overflow-hidden border-2 border-walnut/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${nextBadge.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${getBadgeColor(nextBadge.level)} flex items-center justify-end pr-2`}
              >
                {nextBadge.progress > 20 && (
                  <span className="text-xs font-bold text-white">
                    {nextBadge.progress}%
                  </span>
                )}
              </motion.div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-walnut/70">
                {referralCount} / {nextBadge.requiredReferrals} покани
              </span>
              <span className="text-xs font-semibold text-bulgarian-red">
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
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white rounded-lg p-6 text-center"
          >
            <Award className="w-12 h-12 mx-auto mb-3" />
            <h4 className="text-xl font-bold mb-2">Невероятно постижение!</h4>
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
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBadge(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{selectedBadge.icon}</div>
                  <h3 className="text-2xl font-bold text-walnut mb-2">
                    {selectedBadge.name}
                  </h3>
                  <p className="text-walnut/70 mb-4">
                    {selectedBadge.description}
                  </p>

                  {selectedBadge.earnedAt && (
                    <p className="text-xs text-walnut/50">
                      Открито на{" "}
                      {new Date(selectedBadge.earnedAt).toLocaleDateString("bg-BG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBadge(null)}
                    className="mt-6 w-full bg-bulgarian-red text-white py-2 rounded-lg font-semibold hover:bg-bulgarian-red/90 transition-colors"
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
