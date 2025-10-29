'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Download,
  Trophy,
  Users,
  Gift,
  Share2,
  Search,
  ArrowUpDown,
  Eye,
} from 'lucide-react';

interface Entry {
  id: number;
  entry_id: string;
  name: string;
  email: string;
  phone: string;
  selected_products_parsed: string[];
  task_facebook: boolean;
  task_instagram: boolean;
  task_share: boolean;
  referral_count: number;
  referral_entries: number;
  total_entries: number;
  submitted_at: string;
}

interface Winner {
  name: string;
  entry_id: string;
  email: string;
  phone: string;
  total_entries: number;
  selected_products: string[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'submitted_at' | 'name' | 'total_entries'>('submitted_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [winner, setWinner] = useState<Winner | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const [authToken, setAuthToken] = useState<string>('');

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
        fetchEntries(data.authToken);
      } else {
        setAuthError(data.error || 'Невалидна парола');
      }
    } catch (error) {
      setAuthError('Грешка при свързване със сървъра');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all entries
  const fetchEntries = async (token: string) => {
    try {
      const response = await fetch('/api/admin/entries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setEntries(data.data.entries);
        setFilteredEntries(data.data.entries);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  // Search and filter entries
  useEffect(() => {
    if (!searchQuery) {
      setFilteredEntries(entries);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = entries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.email.toLowerCase().includes(query) ||
        entry.phone.includes(query) ||
        entry.entry_id.toLowerCase().includes(query)
    );
    setFilteredEntries(filtered);
  }, [searchQuery, entries]);

  // Sort entries
  useEffect(() => {
    const sorted = [...filteredEntries].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'submitted_at') {
        comparison = new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name, 'bg');
      } else if (sortBy === 'total_entries') {
        comparison = a.total_entries - b.total_entries;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredEntries(sorted);
  }, [sortBy, sortOrder]);

  // Handle CSV export
  const handleExport = () => {
    window.open(`/api/admin/export`, '_blank');
  };

  // Handle pick winner
  const handlePickWinner = async () => {
    if (!confirm('Сигурни ли сте, че искате да изтеглите победител?')) return;

    try {
      const response = await fetch('/api/admin/pick-winner', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setWinner(data.data.winner);
        setShowWinnerModal(true);
      } else {
        alert('Грешка при теглене: ' + data.error);
      }
    } catch (error) {
      console.error('Error picking winner:', error);
      alert('Грешка при свързване със сървъра');
    }
  };

  // Calculate statistics
  const stats = {
    totalParticipants: entries.length,
    totalReferrals: entries.reduce((sum, e) => sum + e.referral_count, 0),
    totalEntries: entries.reduce((sum, e) => sum + e.total_entries, 0),
    avgEntriesPerUser:
      entries.length > 0
        ? (entries.reduce((sum, e) => sum + e.total_entries, 0) / entries.length).toFixed(1)
        : '0',
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border-2 border-amber-200 bg-white p-8 shadow-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1
              className="font-handwritten text-2xl font-bold text-amber-900"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Админ Панел
            </h1>
            <p className="mt-2 text-amber-700">Бачо Илия - Раздаване</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-amber-900">
                Парола
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-2 border-amber-200 px-4 py-3 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                placeholder="Въведете парола"
                required
              />
            </div>

            {authError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'Влизане...' : 'Влизане'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl border-2 border-amber-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="font-handwritten text-3xl font-bold text-amber-900"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Админ Панел
              </h1>
              <p className="mt-1 text-amber-700">Управление на раздаването</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="rounded-lg border-2 border-amber-300 px-4 py-2 font-semibold text-amber-700 transition-all hover:bg-amber-50"
            >
              Изход
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl border-2 border-amber-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Участници</p>
                <p className="text-3xl font-bold text-amber-900">{stats.totalParticipants}</p>
              </div>
              <Users className="h-12 w-12 text-amber-500" />
            </div>
          </div>

          <div className="rounded-xl border-2 border-orange-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Общо Участия</p>
                <p className="text-3xl font-bold text-orange-900">{stats.totalEntries}</p>
              </div>
              <Gift className="h-12 w-12 text-orange-500" />
            </div>
          </div>

          <div className="rounded-xl border-2 border-green-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Препоръки</p>
                <p className="text-3xl font-bold text-green-900">{stats.totalReferrals}</p>
              </div>
              <Share2 className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Средно/човек</p>
                <p className="text-3xl font-bold text-blue-900">{stats.avgEntriesPerUser}</p>
              </div>
              <Trophy className="h-12 w-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 rounded-2xl border-2 border-amber-200 bg-white p-6 shadow-lg">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleExport}
              className="inline-flex min-w-[200px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-amber-500 px-6 py-3 font-semibold text-amber-700 transition-all hover:bg-amber-50"
            >
              <Download className="h-5 w-5" />
              Експорт CSV
            </button>

            <button
              onClick={handlePickWinner}
              className="inline-flex min-w-[200px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              <Trophy className="h-5 w-5" />
              Избери Победител
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 rounded-2xl border-2 border-amber-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-amber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Търси по име, email, телефон или Entry ID..."
                className="w-full rounded-lg border-2 border-amber-200 py-3 pr-4 pl-10 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border-2 border-amber-200 px-4 py-3 transition-all focus:border-amber-500 focus:outline-none"
              >
                <option value="submitted_at">Дата</option>
                <option value="name">Име</option>
                <option value="total_entries">Участия</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="rounded-lg border-2 border-amber-200 px-4 py-3 transition-all hover:bg-amber-50"
              >
                <ArrowUpDown className="h-5 w-5 text-amber-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Entries Table */}
        <div className="overflow-hidden rounded-2xl border-2 border-amber-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap text-amber-900">
                    Entry ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900">Име</th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold text-amber-900 md:table-cell">
                    Email
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold text-amber-900 lg:table-cell">
                    Телефон
                  </th>
                  <th className="hidden px-4 py-3 text-center text-sm font-semibold text-amber-900 lg:table-cell">
                    Продукти
                  </th>
                  <th className="hidden px-4 py-3 text-center text-sm font-semibold text-amber-900 md:table-cell">
                    Препоръки
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-amber-900">
                    Участия
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold whitespace-nowrap text-amber-900 lg:table-cell">
                    Дата
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <tr key={entry.id} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}>
                    <td className="font-handwritten px-4 py-3 text-sm whitespace-nowrap text-amber-700">
                      {entry.entry_id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.name}</td>
                    <td className="hidden px-4 py-3 text-sm text-gray-700 md:table-cell">
                      {entry.email}
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-gray-700 lg:table-cell">
                      {entry.phone}
                    </td>
                    <td className="hidden px-4 py-3 text-center lg:table-cell">
                      <span className="rounded-full bg-amber-200 px-2 py-1 text-xs font-semibold text-amber-900">
                        {entry.selected_products_parsed.length}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-center md:table-cell">
                      <span className="rounded-full bg-green-200 px-2 py-1 text-xs font-semibold text-green-900">
                        {entry.referral_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-900">
                        {entry.total_entries}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-sm whitespace-nowrap text-gray-700 lg:table-cell">
                      {new Date(entry.submitted_at).toLocaleString('bg-BG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="py-12 text-center text-amber-700">Няма намерени участия</div>
          )}
        </div>
      </div>

      {/* Winner Modal */}
      <AnimatePresence>
        {showWinnerModal && winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowWinnerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border-4 border-amber-300 bg-white p-8 shadow-2xl"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h2
                  className="font-handwritten mb-2 text-3xl font-bold text-amber-900"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Победител!
                </h2>
                <p className="text-amber-700">Поздравления на спечелилия!</p>
              </div>

              <div className="mb-6 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm font-medium text-amber-700">Име:</p>
                    <p className="text-lg font-bold text-amber-900">{winner.name}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-amber-700">Entry ID:</p>
                    <p className="font-handwritten text-lg font-bold text-amber-900">
                      {winner.entry_id}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-amber-700">Email:</p>
                    <p className="text-lg text-amber-900">{winner.email}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-amber-700">Телефон:</p>
                    <p className="text-lg text-amber-900">{winner.phone}</p>
                  </div>
                </div>

                <div className="mt-4 border-t-2 border-amber-200 pt-4">
                  <p className="mb-2 text-sm font-medium text-amber-700">Избрани продукти:</p>
                  <div className="flex flex-wrap gap-2">
                    {winner.selected_products.map((product, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-amber-300 bg-white px-3 py-1 text-sm text-amber-900"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t-2 border-amber-200 pt-4 text-center">
                  <p className="mb-1 text-sm font-medium text-amber-700">Общо участия:</p>
                  <p className="text-3xl font-bold text-amber-900">{winner.total_entries}</p>
                </div>
              </div>

              <button
                onClick={() => setShowWinnerModal(false)}
                className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                Затвори
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
