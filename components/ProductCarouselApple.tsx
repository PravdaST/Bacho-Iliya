'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/store';

interface Props {
  products: Product[];
  selectedProducts: string[];
  onToggle: (productId: string) => void;
}

export default function ProductCarouselApple({ products, selectedProducts, onToggle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((activeIndex + 1) % products.length);
  const goPrev = () => setActiveIndex((activeIndex - 1 + products.length) % products.length);

  // Get 3 visible items
  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + products.length) % products.length;
      items.push({ product: products[index], position: i, index });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  // Apple-style minimal transforms - NO blur, NO rotation
  const getStyle = (position: number) => {
    const absPos = Math.abs(position);

    // Scale: very subtle
    const scale = position === 0 ? 1 : 0.88;

    // Opacity: clean fade
    const opacity = position === 0 ? 1 : 0.3;

    // Z-index
    const zIndex = 10 - absPos;

    // Horizontal position
    const x = position * 90; // percentage

    return { scale, opacity, zIndex, x };
  };

  return (
    <div className="relative py-12 bg-white">
      {/* Counter - Apple minimal style */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gray-100 px-5 py-2 rounded-full">
          <span className="text-sm font-medium text-gray-700">
            {activeIndex + 1} of {products.length}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Apple Minimal Style</p>
      </div>

      {/* Container */}
      <div className="relative h-[530px] overflow-hidden flex items-center justify-center">
        {/* Navigation - Apple style minimal arrows */}
        <button
          onClick={goPrev}
          className="absolute left-8 z-20 w-10 h-10 bg-black/5 hover:bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-8 z-20 w-10 h-10 bg-black/5 hover:bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="sync">
            {visibleItems.map(({ product, position, index }) => {
              const style = getStyle(position);
              const isCentered = position === 0;

              return (
                <motion.div
                  key={`${index}-${position}`}
                  className="absolute w-80"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: style.scale,
                    opacity: style.opacity,
                    x: `${style.x}%`,
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1], // Apple's signature easing
                  }}
                  style={{
                    zIndex: style.zIndex,
                    cursor: isCentered ? 'default' : 'pointer',
                  }}
                  onClick={() => !isCentered && setActiveIndex(index)}
                >
                  <div className={`transition-shadow duration-300 ${
                    isCentered ? 'shadow-xl' : 'shadow-md'
                  }`}>
                    <ProductCard
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={() => onToggle(product.id)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots - Apple style */}
      <div className="flex justify-center gap-1.5 mt-8">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-6 bg-gray-800'
                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to product ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-gray-400 mt-6 font-light tracking-wide">
        Click side cards to navigate
      </p>
    </div>
  );
}
