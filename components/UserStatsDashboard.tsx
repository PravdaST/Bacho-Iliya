"use client";

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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import AchievementBadges from "./AchievementBadges";
import Leaderboard from "./Leaderboard";
import SocialShare from "./SocialShare";
import {
  type ReferralStats,
  type LeaderboardEntry,
  generateReferralUrl,
  saveReferralCodeToStorage,
  getReferralCodeFromStorage,
  incrementShareCount,
  getShareCount,
  getMilestoneMessage,
} from "@/lib/gamification";

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
  variant?: "full" | "compact";
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
  variant = "full",
  className = "",
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
      console.error("Failed to copy:", error);
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
      label: "Покани",
      value: stats.totalReferrals,
      color: "bg-blue-500",
      description: "приятели поканени",
    },
    {
      icon: Gift,
      label: "Бонус Участия",
      value: stats.bonusEntries,
      color: "bg-sunflower",
      description: `+${stats.totalReferrals * 3} допълнителни шанса`,
    },
    {
      icon: Trophy,
      label: "Позиция",
      value: stats.rank || "-",
      color: "bg-bulgarian-red",
      description: stats.rank ? `#${stats.rank} в класацията` : "Все още без ранг",
    },
    {
      icon: Sparkles,
      label: "Значки",
      value: stats.badges.filter((b) => b.earned).length,
      color: "bg-purple-500",
      description: `от ${stats.badges.length} общо`,
    },
  ];

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`bg-old-paper border-2 border-walnut rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-handwritten text-xl text-walnut">Твоята Статистика</h3>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-sunflower" />
            <span className="font-bold text-walnut">{stats.totalReferrals} покани</span>
          </div>
        </div>

        {/* Referral code */}
        <div className="bg-white border-2 border-walnut/20 rounded-lg p-3 flex items-center gap-2">
          <div className="flex-1">
            <p className="text-xs text-walnut/60 mb-1">Твоят реферален код:</p>
            <p className="font-handwritten font-bold text-bulgarian-red">{referralCode}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyCode}
            className="p-2 bg-walnut text-white rounded-lg"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-white/50 p-2 rounded-lg text-center border border-walnut/10">
            <p className="text-xs text-walnut/60">Бонус участия</p>
            <p className="text-lg font-bold text-sunflower">+{stats.bonusEntries}</p>
          </div>
          <div className="bg-white/50 p-2 rounded-lg text-center border border-walnut/10">
            <p className="text-xs text-walnut/60">Позиция</p>
            <p className="text-lg font-bold text-bulgarian-red">
              {stats.rank ? `#${stats.rank}` : "-"}
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
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="bg-gradient-to-r from-sunflower to-bulgarian-red text-white rounded-lg shadow-2xl p-6 border-4 border-white">
              <div className="text-center">
                <div className="text-5xl mb-2">{milestoneMessage.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{milestoneMessage.title}</h3>
                <p className="text-sm opacity-90">{milestoneMessage.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with user info */}
      <div className="bg-gradient-to-br from-bulgarian-red to-sunflower text-white rounded-lg shadow-vintage p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-handwritten tracking-wide mb-1">
              Здравей, {userName}! 👋
            </h2>
            <p className="text-sm opacity-90">
              Твоята gamification статистика и постижения
            </p>
          </div>
          <Trophy className="w-12 h-12 opacity-80" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <card.icon className="w-6 h-6 mb-2 opacity-80" />
              <p className="text-2xl font-bold mb-1">{card.value}</p>
              <p className="text-xs opacity-75">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Referral code section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-old-paper border-2 border-walnut rounded-lg shadow-vintage p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-walnut" />
            <h3 className="text-lg font-handwritten text-walnut">
              Твоят Реферален Линк
            </h3>
          </div>
          <span className="text-xs bg-sunflower/20 text-walnut px-2 py-1 rounded-full font-semibold">
            +3 участия на покана
          </span>
        </div>

        <p className="text-sm text-walnut/70 mb-4">
          Сподели този линк с приятели. За всяка успешна покана получаваш +3 допълнителни
          участия в раздаването!
        </p>

        {/* Referral URL display */}
        <div className="bg-white border-2 border-walnut/20 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-walnut/60 mb-1">Твоят уникален линк:</p>
              <p className="font-handwritten text-sm text-bulgarian-red truncate font-bold">
                {referralUrl}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCode}
              className="flex-shrink-0 px-4 py-2 bg-walnut text-white rounded-lg font-semibold hover:bg-walnut/90 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Копирано!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
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
          hashtags={["БачоИлия", "РаздаванеБГ", "МлечниПродукти", "Giveaway"]}
          onShare={handleShare}
          className="w-full"
        />

        <p className="text-xs text-walnut/60 text-center mt-4">
          Споделено {getShareCount()} пъти
        </p>
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
        className="bg-gradient-to-r from-sunflower/20 to-bulgarian-red/20 border-2 border-dashed border-walnut/30 rounded-lg p-6"
      >
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-bulgarian-red flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-walnut mb-2">
              Съвети за повече покани:
            </h4>
            <ul className="text-sm text-walnut/80 space-y-1">
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
        className="bg-walnut text-white rounded-lg p-6 text-center shadow-lg cursor-pointer"
      >
        <Sparkles className="w-8 h-8 mx-auto mb-3" />
        <h4 className="text-xl font-handwritten mb-2">
          Искаш още повече участия?
        </h4>
        <p className="text-sm opacity-90 mb-4">
          Сподели своя линк в социалните мрежи и гледай как растат твоите шансове!
        </p>
        <div className="flex items-center justify-center gap-2 text-sunflower font-bold">
          <span>Текуща позиция: #{stats.rank || "?"}</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
}
