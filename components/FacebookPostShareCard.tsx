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
    <div className="space-y-3">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-village text-bulgarian-red mb-1 text-lg md:text-xl">
          СПЕЧЕЛИ ПОВЕЧЕ БИЛЕТИ
        </h2>
        <p className="text-handwritten text-walnut text-xs md:text-sm">
          Сподели с приятели и увеличи шансовете си!
        </p>
      </div>

      {/* Two Column Layout: Facebook POST + Direct Referral */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Option 1: Facebook POST Share */}
        <div className="space-y-2">
          <h3 className="font-handwritten text-center text-base font-bold text-blue-700 md:text-lg">
            ВАРИАНТ 1: Сподели Facebook Пост
          </h3>
          <motion.div
            className="border-walnut/30 border bg-white p-4 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-handwritten text-walnut/70 mb-3 text-center text-xs md:text-sm">
              Най-добър за максимални билети!
            </p>

            <p className="font-handwritten text-walnut mb-3 text-sm">
              Сподели линка към нашия Facebook пост и получи билети за всеки регистриран!
            </p>

            {/* Rewards */}
            <div className="bg-cream-50 border-walnut/20 mb-3 border p-2">
              <div className="mb-1 flex items-center justify-between text-xs md:text-sm">
                <span className="font-handwritten text-walnut">Първа регистрация:</span>
                <span className="font-handwritten text-sunflower text-lg font-bold md:text-xl">
                  +5
                </span>
              </div>
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="font-handwritten text-walnut">Всяка следваща:</span>
                <span className="font-handwritten text-bulgarian-red text-base font-bold md:text-lg">
                  +3
                </span>
              </div>
            </div>

            {/* Link Input */}
            <div className="space-y-2">
              <label className="font-handwritten text-walnut block text-xs font-bold md:text-sm">
                Твоят Facebook POST линк:
              </label>
              <input
                type="text"
                value={postShareLink}
                readOnly
                className="bg-old-paper border-walnut/30 font-handwritten text-walnut w-full border px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCopy(postShareLink, 'post')}
                  className="font-handwritten w-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white transition-all hover:bg-blue-700 md:text-base"
                >
                  {copiedPost ? '✓ Копиран' : 'Копирай линка'}
                </button>
                <button
                  onClick={handleOpenFacebook}
                  className="bg-bulgarian-red font-handwritten hover:bg-walnut w-full px-3 py-1.5 text-sm font-bold text-white transition-all md:text-base"
                >
                  Отвори Facebook
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-3 border-l-2 border-blue-600 bg-blue-50 p-2">
              <p className="font-handwritten text-walnut/70 mb-0.5 text-xs">
                От Facebook POST споделяния:
              </p>
              <p className="font-handwritten text-base font-bold text-blue-700 md:text-lg">
                {facebookPostShares} {facebookPostShares === 1 ? 'регистрация' : 'регистрации'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Option 2: Direct Referral */}
        <div className="space-y-2">
          <h3 className="font-handwritten text-bulgarian-red text-center text-base font-bold md:text-lg">
            ВАРИАНТ 2: Директен Референс
          </h3>
          <motion.div
            className="border-walnut/30 border bg-white p-4 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-handwritten text-walnut/70 mb-3 text-center text-xs md:text-sm">
              Изпрати директно на приятели
            </p>

            <p className="font-handwritten text-walnut mb-3 text-sm">
              Изпрати референс линк в WhatsApp, Viber, SMS или email на приятели.
            </p>

            {/* Rewards */}
            <div className="bg-cream-50 border-walnut/20 mb-3 border p-2">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="font-handwritten text-walnut">За всяка регистрация:</span>
                <span className="font-handwritten text-bulgarian-red text-base font-bold md:text-lg">
                  +3
                </span>
              </div>
            </div>

            {/* Link Input */}
            <div className="space-y-2">
              <label className="font-handwritten text-walnut block text-xs font-bold md:text-sm">
                Твоят директен линк:
              </label>
              <input
                type="text"
                value={directReferralLink}
                readOnly
                className="bg-old-paper border-walnut/30 font-handwritten text-walnut focus:ring-bulgarian-red w-full border px-2 py-1.5 text-xs focus:ring-1 focus:outline-none"
              />
              <button
                onClick={() => handleCopy(directReferralLink, 'direct')}
                className="bg-bulgarian-red font-handwritten hover:bg-walnut w-full px-3 py-1.5 text-sm font-bold text-white transition-all md:text-base"
              >
                {copiedDirect ? '✓ Копиран' : 'Копирай линка'}
              </button>
            </div>

            {/* Stats */}
            <div className="bg-sunflower/10 border-sunflower mt-3 border-l-2 p-2">
              <p className="font-handwritten text-walnut/70 mb-0.5 text-xs">Директни референси:</p>
              <p className="font-handwritten text-dark-walnut text-base font-bold md:text-lg">
                {referralCount} {referralCount === 1 ? 'приятел' : 'приятели'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-old-paper border-walnut/20 border p-3">
        <h4 className="font-handwritten text-bulgarian-red mb-2 text-sm font-bold md:text-base">
          Как работи?
        </h4>
        <ul className="font-handwritten text-walnut space-y-1 text-xs md:text-sm">
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
