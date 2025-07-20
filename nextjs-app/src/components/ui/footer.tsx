"use client";

import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Award, Youtube } from "lucide-react";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";

export default function Footer() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <motion.footer 
      ref={ref}
      className="text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(to bottom right, #E22526, #c41e3a, #E22526)`
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 bg-white/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          <motion.div 
            className="sm:col-span-2 lg:col-span-2"
            variants={fadeInVariants}
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/logo.png" 
                alt="Бачо Илия Logo" 
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </motion.div>
            <motion.p 
              className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg"
              variants={fadeInVariants}
            >
              Движението за истински вкус. Без компромиси, без лъжи.
            </motion.p>
            <motion.div 
              className="flex items-center gap-2 text-white/80"
              variants={fadeInVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Heart size={20} className="text-traditional-red animate-pulse" />
              <span className="font-semibold">Направено с любов в България</span>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <motion.h4 
              className="font-semibold mb-4 sm:mb-6 text-lg sm:text-xl text-white/90"
              whileHover={{ x: 5 }}
            >
              Движението
            </motion.h4>
            <ul className="space-y-3">
              {["Истински продукти", "Българска традиция", "Без компромиси"].map((value, index) => (
                <motion.li 
                  key={value}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.05 }}
                >
                  ✓ {value}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <motion.h4 
              className="font-semibold mb-4 sm:mb-6 text-lg sm:text-xl text-white/90"
              whileHover={{ x: 5 }}
            >
              Последвай ни
            </motion.h4>
            <motion.div 
              className="flex gap-4 mb-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.a
                href="https://www.facebook.com/Bacho.Iliya/"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInVariants}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                aria-label="Следвай ни във Facebook"
              >
                <Facebook size={24} className="text-white" />
              </motion.a>

              <motion.a
                href="https://www.youtube.com/@bachoiliyabg"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInVariants}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                aria-label="Следвай ни в YouTube"
              >
                <Youtube size={24} className="text-white" />
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@bachoiliyabg"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInVariants}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                aria-label="Следвай ни в TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12.525 1.058a13.096 13.096 0 0 1 4.376 0 4.048 4.048 0 0 1 3.041 3.041 13.096 13.096 0 0 1 0 4.376 4.048 4.048 0 0 1-3.041 3.041c-1.39.142-2.986.142-4.376 0a4.048 4.048 0 0 1-3.041-3.041 13.096 13.096 0 0 1 0-4.376 4.048 4.048 0 0 1 3.041-3.041zM12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zM18.9 6.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"/>
                </svg>
              </motion.a>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              <Mail size={18} className="text-white" />
              <span>contact@bacho-iliya.eu</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Visual divider */}
        <motion.div 
          className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"
          variants={fadeInVariants}
        />

        <motion.div 
          className="text-center text-white/60"
          variants={fadeInVariants}
        >
          <motion.p 
            className="text-white/60 mb-3 sm:mb-4 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
          >
            © 2025 Бачо Илия. Всички права запазени. Движението тепърва започва.
          </motion.p>
          <motion.div
            className="flex justify-center items-center gap-2 text-white/80"
            animate={{ 
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Heart size={16} className="text-traditional-red" />
            <span className="text-sm">Създадено с вярата в истинското</span>
            <Heart size={16} className="text-traditional-red" />
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}