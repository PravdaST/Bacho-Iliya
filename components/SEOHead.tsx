import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = 'Бачо Илия | Bacho Ilia - Автентични Български Млечни Продукти | Безплатно Раздаване',
  description = 'Спечелете автентични млечни продукти от Бачо Илия (Bacho Ilia, Bacho Iliya). Истинско българско сирене, кисело мляко и кашкавал по бабините рецепти. 100% естествени продукти без консерванти.',
  canonical = 'https://www.bacho-iliya.eu',
  ogImage = '/bacho-ilia-main.webp',
}: SEOHeadProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization Schema
      {
        '@type': 'Organization',
        '@id': 'https://www.bacho-iliya.eu/#organization',
        name: 'Бачо Илия',
        alternateName: ['Bacho Ilia', 'Bacho Iliya', 'Бачо Илиа', 'Bacho Ilija'],
        url: 'https://www.bacho-iliya.eu',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.bacho-iliya.eu/bacho-ilia-main.webp',
          width: 800,
          height: 800,
        },
        description:
          'Производител на автентични български млечни продукти по традиционни рецепти. Бачо Илия предлага сирене, кисело мляко и кашкавал без консерванти и химия.',
        founder: {
          '@type': 'Person',
          name: 'Илия',
          alternateName: 'Бачо Илия',
        },
        foundingDate: '1995',
        slogan: 'Вкусът от детството на твоята трапеза',
        areaServed: {
          '@type': 'Country',
          name: 'България',
        },
        knowsAbout: [
          'Българско сирене',
          'Традиционни млечни продукти',
          'Кисело мляко',
          'Кашкавал',
          'Автентична храна',
        ],
        sameAs: ['https://facebook.com/bacho-ilia', 'https://instagram.com/bacho_ilia'],
      },
      // Product Schema - Sirene
      {
        '@type': 'Product',
        '@id': 'https://www.bacho-iliya.eu/#sirene',
        name: 'Българско Сирене Бачо Илия',
        image: 'https://www.bacho-iliya.eu/products/sirene/BI-sirene-400-metal-480x480.png',
        brand: {
          '@type': 'Brand',
          name: 'Бачо Илия',
          alternateName: ['Bacho Ilia', 'Bacho Iliya'],
        },
        description:
          'Автентично българско сирене, направено по бабини рецепти. 100% естествено, без консерванти и химия. Истинският вкус от детството.',
        category: 'Млечни продукти',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '6.00',
          highPrice: '12.00',
          priceCurrency: 'BGN',
          availability: 'https://schema.org/InStock',
          offerCount: '1',
          url: 'https://www.bacho-iliya.eu/products/sirene',
          priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '2500',
          bestRating: '5',
          worstRating: '1',
        },
      },
      // WebSite Schema
      {
        '@type': 'WebSite',
        '@id': 'https://www.bacho-iliya.eu/#website',
        url: 'https://www.bacho-iliya.eu',
        name: 'Бачо Илия - Автентични Български Млечни Продукти',
        alternateName: 'Bacho Ilia',
        description: 'Традиционни български млечни продукти без консерванти',
        inLanguage: 'bg-BG',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.bacho-iliya.eu/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      // Promotion/Offer Schema for Giveaway
      {
        '@type': 'PromotionOffer',
        name: 'Безплатно Раздаване на Продукти Бачо Илия',
        description:
          'Спечелете автентични млечни продукти от Бачо Илия напълно безплатно. Изберете продукти и се регистрирайте за участие.',
        availabilityStarts: new Date().toISOString(),
        availabilityEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        eligibleRegion: {
          '@type': 'Country',
          name: 'България',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '0',
          priceCurrency: 'BGN',
        },
      },
      // FAQPage Schema - Removed to prevent duplication (FAQ schema is in StructuredData.tsx)
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
