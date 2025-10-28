'use client';

import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  name: string; // Анонимизирано име (напр. "Иван П.")
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
  // Medals for top 3
  const getMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🎟️';
    }
  };

  return (
    <div className="relative bg-old-paper border-4 border-bulgarian-red/40 p-8 shadow-xl">
      {/* Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 pb-6 border-b-2 border-dashed border-walnut/30">
        <h2 className="font-handwritten text-4xl md:text-5xl text-bulgarian-red mb-3">
          🏆 Класация
        </h2>
        <p className="font-handwritten text-xl text-walnut">
          Топ 10 участници с най-много билети
        </p>
      </div>

      {/* Leaderboard Entries */}
      <div className="relative z-10 space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.rank}
            className={`flex items-center justify-between p-5 border-2 ${
              entry.isCurrentUser
                ? 'bg-sunflower/20 border-bulgarian-red shadow-lg'
                : 'bg-white border-walnut/20'
            } transition-all hover:shadow-md`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Left: Rank + Medal + Name */}
            <div className="flex items-center gap-4 flex-1">
              {/* Rank Number */}
              <div
                className={`w-12 h-12 flex items-center justify-center font-handwritten text-2xl font-bold ${
                  entry.rank <= 3
                    ? 'bg-bulgarian-red text-white'
                    : 'bg-walnut/10 text-walnut'
                } rounded-full`}
              >
                {entry.rank}
              </div>

              {/* Medal */}
              <span className="text-3xl">{getMedal(entry.rank)}</span>

              {/* Name */}
              <div className="flex-1">
                <p
                  className={`font-handwritten text-xl md:text-2xl ${
                    entry.isCurrentUser ? 'text-bulgarian-red font-bold' : 'text-walnut'
                  }`}
                >
                  {entry.isCurrentUser ? '🎯 ТИ' : entry.name}
                </p>
              </div>
            </div>

            {/* Right: Tickets Count */}
            <div className="text-right">
              <p className="font-handwritten text-3xl font-bold text-bulgarian-red">
                {entry.tickets}
              </p>
              <p className="font-handwritten text-base text-walnut/70">
                {entry.tickets === 1 ? 'билет' : 'билета'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current User Rank (if outside top 10) */}
      {currentUserRank && currentUserRank > 10 && currentUserTickets && (
        <motion.div
          className="mt-6 pt-6 border-t-2 border-dashed border-walnut/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between p-5 bg-sunflower/20 border-2 border-bulgarian-red">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 flex items-center justify-center font-handwritten text-2xl font-bold bg-walnut/10 text-walnut rounded-full">
                {currentUserRank}
              </div>
              <span className="text-3xl">🎯</span>
              <p className="font-handwritten text-xl md:text-2xl text-bulgarian-red font-bold">
                ТИ
              </p>
            </div>
            <div className="text-right">
              <p className="font-handwritten text-3xl font-bold text-bulgarian-red">
                {currentUserTickets}
              </p>
              <p className="font-handwritten text-base text-walnut/70">
                {currentUserTickets === 1 ? 'билет' : 'билета'}
              </p>
            </div>
          </div>
          <p className="text-center font-handwritten text-lg text-walnut/70 mt-3">
            Твоята позиция в класацията
          </p>
        </motion.div>
      )}

      {/* Coffee Stain Decoration */}
      <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-walnut/10 blur-lg opacity-40" />
    </div>
  );
}
