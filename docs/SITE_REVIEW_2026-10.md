# Portfolio Site Review — Client Conversion Audit

> **Date**: 2026-10-13
> **Scope**: Live site (`https://www.pandeysantosh.com.np`) + `dev` branch source.
> **Method**: Full source read, live page fetches, Lighthouse 12 (desktop + mobile), full-page screenshots.
> **Goal**: Identify what stops visitors from becoming clients, and decide whether a redesign is warranted.
> **Task tracking**: [`../todo.md`](../todo.md) Phases 12–14.

## Verdict

**The data layer is ready for clients. The presentation layer is not.**

Keep: Next.js app, Supabase CMS, admin dashboard, case-study routes, blog pipeline, JSON-LD, sitemap, analytics.
Redesign: everything a visitor sees on the homepage, the services surface, the contact flow, and the visual language.

A redesign of the public layer is recommended. It should happen **before** the content/outreach work in `GROWTH_PLAN.md` Phases 9–11, so that new traffic lands on a page that converts.

---

## Measured baseline (live homepage, 2026-10-13)

| Metric | Desktop | Mobile |
| ------ | ------- | ------ |
| Lighthouse Performance | 59 | 53 |
| Lighthouse Accessibility | 92 | 92 |
| Lighthouse Best Practices | 96 | 96 |
| Lighthouse SEO | 100 | 100 |
| First Contentful Paint | 0.9 s | 2.0 s |
| Largest Contentful Paint | 1.1 s | 3.0 s |
| Total Blocking Time | 2,460 ms | 16,360 ms |
| Time to Interactive | 4.7 s | 23.4 s |
| Cumulative Layout Shift | 0 | 0 |
| Total page weight | 5.4 MB | 5.4 MB |

Heaviest resources:

| Size | Resource |
| ---- | -------- |
| 3.2 MB | `/models/desktop_pc/scene.glb` (hero 3D computer) |
| 1.5 MB | `/models/planet/scene.glb` (contact-section globe) |
| 232 KB | largest JS chunk (three.js + react-three) |
| 87 KB | Draco decoder WASM |

Main-thread breakdown (desktop): ~4.2 s "Other" (WebGL/decode), ~2.6 s script evaluation.

Failing audits: `color-contrast` (primary CTA, white on `#915eff`), `link-name` (scroll indicator `<a href="#about">` has no accessible name).

---

## Findings

### F1 — Positioning is about the author, not the buyer (critical)

- Hero: "Hi, I'm Santosh / Full-Stack GenAI Developer / Building intelligent, real-world systems…"
- `<title>`: "ML Engineer & Full Stack Developer"
- Footer: "ML Engineer & Full Stack Developer"
- About heading: "Introduction / Overview."

Three different self-descriptions, none naming an outcome, an audience, or a proof point. A buyer cannot answer "what does this person sell, and for whom?" within five seconds.

### F2 — Service pages are not live (critical)

- Six rich service pages exist in code (`src/app/services/[slug]/page.tsx`) with process, benefits, deliverables, tools.
- On production every tested slug (`rag-systems`, `ai-chatbot`, `whatsapp-automation`, `ocr-document-automation`) returns **404**.
- Homepage service cards ("ML Developer", "Backend Developer", "Automation Engineer") have **no links** — zero `href="/services/…"` in the live HTML.
- `src/app/sitemap.ts` does not include any service URL.
- Root cause: `scripts/seed-services.ts` matches rows by title patterns (`chatbot`, `rag`, `whatsapp`, `ocr`, `django|backend`, …). The published rows are titled differently, so no slug was written. `About.tsx` only renders a `<Link>` when `service.slug` is truthy, so the failure is silent.
- `todo.md` marks Phase 4 as complete; in production it is not.

### F3 — No visible proof (critical)

- `Testimonials` section renders `null` — no published testimonial rows.
- "Real Impacts" metrics (95%+ accuracy, 10 s, 80%, <2 s) carry no client, dataset, or method.
- The strongest proof is buried as bullet points in the Experience timeline: OCR cheque-clearing system deployed at **Global IME Bank**, Siamese-network signature verification, internal RAG assistant on LLaMA 3, live booking platform at **Trekpal Nepal**, LMS for **AutomateBoring**.

### F4 — Client work and coursework are presented as equals (high)

- Six equal project cards mix a paid delivery (Trek Pal), GitHub demos (RAG, WhatsApp), and academic work (PestPAD, AMID, Monument Detection).
- Case-study outcomes are phrased as "demonstrates…", "provides a template…" rather than "delivered for X, result Y".
- No case study has a real screenshot or architecture diagram (open item from Phase 3).
- `dev` branch `Works.tsx` bento grid drops project images entirely; images are the most credible element of a case study.

### F5 — Performance is poor on mobile (high)

See baseline table. 4.6 MB of 3D models plus WebGL main-thread work produce 16 s of blocking time on mobile. Neither model communicates anything to a client. The Tech "balls" section rendered with several grey spheres (icons not loaded) in screenshots.

### F6 — Contact flow leaks leads (high)

- Success/failure shown via `window.alert()`.
- EmailJS called from the browser; no server route, no spam protection (deferred in Phase 5).
- No booking link, no visible email address, no WhatsApp link (despite WhatsApp automation being a core service).
- One path to contact: a 4-field form.

### F7 — Domain / canonical mismatch (medium)

- Apex `pandeysantosh.com.np` → **307** → `www.pandeysantosh.com.np`.
- `metadataBase`, `og:url`, all JSON-LD `url` fields, and every sitemap entry use the **non-www** form.
- Homepage emits **no `<link rel="canonical">`** (Phase 8.1 still open).
- Blog tag "Begineer" (typo) is live and in the sitemap.

### F8 — Visual language signals "tutorial template" (medium)

Animated desktop model, rotating tech spheres, `react-parallax-tilt` cards, `react-vertical-timeline-component`, starfield, and custom cursor are all recognisable from the same widely-copied Three.js portfolio template. To a technical buyer this undercuts the senior work listed in Experience.

### F9 — Smaller issues (low)

- Navbar brand: "Santosh | Portfolio" — use full name + positioning.
- "Work" nav link points to the Experience timeline, not projects.
- Trailing periods in section headings ("Overview.", "Projects.", "Contact.").
- "Trek Pal Nepal" vs "Trekpal Nepal" naming inconsistency.
- "PACO payment integration" is unexplained.
- Only 1 blog post published (plan calls for 5 cornerstone posts).

---

## Recommendations

### R1 — Reposition around three offers

Replace six services / three job-title cards with three client-facing offers:

1. **RAG assistants on private documents** — for teams with knowledge locked in PDFs/wikis.
2. **WhatsApp & chat automation with function calling** — for businesses handling support/leads on WhatsApp.
3. **Document / OCR automation pipelines** — for operations teams doing manual data entry (anchor: bank cheque-clearing deployment).

Backend (Django/FastAPI) and ML deployment become supporting capabilities inside each offer, not headline services.

Each offer page states: who it is for, what the client receives, typical timeline, engagement model, one linked case study, FAQ.

### R2 — Lead with proof

- Hero trust strip: "Systems in production at Global IME Bank · AutomateBoring · Trekpal Nepal".
- Collect and publish 2–3 testimonials (QuickFox lead, AutomateBoring contact, Trekpal client). Name + role + company.
- Attach a source to every metric or remove it.

### R3 — Separate client work from research

`/projects` gets two groups: **Client work** (Trek Pal, Quick CCA*, QuickRef*, LMS*) and **Research & experiments** (RAG demos, PestPAD, AMID, Monument Detection). Homepage shows three featured case studies with a real screenshot and a one-line result.

\* Describe employer work at the level permitted by your contract; even a redacted architecture diagram beats a GitHub link.

### R4 — Remove the 3D layer

Drop `three`, `@react-three/fiber`, `@react-three/drei`, `maath`, `react-parallax-tilt`, `react-vertical-timeline-component`. Replace hero model with a static screenshot/diagram of a real system; replace globe with nothing; replace tech balls with a grouped text list. Expected result: mobile Performance ≥ 85, TBT < 500 ms.

### R5 — Fix the contact funnel

Server-side `/api/contact` route (Resend or SMTP) with honeypot + rate limit; inline success/error UI; Cal.com/Calendly "Book a 20-min call"; visible email; WhatsApp deep link.

### R6 — Fix domain signals

Pick one host. Either remove the `www` redirect at the DNS/Vercel level, or change `SITE_URL` / `metadataBase` / sitemap / JSON-LD to `www`. Add homepage canonical. Add service URLs to sitemap.

### R7 — New homepage structure

1. Nav — full name · Services · Work · Writing · About · **Book a call**
2. Hero — outcome headline, one-line audience, 2 CTAs, trust strip
3. Three offers
4. Selected work — 3 featured case studies
5. How an engagement runs — 4 steps + what the client prepares
6. Proof — testimonials + sourced metrics
7. About — short, photo, location/timezone, availability
8. Writing — latest 3 posts
9. Contact — form + booking + email + WhatsApp

Visual direction: keep the dark identity if desired; one accent colour; no glow/tilt/cursor effects; larger type scale; real screenshots carry the page.

### R8 — Sequencing

```text
Week 1    Phase 12  Fix what's broken (no redesign)        ~1–2 days
Weeks 2–4 Phase 13  Redesign public layer                   ~2–3 weeks
Week 5    Phase 14  Verify, measure, hand off to Phase 9    ~2 days
Week 6+   Phases 9–11 (GROWTH_PLAN.md) content + outreach
```

A redesign raises conversion of existing traffic (est. 20–30 visits/mo). It does not create traffic. Content and outreach remain mandatory; they should start only once the landing experience converts.

---

## Success criteria for this work

| Metric | Now | After Phase 12 | After Phase 13 |
| ------ | --- | -------------- | -------------- |
| Lighthouse Performance (mobile) | 53 | ≥ 75 | ≥ 90 |
| Total Blocking Time (mobile) | 16.4 s | < 2 s | < 0.5 s |
| Live service pages | 0 | 6 | 3 offers |
| Published testimonials | 0 | 2 | ≥ 3 |
| Contact paths | 1 (form) | 4 (form, call, email, WhatsApp) | 4 |
| Homepage canonical present | No | Yes | Yes |
| Hero names an outcome + audience | No | Partial | Yes |
| Featured case studies with real screenshot | 0 | 0 | 3 |

### Phase 12 measurement (2026-10-13)

Homepage, Lighthouse 12 mobile, local production build (`next start`), two runs. The baseline above was measured against production, so treat the comparison as indicative until re-measured on the live site after deploy.

| Metric | Baseline | After Phase 12 | Target | Met |
| ------ | -------- | -------------- | ------ | --- |
| Performance | 53 | 81–89 | ≥ 75 | ✅ |
| Total Blocking Time | 16.4 s | 150–360 ms | < 2 s | ✅ |
| Largest Contentful Paint | 3.0 s | 3.5–3.7 s | — | LCP is now the hero background image (`next/image`, priority) |
| Accessibility | 92 | 100 | — | ✅ |
| Page weight | 5,450 KiB | 345 KiB | — | −94 % |
| Live service pages | 0 | 3 offers | 6 → 3 offers | ✅ |
| Homepage canonical present | No | Yes (`www`) | Yes | ✅ |
| Contact paths | 1 | 2 (form, email) | 4 | ⏸ call link and WhatsApp need input |
| Published testimonials | 0 | 0 | 2 | ⏸ needs outreach |

Production re-measure after PR #8 (1 run, live `www`): Performance 74, TBT 660 ms, LCP 3.1 s, Accessibility 100, 356 KiB.

Phase 13 production measure after PR #9 (1 run, live `www`): Performance 88, Accessibility 100, Best Practices 100, SEO 100, TBT 260 ms, LCP 2.9 s, CLS 0, 266 KiB.
