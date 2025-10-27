/**
 * Metadata & Open Graph Utilities
 *
 * Generates SEO-optimized metadata for all pages including:
 * - Open Graph tags for Facebook/Instagram
 * - Twitter Card metadata
 * - Standard meta tags
 *
 * Best practices:
 * - OG images should be 1200x630px
 * - Titles: 60-70 characters max
 * - Descriptions: 150-160 characters max
 */

import type { Metadata } from 'next';
import type { Product } from './products-data';

// ============================================
// BASE CONFIGURATION
// ============================================

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-iliya.eu';
export const SITE_NAME = 'Bacho Ilia / Бачо Илия';
export const SITE_DESCRIPTION = 'Автентични български млечни продукти с богата история и традиция. Сирена, кисели млека и млечни продукти от висококачествено мляко.';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-images/default.jpg`;
export const TWITTER_HANDLE = '@bachoilia';
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

// ============================================
// TYPE DEFINITIONS
// ============================================

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}

interface ProductMetadataProps {
  product: Product;
  baseUrl?: string;
}

interface GiveawayMetadataProps {
  title: string;
  description: string;
  endDate: string;
  baseUrl?: string;
}

// ============================================
// CORE METADATA GENERATOR
// ============================================

export function generateMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords = [],
  noIndex = false,
}: PageMetadataProps): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Robots
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    // Open Graph
    openGraph: {
      type: ogType,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'bg_BG',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // Facebook
    ...(FACEBOOK_APP_ID && {
      other: {
        'fb:app_id': FACEBOOK_APP_ID,
      },
    }),
  };
}

// ============================================
// HOME PAGE METADATA
// ============================================

export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: SITE_NAME,
    description: 'Спечели безплатни продукти Бачо Илия! Истински български млечни продукти - сирена, кисели млека, айран. Присъедини се към раздаването сега!',
    path: '/',
    ogImage: `${BASE_URL}/og-images/home.jpg`,
    keywords: [
      'бачо илия',
      'баш илия млечни продукти',
      'българско сирене',
      'кисело мляко',
      'айран',
      'раздаване продукти',
      'спечели безплатни продукти',
      'автентични млечни продукти българия',
    ],
  });
}

// ============================================
// PRODUCTS PAGE METADATA
// ============================================

export function generateProductsPageMetadata(): Metadata {
  return generateMetadata({
    title: 'Нашите Продукти - Истински Млечни Продукти',
    description: 'Разгледай пълната гама продукти Бачо Илия - бяло сирене, кашкавал, кисело мляко, айран и още. Традиционни български млечни продукти от висококачествено мляко.',
    path: '/products',
    ogImage: `${BASE_URL}/og-images/products.jpg`,
    ogType: 'website',
    keywords: [
      'бачо илия продукти',
      'българско бяло сирене',
      'кашкавал',
      'кисело мляко 2%',
      'кисело мляко 3.6%',
      'айран българска рецепта',
      'млечни продукти софия',
    ],
  });
}

// ============================================
// PRODUCT DETAIL METADATA
// ============================================

export function generateProductMetadata({
  product,
  baseUrl = BASE_URL,
}: ProductMetadataProps): Metadata {
  const productUrl = `/products/${product.slug}`;
  const productImage = product.image.startsWith('http')
    ? product.image
    : `${baseUrl}${product.image}`;

  // Generate product-specific OG image URL
  const ogImageUrl = `${baseUrl}/og-images/product-${product.slug}.jpg`;

  const categoryName = {
    cheese: 'Сирена',
    yogurt: 'Кисели млека',
    drinks: 'Напитки',
    other: 'Млечни продукти',
  }[product.category] || 'Млечни продукти';

  // Extract price range (filter out sizes without prices)
  const pricesWithValues = product.sizes
    .filter((s) => s.price) // Only sizes with prices
    .map((s) => parseFloat(s.price!.replace(/[^\d.,]/g, '')));

  const priceRange = pricesWithValues.length > 0
    ? (() => {
        const minPrice = Math.min(...pricesWithValues).toFixed(2);
        const maxPrice = Math.max(...pricesWithValues).toFixed(2);
        return minPrice === maxPrice ? `${minPrice} лв` : `${minPrice}-${maxPrice} лв`;
      })()
    : 'Цена при запитване'; // Fallback if no prices

  return generateMetadata({
    title: `${product.name} - ${categoryName}`,
    description: `${product.shortDescription} Цена: ${priceRange}. ${product.fullDescription?.substring(0, 100) || ''}`,
    path: productUrl,
    ogImage: ogImageUrl,
    ogType: 'website', // Changed from 'product' to 'website' (valid Next.js type)
    keywords: [
      product.name.toLowerCase(),
      categoryName.toLowerCase(),
      'бачо илия',
      ...product.ingredients.slice(0, 3).map((i) => i.toLowerCase()),
      'български млечни продукти',
    ],
  });
}

// ============================================
// GIVEAWAY EVENT METADATA
// ============================================

export function generateGiveawayMetadata({
  title,
  description,
  endDate,
  baseUrl = BASE_URL,
}: GiveawayMetadataProps): Metadata {
  return generateMetadata({
    title: `${title} - Спечели Безплатни Продукти`,
    description: `${description} Краен срок: ${endDate}. Сподели с приятели и спечели вкусни млечни продукти Бачо Илия!`,
    path: '/#giveaway',
    ogImage: `${baseUrl}/og-images/giveaway.jpg`,
    ogType: 'article',
    keywords: [
      'раздаване бачо илия',
      'спечели продукти',
      'безплатни млечни продукти',
      'игра бачо илия',
      'giveaway българия',
    ],
  });
}

// ============================================
// RECIPES PAGE METADATA
// ============================================

export function generateRecipesPageMetadata(): Metadata {
  return generateMetadata({
    title: 'Рецепти с Продукти Бачо Илия',
    description: 'Открий традиционни български рецепти със сирена и кисели млека Бачо Илия. Баница, таратор, снежанка и още вкусни идеи.',
    path: '/recipes',
    ogImage: `${BASE_URL}/og-images/recipes.jpg`,
    keywords: [
      'рецепти със сирене',
      'баница рецепта',
      'таратор рецепта',
      'рецепти с кисело мляко',
      'български традиционни рецепти',
    ],
  });
}

// ============================================
// WHERE TO BUY PAGE METADATA
// ============================================

export function generateWhereToBuyMetadata(): Metadata {
  return generateMetadata({
    title: 'Къде Да Купиш - Магазини Бачо Илия',
    description: 'Намери най-близкия магазин с продукти Бачо Илия. Налични в супермаркети из цяла България - София, Пловдив, Варна и още.',
    path: '/where-to-buy',
    ogImage: `${BASE_URL}/og-images/stores.jpg`,
    keywords: [
      'бачо илия магазини',
      'къде да купя бачо илия',
      'продукти бачо илия софия',
      'магазини млечни продукти българия',
    ],
  });
}

// ============================================
// ABOUT PAGE METADATA
// ============================================

export function generateAboutMetadata(): Metadata {
  return generateMetadata({
    title: 'За Нас - История и Традиция',
    description: 'Историята на Бачо Илия започва през 1950г. Научи повече за нашата мисия да произвеждаме автентични български млечни продукти с любов и традиция.',
    path: '/about',
    ogImage: `${BASE_URL}/og-images/about.jpg`,
    keywords: [
      'история бачо илия',
      'за нас бачо илия',
      'български млечни традиции',
      'производител млечни продукти българия',
    ],
  });
}

// ============================================
// CONTACTS PAGE METADATA
// ============================================

export function generateContactsMetadata(): Metadata {
  return generateMetadata({
    title: 'Контакти - Свържи Се С Нас',
    description: 'Имаш въпрос за продуктите на Бачо Илия? Свържи се с нас чрез телефон, имейл или контактна форма. Производствен цех в Бяла Черква, обл. Търговище.',
    path: '/contacts',
    ogImage: `${BASE_URL}/og-images/contacts.jpg`,
    keywords: [
      'контакти бачо илия',
      'телефон бачо илия',
      'имейл бачо илия',
      'адрес производство млечни продукти',
      'милкилукс контакти',
    ],
  });
}

// ============================================
// BLOG PAGE METADATA
// ============================================

export function generateBlogMetadata(): Metadata {
  return generateMetadata({
    title: 'Блог - Истории от Българското Село',
    description: 'Традиции, рецепти и тайни от кухнята на Бачо Илия. Открий истории за българските млечни продукти, бабини рецепти и селския живот.',
    path: '/blog',
    ogImage: `${BASE_URL}/og-images/blog.jpg`,
    keywords: [
      'блог бачо илия',
      'български традиции',
      'селски живот българия',
      'истории за млечни продукти',
      'бабини рецепти',
    ],
  });
}

// ============================================
// PRIVACY POLICY METADATA
// ============================================

export function generatePrivacyMetadata(): Metadata {
  return generateMetadata({
    title: 'Политика за Поверителност',
    description: 'Политика за поверителност на Бачо Илия. Научи как защитаваме твоите лични данни и как ги използваме.',
    path: '/privacy',
    noIndex: true, // Legal pages usually not indexed
  });
}

// ============================================
// TERMS OF SERVICE METADATA
// ============================================

export function generateTermsMetadata(): Metadata {
  return generateMetadata({
    title: 'Общи Условия',
    description: 'Общи условия за ползване на уебсайта на Бачо Илия и участие в промоции и раздавания.',
    path: '/terms',
    noIndex: true,
  });
}

// ============================================
// COOKIES POLICY METADATA
// ============================================

export function generateCookiesMetadata(): Metadata {
  return generateMetadata({
    title: 'Политика за Бисквитки',
    description: 'Информация за използваните бисквитки (cookies) на уебсайта на Бачо Илия и как да ги управляваш.',
    path: '/cookies',
    noIndex: true,
  });
}

// ============================================
// DYNAMIC OG IMAGE GENERATOR (API Route Helper)
// ============================================

/**
 * Helper function to generate data for dynamic OG images
 * Can be used with @vercel/og or similar libraries
 */
export function getOgImageData(type: 'product' | 'recipe' | 'giveaway', data: any) {
  const baseStyle = {
    backgroundColor: '#F5E6D3', // old-paper color
    fontFamily: 'Inter',
  };

  switch (type) {
    case 'product':
      return {
        ...baseStyle,
        title: data.name,
        category: data.category,
        image: data.image,
        price: data.sizes[0]?.price,
      };

    case 'giveaway':
      return {
        ...baseStyle,
        title: data.title,
        description: data.description,
        endDate: data.endDate,
      };

    default:
      return baseStyle;
  }
}
