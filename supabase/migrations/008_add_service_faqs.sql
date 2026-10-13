-- Phase 8.6: FAQ content per service page.
-- Rendered as <details> blocks and as FAQPage JSON-LD on /services/[slug].
-- Shape: [{ "question": "...", "answer": "..." }, ...]

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
 