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
import { OrganizationSchema, GiveawayEventSchema } from '@/components/seo';

export default function Home() {
  // Prepare recipes data (Server Component - runs on server)
  const recipes = allRecipes.slice(0, 12).map((recipe) => {
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
