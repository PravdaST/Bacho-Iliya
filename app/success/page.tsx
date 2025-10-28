'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import CountdownTimer from '@/components/CountdownTimer';
import TicketCard from '@/components/TicketCard';
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
  const [copiedRef, setCopiedRef] = useState(false);

  // Generate referral link
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/?ref=${currentEntryId}`
    : '';

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = (platform: 'facebook' | 'viber' | 'whatsapp') => {
    const shareText = encodeURIComponent(
      `Спечели автентични млечни продукти от Бачо Илия! Регистрирай се през моя линк и получи бонус участия: ${referralLink}`
    );

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${shareText}`,
      viber: `viber://forward?text=${shareText}`,
      whatsapp: `https://wa.me/?text=${shareText}`,
    };

    window.open(shareUrls[platform], '_blank');
  };

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

        {/* Referral Section - Full Width */}
        <div
          className="bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 p-8 mb-8 border-4 border-bulgarian-red/40 shadow-xl"
          role="region"
          aria-label="Раздел за препоръки към приятели"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="font-handwritten text-3xl md:text-4xl font-bold text-bulgarian-red mb-2">
                Покани приятели за бонус билети! 🎟️
              </h3>
              <p className="font-handwritten text-xl text-walnut">Увеличи шансовете си многократно</p>
            </div>
            <div className="bg-bulgarian-red text-white px-8 py-5 border-4 border-walnut/30 shadow-lg flex flex-col items-center justify-center min-w-[120px]">
              <span className="font-handwritten text-5xl font-bold leading-none">+3</span>
              <span className="font-handwritten text-xl uppercase tracking-wide mt-1">билета</span>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-white p-6 mb-6 border-2 border-bulgarian-red/30">
            <p className="font-handwritten text-xl text-walnut mb-3 font-bold">Твоят уникален линк:</p>
            <div className="flex gap-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                aria-label="Твоя уникален препоръчителен линк"
                className="flex-1 px-4 py-3 bg-old-paper border-2 border-walnut/30 text-lg font-handwritten text-walnut focus:outline-none focus:ring-2 focus:ring-bulgarian-red"
              />
              <button
                onClick={handleCopyReferralLink}
                aria-label={copiedRef ? "Линкът е копиран" : "Копирай препоръчителния линк"}
                className="px-6 py-3 bg-bulgarian-red text-white font-handwritten text-xl font-bold hover:shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                {copiedRef ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="hidden sm:inline">Копиран</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden sm:inline">Копирай</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div>
            <p className="font-handwritten text-xl text-walnut font-bold mb-4">Или сподели директно:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleShare('facebook')}
                aria-label="Сподели във Facebook"
                className="px-6 py-4 bg-blue-600 text-white font-handwritten text-xl font-bold hover:bg-blue-700 hover:shadow-md transition-all inline-flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                onClick={() => handleShare('viber')}
                aria-label="Сподели във Viber"
                className="px-6 py-4 bg-purple-600 text-white font-handwritten text-xl font-bold hover:bg-purple-700 hover:shadow-md transition-all inline-flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.617 6.55 20.34h.005l-.004 2.416s-.037.98.589 1.177c.716.232 1.04-.223 3.267-2.883 3.724.323 6.584-.417 6.909-.525.752-.252 5.007-.815 5.695-6.645.707-5.993-.36-9.774-2.867-11.592C18.175.495 14.827.028 11.4 0zm.131 1.665c2.942 0 5.914.396 7.752 1.91 2.189 1.797 2.883 4.865 2.27 9.942-.61 5.048-4.058 5.256-4.659 5.458-.263.089-2.816.733-6.014.485 0 0-2.37 2.86-3.113 3.585-.092.09-.196.125-.27.11-.096-.017-.115-.126-.115-.289v-3.776s-.004-.035-.004-.055c-4.866-1.404-4.568-5.945-4.514-8.553.055-2.609.553-4.669 1.95-6.15 1.9-1.776 5.306-2.07 6.716-2.096l.001-.001z" />
                </svg>
                Viber
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                aria-label="Сподели в WhatsApp"
                className="px-6 py-4 bg-green-600 text-white font-handwritten text-xl font-bold hover:bg-green-700 hover:shadow-md transition-all inline-flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-5 bg-sunflower/20 border-2 border-sunflower/50">
            <p className="font-handwritten text-xl text-walnut">
              <span className="font-bold">Как работи:</span> Всеки приятел, който се регистрира през твоя линк, ти носи <span className="font-bold text-bulgarian-red">+3 нови билета 🎟️</span> в томболата!
            </p>
          </div>
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
