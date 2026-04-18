-- ============================================================================
-- Migration 007: Blog posts content hub
-- ============================================================================
-- Adds blog_posts and blog_tags tables for the developer blog (Phase 6).
-- Follows the same RLS + trigger + index conventions as earlier migrations.
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  reading_time_minutes INTEGER NOT NULL DEFAULT 0,

  -- SEO overrides (fall back to title/excerpt when null)
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  canonical_url TEXT,

  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  display_order INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published
  ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug
  ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tags_post_id
  ON blog_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug
  ON blog_tags(slug);

-- Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admin full access blog_posts" ON blog_posts;
CREATE POLICY "Admin full access blog_posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read tags for published posts" ON blog_tags;
CREATE POLICY "Public read tags for published posts" ON blog_tags
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM blog_posts p
      WHERE p.id = blog_tags.post_id AND p.is_published = true
    )
  );

DROP POLICY IF EXISTS "Admin full access blog_tags" ON blog_tags;
CREATE POLICY "Admin full access blog_tags" ON blog_tags
  FOR ALL USING (auth.role() = 'authenticated');

-- updated_at auto-refresh (reuses function from migration 001)
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
