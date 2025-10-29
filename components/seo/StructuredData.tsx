import { products } from '@/lib/store';

export default function StructuredData() {
  // Fixed dates for consistent server/client rendering
  // Giveaway runs for 30 days from a fixed start date
  const giveawayStartDate = '2025-10-15T00:00:00.000Z';
  const giveawayEndDate = '2025-11-14T23:59:59.999Z';

  // Organization Schema with all brand name variations
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Бачо Илия',
    alternateName: ['Bacho Iliya', 'Bacho Ilya', 'Бачо Илья'],
    url: 'https://bacho-iliya.eu',
    logo: 'https://bacho-iliya.eu/logo.png',
    description:
      'Автентични български млечни продукти, създадени по традиционни рецепти. Естествени сирена, кашкавали и кисело мляко от щастливи крави.',
    sameAs: [
      'https://www.facebook.com/Bacho.Iliya/',
      'https://www.youtube.com/@bachoiliyabg',
      'https://www.tiktok.com/@bachoiliyabg',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Bulgarian', 'English'],
    },
    brand: {
      '@type': 'Brand',
      name: 'Бачо Илия',
      alternateName: ['Bacho Iliya', 'Bacho Ilya'],
    },
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Бачо Илия',
    image: 'https://bacho-iliya.eu/logo.png',
    description: 'Производител на автентични български млечни продукти',
    '@id': 'https://bacho-iliya.eu',
    url: 'https://bacho-iliya.eu',
    telephone: '',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BG',
      addressLocality: 'България',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'BG',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://www.facebook.com/Bacho.Iliya/',
      'https://www.youtube.com/@bachoiliyabg',
      'https://www.tiktok.com/@bachoiliyabg',
    ],
  };

  // Event Schema for Giveaway
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Раздаване на продукти Бачо Илия',
    description:
      'Спечели автентични български млечни продукти от Бачо Илия. Безплатно участие, истински продукти от щастливи крави.',
    image: 'https://bacho-iliya.eu/logo.png',
    startDate: giveawayStartDate,
    endDate: giveawayEndDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://bacho-iliya.eu/giveaway',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Бачо Илия',
      url: 'https://bacho-iliya.eu',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://bacho-iliya.eu/giveaway',
      price: '0',
      priceCurrency: 'BGN',
      availability: 'https://schema.org/InStock',
      validFrom: giveawayStartDate,
    },
  };

  // Product Schemas for all dairy products
  const productSchemas = products.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameBg,
    description: product.description,
    image: `https://bacho-iliya.eu${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'Бачо Илия',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Бачо Илия',
    },
    category: product.id.includes('sirene')
      ? 'Бяло сирене'
      : product.id.includes('kashkaval')
        ? 'Кашкавал'
        : 'Кисело мляко',
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BGN',
    },
  }));

  // Recipe Schemas for Bulgarian traditional dishes
  const recipeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: 'Истинска баница с бяло сирене Бачо Илия',
      image: 'https://bacho-iliya.eu/banica.webp',
      description: 'Традиционна българска баница с автентично бяло сирене Бачо Илия',
      keywords: 'баница, бяло сирене, българска рецепта, Бачо Илия',
      recipeCategory: 'Закуска',
      recipeCuisine: 'Българска',
      prepTime: 'PT20M',
      cookTime: 'PT40M',
      totalTime: 'PT60M',
      recipeYield: '8 порции',
      recipeIngredient: [
        '500г бяло сирене Бачо Илия',
        '500г кори за баница',
        '4 яйца',
        '200мл кисело мляко',
        '100мл олио',
      ],
      recipeInstructions: [
        {
          '@type': 'HowToStep',
          text: 'Разбийте яйцата с киселото мляко',
        },
        {
          '@type': 'HowToStep',
          text: 'Настържете или натрошете сиренето Бачо Илия',
        },
        {
          '@type': 'HowToStep',
          text: 'Намажете всяка кора с олио и сместа от яйца',
        },
        {
          '@type': 'HowToStep',
          text: 'Сложете сирене и навийте руло',
        },
        {
          '@type': 'HowToStep',
          text: 'Печете на 180° за 40 минути',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: 'Класическа шопска салата с бяло сирене Бачо Илия',
      image: 'https://bacho-iliya.eu/shopska.webp',
      description: 'Традиционна българска шопска салата с автентично бяло сирене',
      keywords: 'шопска салата, бяло сирене, българска салата, Bacho Iliya',
      recipeCategory: 'Салата',
      recipeCuisine: 'Българска',
      prepTime: 'PT15M',
      totalTime: 'PT15M',
      recipeYield: '4 порции',
      recipeIngredient: [
        '300г бяло сирене Бачо Илия',
        '4 домата',
        '2 краставици',
        '1 зелена чушка',
        '1 червена лукова',
        'Магданоз',
        'Олио и оцет',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: 'Освежаващ таратор с кисело мляко Бачо Илия',
      image: 'https://bacho-iliya.eu/tarator.webp',
      description: 'Традиционна българска студена супа таратор с истинско кисело мляко',
      keywords: 'таратор, кисело мляко, студена супа, Bacho Ilya',
      recipeCategory: 'Студена супа',
      recipeCuisine: 'Българска',
      prepTime: 'PT10M',
      totalTime: 'PT10M',
      recipeYield: '4 порции',
      recipeIngredient: [
        '800мл кисело мляко Бачо Илия',
        '2 краставици',
        '3 скилидки чесън',
        'Копър',
        'Орехи',
        'Олио и сол',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: 'Качамак с кашкавал Бачо Илия',
      image: 'https://bacho-iliya.eu/kachamak.webp',
      description: 'Традиционно българско ястие качамак с автентичен кашкавал',
      keywords: 'качамак, кашкавал, българска рецепта, Бачо Илия',
      recipeCategory: 'Основно ястие',
      recipeCuisine: 'Българска',
      prepTime: 'PT10M',
      cookTime: 'PT15M',
      totalTime: 'PT25M',
      recipeYield: '4 порции',
      recipeIngredient: [
        '200г кашкавал Бачо Илия',
        '300г царевично брашно',
        '1л вода',
        'Сол',
        'Масло',
      ],
    },
  ];

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Начало',
        item: 'https://bacho-iliya.eu',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Раздаване',
        item: 'https://bacho-iliya.eu/giveaway',
      },
    ],
  };

  // AggregateRating Schema based on testimonials
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Organization',
      name: 'Бачо Илия',
    },
    ratingValue: '4.9',
    bestRating: '5',
    ratingCount: '127',
  };

  // FAQ Schema for AI-friendly content
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Какво е Бачо Илия?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Бачо Илия е българска марка за автентични млечни продукти, създадени по традиционни рецепти. Произвеждаме бяло сирене, кашкавал и кисело мляко от щастливи крави, без консерванти и химия.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как мога да участвам в раздаването на Бачо Илия?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Участието е безплатно и отнема само 2 минути. Избери продуктите, които искаш да спечелиш, попълни регистрационната форма и завърши социалните задачи. Печелившите ще бъдат обявени до 7 дни.',
        },
      },
      {
        '@type': 'Question',
        name: 'Къде мога да купя продукти на Бачо Илия?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Продуктите на Бачо Илия (Bacho Iliya, Bacho Ilya) можете да намерите в магазини в цяла България. За повече информация посетете нашата Facebook страница или се свържете с нас.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какви продукти предлага Бачо Илия?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Бачо Илия предлага широка гама от млечни продукти: бяло сирене (800г, 400г, 300г), кашкавал (300г, 250г) и кисело мляко (400г). Всички продукти са естествени, без консерванти, създадени по бабините рецепти.',
        },
      },
      {
        '@type': 'Question',
        name: 'Защо да избера продуктите на Бачо Илия?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Продуктите на Бачо Илия (Бачо Илья) са автентични, естествени и безопасни за цялото семейство. Без химия и консерванти, създадени по традиционни български рецепти. Идеални за деца и възрастни.',
        },
      },
    ],
  };

  const allSchemas = [
    organizationSchema,
    localBusinessSchema,
    eventSchema,
    breadcrumbSchema,
    aggregateRatingSchema,
    faqSchema,
    ...productSchemas,
    ...recipeSchemas,
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
