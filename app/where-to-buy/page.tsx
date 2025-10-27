"use client";

import { motion } from "framer-motion";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";
import { getAllStores, getAllCities, getStoresByCity, StoreLocation } from "@/lib/stores-data";
import { useState } from "react";
import { MapPinIcon, PhoneIcon, ClockIcon, PackageIcon } from "lucide-react";
import { TruckIcon, SnowflakeIcon, PackageIcon as BoxIcon } from "@/components/ui/Icon";

export default function WhereToBuyPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: storesRef, isInView: storesInView } = useScrollAnimation(0.1);

  const allStores = getAllStores();
  const cities = getAllCities();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = allStores.filter(store => {
    const matchesCity = selectedCity === "all" || store.city === selectedCity;
    const matchesSearch = searchQuery === "" ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const getStoreTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'supermarket': 'Супермаркет',
      'local-shop': 'Местен магазин',
      'market': 'Пазар',
      'specialty': 'Специализиран'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30 pointer-events-none" />

      {/* Subtle decorative elements */}
      <div className="absolute top-32 right-20 w-40 h-40 bg-dark-walnut/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-heritage-red/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="max-w-5xl mx-auto mb-20 text-center"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInVariants} className="mb-6">
            <span className="inline-block bg-heritage-red text-cream px-8 py-3 font-heading text-sm font-bold tracking-wider uppercase">
              Магазини
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl md:text-7xl text-dark-walnut mb-6 leading-tight"
            variants={fadeInVariants}
          >
            Къде да намериш нашите продукти
          </motion.h1>

          <motion.p
            className="font-body text-xl md:text-2xl text-dark-walnut/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInVariants}
          >
            Бачо Илия е навсякъде в България. Открий най-близкия до теб магазин и се насладѝ на истинския вкус.
          </motion.p>
        </motion.div>

        {/* Coming Soon - Online Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-20 bg-gradient-to-br from-accent-gold/10 to-heritage-red/5 border-2 border-accent-gold/30 p-12 relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-accent-gold/20" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-accent-gold/20" />

          <div className="relative z-10 text-center">
            {/* Animated Truck Icon */}
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-accent-gold text-cream p-6 rounded-full">
                <TruckIcon size={56} />
              </div>
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
              className="inline-block bg-heritage-red text-cream px-8 py-3 font-heading text-sm font-bold tracking-wider mb-6 uppercase"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Очаквайте скоро
            </motion.div>

            {/* Main Heading */}
            <h2 className="font-heading text-4xl md:text-6xl text-dark-walnut mb-6 leading-tight">
              Доставка до вашата врата
            </h2>

            {/* Description */}
            <p className="font-body text-lg md:text-xl text-dark-walnut/70 leading-relaxed max-w-2xl mx-auto mb-12">
              Работим усилено да направим автентичните продукти на Бачо Илия достъпни навсякъде в България с бърза и хладилна доставка.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-cream/80 p-6 border-l-4 border-heritage-red">
                <div className="flex items-center gap-3 mb-2">
                  <TruckIcon className="text-heritage-red" size={32} />
                  <p className="font-heading text-xl text-dark-walnut">Бърза доставка</p>
                </div>
                <p className="font-body text-dark-walnut/60">До 24-48 часа</p>
              </div>
              <div className="bg-cream/80 p-6 border-l-4 border-accent-gold">
                <div className="flex items-center gap-3 mb-2">
                  <SnowflakeIcon className="text-accent-gold" size={32} />
                  <p className="font-heading text-xl text-dark-walnut">Хладилна логистика</p>
                </div>
                <p className="font-body text-dark-walnut/60">Перфектно състояние</p>
              </div>
              <div className="bg-cream/80 p-6 border-l-4 border-dark-walnut">
                <div className="flex items-center gap-3 mb-2">
                  <BoxIcon className="text-dark-walnut" size={32} />
                  <p className="font-heading text-xl text-dark-walnut">Безплатна доставка</p>
                </div>
                <p className="font-body text-dark-walnut/60">При поръчка над 50 лв</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elegant Divider */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-heritage-red/30 to-transparent" />
            <span className="font-heading text-xl text-dark-walnut/40 uppercase tracking-wider">
              А междувременно
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-heritage-red/30 to-transparent" />
          </div>
        </div>

        {/* Filters and Search */}
        <motion.div
          ref={storesRef}
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* City Filter */}
            <div>
              <label className="block font-heading text-2xl text-dark-walnut mb-4">
                Избери град:
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCity("all")}
                  className={`px-6 py-3 font-body text-sm font-bold tracking-wider border-2 transition-all duration-300 uppercase ${
                    selectedCity === "all"
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
                    className={`px-6 py-3 font-body text-sm font-bold tracking-wider border-2 transition-all duration-300 uppercase ${
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
              <label className="block font-heading text-2xl text-dark-walnut mb-4">
                Търси магазин:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Име, град или адрес..."
                className="w-full px-6 py-4 border-2 border-dark-walnut/20 bg-white font-body text-lg text-dark-walnut placeholder:text-dark-walnut/40 focus:outline-none focus:border-heritage-red transition-colors duration-300"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-dark-walnut/10" />
            <p className="font-body text-sm text-dark-walnut/50 tracking-wider uppercase">
              Намерени магазини: <span className="font-bold text-heritage-red">{filteredStores.length}</span>
            </p>
            <div className="h-px flex-1 bg-dark-walnut/10" />
          </div>
        </motion.div>

        {/* Store List - Heritage Design */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStores.map((store: StoreLocation, index: number) => (
              <motion.div
                key={store.id}
                className="bg-white border-2 border-dark-walnut/10 relative overflow-hidden hover:border-heritage-red/30 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Heritage top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-heritage-red via-accent-gold to-heritage-red" />

                <div className="p-8">
                  {/* Store type badge - Heritage style */}
                  <span className="inline-block bg-dark-walnut/5 border border-dark-walnut/20 text-dark-walnut px-4 py-1 text-xs font-body font-bold tracking-wider mb-4 uppercase">
                    {getStoreTypeLabel(store.type)}
                  </span>

                  {/* Store name */}
                  <h3 className="font-heading text-3xl text-dark-walnut mb-6 leading-tight group-hover:text-heritage-red transition-colors">
                    {store.name}
                  </h3>

                  {/* Store info */}
                  <div className="space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-5 h-5 text-heritage-red flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-body text-dark-walnut leading-relaxed">
                          {store.address}
                        </p>
                        <p className="font-body text-sm text-dark-walnut/50 tracking-wider mt-1 uppercase">
                          {store.city}
                        </p>
                      </div>
                    </div>

                    {/* Working hours */}
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-heritage-red flex-shrink-0 mt-1" />
                      <p className="font-body text-dark-walnut leading-relaxed">
                        {store.workingHours}
                      </p>
                    </div>

                    {/* Phone */}
                    {store.phone && (
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="w-5 h-5 text-heritage-red flex-shrink-0 mt-1" />
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
                      <div className="mt-4 pt-4 border-t border-dark-walnut/10">
                        <p className="font-body text-sm text-dark-walnut/60 italic leading-relaxed">
                          {store.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {filteredStores.length === 0 && (
            <div className="bg-accent-gold/10 border-l-4 border-accent-gold p-10 text-center">
              <p className="font-heading text-2xl text-dark-walnut mb-2">
                Няма намерени магазини
              </p>
              <p className="font-body text-dark-walnut/60">
                Опитай друг град или промени търсенето
              </p>
            </div>
          )}
        </motion.div>

        {/* Bottom CTA - Heritage style */}
        <motion.div
          className="max-w-5xl mx-auto mt-20 bg-gradient-to-br from-dark-walnut to-heritage-red text-cream p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-cream/10" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-cream/10" />

          <div className="relative z-10 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight">
              Не можеш да намериш продуктите ни в твоя град?
            </h2>
            <p className="font-body text-xl text-white leading-relaxed mb-8 max-w-2xl mx-auto">
              Свържи се с нас и ние ще направим всичко възможно да ги доставим до теб.
              Истинският вкус трябва да бъде достъпен за всички!
            </p>
            <a href="mailto:contact@bacho-iliya.eu">
              <button className="bg-cream text-heritage-red px-10 py-5 font-heading font-bold text-sm tracking-wider uppercase hover:bg-accent-gold hover:text-cream transition-all duration-300 shadow-xl">
                Свържи се с нас →
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
