'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/store';
import TicketCard from '@/components/TicketCard';
import CountdownTimer from '@/components/CountdownTimer';
import LeaderboardTickets from '@/components/LeaderboardTickets';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserData {
  entryId: string;
  name: string;
  email: string;
  phone: string;
  selectedProducts: string;
  ticketsCount: number;
  ticketsHistory: Array<{
    type: 'registration' | 'referral';
    tickets: number;
    date: string;
    description: string;
  }>;
  referralCount: number;
  submittedAt: string;
}

export default function MyTicketsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch user data from API
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/me');
        const data = await response.json();

        if (!data.success) {
          // No session - redirect to login
          router.push('/my-tickets/login');
          return;
        }

        setUserData(data.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        router.push('/my-tickets/login');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [router]);

  // Set giveaway date
  const giveawayDate = new Date('2025-11-30T23:59:59');

  // Parse selected products
  const selectedProductsList = userData
    ? products.filter((p) =>
        userData.selectedProducts.split(',').map((id) => id.trim()).includes(p.id)
      )
    : [];

  const referralLink =
    typeof window !== 'undefined' && userData
      ? `${window.location.origin}/?ref=${userData.entryId}`
      : '';

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Mock leaderboard data (in real app, fetch from API)
  const leaderboardEntries = [
    { rank: 1, name: 'Иван П.', tickets: 45, isCurrentUser: false },
    { rank: 2, name: 'Мария С.', tickets: 33, isCurrentUser: false },
    { rank: 3, name: 'Петър Г.', tickets: 28, isCurrentUser: false },
    { rank: 4, name: 'Елена Д.', tickets: 22, isCurrentUser: false },
    { rank: 5, name: 'Георги М.', tickets: 19, isCurrentUser: false },
    { rank: 6, name: 'Николай К.', tickets: 16, isCurrentUser: false },
    { rank: 7, name: 'Ана В.', tickets: 13, isCurrentUser: false },
    { rank: 8, name: 'Димитър Т.', tickets: 10, isCurrentUser: false },
    { rank: 9, name: 'София И.', tickets: 7, isCurrentUser: false },
    { rank: 10, name: 'Стоян Р.', tickets: 4, isCurrentUser: false },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-old-paper py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-handwritten text-4xl text-bulgarian-red mb-4">
            Зареждане...
          </div>
          <div className="w-16 h-16 border-4 border-bulgarian-red border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  if (!userData) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-old-paper py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-handwritten text-5xl md:text-7xl text-bulgarian-red mb-4">
            🎟️ Моите билети
          </h1>
          <p className="font-handwritten text-2xl text-walnut">
            Следи билетите си и увеличавай шансовете за печалба!
          </p>
        </motion.div>

        {/* 2-Column Grid: Tickets + Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tickets Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TicketCard ticketCount={userData.ticketsCount} entryId={userData.entryId} size="large" />
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CountdownTimer targetDate={giveawayDate} />
          </motion.div>
        </div>

        {/* Selected Products */}
        <motion.div
          className="bg-sunflower/10 border-4 border-sunflower/50 p-8 mb-8 shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-handwritten text-3xl md:text-4xl text-bulgarian-red mb-6 font-bold text-center">
              За какви продукти играеш
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedProductsList.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white border-2 border-bulgarian-red/20 p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={product.image}
                    alt={product.nameBg}
                    className="w-20 h-20 object-contain mb-3"
                  />
                  <span className="font-handwritten text-lg font-bold text-walnut text-center">
                    {product.nameBg}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Referral Section */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 border-4 border-bulgarian-red/40 p-8 mb-8 shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="font-handwritten text-3xl md:text-4xl font-bold text-bulgarian-red mb-2">
                  Покани приятели за +3 билета! 🎟️
                </h3>
                <p className="font-handwritten text-xl text-walnut">
                  Всеки регистриран приятел = 3 нови билета
                </p>
              </div>
              <div className="bg-bulgarian-red text-white px-8 py-5 border-4 border-walnut/30 shadow-lg flex flex-col items-center justify-center min-w-[120px]">
                <span className="font-handwritten text-5xl font-bold leading-none">
                  {userData.referralCount}
                </span>
                <span className="font-handwritten text-xl uppercase tracking-wide mt-1">
                  приятели
                </span>
              </div>
            </div>

            {/* Referral Link */}
            <div className="bg-white p-6 mb-6 border-2 border-bulgarian-red/30">
              <p className="font-handwritten text-xl text-walnut mb-3 font-bold">
                Твоят уникален линк:
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-old-paper border-2 border-walnut/30 text-lg font-handwritten text-walnut focus:outline-none focus:ring-2 focus:ring-bulgarian-red"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className="px-6 py-3 bg-bulgarian-red text-white font-handwritten text-xl font-bold hover:shadow-md hover:scale-105 transition-all"
                >
                  {copied ? '✓ Копиран' : 'Копирай'}
                </button>
              </div>
            </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 border-l-4 border-bulgarian-red">
                <p className="font-handwritten text-lg text-walnut/70 mb-1">Споделен линк</p>
                <p className="font-handwritten text-3xl font-bold text-bulgarian-red">∞</p>
                <p className="font-handwritten text-sm text-walnut/60">пъти</p>
              </div>
              <div className="bg-white p-5 border-l-4 border-sunflower">
                <p className="font-handwritten text-lg text-walnut/70 mb-1">Регистрирани</p>
                <p className="font-handwritten text-3xl font-bold text-sunflower">
                  {userData.referralCount}
                </p>
                <p className="font-handwritten text-sm text-walnut/60">приятели</p>
              </div>
              <div className="bg-white p-5 border-l-4 border-dark-walnut">
                <p className="font-handwritten text-lg text-walnut/70 mb-1">Получени билети</p>
                <p className="font-handwritten text-3xl font-bold text-dark-walnut">
                  {userData.referralCount * 3}
                </p>
                <p className="font-handwritten text-sm text-walnut/60">от referrals</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tickets History */}
        <motion.div
          className="bg-white border-4 border-dark-walnut/40 p-8 mb-8 shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-handwritten text-3xl md:text-4xl text-bulgarian-red mb-6 font-bold text-center">
              📜 История на билети
            </h2>
            <div className="space-y-3">
              {userData.ticketsHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-5 bg-old-paper border-2 border-walnut/20 hover:border-walnut/40 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-bulgarian-red flex items-center justify-center">
                      <span className="text-white font-bold text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-handwritten text-xl font-bold text-walnut">
                        {entry.tickets === 1 ? '1 билет' : `${entry.tickets} билета`}
                      </p>
                      <p className="font-handwritten text-base text-walnut/70">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                  <p className="font-handwritten text-sm text-walnut/60">{entry.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <LeaderboardTickets
            entries={leaderboardEntries}
            currentUserRank={undefined}
            currentUserTickets={userData.ticketsCount}
          />
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-dark-walnut text-white font-handwritten text-xl md:text-2xl font-bold hover:bg-walnut transition-all shadow-xl"
          >
            ← Обратно към началото
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
