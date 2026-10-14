-- Migration: enable Row Level Security on project_relations
-- Supabase security advisor: "Table public.project_relations is public, but
-- RLS has not been enabled." Without RLS, anyone holding the public anon key
-- (shipped to every browser by design) could insert, update or delete rows
-- through the REST API. This brings the table in line with every other table:
-- public read, writes only for signed-in admins.
--
-- Safe to re-run.

ALTER TABLE project_relations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read relations between published projects" ON project_relations;
DROP POLICY IF EXISTS "Admin full access project relations" ON project_relations;

-- The site reads related projects with the anon key (lib/supabase/reader.ts).
-- Only expose links where both ends are published, so draft projects' ids
-- never leak through this table.
CREATE POLICY "Public read relations between published projects" ON project_relations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects p WHERE p.id = project_relations.project_id AND p.is_published = true)
    AND EXISTS (SELECT 1 FROM projects p WHERE p.id = project_relations.related_project_id AND p.is_published = true)
  );

-- Same rule as projects / project_tags / service_projects (001, 005).
-- (SELECT auth.role()) is evaluated once per query, not per row (see 012).
CREATE POLICY "Admin full access project relations" ON project_relations
  FOR ALL USING ((SELECT auth.role()) = 'authenticated');
