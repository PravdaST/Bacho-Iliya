# Bacho Ilia - Project Documentation

## Overview
Next.js 16 website for Bacho Ilia (Бачо Илия) - a Bulgarian dairy products brand. The site includes a giveaway system, product catalog, recipes, and educational blog content.

## Tech Stack
- **Framework**: Next.js 16.x (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + custom vintage CSS
- **Deployment**: Vercel
- **Domain**: https://www.bacho-iliya.eu

## Project Structure
```
app/                    # Next.js App Router pages
  blog/learn/           # Educational articles (from Supabase)
  products/             # Product catalog
  recipes/              # Traditional recipes
  api/admin/            # Admin API routes for content management
components/
  seo/                  # SEO components (StructuredData, BreadcrumbSchema, RecipeSchema)
lib/
  metadata.ts           # SEO metadata generators
  products-data.ts      # Product definitions
  recipes-data.ts       # Recipe definitions
  supabase.ts           # Supabase client
```

## Database (Supabase)
- **Project ID**: lrtbkvbmciqalpfvxxrh
- **Table**: `blog_posts` - Educational articles with fields:
  - `slug`, `title`, `content`, `excerpt`, `meta_description`
  - `featured_image_url`, `category`, `is_published`

## SEO Configuration

### Canonical URL
Always use `https://www.bacho-iliya.eu` (with www) for:
- Canonical URLs
- Sitemap entries
- Structured data URLs
- Open Graph URLs

### Meta Descriptions
Limited to **155 characters** in:
- `lib/metadata.ts` - Product pages
- `app/recipes/[slug]/page.tsx` - Recipe pages
- `app/blog/learn/[slug]/page.tsx` - Blog articles
- `app/layout.tsx` - Default description

### Redirects (next.config.mjs)
```javascript
// Key redirects configured:
/learn/:slug -> /blog/learn/:slug (301)
/recipes/yaitza-po-panagurski -> /blog/learn/yaytsa-po-panagyurski-retsepta (301)
/products/maslo -> /products (301)
/en -> / (301)
```

## Common Tasks

### Fix Broken Internal Links in Articles
Run `fix-article-links.js` to update links in Supabase:
```bash
node fix-article-links.js
```

### Fix Slug Encoding Issues
Run `fix-slug-encoding.js` for special character fixes:
```bash
node fix-slug-encoding.js
```

### Generate Sitemap
Sitemap is auto-generated at build time from `app/sitemap.ts`

## SEO Checklist
- [x] Canonical URLs use www
- [x] Meta descriptions < 160 chars
- [x] Alt text on all images (including Facebook Pixel)
- [x] Structured data (Organization, Product, Recipe, BreadcrumbList)
- [x] 301 redirects for old URLs
- [x] Bulgarian language tags (bg_BG)

## Environment Variables
```
NEXT_PUBLIC_BASE_URL=https://www.bacho-iliya.eu
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_FACEBOOK_APP_ID=...
```

## Recent SEO Fixes (December 2025)
1. Fixed canonical URLs to use www domain
2. Added alt attribute to Facebook Pixel tracking image
3. Limited meta descriptions to 155 characters
4. Fixed 28+ broken internal links in blog articles
5. Added 301 redirects for legacy URLs
6. Fixed article slug encoding (smétana -> smetana)
