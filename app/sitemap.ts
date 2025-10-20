/**
 * Dynamic Sitemap Generator for Bacho Ilia
 *
 * Automatically generates sitemap.xml with all pages and products.
 * Includes priority and changefreq for optimal SEO.
 *
 * Access at: https://bacho-ilia.eu/sitemap.xml
 */

import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-ilia.eu';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all products dynamically
  const products = getAllProducts();

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
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic recipe pages (if they exist)
  // TODO: Add recipe pages when recipes data is available
  const recipePages: MetadataRoute.Sitemap = [
    // Example:
    // {
    //   url: `${BASE_URL}/recipes/banitsa`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ];

  return [...staticPages, ...productPages, ...recipePages];
}
