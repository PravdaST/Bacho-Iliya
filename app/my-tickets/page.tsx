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
  const [leaderboardData, setLeaderboardData] = useState<{
    entries: Array<{ rank: number; name: string; tickets: number; isCurrentUser: boolean }>;
    currentUserRank: number | null;
    currentUserTickets: number | null;
  }>({
    entries: [],
    currentUserRank: null,
    currentUserTickets: null,
  });

  // Fetch user data and leaderboard from API
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user/me');
        const userData = await userResponse.json();

        if (!userData.success) {
          // No session - redirect to login
          router.push('/my-tickets/login');
          return;
        }

        setUserData(userData.data);

        // Fetch leaderboard data with current user's entry ID
        const leaderboardResponse = await fetch(
          `/api/leaderboard?entryId=${userData.data.entryId}&limit=10`
        );
        const leaderboardData = await leaderboardResponse.json();

        if (leaderboardData.success) {
          setLeaderboardData({
            entries: leaderboardData.data.entries || [],
            currentUserRank: leaderboardData.data.currentUserRank || null,
            currentUserTickets: leaderboardData.data.currentUserTickets || null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        router.push('/my-tickets/login');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  // Set giveaway date
  const giveawayDate = new Date('2025-11-30T23:59:59');

  // Parse selected products
  const selectedProductsList = userData
    ? products.filter((p) =>
        userData.selectedProducts.split(',').map((id) => id.trim()).includes(p.id)
      )
    : [];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bacho-iliya.eu';
  const referralLink = userData ? `${baseUrl}/?ref=${userData.entryId}` : '';

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

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
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="hidden sm:block w-20 h-1 bg-bulgarian-red"></div>
            <h1 className="text-village text-5xl md:text-7xl text-bulgarian-red">
              МОИТЕ БИЛЕТИ
            </h1>
            <div className="hidden sm:block w-20 h-1 bg-bulgarian-red"></div>
          </div>
          <p className="text-handwritten text-xl md:text-2xl text-walnut">
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
                <h3 className="text-village text-3xl md:text-4xl font-bold text-bulgarian-red mb-2">
                  ПОКАНИ ПРИЯТЕЛИ ЗА +3 БИЛЕТА
                </h3>
                <p className="text-handwritten text-xl text-walnut">
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
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full px-4 py-3 bg-old-paper border-2 border-walnut/30 text-lg font-handwritten text-walnut focus:outline-none focus:ring-2 focus:ring-bulgarian-red"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className="w-full px-6 py-3 bg-bulgarian-red text-white font-handwritten text-xl font-bold hover:shadow-md hover:scale-105 transition-all"
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
            <h2 className="text-village text-3xl md:text-4xl text-bulgarian-red mb-6 font-bold text-center">
              ИСТОРИЯ НА БИЛЕТИ
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
            entries={leaderboardData.entries}
            currentUserRank={leaderboardData.currentUserRank || undefined}
            currentUserTickets={leaderboardData.currentUserTickets || userData.ticketsCount}
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
