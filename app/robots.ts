/**
 * Robots.txt Configuration for Bacho Ilia
 *
 * Optimized for SEO crawling while protecting sensitive areas.
 * Allows all major search engines to crawl the site.
 * Configured for optimal crawl budget management.
 *
 * Access at: https://bacho-iliya.eu/robots.txt
 */

import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-iliya.eu';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Protect API routes
          '/admin/',         // Protect admin routes
          '/_next/',         // Next.js internals (already optimized by Next.js)
          '/private/',       // Private content
          '/*.json$',        // JSON files (prevent unnecessary crawling)
          '/tasks',          // Internal tasks page
        ],
      },
      // Googlebot - Maximum access for SEO
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/products/',
          '/recipes/',
          '/about',
          '/where-to-buy',
          '/blog/',
          '/register',
        ],
        disallow: ['/api/', '/admin/', '/private/', '/tasks'],
      },
      // Googlebot Image - Full access to images for Image Search
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/*.jpg',
          '/*.jpeg',
          '/*.png',
          '/*.webp',
          '/*.svg',
        ],
        disallow: ['/api/', '/admin/'],
      },
      // Bingbot - Microsoft Search
      {
        userAgent: 'bingbot',
        allow: [
          '/',
          '/products/',
          '/recipes/',
          '/about',
          '/where-to-buy',
        ],
        disallow: ['/api/', '/admin/', '/private/', '/tasks'],
      },
      // Baidu - Chinese market
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/tasks'],
      },
      // Yandex - Russian/Eastern European market
      {
        userAgent: 'YandexBot',
        allow: [
          '/',
          '/products/',
          '/recipes/',
          '/about',
          '/where-to-buy',
        ],
        disallow: ['/api/', '/admin/', '/private/', '/tasks'],
      },
      // Block bad bots that waste crawl budget
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'PetalBot',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
