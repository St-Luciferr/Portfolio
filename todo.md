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

## Phase 8: Quick SEO Wins 🚀

> Target: Week 1. See [`docs/GROWTH_PLAN.md`](docs/GROWTH_PLAN.md#phase-8--quick-seo-wins-week-1-10-hours-total) for rationale.

- [ ] **8.1** Add canonical URL to homepage metadata in `src/app/page.tsx` — `alternates: { canonical: 'https://pandeysantosh.com.np' }`.
- [ ] **8.2** Include `/services` index + every `/services/[slug]` in `src/app/sitemap.ts` (priority 0.7, monthly).
- [ ] **8.3** Wrap `src/components/sections/Testimonials.tsx` cards with `Review` + `AggregateRating` JSON-LD; validate at [validator.schema.org](https://validator.schema.org/).
- [ ] **8.4** Add a third hero CTA "Browse Projects" → `/projects` in `src/components/sections/HeroCTAs.tsx`; emit `hero_cta_click: variant='projects'` analytics event.
- [ ] **8.5** Build dynamic OG images via `next/og`:
  - [ ] `src/app/blog/[slug]/opengraph-image.tsx`
  - [ ] `src/app/projects/[slug]/opengraph-image.tsx`
- [ ] **8.6** Add 5–8 FAQ Q&As + `FAQPage` JSON-LD on each `/services/[slug]` page (Q&As can be static array per service or new `service_faqs` column).
- [ ] **8.7** Record Lighthouse baseline (homepage, project detail, blog list, service detail) in `docs/GROWTH_PLAN.md` success-metrics table.
- [ ] **8.8** Verify site ownership in Google Search Console + Bing Webmaster; submit sitemap.

## Phase 9: Content Engine Launch ✍️

> Target: Weeks 2–6. 5 cornerstone posts + cross-linking.

### Cornerstone posts (1,800+ words each, ≥3 internal links, hero image, code samples)

- [ ] **9.1** Publish "RAG in production: 3 lessons from shipping a medical chatbot" → links to `/projects/medical-qa-chatbot`, `/services/rag-development`. Tags: `rag`, `production`, `healthcare`, `llm`.
- [ ] **9.2** Publish "Building WhatsApp bots with function calling: a practical guide" → links to `/projects/whatsapp-chatbot`, `/services/whatsapp-automation`. Tags: `whatsapp`, `openai`, `automation`.
- [ ] **9.3** Publish "Fine-tuning vs RAG: when to pick each" → links to both RAG case studies and `/services/rag-development`, `/services/ai-chatbot-development`. Tags: `rag`, `fine-tuning`, `llm`, `architecture`.
- [ ] **9.4** Publish "On-device ML with TensorFlow Lite: lessons from AMID" → links to `/projects/amid`, `/services/ml-deployment`. Tags: `mobile-ml`, `tflite`, `edge`.
- [ ] **9.5** Publish "Continual learning for production CV: avoiding catastrophic forgetting" → links to `/projects/continual-monument-detection`, `/services/ml-deployment`. Tags: `continual-learning`, `computer-vision`, `ewc`, `maml`.

### Cross-linking layer (after posts ship)

- [ ] **9.6** Build `RelatedProjectsByTags` server component and render at bottom of `src/app/blog/[slug]/page.tsx` (mirror existing `getRelatedProjects` pattern, match on tag overlap).
- [ ] **9.7** Add 1–2 inline links to relevant blog posts inside each project's `case_study_content` (edit `scripts/migrate-project-details.ts` then run `npm run db:migrate-details`).
- [ ] **9.8** Add "Related Reading" widget on each `/services/[slug]` listing 2–3 blog posts that share the service's primary technology tags.

### Validation

- [ ] **9.9** Verify all 5 posts indexed in Google Search Console; confirm each appears in `/sitemap.xml`.
- [ ] **9.10** Run [Rich Results Test](https://search.google.com/test/rich-results) on each post URL — `BlogPosting` + `BreadcrumbList` must validate.

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
