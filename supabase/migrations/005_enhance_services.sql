-- Phase 4: Enhance services table with rich content fields
-- Adds slug, summary, process steps, benefits, tools, and deliverables

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS process JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS tools_technologies JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS deliverables JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS pricing_model TEXT DEFAULT 'custom';

-- Service-to-project junction table (many-to-many)
CREATE TABLE IF NOT EXISTS service_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  CONSTRAINT unique_service_project UNIQUE (service_id, project_id)
);

CREATE INDEX IF NOT EXISTS idx_service_projects_service ON service_projects(service_id);
CREATE INDEX IF NOT EXISTS idx_service_projects_project ON service_projects(project_id);

ALTER TABLE service_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for service_projects" ON service_projects
  FOR SELECT USING (true);

CREATE POLICY "Admin write for service_projects" ON service_projects
  FOR ALL USING (auth.role() = 'authenticated');
