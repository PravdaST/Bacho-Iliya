-- ============================================
-- BACHO ILIA - LEARN CONTENT SYSTEM
-- Database Migration for Blog/Learn Articles
-- ============================================
-- Run this SQL in Supabase Dashboard:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project: lrtbkvbmciqalpfvxxrh
-- 3. Click "SQL Editor" in left menu
-- 4. Click "New Query"
-- 5. Copy and paste this entire file
-- 6. Click "Run" button
-- ============================================

-- ============================================
-- BLOG POSTS / LEARN CONTENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,

  -- Category management
  category TEXT NOT NULL, -- 'learn-guide' for educational content, 'blog' for regular posts

  -- Learn content specific fields (cluster-pillar architecture)
  guide_type TEXT CHECK (guide_type IN ('cluster', 'pillar')),
  guide_category TEXT, -- 'recipes', 'health', 'culture', 'products', 'tradition'
  suggested_pillars TEXT[], -- Array of suggested pillar titles (for clusters)
  parent_cluster_slug TEXT, -- Reference to parent cluster (for pillars)

  -- SEO metadata
  meta_title TEXT,
  meta_description TEXT,
  featured_image_url TEXT,

  -- Author and timestamps
  author_name TEXT DEFAULT 'Бачо Илия Екип',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Publishing control
  is_published BOOLEAN DEFAULT FALSE,

  -- View counter for analytics
  view_count INTEGER DEFAULT 0
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_guide_type ON blog_posts(guide_type);
CREATE INDEX IF NOT EXISTS idx_blog_posts_guide_category ON blog_posts(guide_category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Policy 1: Public can view published articles
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = TRUE);

-- Policy 2: Service role can manage all posts (for admin operations)
CREATE POLICY "Service role can manage all blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- TRIGGER: Auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE
    ON blog_posts FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Increment view count
-- ============================================
CREATE OR REPLACE FUNCTION increment_blog_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE slug = post_slug AND is_published = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'Blog posts table created successfully! ✅' AS message;

-- Show table info
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- ============================================
-- EXAMPLE GUIDE CATEGORIES FOR BACHO ILIA
-- ============================================
-- 'recipes' - Традиционни рецепти (таратор, баница, айрян супа)
-- 'health' - Здравословни ползи (пробиотици, храносмилане)
-- 'culture' - Българска млечна култура (история, традиции)
-- 'products' - Продуктова информация (как се прави кисело мляко)
-- 'tradition' - Традиции и обичаи (български обичаи с кисело мляко)
-- ============================================
