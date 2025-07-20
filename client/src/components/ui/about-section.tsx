import { motion } from "framer-motion";
import { useScrollAnimation, fadeInVariants, slideInFromLeftVariants, slideInFromRightVariants } from "@/hooks/use-scroll-animation";

export default function AboutSection() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <motion.section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cream via-white to-warm-beige relative overflow-hidden px-4 sm:px-6 lg:px-8" 
      id="about"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-warm-beige/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center min-h-[500px]">
          <motion.div
            variants={slideInFromLeftVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-warm-beige/20 to-cream/20 rounded-3xl blur-lg opacity-75"></div>
              <img 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Traditional Bulgarian dairy farm" 
                className="relative rounded-2xl shadow-2xl w-full h-auto max-h-96 object-cover border-2 border-warm-beige/30"
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={slideInFromRightVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h2 
              className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-gray-900"
              variants={fadeInVariants}
              transition={{ delay: 0.6 }}
            >
              НАШАТА КАУЗА Е ПРОСТА.
            </motion.h2>
            <motion.div 
              className="text-lg text-gray-700 leading-relaxed space-y-6"
              variants={fadeInVariants}
              transition={{ delay: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Ние сме в битка с компромиса. Срещу безвкусното, гумено, воднисто нещо, което се преструва на сирене. Срещу лъжата на етикета. Ние вярваме в 100% мляко. Вярваме в истинския вкус. Вярваме, че това, което слагаш на масата си, е избор.
              </motion.p>
              <motion.p 
                className="text-gray-900 font-semibold text-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                Избери истинското.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
