# Portfolio SEO and Client Acquisition TODO

## Phase 1: Quick Wins ✅ COMPLETED

- [x] Fix hero CMS field mismatch: standardize `subtitle` vs `tagline`.
- [x] Render the hero `role` value or remove the unused field.
- [x] Add a primary hero CTA for hiring or booking a call.
- [x] Keep resume download as a secondary CTA.
- [x] Add or fix the default Open Graph image.
- [x] Replace the placeholder Google verification code.
- [x] Remove hardcoded fallback EmailJS IDs from the contact form.

## Phase 2: Project SEO ✅ COMPLETED

- [x] Update project cards to link to `/projects/{slug}`.
- [x] Add "View case study" CTA on each project card.
- [x] Keep source code and demo links inside project detail pages.
- [x] Add canonical URLs to project page metadata.
- [x] Add project-specific metadata titles and descriptions.
- [x] Add project-specific Open Graph images where possible.
- [x] Add `BreadcrumbList` schema to project pages.
- [x] Add `CreativeWork` or `SoftwareApplication` schema to project pages.

## Phase 3: Case Study Content ✅ COMPLETED

- [x] Expand Medical Q/A Chatbot (RAG) into a full case study.
- [x] Expand WhatsApp Chatbot with Function Calling into a full case study.
- [x] Expand Trek Pal Nepal into a full case study.
- [x] Expand Continual Monument Detection into a full case study.
- [x] Expand PestPAD into a full case study.
- [x] Expand AMID into a full case study.
- [ ] Add screenshots or diagrams for each major project. (Optional - requires actual images)
- [x] Add "related projects" links between case studies.

## Phase 4: Services and Client Conversion ✅ COMPLETED

- [x] Add a richer AI chatbot development service section or page.
- [x] Add a richer RAG system development service section or page.
- [x] Add a richer WhatsApp automation service section or page.
- [x] Add a richer OCR/document automation service section or page.
- [x] Add a richer Django/FastAPI backend development service section or page.
- [x] Add a richer ML deployment and optimization service section or page.
- [x] Link each service to relevant case studies.
- [x] Add a "Selected Results" or proof section near the top of the homepage.
- [x] Add testimonials section using the existing testimonials table.

## Phase 5: Contact and Lead Qualification ✅ COMPLETED (scoped)

- [x] Add optional "What's this about?" subject field to the contact form.
- [x] Add a clear response-time expectation near the contact form (24–48h note).
- [x] Build a dedicated site footer with social links + nav for broader reach.
- [~] Skipped intentionally: company/website, project type, budget, timeline fields — kept the form friendly for peers and collaborators, not just clients.
- [ ] Add optional booking link or Calendly CTA. (deferred — revisit when client volume grows)
- [ ] Consider moving contact submission to a server-side route with spam protection. (deferred)

## Phase 6: Content Hub ✅ INFRASTRUCTURE COMPLETED

### Infrastructure

- [x] Create `/blog` route (list + 60s ISR).
- [x] Create `/blog/[slug]` post route (SSG via `generateStaticParams`).
- [x] Create `/blog/tag/[slug]` tag filter route.
- [x] DB migration `007_add_blog.sql` — `blog_posts` + `blog_tags` with RLS, indexes, `updated_at` trigger.
- [x] Server-side Markdown pipeline (`unified` + remark-gfm + rehype-slug + rehype-autolink-headings + rehype-pretty-code with shiki `github-dark-dimmed`).
- [x] `BlogPosting` + `BreadcrumbList` JSON-LD, OpenGraph `article` type, Twitter `summary_large_image`, canonical URL per post.
- [x] Admin CRUD at `/admin/blog` with split-pane Markdown editor, live preview, tags, cover image, SEO override accordion, reading-time preview.
- [x] Admin API: `POST /api/admin/posts`, `GET/PUT/DELETE /api/admin/posts/[id]` with server-side reading-time compute and first-publish `published_at` transition.
- [x] Add blog URLs to sitemap (posts + tag pages with `lastModified` from `updated_at`).
- [x] Add Blog link to Navbar + Footer (with CMS nav_links fallback).
- [x] Targeted UI polish: `@tailwindcss/typography` + prose overrides, body noise overlay, `GradientRule` helper.

### Content (still to author — seed via `/admin/blog`)

- [ ] Article: "How to build a RAG chatbot for business documents".
- [ ] Article: "RAG vs fine-tuning for business chatbots".
- [ ] Article: "WhatsApp automation for customer support".
- [ ] Article: "OCR cheque processing with Django and React".
- [ ] Article: "Deploying LLM apps with FastAPI".
- [ ] Link articles to relevant services and case studies (via in-post Markdown links).

## Phase 7: Analytics and Measurement ✅ COMPLETED

- [x] Add privacy-friendly analytics. (Vercel Web Analytics + Speed Insights, cookieless, `/admin` excluded via `beforeSend`)
- [x] Track contact form submissions. (`contact_submit` with `status` + `hasSubject`)
- [x] Track hero CTA clicks. (`hero_cta_click` with `variant: 'primary' | 'resume'`)
- [x] Track project case-study visits. (automatic pageviews for `/projects/[slug]`)
- [x] Track resume downloads. (`resume_download` with `source`)
- [x] Track demo/source outbound clicks. (`project_demo_click` / `project_source_click` with `slug` + `source: 'card' | 'detail'`)

---

## Phase 8: Quick SEO Wins 🚀 ✅ DEPLOYED (2026-10-13, PR #7 → `main` `7993061`; Bing in 8.8 deferred)

> Target: Week 1. See [`docs/GROWTH_PLAN.md`](docs/GROWTH_PLAN.md#phase-8--quick-seo-wins-week-1-10-hours-total) for rationale.

- [x] **8.1** Add canonical URL to homepage metadata in `src/app/page.tsx` — `alternates: { canonical: 'https://pandeysantosh.com.np' }`. Uses `SITE_URL` from `src/lib/site.ts`. Live since 2026-10-13, but it points at the apex, which 307s to `www`; fix in 12.18.
- [x] **8.2** Include `/services` index + every `/services/[slug]` in `src/app/sitemap.ts` (priority 0.7, monthly). New `/services` index page added. Production `/sitemap.xml` verified 2026-10-13: lists `/services` + all 3 offer URLs.
- [~] **8.3** `Review` JSON-LD emitted from `src/app/page.tsx` for every published testimonial. `AggregateRating` intentionally **not** added: testimonials have no star score, and a made-up rating breaks Google's review-snippet policy. Validate at [validator.schema.org](https://validator.schema.org/) once ≥1 testimonial is published (12.7).
- [x] **8.4** Add a third hero CTA "Browse Projects" → `/projects` in `src/components/sections/HeroCTAs.tsx`; emit `hero_cta_click: variant='projects'` analytics event.
- [x] **8.5** Build dynamic OG images via `next/og` (shared renderer in `src/lib/og.tsx`):
  - [x] `src/app/blog/[slug]/opengraph-image.tsx`
  - [x] `src/app/projects/[slug]/opengraph-image.tsx`
  - [x] Production check 2026-10-13: images return `image/png`, but the URL uses the apex host and costs one redirect (12.18).
- [x] **8.6** FAQ `<details>` + `FAQPage` JSON-LD on `/services/[slug]`, stored in new `services.faqs` column. Draft Q&As (5 per service) in `scripts/seed-services.ts`.
  - [x] Run `supabase/migrations/008_add_service_faqs.sql` in the Supabase SQL editor. (Applied 2026-10-13; column verified.)
  - [x] Seeded via `npm run db:seed-services` (2026-10-13). Draft answers still worth a read-through in `scripts/seed-services.ts`.
  - [x] Production check 2026-10-13: `/services/rag-systems` serves `FAQPage` JSON-LD.
- [x] **8.7** Record Lighthouse baseline (homepage, project detail, blog list, service detail) in `docs/GROWTH_PLAN.md` success-metrics table.
- [~] **8.8** Verify site ownership in Google Search Console + Bing Webmaster; submit sitemap.
  - [x] Google Search Console verified (confirmed 2026-10-13). Phase 8 is deployed: **resubmit `/sitemap.xml` now** so the 3 new service URLs are picked up.
  - [ ] Bing Webmaster (deferred): set `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel; the meta tag is already wired in `src/app/layout.tsx`.

## Phase 9: Content Engine Launch ✍️ 🟡 CODE DONE (9.6, 9.8) · CONTENT DEFERRED

> Target: Weeks 2–6. 5 cornerstone posts + cross-linking.
>
> **Readiness check (2026-10-13): not ready to start as written.**
> - **Gate:** `docs/GROWTH_PLAN.md` and `docs/SITE_REVIEW_2026-10.md` (R8) sequence Phase 9 after Phases 12–14. Phase 8 cleared the service-page 404; still open are proof (0 published testimonials, 12.6–12.7), mobile performance (12.9–12.13) and the canonical host (12.18). Content traffic sent to the site now lands on those problems.
> - **Stale targets (fixed below):** service slugs were consolidated in 12.2. `rag-development` → `rag-systems`; `ai-chatbot-development` and `ml-deployment` are retired (308 to `/services`).
> - **Missing target:** there is no `amid` project in the DB (live projects: `medical-qa-chatbot`, `context-aware-rag`, `whatsapp-chatbot`, `continual-monument-detection`, `trek-pal-nepal`, `pestpad`). 9.4 needs a new project row or a new topic.
> - **Off-offer topics:** 9.4 and 9.5 (mobile ML, continual learning) don't map to any of the 3 current offers. Consider swapping one for an OCR / document-automation post, since `ocr-document-automation` has no case study or post (see 13.2).
> - **Existing post:** "How to Build a RAG Chatbot with LangChain…" is published (≈1,540 words, 0 internal links, tag `begineer` → 12.20). Add ≥3 internal links to it as part of 9.1–9.3; it overlaps the Phase 6 "How to build a RAG chatbot" article.
> - **Infra is ready:** blog routes, admin editor, tags, sitemap, `BlogPosting` JSON-LD and OG images all ship today. Drafting posts in the admin (unpublished) can start in parallel with Phase 12.
>
> **Status (2026-10-13):** unblocked code shipped (9.6, 9.8). Deferred: 9.1–9.5 (publishing gated on Phases 12–14; posts are author-written), 9.7 (needs the posts to link to), 9.9–9.10 (need published posts).

### Cornerstone posts (1,800+ words each, ≥3 internal links, hero image, code samples)

- [ ] **9.1** ⏸ *Deferred: publish after Phases 12–14; draft unpublished in `/admin/blog` meanwhile.* Publish "RAG in production: 3 lessons from shipping a medical chatbot" → links to `/projects/medical-qa-chatbot`, `/services/rag-systems`. Tags: `rag`, `production`, `healthcare`, `llm`.
- [ ] **9.2** ⏸ *Deferred: publish after Phases 12–14; draft unpublished in `/admin/blog` meanwhile.* Publish "Building WhatsApp bots with function calling: a practical guide" → links to `/projects/whatsapp-chatbot`, `/services/whatsapp-automation`. Tags: `whatsapp`, `openai`, `automation`.
- [ ] **9.3** ⏸ *Deferred: publish after Phases 12–14; draft unpublished in `/admin/blog` meanwhile.* Publish "Fine-tuning vs RAG: when to pick each" → links to both RAG case studies (`/projects/medical-qa-chatbot`, `/projects/context-aware-rag`) and `/services/rag-systems`. Tags: `rag`, `fine-tuning`, `llm`, `architecture`.
- [ ] **9.4** ⏸ *Deferred: publish after Phases 12–14; draft unpublished in `/admin/blog` meanwhile.* Publish "On-device ML with TensorFlow Lite: lessons from AMID" → ⚠️ `/projects/amid` does not exist and `/services/ml-deployment` is retired; add the project or replace this topic. Tags: `mobile-ml`, `tflite`, `edge`.
- [ ] **9.5** ⏸ *Deferred: publish after Phases 12–14; draft unpublished in `/admin/blog` meanwhile.* Publish "Continual learning for production CV: avoiding catastrophic forgetting" → links to `/projects/continual-monument-detection` (`/services/ml-deployment` is retired; no matching offer). Tags: `continual-learning`, `computer-vision`, `ewc`, `maml`.

### Cross-linking layer (after posts ship)

- [x] **9.6** Build `RelatedProjectsByTags` server component and render at bottom of `src/app/blog/[slug]/page.tsx` (mirror existing `getRelatedProjects` pattern, match on tag overlap). Done 2026-10-13: `src/components/blog/RelatedProjectsByTags.tsx` ("See it in production") via `getRelatedProjectsByTags()`; fuzzy word-boundary matching in `src/lib/tag-match.ts` (ignores generic terms like Python). Verified on the existing RAG post: shows medical-qa-chatbot, context-aware-rag, whatsapp-chatbot.
- [ ] **9.7** ⏸ *Deferred: needs 9.1–9.5 published first (only one post exists today).* Add 1–2 inline links to relevant blog posts inside each project's case-study fields (`problem` / `solution` / `results`; there is no `case_study_content` column) (edit `scripts/migrate-project-details.ts` then run `npm run db:migrate-details`).
- [x] **9.8** Add "Related Reading" widget on each `/services/[slug]` listing 2–3 blog posts that share the service's primary technology tags (match `services.tools_technologies` against `blog_tags.name`; normalise case, since values like `Pinecone / ChromaDB / Weaviate` are compound). Done 2026-10-13: `src/components/blog/RelatedReading.tsx` via `getPostsByTerms()`, matching the service stack plus its linked case studies' tags, minimum 2 shared terms. Hidden when nothing matches (OCR page today). Case-study cards extracted to `src/components/projects/ProjectMiniCard.tsx` and reused.

### Validation

- [ ] **9.9** ⏸ *Deferred: after posts publish.* Verify all 5 posts indexed in Google Search Console; confirm each appears in `/sitemap.xml`.
- [ ] **9.10** ⏸ *Deferred: after posts publish.* Run [Rich Results Test](https://search.google.com/test/rich-results) on each post URL — `BlogPosting` + `BreadcrumbList` must validate.

## Phase 10: Conversion & E-E-A-T 💰

> Target: Weeks 7–10. Quantify everything, add pricing, build authority signals.

- [ ] **10.1** Add ≥3 specific metrics (latency, accuracy, cost, time saved) to **Results** section of every case study via `scripts/migrate-project-details.ts` → `npm run db:migrate-details`.
- [ ] **10.2** Rewrite About bio with quantified claims (years coding, # production systems shipped, key wins) — edit via `/admin/settings` or `src/lib/constants.ts`.
- [ ] **10.3** Add 3-tier pricing (Starter / Production / Enterprise) to each `/services/[slug]`:
  - [ ] Schema design: extend `services` table with `pricing_tiers` JSONB column (new migration `008_add_service_pricing.sql`).
  - [ ] Admin form: extend `src/components/admin/services/` to edit tiers.
  - [ ] Render component with scope + timeline + "starting at" price.
- [ ] **10.4** Add process-timeline section per service (week-by-week or milestone-based delivery).
- [ ] **10.5** Build `/uses` page at `src/app/uses/page.tsx`:
  - [ ] List current stack grouped by category (frameworks, models, hosting, tools).
  - [ ] 1–2 line *why* for each entry.
  - [ ] Add to Navbar and sitemap.
  - [ ] Render `ItemList` JSON-LD.
- [ ] **10.6** Newsletter capture system:
  - [ ] DB migration `009_add_newsletter_subscribers.sql` (email, source_post_slug, tags, confirmed_at, RLS).
  - [ ] `src/components/blog/NewsletterCTA.tsx` rendered mid-post (scroll trigger) + end-of-post.
  - [ ] `POST /api/newsletter/subscribe` route + double-opt-in email via Resend or similar.
  - [ ] Admin view at `/admin/subscribers` to export CSV.
- [ ] **10.7** Strengthen Person JSON-LD in `src/app/layout.tsx`:
  - [ ] Populate `sameAs` (GitHub, LinkedIn, Twitter/X).
  - [ ] Populate `alumniOf`, `knowsAbout`, `jobTitle`.
- [ ] **10.8** Add client logos / press / certifications row to homepage if available (E-E-A-T proof).

## Phase 11: Authority & Topical Hubs 🏛️

> Target: Months 4–6. Build the moat.

- [ ] **11.1** Build `/guides` (or `/resources`) hub at `src/app/guides/page.tsx`:
  - [ ] Curate 30–50 internal links grouped by topic (RAG, optimization, automation, mobile ML, backend).
  - [ ] Each topic `h2` matches a target keyword cluster.
  - [ ] Add to Navbar; sitemap priority 0.85.
- [ ] **11.2** Publish 1 cornerstone "definitive guide" (4,000+ words), e.g., "The Complete Guide to RAG Evaluation" — designed to attract inbound links.
- [ ] **11.3** Outreach: DM 20–30 dev creators / newsletter operators sharing the cornerstone; goal 5+ inbound links from DR≥30 sites within 60 days.
- [ ] **11.4** Continue cadence — 1 blog post every 2 weeks for 8 weeks (4 more posts). Pick topics from Search Console "impressions but no clicks" queries.
- [ ] **11.5** Build `/talks` or `/oss` page listing conference talks, OSS contributions, GitHub stats. Wire to `Person.subjectOf`.
- [ ] **11.6** Audit thin content — review every URL's Search Console impressions; merge or `noindex` anything under 50 impressions over 90 days.

### Review checkpoints

- [ ] **Monthly**: Update success-metrics table in `docs/GROWTH_PLAN.md` with actuals.
- [ ] **Quarterly**: Re-sequence remaining phases based on Search Console data.

---

## Phase 12: Conversion Fixes (no redesign) 🔧

> Target: Week 1, ~1–2 days. Source: [`docs/SITE_REVIEW_2026-10.md`](docs/SITE_REVIEW_2026-10.md) findings F2, F3, F5, F6, F7, F9.
> Do these before Phase 13 so the live site stops leaking leads while the redesign is in progress.

### Services (F2)

- [x] **12.1** Audit published `services` rows in Supabase; record their exact titles. (2026-10-13: only 3 rows, all published, none with a slug: "ML Developer", "Backend Developer", "Automation Engineer". The seed script defines 6 services, so 3 have no row to land in.)
- [x] **12.2** Fix `scripts/seed-services.ts` title patterns (or rename rows) so all 6 services receive a slug; run `npm run db:seed-services`. (Script itself made runnable in Phase 8: it previously required the uninstalled `dotenv` package and read `SUPABASE_SERVICE_ROLE_KEY` instead of `SUPABASE_SERVICE_KEY`, so it never ran.) Done 2026-10-13: consolidated into 3 offers (RAG & AI Knowledge Assistants, WhatsApp AI Automation, Document & OCR Automation) with exact-title matching and case-study links; the other 3 services are kept as `archivedServices`. Retired slugs 308 to `/services`.
- [x] **12.3** Verify every `/services/[slug]` returns 200 on production and homepage cards render as links. (2026-10-13: `/services/django-fastapi-backend` returns 200. "ML Developer" and "Automation Engineer" still have no slug.) Update: all 3 offers render locally with FAQs; production verified 2026-10-13 after PR #7: `/services`, all 3 offer pages 200, homepage cards link to them, retired slug 308s to `/services`.
- [x] **12.4** Add `/services/[slug]` URLs to `src/app/sitemap.ts` (priority 0.7, monthly) — closes 8.2.
- [ ] **12.5** Add an admin warning on `/admin/services` when a published service has no slug.

### Proof (F3)

- [ ] **12.6** Request testimonials from: QuickFox lead, AutomateBoring contact, Trekpal client. Name + role + company + photo.
- [ ] **12.7** Publish ≥ 2 testimonials via `/admin/testimonials`.
- [ ] **12.8** Add a `source` / `context` line to each Selected Results metric, or disable the section until sourced.

### Performance (F5)

- [ ] **12.9** Remove `Lazy3DCanvas` from `Hero.tsx`; replace with a static image (screenshot or diagram of a real system).
- [ ] **12.10** Remove `Lazy3DCanvas` from `Contact.tsx`.
- [ ] **12.11** Replace `LazyBallCanvas` in `Tech.tsx` with a grouped text/icon list.
- [ ] **12.12** Drop `three`, `@react-three/fiber`, `@react-three/drei`, `maath` from `package.json`; delete `public/models/**`, `public/new earth/**`, `src/components/canvas/**`.
- [ ] **12.13** Re-run Lighthouse (mobile) — target Performance ≥ 75, TBT < 2 s. Record in `docs/SITE_REVIEW_2026-10.md`.

### Contact (F6)

- [ ] **12.14** Replace `alert()` in `Contact.tsx` with inline success/error states.
- [ ] **12.15** Add "Book a call" link (Cal.com / Calendly) to hero CTAs and contact section; track `hero_cta_click: variant='call'`.
- [ ] **12.16** Show email address and a WhatsApp deep link in the contact section and footer.
- [ ] **12.17** Move submission to `POST /api/contact` (Resend or SMTP) with honeypot + rate limit; remove EmailJS — closes Phase 5 deferred item.

### Domain / SEO (F7)

- [ ] **12.18** Decide canonical host (`www` vs apex). Align Vercel redirect, `SITE_URL`, `metadataBase`, sitemap, JSON-LD, `og:url`.
- [x] **12.19** Add `alternates.canonical` to homepage `generateMetadata` in `src/app/page.tsx` — closes 8.1.
- [ ] **12.20** Rename blog tag "Begineer" → "Beginner" (slug + sitemap).
- [ ] **12.21** Fix CTA colour contrast (primary button) and add `aria-label` to the hero scroll-indicator link in `HeroAnimation.tsx`.

### Copy (F1, F9)

- [ ] **12.22** Write one positioning sentence; use it in hero, `<title>`, OG description, footer, and navbar brand.
- [ ] **12.23** Normalise "Trek Pal Nepal" naming; explain or remove "PACO payment integration".
- [ ] **12.24** Point "Work" nav link to `/projects`; rename Experience anchor to "Experience".

### Dependency security
- [x] **12.26** `npm audit` 2026-10-13: 27 findings (1 critical, 18 high) → 7 high, all build-time. `npm audit fix` (next 16.2.3 → 16.4.0 for the critical, postcss, prosemirror-view, ws, …), `sharp` ^0.35.5 (matches next 16.4), `tsx` ^4.23.15 (patched esbuild), `overrides.postcss-selector-parser` ^7.1.6 (compiled CSS verified identical). Remaining 7 tracked in 13.25 / 13.26.

### Cache freshness
- [x] **12.25** On-demand revalidation for service and project admin writes via `src/lib/api/revalidate.ts` (homepage, index pages, every detail page by route pattern, share images, sitemap). 60 s time-based fallback on `/services/[slug]` and `/projects/[slug]` for seed scripts and SQL edits. Done 2026-10-13.

## Phase 13: Public-Layer Redesign 🎨

> Target: Weeks 2–4, ~2–3 weeks. Source: `docs/SITE_REVIEW_2026-10.md` R1, R3, R7.
> Keep untouched: Supabase schema, admin dashboard, blog pipeline, `/api/admin/**`, analytics, JSON-LD helpers.

### Design & content prep

- [ ] **13.1** Write a one-page design spec: positioning sentence, 3 offers, 3 featured case studies, trust strip names, voice.
- [ ] **13.2** Collect real screenshots / redacted diagrams for the 3 featured case studies (Quick CCA, Trek Pal, one RAG system).
- [ ] **13.3** Define a reduced design system: one accent colour, type scale, spacing, card style; no glow/tilt/cursor effects.
- [ ] **13.4** Decide on dark-only vs light/dark; document in `src/app/globals.css` tokens.

### Data model changes

- [ ] **13.5** Migration `009_project_grouping.sql`: add `category` (`client` | `research`) and `is_featured` to `projects`; `client_name`, `outcome_line`, `screenshot_url` to `project_details`.
- [ ] **13.6** Migration `010_service_offers.sql`: add `audience`, `timeline`, `engagement_model` to `services` (`faqs` already added in 008); consolidate to 3 published offers.
- [ ] **13.7** Migration `011_site_proof.sql`: `trust_logos` site setting (name, logo URL, link) for the hero trust strip.
- [ ] **13.8** Extend admin forms (`ProjectForm`, `ServiceForm`, settings) for the new fields.

### Homepage rebuild (`src/app/page.tsx` + `src/components/sections/**`)

- [ ] **13.9** Navbar: full name, Services / Work / Writing / About, "Book a call" button.
- [ ] **13.10** Hero: outcome headline, audience line, 2 CTAs (Book a call / See case studies), trust strip.
- [ ] **13.11** Offers section: 3 cards → `/services/[slug]`.
- [ ] **13.12** Selected work: 3 featured case studies with screenshot, client/context, one-line result.
- [ ] **13.13** "How an engagement runs": 4 steps + "what you prepare".
- [ ] **13.14** Proof: testimonials + sourced metrics (single section).
- [ ] **13.15** About: short bio, photo, location/timezone, availability status.
- [ ] **13.16** Writing: latest 3 posts.
- [ ] **13.17** Contact: form + booking + email + WhatsApp.
- [ ] **13.18** Remove `CustomCursor`, `Stars`, `SectionWrapper` tilt/stagger effects; keep `framer-motion` only for subtle fade-ins honouring `prefers-reduced-motion`.

### Sub-pages

- [ ] **13.19** `/services/[slug]`: add audience, timeline, engagement model (FAQ + `FAQPage` JSON-LD done in 8.6).
- [ ] **13.20** `/projects`: split into "Client work" and "Research & experiments"; restore project images.
- [ ] **13.21** `/projects/[slug]`: add screenshot/diagram block, client/context line, rewrite Outcome bullets as delivered results.
- [x] **13.22** Dynamic OG images for projects + posts via `next/og` (done in 8.5).

### Cleanup

- [ ] **13.23** Remove `react-parallax-tilt`, `react-vertical-timeline-component`, unused icons, `public/Face.jsx`, `public/rag.png`.
- [ ] **13.24** Delete `src/lib/motion.ts` variants no longer used.
- [ ] **13.25** Migrate Tailwind CSS 3 → 4 during the redesign (CSS is being rewritten anyway). Clears the last 7 `npm audit` findings: all trace to one `braces` DoS advisory (no patched version) via Tailwind 3's `chokidar` / `fast-glob` / `micromatch`. Build-time only; not reachable from the live site.
- [ ] **13.26** Restore linting: `next lint` was removed in Next 16, so `npm run lint` fails and no ESLint config exists. Add `eslint.config.mjs` (flat config with `eslint-config-next`) and change the script to `eslint .`. Note `eslint-config-next` carries the same `braces` advisory until upstream drops `fast-glob`.

## Phase 14: Verify & Hand Off ✅

> Target: Week 5, ~2 days.

- [ ] **14.1** Lighthouse mobile + desktop on `/`, `/services/[slug]`, `/projects/[slug]`, `/blog`. Target: Performance ≥ 90, TBT < 500 ms, no contrast/link-name failures.
- [ ] **14.2** Validate JSON-LD on all page types at validator.schema.org and Rich Results Test.
- [ ] **14.3** Confirm sitemap contains services; resubmit in Google Search Console + Bing.
- [ ] **14.4** Test the contact funnel end-to-end: form, booking link, email, WhatsApp.
- [ ] **14.5** Five-second test with 3 people outside tech: "What does this person sell, and for whom?"
- [ ] **14.6** Update success-criteria table in `docs/SITE_REVIEW_2026-10.md` with actuals.
- [ ] **14.7** Resume `GROWTH_PLAN.md` Phase 9 (content engine).
