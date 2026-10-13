-- Phase 13.6: who each offer is for and how it is delivered.
-- Rendered on /services/[slug] and on the homepage offer cards.

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS audience TEXT,
  ADD COLUMN IF NOT EXISTS timeline TEXT,
  ADD COLUMN IF NOT EXISTS engagement_model TEXT;
