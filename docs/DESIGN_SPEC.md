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

## Design system (13.3, revised 2026-10-14)

- **Themes (13.4)**: light and dark, switched by the toggle in the navbar. First visit follows the OS setting; the choice is stored in `localStorage.theme`. An inline script in `app/layout.tsx` sets `<html data-theme>` before first paint, so there is no flash. Tailwind `dark:` uses the same attribute. The admin is pinned to light with `data-theme="light"` on its root.
- **Tokens**: CSS variables (space-separated RGB) in `globals.css`, exposed as Tailwind colours so one class works in both themes:

| Token | Tailwind | Light | Dark |
| ----- | -------- | ----- | ---- |
| `--site-bg` | `bg-primary` | `#F8F9FB` | `#090B11` |
| `--site-surface` | `bg-tertiary` | `#FFFFFF` | `#12151F` |
| `--site-surface-2` | `bg-black-100` | `#F2F4F8` | `#0D1018` |
| `--site-fg` | `text-fg`, `border-fg/10` | `#0F121C` | `#EDEFF5` |
| `--site-fg-soft` | `text-white-100` | `#2C3140` | `#D0D4E1` |
| `--site-muted` | `text-secondary` | `#585E70` | `#989EB2` |
| `--site-brand` | `bg-brand` (white text) | `#5B46E5` | `#6C58F0` |
| `--site-brand-fg` | `text-brand-fg` | `#4F3BD2` | `#B4A8FF` |

- **Type**: Geist for everything (Geist Mono only inside the hero code panel). Headings semibold with tight tracking: hero 42 / 60 / 68 px, section 30 / 40 px; body 17 px at 1.7 line height. Sentence case throughout; no all-caps labels.
- **Layout**: content `max-w-6xl`, sections `py-20 sm:py-28`, alternating plain / band backgrounds for rhythm. Case studies are alternating image / text rows.
- **Surfaces**: `rounded-xl`, 1 px `border-fg/10`, `shadow-soft` at rest and `shadow-lift` for raised media. Code panels stay dark in both themes.
- **Motion**: one staged entrance in the hero visual, the slow contact orbit and the experience timeline's reveal; all disabled under `prefers-reduced-motion`.
- **Experience**: `react-vertical-timeline-component` (one-column-left) inside About, coloured from the site tokens.
