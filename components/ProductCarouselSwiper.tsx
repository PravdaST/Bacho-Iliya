'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/store';

interface Props {
  products: Product[];
  selectedProducts: string[];
  onToggle: (productId: string) => void;
}

export default function ProductCarouselSwiper({ products, selectedProducts, onToggle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((activeIndex + 1) % products.length);
  const goPrev = () => setActiveIndex((activeIndex - 1 + products.length) % products.length);

  // Get 5 visible items with infinite loop
  const getVisibleItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + products.length) % products.length;
      items.push({ product: products[index], position: i, index });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  // Calculate 3D transforms based on position
  const getTransform = (position: number) => {
    const absPos = Math.abs(position);

    // Rotation - straničnite se zavărtat
    const rotateY = position * -50; // -100, -50, 0, 50, 100

    // Scale - center е biggest
    const scale = position === 0 ? 1 : absPos === 1 ? 0.8 : 0.6;

    // Translate Z for depth
    const translateZ = position === 0 ? 0 : absPos === 1 ? -100 : -200;

    // Opacity
    const opacity = position === 0 ? 1 : absPos === 1 ? 0.7 : 0.4;

    // Z-index
    const zIndex = 10 - absPos;

    return { rotateY, scale, translateZ, opacity, zIndex };
  };

  return (
    <div className="relative py-12">
      {/* Counter */}
      <div className="mb-8 text-center">
        <p className="font-semibold text-gray-600">
          {activeIndex + 1} / {products.length}
        </p>
        <p className="mt-1 text-sm text-gray-500">3D Coverflow Style</p>
      </div>

      {/* 3D Container */}
      <div
        className="relative flex h-[550px] items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Navigation */}
        <button
          onClick={goPrev}
          className="absolute left-4 z-30 rounded-full bg-white p-4 shadow-xl transition-transform hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-4 z-30 rounded-full bg-white p-4 shadow-xl transition-transform hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Cards */}
        <div className="relative flex h-full w-full items-center justify-center">
          {visibleItems.map(({ product, position, index }) => {
            const transform = getTransform(position);
            const isCentered = position === 0;

            return (
              <motion.div
                key={index}
                className="absolute w-80"
                initial={{ opacity: 0 }}
                animate={{
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  z: transform.translateZ,
                  opacity: transform.opacity,
                  x: position * 280, // spacing
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: transform.zIndex,
                  cursor: isCentered ? 'default' : 'pointer',
                }}
                onClick={() => !isCentered && setActiveIndex(index)}
              >
                <div
                  className={`transform transition-shadow ${
                    isCentered ? 'shadow-2xl' : 'shadow-lg'
                  }`}
                >
                  <ProductCard
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onToggle={() => onToggle(product.id)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === activeIndex ? 'bg-bulgarian-red w-8' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
