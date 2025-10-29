'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="bg-old-paper relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-4xl">
        {/* Polaroid Photo Frame */}
        <motion.div
          className="border-walnut/40 relative border-4 bg-white p-8 shadow-2xl md:p-12"
          style={{ transform: 'rotate(-2deg)' }}
          initial={{ opacity: 0, y: 50, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Paper Texture */}
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          {/* Notebook Lines */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/15 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-16 hidden w-px md:block" />

          {/* Content */}
          <div className="relative text-center">
            {/* 404 Number - Large and Handwritten */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <h1 className="font-handwritten text-bulgarian-red text-[120px] leading-none md:text-[180px]">
                404
              </h1>
            </motion.div>

            {/* Bacho's Photo */}
            <motion.div
              className="relative mx-auto mb-8 h-32 w-32"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 5 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div
                className="border-walnut/40 absolute inset-0 border-4 bg-white shadow-xl"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <Image
                  src="/Bachi ilia head logo_.webp"
                  alt="Бачо Илия"
                  fill
                  className="object-cover p-2"
                />
                {/* Photo Corners */}
                <div className="border-walnut/60 absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2" />
                <div className="border-walnut/60 absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2" />
                <div className="border-walnut/60 absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2" />
                <div className="border-walnut/60 absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2" />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="font-handwritten text-walnut mb-4 text-4xl md:text-5xl">
                Ех, загубихме страницата!
              </h2>
              <p className="font-handwritten text-walnut/80 mx-auto max-w-2xl text-xl leading-relaxed md:text-2xl">
                Тази страница се изгуби като бабината рецепта за баница... Може би никога не е
                съществувала, а може би я изядоха кравите!
              </p>
              <p className="font-handwritten text-bulgarian-red text-lg italic md:text-xl">
                "Не се притеснявай, дете. Важното е, че сиренето е добро!" - Бачо Илия
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                href="/"
                className="bg-bulgarian-red border-walnut/40 font-handwritten group relative overflow-hidden border-4 px-8 py-4 text-xl font-bold shadow-xl transition-all hover:scale-105"
              >
                <span className="relative z-10" style={{ color: '#ffffff' }}>
                  Към Началото
                </span>
                <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />
              </Link>
              <Link
                href="/products"
                className="border-walnut/40 text-walnut font-handwritten border-4 bg-white px-8 py-4 text-xl font-bold shadow-xl transition-all hover:scale-105"
              >
                Виж Продуктите
              </Link>
              <Link
                href="/recipes"
                className="border-sunflower/40 text-walnut font-handwritten border-4 bg-white px-8 py-4 text-xl font-bold shadow-xl transition-all hover:scale-105"
              >
                Виж Рецептите
              </Link>
            </motion.div>
          </div>

          {/* Decorative Coffee Stains */}
          <div className="bg-walnut/10 pointer-events-none absolute right-8 bottom-8 h-24 w-24 rounded-full opacity-30 blur-lg" />
          <div className="bg-walnut/10 pointer-events-none absolute top-12 left-12 h-16 w-16 rounded-full opacity-30 blur-md" />

          {/* Washi Tape */}
          <div
            className="bg-bulgarian-red/20 absolute -top-6 left-1/4 h-10 w-32 opacity-60"
            style={{ transform: 'rotate(-15deg)' }}
          />
          <div
            className="bg-sunflower/30 absolute right-1/4 -bottom-6 h-10 w-32 opacity-60"
            style={{ transform: 'rotate(15deg)' }}
          />
        </motion.div>

        {/* Lost Cow Illustration */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="font-handwritten text-walnut/60 text-lg">
            (Кравите пасат спокойно, всичко е наред)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
