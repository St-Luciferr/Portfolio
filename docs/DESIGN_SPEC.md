# Design Spec — Public Layer (Phase 13)

> **Date**: 2026-10-13 · **Source**: [`SITE_REVIEW_2026-10.md`](SITE_REVIEW_2026-10.md) R1, R3, R7 · **Tasks**: `todo.md` 13.1–13.4

## Positioning (13.1)

- **Who**: Santosh Pandey, full-stack developer who also builds AI assistants. The pitch is deliberately not AI-only.
- **Headline** (hero, editable in `/admin/settings` → Hero → *Positioning headline*): "Full-stack products, with the AI built in."
- **Audience line**: "I design and build web apps, APIs and AI assistants (RAG, WhatsApp, document automation) for startups and growing teams, from first prototype to production."
- **Voice**: plain, specific, first person. Describe what was built and what changed; no superlatives, no unsourced numbers.

## Offers

| Card | Source | Links to |
| ---- | ------ | -------- |
| RAG & AI Knowledge Assistants | `services` row | `/services/rag-systems` |
| WhatsApp AI Automation | `services` row | `/services/whatsapp-automation` |
| Document & OCR Automation | `services` row | `/services/ocr-document-automation` |
| Full-Stack Web & APIs | static card in `src/components/home/Offers.tsx` | `/projects` |

## Featured case studies

Context-aware RAG, WhatsApp chatbot, Trek Pal Nepal (chosen 2026-10-13), flagged with `projects.is_featured` (migration 009). Until any project is flagged, the homepage shows the first three by display order.

Screenshots (13.2): the WhatsApp card currently uses a logo; replace it with a real screenshot or redacted diagram via *Case-study screenshot* in the project form.

## Homepage structure (R7)

Nav (full name · Services · Work · Writing · About · CTA) → Hero → Offers → Selected work → How an engagement runs → Proof → About → Writing → Contact → Footer.

The CTA reads **Book a call** when `contact.booking_url` is set, otherwise **Start a project** (scrolls to the form). WhatsApp appears in the contact panel when `contact.whatsapp` is set. Proof hides when there are no testimonials and the metrics are disabled.

## Design system (13.3)

- **Theme (13.4)**: dark only. Background `primary` `#050816`; surfaces `tertiary` `#151030` and `black-100` `#100d25`; text `white`, `white-100` `#f3f3f3`, `secondary` `#aaa6c3`.
- **One accent**: violet. `#7a4fd4` for filled buttons (white text 5.4:1), `#915eff` for borders and markers, `#cbb5ff` for accent text on dark.
- **Type scale**: hero h1 40 / 56 / 64 px; section h2 32 / 44 px; body 17 px / 30 px line height; small 14 px; eyebrow 14–18 px uppercase, tracked.
- **Spacing**: sections `py-20 sm:py-24`, horizontal `px-6 sm:px-16`, content `max-w-7xl`.
- **Cards**: `rounded-2xl`, `border-white/10`, translucent surface fill, border turns accent on hover. No tilt, glow-on-hover or custom cursor.
- **Motion**: CSS keyframes only in the hero visual and contact orbit, all disabled under `prefers-reduced-motion`. Sections render without entrance animations.
