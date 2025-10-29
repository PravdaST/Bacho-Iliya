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
    <div className="bg-old-paper border-walnut/30 relative overflow-hidden border">
      {/* Header */}
      <div className="border-walnut/20 border-b px-3 py-2 text-center">
        <h2 className="font-handwritten text-bulgarian-red text-base font-bold md:text-lg">
          КЛАСАЦИЯ - Топ 10
        </h2>
      </div>

      {/* Leaderboard Entries */}
      <div className="space-y-1 p-2">
        {entries.map((entry, index) => {
          const rankBadge = getRankBadge(entry.rank);
          const isTopThree = entry.rank <= 3;

          return (
            <div
              key={entry.rank}
              className={`relative flex items-center gap-2 border p-2 transition-all ${
                entry.isCurrentUser
                  ? 'bg-sunflower/20 border-bulgarian-red'
                  : isTopThree
                    ? 'bg-cream-50 border-walnut/30'
                    : 'border-walnut/20 bg-white'
              } `}
            >
              {/* Left Decoration Bar (for top 3) */}
              {isTopThree && rankBadge && (
                <div className={`absolute top-0 bottom-0 left-0 w-0.5 ${rankBadge.bg}`} />
              )}

              {/* Rank Badge */}
              <div className="flex-shrink-0">
                {isTopThree && rankBadge ? (
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 ${rankBadge.bg} ${rankBadge.border} text-sm font-bold sm:text-base ${rankBadge.text} `}
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      {entry.rank}
                    </div>
                    <span className="text-handwritten text-walnut mt-0.5 text-[8px] font-bold sm:text-[9px]">
                      {rankBadge.label}
                    </span>
                  </div>
                ) : (
                  <div className="bg-walnut/10 text-walnut border-walnut/30 text-village flex h-7 w-7 items-center justify-center border text-base font-bold sm:h-8 sm:w-8 sm:text-lg">
                    {entry.rank}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-handwritten truncate ${entry.isCurrentUser ? 'text-bulgarian-red font-bold' : 'text-walnut'} text-xs sm:text-sm`}
                >
                  {entry.isCurrentUser ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="bg-bulgarian-red border-walnut border px-1.5 py-0.5 text-xs text-white">
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
                  <p className="text-village text-bulgarian-red text-base leading-none font-bold sm:text-lg">
                    {entry.tickets}
                  </p>
                  <p className="text-handwritten text-walnut/70 text-[9px] sm:text-[10px]">
                    {entry.tickets === 1 ? 'билет' : 'билета'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current User Rank (if outside top 10) */}
      {currentUserRank && currentUserRank > 10 && currentUserTickets && (
        <div className="px-2 pb-2">
          <div className="border-walnut/30 border-t border-dashed pt-2">
            <div className="bg-sunflower/20 border-bulgarian-red flex items-center gap-2 border p-2">
              <div className="flex-shrink-0">
                <div className="bg-walnut/10 text-walnut border-walnut/30 text-village flex h-8 w-8 items-center justify-center border text-base font-bold">
                  {currentUserRank}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-handwritten text-bulgarian-red text-sm font-bold">
                  ТВОЯТА ПОЗИЦИЯ
                </p>
                <p className="text-handwritten text-walnut/70 text-xs">
                  Продължавай да събираш билети!
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-village text-bulgarian-red text-lg leading-none font-bold">
                  {currentUserTickets}
                </p>
                <p className="text-handwritten text-walnut/70 text-[9px]">
                  {currentUserTickets === 1 ? 'билет' : 'билета'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
