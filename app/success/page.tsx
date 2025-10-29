'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import CountdownTimer from '@/components/CountdownTimer';
import TicketCard from '@/components/TicketCard';
import FacebookPostShareCard from '@/components/FacebookPostShareCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const router = useRouter();
  const { userData, selectedProducts, tasks, generateEntryId, entryId } = useGiveawayStore();

  const selectedProductsList = products.filter((p) => selectedProducts.includes(p.id));

  // Set giveaway date to November 30, 2025
  const giveawayDate = new Date('2025-11-30T23:59:59');

  useEffect(() => {
    // Generate entry ID if not already generated
    if (!useGiveawayStore.getState().entryId) {
      generateEntryId();
    }
  }, [generateEntryId]);

  const handleStartOver = () => {
    if (
      confirm(
        'Сигурни ли сте, че искате да започнете отначало? Това ще изтрие текущото ви участие.'
      )
    ) {
      // Reset store to initial state
      useGiveawayStore.setState({
        currentStep: 1,
        userData: { name: '', email: '', phone: '', selectedProducts: [] },
        selectedProducts: [],
        tasks: { facebook: false, instagram: false, share: false },
        entryId: null,
      });
      router.push('/');
    }
  };

  const currentEntryId = entryId || 'N/A';

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar currentStep={4} totalSteps={4} />
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
          <CountdownTimer targetDate={giveawayDate} />
        </div>

        {/* Certificate Card */}
        <div className="border-walnut/40 relative mb-8 overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12">
          {/* Notebook Lines */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/15 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 4}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-16 w-px" />

          {/* Perforation Holes */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-12 flex-col justify-around py-8 md:flex">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bg-walnut/20 border-walnut/10 ml-4 h-3 w-3 rounded-full border-2"
              />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          {/* Header - Success */}
          <div className="border-walnut/30 relative mb-8 border-b-2 border-dashed pb-6 text-center">
            <h1 className="font-handwritten text-bulgarian-red mb-4 text-6xl md:text-7xl">
              Успешно участие!
            </h1>
            <p className="font-handwritten text-walnut mb-3 text-3xl">
              Благодарим ти, {userData.name}!
            </p>
            <p className="font-handwritten text-walnut text-2xl">Вече участваш в раздаването</p>
          </div>

          {/* Personal Info - Full Width */}
          <div className="bg-bulgarian-red/5 border-bulgarian-red/30 relative mb-8 border-2 p-8">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-center text-3xl font-bold">
              Твоите данни:
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <p className="font-handwritten text-walnut/70 mb-2 text-lg">Име</p>
                <p className="font-handwritten text-walnut text-2xl font-bold">{userData.name}</p>
              </div>
              <div className="text-center">
                <p className="font-handwritten text-walnut/70 mb-2 text-lg">Email</p>
                <p className="font-handwritten text-walnut text-xl font-bold break-all">
                  {userData.email}
                </p>
              </div>
              <div className="text-center">
                <p className="font-handwritten text-walnut/70 mb-2 text-lg">Телефон</p>
                <p className="font-handwritten text-walnut text-2xl font-bold">{userData.phone}</p>
              </div>
              <div className="text-center">
                <p className="font-handwritten text-walnut/70 mb-2 text-lg">Дата на участие</p>
                <p className="font-handwritten text-walnut text-2xl font-bold">
                  {new Date().toLocaleDateString('bg-BG')}
                </p>
              </div>
            </div>
          </div>

          {/* Tickets Section - NEW */}
          <div className="mb-8">
            <TicketCard ticketCount={1} entryId={currentEntryId} size="large" />

            {/* Link to My Tickets Dashboard */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/my-tickets"
                className="bg-bulgarian-red font-handwritten hover:bg-dark-walnut inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white shadow-xl transition-all md:text-2xl"
              >
                <span>🎟️</span>
                <span>Виж моите билети →</span>
              </Link>
              <p className="font-handwritten text-walnut/70 mt-4 text-lg">
                Следи билетите си и увеличавай шансовете за печалба!
              </p>
            </motion.div>
          </div>

          {/* 2-Column Layout: Selected Products + Completed Tasks */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Selected Products */}
            <div className="bg-sunflower/10 border-sunflower/50 relative border-2 p-6">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-2xl font-bold">
                Избрани продукти ({selectedProductsList.length})
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {selectedProductsList.map((product) => (
                  <div
                    key={product.id}
                    className="border-bulgarian-red/20 flex flex-col items-center border-2 bg-white p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.nameBg}
                      className="mb-2 h-16 w-16 object-contain"
                    />
                    <span className="font-handwritten text-walnut text-center text-lg font-bold">
                      {product.nameBg}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-bulgarian-blue/5 border-bulgarian-blue/30 relative border-2 p-6">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-2xl font-bold">
                Завършени задачи
              </h2>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-bulgarian-red flex h-8 w-8 items-center justify-center rounded-full shadow-sm">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-handwritten text-walnut text-xl">Facebook харесване</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="bg-bulgarian-red flex h-8 w-8 items-center justify-center rounded-full shadow-sm">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-handwritten text-walnut text-xl">
                    Коментар с "Искам Бачо Илия"
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-bulgarian-red flex h-8 w-8 items-center justify-center rounded-full shadow-sm">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-handwritten text-walnut text-xl">
                    Споделяне в социални мрежи
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Facebook POST Share & Referral Section */}
        <div className="mb-8">
          <FacebookPostShareCard
            entryId={currentEntryId}
            facebookPostShares={0}
            referralCount={0}
          />
        </div>

        {/* Next Steps - Full Width */}
        <div className="bg-bulgarian-blue/10 border-bulgarian-blue/40 mb-8 border-4 p-8 shadow-xl">
          <h3 className="font-handwritten text-bulgarian-red mb-6 text-3xl font-bold md:text-4xl">
            Какво следва?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-bulgarian-red min-w-[40px] text-3xl font-bold">
                1.
              </span>
              <span className="font-handwritten text-walnut text-xl">
                Ще получиш потвърдителен email на{' '}
                <span className="font-bold">{userData.email}</span>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-bulgarian-red min-w-[40px] text-3xl font-bold">
                2.
              </span>
              <span className="font-handwritten text-walnut text-xl">
                <span className="font-bold">ВАЖНО:</span> Коментирай "Искам Бачо Илия" под поста във
                Facebook за да завършиш участието си!
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-bulgarian-red min-w-[40px] text-3xl font-bold">
                3.
              </span>
              <span className="font-handwritten text-walnut text-xl">
                Сподели още веднъж за допълнителни шансове за печалба!
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-bulgarian-red min-w-[40px] text-3xl font-bold">
                4.
              </span>
              <span className="font-handwritten text-walnut text-xl">
                Печелившите ще бъдат обявени на{' '}
                <span className="font-bold">{giveawayDate.toLocaleDateString('bg-BG')}</span>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-bulgarian-red min-w-[40px] text-3xl font-bold">
                5.
              </span>
              <span className="font-handwritten text-walnut text-xl">
                Ако спечелиш, ще те уведомим по email и телефон
              </span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleStartOver}
            className="border-walnut/40 text-walnut font-handwritten hover:bg-walnut/5 border-4 px-10 py-4 text-xl font-bold transition-all"
          >
            ЗАПОЧНИ ОТНАЧАЛО
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="font-handwritten text-walnut text-2xl">
            Успех! Пожелаваме ти късмет в раздаването!
          </p>
        </div>
      </div>
    </div>
  );
}
