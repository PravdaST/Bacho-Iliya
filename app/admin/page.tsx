'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Download, Trophy, Users, Gift, Share2, Search, ArrowUpDown, Eye } from 'lucide-react';

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
          'Authorization': `Bearer ${token}`,
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
    const filtered = entries.filter(entry =>
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
          'Authorization': `Bearer ${authToken}`,
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
    avgEntriesPerUser: entries.length > 0 ? (entries.reduce((sum, e) => sum + e.total_entries, 0) / entries.length).toFixed(1) : '0',
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-2 border-amber-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Админ Панел
            </h1>
            <p className="text-amber-700 mt-2">Бачо Илия - Раздаване</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-amber-900 mb-2">
                Парола
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                placeholder="Въведете парола"
                required
              />
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Админ Панел
              </h1>
              <p className="text-amber-700 mt-1">Управление на раздаването</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-lg border-2 border-amber-300 text-amber-700 font-semibold hover:bg-amber-50 transition-all"
            >
              Изход
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Участници</p>
                <p className="text-3xl font-bold text-amber-900">{stats.totalParticipants}</p>
              </div>
              <Users className="w-12 h-12 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Общо Участия</p>
                <p className="text-3xl font-bold text-orange-900">{stats.totalEntries}</p>
              </div>
              <Gift className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Препоръки</p>
                <p className="text-3xl font-bold text-green-900">{stats.totalReferrals}</p>
              </div>
              <Share2 className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Средно/човек</p>
                <p className="text-3xl font-bold text-blue-900">{stats.avgEntriesPerUser}</p>
              </div>
              <Trophy className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-amber-200">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleExport}
              className="flex-1 min-w-[200px] px-6 py-3 rounded-full border-2 border-amber-500 text-amber-700 font-semibold hover:bg-amber-50 transition-all inline-flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Експорт CSV
            </button>

            <button
              onClick={handlePickWinner}
              className="flex-1 min-w-[200px] px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Избери Победител
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-amber-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Търси по име, email, телефон или Entry ID..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
              >
                <option value="submitted_at">Дата</option>
                <option value="name">Име</option>
                <option value="total_entries">Участия</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 rounded-lg border-2 border-amber-200 hover:bg-amber-50 transition-all"
              >
                <ArrowUpDown className="w-5 h-5 text-amber-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Entries Table */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900 whitespace-nowrap">Entry ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900">Име</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-semibold text-amber-900">Email</th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold text-amber-900">Телефон</th>
                  <th className="hidden lg:table-cell px-4 py-3 text-center text-sm font-semibold text-amber-900">Продукти</th>
                  <th className="hidden md:table-cell px-4 py-3 text-center text-sm font-semibold text-amber-900">Препоръки</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-amber-900">Участия</th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold text-amber-900 whitespace-nowrap">Дата</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <tr key={entry.id} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm font-mono text-amber-700 whitespace-nowrap">{entry.entry_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.name}</td>
                    <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">{entry.email}</td>
                    <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-700">{entry.phone}</td>
                    <td className="hidden lg:table-cell px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-semibold">
                        {entry.selected_products_parsed.length}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded-full bg-green-200 text-green-900 text-xs font-semibold">
                        {entry.referral_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded-full bg-blue-200 text-blue-900 text-xs font-semibold">
                        {entry.total_entries}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {new Date(entry.submitted_at).toLocaleString('bg-BG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12 text-amber-700">
              Няма намерени участия
            </div>
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowWinnerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border-4 border-amber-300"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Победител!
                </h2>
                <p className="text-amber-700">Поздравления на спечелилия!</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-amber-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-amber-700 font-medium mb-1">Име:</p>
                    <p className="text-lg font-bold text-amber-900">{winner.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-medium mb-1">Entry ID:</p>
                    <p className="text-lg font-bold text-amber-900 font-mono">{winner.entry_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-medium mb-1">Email:</p>
                    <p className="text-lg text-amber-900">{winner.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-medium mb-1">Телефон:</p>
                    <p className="text-lg text-amber-900">{winner.phone}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-amber-200">
                  <p className="text-sm text-amber-700 font-medium mb-2">Избрани продукти:</p>
                  <div className="flex flex-wrap gap-2">
                    {winner.selected_products.map((product, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white border border-amber-300 text-sm text-amber-900">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-amber-200 text-center">
                  <p className="text-sm text-amber-700 font-medium mb-1">Общо участия:</p>
                  <p className="text-3xl font-bold text-amber-900">{winner.total_entries}</p>
                </div>
              </div>

              <button
                onClick={() => setShowWinnerModal(false)}
                className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
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
