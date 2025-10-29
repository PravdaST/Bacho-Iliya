'use client';

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInVariants, staggerContainer } from '@/hooks/use-scroll-animation';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  BuildingIcon,
  FacebookIcon,
} from 'lucide-react';

export default function ContactsPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation(0.1);
  const { ref: formRef, isInView: formInView } = useScrollAnimation(0.1);

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-40" />

      {/* Coffee stains */}
      <div className="bg-walnut/5 pointer-events-none absolute top-32 right-20 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-walnut/5 pointer-events-none absolute bottom-40 left-10 h-32 w-32 rounded-full blur-2xl" />

      <div className="relative px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="mx-auto mb-20 max-w-5xl text-center"
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInVariants} className="mb-6">
            <span className="bg-bulgarian-red font-handwritten inline-block px-6 py-2 text-sm tracking-wider text-white">
              СВЪРЖИ СЕ С НАС
            </span>
          </motion.div>

          <motion.h1
            className="font-handwritten text-bulgarian-red mb-6 text-5xl leading-tight md:text-7xl"
            variants={fadeInVariants}
          >
            Ние сме тук за теб
          </motion.h1>

          <motion.p
            className="font-handwritten text-walnut/80 mx-auto mb-8 max-w-3xl text-xl leading-relaxed md:text-2xl"
            variants={fadeInVariants}
          >
            Имаш въпрос? Искаш да научиш повече за продуктите ни? Или просто искаш да споделиш
            спомен за бабините рецепти? Пиши ни!
          </motion.p>
        </motion.div>

        {/* Company Information Cards */}
        <motion.div
          ref={infoRef}
          className="mx-auto mb-16 max-w-6xl"
          initial="hidden"
          animate={infoInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Address */}
            <motion.div
              variants={fadeInVariants}
              className="border-walnut/20 relative border-2 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="bg-bulgarian-red/40 border-bulgarian-red/60 absolute -top-2 left-6 h-4 w-16 border-r border-l" />

              <div className="mb-4">
                <MapPinIcon className="text-bulgarian-red h-10 w-10" />
              </div>

              <h3 className="font-handwritten text-walnut mb-4 text-2xl">Адрес</h3>

              <div className="font-handwritten text-walnut/80 space-y-2 leading-relaxed">
                <p className="font-bold">Производствен цех:</p>
                <p>гр. Бяла Черква</p>
                <p>обл. Търговище</p>
                <p className="text-walnut/60 mt-4 text-xs">
                  *Производството се осъществява от Милкилукс ООД
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              variants={fadeInVariants}
              className="border-walnut/20 relative border-2 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="bg-sunflower/40 border-sunflower/60 absolute -top-2 left-6 h-4 w-16 border-r border-l" />

              <div className="mb-4">
                <MailIcon className="text-bulgarian-red h-10 w-10" />
              </div>

              <h3 className="font-handwritten text-walnut mb-4 text-2xl">Контакти</h3>

              <div className="space-y-3">
                <div>
                  <p className="font-handwritten text-walnut/60 mb-1 text-xs tracking-wider">
                    ИМЕЙЛ
                  </p>
                  <a
                    href="mailto:contact@bacho-iliya.eu"
                    className="font-handwritten text-walnut hover:text-bulgarian-red text-lg transition-colors duration-300"
                  >
                    contact@bacho-iliya.eu
                  </a>
                </div>

                <div>
                  <p className="font-handwritten text-walnut/60 mb-1 text-xs tracking-wider">
                    ТЕЛЕФОН
                  </p>
                  <a
                    href="tel:+359123456789"
                    className="font-handwritten text-walnut hover:text-bulgarian-red text-lg transition-colors duration-300"
                  >
                    +359 XX XXX XXXX
                  </a>
                  <p className="font-handwritten text-walnut/60 mt-1 text-xs">(работно време)</p>
                </div>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              variants={fadeInVariants}
              className="border-walnut/20 relative border-2 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="bg-faded-denim/40 border-faded-denim/60 absolute -top-2 left-6 h-4 w-16 border-r border-l" />

              <div className="mb-4">
                <ClockIcon className="text-bulgarian-red h-10 w-10" />
              </div>

              <h3 className="font-handwritten text-walnut mb-4 text-2xl">Работно време</h3>

              <div className="font-handwritten text-walnut/80 space-y-2">
                <div className="flex justify-between">
                  <span>Понеделник - Петък:</span>
                  <span className="font-bold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Събота:</span>
                  <span className="font-bold">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Неделя:</span>
                  <span className="text-bulgarian-red">Почивен ден</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Company Info Section */}
        <motion.div
          className="mx-auto mb-16 max-w-5xl"
          initial="hidden"
          animate={infoInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInVariants}
            className="from-bulgarian-red to-bulgarian-red relative overflow-hidden bg-gradient-to-br p-10 text-white shadow-2xl"
          >
            {/* Paper texture */}
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <BuildingIcon className="h-12 w-12" />
                <h2 className="font-handwritten text-4xl">За компанията</h2>
              </div>

              <div className="font-handwritten space-y-4 text-lg leading-relaxed">
                <p>
                  <span className="font-bold">Бачо Илия</span> е марка на{' '}
                  <span className="font-bold">Милкилукс ООД</span> - водещ производител на
                  традиционни български млечни продукти от 1996 година.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/30 pt-6 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs tracking-wider opacity-80">ОФИЦИАЛНО ИМЕ</p>
                    <p className="font-bold">Милкилукс ООД</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs tracking-wider opacity-80">ЕИК</p>
                    <p className="font-bold">XXXXXXXXX</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs tracking-wider opacity-80">ДДС НОМЕР</p>
                    <p className="font-bold">BGXXXXXXXXX</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs tracking-wider opacity-80">СЕДАЛИЩЕ</p>
                    <p className="font-bold">гр. Бяла Черква</p>
                  </div>
                </div>

                <p className="mt-6 border-t border-white/30 pt-6">
                  С производствена площ от <span className="font-bold">25,000 кв.м</span> и
                  капацитет за преработка на{' '}
                  <span className="font-bold">130,000 литра мляко дневно</span>, работим с
                  първокатегорийни ферми от 6 региона в България.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          ref={formRef}
          className="mx-auto mb-16 max-w-4xl"
          initial="hidden"
          animate={formInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInVariants}
            className="border-walnut/20 relative border-4 bg-white p-10 shadow-2xl md:p-12"
          >
            {/* Washi tape */}
            <div className="bg-sunflower/40 border-sunflower/60 absolute -top-3 left-1/4 h-8 w-32 border-r-2 border-l-2" />

            {/* Paper texture */}
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />

            <div className="relative z-10">
              <h2 className="font-handwritten text-walnut mb-8 text-center text-4xl">
                Напиши ни съобщение
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="font-handwritten text-walnut mb-2 block text-lg">Име *</label>
                    <input
                      type="text"
                      required
                      className="border-walnut/30 bg-old-paper/30 font-handwritten text-walnut focus:border-bulgarian-red w-full border-2 px-4 py-3 text-lg transition-colors duration-300 focus:outline-none"
                      placeholder="Иван"
                    />
                  </div>

                  <div>
                    <label className="font-handwritten text-walnut mb-2 block text-lg">
                      Имейл *
                    </label>
                    <input
                      type="email"
                      required
                      className="border-walnut/30 bg-old-paper/30 font-handwritten text-walnut focus:border-bulgarian-red w-full border-2 px-4 py-3 text-lg transition-colors duration-300 focus:outline-none"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-handwritten text-walnut mb-2 block text-lg">Телефон</label>
                  <input
                    type="tel"
                    className="border-walnut/30 bg-old-paper/30 font-handwritten text-walnut focus:border-bulgarian-red w-full border-2 px-4 py-3 text-lg transition-colors duration-300 focus:outline-none"
                    placeholder="+359 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="font-handwritten text-walnut mb-2 block text-lg">Тема</label>
                  <select className="border-walnut/30 bg-old-paper/30 font-handwritten text-walnut focus:border-bulgarian-red w-full border-2 px-4 py-3 text-lg transition-colors duration-300 focus:outline-none">
                    <option>Общ въпрос</option>
                    <option>Информация за продукти</option>
                    <option>Търговско сътрудничество</option>
                    <option>Жалба или предложение</option>
                    <option>Друго</option>
                  </select>
                </div>

                <div>
                  <label className="font-handwritten text-walnut mb-2 block text-lg">
                    Съобщение *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="border-walnut/30 bg-old-paper/30 font-handwritten text-walnut focus:border-bulgarian-red w-full resize-none border-2 px-4 py-3 text-lg transition-colors duration-300 focus:outline-none"
                    placeholder="Напиши съобщението си тук..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-bulgarian-red font-handwritten hover:bg-walnut border-walnut/20 group relative overflow-hidden border-4 px-10 py-4 text-xl tracking-wider text-white shadow-xl transition-colors duration-300"
                  >
                    <span className="relative z-10">ИЗПРАТИ СЪОБЩЕНИЕТО →</span>
                    <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />
                  </button>
                </div>

                <p className="font-handwritten text-walnut/60 text-center text-sm italic">
                  * Задължителни полета. Отговаряме в рамките на 24-48 часа.
                </p>
              </form>
            </div>

            {/* Coffee stain */}
            <div className="bg-walnut/10 pointer-events-none absolute right-8 bottom-8 h-16 w-16 rounded-full opacity-30 blur-md" />
          </motion.div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate={formInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInVariants}>
            <h2 className="font-handwritten text-walnut mb-6 text-3xl md:text-4xl">
              Последвай ни в социалните мрежи
            </h2>
            <p className="font-handwritten text-walnut/80 mb-8 text-lg">
              Споделяме рецепти, спомени и истории от селския живот
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="mb-8 flex justify-center gap-6">
            <motion.a
              href="https://www.facebook.com/Bacho.Iliya/"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInVariants}
              className="border-bulgarian-red/30 hover:bg-bulgarian-red hover:border-bulgarian-red group flex h-16 w-16 items-center justify-center border-4 bg-white shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-bulgarian-red transition-colors group-hover:text-white"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@bachoiliyabg"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInVariants}
              className="border-bulgarian-red/30 hover:bg-bulgarian-red hover:border-bulgarian-red group flex h-16 w-16 items-center justify-center border-4 bg-white shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-bulgarian-red transition-colors group-hover:text-white"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@bachoiliyabg"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInVariants}
              className="border-bulgarian-red/30 hover:bg-bulgarian-red hover:border-bulgarian-red group flex h-16 w-16 items-center justify-center border-4 bg-white shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-bulgarian-red transition-colors group-hover:text-white"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
