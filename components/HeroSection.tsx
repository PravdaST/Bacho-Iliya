'use client';

import { motion } from 'framer-motion';
import { ChefHat, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Cinematic video background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80"></div>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6 leading-tight text-center">
            Революцията на истинския вкус започна.
          </h1>
          <p className="text-xl sm:text-2xl text-red-400 mb-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            Време е да избереш страна.
          </p>
          {/* Arrow pointing down */}
          <motion.div
            className="flex justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </motion.div>
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