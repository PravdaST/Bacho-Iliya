'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInVariants, staggerContainer } from '@/hooks/use-scroll-animation';
import { getAllStores, getAllCities, getStoresByCity, StoreLocation } from '@/lib/stores-data';
import { useState } from 'react';
import { MapPinIcon, PhoneIcon, ClockIcon, PackageIcon } from 'lucide-react';
import { TruckIcon, SnowflakeIcon, PackageIcon as BoxIcon } from '@/components/ui/Icon';

export default function WhereToBuyPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: storesRef, isInView: storesInView } = useScrollAnimation(0.1);

  const allStores = getAllStores();
  const cities = getAllCities();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = allStores.filter((store) => {
    const matchesCity = selectedCity === 'all' || store.city === selectedCity;
    const matchesSearch =
      searchQuery === '' ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const getStoreTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      supermarket: 'Супермаркет',
      'local-shop': 'Местен магазин',
      market: 'Пазар',
      specialty: 'Специализиран',
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-cream relative min-h-screen overflow-hidden">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-30" />

      {/* Subtle decorative elements */}
      <div className="bg-dark-walnut/3 pointer-events-none absolute top-32 right-20 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-heritage-red/5 pointer-events-none absolute bottom-40 left-10 h-32 w-32 rounded-full blur-2xl" />

      <div className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="mx-auto mb-20 max-w-5xl text-center"
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInVariants} className="mb-6">
            <span className="bg-heritage-red text-cream font-heading inline-block px-8 py-3 text-sm font-bold tracking-wider uppercase">
              Магазини
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-dark-walnut mb-6 text-5xl leading-tight md:text-7xl"
            variants={fadeInVariants}
          >
            Къде да намериш нашите продукти
          </motion.h1>

          <motion.p
            className="font-body text-dark-walnut/70 mx-auto mb-8 max-w-3xl text-xl leading-relaxed md:text-2xl"
            variants={fadeInVariants}
          >
            Бачо Илия е навсякъде в България. Открий най-близкия до теб магазин и се насладѝ на
            истинския вкус.
          </motion.p>
        </motion.div>

        {/* Coming Soon - Online Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="from-accent-gold/10 to-heritage-red/5 border-accent-gold/30 relative mx-auto mb-20 max-w-5xl overflow-hidden border-2 bg-gradient-to-br p-12"
        >
          {/* Decorative corner elements */}
          <div className="border-accent-gold/20 absolute top-0 left-0 h-24 w-24 border-t-4 border-l-4" />
          <div className="border-accent-gold/20 absolute right-0 bottom-0 h-24 w-24 border-r-4 border-b-4" />

          <div className="relative z-10 text-center">
            {/* Animated Truck Icon */}
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="bg-accent-gold text-cream rounded-full p-6">
                <TruckIcon size={56} />
              </div>
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
              className="bg-heritage-red text-cream font-heading mb-6 inline-block px-8 py-3 text-sm font-bold tracking-wider uppercase"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Очаквайте скоро
            </motion.div>

            {/* Main Heading */}
            <h2 className="font-heading text-dark-walnut mb-6 text-4xl leading-tight md:text-6xl">
              Доставка до вашата врата
            </h2>

            {/* Description */}
            <p className="font-body text-dark-walnut/70 mx-auto mb-12 max-w-2xl text-lg leading-relaxed md:text-xl">
              Работим усилено да направим автентичните продукти на Бачо Илия достъпни навсякъде в
              България с бърза и хладилна доставка.
            </p>

            {/* Features Grid */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-cream/80 border-heritage-red border-l-4 p-6">
                <div className="mb-2 flex items-center gap-3">
                  <TruckIcon className="text-heritage-red" size={32} />
                  <p className="font-heading text-dark-walnut text-xl">Бърза доставка</p>
                </div>
                <p className="font-body text-dark-walnut/60">До 24-48 часа</p>
              </div>
              <div className="bg-cream/80 border-accent-gold border-l-4 p-6">
                <div className="mb-2 flex items-center gap-3">
                  <SnowflakeIcon className="text-accent-gold" size={32} />
                  <p className="font-heading text-dark-walnut text-xl">Хладилна логистика</p>
                </div>
                <p className="font-body text-dark-walnut/60">Перфектно състояние</p>
              </div>
              <div className="bg-cream/80 border-dark-walnut border-l-4 p-6">
                <div className="mb-2 flex items-center gap-3">
                  <BoxIcon className="text-dark-walnut" size={32} />
                  <p className="font-heading text-dark-walnut text-xl">Безплатна доставка</p>
                </div>
                <p className="font-body text-dark-walnut/60">При поръчка над 100 лв</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elegant Divider */}
        <div className="mx-auto mb-16 max-w-5xl">
          <div className="flex items-center gap-4">
            <div className="via-heritage-red/30 h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
            <span className="font-heading text-dark-walnut/40 text-xl tracking-wider uppercase">
              А междувременно
            </span>
            <div className="via-heritage-red/30 h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
          </div>
        </div>

        {/* Filters and Search */}
        <motion.div
          ref={storesRef}
          className="mx-auto mb-16 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* City Filter */}
            <div>
              <label className="font-heading text-dark-walnut mb-4 block text-2xl">
                Избери град:
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCity('all')}
                  className={`font-body border-2 px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                    selectedCity === 'all'
                      ? 'bg-heritage-red text-cream border-heritage-red'
                      : 'bg-cream text-dark-walnut border-dark-walnut/20 hover:border-heritage-red'
                  }`}
                >
                  Всички
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`font-body border-2 px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                      selectedCity === city
                        ? 'bg-heritage-red text-cream border-heritage-red'
                        : 'bg-cream text-dark-walnut border-dark-walnut/20 hover:border-heritage-red'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="font-heading text-dark-walnut mb-4 block text-2xl">
                Търси магазин:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Име, град или адрес..."
                className="border-dark-walnut/20 font-body text-dark-walnut placeholder:text-dark-walnut/40 focus:border-heritage-red w-full border-2 bg-white px-6 py-4 text-lg transition-colors duration-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2">
            <div className="bg-dark-walnut/10 h-px flex-1" />
            <p className="font-body text-dark-walnut/70 text-sm tracking-wider uppercase">
              Намерени магазини:{' '}
              <span className="text-heritage-red font-bold">{filteredStores.length}</span>
            </p>
            <div className="bg-dark-walnut/10 h-px flex-1" />
          </div>
        </motion.div>

        {/* Store List - Heritage Design */}
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredStores.map((store: StoreLocation, index: number) => (
              <motion.div
                key={store.id}
                className="border-dark-walnut/10 hover:border-heritage-red/30 group relative overflow-hidden border-2 bg-white transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Heritage top accent */}
                <div className="from-heritage-red via-accent-gold to-heritage-red absolute top-0 right-0 left-0 h-1 bg-gradient-to-r" />

                <div className="p-8">
                  {/* Store type badge - Heritage style */}
                  <span className="bg-dark-walnut/5 border-dark-walnut/20 text-dark-walnut font-body mb-4 inline-block border px-4 py-1 text-xs font-bold tracking-wider uppercase">
                    {getStoreTypeLabel(store.type)}
                  </span>

                  {/* Store name */}
                  <h3 className="font-heading text-dark-walnut group-hover:text-heritage-red mb-6 text-3xl leading-tight transition-colors">
                    {store.name}
                  </h3>

                  {/* Store info */}
                  <div className="space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="text-heritage-red mt-1 h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-body text-dark-walnut leading-relaxed">
                          {store.address}
                        </p>
                        <p className="font-body text-dark-walnut/70 mt-1 text-sm tracking-wider uppercase">
                          {store.city}
                        </p>
                      </div>
                    </div>

                    {/* Working hours */}
                    <div className="flex items-start gap-3">
                      <ClockIcon className="text-heritage-red mt-1 h-5 w-5 flex-shrink-0" />
                      <p className="font-body text-dark-walnut leading-relaxed">
                        {store.workingHours}
                      </p>
                    </div>

                    {/* Phone */}
                    {store.phone && (
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="text-heritage-red mt-1 h-5 w-5 flex-shrink-0" />
                        <a
                          href={`tel:${store.phone}`}
                          className="font-body text-dark-walnut hover:text-heritage-red transition-colors duration-300"
                        >
                          {store.phone}
                        </a>
                      </div>
                    )}

                    {/* Description */}
                    {store.description && (
                      <div className="border-dark-walnut/10 mt-4 border-t pt-4">
                        <p className="font-body text-dark-walnut/60 text-sm leading-relaxed italic">
                          {store.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="border-accent-gold/10 absolute right-0 bottom-0 h-16 w-16 border-r-2 border-b-2 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {filteredStores.length === 0 && (
            <div className="bg-accent-gold/10 border-accent-gold border-l-4 p-10 text-center">
              <p className="font-heading text-dark-walnut mb-2 text-2xl">Няма намерени магазини</p>
              <p className="font-body text-dark-walnut/60">
                Опитай друг град или промени търсенето
              </p>
            </div>
          )}
        </motion.div>

        {/* Bottom CTA - Heritage style */}
        <motion.div
          className="from-dark-walnut to-heritage-red text-cream relative mx-auto mt-20 max-w-5xl overflow-hidden bg-gradient-to-br p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Decorative corners */}
          <div className="border-cream/10 absolute top-0 left-0 h-32 w-32 border-t-4 border-l-4" />
          <div className="border-cream/10 absolute right-0 bottom-0 h-32 w-32 border-r-4 border-b-4" />

          <div className="relative z-10 text-center">
            <h2 className="font-heading mb-6 text-4xl leading-tight text-white md:text-5xl">
              Не можеш да намериш продуктите ни в твоя град?
            </h2>
            <p className="font-body mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white">
              Свържи се с нас и ние ще направим всичко възможно да ги доставим до теб. Истинският
              вкус трябва да бъде достъпен за всички!
            </p>
            <a href="mailto:contact@bacho-iliya.eu">
              <button className="bg-cream text-heritage-red font-heading hover:bg-accent-gold hover:text-cream px-10 py-5 text-sm font-bold tracking-wider uppercase shadow-xl transition-all duration-300">
                Свържи се с нас →
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
