import { motion } from "framer-motion";
import { Star, Award, Shield } from "lucide-react";
import { useScrollAnimation, fadeInVariants, staggerContainer, scaleInVariants } from "@/hooks/use-scroll-animation";

const products = [
  {
    id: 1,
    name: 'Сирене "Бачо Илия"',
    description: "Истинският вкус. Без компромис.",
    features: ["100% мляко", "Без добавки", "Традиционна рецепта"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    icon: Star
  },
  {
    id: 2,
    name: 'Кашкавал "Бачо Илия"',
    description: "Силата на традицията.",
    features: ["Зреене минимум 60 дни", "Естествен цвят", "Богат вкус"],
    image: "https://images.unsplash.com/photo-1571060316726-12c33d3b0ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    icon: Award
  },
  {
    id: 3,
    name: 'Кисело мляко "Бачо Илия"',
    description: "Чиста енергия. Без добавки.",
    features: ["Lactobacillus bulgaricus", "Натурална закваска", "Пълномаслено"],
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    icon: Shield
  }
];

export default function ProductsSection() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <motion.section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cream via-warm-beige/30 to-cream relative overflow-hidden px-4 sm:px-6 lg:px-8" 
      id="products"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, hsl(25, 45%, 35%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(25, 45%, 35%) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-warm-brown mb-4 sm:mb-6"
            variants={fadeInVariants}
          >
            СИЛАТА НА ИСТИНСКОТО
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-4"
            variants={fadeInVariants}
          >
            Истинският вкус се постига с истински продукти.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.div 
                key={product.id} 
                className="group"
                variants={scaleInVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-warm-beige/30 relative overflow-hidden">
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-warm-beige/10 to-cream/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className="relative z-10 flex justify-center mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-warm-brown to-farm-brown rounded-full flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <IconComponent size={32} className="text-cream" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-32 h-32 object-cover rounded-xl mx-auto mb-6 border-2 border-warm-beige/20"
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="font-playfair text-2xl font-bold text-warm-brown mb-4 relative z-10"
                    whileHover={{ y: -2 }}
                  >
                    {product.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-700 mb-6 font-semibold relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {product.description}
                  </motion.p>
                  
                  <motion.div 
                    className="space-y-2 text-sm text-gray-600 relative z-10"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.5 + index * 0.2
                        }
                      }
                    }}
                  >
                    {product.features.map((feature, featureIndex) => (
                      <motion.p 
                        key={featureIndex}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ x: 5, scale: 1.05 }}
                        className="hover:text-warm-brown transition-colors duration-200 cursor-default"
                      >
                        ✓ {feature}
                      </motion.p>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
