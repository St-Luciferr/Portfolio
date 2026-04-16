-- Migration: Standardize hero settings fields
-- 1. Rename 'subtitle' to 'tagline' for better semantics
-- 2. Add 'role' field for hero section
-- 3. Add 'cta_text' and 'cta_url' for primary call-to-action
--
-- This migration transforms the hero settings JSON structure

-- Update hero settings to use new field structure
UPDATE site_settings
SET value =
  -- Add role field
  jsonb_set(
    -- Add cta_url field
    jsonb_set(
      -- Add cta_text field
      jsonb_set(
        -- Rename subtitle to tagline
        jsonb_set(
          value - 'subtitle',
          '{tagline}',
          COALESCE(value->'subtitle', value->'tagline', '"a machine learning engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation."'::jsonb)
        ),
        '{role}',
        COALESCE(value->'role', '"Machine Learning Engineer"'::jsonb)
      ),
      '{cta_text}',
      COALESCE(value->'cta_text', '"Let''s Work Together"'::jsonb)
    ),
    '{cta_url}',
    COALESCE(value->'cta_url', '"#contact"'::jsonb)
  )
WHERE key = 'hero';
