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
