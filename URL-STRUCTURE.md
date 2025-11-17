# 🗺️ Бачо Илия - URL Structure

## Complete Site Map

### 📝 Blog Content

#### Regular Blog Posts
```
/blog                           # Blog index (existing)
/blog/taynite-na-lyutenicata   # Existing blog post
/blog/taynite-na-banitsata     # Existing blog post
/blog/taynite-na-perfektniya-tarator
/blog/taynite-na-obrednata-pitka
```
**Source:** Hardcoded local data in `app/blog/[slug]/page.tsx`

---

#### Learn Content (Educational Articles) - NEW!
```
/blog/learn                                              # Learn index with category filter
/blog/learn/traditsionni-recepti-s-kiselo-mlyako       # Cluster example (3,500 words)
/blog/learn/tarator-klasicheskata-recepta              # Pillar example (5,500 words)
/blog/learn?category=recipes                            # Filter by category
/blog/learn?category=health
/blog/learn?category=culture
/blog/learn?category=products
/blog/learn?category=tradition
```
**Source:** Supabase `blog_posts` table (`category = 'learn-guide'`)

---

### 📦 Products
```
/products                       # Products index
/products/kiselo-mlyako-400g   # Individual product
/products/ayran-500ml
...
```

### 🥗 Recipes
```
/recipes                        # Recipes index
/recipes/tarator               # Individual recipe
/recipes/banitsa
...
```

### 🏠 Other Pages
```
/                              # Homepage
/about                         # About Bacho Iliya
/where-to-buy                  # Store locator
/register                      # Giveaway registration
/success                       # Success page
/terms                         # Terms & conditions
/privacy                       # Privacy policy
/cookies                       # Cookie policy
```

---

## 🎯 Learn Content Categories

| Category | URL Filter | Example Topics |
|----------|-----------|----------------|
| **recipes** | `/blog/learn?category=recipes` | Таратор, Баница, Снежанка, Айрян супа |
| **health** | `/blog/learn?category=health` | Пробиотици, Храносмилане, Имунитет |
| **culture** | `/blog/learn?category=culture` | История, Традиции, Българска култура |
| **products** | `/blog/learn?category=products` | Как се прави, Качество, Производство |
| **tradition** | `/blog/learn?category=tradition` | Празници, Обичаи, Бабини рецепти |

---

## 🗂️ Content Organization

### Blog vs Learn Content

**Regular Blog (`/blog/[slug]`):**
- ✅ Existing blog posts
- ✅ Hardcoded local data
- ✅ Traditional blog format
- ❌ No categories
- ❌ No clustering

**Learn Content (`/blog/learn/[slug]`):**
- ✅ Educational articles
- ✅ Supabase database
- ✅ Cluster-Pillar architecture
- ✅ Category filtering
- ✅ Internal linking
- ✅ SEO optimized

---

## 📊 Sitemap

All URLs are automatically included in `sitemap.xml`:

```xml
<!-- Static Pages -->
<url><loc>https://bacho-iliya.eu/</loc></url>
<url><loc>https://bacho-iliya.eu/blog</loc></url>

<!-- Regular Blog Posts -->
<url><loc>https://bacho-iliya.eu/blog/taynite-na-lyutenicata</loc></url>

<!-- Learn Content (Dynamic from Supabase) -->
<url><loc>https://bacho-iliya.eu/blog/learn</loc></url>
<url><loc>https://bacho-iliya.eu/blog/learn/traditsionni-recepti-s-kiselo-mlyako</loc></url>
<url><loc>https://bacho-iliya.eu/blog/learn/tarator-klasicheskata-recepta</loc></url>
```

**Sitemap Updates:**
- ✅ Learn index page
- ✅ All published learn guides (dynamic)
- ✅ Featured images included
- ✅ Updated timestamps

---

## 🔗 Navigation Suggestions

### Main Nav
```
Home | Products | Recipes | Blog | Where to Buy
```

### Blog Dropdown (Suggested)
```
Blog
├── Всички статии (/blog)
└── Образователни статии (/blog/learn)
```

### Footer
```
Blog
├── Blog (/blog)
├── Образователни статии (/blog/learn)
    ├── Рецепти (/blog/learn?category=recipes)
    ├── Здраве (/blog/learn?category=health)
    ├── Култура (/blog/learn?category=culture)
    ├── Продукти (/blog/learn?category=products)
    └── Традиции (/blog/learn?category=tradition)
```

---

## 🚀 Example User Journeys

### Journey 1: Recipe Seeker
```
Homepage → /blog/learn?category=recipes →
"Традиционни рецепти с кисело мляко" (cluster) →
"Таратор - класическата рецепта" (pillar)
```

### Journey 2: Health Conscious
```
Homepage → /blog/learn?category=health →
"Здравословни ползи от киселото мляко" (cluster) →
"Пробиотици в киселото мляко" (pillar)
```

### Journey 3: Culture Explorer
```
Homepage → /blog/learn?category=culture →
"Българската млечна традиция" (cluster) →
"30 години Бачо Илия" (pillar)
```

---

## 📱 Mobile-Friendly URLs

All URLs are:
- ✅ Short and readable
- ✅ Latin alphabet (SEO friendly)
- ✅ No special characters
- ✅ Hyphens for spaces
- ✅ Lowercase only

---

## 🔍 SEO Benefits

### Internal Linking
```
Cluster (/blog/learn/recepti-s-kiselo-mlyako)
  ↓ links to ↓
Pillars:
  - /blog/learn/tarator
  - /blog/learn/banitsa
  - /blog/learn/snezhanka

Each Pillar ↑ links back to ↑ Cluster
Each Pillar ↔ links to ↔ Sibling Pillars
```

**Result:**
- 100+ internal links
- Topic authority
- Better Google ranking
- Longer user sessions

---

## 📋 Summary

**Total URL Structure:**

| Type | Count | Location |
|------|-------|----------|
| Static Pages | 11 | Hardcoded |
| Products | 5 | Local data |
| Recipes | 8 | Local data |
| Blog Posts | 4 | Local data |
| **Learn Content** | **Dynamic** | **Supabase** |

**Learn Content Examples:**
- 1 Cluster → 8-12 Pillars
- 5 Clusters → 40-60 Pillars
- All under `/blog/learn/*`

---

**Last Updated:** November 17, 2025
**Version:** 1.0
