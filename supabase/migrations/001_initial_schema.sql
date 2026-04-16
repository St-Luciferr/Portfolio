-- ============================================
-- PORTFOLIO CMS DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SITE_SETTINGS (Global configuration)
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial settings
INSERT INTO site_settings (key, value) VALUES
('hero', '{
  "heading": "Hi, I''m",
  "name": "Santosh",
  "role": "Machine Learning Engineer",
  "tagline": "a machine learning engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation. Let''s connect and shape the future of AI together!",
  "cta_text": "Let''s Work Together",
  "cta_url": "#contact",
  "resume_url": "/cv.pdf"
}'::jsonb),
('bio', '{
  "paragraphs": [
    "I am a passionate machine learning enthusiast and backend-focused engineer with a strong foundation in Python, Natural Language Processing (NLP), and Large Language Models (LLMs). I specialize in designing scalable backend systems and crafting intelligent solutions powered by Generative AI and automation.",
    "I''ve worked on impactful projects such as medical chatbots using Retrieval-Augmented Generation (RAG) for accurate health query responses, WhatsApp automation bots for streamlined customer interactions, and production-grade LLM deployments optimized for low-latency, high-throughput environments. My expertise extends to model quantization, ONNX optimization, and deploying AI solutions on cloud platforms.",
    "Constantly exploring innovations in model optimization, fine-tuning (LoRA, QLoRA), and real-time inference pipelines, I thrive on solving complex problems with elegant, scalable code. Let''s connect and build the future of AI together!"
  ]
}'::jsonb),
('seo', '{
  "title": "Santosh Pandey | ML Engineer & Full Stack Developer",
  "description": "Machine Learning Engineer passionate about Generative AI, NLP, and intelligent automation. Specializing in LLMs, RAG systems, and scalable backend development.",
  "keywords": ["Machine Learning Engineer", "Generative AI", "NLP Developer", "Python Developer", "LLM Expert", "RAG Systems", "Backend Developer", "AI Engineer"],
  "og_image": "/og-image.png"
}'::jsonb),
('contact', '{
  "email": "suntoss.pandey@gmail.com"
}'::jsonb),
('social_links', '{
  "github": "https://github.com/suntoss",
  "linkedin": "https://linkedin.com/in/santosh-pandey"
}'::jsonb);

-- ============================================
-- 2. PROJECTS
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  source_code_link TEXT NOT NULL,
  demo_url TEXT,
  is_demo BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE project_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_projects_published ON projects(is_published, display_order);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_project_tags_project_id ON project_tags(project_id);

-- ============================================
-- 3. EXPERIENCES
-- ============================================
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  icon_bg_color TEXT NOT NULL,
  date TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE experience_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  point TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_experiences_published ON experiences(is_published, display_order);
CREATE INDEX idx_experience_points_exp_id ON experience_points(experience_id);

-- ============================================
-- 4. TECHNOLOGIES
-- ============================================
CREATE TABLE technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  icon_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_technologies_published ON technologies(is_published, display_order);

-- ============================================
-- 5. SERVICES
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_published ON services(is_published, display_order);

-- ============================================
-- 6. TESTIMONIALS (Optional)
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  testimonial TEXT NOT NULL,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_published ON testimonials(is_published, display_order);

-- ============================================
-- 7. NAVIGATION_LINKS
-- ============================================
CREATE TABLE nav_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read published projects" ON projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read project tags" ON project_tags
  FOR SELECT USING (true);

CREATE POLICY "Public read published experiences" ON experiences
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read experience points" ON experience_points
  FOR SELECT USING (true);

CREATE POLICY "Public read published technologies" ON technologies
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read published services" ON services
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read published testimonials" ON testimonials
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public read nav links" ON nav_links
  FOR SELECT USING (is_published = true);

-- Admin full access (authenticated users)
-- Note: You'll need to adjust these after setting up auth
CREATE POLICY "Admin full access projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access project tags" ON project_tags
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access experiences" ON experiences
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access experience points" ON experience_points
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access technologies" ON technologies
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access nav links" ON nav_links
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 9. FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technologies_updated_at BEFORE UPDATE ON technologies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
