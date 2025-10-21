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
        'Участието е напълно безплатно и доброволно.'
      ]
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
        'Множественото регистриране води до дисквалификация.'
      ]
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
        'Наградите НЕ могат да се заменят с парична равностойност.'
      ]
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
        'При липса на отговор в 7-дневен срок, наградата отива към резервен печеливш.'
      ]
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
        'Организаторът не носи отговорност за забавяния, причинени от куриера или форсмажорни обстоятелства.'
      ]
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
        'Организаторът си запазва правото да дисквалифицира участник без предупреждение.'
      ]
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
        'За повече информация вижте: Политика за поверителност'
      ]
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
        '• Форсмажорни обстоятелства'
      ]
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
        'Промените влизат в сила от момента на публикуването им.'
      ]
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
        'Ако вече има избрани печеливши, те ще получат своите награди.'
      ]
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
        'Ще разгледаме вашето запитване в рамките на 7 работни дни.'
      ]
    },
    {
      title: '12. Приложимо право',
      content: [
        'Настоящите Общи условия се уреждат от законодателството на Република България.',
        '',
        'Всички спорове се решават по реда на българското законодателство.',
        '',
        'Компетентни са българските съдилища.'
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
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/10"
                style={{ top: `${(i + 1) * 2}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30 hidden md:block" />

          {/* Perforation Holes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex flex-col justify-around py-8">
            {[...Array(40)].map((_, i) => (
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
                Общи Условия
              </h1>
              <p className="font-handwritten text-walnut/70 text-lg md:text-xl">
                Правила за участие в раздаването на Бачо Илия
              </p>
              <p className="font-handwritten text-walnut/60 text-base mt-2">
                Последна актуализация: Януари 2025
              </p>
            </div>

            {/* Important Notice */}
            <div className="mb-8 p-6 bg-sunflower/20 border-l-4 border-sunflower">
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
                  className="pb-8 border-b border-dashed border-walnut/20 last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
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

            {/* Acceptance Box */}
            <div className="mt-10 p-6 bg-bulgarian-red/10 border-4 border-bulgarian-red/40">
              <h3 className="font-handwritten text-bulgarian-red text-2xl mb-3">
                Приемане на условията
              </h3>
              <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4">
                С регистрацията си в раздаването вие потвърждавате, че:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="font-handwritten text-walnut text-lg">• Сте прочели и разбрали настоящите Общи условия</li>
                <li className="font-handwritten text-walnut text-lg">• Приемате ги изцяло и без възражения</li>
                <li className="font-handwritten text-walnut text-lg">• Сте съгласни с обработката на вашите лични данни</li>
                <li className="font-handwritten text-walnut text-lg">• Отговаряте на изискванията за участие</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center pt-8 border-t-2 border-dashed border-walnut/30">
              <p className="font-handwritten text-walnut text-xl mb-6">
                Готови за участие?
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-bulgarian-red border-4 border-walnut/40 text-white font-handwritten text-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                Участвай в раздаването
              </Link>
            </div>
          </div>

          {/* Coffee Stains */}
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-walnut/10 blur-lg opacity-30 pointer-events-none" />
          <div className="absolute top-16 left-24 w-16 h-16 rounded-full bg-walnut/10 blur-md opacity-30 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
