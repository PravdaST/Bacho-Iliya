'use client';

import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  name: string;
  tickets: number;
  isCurrentUser?: boolean;
}

interface LeaderboardTicketsProps {
  entries: LeaderboardEntry[];
  currentUserRank?: number;
  currentUserTickets?: number;
}

export default function LeaderboardTickets({
  entries,
  currentUserRank,
  currentUserTickets,
}: LeaderboardTicketsProps) {
  // Badge style for ranks (no emojis - Bulgarian folk style)
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return {
        bg: 'bg-gradient-to-br from-sunflower via-amber-400 to-bulgarian-red',
        border: 'border-2 border-sunflower shadow-lg',
        text: 'text-walnut',
        label: 'ЗЛАТЕН',
      };
    } else if (rank === 2) {
      return {
        bg: 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400',
        border: 'border-2 border-gray-400 shadow-md',
        text: 'text-walnut',
        label: 'СРЕБЪРЕН',
      };
    } else if (rank === 3) {
      return {
        bg: 'bg-gradient-to-br from-orange-600 via-orange-400 to-orange-700',
        border: 'border-2 border-orange-600 shadow-md',
        text: 'text-white',
        label: 'БРОНЗОВ',
      };
    }
    return null;
  };

  return (
    <div className="relative bg-old-paper border-2 border-bulgarian-red/40 shadow-xl overflow-hidden">
      {/* Bulgarian Shevitsa Pattern Border */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.1) 10px,
              rgba(139, 69, 19, 0.1) 11px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.1) 10px,
              rgba(139, 69, 19, 0.1) 11px
            )
          `,
        }}
      />

      {/* Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

      {/* Header with Bulgarian Folk Decoration */}
      <div className="relative z-10 text-center py-3 sm:py-4 md:py-6 px-4 border-b-2 border-dashed border-walnut/30 bg-gradient-to-b from-transparent to-walnut/5">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="hidden sm:block w-12 h-0.5 bg-bulgarian-red"></div>
          <h2 className="text-village text-2xl sm:text-3xl md:text-4xl text-bulgarian-red">
            КЛАСАЦИЯ
          </h2>
          <div className="hidden sm:block w-12 h-0.5 bg-bulgarian-red"></div>
        </div>
        <p className="text-handwritten text-sm sm:text-base md:text-lg text-walnut mt-1">
          Топ 10 участници с най-много билети
        </p>

        {/* Decorative Shevitsa Elements */}
        <div className="flex justify-center gap-2 mt-3">
          <div className="w-2 h-2 bg-bulgarian-red rotate-45"></div>
          <div className="w-2 h-2 bg-sunflower rotate-45"></div>
          <div className="w-2 h-2 bg-bulgarian-red rotate-45"></div>
        </div>
      </div>

      {/* Leaderboard Entries */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6 space-y-1.5 sm:space-y-2">
        {entries.map((entry, index) => {
          const rankBadge = getRankBadge(entry.rank);
          const isTopThree = entry.rank <= 3;

          return (
            <motion.div
              key={entry.rank}
              className={`
                relative flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4
                border-2 transition-all
                ${
                  entry.isCurrentUser
                    ? 'bg-sunflower/20 border-bulgarian-red shadow-lg scale-[1.02]'
                    : isTopThree
                    ? 'bg-cream-50 border-walnut/30 hover:shadow-md'
                    : 'bg-white border-walnut/20 hover:shadow-md'
                }
              `}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
              whileHover={{ x: 4 }}
            >
              {/* Left Decoration Bar (for top 3) */}
              {isTopThree && rankBadge && (
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 ${rankBadge.bg}`} />
              )}

              {/* Rank Badge */}
              <div className="flex-shrink-0">
                {isTopThree && rankBadge ? (
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                        flex items-center justify-center
                        ${rankBadge.bg} ${rankBadge.border}
                        font-bold text-base sm:text-lg md:text-xl ${rankBadge.text}
                        relative
                      `}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      {entry.rank}
                    </div>
                    <span className="text-handwritten text-[9px] sm:text-[10px] font-bold text-walnut mt-0.5 tracking-tight">
                      {rankBadge.label}
                    </span>
                  </div>
                ) : (
                  <div
                    className="
                      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                      flex items-center justify-center
                      bg-walnut/10 text-walnut
                      border-2 border-walnut/30
                      text-village text-lg sm:text-xl md:text-2xl font-bold
                    "
                  >
                    {entry.rank}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p
                  className={`
                    text-handwritten truncate
                    ${entry.isCurrentUser ? 'text-bulgarian-red font-bold' : 'text-walnut'}
                    text-sm sm:text-base md:text-lg
                  `}
                >
                  {entry.isCurrentUser ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="hidden xs:inline text-sm sm:text-base md:text-lg px-2 py-0.5 bg-bulgarian-red text-white border border-walnut">
                        ТИ
                      </span>
                      <span className="xs:hidden text-sm sm:text-base md:text-lg px-2 py-0.5 bg-bulgarian-red text-white border border-walnut">
                        ТИ
                      </span>
                      {entry.name}
                    </span>
                  ) : (
                    entry.name
                  )}
                </p>
              </div>

              {/* Tickets Count */}
              <div className="flex-shrink-0 text-right">
                <div className="flex flex-col items-end">
                  <p className="text-village text-xl sm:text-2xl md:text-3xl font-bold text-bulgarian-red leading-none">
                    {entry.tickets}
                  </p>
                  <p className="text-handwritten text-[10px] sm:text-xs md:text-sm text-walnut/70 mt-0.5">
                    {entry.tickets === 1 ? 'билет' : 'билета'}
                  </p>
                </div>
              </div>

              {/* Bulgarian Folk Pattern Decoration (for current user) */}
              {entry.isCurrentUser && (
                <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-bulgarian-red opacity-20 rotate-45" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Current User Rank (if outside top 10) */}
      {currentUserRank && currentUserRank > 10 && currentUserTickets && (
        <motion.div
          className="relative z-10 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="border-t-4 border-dashed border-walnut/30 pt-4 sm:pt-6">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 bg-sunflower/20 border-2 border-bulgarian-red shadow-md">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-walnut/10 text-walnut border-2 border-walnut/30 text-village text-xl sm:text-2xl md:text-3xl font-bold">
                  {currentUserRank}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-handwritten text-lg sm:text-xl md:text-2xl text-bulgarian-red font-bold">
                  ТВОЯТА ПОЗИЦИЯ
                </p>
                <p className="text-handwritten text-xs sm:text-sm md:text-base text-walnut/70 mt-0.5">
                  Продължавай да събираш билети!
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="flex flex-col items-end">
                  <p className="text-village text-2xl sm:text-3xl md:text-4xl font-bold text-bulgarian-red leading-none">
                    {currentUserTickets}
                  </p>
                  <p className="text-handwritten text-xs sm:text-sm md:text-base text-walnut/70 mt-0.5">
                    {currentUserTickets === 1 ? 'билет' : 'билета'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Decorative Bulgarian Folk Corner */}
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-10">
        <div className="absolute inset-0 border-2 border-walnut rotate-45"></div>
        <div className="absolute inset-1 border border-bulgarian-red rotate-45"></div>
      </div>
    </div>
  );
}
