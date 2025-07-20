"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Award, Shield, X, Eye } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation, fadeInVariants, staggerContainer, scaleInVariants } from "@/hooks/use-scroll-animation";

// Product images paths - using public folder approach
const productImages = {
  sirene: {
    sirene300vac: "/products/sirene/BI-sirene-300-vac-480x480.png",
    sirene400metal: "/products/sirene/BI-sirene-400-metal-480x480.png",
    sirene4kg: "/products/sirene/BI-sirene-4KG-480x480.png",
    sirene800metal: "/products/sirene/BI-sirene-800-metal-480x480.png",
    sirene8kg: "/products/sirene/BI-sirene-8KG-480x480.jpg"
  },
  kashkaval: {
    kashkaval1500: "/products/kashkaval/BI-kashkaval-1500-480x480.png",
    kashkaval300vac: "/products/kashkaval/BI-kashkaval-300-vac-480x480.png",
    kashkaval7000: "/products/kashkaval/BI-kashkaval-7000-480x480.jpg",
    sirene200vac: "/products/kashkaval/BI-sirene-200-vac-480x480.png"
  },
  kiseloMlqko: {
    kiseloMlqko2: "/products/kiselo-mlqko/BI-kiselo-mlyqko-2-480x480.jpg",
    kiseloMlqko36: "/products/kiselo-mlqko/BI-kiselo-mlyqko-3.6-480x480.jpg",
    kiseloMlqko45: "/products/kiselo-mlqko/BI-kiselo-mlyqko-4.5-480x480.jpg"
  }
};

const products = [
  {
    id: 1,
    name: 'Сирене "Бачо Илия"',
    description: "Истинският вкус. Без компромис.",
    features: ["100% мляко", "Без добавки", "Традиционна рецепта"],
    image: productImages.sirene.sirene400metal,
    icon: Star,
    category: 'sirene',
    productImages: [
      { name: "Сирене 300г вакуум", image: productImages.sirene.sirene300vac, description: "300г във вакуумна опаковка" },
      { name: "Сирене 400г метал", image: productImages.sirene.sirene400metal, description: "400г в метална кутия" },
      { name: "Сирене 4кг", image: productImages.sirene.sirene4kg, description: "4кг за големи семейства" },
      { name: "Сирене 800г метал", image: productImages.sirene.sirene800metal, description: "800г в метална кутия" },
      { name: "Сирене 8кг", image: productImages.sirene.sirene8kg, description: "8кг търговска опаковка" }
    ]
  },
  {
    id: 2,
    name: 'Кашкавал "Бачо Илия"',
    description: "Силата на традицията.",
    features: ["Зреене минимум 60 дни", "Естествен цвят", "Богат вкус"],
    image: productImages.kashkaval.kashkaval1500,
    icon: Award,
    category: 'kashkaval',
    productImages: [
      { name: "Кашкавал 1.5кг", image: productImages.kashkaval.kashkaval1500, description: "1.5кг семейна опаковка" },
      { name: "Кашкавал 300г вакуум", image: productImages.kashkaval.kashkaval300vac, description: "300г във вакуумна опаковка" },
      { name: "Кашкавал 7кг", image: productImages.kashkaval.kashkaval7000, description: "7кг търговска опаковка" },
      { name: "Сирене 200г вакуум", image: productImages.kashkaval.sirene200vac, description: "200г във вакуумна опаковка" }
    ]
  },
  {
    id: 3,
    name: 'Кисело мляко "Бачо Илия"',
    description: "Чиста енергия. Без добавки.",
    features: ["Lactobacillus bulgaricus", "Натурална закваска", "Пълномаслено"],
    image: productImages.kiseloMlqko.kiseloMlqko36,
    icon: Shield,
    category: 'kiselo-mlqko',
    productImages: [
      { name: "Кисело мляко 2%", image: productImages.kiseloMlqko.kiseloMlqko2, description: "2% мазнини, леко и свежо" },
      { name: "Кисело мляко 3.6%", image: productImages.kiseloMlqko.kiseloMlqko36, description: "3.6% мазнини, балансиран вкус" },
      { name: "Кисело мляко 4.5%", image: productImages.kiseloMlqko.kiseloMlqko45, description: "4.5% мазнини, богат и кремообразен" }
    ]
  }
];

export default function ProductsSection() {
  const { ref, isInView } = useScrollAnimation(0.2);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
                className="group cursor-pointer"
                variants={scaleInVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-warm-beige/30 relative overflow-hidden">
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-warm-beige/10 to-cream/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  
                  

                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-32 h-32 object-cover rounded-xl mx-auto mb-6 mt-4 border-2 border-warm-beige/20"
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
                    className="space-y-2 text-sm text-gray-600 relative z-10 mb-6"
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
                        className="hover:text-warm-brown transition-colors duration-200 cursor-default text-left"
                      >
                        ✓ {feature}
                      </motion.p>
                    ))}
                  </motion.div>

                  {/* View Products Button */}
                  <motion.button
                    className="relative z-10 bg-traditional-red text-white font-semibold py-2 px-4 rounded-lg hover:bg-traditional-red/90 transition-colors duration-300 flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    <Eye size={16} />
                    Виж продуктите
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Product Gallery Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-warm-brown">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <X size={20} className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Product Gallery */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedProduct.productImages.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <h4 className="font-semibold text-warm-brown mb-2">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Features List */}
                <div className="mt-8 p-6 bg-gradient-to-r from-cream/50 to-warm-beige/20 rounded-xl">
                  <h4 className="font-playfair text-xl font-bold text-warm-brown mb-4">
                    Защо да избереш {selectedProduct.name}?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedProduct.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-traditional-red rounded-full"></div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Открий автентичния български вкус с продукти "Бачо Илия"!
                  </p>
                  <motion.button
                    className="bg-traditional-red text-white font-semibold py-3 px-8 rounded-xl hover:bg-traditional-red/90 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProduct(null)}
                  >
                    Затвори галерията
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
