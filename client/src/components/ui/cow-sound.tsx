import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useCowSound } from "@/hooks/use-cow-sound";

export default function CowSound() {
  useCowSound();

  return (
    <motion.div
      className="fixed top-4 left-4 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-2 bg-warm-brown/80 backdrop-blur-sm text-cream px-3 py-2 rounded-full shadow-lg"
        animate={{ 
          opacity: [1, 0.7, 1] 
        }}
        transition={{ 
          duration: 2, 
          repeat: 2, 
          ease: "easeInOut" 
        }}
      >
        <Volume2 size={16} />
        <span className="text-sm font-medium">Мууууу! 🐄</span>
      </motion.div>
    </motion.div>
  );
}