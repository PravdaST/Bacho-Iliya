'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Каква информация събираме',
      content: [
        'При участие в раздаването събираме следната лична информация:',
        '• Име и фамилия',
        '• Имейл адрес',
        '• Телефонен номер',
        '• Предпочитани продукти',
        '',
        'Тази информация се използва единствено за целите на раздаването и връзка с печелившите.',
      ],
    },
    {
      title: '2. Как използваме вашите данни',
      content: [
        'Вашите лични данни се използват за:',
        '• Управление на вашето участие в раздаването',
        '• Връзка с вас при спечелване на награда',
        '• Изпращане на информация за статуса на раздаването',
        '• Подобряване на нашите услуги',
        '',
        'НЕ продаваме, НЕ споделяме и НЕ предоставяме вашите данни на трети страни за маркетингови цели.',
      ],
    },
    {
      title: '3. Cookies и проследяване',
      content: [
        'Използваме бисквитки (cookies) за:',
        '• Запазване на вашия напредък в раздаването',
        '• Подобряване на потребителското преживяване',
        '• Анализ на трафика на сайта (Google Analytics)',
        '',
        'Можете да контролирате използването на cookies чрез настройките на вашия браузър.',
        'Вижте нашата Политика за Cookies за повече информация.',
      ],
    },
    {
      title: '4. Сигурност на данните',
      content: [
        'Предприемаме всички необходими технически и организационни мерки за защита на вашите лични данни:',
        '• SSL криптиране на всички данни',
        '• Сигурно съхранение на сървъри в Европейския съюз',
        '• Ограничен достъп до личните данни',
        '• Редовни проверки за сигурност',
        '',
        'Вашите данни се съхраняват защитено и се използват само по предназначение.',
      ],
    },
    {
      title: '5. Вашите права (GDPR)',
      content: [
        'Съгласно Общия регламент за защита на данните (GDPR) имате право на:',
        '• Достъп до вашите лични данни',
        '• Коригиране на неточни данни',
        '• Изтриване на вашите данни ("правото да бъдеш забравен")',
        '• Ограничаване на обработката на данните',
        '• Преносимост на данните',
        '• Възражение срещу обработката',
        '',
        'За упражняване на вашите права, свържете се с нас на: contact@bacho-iliya.eu',
      ],
    },
    {
      title: '6. Съхранение на данни',
      content: [
        'Вашите лични данни се съхраняват за периода на раздаването плюс 30 дни след приключването му.',
        '',
        'След този период всички лични данни се изтриват автоматично, освен ако не сте дали изрично съгласие за получаване на бюлетин или маркетингови съобщения.',
        '',
        'Данните на печелившите се съхраняват за счетоводни цели за период от 5 години.',
      ],
    },
    {
      title: '7. Връзка с трети страни',
      content: [
        'Нашият сайт може да съдържа линкове към външни сайтове:',
        '• Facebook, Instagram, TikTok, YouTube (социални мрежи)',
        '• Google Analytics (анализ на трафика)',
        '',
        'Не носим отговорност за политиките за поверителност на тези трети страни.',
        'Препоръчваме ви да прочетете техните политики за поверителност.',
      ],
    },
    {
      title: '8. Промени в политиката',
      content: [
        'Запазваме си правото да актуализираме тази Политика за поверителност.',
        '',
        'При съществени промени ще ви уведомим чрез имейл или чрез банер на сайта.',
        '',
        'Последна актуализация: Януари 2025',
      ],
    },
    {
      title: '9. Контакти',
      content: [
        'За въпроси относно тази Политика за поверителност или обработката на вашите лични данни:',
        '',
        '📧 Имейл: contact@bacho-iliya.eu',
        '🌐 Уебсайт: bacho-iliya.eu',
        '',
        'Ще отговорим на вашето запитване в рамките на 30 дни.',
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
                Политика за Поверителност
              </h1>
              <p className="font-handwritten text-walnut/70 text-lg md:text-xl">
                Как защитаваме вашите лични данни
              </p>
              <p className="font-handwritten text-walnut/60 mt-2 text-base">
                Последна актуализация: Януари 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="border-walnut/20 mb-8 border-b border-dashed pb-8">
              <p className="font-handwritten text-walnut text-xl leading-relaxed">
                В Бачо Илия зачитаме вашата поверителност и се ангажираме да защитаваме вашите лични
                данни. Тази политика обяснява как събираме, използваме и защитаваме информацията ви
                при участие в нашето раздаване и ползване на уебсайта ни.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="border-walnut/20 border-b border-dashed pb-8 last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl">
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    {section.content.map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className={`font-handwritten text-walnut text-lg leading-relaxed ${
                          line.startsWith('•') ? 'ml-6' : ''
                        } ${line === '' ? 'h-2' : ''}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* GDPR Notice */}
            <div className="bg-bulgarian-red/10 border-bulgarian-red mt-10 border-l-4 p-6">
              <h3 className="font-handwritten text-bulgarian-red mb-3 text-2xl">
                GDPR Съответствие
              </h3>
              <p className="font-handwritten text-walnut text-lg leading-relaxed">
                Бачо Илия е напълно съвместим с изискванията на Общия регламент за защита на данните
                (GDPR). Вашите данни са защитени и се обработват законосъобразно, справедливо и
                прозрачно.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="border-walnut/30 mt-10 border-t-2 border-dashed pt-8 text-center">
              <p className="font-handwritten text-walnut mb-6 text-xl">
                Имате въпроси относно вашите данни?
              </p>
              <a
                href="mailto:contact@bacho-iliya.eu"
                className="bg-bulgarian-red border-walnut/40 font-handwritten inline-block border-4 px-8 py-4 text-xl font-bold text-white shadow-xl transition-all hover:scale-105"
              >
                Свържете се с нас
              </a>
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
