/**
 * Dynamic Sitemap Generator for Bacho Ilia
 *
 * Google 2025 compliant sitemap with image extensions.
 * - Removed priority/changeFreq (Google ignores them since 2025)
 * - Added image extensions for better image SEO
 * - Using accurate lastModified dates
 *
 * Access at: https://bacho-iliya.eu/sitemap.xml
 */

import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products-data';
import { getAllRecipeSlugs } from '@/lib/recipes-data';
import { supabaseAdmin } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-iliya.eu';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all products and recipes dynamically
  const products = getAllProducts();
  const recipeSlugs = getAllRecipeSlugs();

  // Static pages with images
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2025-01-27'),
      // Home page has logo + product images
      images: [`${BASE_URL}/logo.png`, `${BASE_URL}/Bachi ilia head logo_.webp`],
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date('2025-01-20'),
      images: products.map((p) => `${BASE_URL}${p.image}`),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2025-01-27'),
      images: [`${BASE_URL}/logo.png`, `${BASE_URL}/Bachi ilia head logo_.webp`],
    },
    {
      url: `${BASE_URL}/where-to-buy`,
      lastModified: new Date('2025-01-20'),
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date('2025-01-20'),
      images: [
        `${BASE_URL}/recipes/banitsa.webp`,
        `${BASE_URL}/tarator.webp`,
        `${BASE_URL}/recipes/shopska.webp`,
      ],
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2025-01-15'),
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date('2025-01-27'),
    },
    {
      url: `${BASE_URL}/success`,
      lastModified: new Date('2025-01-15'),
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2025-01-10'),
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2025-01-10'),
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date('2025-01-10'),
    },
  ];

  // Dynamic product pages with product images
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date('2025-01-20'),
    images: [`${BASE_URL}${product.image}`],
  }));

  // Dynamic recipe pages with recipe images
  const recipePages: MetadataRoute.Sitemap = recipeSlugs.map((slug) => ({
    url: `${BASE_URL}/recipes/${slug}`,
    lastModified: new Date('2025-01-20'),
    // Add recipe image if available
    images: [`${BASE_URL}/recipes/${slug}.webp`],
  }));

  // Blog post pages (critical for SEO - were missing!)
  const blogSlugs = [
    'taynite-na-lyutenicata',
    'taynite-na-banitsata',
    'taynite-na-perfektniya-tarator',
    'taynite-na-obrednata-pitka',
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date('2025-10-30'), // Updated today
    images: [`${BASE_URL}/blog/${slug}-hero.png`],
  }));

  // Learn content pages (educational articles) - DYNAMIC from Supabase
  const { data: learnGuidesData } = await supabaseAdmin
    .from('blog_posts')
    .select('slug, updated_at, featured_image_url')
    .eq('category', 'learn-guide')
    .eq('is_published', true);

  const learnGuides = learnGuidesData || [];

  const learnPages: MetadataRoute.Sitemap = [
    // Learn index page
    {
      url: `${BASE_URL}/blog/learn`,
      lastModified: new Date(),
    },
    // Individual learn guides
    ...learnGuides.map((guide) => ({
      url: `${BASE_URL}/blog/learn/${guide.slug}`,
      lastModified: new Date(guide.updated_at),
      images: guide.featured_image_url ? [guide.featured_image_url] : [],
    })),
  ];

  return [...staticPages, ...productPages, ...recipePages, ...blogPages, ...learnPages];
}
