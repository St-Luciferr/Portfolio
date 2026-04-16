-- Phase 4: Add selected results section to site settings
-- Stores key metrics/proof points for the homepage "Selected Results" section

INSERT INTO site_settings (key, value) VALUES
('selected_results', '{
  "is_enabled": true,
  "heading": "Selected Results",
  "subheading": "Real outcomes from real projects",
  "metrics": [
    {"label": "Query Accuracy", "value": "95%+", "context": "Medical Q/A Chatbot"},
    {"label": "Search Time", "value": "10s", "context": "vs 15+ min manual lookup"},
    {"label": "Processing Automated", "value": "80%", "context": "Document pipeline time saved"},
    {"label": "AI Response Time", "value": "<2s", "context": "WhatsApp AI agent"}
  ]
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
