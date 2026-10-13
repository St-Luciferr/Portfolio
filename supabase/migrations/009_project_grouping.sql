-- Phase 13.5: group and feature projects on the redesigned homepage.
-- category:      'client' work vs 'research' / experiments (NULL = not yet sorted)
-- is_featured:   shown in the homepage "Selected work" section
-- client_name:   client or context line, e.g. "Trek Pal Nepal (client)"
-- outcome_line:  one-line delivered result shown on cards
-- screenshot_url: real screenshot or redacted diagram for the case study

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS category TEXT CHECK (category IN ('client', 'research')),
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS client_name TEXT,
  ADD COLUMN IF NOT EXISTS outcome_line TEXT,
  ADD COLUMN IF NOT EXISTS screenshot_url TEXT;

CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (is_featured) WHERE is_featured;
