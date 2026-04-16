-- Manual Migration Script: Update Hero Settings
-- Run this in your Supabase SQL Editor to update existing hero settings
-- This transforms the old 'subtitle' field to the new standardized structure

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
          COALESCE(
            value->'subtitle',
            value->'tagline',
            '"a machine learning engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation."'::jsonb
          )
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

-- Verify the update
SELECT key, value FROM site_settings WHERE key = 'hero';
