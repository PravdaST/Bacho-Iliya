'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiesPolicyPage() {
  const cookieTypes = [
    {
      title: 'Задължителни бисквитки (Strictly Necessary)',
      description: 'Тези бисквитки са необходими за правилното функциониране на сайта и не могат да бъдат изключени.',
      cookies: [
        {
          name: 'bacho-giveaway-storage',
          purpose: 'Запазване на прогреса в раздаването (избрани продукти, попълнени стъпки)',
          duration: 'Постоянна (до изтриване от потребителя)',
          provider: 'Бачо Илия'
        },
        {
          name: 'session_id',
          purpose: 'Идентифициране на активната сесия',
          duration: '24 часа',
          provider: 'Бачо Илия'
        }
      ]
    },
    {
      title: 'Аналитични бисквитки (Analytics)',
      description: 'Използват се за анализ на трафика и подобряване на потребителското преживяване.',
      cookies: [
        {
          name: '_ga',
          purpose: 'Google Analytics - проследяване на уникални потребители',
          duration: '2 години',
          provider: 'Google Analytics'
        },
        {
          name: '_gid',
          purpose: 'Google Analytics - разграничаване на потребители',
          duration: '24 часа',
          provider: 'Google Analytics'
        },
        {
          name: '_gat',
          purpose: 'Google Analytics - ограничаване на честотата на заявки',
          duration: '1 минута',
          provider: 'Google Analytics'
        }
      ]
    },
    {
      title: 'Функционални бисквитки (Functional)',
      description: 'Подобряват функционалността и персонализацията на сайта.',
      cookies: [
        {
          name: 'preferredLanguage',
          purpose: 'Запазване на предпочитания език',
          duration: '1 година',
          provider: 'Бачо Илия'
        },
        {
          name: 'cookieConsent',
          purpose: 'Запазване на вашето съгласие за бисквитки',
          duration: '1 година',
          provider: 'Бачо Илия'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden py-24 px-4">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-4xl mx-auto relative">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="font-handwritten text-walnut hover:text-bulgarian-red transition-colors inline-flex items-center gap-2"
          >
            ← Начало
          </Link>
        </div>

        {/* Main Content - Notebook Style */}
        <motion.div
          className="bg-white border-4 border-walnut/40 p-8 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Notebook Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/10"
                style={{ top: `${(i + 1) * 2.5}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30 hidden md:block" />

          {/* Perforation Holes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex flex-col justify-around py-12">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-walnut/20 rounded-full ml-4 border-2 border-walnut/10" />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          {/* Content */}
          <div className="relative">
            {/* Header */}
            <div className="mb-12 pb-8 border-b-2 border-dashed border-walnut/30">
              <h1 className="font-handwritten text-bulgarian-red text-5xl md:text-6xl mb-4">
                Политика за Бисквитки
              </h1>
              <p className="font-handwritten text-walnut/70 text-lg md:text-xl">
                Как използваме cookies на нашия сайт
              </p>
              <p className="font-handwritten text-walnut/60 text-base mt-2">
                Последна актуализация: Януари 2025
              </p>
            </div>

            {/* What are cookies */}
            <div className="mb-10 pb-8 border-b border-dashed border-walnut/20">
              <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
                Какво са бисквитките (cookies)?
              </h2>
              <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4">
                Бисквитките (cookies) са малки текстови файлове, които се съхраняват на вашето устройство
                когато посещавате уебсайт. Те помагат на сайта да "запомни" информация за вашето посещение,
                което прави следващото ви посещение по-лесно и сайта по-полезен за вас.
              </p>
              <p className="font-handwritten text-walnut text-lg leading-relaxed">
                Бисквитките НЕ могат да получат достъп до други файлове на вашия компютър или да разпространяват
                вируси. Те се използват единствено за подобряване на вашето потребителско преживяване.
              </p>
            </div>

            {/* Why we use cookies */}
            <div className="mb-10 pb-8 border-b border-dashed border-walnut/20">
              <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
                Защо използваме бисквитки?
              </h2>
              <div className="space-y-3">
                <p className="font-handwritten text-walnut text-lg leading-relaxed">
                  • <strong>Да запазим вашия прогрес</strong> в раздаването (избрани продукти, попълнени данни)
                </p>
                <p className="font-handwritten text-walnut text-lg leading-relaxed">
                  • <strong>Да подобрим сайта</strong> чрез анализ на как го използвате
                </p>
                <p className="font-handwritten text-walnut text-lg leading-relaxed">
                  • <strong>Да персонализираме</strong> вашето преживяване (език, предпочитания)
                </p>
                <p className="font-handwritten text-walnut text-lg leading-relaxed">
                  • <strong>Да осигурим сигурност</strong> и защита срещу злоупотреби
                </p>
              </div>
            </div>

            {/* Cookie Types */}
            <div className="mb-10 space-y-8">
              <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
                Какви бисквитки използваме?
              </h2>

              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-old-paper border-l-4 border-bulgarian-red/40"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <h3 className="font-handwritten text-bulgarian-red text-2xl mb-3">
                    {type.title}
                  </h3>
                  <p className="font-handwritten text-walnut/80 text-base mb-4">
                    {type.description}
                  </p>

                  <div className="space-y-4">
                    {type.cookies.map((cookie, cookieIndex) => (
                      <div
                        key={cookieIndex}
                        className="p-4 bg-white/60 border border-walnut/20"
                      >
                        <p className="font-handwritten text-walnut font-bold text-lg mb-2">
                          {cookie.name}
                        </p>
                        <p className="font-handwritten text-walnut/80 text-base mb-1">
                          <strong>Цел:</strong> {cookie.purpose}
                        </p>
                        <p className="font-handwritten text-walnut/80 text-base mb-1">
                          <strong>Продължителност:</strong> {cookie.duration}
                        </p>
                        <p className="font-handwritten text-walnut/80 text-base">
                          <strong>Доставчик:</strong> {cookie.provider}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* How to manage cookies */}
            <div className="mb-10 pb-8 border-b border-dashed border-walnut/20">
              <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
                Как да управлявате бисквитките?
              </h2>
              <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4">
                Можете да контролирате и/или изтриете бисквитките по ваше желание. За повече информация
                посетете aboutcookies.org. Можете да изтриете всички бисквитки, които вече са на вашия
                компютър, и да настроите повечето браузъри да предотвратяват поставянето им.
              </p>
              <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4">
                <strong>Важно:</strong> Ако изключите бисквитките, някои функции на сайта може да не работят
                правилно. Например, няма да можете да запазите прогреса си в раздаването.
              </p>

              <div className="space-y-3 mt-6">
                <h3 className="font-handwritten text-walnut text-xl font-bold mb-3">
                  Управление на бисквитки по браузъри:
                </h3>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                </p>
              </div>
            </div>

            {/* Third-party cookies */}
            <div className="mb-10 pb-8 border-b border-dashed border-walnut/20">
              <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
                Бисквитки на трети страни
              </h2>
              <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4">
                Някои бисквитки идват от трети страни като Google Analytics. Тези компании имат собствени
                политики за поверителност:
              </p>
              <div className="space-y-2">
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Google Analytics:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-bulgarian-red hover:underline">Google Privacy Policy</a>
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Facebook Pixel:</strong> <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-bulgarian-red hover:underline">Facebook Data Policy</a>
                </p>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-10 pb-8 border-b border-dashed border-walnut/20">
              <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
                Промени в политиката
              </h2>
              <p className="font-handwritten text-walnut text-lg leading-relaxed">
                Може да актуализираме тази Политика за бисквитки от време на време. Всички промени ще бъдат
                публикувани на тази страница с нова дата на актуализация. Препоръчваме периодично да преглеждате
                тази страница за промени.
              </p>
            </div>

            {/* Contact */}
            <div className="p-6 bg-sunflower/10 border-l-4 border-sunflower">
              <h3 className="font-handwritten text-bulgarian-red text-2xl mb-3">
                Въпроси относно бисквитките?
              </h3>
              <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4">
                Ако имате въпроси относно използването на бисквитки на нашия сайт, моля свържете се с нас:
              </p>
              <p className="font-handwritten text-walnut text-lg">
                📧 <a href="mailto:contact@bacho-iliya.eu" className="text-bulgarian-red hover:underline">contact@bacho-iliya.eu</a>
              </p>
            </div>

            {/* Accept/Back CTA */}
            <div className="mt-10 text-center pt-8 border-t-2 border-dashed border-walnut/30">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-bulgarian-red border-4 border-walnut/40 text-white font-handwritten text-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                Разбрах, продължи към сайта
              </Link>
            </div>
          </div>

          {/* Coffee Stains */}
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-walnut/10 blur-lg opacity-30 pointer-events-none" />
          <div className="absolute top-12 left-20 w-16 h-16 rounded-full bg-walnut/10 blur-md opacity-30 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
