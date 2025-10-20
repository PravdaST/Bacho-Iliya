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
          className="max-w-5xl mx-auto mb-20 text-center"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInVariants} className="mb-6">
            <span className="inline-block bg-bulgarian-red text-white px-6 py-2 font-handwritten text-sm tracking-wider">
              НАМЕРИ НИ
            </span>
          </motion.div>

          <motion.h1
            className="font-handwritten text-5xl md:text-7xl text-bulgarian-red mb-6 leading-tight"
            variants={fadeInVariants}
          >
            Къде да намериш нашите продукти
          </motion.h1>

          <motion.p
            className="font-handwritten text-xl md:text-2xl text-walnut/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInVariants}
          >
            Бачо Илия е навсякъде в България. Открий най-близкия до теб магазин и се насладѝ на истинския вкус.
          </motion.p>
        </motion.div>

        {/* Coming Soon - Online Delivery - MOVED TO TOP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-20 bg-gradient-to-br from-sunflower/20 to-sunflower/10 p-12 border-2 border-sunflower/30 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sunflower/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-bulgarian-red/10 rounded-full blur-2xl" />

          <div className="relative z-10 text-center">
            {/* Animated Truck Icon */}
            <motion.div
              className="mb-6 flex justify-center"
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-sunflower text-white p-6 rounded-full shadow-xl">
                <TruckIcon size={48} />
              </div>
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
              className="inline-block bg-bulgarian-red text-white px-6 py-2 font-handwritten text-sm tracking-wider mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ОЧАКВАЙТЕ СКОРО
            </motion.div>

            {/* Main Heading */}
            <h2 className="font-handwritten text-5xl md:text-6xl text-bulgarian-red mb-6 leading-tight">
              Скоро доставяме до вашата врата!
            </h2>

            {/* Description */}
            <p className="font-handwritten text-xl md:text-2xl text-walnut/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Работим усилено, за да направим автентичните продукти на Бачо Илия достъпни навсякъде в България. Следете ни за новини!
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/60 p-6 border-l-4 border-sunflower">
                <div className="flex items-center gap-3 mb-2">
                  <TruckIcon className="text-sunflower" size={28} />
                  <p className="font-handwritten text-2xl text-walnut">Бърза доставка</p>
                </div>
                <p className="font-handwritten text-walnut/70">До 24-48 часа</p>
              </div>
              <div className="bg-white/60 p-6 border-l-4 border-faded-denim">
                <div className="flex items-center gap-3 mb-2">
                  <SnowflakeIcon className="text-faded-denim" size={28} />
                  <p className="font-handwritten text-2xl text-walnut">Хладилна логистика</p>
                </div>
                <p className="font-handwritten text-walnut/70">Перфектно състояние</p>
              </div>
              <div className="bg-white/60 p-6 border-l-4 border-bulgarian-red">
                <div className="flex items-center gap-3 mb-2">
                  <BoxIcon className="text-bulgarian-red" size={28} />
                  <p className="font-handwritten text-2xl text-walnut">Безплатна доставка</p>
                </div>
                <p className="font-handwritten text-walnut/70">При поръчка над 50 лв</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-bulgarian-red/30 to-transparent" />
          <div className="text-center -mt-4">
            <span className="inline-block bg-old-paper px-6 font-handwritten text-2xl text-walnut/60">
              А междувременно...
            </span>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-handwritten text-4xl md:text-5xl text-walnut mb-4">
              Намери ни в цяла България
            </h2>
            <p className="font-handwritten text-lg text-walnut/70">
              Открий най-близкия до теб магазин
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white shadow-xl border-2 border-walnut/20 relative overflow-hidden" style={{ height: '400px' }}>
            {/* Map placeholder - here you would integrate Google Maps or Mapbox */}
            <div className="w-full h-full bg-old-paper/30 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />

              {/* Simple map visualization with pins */}
              <div className="relative w-full h-full p-8">
                {/* Bulgaria outline suggestion */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
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
                        <p className="font-handwritten text-xs text-walnut/60">
                          {store.city}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map integration note */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-bulgarian-red text-white px-6 py-2 font-handwritten text-xs tracking-wider">
                ИНТЕРАКТИВНА КАРТА
              </div>
            </div>
          </div>
        </motion.div>

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
              <label className="block font-handwritten text-3xl text-walnut mb-4">
                Избери град:
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCity("all")}
                  className={`px-5 py-2 font-handwritten text-sm tracking-wider border-2 transition-all duration-300 ${
                    selectedCity === "all"
                      ? 'bg-bulgarian-red text-white border-bulgarian-red'
                      : 'bg-white text-walnut border-walnut/30 hover:border-bulgarian-red'
                  }`}
                >
                  ВСИЧКИ
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-5 py-2 font-handwritten text-sm tracking-wider border-2 transition-all duration-300 ${
                      selectedCity === city
                        ? 'bg-bulgarian-red text-white border-bulgarian-red'
                        : 'bg-white text-walnut border-walnut/30 hover:border-bulgarian-red'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="block font-handwritten text-3xl text-walnut mb-4">
                Търси магазин:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Име, град или адрес..."
                className="w-full px-5 py-3 border-2 border-walnut/30 bg-white font-handwritten text-lg text-walnut focus:outline-none focus:border-bulgarian-red transition-colors duration-300"
              />
            </div>
          </div>

          {/* Results count */}
          <p className="font-handwritten text-sm text-walnut/60 tracking-wider">
            НАМЕРЕНИ МАГАЗИНИ: {filteredStores.length}
          </p>
        </motion.div>

        {/* Store List */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStores.map((store: StoreLocation, index: number) => (
              <motion.div
                key={store.id}
                className="bg-white shadow-lg border-2 border-walnut/20 relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Top stripe */}
                <div className={`h-1 ${getStoreTypeColor(store.type)}`} />

                <div className="p-6">
                  {/* Store type badge */}
                  <span className={`inline-block ${getStoreTypeColor(store.type)} text-white px-3 py-1 text-xs font-handwritten tracking-wider mb-4`}>
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
                        <p className="font-handwritten text-walnut/80 leading-relaxed">
                          {store.address}
                        </p>
                        <p className="font-handwritten text-sm text-walnut/60 tracking-wider mt-1">
                          {store.city}
                        </p>
                      </div>
                    </div>

                    {/* Working hours */}
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                      <p className="font-handwritten text-walnut/80 leading-relaxed">
                        {store.workingHours}
                      </p>
                    </div>

                    {/* Phone */}
                    {store.phone && (
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                        <a
                          href={`tel:${store.phone}`}
                          className="font-handwritten text-walnut/80 hover:text-bulgarian-red transition-colors duration-300"
                        >
                          {store.phone}
                        </a>
                      </div>
                    )}

                    {/* Products count */}
                    <div className="flex items-start gap-3 pt-3 border-t border-walnut/20">
                      <PackageIcon className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                      <p className="font-handwritten text-sm text-walnut/70">
                        {store.products.length} продукта от Бачо Илия
                      </p>
                    </div>

                    {/* Description */}
                    {store.description && (
                      <div className="mt-4 pt-4 border-t border-walnut/20">
                        <p className="font-handwritten text-sm text-walnut/70 italic leading-relaxed">
                          {store.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* View on map button */}
                  <button className="mt-6 w-full bg-old-paper border-2 border-bulgarian-red/30 text-bulgarian-red px-4 py-3 font-handwritten text-sm tracking-wider hover:bg-bulgarian-red hover:text-white transition-colors duration-300">
                    ПОКАЖИ НА КАРТАТА →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {filteredStores.length === 0 && (
            <div className="bg-sunflower/20 p-8 border-l-4 border-sunflower text-center">
              <p className="font-handwritten text-2xl text-walnut/80 mb-2">
                Няма намерени магазини
              </p>
              <p className="font-handwritten text-walnut/70">
                Опитай друг град или промени търсенето
              </p>
            </div>
          )}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="max-w-5xl mx-auto mt-20 bg-gradient-to-br from-faded-denim/20 to-faded-denim/10 p-10 border-2 border-faded-denim/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="font-handwritten text-3xl md:text-4xl text-walnut mb-4 leading-relaxed">
            Не можеш да намериш продуктите ни в твоя град?
          </p>
          <p className="font-handwritten text-xl text-walnut/80 leading-relaxed mb-6">
            Свържи се с нас и ние ще направим всичко възможно да ги доставим до теб.
            Истинският вкус трябва да бъде достъпен за всички!
          </p>
          <a href="mailto:contact@bacho-iliya.eu">
            <button className="bg-bulgarian-red text-white px-8 py-4 font-handwritten text-sm tracking-wider hover:bg-walnut transition-colors duration-300">
              СВЪРЖИ СЕ С НАС →
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
