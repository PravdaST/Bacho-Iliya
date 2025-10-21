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
        'Тази информация се използва единствено за целите на раздаването и връзка с печелившите.'
      ]
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
        'НЕ продаваме, НЕ споделяме и НЕ предоставяме вашите данни на трети страни за маркетингови цели.'
      ]
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
        'Вижте нашата Политика за Cookies за повече информация.'
      ]
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
        'Вашите данни се съхраняват защитено и се използват само по предназначение.'
      ]
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
        'За упражняване на вашите права, свържете се с нас на: contact@bacho-iliya.eu'
      ]
    },
    {
      title: '6. Съхранение на данни',
      content: [
        'Вашите лични данни се съхраняват за периода на раздаването плюс 30 дни след приключването му.',
        '',
        'След този период всички лични данни се изтриват автоматично, освен ако не сте дали изрично съгласие за получаване на бюлетин или маркетингови съобщения.',
        '',
        'Данните на печелившите се съхраняват за счетоводни цели за период от 5 години.'
      ]
    },
    {
      title: '7. Връзка с трети страни',
      content: [
        'Нашият сайт може да съдържа линкове към външни сайтове:',
        '• Facebook, Instagram, TikTok, YouTube (социални мрежи)',
        '• Google Analytics (анализ на трафика)',
        '',
        'Не носим отговорност за политиките за поверителност на тези трети страни.',
        'Препоръчваме ви да прочетете техните политики за поверителност.'
      ]
    },
    {
      title: '8. Промени в политиката',
      content: [
        'Запазваме си правото да актуализираме тази Политика за поверителност.',
        '',
        'При съществени промени ще ви уведомим чрез имейл или чрез банер на сайта.',
        '',
        'Последна актуализация: Януари 2025'
      ]
    },
    {
      title: '9. Контакти',
      content: [
        'За въпроси относно тази Политика за поверителност или обработката на вашите лични данни:',
        '',
        '📧 Имейл: contact@bacho-iliya.eu',
        '🌐 Уебсайт: bacho-iliya.eu',
        '',
        'Ще отговорим на вашето запитване в рамките на 30 дни.'
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
                Политика за Поверителност
              </h1>
              <p className="font-handwritten text-walnut/70 text-lg md:text-xl">
                Как защитаваме вашите лични данни
              </p>
              <p className="font-handwritten text-walnut/60 text-base mt-2">
                Последна актуализация: Януари 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-8 pb-8 border-b border-dashed border-walnut/20">
              <p className="font-handwritten text-walnut text-xl leading-relaxed">
                В Бачо Илия зачитаме вашата поверителност и се ангажираме да защитаваме вашите лични данни.
                Тази политика обяснява как събираме, използваме и защитаваме информацията ви при участие в
                нашето раздаване и ползване на уебсайта ни.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="pb-8 border-b border-dashed border-walnut/20 last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h2 className="font-handwritten text-bulgarian-red text-3xl mb-4">
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
            <div className="mt-10 p-6 bg-bulgarian-red/10 border-l-4 border-bulgarian-red">
              <h3 className="font-handwritten text-bulgarian-red text-2xl mb-3">
                GDPR Съответствие
              </h3>
              <p className="font-handwritten text-walnut text-lg leading-relaxed">
                Бачо Илия е напълно съвместим с изискванията на Общия регламент за защита на данните (GDPR).
                Вашите данни са защитени и се обработват законосъобразно, справедливо и прозрачно.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="mt-10 text-center pt-8 border-t-2 border-dashed border-walnut/30">
              <p className="font-handwritten text-walnut text-xl mb-6">
                Имате въпроси относно вашите данни?
              </p>
              <a
                href="mailto:contact@bacho-iliya.eu"
                className="inline-block px-8 py-4 bg-bulgarian-red border-4 border-walnut/40 text-white font-handwritten text-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                Свържете се с нас
              </a>
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
