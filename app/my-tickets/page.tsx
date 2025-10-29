'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/store';
import TicketCard from '@/components/TicketCard';
import CountdownTimer from '@/components/CountdownTimer';
import LeaderboardTickets from '@/components/LeaderboardTickets';
import FacebookPostShareCard from '@/components/FacebookPostShareCard';
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
  facebookPostShares?: number; // Count of Facebook post share referrals
  submittedAt: string;
}

export default function MyTicketsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
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

  // Parse selected products (stored as JSON string in database)
  const selectedProductsList = userData
    ? products.filter((p) => {
        try {
          const selectedIds = JSON.parse(userData.selectedProducts);
          return Array.isArray(selectedIds) && selectedIds.includes(p.id);
        } catch {
          // Fallback to CSV parsing if JSON.parse fails
          return userData.selectedProducts
            .split(',')
            .map((id) => id.trim())
            .includes(p.id);
        }
      })
    : [];

  if (loading) {
    return (
      <div className="bg-old-paper flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-handwritten text-bulgarian-red mb-4 text-4xl">Зареждане...</div>
          <div className="border-bulgarian-red mx-auto h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
        </motion.div>
      </div>
    );
  }

  if (!userData) {
    return null; // Will redirect
  }

  return (
    <div className="bg-old-paper min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-village text-bulgarian-red mb-1 text-2xl md:text-3xl">
            МОИТЕ БИЛЕТИ
          </h1>
          <p className="text-handwritten text-walnut text-sm md:text-base">
            Следи билетите си и увеличавай шансовете за печалба!
          </p>
        </motion.div>

        {/* 2-Column Grid: Tickets + Countdown */}
        <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TicketCard
              ticketCount={userData.ticketsCount}
              entryId={userData.entryId}
              size="large"
            />
          </motion.div>

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
          className="bg-sunflower/10 border-sunflower/50 mb-3 border p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-handwritten text-bulgarian-red mb-2 text-center text-base font-bold md:text-lg">
            За какви продукти играеш
          </h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {selectedProductsList.map((product) => (
              <div
                key={product.id}
                className="border-bulgarian-red/20 flex flex-col items-center border bg-white p-2"
              >
                <img
                  src={product.image}
                  alt={product.nameBg}
                  className="mb-1 h-12 w-12 object-contain"
                />
                <span className="font-handwritten text-walnut text-center text-xs font-bold md:text-sm">
                  {product.nameBg}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Facebook POST Share & Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-3"
        >
          <FacebookPostShareCard
            entryId={userData.entryId}
            facebookPostShares={userData.facebookPostShares || 0}
            referralCount={userData.referralCount}
          />
        </motion.div>

        {/* Tickets History */}
        <motion.div
          className="border-walnut/30 mb-3 border bg-white p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="font-handwritten text-bulgarian-red mb-2 text-center text-base font-bold md:text-lg">
            ИСТОРИЯ НА БИЛЕТИ
          </h2>
          <div className="space-y-1.5">
            {userData.ticketsHistory.map((entry, index) => (
              <div
                key={index}
                className="bg-old-paper border-walnut/20 flex items-center justify-between border p-2"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-bulgarian-red flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-sm font-bold text-white">✓</span>
                  </div>
                  <div>
                    <p className="font-handwritten text-walnut text-sm font-bold md:text-base">
                      {entry.tickets === 1 ? '1 билет' : `${entry.tickets} билета`}
                    </p>
                    <p className="font-handwritten text-walnut/70 text-xs">{entry.description}</p>
                  </div>
                </div>
                <p className="font-handwritten text-walnut/60 flex-shrink-0 text-xs">
                  {entry.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-3"
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
            className="bg-dark-walnut font-handwritten hover:bg-walnut inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-all md:text-base"
          >
            ← Обратно към началото
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
