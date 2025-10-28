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
    if (confirm('Сигурни ли сте, че искате да започнете отначало? Това ще изтрие текущото ви участие.')) {
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
    <div className="min-h-screen py-24 px-4 bg-old-paper relative overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-5xl mx-auto relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar currentStep={4} totalSteps={4} />
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
          <CountdownTimer targetDate={giveawayDate} />
        </div>

        {/* Certificate Card */}
        <div className="bg-white shadow-2xl border-4 border-walnut/40 relative overflow-hidden p-8 md:p-12 mb-8">
          {/* Notebook Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/15"
                style={{ top: `${(i + 1) * 4}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30" />

          {/* Perforation Holes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex flex-col justify-around py-8">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-walnut/20 rounded-full ml-4 border-2 border-walnut/10" />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          {/* Header - Success */}
          <div className="relative text-center mb-8 pb-6 border-b-2 border-dashed border-walnut/30">
            <h1 className="font-handwritten text-6xl md:text-7xl text-bulgarian-red mb-4">
              Успешно участие!
            </h1>
            <p className="font-handwritten text-3xl text-walnut mb-3">
              Благодарим ти, {userData.name}!
            </p>
            <p className="font-handwritten text-2xl text-walnut">
              Вече участваш в раздаването
            </p>
          </div>

          {/* Personal Info - Full Width */}
          <div className="relative bg-bulgarian-red/5 border-2 border-bulgarian-red/30 p-8 mb-8">
            <h2 className="font-handwritten text-3xl text-bulgarian-red mb-6 font-bold text-center">Твоите данни:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="font-handwritten text-lg text-walnut/70 mb-2">Име</p>
                <p className="font-handwritten text-2xl font-bold text-walnut">{userData.name}</p>
              </div>
              <div className="text-center">
                <p className="font-handwritten text-lg text-walnut/70 mb-2">Email</p>
                <p className="font-handwritten text-xl font-bold text-walnut break-all">{userData.email}</p>
              </div>
              <div className="text-center">
                <p className="font-handwritten text-lg text-walnut/70 mb-2">Телефон</p>
                <p className="font-handwritten text-2xl font-bold text-walnut">{userData.phone}</p>
              </div>
              <div className="text-center">
                <p className="font-handwritten text-lg text-walnut/70 mb-2">Дата на участие</p>
                <p className="font-handwritten text-2xl font-bold text-walnut">
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
              className="text-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/my-tickets"
                className="inline-flex items-center gap-3 px-10 py-5 bg-bulgarian-red text-white font-handwritten text-xl md:text-2xl font-bold hover:bg-dark-walnut transition-all shadow-xl"
              >
                <span>🎟️</span>
                <span>Виж моите билети →</span>
              </Link>
              <p className="font-handwritten text-lg text-walnut/70 mt-4">
                Следи билетите си и увеличавай шансовете за печалба!
              </p>
            </motion.div>
          </div>

          {/* 2-Column Layout: Selected Products + Completed Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Selected Products */}
            <div className="relative bg-sunflower/10 border-2 border-sunflower/50 p-6">
              <h2 className="font-handwritten text-2xl text-bulgarian-red mb-4 font-bold">
                Избрани продукти ({selectedProductsList.length})
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {selectedProductsList.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border-2 border-bulgarian-red/20 p-3 flex flex-col items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.nameBg}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <span className="font-handwritten text-lg font-bold text-walnut text-center">
                      {product.nameBg}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="relative bg-bulgarian-blue/5 border-2 border-bulgarian-blue/30 p-6">
              <h2 className="font-handwritten text-2xl text-bulgarian-red mb-4 font-bold">Завършени задачи</h2>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-8 h-8 bg-bulgarian-red rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-handwritten text-xl text-walnut">Facebook харесване</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-8 h-8 bg-bulgarian-red rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-handwritten text-xl text-walnut">Коментар с "Искам Бачо Илия"</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-8 h-8 bg-bulgarian-red rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-handwritten text-xl text-walnut">Споделяне в социални мрежи</span>
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
        <div className="bg-bulgarian-blue/10 border-4 border-bulgarian-blue/40 p-8 mb-8 shadow-xl">
          <h3 className="font-handwritten text-3xl md:text-4xl font-bold text-bulgarian-red mb-6">
            Какво следва?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-3xl font-bold text-bulgarian-red min-w-[40px]">1.</span>
              <span className="font-handwritten text-xl text-walnut">Ще получиш потвърдителен email на <span className="font-bold">{userData.email}</span></span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-3xl font-bold text-bulgarian-red min-w-[40px]">2.</span>
              <span className="font-handwritten text-xl text-walnut"><span className="font-bold">ВАЖНО:</span> Коментирай "Искам Бачо Илия" под поста във Facebook за да завършиш участието си!</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-3xl font-bold text-bulgarian-red min-w-[40px]">3.</span>
              <span className="font-handwritten text-xl text-walnut">Сподели още веднъж за допълнителни шансове за печалба!</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-3xl font-bold text-bulgarian-red min-w-[40px]">4.</span>
              <span className="font-handwritten text-xl text-walnut">Печелившите ще бъдат обявени на <span className="font-bold">{giveawayDate.toLocaleDateString('bg-BG')}</span></span>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-handwritten text-3xl font-bold text-bulgarian-red min-w-[40px]">5.</span>
              <span className="font-handwritten text-xl text-walnut">Ако спечелиш, ще те уведомим по email и телефон</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleStartOver}
            className="px-10 py-4 border-4 border-walnut/40 text-walnut font-handwritten font-bold text-xl hover:bg-walnut/5 transition-all"
          >
            ЗАПОЧНИ ОТНАЧАЛО
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="font-handwritten text-2xl text-walnut">
            Успех! Пожелаваме ти късмет в раздаването!
          </p>
        </div>
      </div>
    </div>
  );
}
