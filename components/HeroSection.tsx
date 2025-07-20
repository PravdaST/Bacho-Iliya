'use client';

import { motion } from 'framer-motion';
import { ChefHat, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-cream via-warm-beige/20 to-cream"
    >
      {/* Cow silhouettes in corners - exactly like original */}
      <div className="absolute top-8 left-8 opacity-30 text-warm-brown">
        <svg width="80" height="60" viewBox="0 0 80 60" fill="currentColor">
          <path d="M15 45c-3 0-5-2-5-5s2-5 5-5c1 0 2 0 3 1 1-2 3-3 5-3s4 1 5 3c1-1 2-1 3-1 3 0 5 2 5 5s-2 5-5 5H15z"/>
          <ellipse cx="20" cy="30" rx="8" ry="12"/>
          <ellipse cx="30" cy="30" rx="6" ry="10"/>
          <circle cx="18" cy="25" r="1"/>
          <circle cx="22" cy="25" r="1"/>
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-8 opacity-40 text-warm-brown transform rotate-12">
        <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
          <path d="M10 35c-2 0-4-2-4-4s2-4 4-4c1 0 2 0 2 1 1-2 2-2 4-2s3 1 4 2c1-1 1-1 2-1 2 0 4 2 4 4s-2 4-4 4H10z"/>
          <ellipse cx="15" cy="22" rx="6" ry="9"/>
          <ellipse cx="23" cy="22" rx="5" ry="8"/>
          <circle cx="13" cy="19" r="1"/>
          <circle cx="17" cy="19" r="1"/>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-warm-brown mb-6">
            Бачо Илия
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Автентични български млечни продукти с вековна традиция
          </p>
          <motion.div
            className="flex justify-center items-center gap-4 mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Heart className="text-traditional-red" size={32} />
            <span className="text-lg text-warm-brown font-semibold">Направено с любов и традиция</span>
            <ChefHat className="text-traditional-red" size={32} />
          </motion.div>
          
          <motion.a
            href="#quiz"
            className="inline-block bg-traditional-red text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-traditional-red/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Открийте нашите продукти
          </motion.a>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-warm-brown/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <ChefHat size={60} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-traditional-red/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Heart size={80} />
      </motion.div>
    </section>
  );
}