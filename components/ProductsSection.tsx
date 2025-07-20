'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';
import Image from 'next/image';

const productCategories = [
  {
    id: 1,
    title: "Сирене",
    description: "Традиционно българско сирене от най-качествено овче и краве мляко",
    mainImage: "/products/sirene/sirene-1.webp",
    images: [
      "/products/sirene/sirene-1.webp",
      "/products/sirene/sirene-2.webp",
      "/products/sirene/sirene-3.webp"
    ]
  },
  {
    id: 2,
    title: "Кашкавал",
    description: "Зрял кашкавал с богат вкус и аромат, създаден по стари български рецепти",
    mainImage: "/products/kashkaval/kashkaval-1.webp",
    images: [
      "/products/kashkaval/kashkaval-1.webp",
      "/products/kashkaval/kashkaval-2.webp",
      "/products/kashkaval/kashkaval-3.webp"
    ]
  },
  {
    id: 3,
    title: "Кисело мляко",
    description: "Прясно кисело мляко с живи култури, богато на полезни бактерии",
    mainImage: "/products/kiselo-mlqko/kiselo-mlqko-1.webp",
    images: [
      "/products/kiselo-mlqko/kiselo-mlqko-1.webp",
      "/products/kiselo-mlqko/kiselo-mlqko-2.webp"
    ]
  }
];

export default function ProductsSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<typeof productCategories[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openGallery = (category: typeof productCategories[0]) => {
    setSelectedGallery(category);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedGallery.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedGallery.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="products" className="py-20 lg:py-32 bg-gradient-to-br from-cream to-warm-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-warm-brown mb-6">
            Нашите продукти
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Всеки продукт е създаден с любов и внимание към традициите на българската кулинария
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => openGallery(category)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image 
                    src={category.mainImage} 
                    alt={category.title} 
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye size={48} className="mx-auto mb-2" />
                      <p className="font-semibold">Виж галерия</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-traditional-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.images.length} снимки
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGallery(null)}
          >
            <motion.div
              className="max-w-4xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 text-white">
                <h3 className="text-2xl font-playfair font-bold">{selectedGallery.title}</h3>
                <button
                  onClick={() => setSelectedGallery(null)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Main Image */}
              <div className="relative flex-1 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
                <Image 
                  src={selectedGallery.images[currentImageIndex]} 
                  alt={`${selectedGallery.title} - ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
                
                {/* Navigation Arrows */}
                {selectedGallery.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                  {currentImageIndex + 1} / {selectedGallery.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {selectedGallery.images.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {selectedGallery.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'border-traditional-red' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <Image 
                        src={image} 
                        alt={`${selectedGallery.title} thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}