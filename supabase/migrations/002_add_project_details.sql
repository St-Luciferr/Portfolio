-- ============================================
-- ADD PROJECT DETAILS TO PROJECTS TABLE
-- ============================================
-- This migration adds detailed project information fields
-- that were previously managed in static TypeScript files

-- Add new columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS eyebrow TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS problem JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS architecture JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stack JSONB DEFAULT '[]'::jsonb;

-- Add comment to explain the structure
COMMENT ON COLUMN projects.problem IS 'Array of problem statements (JSON array of strings)';
COMMENT ON COLUMN projects.solution IS 'Array of solution points (JSON array of strings)';
COMMENT ON COLUMN projects.features IS 'Array of key features (JSON array of strings)';
COMMENT ON COLUMN projects.architecture IS 'Array of architecture details (JSON array of strings)';
COMMENT ON COLUMN projects.results IS 'Array of results/outcomes (JSON array of strings)';
COMMENT ON COLUMN projects.stack IS 'Array of technology stack items (JSON array of strings)';
