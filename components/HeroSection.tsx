'use client';

import { motion } from 'framer-motion';
import { ChefHat, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-warm-brown mb-6">
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