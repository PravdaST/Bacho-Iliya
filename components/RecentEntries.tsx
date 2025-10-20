'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface RecentEntry {
  name: string;
  timeAgo: string;
}

interface RecentEntriesProps {
  className?: string;
}

// Helper function to format name for privacy (First name + Last initial)
function formatNameForPrivacy(fullName: string): string {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    return parts[0]; // Only first name provided
  }
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}

export default function RecentEntries({ className = '' }: RecentEntriesProps) {
  const [entries, setEntries] = useState<RecentEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();

      if (data.success && data.data.recentEntries) {
        setEntries(data.data.recentEntries);
      }
    } catch (err) {
      console.error('Error fetching recent entries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Refresh every 30 seconds
    const fetchInterval = setInterval(fetchStats, 30000);

    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;

    // Rotate through entries every 3 seconds
    const rotateInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % entries.length);
    }, 3000);

    return () => clearInterval(rotateInterval);
  }, [entries.length]);

  if (isLoading || entries.length === 0) {
    return null;
  }

  const currentEntry = entries[currentIndex];
  const displayName = formatNameForPrivacy(currentEntry.name);

  return (
    <div
      className={`bg-gradient-to-br from-amber-50 to-cream-50 rounded-2xl shadow-md border-2 border-amber-200 p-4 hover:shadow-lg transition-shadow ${className}`}
      aria-live="polite"
      aria-label="Последни регистрации в раздаването"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-sm">
            <Star className="w-5 h-5 text-amber-600 fill-amber-400" aria-hidden="true" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-amber-700 font-medium mb-1">Последна регистрация</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p className="font-serif font-semibold text-amber-900 truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
                {displayName}
              </p>
              <p className="text-sm text-amber-700">
                {currentEntry.timeAgo}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex gap-1" role="tablist" aria-label="Индикатор за регистрации">
          {entries.map((_, idx) => (
            <div
              key={idx}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Регистрация ${idx + 1} от ${entries.length}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-amber-500 scale-125' : 'bg-amber-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
