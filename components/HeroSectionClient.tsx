'use client';

import { motion } from 'framer-motion';

export default function HeroSectionClient() {
  return (
    <section
      className="bg-cream relative min-h-[85vh] overflow-hidden"
      style={{ position: 'relative', zIndex: 10 }}
    >
      <div className="grid min-h-[85vh] lg:grid-cols-[55fr_45fr]">
        {/* Left Column - Video Storytelling (55%) */}
        <motion.div
          className="relative h-[40vh] overflow-hidden lg:h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/bacho-video-poster.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bacho-video.mp4" type="video/mp4" />
          </video>

          {/* Subtle overlay for depth */}
          <div className="bg-dark-walnut/10 absolute inset-0" />
        </motion.div>

        {/* Right Column - Clean & Focused Content (45%) */}
        <div className="bg-cream relative flex flex-col justify-center px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-xl space-y-8 lg:mx-0 lg:space-y-12">
            {/* Main Headline */}
            <motion.h1
              className="font-heading text-dark-walnut text-5xl leading-tight sm:text-6xl lg:text-7xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Спечели вкуса от детството
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-body text-dark-walnut text-xl leading-relaxed sm:text-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Истински млечни продукти, направени точно както баба ги правеше
            </motion.p>

            {/* Giveaway Ended Notice */}
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
            >
              <div
                className="bg-gray-400 inline-block w-full px-12 py-6 text-center cursor-not-allowed sm:w-auto sm:px-16 sm:py-8 rounded-lg"
              >
                <p
                  className="font-heading text-2xl font-bold tracking-wider uppercase sm:text-3xl"
                  style={{ color: '#ffffff' }}
                >
                  ИГРАТА ПРИКЛЮЧИ
                </p>
                <p className="text-white/80 text-sm mt-2">Благодарим на всички участници!</p>
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              className="text-dark-walnut flex items-center justify-center gap-3 sm:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex items-center gap-1">
                <span className="text-accent-gold text-lg">★★★★★</span>
              </div>
              <span className="font-body text-base sm:text-lg">
                Над 2,500 семейства вече участват
              </span>
            </motion.div>

            {/* Heritage Badge */}
            <motion.div
              className="text-center sm:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <p className="font-heading text-dark-walnut/70 text-sm tracking-widest uppercase">
                Традиция от 1999
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
