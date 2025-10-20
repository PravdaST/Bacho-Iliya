'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import CountdownTimer from '@/components/CountdownTimer';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const router = useRouter();
  const { userData, selectedProducts, tasks, generateEntryId, entryId } = useGiveawayStore();

  const selectedProductsList = products.filter((p) => selectedProducts.includes(p.id));

  // Set giveaway date to 30 days from now
  const giveawayDate = new Date();
  giveawayDate.setDate(giveawayDate.getDate() + 30);

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
  const [copied, setCopied] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Generate referral link
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/?ref=${currentEntryId}`
    : '';

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentEntryId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="font-handwritten text-5xl md:text-6xl text-bulgarian-red mb-3">
              Успешно участие!
            </h1>
            <p className="font-handwritten text-2xl text-walnut mb-2">
              Благодарим ти, {userData.name}!
            </p>
            <p className="font-handwritten text-xl text-walnut">
              Вече участваш в раздаването
            </p>
          </div>

          {/* Entry ID - Certificate Style */}
          <div className="relative mb-8 text-center bg-bulgarian-red/5 border-4 border-bulgarian-red p-8">
            <p className="font-handwritten text-xs text-walnut/60 uppercase tracking-wider mb-3">Твоят уникален номер на участие:</p>
            <motion.p
              className="font-handwritten text-4xl md:text-5xl font-bold text-bulgarian-red mb-6 tracking-wider"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            >
              {currentEntryId}
            </motion.p>
            <button
              onClick={handleCopyCode}
              className="px-8 py-4 bg-bulgarian-red border-2 border-walnut/30 text-white font-handwritten font-bold text-lg hover:scale-105 transition-all inline-flex items-center gap-2 shadow-xl"
            >
              {copied ? '✓ КОПИРАН!' : 'КОПИРАЙ КОДА'}
            </button>
            <p className="font-handwritten text-xs text-walnut/70 mt-4">Запази този код - ще ти трябва при теглене на наградата</p>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Име</p>
              <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Телефон</p>
              <p className="text-lg font-semibold text-gray-800">{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Дата на участие</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date().toLocaleDateString('bg-BG')}
              </p>
            </div>
          </div>

          {/* Selected Products */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">Избрани продукти ({selectedProductsList.length})</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedProductsList.map((product) => (
                <div
                  key={product.id}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.nameBg}
                    className="w-16 h-16 object-contain mb-2 bg-white rounded-lg p-1"
                  />
                  <span className="text-xs font-medium text-white text-center">
                    {product.nameBg}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks - Vintage Bulgarian Style */}
          <div>
            <p className="text-sm text-amber-700 font-semibold mb-3">Завършени задачи</p>
            <div className="space-y-2">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-amber-900">Facebook последване</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-amber-900">Instagram последване</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-amber-900">Споделяне в социални мрежи</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Referral Section - Vintage Bulgarian Style */}
        <div
          className="bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-amber-300 shadow-md hover:shadow-lg transition-shadow"
          role="region"
          aria-label="Раздел за препоръки към приятели"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-1">
                  Покани приятели за бонус участия!
                </h3>
                <p className="text-sm text-amber-700">Увеличи шансовете си многократно</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex flex-col items-center justify-center min-w-[80px]">
              <span className="text-4xl font-bold leading-none">+3</span>
              <span className="text-xs uppercase tracking-wide mt-1">участия</span>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-white rounded-xl p-4 mb-4 border border-amber-200">
            <p className="text-sm text-amber-800 mb-2 font-semibold">Твоят уникален линк:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                aria-label="Твоя уникален препоръчителен линк"
                className="flex-1 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm font-handwritten text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                onClick={handleCopyReferralLink}
                aria-label={copiedRef ? "Линкът е копиран" : "Копирай препоръчителния линк"}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                {copiedRef ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="hidden sm:inline">Копиран</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            <p className="text-sm text-amber-800 font-medium mb-3">Или сподели директно:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleShare('facebook')}
                aria-label="Сподели във Facebook"
                className="flex-1 min-w-[120px] px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                onClick={() => handleShare('viber')}
                aria-label="Сподели във Viber"
                className="flex-1 min-w-[120px] px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.617 6.55 20.34h.005l-.004 2.416s-.037.98.589 1.177c.716.232 1.04-.223 3.267-2.883 3.724.323 6.584-.417 6.909-.525.752-.252 5.007-.815 5.695-6.645.707-5.993-.36-9.774-2.867-11.592C18.175.495 14.827.028 11.4 0zm.131 1.665c2.942 0 5.914.396 7.752 1.91 2.189 1.797 2.883 4.865 2.27 9.942-.61 5.048-4.058 5.256-4.659 5.458-.263.089-2.816.733-6.014.485 0 0-2.37 2.86-3.113 3.585-.092.09-.196.125-.27.11-.096-.017-.115-.126-.115-.289v-3.776s-.004-.035-.004-.055c-4.866-1.404-4.568-5.945-4.514-8.553.055-2.609.553-4.669 1.95-6.15 1.9-1.776 5.306-2.07 6.716-2.096l.001-.001z" />
                </svg>
                Viber
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                aria-label="Сподели в WhatsApp"
                className="flex-1 min-w-[120px] px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-900">
              <strong className="font-handwritten" style={{ fontFamily: 'Playfair Display, serif' }}>Как работи:</strong> Всеки приятел, който се регистрира през твоя линк, ти носи <strong className="font-handwritten" style={{ fontFamily: 'Playfair Display, serif' }}>+3 допълнителни участия</strong> в томболата!
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Какво следва?
          </h3>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Ще получиш потвърдителен email на <strong>{userData.email}</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span><strong>ВАЖНО:</strong> Коментирай "Искам Бачо Илия" под поста във Facebook за да завършиш участието си!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Сподели още веднъж за допълнителни шансове за печалба!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Печелившите ще бъдат обявени на <strong>{giveawayDate.toLocaleDateString('bg-BG')}</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">5.</span>
              <span>Ако спечелиш, ще те уведомим по email и телефон</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleStartOver}
            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
          >
            ← Започни отначало
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Успех! Пожелаваме ти късмет в раздаването!
          </p>
        </div>
      </div>
    </div>
  );
}
