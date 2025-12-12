'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, RotateCcw, Download, ArrowLeft, Sparkles } from 'lucide-react';
import WinnerDrum from '@/components/WinnerDrum';
import WinnerCard from '@/components/WinnerCard';
import Link from 'next/link';

interface Winner {
  entry_id: string;
  name: string;
  email: string;
  phone?: string;
  total_entries: number;
  draw_position: number;
}

interface Statistics {
  total_participants: number;
  remaining_participants: number;
  total_entries: number;
}

const MAX_WINNERS = 10;

export default function DrawPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const [allNames, setAllNames] = useState<string[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [newWinnerIndex, setNewWinnerIndex] = useState<number | null>(null);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthToken(data.authToken);
        setIsAuthenticated(true);
        await loadInitialData(data.authToken);
      } else {
        setAuthError(data.error || 'Nevalidia parola');
      }
    } catch {
      setAuthError('Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  // Load participants and existing winners
  const loadInitialData = async (token: string) => {
    try {
      // Load participants for animation
      const entriesRes = await fetch('/api/admin/entries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const entriesData = await entriesRes.json();
      if (entriesData.success) {
        setAllNames(entriesData.data.entries.map((e: any) => e.name));
        setStatistics({
          total_participants: entriesData.data.entries.length,
          remaining_participants: entriesData.data.entries.length,
          total_entries: entriesData.data.entries.reduce((sum: number, e: any) => sum + e.total_entries, 0),
        });
      }

      // Load existing winners
      const winnersRes = await fetch('/api/admin/winners', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const winnersData = await winnersRes.json();
      if (winnersData.success && winnersData.data.winners) {
        setWinners(winnersData.data.winners);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // Draw a winner
  const drawWinner = async () => {
    if (winners.length >= MAX_WINNERS) {
      return;
    }

    setIsSpinning(true);
    setCurrentWinner(null);
    setNewWinnerIndex(null);

    try {
      const excludeIds = winners.map((w) => w.entry_id);
      const drawPosition = testMode ? winners.length + 1 : winners.length + 1;

      const response = await fetch('/api/admin/draw-winner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          excludeEntryIds: excludeIds,
          drawPosition,
          testMode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const newWinner: Winner = {
          ...data.data.winner,
          draw_position: drawPosition,
        };
        setCurrentWinner(newWinner);

        if (data.data.statistics) {
          setStatistics((prev) => ({
            ...prev!,
            remaining_participants: data.data.statistics.remaining_participants,
          }));
        }
      } else {
        console.error('Draw failed:', data.error);
      }
    } catch (error) {
      console.error('Draw error:', error);
    }
  };

  // Handle spin complete
  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    if (currentWinner) {
      setWinners((prev) => {
        const newWinners = [...prev, currentWinner];
        setNewWinnerIndex(newWinners.length - 1);
        return newWinners;
      });
    }
  }, [currentWinner]);

  // Reset draw (test mode only)
  const resetDraw = () => {
    if (testMode) {
      setWinners([]);
      setCurrentWinner(null);
      setNewWinnerIndex(null);
      if (statistics) {
        setStatistics({
          ...statistics,
          remaining_participants: statistics.total_participants,
        });
      }
    }
  };

  // Export winners to CSV
  const exportWinners = () => {
    const csv = [
      ['Позиция', 'Име', 'Имейл', 'Телефон', 'Entry ID', 'Участия'].join(','),
      ...winners.map((w) =>
        [w.draw_position, w.name, w.email, w.phone || '', w.entry_id, w.total_entries].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bacho-ilia-winners-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border-4 border-[#8B4513]"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#8B4513] font-['Amatic_SC']">
              LIVE Теглене
            </h1>
            <p className="text-gray-600 mt-2">Бачо Илия Giveaway</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Парола за администратор"
                className="w-full pl-10 pr-4 py-3 border-2 border-[#8B4513] rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#8B4513] text-white rounded-lg font-semibold hover:bg-[#6D3610] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Зареждане...' : 'Вход'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]">
      {/* Header - Mobile First */}
      <header className="bg-[#8B4513] text-white py-2 px-3 md:py-4 md:px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <Link
            href="/admin"
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline text-sm">Назад</span>
          </Link>

          <h1 className="text-lg md:text-2xl font-bold font-['Amatic_SC'] text-center truncate">
            LIVE Теглене
          </h1>

          <label className="flex items-center gap-1 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => setTestMode(e.target.checked)}
              className="w-3 h-3 md:w-4 md:h-4 accent-[#DAA520]"
            />
            <span className="text-xs md:text-sm">Тест</span>
          </label>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3 md:p-6">
        {/* Test mode banner - Compact */}
        {testMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-100 border border-yellow-400 rounded-lg p-2 md:p-4 mb-3 md:mb-6 flex items-center justify-between gap-2"
          >
            <span className="text-xs md:text-sm font-semibold text-yellow-800">
              ТЕСТ РЕЖИМ
            </span>
            <button
              onClick={resetDraw}
              className="flex items-center gap-1 px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300 transition-colors text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Нулирай</span>
            </button>
          </motion.div>
        )}

        {/* Statistics - Compact Mobile */}
        {statistics && (
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-8">
            <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm md:shadow-md text-center border border-[#F5E6D3] md:border-2">
              <div className="text-xl md:text-3xl font-bold text-[#8B4513]">
                {statistics.total_participants}
              </div>
              <div className="text-[10px] md:text-sm text-gray-600">Участници</div>
            </div>
            <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm md:shadow-md text-center border border-[#F5E6D3] md:border-2">
              <div className="text-xl md:text-3xl font-bold text-[#DAA520]">
                {statistics.remaining_participants}
              </div>
              <div className="text-[10px] md:text-sm text-gray-600">Оставащи</div>
            </div>
            <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm md:shadow-md text-center border border-[#F5E6D3] md:border-2">
              <div className="text-xl md:text-3xl font-bold text-green-600">
                {winners.length}/{MAX_WINNERS}
              </div>
              <div className="text-[10px] md:text-sm text-gray-600">Победители</div>
            </div>
          </div>
        )}

        {/* Main draw section - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8">
          {/* Lottery drum */}
          <div className="space-y-3 md:space-y-6">
            <div className="bg-white rounded-xl p-3 md:p-6 shadow-lg md:shadow-xl border-2 md:border-4 border-[#8B4513]">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-[#8B4513] mb-3 md:mb-6 font-['Amatic_SC']">
                Бачо Илия Избира
              </h2>

              <WinnerDrum
                names={allNames}
                isSpinning={isSpinning}
                winner={currentWinner?.name || null}
                onSpinComplete={handleSpinComplete}
              />

              <div className="mt-3 md:mt-6 text-center">
                <button
                  onClick={drawWinner}
                  disabled={isSpinning || winners.length >= MAX_WINNERS}
                  className={`
                    w-full md:w-auto px-4 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-xl transition-all transform
                    ${
                      isSpinning || winners.length >= MAX_WINNERS
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  {isSpinning ? (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                      Тегли се...
                    </span>
                  ) : winners.length >= MAX_WINNERS ? (
                    'Готово!'
                  ) : (
                    `ИЗТЕГЛИ (${winners.length + 1}/${MAX_WINNERS})`
                  )}
                </button>
              </div>
            </div>

            {/* Prize info - Compact with image */}
            <div className="relative bg-white/30 rounded-lg p-2 md:p-4 border border-dashed border-[#8B4513]/30 overflow-hidden">
              {/* Background product image */}
              <img
                src="/bacho product.webp"
                alt=""
                className="absolute right-0 top-1/2 -translate-y-1/2 h-16 md:h-24 opacity-20 object-contain"
              />
              <div className="relative z-10">
                <h3 className="text-[10px] md:text-xs font-bold text-[#8B4513]/70 mb-1">Награда:</h3>
                <div className="flex flex-wrap gap-0.5 md:gap-1">
                  <span className="px-1.5 py-0.5 bg-[#F5E6D3]/50 rounded text-[8px] md:text-[10px] text-[#8B4513]/70">Сирене x5</span>
                  <span className="px-1.5 py-0.5 bg-[#F5E6D3]/50 rounded text-[8px] md:text-[10px] text-[#8B4513]/70">Кашкавал x5</span>
                  <span className="px-1.5 py-0.5 bg-[#F5E6D3]/50 rounded text-[8px] md:text-[10px] text-[#8B4513]/70">Мляко x5</span>
                  <span className="px-1.5 py-0.5 bg-[#F5E6D3]/50 rounded text-[8px] md:text-[10px] text-[#8B4513]/70">Айрян x5</span>
                  <span className="px-1.5 py-0.5 bg-[#F5E6D3]/50 rounded text-[8px] md:text-[10px] text-[#8B4513]/70">Прот. мляко x5</span>
                  <span className="px-1.5 py-0.5 bg-[#F5E6D3]/50 rounded text-[8px] md:text-[10px] text-[#8B4513]/70">Сметана x5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Winners list */}
          <div className="bg-white rounded-xl p-3 md:p-6 shadow-lg md:shadow-xl border-2 md:border-4 border-[#8B4513]">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#8B4513] font-['Amatic_SC']">
                Победители
              </h2>
              {winners.length > 0 && (
                <button
                  onClick={exportWinners}
                  className="flex items-center gap-1 px-2 py-1 bg-[#F5E6D3] rounded hover:bg-[#E8D5C4] transition-colors text-xs"
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              )}
            </div>

            <div className="space-y-2 md:space-y-4 max-h-[300px] md:max-h-[600px] overflow-y-auto pr-1 md:pr-2">
              <AnimatePresence>
                {winners.length === 0 ? (
                  <div className="text-center text-gray-500 py-6 md:py-12">
                    <p className="text-sm md:text-base">Няма победители</p>
                    <p className="text-xs md:text-sm mt-1 md:mt-2">Натисни бутона!</p>
                  </div>
                ) : (
                  winners.map((winner, index) => (
                    <motion.div
                      key={winner.entry_id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index === newWinnerIndex ? 0.3 : 0 }}
                    >
                      <WinnerCard winner={winner} isNew={index === newWinnerIndex} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
