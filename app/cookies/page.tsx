'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiesPolicyPage() {
  const cookieTypes = [
    {
      title: 'Задължителни бисквитки (Strictly Necessary)',
      description:
        'Тези бисквитки са необходими за правилното функциониране на сайта и не могат да бъдат изключени.',
      cookies: [
        {
          name: 'bacho-giveaway-storage',
          purpose: 'Запазване на прогреса в раздаването (избрани продукти, попълнени стъпки)',
          duration: 'Постоянна (до изтриване от потребителя)',
          provider: 'Бачо Илия',
        },
        {
          name: 'session_id',
          purpose: 'Идентифициране на активната сесия',
          duration: '24 часа',
          provider: 'Бачо Илия',
        },
      ],
    },
    {
      title: 'Аналитични бисквитки (Analytics)',
      description:
        'Използват се за анализ на трафика и подобряване на потребителското преживяване.',
      cookies: [
        {
          name: '_ga',
          purpose: 'Google Analytics - проследяване на уникални потребители',
          duration: '2 години',
          provider: 'Google Analytics',
        },
        {
          name: '_gid',
          purpose: 'Google Analytics - разграничаване на потребители',
          duration: '24 часа',
          provider: 'Google Analytics',
        },
        {
          name: '_gat',
          purpose: 'Google Analytics - ограничаване на честотата на заявки',
          duration: '1 минута',
          provider: 'Google Analytics',
        },
      ],
    },
    {
      title: 'Функционални бисквитки (Functional)',
      description: 'Подобряват функционалността и персонализацията на сайта.',
      cookies: [
        {
          name: 'preferredLanguage',
          purpose: 'Запазване на предпочитания език',
          duration: '1 година',
          provider: 'Бачо Илия',
        },
        {
          name: 'cookieConsent',
          purpose: 'Запазване на вашето съгласие за бисквитки',
          duration: '1 година',
          provider: 'Бачо Илия',
        },
      ],
    },
  ];

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="font-handwritten text-walnut hover:text-bulgarian-red inline-flex items-center gap-2 transition-colors"
          >
            ← Начало
          </Link>
        </div>

        {/* Main Content - Notebook Style */}
        <motion.div
          className="border-walnut/40 relative overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Notebook Lines */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/10 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 2.5}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-16 hidden w-px md:block" />

          {/* Perforation Holes */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-12 flex-col justify-around py-12 md:flex">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="bg-walnut/20 border-walnut/10 ml-4 h-3 w-3 rounded-full border-2"
              />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          {/* Content */}
          <div className="relative">
            {/* Header */}
            <div className="border-walnut/30 mb-12 border-b-2 border-dashed pb-8">
              <h1 className="font-handwritten text-bulgarian-red mb-4 text-5xl md:text-6xl">
                Политика за Бисквитки
              </h1>
              <p className="font-handwritten text-walnut/70 text-lg md:text-xl">
                Как използваме cookies на нашия сайт
              </p>
              <p className="font-handwritten text-walnut/60 mt-2 text-base">
                Последна актуализация: Януари 2025
              </p>
            </div>

            {/* What are cookies */}
            <div className="border-walnut/20 mb-10 border-b border-dashed pb-8">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                Какво са бисквитките (cookies)?
              </h2>
              <p className="font-handwritten text-walnut mb-4 text-lg leading-relaxed">
                Бисквитките (cookies) са малки текстови файлове, които се съхраняват на вашето
                устройство когато посещавате уебсайт. Те помагат на сайта да "запомни" информация за
                вашето посещение, което прави следващото ви посещение по-лесно и сайта по-полезен за
                вас.
              </p>
              <p className="font-handwritten text-walnut text-lg leading-relaxed">
                Бисквитките НЕ могат да получат достъп до други файлове на вашия компютър или да
                разпространяват вируси. Те се използват единствено за подобряване на вашето
                потребителско преживяване.
              </p>
            </div>

            {/* Why we use cookies */}
            <div className="border-walnut/20 mb-10 border-b border-dashed pb-8">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                Защо използваме бисквитки?
              </h2>
              <div className="space-y-3">
                <p className="font-handwritten text-walnut text-lg leading-relaxed">
                  • <strong>Да запазим вашия прогрес</strong> в раздаването (избрани продукти,
                  попълнени данни)
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
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                Какви бисквитки използваме?
              </h2>

              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className="bg-old-paper border-bulgarian-red/40 border-l-4 p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <h3 className="font-handwritten text-bulgarian-red mb-3 text-2xl">
                    {type.title}
                  </h3>
                  <p className="font-handwritten text-walnut/80 mb-4 text-base">
                    {type.description}
                  </p>

                  <div className="space-y-4">
                    {type.cookies.map((cookie, cookieIndex) => (
                      <div key={cookieIndex} className="border-walnut/20 border bg-white/60 p-4">
                        <p className="font-handwritten text-walnut mb-2 text-lg font-bold">
                          {cookie.name}
                        </p>
                        <p className="font-handwritten text-walnut/80 mb-1 text-base">
                          <strong>Цел:</strong> {cookie.purpose}
                        </p>
                        <p className="font-handwritten text-walnut/80 mb-1 text-base">
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
            <div className="border-walnut/20 mb-10 border-b border-dashed pb-8">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                Как да управлявате бисквитките?
              </h2>
              <p className="font-handwritten text-walnut mb-4 text-lg leading-relaxed">
                Можете да контролирате и/или изтриете бисквитките по ваше желание. За повече
                информация посетете aboutcookies.org. Можете да изтриете всички бисквитки, които
                вече са на вашия компютър, и да настроите повечето браузъри да предотвратяват
                поставянето им.
              </p>
              <p className="font-handwritten text-walnut mb-4 text-lg leading-relaxed">
                <strong>Важно:</strong> Ако изключите бисквитките, някои функции на сайта може да не
                работят правилно. Например, няма да можете да запазите прогреса си в раздаването.
              </p>

              <div className="mt-6 space-y-3">
                <h3 className="font-handwritten text-walnut mb-3 text-xl font-bold">
                  Управление на бисквитки по браузъри:
                </h3>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other
                  site data
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and
                  site data
                </p>
              </div>
            </div>

            {/* Third-party cookies */}
            <div className="border-walnut/20 mb-10 border-b border-dashed pb-8">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                Бисквитки на трети страни
              </h2>
              <p className="font-handwritten text-walnut mb-4 text-lg leading-relaxed">
                Някои бисквитки идват от трети страни като Google Analytics. Тези компании имат
                собствени политики за поверителност:
              </p>
              <div className="space-y-2">
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Google Analytics:</strong>{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bulgarian-red hover:underline"
                  >
                    Google Privacy Policy
                  </a>
                </p>
                <p className="font-handwritten text-walnut text-lg">
                  • <strong>Facebook Pixel:</strong>{' '}
                  <a
                    href="https://www.facebook.com/privacy/explanation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bulgarian-red hover:underline"
                  >
                    Facebook Data Policy
                  </a>
                </p>
              </div>
            </div>

            {/* Updates */}
            <div className="border-walnut/20 mb-10 border-b border-dashed pb-8">
              <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                Промени в политиката
              </h2>
              <p className="font-handwritten text-walnut text-lg leading-relaxed">
                Може да актуализираме тази Политика за бисквитки от време на време. Всички промени
                ще бъдат публикувани на тази страница с нова дата на актуализация. Препоръчваме
                периодично да преглеждате тази страница за промени.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-sunflower/10 border-sunflower border-l-4 p-6">
              <h3 className="font-handwritten text-bulgarian-red mb-3 text-2xl">
                Въпроси относно бисквитките?
              </h3>
              <p className="font-handwritten text-walnut mb-4 text-lg leading-relaxed">
                Ако имате въпроси относно използването на бисквитки на нашия сайт, моля свържете се
                с нас:
              </p>
              <p className="font-handwritten text-walnut text-lg">
                📧{' '}
                <a
                  href="mailto:contact@bacho-iliya.eu"
                  className="text-bulgarian-red hover:underline"
                >
                  contact@bacho-iliya.eu
                </a>
              </p>
            </div>

            {/* Accept/Back CTA */}
            <div className="border-walnut/30 mt-10 border-t-2 border-dashed pt-8 text-center">
              <Link
                href="/"
                className="bg-bulgarian-red border-walnut/40 font-handwritten inline-block border-4 px-8 py-4 text-xl font-bold text-white shadow-xl transition-all hover:scale-105"
              >
                Разбрах, продължи към сайта
              </Link>
            </div>
          </div>

          {/* Coffee Stains */}
          <div className="bg-walnut/10 pointer-events-none absolute right-8 bottom-8 h-24 w-24 rounded-full opacity-30 blur-lg" />
          <div className="bg-walnut/10 pointer-events-none absolute top-12 left-20 h-16 w-16 rounded-full opacity-30 blur-md" />
        </motion.div>
      </div>
    </div>
  );
}
