/**
 * Schema.org Structured Data Library
 *
 * Generates JSON-LD structured data for SEO optimization.
 * Rich snippets increase CTR by 30-50% in Google search results.
 *
 * Schemas implemented:
 * - Product: For product pages
 * - Recipe: For recipe pages
 * - Organization: For brand/company info
 * - LocalBusiness: For physical store locations
 * - Event: For giveaway campaigns
 * - BreadcrumbList: For navigation breadcrumbs
 */

import type { Product } from './products-data';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    url: string;
    priceCurrency: string;
    price: string;
    availability: string;
    itemCondition: string;
  }[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
  };
  nutrition?: {
    '@type': 'NutritionInformation';
    calories: string;
    fatContent: string;
    saturatedFatContent: string;
    carbohydrateContent: string;
    sugarContent: string;
    proteinContent: string;
    sodiumContent: string;
  };
}

interface RecipeSchema {
  '@context': 'https://schema.org';
  '@type': 'Recipe';
  name: string;
  description: string;
  image: string[];
  author: {
    '@type': 'Organization';
    name: string;
  };
  prepTime: string;
  cookTime: string;
  totalTime: string;
  recipeYield: string;
  recipeCategory: string;
  recipeCuisine: string;
  recipeIngredient: string[];
  recipeInstructions: Array<{
    '@type': 'HowToStep';
    text: string;
  }>;
  nutrition?: {
    '@type': 'NutritionInformation';
    calories: string;
  };
}

interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': 'PostalAddress';
    addressCountry: string;
    addressLocality?: string;
  };
  sameAs: string[];
  foundingDate?: string;
  founder?: {
    '@type': 'Person';
    name: string;
  };
}

interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'Store';
  name: string;
  description?: string;
  image?: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
}

interface EventSchema {
  '@context': 'https://schema.org';
  '@type': 'Event';
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    '@type': 'VirtualLocation';
    url: string;
  };
  organizer: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

// ============================================
// PRODUCT SCHEMA GENERATOR
// ============================================

export function generateProductSchema(
  product: Product,
  baseUrl: string = 'https://bacho-ilia.eu'
): ProductSchema {
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.fullDescription || product.shortDescription,
    image: [imageUrl],
    brand: {
      '@type': 'Brand',
      name: 'Bacho Ilia / Бачо Илия',
    },
    offers: product.sizes.map((size) => ({
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'BGN',
      price: size.price?.replace(/[^\d.,]/g, '') || '0', // Extract number from "12.99 лв"
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    })),
    ...(product.testimonials &&
      product.testimonials.length > 0 && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: product.testimonials.length.toString(),
        },
      }),
    ...(product.nutritionPer100g && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: `${product.nutritionPer100g?.energy || 0} kcal`,
        fatContent: `${product.nutritionPer100g?.fat || 0}g`,
        saturatedFatContent: `${product.nutritionPer100g?.saturatedFat || 0}g`,
        carbohydrateContent: `${product.nutritionPer100g?.carbohydrates || 0}g`,
        sugarContent: `${product.nutritionPer100g?.sugars || 0}g`,
        proteinContent: `${product.nutritionPer100g?.protein || 0}g`,
        sodiumContent: `${product.nutritionPer100g?.salt || 0}g`,
      },
    }),
  };
}

// ============================================
// RECIPE SCHEMA GENERATOR
// ============================================

export function generateRecipeSchema(
  recipe: {
    name: string;
    description: string;
    image: string;
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    servings: number;
    category: string;
    cuisine: string;
    ingredients: string[];
    instructions: string[];
    calories?: number;
  },
  baseUrl: string = 'https://bacho-ilia.eu'
): RecipeSchema {
  const imageUrl = recipe.image.startsWith('http') ? recipe.image : `${baseUrl}${recipe.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: [imageUrl],
    author: {
      '@type': 'Organization',
      name: 'Bacho Ilia / Бачо Илия',
    },
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.servings} порции`,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, index) => ({
      '@type': 'HowToStep',
      text: step,
    })),
    ...(recipe.calories && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: `${recipe.calories} kcal`,
      },
    }),
  };
}

// ============================================
// ORGANIZATION SCHEMA GENERATOR
// ============================================

export function generateOrganizationSchema(
  baseUrl: string = 'https://bacho-ilia.eu'
): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bacho Ilia / Бачо Илия',
    description:
      'Автентични български млечни продукти с богата история и традиция. Сирена, кисели млека и млечни продукти от висококачествено мляко.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BG',
      addressLocality: 'България',
    },
    sameAs: ['https://www.facebook.com/bachoilia', 'https://www.instagram.com/bachoilia'],
    foundingDate: '1950',
    founder: {
      '@type': 'Person',
      name: 'Бачо Илия',
    },
  };
}

// ============================================
// LOCAL BUSINESS SCHEMA GENERATOR
// ============================================

export function generateLocalBusinessSchema(
  store: {
    name: string;
    address: string;
    city: string;
    region?: string;
    postalCode?: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
    hours?: {
      days: string[];
      opens: string;
      closes: string;
    }[];
  },
  baseUrl: string = 'https://bacho-ilia.eu'
): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: store.name,
    description: 'Магазин за млечни продукти Бачо Илия',
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: store.city,
      addressRegion: store.region,
      postalCode: store.postalCode,
      addressCountry: 'BG',
    },
    ...(store.latitude &&
      store.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: store.latitude,
          longitude: store.longitude,
        },
      }),
    ...(store.phone && { telephone: store.phone }),
    ...(store.hours && {
      openingHoursSpecification: store.hours.map((schedule) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: schedule.days,
        opens: schedule.opens,
        closes: schedule.closes,
      })),
    }),
  };
}

// ============================================
// EVENT SCHEMA GENERATOR (FOR GIVEAWAYS)
// ============================================

export function generateGiveawayEventSchema(
  giveaway: {
    name: string;
    description: string;
    image: string;
    startDate: string; // ISO 8601 format
    endDate: string; // ISO 8601 format
  },
  baseUrl: string = 'https://bacho-ilia.eu'
): EventSchema {
  const imageUrl = giveaway.image.startsWith('http')
    ? giveaway.image
    : `${baseUrl}${giveaway.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: giveaway.name,
    description: giveaway.description,
    image: imageUrl,
    startDate: giveaway.startDate,
    endDate: giveaway.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: `${baseUrl}/#giveaway`,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Bacho Ilia / Бачо Илия',
      url: baseUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BGN',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/#giveaway`,
    },
  };
}

// ============================================
// BREADCRUMB SCHEMA GENERATOR
// ============================================

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url?: string }>,
  baseUrl: string = 'https://bacho-ilia.eu'
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.url && { item: `${baseUrl}${crumb.url}` }),
    })),
  };
}

// ============================================
// RENDER FUNCTION (for Next.js pages)
// ============================================

export function renderSchema(schema: Record<string, any>): string {
  return JSON.stringify(schema, null, 2);
}

// ============================================
// SCHEMA RENDERING UTILITY
// ============================================
// Note: For actual React components, see components/SEO/
// This library provides pure functions for generating schema objects
