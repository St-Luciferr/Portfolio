# Portfolio Growth Plan (Phase 8+)

> **Created**: 2026-05-29
> **Status**: Active — task tracking lives in [`../todo.md`](../todo.md) Phases 8–11.
> **Predecessor**: SEO + client-acquisition work in `todo.md` Phases 1–7 (infrastructure complete).
> **Blocker (2026-10-13)**: Conversion audit in [`SITE_REVIEW_2026-10.md`](SITE_REVIEW_2026-10.md) found service pages 404 in production, no published proof, and mobile TBT of 16 s. Complete `todo.md` Phases 12–14 before resuming Phase 9.
> **Update (2026-10-13)**: Phase 8 deployed (PR #7). Service pages now return 200 in production. Still blocking Phase 9: no published proof (12.6–12.7), mobile TBT (12.9–12.13), canonical host (12.18). Phase 9 task targets were corrected for the consolidated service slugs; see the readiness note in `todo.md`.
> **Goal**: Move from publication-ready infrastructure to actually ranking and converting.

## Why this plan exists

Phases 1–7 built the machine: dynamic JSON-LD, ISR sitemap, blog pipeline, services routes, analytics, semantic HTML. None of that drives traffic on its own. Current organic traffic is estimated 20–30 visits/month — bottlenecked on **content depth** and **internal link density**, not technical SEO.

This plan turns the infrastructure into measurable traffic and qualified leads over 6 months.

## Success metrics (review monthly)

| Metric | Today (est.) | +90 days | +180 days |
| ------ | ------------ | -------- | --------- |
| Organic visits / month | 20–30 | 150–250 | 400–800 |
| Blog posts published | 0 | 8–10 | 16–20 |
| Indexed URLs (Search Console) | ~25 | ~60 | ~100 |
| Inbound contact-form submits / mo | <1 | 2–4 | 5–10 |
| Avg. session pages-per-session | ~1.4 | 1.8 | 2.2+ |
| Lighthouse SEO score | 100 | 100 | 100 |
| Lighthouse Performance (home, mobile) | 53 (2026-10-13) | ≥90 | ≥95 |

### Lighthouse baseline (task 8.7, recorded 2026-10-13)

Lighthouse 12 against production (`https://www.pandeysantosh.com.np`). Scores are Performance / Accessibility / Best Practices / SEO.

| Page | Form factor | Scores | LCP | TBT | CLS | Weight |
| ---- | ----------- | ------ | --- | --- | --- | ------ |
| `/` | Desktop | 59 / 92 / 96 / 100 | 1.1 s | 2,460 ms | 0 | 5.4 MB |
| `/` | Mobile | 53 / 92 / 96 / 100 | 3.0 s | 16,360 ms | 0 | 5.3 MB |
| `/projects/medical-qa-chatbot` | Desktop | 100 / 96 / 96 / 100 | 0.5 s | 10 ms | 0 | 612 KB |
| `/projects/medical-qa-chatbot` | Mobile | 89 / 96 / 96 / 100 | 2.8 s | 260 ms | 0 | 601 KB |
| `/blog` | Desktop | 100 / 98 / 96 / 100 | 0.5 s | 10 ms | 0 | 696 KB |
| `/blog` | Mobile | 89 / 98 / 96 / 100 | 2.6 s | 270 ms | 0 | 671 KB |
| `/services/[slug]` | — | not measurable: every service URL returns 404 in production (no slugs seeded) | | | | |

**Regression identified**: the homepage is the only page below 89. The difference is the two 3D models (~4.6 MB of GLB plus WebGL main-thread work). No CLS issues anywhere. Fix tracked in `todo.md` 12.9–12.13.

Track via Vercel Analytics + Google Search Console. Add Search Console verification meta tag if not already configured.

---

## Phase 8 — Quick SEO Wins (Week 1, ~10 hours total)

**Theme**: Capture available signal without writing new content.

| Task | Files | Acceptance criteria | Effort | Impact |
| ---- | ----- | ------------------- | ------ | ------ |
| 8.1 — Add canonical to homepage metadata | `src/app/page.tsx` | `generateMetadata` returns `alternates: { canonical: 'https://pandeysantosh.com.np' }` | 15 min | Prevents duplicate-content issues across `?ref=` and trailing-slash variants |
| 8.2 — Add `/services` and `/services/[slug]` to sitemap | `src/app/sitemap.ts` | Sitemap XML at `/sitemap.xml` includes all published services with `priority: 0.7` and `changeFrequency: 'monthly'` | 30 min | Service URLs get indexed; currently invisible to crawlers |
| 8.3 — Wrap Testimonials in `Review` + `AggregateRating` JSON-LD | `src/components/sections/Testimonials.tsx` | Page validates in [Schema.org validator](https://validator.schema.org/); `aggregateRating` reflects real counts | 1 hr | Eligible for review snippets in SERPs (+5–15% CTR on brand searches) |
| 8.4 — Add `/projects` link as third hero CTA | `src/components/sections/HeroCTAs.tsx`, `src/lib/validations.ts` (if CMS-driven) | Homepage above-fold shows: primary "Let's Work Together", "Browse Projects", "Download Resume" with analytics event `hero_cta_click: variant='projects'` | 45 min | Distributes internal link equity to project cluster |
| 8.5 — Generate dynamic OG images per post + project | New `src/app/blog/[slug]/opengraph-image.tsx` and `src/app/projects/[slug]/opengraph-image.tsx` using `next/og` | LinkedIn/Twitter share previews show post/project title rendered on branded background, not static `og-image.png` | 3 hr | Personalized previews increase social CTR ~20–40% |
| 8.6 — Add FAQ section + `FAQPage` JSON-LD on service pages | `src/app/services/[slug]/page.tsx`, optional new `service_faqs` DB table or JSON column | Each service page renders 5–8 Q&A pairs in `<details>` + matching JSON-LD; passes Rich Results test | 3 hr | Triggers "People Also Ask" SERP feature for service queries |
| 8.7 — Verify Lighthouse baseline | n/a (audit) | Run Lighthouse on homepage, `/projects/[slug]`, `/blog`, `/services/[slug]`. Record scores in this doc. Identify any CLS/LCP regressions. | 1 hr | Establishes performance baseline before content work |

**Definition of phase done**: All quick wins live in production; Search Console verified; Lighthouse baseline recorded.

---

## Phase 9 — Content Engine Launch (Weeks 2–6, ~50 hours total)

**Theme**: Publish 5 cornerstone posts that activate the blog → project → service cluster.

### Post pipeline

Each post needs: 1,800+ words, hero image, syntax-highlighted code samples, 3+ internal links (to ≥1 project + ≥1 service), tags, canonical, BlogPosting JSON-LD (already automatic via `/blog/[slug]` route).

| # | Title (working) | Primary keyword | Internal links | Effort |
| - | --------------- | --------------- | -------------- | ------ |
| 9.1 | "RAG in production: 3 lessons from shipping a medical chatbot" | rag production / rag systems production | `/projects/medical-qa-chatbot`, `/services/rag-systems` | 8 hr |
| 9.2 | "Building WhatsApp bots with function calling: a practical guide" | whatsapp chatbot openai | `/projects/whatsapp-chatbot`, `/services/whatsapp-automation` | 8 hr |
| 9.3 | "Fine-tuning vs RAG: when to pick each" | fine-tuning vs rag | both RAG case studies, `/services/rag-systems` | 10 hr |
| 9.4 | "On-device ML with TensorFlow Lite: lessons from AMID" | tensorflow lite mobile / on-device ml | ⚠️ no `amid` project; `ml-deployment` retired | 8 hr |
| 9.5 | "Continual learning for production CV: avoiding catastrophic forgetting" | continual learning production / ewc maml | `/projects/continual-monument-detection` (no matching offer) | 10 hr |

### Cross-linking layer (do after posts 9.1–9.5)

- 9.6 — Build a `RelatedProjectsByTags` server component used at the bottom of `/blog/[slug]` to fetch projects whose tags overlap with the post's tags. Reuses `getRelatedProjects` pattern. (~2 hr)
- 9.7 — Edit each existing case study's `case_study_content` (via `/admin/projects` or by extending `scripts/migrate-project-details.ts`) to add 1–2 inline links back to the relevant blog post in the **Approach** or **Results** section. (~2 hr)
- 9.8 — Add a "Related Reading" widget on each `/services/[slug]` listing 2–3 blog posts tagged with the service's primary technology. (~2 hr)

**Definition of phase done**: 5 posts indexed in Search Console; each project case study links to ≥1 post; each service page links to ≥2 posts; impressions in Search Console trend up week-over-week.

---

## Phase 10 — Conversion & E-E-A-T (Weeks 7–10, ~25 hours total)

**Theme**: Convert traffic into leads; strengthen authority signals Google's quality raters actually look for.

| Task | Files | Acceptance criteria | Effort |
| ---- | ----- | ------------------- | ------ |
| 10.1 — Quantify all case-study results | `scripts/migrate-project-details.ts`, then `npm run db:migrate-details` | Every project's **Results** section has ≥3 specific metrics (latency, accuracy, cost, time saved) — no vague language | 4 hr |
| 10.2 — Quantify About bio | `src/components/sections/About.tsx`, `src/lib/constants.ts`, hero settings via `/admin/settings` | Bio includes years of experience, # of production systems shipped, domains worked in, ≥1 standout metric | 1 hr |
| 10.3 — Add pricing tiers to service pages | `src/app/services/[slug]/page.tsx`, new fields in `services` table or JSON column | Each service shows 3 tiers (Starter / Production / Enterprise) with scope, timeline, starting price; "Get a Quote" CTA still present | 6 hr |
| 10.4 — Add process-timeline graphic per service | `src/app/services/[slug]/page.tsx` | Each service shows a week-by-week or milestone-based delivery flow (e.g., "Week 1: Discovery & data audit") | 3 hr |
| 10.5 — Build `/uses` page | New `src/app/uses/page.tsx` + sitemap entry | Page lists current stack (frameworks, models, hosting, tools) with 1–2 line *why* for each; linked from Navbar; passes Schema.org `ItemList` validation | 3 hr |
| 10.6 — Newsletter capture component | New `src/components/blog/NewsletterCTA.tsx`, new `newsletter_subscribers` Supabase table + RLS | Renders mid-post (after ~50% scroll) and end-of-post; double-opt-in via email confirmation; segmented by post tags | 6 hr |
| 10.7 — Set up Google Search Console + Bing Webmaster | env: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (already wired), Bing meta tag | Both consoles verified; sitemap submitted; coverage report reviewed | 1 hr |
| 10.8 — Add Person social proof to layout JSON-LD | `src/app/layout.tsx` | `sameAs` array includes GitHub, LinkedIn, Twitter/X, optional Mastodon; `alumniOf` populated; `knowsAbout` lists 5–8 primary technologies | 1 hr |

**Definition of phase done**: Pricing visible on every service page; case studies metric-dense; newsletter live with first signups; Search Console showing impressions across ≥10 unique queries.

---

## Phase 11 — Authority & Topical Hubs (Months 4–6, ~40 hours total)

**Theme**: Build a content moat. Move from "ranks for some long-tail queries" to "topical authority on RAG + production ML".

| Task | Acceptance criteria | Effort |
| ---- | ------------------- | ------ |
| 11.1 — Build `/guides` (or `/resources`) hub page | Curates 30–50 internal links grouped by topic (RAG, optimization, automation, mobile ML, backend). Added to Navbar + sitemap with `priority: 0.85`. Each topic header is an `h2` matching a target keyword cluster. | 6 hr |
| 11.2 — Publish 1 "definitive guide" cornerstone post | 4,000+ words, e.g., "The Complete Guide to RAG Evaluation". Acts as link target for all other RAG posts. | 16 hr |
| 11.3 — Outreach campaign | DM 20–30 dev creators/newsletter operators in RAG/ML space sharing the cornerstone post. Goal: 5+ inbound links from DR≥30 domains within 60 days. | 8 hr |
| 11.4 — Publish 4 more posts on cadence | 1 post every 2 weeks. Topics chosen from Search Console "impressions but no clicks" queries — i.e., respond to demand the site is already seeing. | 32 hr (parallel to outreach) |
| 11.5 — Add `/talks` or `/oss` page | Lists conference talks, open-source contributions, GitHub stats. Wires Person schema's `subjectOf` to link these. E-E-A-T signal Google quality raters explicitly check. | 4 hr |
| 11.6 — Audit and trim thin content | Review every URL by query coverage. Merge or `noindex` any page with <50 impressions over 90 days. Improves crawl budget allocation. | 3 hr |

**Definition of phase done**: At least 1 page ranking in top 10 for a primary keyword; 3+ inbound links from external dev blogs; Search Console showing 100+ unique queries.

---

## Sequencing rationale

Phases run roughly sequentially but with overlap:

```text
Week:   1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20+
Phase 8 ██
Phase 9    ████████████████
Phase 10                  ████████████
Phase 11                              ████████████████████████
```

- Phase 8 first because quick wins compound under everything else.
- Phase 9 before Phase 10 because content needs to exist before conversion optimization matters.
- Phase 10 before Phase 11 because authority-building outreach only works once there's something worth linking to.

## Risks and mitigations

| Risk | Mitigation |
| ---- | ---------- |
| Writing 5 posts feels overwhelming | Commit to 1 post / week, not 5 in week 1. Each post = expansion of an existing project's lessons, not net-new research. |
| Posts don't rank | That's fine for months 1–2. Indexation precedes ranking. Watch impressions, not position, in months 1–3. |
| Pricing tiers attract wrong leads | Anchor on "starting at"; keep "Custom" tier for enterprise. Pricing transparency reduces tire-kickers more than it scares away buyers. |
| Newsletter low signup | Doesn't matter for SEO. Even 10 subscribers in month 3 is fine — it's a long-term moat, not a conversion channel. |

## Review cadence

- **Weekly**: Update `todo.md` task statuses.
- **Monthly**: Update the success-metrics table at the top of this doc with actuals.
- **Quarterly**: Reassess phase ordering based on what's actually moving the needle in Search Console.

---

**Source of truth for tracking**: [`../todo.md`](../todo.md) Phases 8–11. This plan explains *why*; the todo tracks *what*.
