/**
 * Robots.txt Configuration for Bacho Ilia
 *
 * Optimized for SEO crawling while protecting sensitive areas.
 * Allows all major search engines to crawl the site.
 *
 * Access at: https://bacho-ilia.eu/robots.txt
 */

import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-ilia.eu';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Protect API routes
          '/admin/',         // Protect admin routes if any
          '/_next/',         // Next.js internals
          '/private/',       // Private content
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
