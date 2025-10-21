'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ProductCard({ product, isSelected, onToggle }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Различна ротация за всеки продукт базирана на ID
  const getRotation = () => {
    const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg'];
    const index = product.id.length % rotations.length;
    return rotations[index];
  };

  const handleClick = () => {
    onToggle();
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="h-full min-h-[520px] perspective-1000"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: parseFloat(getRotation()) }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        onClick={handleClick}
      >
        {/* Front Side - Vintage Photo Frame */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* White Photo Frame - как в стари снимки */}
          <div className="bg-white p-6 shadow-2xl h-full flex flex-col border-4 border-gray-200">
            {/* Photo with thick inner border */}
            <div className="relative w-full aspect-square mb-4 border-8 border-walnut/10 bg-old-paper overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.nameBg} - Автентични български млечни продукти от Бачо Илия`}
                fill
                sizes="280px"
                className="object-cover"
                priority={true}
              />

              {/* Vintage Photo Corners - по-големи и по-изразителни */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-walnut/60" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-walnut/60" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-walnut/60" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-walnut/60" />
            </div>

            {/* Product Info - под снимката */}
            <div className="text-center space-y-2">
              {/* Product Name - handwritten style */}
              <h3 className="font-handwritten text-walnut text-2xl">
                {product.nameBg}
              </h3>

              {/* Description - smaller serif */}
              <p className="font-handwritten text-walnut/70 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Aging effect on frame */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-walnut blur-xl" />
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-walnut blur-lg" />
            </div>
          </div>
        </div>

        {/* Back Side - Handwritten Note */}
        <div
          className="absolute inset-0 w-full h-full rounded-lg overflow-hidden shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Notebook Paper Background */}
          <div className="absolute inset-0 bg-old-paper">
            {/* Ruled Lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-b border-faded-denim/30"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                />
              ))}
            </div>
          </div>

          {/* Handwritten Content */}
          <div className="relative p-6 h-full flex flex-col">
            {/* Bacho's Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/Bachi ilia head logo_.webp"
                  alt="Бачо Илия"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="font-handwritten text-bulgarian-red text-xl">
                Бачо казва:
              </div>
            </div>

            {/* Description - Handwritten Style */}
            <div className="flex-1 font-handwritten text-walnut text-lg leading-relaxed">
              <p className="mb-4">{product.description}</p>

              {product.bachoRecommendation && (
                <p className="italic text-bulgarian-red">
                  "{product.bachoRecommendation}"
                </p>
              )}
            </div>

            {/* Flip Back Button */}
            <button
              onClick={handleFlip}
              className="w-full py-2 text-sm font-handwritten text-walnut/60 hover:text-walnut transition-colors border-t border-dashed border-walnut/20"
            >
              « Обратно към снимката
            </button>
          </div>
        </div>

        {/* Communist Stamp "ОДОБРЕНО" - Appears when selected */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-8 right-8 z-20 pointer-events-none"
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 12, opacity: 1 }}
              exit={{ scale: 0, rotate: -45, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Circular Stamp */}
              <div className="relative w-24 h-24">
                {/* Outer Circle */}
                <div className="absolute inset-0 rounded-full border-4 border-bulgarian-red" />

                {/* Inner Content */}
                <div className="absolute inset-2 flex flex-col items-center justify-center">
                  {/* Text */}
                  <div className="font-handwritten text-xs font-bold text-bulgarian-red text-center leading-tight mb-1">
                    ОДОБРЕНО
                  </div>

                  {/* Year */}
                  <div className="font-handwritten text-xs text-bulgarian-red">
                    {new Date().getFullYear()}
                  </div>
                </div>

                {/* Stamp Texture */}
                <div className="absolute inset-0 rounded-full opacity-30 mix-blend-multiply pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, transparent 30%, rgba(220,20,60,0.3) 70%)'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
