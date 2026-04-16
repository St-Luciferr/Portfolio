-- Migration: Add related projects functionality
-- Allows projects to reference other related projects for better content discovery

-- Create junction table for many-to-many project relationships
CREATE TABLE IF NOT EXISTS project_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  related_project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  relation_type TEXT DEFAULT 'related' CHECK (relation_type IN ('related', 'similar', 'prerequisite', 'followup')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure a project can't be related to itself
  CONSTRAINT no_self_relation CHECK (project_id != related_project_id),

  -- Prevent duplicate relationships
  CONSTRAINT unique_project_relation UNIQUE (project_id, related_project_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_project_relations_project_id ON project_relations(project_id);
CREATE INDEX IF NOT EXISTS idx_project_relations_related_id ON project_relations(related_project_id);

-- Insert some logical project relationships based on technology and domain
-- RAG projects are related
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  p1.id as project_id,
  p2.id as related_project_id,
  'similar' as relation_type,
  0 as display_order
FROM projects p1
CROSS JOIN projects p2
WHERE p1.slug = 'medical-qa-chatbot'
  AND p2.slug = 'context-aware-rag'
ON CONFLICT (project_id, related_project_id) DO NOTHING;

-- Reverse relation
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  p1.id as project_id,
  p2.id as related_project_id,
  'similar' as relation_type,
  0 as display_order
FROM projects p1
CROSS JOIN projects p2
WHERE p1.slug = 'context-aware-rag'
  AND p2.slug = 'medical-qa-chatbot'
ON CONFLICT (project_id, related_project_id) DO NOTHING;

-- AI chatbot projects
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  p1.id as project_id,
  p2.id as related_project_id,
  'related' as relation_type,
  1 as display_order
FROM projects p1
CROSS JOIN projects p2
WHERE p1.slug = 'whatsapp-chatbot'
  AND p2.slug = 'medical-qa-chatbot'
ON CONFLICT (project_id, related_project_id) DO NOTHING;

-- Mobile apps with Firebase
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  p1.id as project_id,
  p2.id as related_project_id,
  'similar' as relation_type,
  0 as display_order
FROM projects p1
CROSS JOIN projects p2
WHERE p1.slug = 'pestpad'
  AND p2.slug = 'amid'
ON CONFLICT (project_id, related_project_id) DO NOTHING;

-- Computer vision projects
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  p1.id as project_id,
  p2.id as related_project_id,
  'related' as relation_type,
  1 as display_order
FROM projects p1
CROSS JOIN projects p2
WHERE p1.slug = 'amid'
  AND p2.slug = 'continual-monument-detection'
ON CONFLICT (project_id, related_project_id) DO NOTHING;

-- Full-stack projects
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  p1.id as project_id,
  p2.id as related_project_id,
  'related' as relation_type,
  2 as display_order
FROM projects p1
CROSS JOIN projects p2
WHERE p1.slug = 'trek-pal-nepal'
  AND p2.slug = 'whatsapp-chatbot'
ON CONFLICT (project_id, related_project_id) DO NOTHING;

COMMENT ON TABLE project_relations IS 'Junction table for project relationships and recommendations';
COMMENT ON COLUMN project_relations.relation_type IS 'Type of relationship: related (different tech), similar (same tech), prerequisite (should view first), followup (next project)';
