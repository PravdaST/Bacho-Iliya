/**
 * Dynamic Sitemap Generator for Bacho Ilia
 *
 * Automatically generates sitemap.xml with all pages, products, and recipes.
 * Includes priority and changefreq for optimal SEO.
 *
 * Access at: https://bacho-iliya.eu/sitemap.xml
 */

import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products-data';
import { getAllRecipeSlugs } from '@/lib/recipes-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-iliya.eu';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all products and recipes dynamically
  const products = getAllProducts();
  const recipeSlugs = getAllRecipeSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/where-to-buy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/success`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic recipe pages
  const recipePages: MetadataRoute.Sitemap = recipeSlugs.map((slug) => ({
    url: `${BASE_URL}/recipes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...recipePages];
}
