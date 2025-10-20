'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';

interface LiveCounterProps {
  className?: string;
}

export default function LiveCounter({ className = '' }: LiveCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();

      if (data.success) {
        setCount(data.data.totalParticipants);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (error || count === null) {
    return null; // Don't show anything if there's an error
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      aria-live="polite"
      aria-label={`${count} ${count === 1 ? 'човек участва' : 'души участват'} в раздаването`}
      className={`inline-flex items-center gap-3 bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 px-6 py-3 rounded-2xl border-2 border-amber-200 shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="relative">
        <Users className="w-6 h-6 text-amber-600" aria-hidden="true" />
        {/* Elegant glow animation - vintage Bulgarian style */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-40"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          ></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-sm"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-2xl font-handwritten font-bold text-amber-900 tabular-nums"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {count.toLocaleString('bg-BG')}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm text-amber-700 font-medium">
            {count === 1 ? 'човек участва' : 'души участват'}
          </span>
        </div>
        <span className="text-xs text-amber-600 opacity-80">Присъедини се сега!</span>
      </div>
    </motion.div>
  );
}
