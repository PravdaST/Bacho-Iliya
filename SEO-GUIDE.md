# SEO Strategy - Bacho Ilia

## Status Dashboard

### Phase 3.1 - Schema.org ✅

- Product schema for all products
- Organization schema site-wide
- Event schema for giveaway
- Breadcrumb schema

### Phase 3.2 - Open Graph ✅

- Dynamic OG tags for all pages
- Twitter Cards
- Facebook/Instagram optimization
- Product-specific OG images (placeholders created)

### Phase 3.3 - SEO Fundamentals ✅

- Dynamic sitemap.xml (`/sitemap.xml`)
- Optimized robots.txt (`/robots.txt`)
- Meta descriptions for all pages
- Keyword optimization

## Quick Reference

### Sitemap

Access: https://bacho-ilia.eu/sitemap.xml
Implementation: `app/sitemap.ts`

- Includes all static pages
- Dynamically includes all products
- Priority & frequency optimized

### Robots.txt

Access: https://bacho-ilia.eu/robots.txt
Implementation: `app/robots.ts`

- Allows all search engines
- Protects /api/, /admin/, /\_next/
- Points to sitemap

### Metadata Library

Location: `lib/metadata.ts`
Functions:

- `generateHomeMetadata()`
- `generateProductsPageMetadata()`
- `generateProductMetadata({ product })`
- `generateRecipesPageMetadata()`
- And more...

## Testing Tools

### Schema.org

- https://search.google.com/test/rich-results
- https://validator.schema.org/

### Open Graph

- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
- https://www.opengraph.xyz/

### General SEO

- https://pagespeed.web.dev/
- https://search.google.com/search-console

## Next Steps

1. Create OG images (see /public/og-images/README.md)
2. Submit sitemap to Google Search Console
3. Set up Google Analytics
4. Monitor Core Web Vitals
5. Build backlinks

## Key Metrics

| Page           | Priority | Change Freq |
| -------------- | -------- | ----------- |
| Homepage       | 1.0      | Daily       |
| Products       | 0.9      | Weekly      |
| Product Detail | 0.8      | Weekly      |
| About          | 0.7      | Monthly     |
| Where to Buy   | 0.8      | Monthly     |
| Recipes        | 0.7      | Weekly      |

## Files Modified/Created

- app/sitemap.ts (new)
- app/robots.ts (new)
- lib/metadata.ts (new)
- app/products/layout.tsx (new)
- app/products/[slug]/page.tsx (updated with generateMetadata)
- public/og-images/README.md (new)
- SEO-GUIDE.md (this file)
