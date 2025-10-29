'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Общи условия',
      content: [
        'Като участвате в раздаването на Бачо Илия, вие приемате настоящите Общи условия.',
        '',
        'Раздаването се организира от Бачо Илия с цел популяризиране на автентичните български млечни продукти и запазване на традиционните рецепти.',
        '',
        'Участието е напълно безплатно и доброволно.',
      ],
    },
    {
      title: '2. Правила за участие',
      content: [
        'За да участвате в раздаването, трябва да:',
        '• Сте навършили 18 години',
        '• Имате постоянен адрес на територията на Република България',
        '• Предоставите валидни лични данни (име, имейл, телефон)',
        '• Изберете поне един продукт от наличните',
        '• Изпълните всички задачи за участие (харесване, споделяне, коментар)',
        '',
        'Всеки участник може да се регистрира само ВЕДНЪЖ.',
        'Множественото регистриране води до дисквалификация.',
      ],
    },
    {
      title: '3. Награди',
      content: [
        'Наградите включват следните продукти на Бачо Илия:',
        '• Бяло краве сирене (различни грамажи)',
        '• Кашкавал (различни грамажи)',
        '• Кисело мляко (различни мастности)',
        '• Айран',
        '• Протеинова напитка',
        '',
        'Конкретните награди и техният брой се определят от организатора.',
        'Наградите НЕ могат да се заменят с парична равностойност.',
      ],
    },
    {
      title: '4. Теглене и обявяване на печеливши',
      content: [
        'Печелившите се определят чрез случайно теглене след приключване на раздаването.',
        '',
        'Печелившите ще бъдат уведомени чрез:',
        '• Имейл на посочения адрес',
        '• Телефонно обаждане',
        '• Публикуване на страницата на Бачо Илия',
        '',
        'Печелившите имат 7 дни от уведомлението да потвърдят участието си и предоставят адрес за доставка.',
        'При липса на отговор в 7-дневен срок, наградата отива към резервен печеливш.',
      ],
    },
    {
      title: '5. Доставка на награди',
      content: [
        'Наградите се доставят безплатно на територията на България.',
        '',
        'Срокове за доставка:',
        '• София и областни градове: 1-3 работни дни',
        '• По-малки населени места: 3-7 работни дни',
        '',
        'Доставката се извършва от куриерска фирма, партньор на Бачо Илия.',
        'Организаторът не носи отговорност за забавяния, причинени от куриера или форсмажорни обстоятелства.',
      ],
    },
    {
      title: '6. Дисквалификация',
      content: [
        'Участникът може да бъде дисквалифициран при:',
        '• Предоставяне на невалидни или фалшиви данни',
        '• Множествено регистриране с различни имейли/профили',
        '• Използване на ботове или автоматизирани системи',
        '• Неизпълнение на задачите за участие',
        '• Нарушаване на добрите нрави',
        '',
        'Организаторът си запазва правото да дисквалифицира участник без предупреждение.',
      ],
    },
    {
      title: '7. Лични данни и поверителност',
      content: [
        'Вашите лични данни се обработват съгласно Политиката за поверителност на Бачо Илия.',
        '',
        'Данните се използват единствено за:',
        '• Управление на раздаването',
        '• Връзка с печелившите',
        '• Доставка на наградите',
        '',
        'НЕ продаваме и НЕ споделяме вашите данни с трети страни.',
        'За повече информация вижте: Политика за поверителност',
      ],
    },
    {
      title: '8. Отговорности и гаранции',
      content: [
        'Организаторът се задължава да:',
        '• Провежда раздаването честно и прозрачно',
        '• Доставя наградите на печелившите',
        '• Защитава личните данни на участниците',
        '',
        'Организаторът НЕ носи отговорност за:',
        '• Технически проблеми със сайта или социални мрежи',
        '• Грешки при въвеждане на данни от страна на участниците',
        '• Форсмажорни обстоятелства',
      ],
    },
    {
      title: '9. Промени в условията',
      content: [
        'Организаторът си запазва правото да променя настоящите Общи условия.',
        '',
        'При съществени промени участниците ще бъдат уведомени чрез:',
        '• Банер на сайта',
        '• Имейл до регистрираните участници',
        '• Публикация в социалните мрежи',
        '',
        'Промените влизат в сила от момента на публикуването им.',
      ],
    },
    {
      title: '10. Прекратяване на раздаването',
      content: [
        'Организаторът си запазва правото да прекрати раздаването предсрочно при:',
        '• Форсмажорни обстоятелства',
        '• Технически проблеми',
        '• Масово нарушаване на правилата',
        '',
        'При прекратяване участниците ще бъдат уведомени своевременно.',
        'Ако вече има избрани печеливши, те ще получат своите награди.',
      ],
    },
    {
      title: '11. Контакти и жалби',
      content: [
        'За въпроси относно раздаването или жалби:',
        '',
        '📧 Имейл: contact@bacho-iliya.eu',
        '🌐 Уебсайт: bacho-iliya.eu',
        '📱 Facebook: facebook.com/Bacho.Iliya',
        '',
        'Ще разгледаме вашето запитване в рамките на 7 работни дни.',
      ],
    },
    {
      title: '12. Приложимо право',
      content: [
        'Настоящите Общи условия се уреждат от законодателството на Република България.',
        '',
        'Всички спорове се решават по реда на българското законодателство.',
        '',
        'Компетентни са българските съдилища.',
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
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/10 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 2}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-16 hidden w-px md:block" />

          {/* Perforation Holes */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-12 flex-col justify-around py-8 md:flex">
            {[...Array(40)].map((_, i) => (
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
                Общи Условия
              </h1>
              <p className="font-handwritten text-walnut/70 text-lg md:text-xl">
                Правила за участие в раздаването на Бачо Илия
              </p>
              <p className="font-handwritten text-walnut/60 mt-2 text-base">
                Последна актуализация: Януари 2025
              </p>
            </div>

            {/* Important Notice */}
            <div className="bg-sunflower/20 border-sunflower mb-8 border-l-4 p-6">
              <p className="font-handwritten text-walnut text-xl leading-relaxed">
                Моля, прочетете внимателно настоящите Общи условия преди да участвате в раздаването.
                Участието в раздаването означава, че приемате тези условия в пълния им обем.
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
                  transition={{ delay: index * 0.08, duration: 0.5 }}
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

            {/* Acceptance Box */}
            <div className="bg-bulgarian-red/10 border-bulgarian-red/40 mt-10 border-4 p-6">
              <h3 className="font-handwritten text-bulgarian-red mb-3 text-2xl">
                Приемане на условията
              </h3>
              <p className="font-handwritten text-walnut mb-4 text-lg leading-relaxed">
                С регистрацията си в раздаването вие потвърждавате, че:
              </p>
              <ul className="ml-6 space-y-2">
                <li className="font-handwritten text-walnut text-lg">
                  • Сте прочели и разбрали настоящите Общи условия
                </li>
                <li className="font-handwritten text-walnut text-lg">
                  • Приемате ги изцяло и без възражения
                </li>
                <li className="font-handwritten text-walnut text-lg">
                  • Сте съгласни с обработката на вашите лични данни
                </li>
                <li className="font-handwritten text-walnut text-lg">
                  • Отговаряте на изискванията за участие
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="border-walnut/30 mt-10 border-t-2 border-dashed pt-8 text-center">
              <p className="font-handwritten text-walnut mb-6 text-xl">Готови за участие?</p>
              <Link
                href="/"
                className="bg-bulgarian-red border-walnut/40 font-handwritten inline-block border-4 px-8 py-4 text-xl font-bold text-white shadow-xl transition-all hover:scale-105"
              >
                Участвай в раздаването
              </Link>
            </div>
          </div>

          {/* Coffee Stains */}
          <div className="bg-walnut/10 pointer-events-none absolute right-8 bottom-8 h-24 w-24 rounded-full opacity-30 blur-lg" />
          <div className="bg-walnut/10 pointer-events-none absolute top-16 left-24 h-16 w-16 rounded-full opacity-30 blur-md" />
        </motion.div>
      </div>
    </div>
  );
}
