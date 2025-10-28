'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "Кой е Бачо Илия?",
    answer: "Аз съм Бачо Илия - дядо, който прави сирене точно както бабата ме научи преди 50 години. Нищо не съм променил. Без химия, без бързане, без подмолки. Просто истински продукти за твоето семейство. Защото ако не бих дал на моите внуци, няма да го продам на теб."
  },
  {
    question: "Как мога да участвам в раздаването?",
    answer: "Много просто е! Маркирай продуктите, които искаш да опиташ. После ми кажи името ти, email-а и телефона. Това е - 2 минути работа. Ще те помоля да ме последваш във Facebook и да споделиш с приятелите си!"
  },
  {
    question: "Къде мога да купя продуктите ти?",
    answer: (
      <>
        В магазините из цяла България - местните магазинчета и малките вериги. <strong className="text-bulgarian-red">В Kaufland и Lidl няма да ме намериш</strong> - те искат големи количества и промени в рецептата, а аз не мога да променя бабините рецепти. <Link href="/where-to-buy" className="text-bulgarian-red font-bold underline hover:text-walnut transition-colors">Виж тук пълния списък с магазини</Link> в твоя град. Ако не намериш - пиши ми във Facebook или Instagram и ще ти кажа къде най-близо до теб.
      </>
    )
  },
  {
    question: "Какво точно правиш?",
    answer: "Правя бяло сирене - малко или голямо, както ти трябва. Правя кашкавал - жълтото сирене, което децата обичат топено. И правя кисело мляко - гъсто, с каймак, както бабата го правеше. Всичко по нейните рецепти. Няма нищо друго освен мляко, сол и щипка традиция. И време. Много време."
  },
  {
    question: "Защо твоите продукти са различни?",
    answer: "Защото не бързам. Защото кравите са щастливи, ядат трева, не антибиотици. Защото не слагам химия и консерванти. Ако не бих дал на внуците си, няма да го продам на теб. Проста работа. Правя го както бабата ме научи и толкова."
  },
  {
    question: "Колко струва участието?",
    answer: "Нищо не струва! Безплатно е. Просто искам повече хора да опитат какво е истинско сирене, мляко, кашкавал. Без номера, без скрити условия. Само се регистрираш и може би ще ти падне да опиташ. Толкова е простичко."
  },
  {
    question: "Кога ще разбера дали съм спечелил?",
    answer: "Ще ти пиша на email-а и телефона. Ще видиш и във Facebook и Instagram. Ако спечелиш - ще се свържа лично да уредим къде и как да ти пратя продуктите!"
  },
  {
    question: "Може ли да давам на децата си?",
    answer: "Е, на моите внуци им давам, не виждам защо на твоите не. Това е храна каквато трябва да се дава на деца - без химия. Чисто мляко, сол и традиция. Калций за костите, протеин за мускулите. Точно като на село. Много родители ми казват, че за първи път децата им ядат сирене без да им се карат."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-walnut/10 relative overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-4xl mx-auto relative">
        {/* Notebook Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/Bachi ilia head logo_.webp"
                  alt="Бачо Илия"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h2 className="font-handwritten text-bulgarian-red" style={{ fontSize: '48px' }}>
                Бачовият бележник
              </h2>
            </div>
            <p className="font-handwritten text-walnut text-lg">
              Всичко, което искаш да знаеш - с думите на дядото
            </p>
          </motion.div>
        </div>

        {/* Notebook Page */}
        <div className="relative bg-old-paper border-4 border-walnut/40 shadow-2xl p-8 md:p-12">
          {/* Perforation Holes - Left Side */}
          <div className="absolute left-0 top-0 bottom-0 w-10 hidden md:flex flex-col justify-around py-8">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-walnut/20 rounded-full ml-3.5 border border-walnut/10" />
            ))}
          </div>

          {/* Notebook Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/15"
                style={{ top: `${(i + 1) * 4}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30" />

          {/* Paper Texture */}
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          {/* FAQ Items */}
          <div className="space-y-8 ml-8 relative z-10">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Question - Typewriter Font */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left group"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-handwritten text-bulgarian-red font-bold flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <h3 className="font-handwritten text-lg md:text-xl text-walnut font-bold group-hover:text-bulgarian-red transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                </button>

                {/* Answer - Handwritten Font with Page Flip */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                        rotateX: -15,
                        transformOrigin: 'top'
                      }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        rotateX: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        rotateX: -15,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      className="overflow-hidden mt-4 ml-12"
                    >
                      <div className="flex gap-4 items-start bg-old-paper/60 p-4 border-l-4 border-bulgarian-red">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src="/Bachi ilia head logo_.webp"
                            alt="Бачо Илия"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Separator */}
                {index < faqData.length - 1 && (
                  <div className="mt-6 border-b-2 border-dashed border-walnut/20" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Coffee Stain */}
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-walnut/10 blur-sm opacity-40" />
        </div>
      </div>
    </section>
  );
}
