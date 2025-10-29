'use client';

import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function GiveawayFormClient() {
  const router = useRouter();
  const { selectedProducts, toggleProduct, setCurrentStep } = useGiveawayStore();

  const handleContinue = () => {
    if (selectedProducts.length === 0) {
      alert('Моля, изберете поне един продукт');
      return;
    }
    setCurrentStep(2);
    router.push('/register');
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    const container = document.getElementById('products-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Mobile Navigation Arrows */}
      <button
        onClick={() => scrollProducts('left')}
        className="bg-bulgarian-red hover:bg-dark-walnut absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-xl transition-colors md:hidden"
        aria-label="Предишен продукт"
      >
        ←
      </button>
      <button
        onClick={() => scrollProducts('right')}
        className="bg-bulgarian-red hover:bg-dark-walnut absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-xl transition-colors md:hidden"
        aria-label="Следващ продукт"
      >
        →
      </button>

      {/* Products Grid */}
      <div
        id="products-container"
        className="mb-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 md:grid md:snap-none md:grid-cols-2 md:overflow-x-visible lg:grid-cols-3"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[75vw] flex-shrink-0 snap-center sm:w-[70vw] md:w-auto"
          >
            <ProductCard
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggle={() => toggleProduct(product.id)}
            />
          </div>
        ))}
      </div>

      {/* Mobile scroll indicator dots */}
      <div className="mb-6 flex justify-center gap-2 md:hidden">
        {products.map((_, index) => (
          <div key={index} className="bg-walnut/30 h-2 w-2 rounded-full" />
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={selectedProducts.length === 0}
          aria-label="Продължи към регистрация"
          className={`focus:ring-sunflower min-h-[56px] rounded-full px-8 py-5 text-lg font-bold shadow-lg transition-all duration-300 focus:ring-4 focus:ring-offset-2 focus:outline-none sm:px-12 sm:py-4 ${
            selectedProducts.length > 0
              ? 'bg-bulgarian-red text-white hover:scale-105 hover:bg-red-700 hover:shadow-2xl'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          } `}
        >
          {selectedProducts.length > 0
            ? `Участвай сега (${selectedProducts.length} продукта) →`
            : 'Избери продукти за да продължиш'}
        </button>
        {selectedProducts.length === 0 && (
          <p className="mt-4 text-sm text-gray-600">→ Можеш да избереш повече от един продукт</p>
        )}
        {selectedProducts.length > 0 && (
          <p className="mt-4 text-sm font-semibold text-green-600">
            ✓ Супер! Още само 2 минути до участието
          </p>
        )}
      </div>
    </div>
  );
}
