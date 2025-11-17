# Бачо Илия - Learn Content System
## AI-Powered Educational Content Generation

Адаптирана версия на learn-content-system за млечни продукти и българска традиционна кухня.

---

## 📋 Какво беше адаптирано?

### ✅ Променени категории:
**От астрология** → **Към млечни продукти:**
- ~~planets~~ → **recipes** (Традиционни рецепти)
- ~~signs~~ → **health** (Здравословни ползи)
- ~~houses~~ → **culture** (Българска млечна култура)
- ~~aspects~~ → **products** (Продуктова информация)
- **guides** → **tradition** (Традиции и обичаи)

### ✅ AI Промпти:
- Променени от астрологична тематика към млечни продукти
- Фокус върху българска традиционна кухня
- Споменаване на "Бачо Илия" като пример

### ✅ Pillar Suggestions Examples:
**Категория `recipes`:**
- Таратор - класическата рецепта
- Млечна баница стъпка по стъпка
- Снежанка - традиционна рецепта
- Айрян супа за лятото

**Категория `health`:**
- Пробиотици в киселото мляко
- Ползи за храносмилането
- Калций и здрави кости
- Млечни бактерии и здраве

**Категория `culture`:**
- История на киселото мляко в България
- 30 години Бачо Илия
- Традиционно българско производство
- Щастливи крави = качествено мляко

---

## 🚀 SETUP ИНСТРУКЦИИ

### Стъпка 1: Database Setup

#### A) Прилагане на SQL migration

1. Отвори Supabase Dashboard:
   - Ид: https://supabase.com/dashboard
   - Избери проект: **lrtbkvbmciqalpfvxxrh**

2. Отвори SQL Editor:
   - Кликни "SQL Editor" в лявото меню
   - Кликни "New Query"

3. Копирай съдържанието на файла:
   ```
   supabase-learn-content-migration.sql
   ```

4. Натисни "Run" бутона

5. Провери резултата:
   ```sql
   SELECT * FROM blog_posts LIMIT 1;
   ```

✅ Трябва да видиш празна таблица с всички колони.

---

### Стъпка 2: Проверка на API Keys

Файлът `.env.local` вече съдържа:

```bash
# Supabase (вече setup)
NEXT_PUBLIC_SUPABASE_URL=https://lrtbkvbmciqalpfvxxrh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# OpenRouter (вече setup)
OPENROUTER_API_KEY=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

# Nanobanana (за images)
NANOBANANA_GEMINI_API_KEY=AIzaSyC3jRDJ4312XECnwQwj1AHwwzGhrYEm6PE
```

✅ Всички API keys са на място!

---

### Стъпка 3: Test Admin Page

1. **Стартирай dev server:**
   ```bash
   npm run dev
   ```

2. **Отвори admin page:**
   ```
   http://localhost:3001/admin/learn-content
   ```

3. **Тествай AI Suggestions:**
   - Кликни на "AI Suggestions" tab
   - Натисни "Предложи Clusters"
   - Трябва да видиш 8-10 предложения за cluster теми

4. **Тествай Create Cluster:**
   - Кликни на "Create Cluster" tab
   - Заглавие: `Традиционни рецепти с кисело мляко`
   - Категория: `recipes`
   - Keywords: `кисело мляко, рецепти, таратор, баница`
   - Натисни "Генерирай Cluster"
   - Изчакай 10-15 секунди
   - ✅ Трябва да видиш success с генерирано съдържание!

---

## 📁 Структура на файловете

```
app/
├── api/admin/learn-content/
│   ├── create-cluster/route.ts    # Генериране на cluster (3,500 думи)
│   ├── create-pillar/route.ts     # Генериране на pillar (5,500 думи)
│   └── suggest-clusters/route.ts  # AI предложения за clusters
│
├── admin/learn-content/
│   └── page.tsx                   # Admin UI за тестване
│
├── blog/learn/
│   ├── page.tsx                   # Learn index - всички образователни статии
│   └── [slug]/page.tsx            # Отделна learn статия
│
└── sitemap.ts                     # Updated с learn content

supabase-learn-content-migration.sql  # Database schema
BACHO-ILIA-LEARN-CONTENT-SETUP.md    # Тази инструкция
QUICK-START.md                         # Бързо стартиране
```

---

## 🎯 Как работи системата?

### URL Структура:
- **Обикновени блог постове:** `/blog/[slug]`
- **Learn content index:** `/blog/learn`
- **Learn статии:** `/blog/learn/[slug]`

### 1. **Cluster Guide** (Hub Page)
- 3,500 думи comprehensive статия
- Обзор на широка тема
- Предлага 8-12 свързани pillar теми
- **URL пример:** `/blog/learn/traditsionni-recepti-s-kiselo-mlyako`
- **Пример:** "Традиционни рецепти с кисело мляко"

### 2. **Pillar Guide** (Spoke Page)
- 5,500 думи задълбочена статия
- Конкретна подтема от cluster
- Линкове към parent cluster
- Линкове към sibling pillars
- **URL пример:** `/blog/learn/tarator-klasicheskata-recepta`
- **Пример:** "Таратор - класическата рецепта"

### 3. **SEO Architecture:**
```
Cluster: "Традиционни рецепти с кисело мляко"
├── Pillar: "Таратор - класическата рецепта"
├── Pillar: "Млечна баница стъпка по стъпка"
├── Pillar: "Снежанка - традиционна рецепта"
├── Pillar: "Айрян супа за лятото"
└── Pillar: "Мусака с кисело мляко"
```

**SEO Benefits:**
- Internal linking (Google обича това!)
- Topic authority
- Comprehensive coverage
- Long-tail keywords

---

## 💰 Цени (OpenRouter)

**Единен AI модел за съдържание:**
- `google/gemini-2.5-flash-lite` - за всички текстови операции
- `google/gemini-2.5-flash-image` - само за hero images

| Операция | Модел | Цена | Време |
|----------|-------|------|-------|
| Cluster Generation | gemini-2.5-flash-lite | ~$0.01 | 10-15s |
| Pillar Generation | gemini-2.5-flash-lite | ~$0.015 | 15-20s |
| AI Suggestions | gemini-2.5-flash-lite | ~$0.005 | 5-8s |
| Hero Image | gemini-2.5-flash-image | ~$0.05 | 5-8s |

**Пример:**
- 1 Cluster + 8 Pillars = ~$0.13
- С images: ~$0.58
- **Total cost за 20 статии: ~$1.50** 💰

---

## 🧪 Тестови Сценарий

### Test 1: AI Suggestions
```bash
POST /api/admin/learn-content/suggest-clusters
Body: {}
```

Expected: 8-10 cluster предложения за млечни продукти

---

### Test 2: Create Cluster
```bash
POST /api/admin/learn-content/create-cluster
Body: {
  "title": "Традиционни рецепти с кисело мляко",
  "category": "recipes",
  "keywords": "кисело мляко, рецепти, таратор, баница"
}
```

Expected:
- ✅ 3,500 думи HTML content
- ✅ TLDR секция
- ✅ 8-12 suggested pillars
- ✅ SEO metadata (meta_title, meta_description)
- ✅ Slug (traditsionni-recepti-s-kiselo-mlyako)
- ✅ Featured image URL
- ✅ Excerpt за social sharing
- ✅ Saved in database

---

### Test 3: Create Pillar
```bash
POST /api/admin/learn-content/create-pillar
Body: {
  "pillarTitle": "Таратор - класическата рецепта",
  "category": "recipes",
  "parentClusterSlug": "traditsionni-recepti-s-kiselo-mlyako",
  "keywords": "таратор, рецепта, лятна супа"
}
```

Expected:
- ✅ 5,500 думи HTML content
- ✅ TLDR секция
- ✅ Internal links към parent cluster
- ✅ SEO metadata
- ✅ Responsive таблици
- ✅ FAQ секция
- ✅ Saved in database

---

## 📊 Database Schema Highlights

```sql
blog_posts {
  id UUID PRIMARY KEY
  title TEXT NOT NULL
  slug TEXT UNIQUE NOT NULL
  content TEXT NOT NULL (HTML)
  excerpt TEXT

  category TEXT (always 'learn-guide')
  guide_type TEXT ('cluster' | 'pillar')
  guide_category TEXT ('recipes'|'health'|'culture'|'products'|'tradition')

  suggested_pillars TEXT[] (only for clusters)
  parent_cluster_slug TEXT (only for pillars)

  meta_title TEXT
  meta_description TEXT
  featured_image_url TEXT

  is_published BOOLEAN DEFAULT FALSE
  view_count INTEGER DEFAULT 0

  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}
```

---

## 🔧 Troubleshooting

### Problem: "OPENROUTER_API_KEY not found"
**Solution:**
```bash
# Провери .env.local
cat .env.local | grep OPENROUTER_API_KEY
```

### Problem: "Table blog_posts does not exist"
**Solution:**
1. Run migration: `supabase-learn-content-migration.sql`
2. Провери в Supabase Dashboard → Table Editor

### Problem: "Generation takes too long"
**Solution:**
- Cluster: 10-15 seconds е нормално
- Pillar: 15-20 seconds е нормално
- Ако е повече от 30s, провери OpenRouter status

### Problem: "AI returns invalid JSON"
**Solution:**
- Системата има fallback suggestions
- Провери console logs за грешки
- Опитай отново

---

## 🎨 Next Steps (Optional)

### ✅ Display Pages (Already Created!)

**Learn Index:**
- URL: `/blog/learn`
- File: `app/blog/learn/page.tsx`
- Features: Category filter, grid layout, beautiful cards

**Individual Guide:**
- URL: `/blog/learn/[slug]`
- File: `app/blog/learn/[slug]/page.tsx`
- Features: Full article, related guides, breadcrumbs, SEO metadata

**Sitemap:**
- File: `app/sitemap.ts`
- Already updated to include all learn content dynamically

### 3. Add Internal Linking (scripts)

Копирай от `learn-content-system/scripts/`:
- `build-internal-links.js`
- `apply-internal-links.js`

---

## 📈 SEO Results (Expected)

След 20-30 статии:
- ✅ 100+ internal links
- ✅ Comprehensive topic coverage
- ✅ Long-tail keyword ranking
- ✅ Authority positioning
- ✅ Featured snippets potential

**ROI:**
- Cost: ~$3 за 20 статии
- Value: 20 професионални статии = $1,000+ human cost
- **Savings: 99.7%** 🚀

---

## 🙏 Support

Системата е базирана на **learn-content-system v2.1** от Vrachka.eu.

**Production stats от Vrachka:**
- 52 guides created
- 843 internal links
- Total cost: $2.55
- Quality score: 9.5/10

**Adapted for Bacho Iliya:**
- Млечни продукти и българска кухня
- Традиционни рецепти
- Здравословни ползи
- Културни традиции

---

## ✨ Ready to Start!

1. ✅ Run database migration
2. ✅ Check API keys
3. ✅ Open admin page
4. ✅ Generate first cluster
5. ✅ Generate pillars
6. 🚀 Publish and rank!

**Enjoy creating amazing content for Бачо Илия!** 🥛🧀
