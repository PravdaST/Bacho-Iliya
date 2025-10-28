'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FacebookPostShareCardProps {
  entryId: string;
  facebookPostShares: number;
  referralCount: number;
  baseUrl?: string;
}

export default function FacebookPostShareCard({
  entryId,
  facebookPostShares,
  referralCount,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bacho-iliya.eu',
}: FacebookPostShareCardProps) {
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedDirect, setCopiedDirect] = useState(false);

  // Facebook POST share link (UTM tagged)
  const postShareLink = `${baseUrl}/?ref=${entryId}&utm_source=facebook&utm_medium=post_share`;

  // Direct referral link (no UTM)
  const directReferralLink = `${baseUrl}/?ref=${entryId}`;

  const handleCopy = async (link: string, type: 'post' | 'direct') => {
    try {
      await navigator.clipboard.writeText(link);
      if (type === 'post') {
        setCopiedPost(true);
        setTimeout(() => setCopiedPost(false), 2000);
      } else {
        setCopiedDirect(true);
        setTimeout(() => setCopiedDirect(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleOpenFacebook = () => {
    window.open('https://www.facebook.com/bachoimlekoproizvodi', '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-village text-2xl md:text-3xl text-bulgarian-red mb-2">
          СПЕЧЕЛИ ПОВЕЧЕ БИЛЕТИ
        </h2>
        <p className="text-handwritten text-base md:text-lg text-walnut">
          Сподели с приятели и увеличи шансовете си!
        </p>
      </div>

      {/* Option 1: Facebook POST Share */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 via-cream-50 to-blue-100 border-2 border-blue-500/50 p-4 md:p-6 shadow-xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📘</span>
            </div>
            <div>
              <h3 className="font-handwritten text-lg md:text-xl font-bold text-blue-700">
                ВАРИАНТ 1: Сподели Facebook Пост
              </h3>
              <p className="font-handwritten text-sm md:text-base text-walnut/80">
                Най-добър за максимални билети!
              </p>
            </div>
          </div>

          <p className="font-handwritten text-sm md:text-base text-walnut mb-3">
            Сподели линка към нашия Facebook пост и получи билети за всеки регистриран!
          </p>

          {/* Rewards */}
          <div className="bg-white p-3 mb-3 border-2 border-blue-500/30 rounded">
            <div className="flex items-center justify-between mb-1">
              <span className="font-handwritten text-sm md:text-base text-walnut">🎟️ Първа регистрация:</span>
              <span className="font-handwritten text-2xl md:text-3xl font-bold text-sunflower">+5 билета</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-handwritten text-sm md:text-base text-walnut">🎟️ Всяка следваща:</span>
              <span className="font-handwritten text-xl md:text-2xl font-bold text-bulgarian-red">+3 билета</span>
            </div>
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <label className="font-handwritten text-sm md:text-base text-walnut font-bold block">
              Твоят Facebook POST линк:
            </label>
            <input
              type="text"
              value={postShareLink}
              readOnly
              className="w-full px-3 py-2 bg-old-paper border-2 border-walnut/30 text-sm font-handwritten text-walnut focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleCopy(postShareLink, 'post')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-handwritten text-base md:text-lg font-bold hover:bg-blue-700 transition-all"
              >
                {copiedPost ? '✓ Копиран' : 'Копирай линка'}
              </button>
              <button
                onClick={handleOpenFacebook}
                className="flex-1 px-4 py-2 bg-bulgarian-red text-white font-handwritten text-base md:text-lg font-bold hover:bg-walnut transition-all"
              >
                Отвори Facebook
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-3 bg-blue-100 p-3 border-l-2 border-blue-600">
            <p className="font-handwritten text-xs md:text-sm text-walnut/70 mb-0.5">
              От Facebook POST споделяния:
            </p>
            <p className="font-handwritten text-xl md:text-2xl font-bold text-blue-700">
              {facebookPostShares} {facebookPostShares === 1 ? 'регистрация' : 'регистрации'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Option 2: Direct Referral */}
      <motion.div
        className="bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 border-2 border-walnut/40 p-4 md:p-6 shadow-xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-bulgarian-red rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🔗</span>
            </div>
            <div>
              <h3 className="font-handwritten text-lg md:text-xl font-bold text-bulgarian-red">
                ВАРИАНТ 2: Директен Референс
              </h3>
              <p className="font-handwritten text-sm md:text-base text-walnut/80">
                Изпрати директно на приятели
              </p>
            </div>
          </div>

          <p className="font-handwritten text-sm md:text-base text-walnut mb-3">
            Изпрати референс линк в WhatsApp, Viber, SMS или email на приятели.
          </p>

          {/* Rewards */}
          <div className="bg-white p-3 mb-3 border-2 border-walnut/30 rounded">
            <div className="flex items-center justify-between">
              <span className="font-handwritten text-sm md:text-base text-walnut">🎟️ За всяка регистрация:</span>
              <span className="font-handwritten text-2xl md:text-3xl font-bold text-bulgarian-red">+3 билета</span>
            </div>
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <label className="font-handwritten text-sm md:text-base text-walnut font-bold block">
              Твоят директен линк:
            </label>
            <input
              type="text"
              value={directReferralLink}
              readOnly
              className="w-full px-3 py-2 bg-old-paper border-2 border-walnut/30 text-sm font-handwritten text-walnut focus:outline-none focus:ring-2 focus:ring-bulgarian-red"
            />
            <button
              onClick={() => handleCopy(directReferralLink, 'direct')}
              className="w-full px-4 py-2 bg-bulgarian-red text-white font-handwritten text-base md:text-lg font-bold hover:bg-walnut transition-all"
            >
              {copiedDirect ? '✓ Копиран' : 'Копирай линка'}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-3 bg-sunflower/20 p-3 border-l-2 border-sunflower">
            <p className="font-handwritten text-xs md:text-sm text-walnut/70 mb-0.5">
              Директни референси:
            </p>
            <p className="font-handwritten text-xl md:text-2xl font-bold text-dark-walnut">
              {referralCount} {referralCount === 1 ? 'приятел' : 'приятели'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Help Text */}
      <div className="bg-old-paper border-2 border-walnut/20 p-3 md:p-4">
        <h4 className="font-handwritten text-base md:text-lg font-bold text-bulgarian-red mb-2">
          💡 Как работи?
        </h4>
        <ul className="space-y-1.5 font-handwritten text-sm md:text-base text-walnut">
          <li className="flex items-start gap-2">
            <span className="text-sunflower font-bold">1.</span>
            <span>Избери ВАРИАНТ 1 за Facebook или ВАРИАНТ 2 за WhatsApp/Viber</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sunflower font-bold">2.</span>
            <span>Копирай линка и сподели с приятели</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sunflower font-bold">3.</span>
            <span>Когато приятел се регистрира → ТИ получаваш билети автоматично!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sunflower font-bold">4.</span>
            <span>Колкото повече споделяш = повече билети = по-голям шанс за награда!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
