import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Award } from "lucide-react";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";

export default function Footer() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <motion.footer 
      ref={ref}
      className="bg-gradient-to-br from-traditional-red via-red-600 to-traditional-red text-white py-16 relative overflow-hidden"
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid md:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          <motion.div 
            className="md:col-span-2"
            variants={fadeInVariants}
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/30 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Award size={24} className="text-white" />
              </motion.div>
              <h3 className="font-playfair text-3xl font-bold">
                Бачо Илия
              </h3>
            </motion.div>
            <motion.p 
              className="text-white/90 mb-6 text-lg"
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
              className="font-semibold mb-6 text-xl text-white/90"
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
              className="font-semibold mb-6 text-xl text-white/90"
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
              {[Facebook, Instagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariants}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                >
                  <Icon size={24} className="text-white" />
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              <Mail size={18} className="text-traditional-red" />
              <span>kauza@bachoiliya.bg</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-cream/20 mt-12 pt-8 text-center"
          variants={fadeInVariants}
        >
          <motion.p 
            className="text-white/60 mb-4"
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
