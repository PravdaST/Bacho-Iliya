import { Suspense } from 'react';
import { recipes as allRecipes } from '@/lib/recipes-data';
import ReferralDetector from '@/components/ReferralDetector';
import FAQ from '@/components/FAQ';
import BachoStory from '@/components/BachoStory';
import StickyCTA from '@/components/StickyCTA';
import GiveawayFormClient from '@/components/GiveawayFormClient';
import HeroSectionClient from '@/components/HeroSectionClient';
import HomePageContent from '@/components/HomePageContent';
// SEO Schema Components
import { OrganizationSchema, GiveawayEventSchema, FAQSchema } from '@/components/seo';

export default function Home() {
  // Prepare recipes data - show 6 featured recipes on homepage
  const recipes = allRecipes.slice(0, 6).map((recipe) => {
    // Calculate total time
    const prepMinutes = parseInt(recipe.prepTime) || 0;
    const cookMinutes = parseInt(recipe.cookTime) || 0;
    const totalMinutes = prepMinutes + cookMinutes;
    const timeDisplay = totalMinutes > 0 ? `${totalMinutes} мин` : recipe.difficulty;

    return {
      title: recipe.titleBg,
      image: recipe.image,
      time: timeDisplay,
      slug: recipe.slug,
      bachoTip: recipe.tips[0]?.tipBg || recipe.descriptionBg,
    };
  });

  // FAQ data for structured data (plain text only for schema.org)
  const faqData = [
    {
      question: 'Кой е Бачо Илия?',
      answer:
        'Аз съм Бачо Илия - дядо, който прави сирене точно както бабата ме научи преди 50 години. Нищо не съм променил. Без химия, без бързане, без подмолки. Просто истински продукти за твоето семейство. Защото ако не бих дал на моите внуци, няма да го продам на теб.',
    },
    {
      question: 'Как мога да участвам в раздаването?',
      answer:
        'Много просто е! Маркирай продуктите, които искаш да опиташ. После ми кажи името ти, email-а и телефона. Това е - 2 минути работа. Ще те помоля да ме последваш във Facebook и да споделиш с приятелите си!',
    },
    {
      question: 'Къде мога да купя продуктите ти?',
      answer:
        'В магазините из цяла България - местните магазинчета и малките вериги. В Kaufland и Lidl няма да ме намериш - те искат големи количества и промени в рецептата, а аз не мога да променя бабините рецепти. Виж на /where-to-buy пълния списък с магазини в твоя град. Ако не намериш - пиши ми във Facebook или Instagram и ще ти кажа къде най-близо до теб.',
    },
    {
      question: 'Какво точно правиш?',
      answer:
        'Правя бяло сирене - малко или голямо, както ти трябва. Правя кашкавал - жълтото сирене, което децата обичат топено. И правя кисело мляко - гъсто, с каймак, както бабата го правеше. Всичко по нейните рецепти. Няма нищо друго освен мляко, сол и щипка традиция. И време. Много време.',
    },
    {
      question: 'Защо твоите продукти са различни?',
      answer:
        'Защото не бързам. Защото кравите са щастливи, ядат трева, не антибиотици. Защото не слагам химия и консерванти. Ако не бих дал на внуците си, няма да го продам на теб. Проста работа. Правя го както бабата ме научи и толкова.',
    },
    {
      question: 'Колко струва участието?',
      answer:
        'Нищо не струва! Безплатно е. Просто искам повече хора да опитат какво е истинско сирене, мляко, кашкавал. Без номера, без скрити условия. Само се регистрираш и може би ще ти падне да опиташ. Толкова е простичко.',
    },
    {
      question: 'Кога ще разбера дали съм спечелил?',
      answer:
        'Ще ти пиша на email-а и телефона. Ще видиш и във Facebook и Instagram. Ако спечелиш - ще се свържа лично да уредим къде и как да ти пратя продуктите!',
    },
    {
      question: 'Може ли да давам на децата си?',
      answer:
        'Е, на моите внуци им давам, не виждам защо на твоите не. Това е храна каквато трябва да се дава на деца - без химия. Чисто мляко, сол и традиция. Калций за костите, протеин за мускулите. Точно като на село. Много родители ми казват, че за първи път децата им ядат сирене без да им се карат.',
    },
  ];

  return (
    <>
      {/* Referral Detection (wrapped in Suspense for Next.js 15) */}
      <Suspense fallback={null}>
        <ReferralDetector />
      </Suspense>

      {/* SEO Schema.org Structured Data */}
      <OrganizationSchema />
      <GiveawayEventSchema
        giveaway={{
          name: 'Голямо раздаване на Бачо Илия продукти',
          description:
            'Участвай в нашето раздаване и спечели автентични български млечни продукти! Избери любимите си продукти, сподели с приятели и увеличи шансовете си за печалба.',
          image: '/og-image.jpg',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        }}
      />
      <FAQSchema faqs={faqData} />

      {/* Hero - Client Component with Animations */}
      <HeroSectionClient />

      {/* Bacho Story Section - BUILD EMOTIONAL CONNECTION FIRST */}
      <div id="story">
        <BachoStory />
      </div>

      {/* All animated sections including Giveaway Form - Client Component */}
      <HomePageContent recipes={recipes} />

      {/* FAQ Section */}
      <FAQ />

      {/* Sticky CTA */}
      <StickyCTA />
    </>
  );
}
