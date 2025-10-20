"use client";

import { motion } from "framer-motion";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";
import { getAllStores, getAllCities, getStoresByCity, StoreLocation } from "@/lib/stores-data";
import { useState } from "react";
import { MapPinIcon, PhoneIcon, ClockIcon, PackageIcon } from "lucide-react";

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
      'specialty': 'Специализиран магазин'
    };
    return labels[type] || type;
  };

  const getStoreTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'supermarket': 'bg-bulgarian-red',
      'local-shop': 'bg-walnut',
      'market': 'bg-sunflower',
      'specialty': 'bg-faded-denim'
    };
    return colors[type] || 'bg-walnut';
  };

  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-40 pointer-events-none" />

      {/* Coffee stains */}
      <div className="absolute top-32 right-20 w-40 h-40 bg-walnut/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-walnut/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="max-w-7xl mx-auto mb-16 relative"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Notebook perforation holes */}
          <div className="absolute left-0 top-0 bottom-0 w-8 hidden lg:flex flex-col justify-start gap-8 pt-4 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-walnut/20 rounded-full shadow-inner" />
            ))}
          </div>

          {/* Left margin line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <div className="lg:ml-16">
            <motion.div variants={fadeInVariants} className="mb-6">
              <span className="inline-block bg-bulgarian-red text-white px-6 py-2 font-mono text-sm tracking-wider border-2 border-walnut/30">
                НАМЕРИ НИ
              </span>
            </motion.div>

            <motion.h1
              className="font-handwritten text-5xl md:text-7xl text-walnut mb-6 leading-tight"
              variants={fadeInVariants}
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.05)' }}
            >
              Къде да намериш нашите продукти
            </motion.h1>

            <motion.p
              className="font-serif text-xl md:text-2xl text-walnut/80 mb-8 max-w-3xl leading-relaxed"
              variants={fadeInVariants}
            >
              Бачо Илия е навсякъде в България. Открий най-близкия до теб магазин и се насладѝ на истинския вкус.
            </motion.p>

            {/* Map Placeholder */}
            <motion.div
              variants={fadeInVariants}
              className="bg-white shadow-2xl border-4 border-walnut/30 relative overflow-hidden"
              style={{ height: '400px' }}
            >
              {/* Washi tape decoration */}
              <div className="absolute top-4 left-4 w-20 h-8 bg-sunflower/40 border-l-2 border-r-2 border-sunflower/60 z-10" />
              <div className="absolute top-4 right-4 w-20 h-8 bg-faded-denim/40 border-l-2 border-r-2 border-faded-denim/60 z-10" />

              {/* Map placeholder - here you would integrate Google Maps or Mapbox */}
              <div className="w-full h-full bg-old-paper/30 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                {/* Simple map visualization with pins */}
                <div className="relative w-full h-full p-8">
                  {/* Bulgaria outline suggestion */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <MapPinIcon className="w-64 h-64 text-bulgarian-red" />
                  </div>

                  {/* Store markers distributed across the map */}
                  {filteredStores.slice(0, 12).map((store, idx) => (
                    <motion.div
                      key={store.id}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${20 + (idx % 4) * 20}%`,
                        top: `${20 + Math.floor(idx / 4) * 25}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.3 }}
                    >
                      <div className="relative">
                        <MapPinIcon className="w-8 h-8 text-bulgarian-red drop-shadow-lg" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-3 py-2 shadow-xl border-2 border-walnut/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                          <p className="font-handwritten text-sm text-walnut">
                            {store.name}
                          </p>
                          <p className="font-mono text-xs text-walnut/60">
                            {store.city}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map integration note */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-faded-denim/80 text-white px-6 py-3 font-mono text-xs tracking-wider border-2 border-white/50">
                  ИНТЕРАКТИВНА КАРТА - Задръж курсора над маркерите
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          ref={storesRef}
          className="max-w-7xl mx-auto mb-12 relative"
          initial="hidden"
          animate={storesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <motion.div variants={fadeInVariants} className="lg:ml-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* City Filter */}
              <div>
                <label className="block font-handwritten text-2xl text-walnut mb-3">
                  Избери град:
                </label>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    onClick={() => setSelectedCity("all")}
                    className={`px-4 py-2 font-mono text-sm tracking-wider border-2 transition-all duration-300 ${
                      selectedCity === "all"
                        ? 'bg-bulgarian-red text-white border-walnut/50'
                        : 'bg-white text-walnut border-walnut/30 hover:border-bulgarian-red'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ВСИЧКИ
                  </motion.button>
                  {cities.map((city) => (
                    <motion.button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-4 py-2 font-mono text-sm tracking-wider border-2 transition-all duration-300 ${
                        selectedCity === city
                          ? 'bg-bulgarian-red text-white border-walnut/50'
                          : 'bg-white text-walnut border-walnut/30 hover:border-bulgarian-red'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {city}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div>
                <label className="block font-handwritten text-2xl text-walnut mb-3">
                  Търси магазин:
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Име, град или адрес..."
                  className="w-full px-4 py-3 border-2 border-walnut/30 bg-white font-serif text-walnut focus:outline-none focus:border-bulgarian-red transition-colors duration-300"
                />
              </div>
            </div>

            {/* Results count */}
            <motion.p
              variants={fadeInVariants}
              className="font-mono text-sm text-walnut/60 tracking-wider mb-6"
            >
              НАМЕРЕНИ МАГАЗИНИ: {filteredStores.length}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Store List */}
        <motion.div
          className="max-w-7xl mx-auto relative"
          initial="hidden"
          animate={storesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <div className="lg:ml-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStores.map((store: StoreLocation, index: number) => (
              <motion.div
                key={store.id}
                variants={fadeInVariants}
                custom={index}
                className="bg-white shadow-xl border-2 border-walnut/20 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Washi tape decoration */}
                <div className={`absolute top-0 left-0 w-full h-2 ${getStoreTypeColor(store.type)}`} />

                <div className="p-6">
                  {/* Store type badge */}
                  <span className={`inline-block ${getStoreTypeColor(store.type)} text-white px-3 py-1 text-xs font-mono tracking-wider mb-4`}>
                    {getStoreTypeLabel(store.type)}
                  </span>

                  {/* Store name */}
                  <h3 className="font-handwritten text-3xl text-walnut mb-4 leading-tight">
                    {store.name}
                  </h3>

                  {/* Store info */}
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-serif text-walnut/80 leading-relaxed">
                          {store.address}
                        </p>
                        <p className="font-mono text-sm text-walnut/60 tracking-wider mt-1">
                          {store.city}
                        </p>
                      </div>
                    </div>

                    {/* Working hours */}
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                      <p className="font-serif text-walnut/80 leading-relaxed">
                        {store.workingHours}
                      </p>
                    </div>

                    {/* Phone */}
                    {store.phone && (
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                        <a
                          href={`tel:${store.phone}`}
                          className="font-mono text-walnut/80 hover:text-bulgarian-red transition-colors duration-300"
                        >
                          {store.phone}
                        </a>
                      </div>
                    )}

                    {/* Products count */}
                    <div className="flex items-start gap-3 pt-2 border-t border-walnut/20">
                      <PackageIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                      <p className="font-serif text-sm text-walnut/70">
                        {store.products.length} продукта от Бачо Илия
                      </p>
                    </div>

                    {/* Description */}
                    {store.description && (
                      <div className="mt-4 pt-4 border-t border-walnut/20">
                        <p className="font-serif text-sm text-walnut/70 italic leading-relaxed">
                          {store.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* View on map button (placeholder) */}
                  <motion.button
                    className="mt-6 w-full bg-old-paper border-2 border-bulgarian-red/30 text-bulgarian-red px-4 py-3 font-mono text-sm tracking-wider hover:bg-bulgarian-red hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ПОКАЖИ НА КАРТАТА →
                  </motion.button>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-sunflower/50 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {filteredStores.length === 0 && (
            <motion.div
              variants={fadeInVariants}
              className="lg:ml-16 bg-sunflower/20 p-8 border-l-4 border-sunflower text-center"
            >
              <p className="font-handwritten text-2xl text-walnut/80 mb-2">
                Няма намерени магазини
              </p>
              <p className="font-serif text-walnut/70">
                Опитай друг град или промени търсенето
              </p>
            </motion.div>
          )}

          {/* Coming Soon - Online Delivery */}
          <motion.div
            variants={fadeInVariants}
            className="lg:ml-16 mt-16 bg-sunflower/10 p-10 border-2 border-sunflower/40 relative overflow-hidden"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-sunflower/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-faded-denim/20 rounded-full blur-2xl" />

            <div className="relative z-10 text-center">
              {/* Truck Icon */}
              <div className="mb-4 flex justify-center">
                <motion.div
                  className="bg-sunflower text-walnut p-4 rounded-full shadow-lg"
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.div>
              </div>

              {/* Coming Soon Badge */}
              <motion.div
                className="inline-block bg-bulgarian-red text-white px-6 py-2 font-mono text-sm tracking-wider border-2 border-walnut/30 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ОЧАКВАЙТЕ СКОРО
              </motion.div>

              {/* Main Heading */}
              <h3 className="font-handwritten text-5xl md:text-6xl text-bulgarian-red mb-4 leading-tight">
                Скоро доставяме до вашата врата!
              </h3>

              {/* Description */}
              <p className="font-serif text-xl md:text-2xl text-walnut/80 leading-relaxed max-w-2xl mx-auto mb-6">
                Работим усилено, за да направим автентичните продукти на Бачо Илия достъпни навсякъде в България.
                Следете ни за новини!
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
                <div className="bg-white/50 p-4 border-l-4 border-sunflower">
                  <p className="font-handwritten text-xl text-walnut mb-1">🚚 Бърза доставка</p>
                  <p className="font-serif text-sm text-walnut/70">До 24-48 часа</p>
                </div>
                <div className="bg-white/50 p-4 border-l-4 border-faded-denim">
                  <p className="font-handwritten text-xl text-walnut mb-1">❄️ Хладилна логистика</p>
                  <p className="font-serif text-sm text-walnut/70">Перфектно състояние</p>
                </div>
                <div className="bg-white/50 p-4 border-l-4 border-bulgarian-red">
                  <p className="font-handwritten text-xl text-walnut mb-1">📦 Безплатна доставка</p>
                  <p className="font-serif text-sm text-walnut/70">При поръчка над 50 лв</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.div
            variants={fadeInVariants}
            className="lg:ml-16 mt-16 bg-faded-denim/20 p-8 border-l-4 border-faded-denim"
          >
            <p className="font-handwritten text-2xl text-walnut/90 mb-4 leading-relaxed">
              Не можеш да намериш продуктите ни в твоя град?
            </p>
            <p className="font-serif text-lg text-walnut/80 leading-relaxed mb-6">
              Свържи се с нас и ние ще направим всичко възможно да ги доставим до теб.
              Истинският вкус трябва да бъде достъпен за всички!
            </p>
            <a href="mailto:contact@bacho-iliya.eu">
              <motion.button
                className="bg-bulgarian-red text-white px-8 py-4 font-mono text-sm tracking-wider border-2 border-walnut/30 hover:bg-walnut transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                СВЪРЖИ СЕ С НАС →
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
