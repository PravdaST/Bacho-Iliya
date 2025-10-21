'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden flex items-center justify-center px-4 py-24">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-4xl mx-auto relative">
        {/* Polaroid Photo Frame */}
        <motion.div
          className="bg-white p-8 md:p-12 shadow-2xl border-4 border-walnut/40 relative"
          style={{ transform: 'rotate(-2deg)' }}
          initial={{ opacity: 0, y: 50, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Paper Texture */}
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          {/* Notebook Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/15"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30 hidden md:block" />

          {/* Content */}
          <div className="relative text-center">
            {/* 404 Number - Large and Handwritten */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <h1 className="font-handwritten text-bulgarian-red text-[120px] md:text-[180px] leading-none">
                404
              </h1>
            </motion.div>

            {/* Bacho's Photo */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 5 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-white border-4 border-walnut/40 shadow-xl" style={{ transform: 'rotate(-5deg)' }}>
                <Image
                  src="/Bachi ilia head logo_.webp"
                  alt="Бачо Илия"
                  fill
                  className="object-cover p-2"
                />
                {/* Photo Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-walnut/60" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-walnut/60" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-walnut/60" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-walnut/60" />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="font-handwritten text-walnut text-4xl md:text-5xl mb-4">
                Ех, загубихме страницата!
              </h2>
              <p className="font-handwritten text-walnut/80 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                Тази страница се изгуби като бабината рецепта за баница...
                Може би никога не е съществувала, а може би я изядоха кравите!
              </p>
              <p className="font-handwritten text-bulgarian-red text-lg md:text-xl italic">
                "Не се притеснявай, дете. Важното е, че сиренето е добро!" - Бачо Илия
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                href="/"
                className="px-8 py-4 bg-bulgarian-red border-4 border-walnut/40 text-white font-handwritten text-xl font-bold hover:scale-105 transition-all shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Към Началото</span>
                <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white border-4 border-walnut/40 text-walnut font-handwritten text-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                Виж Продуктите
              </Link>
              <Link
                href="/recipes"
                className="px-8 py-4 bg-white border-4 border-sunflower/40 text-walnut font-handwritten text-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                Виж Рецептите
              </Link>
            </motion.div>
          </div>

          {/* Decorative Coffee Stains */}
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-walnut/10 blur-lg opacity-30 pointer-events-none" />
          <div className="absolute top-12 left-12 w-16 h-16 rounded-full bg-walnut/10 blur-md opacity-30 pointer-events-none" />

          {/* Washi Tape */}
          <div
            className="absolute -top-6 left-1/4 w-32 h-10 bg-bulgarian-red/20 opacity-60"
            style={{ transform: 'rotate(-15deg)' }}
          />
          <div
            className="absolute -bottom-6 right-1/4 w-32 h-10 bg-sunflower/30 opacity-60"
            style={{ transform: 'rotate(15deg)' }}
          />
        </motion.div>

        {/* Lost Cow Illustration */}
        <motion.div
          className="text-center mt-8"
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
