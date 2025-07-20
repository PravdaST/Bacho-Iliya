import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp, Heart } from "lucide-react";

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPulseCTA, setShowPulseCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setShowPulseCTA(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3 sm:gap-4">
      <AnimatePresence>
        {showPulseCTA && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToQuiz}
            className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-traditional-red to-warm-brown rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 bg-traditional-red rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Icon container */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Heart size={20} className="sm:w-6 sm:h-6 text-cream" />
            </motion.div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-warm-brown text-cream text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Присъедини се!
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-traditional-red backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "hsl(0, 70%, 45%)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} className="sm:w-6 sm:h-6 text-white" />
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-traditional-red text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Нагоре
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}