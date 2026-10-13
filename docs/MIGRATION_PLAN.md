# React to Next.js 14+ Migration Plan

> **Status (2026-05-29): ✅ COMPLETE.** The Vite → Next.js migration described
> below has shipped. The codebase now runs on Next.js 16, App Router,
> TypeScript, Tailwind, deployed on Vercel. Active work has moved to the
> SEO + client-acquisition roadmap tracked in [`../todo.md`](../todo.md) and
> documented in `PHASE1_COMPLETE.md`, `PHASE2_COMPLETE.md`,
> `PHASE3_COMPLETE.md`, and `PHASES_1-2-3_COMPLETE.md`. See the
> **Current Status** section at the bottom of this file for a verified
> implementation snapshot.

## Overview

This document outlines the comprehensive migration plan for converting the current Vite/React portfolio website to Next.js 14+ with App Router, TypeScript, and modern best practices.

## Migration Goals

1. **Framework Upgrade**: Migrate from Vite + React to Next.js 14+ App Router
2. **Type Safety**: Convert JavaScript to TypeScript
3. **SEO Optimization**: Implement comprehensive SEO with Metadata API, JSON-LD, sitemap
4. **Performance**: Optimize images, fonts, 3D assets, and code splitting
5. **Deployment**: Move from GitHub Pages to Vercel

---

## Current vs Target Stack

| Category | Current | Target |
| ---------- | --------- | -------- |
| Build Tool | Vite 8.0.8 | Next.js 14+ |
| Language | JavaScript (JSX) | TypeScript (TSX) |
| Routing | React Router DOM (hash) | Next.js App Router |
| Styling | Tailwind CSS 3.3.2 | Tailwind CSS 3.x/4.x |
| 3D Graphics | Three.js + R3F | Three.js + R3F (client) |
| Animations | Framer Motion | Framer Motion (client) |
| Font Loading | Google Fonts CDN | next/font |
| Image Optimization | Manual WebP | next/image |
| SEO | Basic meta tags | Metadata API + JSON-LD |
| Deployment | GitHub Pages | Vercel |

---

## New Folder Structure

```bash
/portfolio-nextjs/
├── app/
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Home page (all sections)
│   ├── globals.css             # Global styles
│   ├── loading.tsx             # Loading UI
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # Dynamic robots.txt
│   ├── sitemap.ts              # Dynamic sitemap
│   └── projects/
│       └── [slug]/
│           └── page.tsx        # Individual project pages
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # 'use client'
│   ├── sections/
│   │   ├── Hero.tsx            # Server + dynamic 3D import
│   │   ├── About.tsx           # 'use client' (motion/tilt)
│   │   ├── Experience.tsx      # 'use client' (timeline)
│   │   ├── Tech.tsx            # Server + dynamic 3D import
│   │   ├── Works.tsx           # 'use client' (motion/tilt)
│   │   └── Contact.tsx         # 'use client' (form + 3D)
│   ├── canvas/
│   │   ├── Computers.tsx       # 'use client', ssr: false
│   │   ├── Ball.tsx            # 'use client', ssr: false
│   │   ├── Earth.tsx           # 'use client', ssr: false
│   │   └── Stars.tsx           # 'use client', ssr: false
│   ├── hoc/
│   │   └── SectionWrapper.tsx  # 'use client'
│   └── ui/
│       ├── Loader.tsx
│       └── MobileFallback.tsx  # Static image fallback for 3D
│
├── lib/
│   ├── constants.ts            # Data with TypeScript types
│   ├── motion.ts               # Animation variants
│   ├── styles.ts               # Tailwind utilities
│   └── types.ts                # TypeScript interfaces
│
├── public/
│   ├── models/
│   │   ├── desktop_pc/         # Draco-compressed GLTF
│   │   └── planet/             # Draco-compressed GLTF
│   ├── images/
│   │   ├── tech/               # Technology icons
│   │   ├── company/            # Company logos
│   │   ├── projects/           # Project screenshots
│   │   └── fallbacks/          # Mobile 3D fallback images
│   ├── cv.pdf
│   └── og-image.png            # Social sharing image (1200x630)
│
├── docs/
│   ├── MIGRATION_PLAN.md       # This file
│   └── ARCHITECTURE.md         # Architecture documentation
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                  # Environment variables
└── package.json
```

---

## Migration Phases

### Phase 0: Documentation

- [x] Create `docs/MIGRATION_PLAN.md`
- [x] Create `docs/ARCHITECTURE.md`

### Phase 1: Project Setup ✅ COMPLETE

- [x] Initialize Next.js 14+ project with TypeScript and Tailwind
      (now on Next.js 16, React 19 — see `package.json`)
- [x] Install dependencies (Three.js, R3F, framer-motion, EmailJS, etc.)
- [x] Configure `tailwind.config.ts` with custom theme
- [x] Migrate global CSS (gradients, animations) — `src/app/globals.css`
- [x] Set up folder structure (`src/app`, `src/components`, `src/lib`)

### Phase 2: Core Infrastructure ✅ COMPLETE

- [x] Create `lib/types.ts` with TypeScript interfaces
- [x] Migrate `lib/constants.ts` with typed data
- [x] Migrate `lib/motion.ts` animation variants
- [x] Migrate `lib/styles.ts` Tailwind utilities
- [x] Create root `app/layout.tsx` with next/font, metadata, JSON-LD, viewport
- [x] Configure `next.config.mjs` for Three.js
- [x] Set up environment variables (`.env.example` committed)

### Phase 3: Asset Migration & Optimization ✅ COMPLETE

- [x] Apply Draco compression to GLTF models
- [x] Organize images into `public/images/` structure
- [x] Create mobile fallback images for 3D scenes
- [x] Create OG image (1200x630) — `public/og-image.png` + `.webp`
- [x] Update all asset import paths

### Phase 4: Component Migration ✅ COMPLETE

- [x] Migrate Navbar — `src/components/layout/Navbar.tsx`
- [x] Migrate SectionWrapper HOC — `src/components/hoc/SectionWrapper.tsx`
- [x] Migrate Canvas components (`'use client'`, dynamic, mobile fallbacks)
- [x] Loader + MobileFallback in `src/components/ui/`
- [x] Migrate all sections (Hero, About, Experience, Tech, Works, Contact)
- [x] StarsCanvas background

### Phase 5: Routing & SEO ✅ COMPLETE

- [x] Main `app/page.tsx` with all sections
- [x] `app/projects/[slug]/page.tsx` with `generateStaticParams()` and per-page metadata
- [x] `app/robots.ts` and `app/sitemap.ts`
- [x] JSON-LD structured data (Person on root, SoftwareApplication/CreativeWork + BreadcrumbList on project pages)

### Phase 6: Testing & Deployment ✅ COMPLETE

- [x] Sections render correctly
- [x] 3D components and mobile fallbacks verified
- [x] Hash navigation and project pages working
- [x] Contact form with EmailJS (validation added — no hardcoded fallbacks)
- [x] Deployed to Vercel with Web Analytics + Speed Insights
- [x] Custom domain configured (`pandeysantosh.com.np`)

---

## File Mapping

### Components

| Current File | New File |
| ------------- | ---------- |
| `src/App.jsx` | `app/page.tsx` |
| `src/components/Navbar.jsx` | `components/layout/Navbar.tsx` |
| `src/components/Hero.jsx` | `components/sections/Hero.tsx` |
| `src/components/About.jsx` | `components/sections/About.tsx` |
| `src/components/Experience.jsx` | `components/sections/Experience.tsx` |
| `src/components/Tech.jsx` | `components/sections/Tech.tsx` |
| `src/components/Works.jsx` | `components/sections/Works.tsx` |
| `src/components/Contact.jsx` | `components/sections/Contact.tsx` |
| `src/components/Feedbacks.jsx` | `components/sections/Feedbacks.tsx` |
| `src/components/Loader.jsx` | `components/ui/Loader.tsx` |
| `src/components/canvas/*.jsx` | `components/canvas/*.tsx` |
| `src/hoc/SectionWrapper.jsx` | `components/hoc/SectionWrapper.tsx` |

### Utilities & Config

| Current File | New File |
| ------------- | ---------- |
| `src/constants/index.js` | `lib/constants.ts` |
| `src/utils/motion.js` | `lib/motion.ts` |
| `src/styles.js` | `lib/styles.ts` |
| `src/index.css` | `app/globals.css` |
| `tailwind.config.js` | `tailwind.config.ts` |
| `vite.config.js` | `next.config.ts` |

### Assets

| Current Location | New Location |
| ----------------- | -------------- |
| `public/desktop_pc/` | `public/models/desktop_pc/` |
| `public/planet/` | `public/models/planet/` |
| `src/assets/tech/` | `public/images/tech/` |
| `src/assets/company/` | `public/images/company/` |
| `src/assets/*.{jpg,png,webp}` | `public/images/projects/` |
| `src/assets/herobg.webp` | `public/images/herobg.webp` |

---

## Environment Variables

Create `.env.local`:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_1p99x0j
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_epwmplk
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=-OvhlkkzMKUz5pjMs

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://pandeysantosh.com.np

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Key Considerations

### 3D Component Strategy

All Three.js components must:

1. Use `'use client'` directive
2. Be wrapped in dynamic imports with `ssr: false`
3. Include mobile detection for fallback images
4. Handle WebGL context properly

```tsx
// Pattern for 3D components
const ComputersCanvas = dynamic(
  () => import('@/components/canvas/Computers'),
  {
    ssr: false,
    loading: () => <MobileFallback image="/images/fallbacks/computer.webp" />
  }
);
```

### Mobile Performance

- 3D models (~13MB total) are heavy for mobile
- Show static fallback images on mobile devices
- Use media query detection: `(max-width: 768px)`
- Consider reduced motion preferences

### SEO Checklist

- [x] Title and description meta tags
- [x] Open Graph tags (og:title, og:description, og:image)
- [x] Twitter Card tags
- [x] JSON-LD structured data (Person on root; SoftwareApplication/CreativeWork + BreadcrumbList on `/projects/[slug]`; BlogPosting on `/blog/[slug]`)
- [x] Dynamic sitemap.xml (includes projects + blog posts + tag pages)
- [x] Dynamic robots.txt
- [x] Canonical URLs (per project, per post)
- [x] Alt text for all images

---

## Success Metrics

| Metric | Target |
| -------- | -------- |
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| 3D Model Load Time | < 3s (with Draco) |

---

## Rollback Plan

If critical issues arise:

1. Keep original repository intact on `main` branch
2. Development happens on `refactor/nextjs` branch
3. Only merge after full testing and verification
4. GitHub Pages deployment remains available as fallback

---

## Timeline Reference

This migration is organized into phases but without strict time estimates. Progress depends on complexity encountered during implementation.

**Priority Order:**

1. Core setup and infrastructure
2. Component migration (most work)
3. SEO implementation
4. Testing and deployment

---

## Current Status (verified 2026-05-29)

The Next.js migration above is complete and live. Post-migration work has
followed the SEO + client-acquisition plan in [`../todo.md`](../todo.md).
Implementation has been verified by reading the source — not just the
phase-complete docs.

### Post-migration phases (from `todo.md`)

| Phase | Scope | Status | Key evidence |
| ----- | ----- | ------ | ------------ |
| 1 — Quick Wins | Hero CTAs, role/tagline, security, OG image | ✅ Complete | `src/components/sections/Hero.tsx`, `HeroSettings.tsx`, `Contact.tsx`, `layout.tsx` |
| 2 — Project SEO | Canonical, OG, JSON-LD, breadcrumbs | ✅ Complete | `src/app/projects/[slug]/page.tsx` (metadata + JSON-LD blocks) |
| 3 — Case Studies | 6× expanded case studies + related projects | ✅ Complete | `getRelatedProjects()` in service layer; Related Projects UI at `projects/[slug]/page.tsx:334-367` |
| 4 — Services & Conversion | Service pages, Selected Results, Testimonials | ✅ Complete | `src/app/services/`, `SelectedResults.tsx`, `Testimonials.tsx`; migrations 005, 006 |
| 5 — Contact & Lead Qual | Subject field, response-time, footer | ✅ Complete (scoped) | `Contact.tsx`, `src/components/layout/Footer.tsx` |
| 6 — Content Hub (Blog) | `/blog` infra: list, post, tag, admin CRUD, JSON-LD, sitemap | ✅ Infra complete | `src/app/blog/*`, `src/app/api/admin/posts/*`, migration 007, `src/lib/markdown.ts` |
| 7 — Analytics | Vercel Analytics + custom events | ✅ Complete | `AnalyticsProvider.tsx` (excludes `/admin` via `beforeSend`); `HeroCTAs.tsx`, `ProjectCTAs.tsx`, `Contact.tsx` |

### Database state

Migrations in `supabase/migrations/`:

- `001_initial_schema.sql` — base schema
- `002_add_project_details.sql` — case-study fields
- `003_standardize_hero_fields.sql` — `tagline` rename + CTA fields
- `004_add_related_projects.sql` — `project_relations` table
- `005_enhance_services.sql` — richer services schema
- `006_add_selected_results.sql` — homepage proof section
- `007_add_blog.sql` — `blog_posts` + `blog_tags` with RLS

### What's still genuinely open

- **Phase 3 (optional)**: Screenshots / architecture diagrams for case studies — pending real assets.
- **Phase 5 (deferred)**: Calendly / booking link; server-side contact submission with spam protection. Revisit if inbound volume grows.
- **Phase 6 — content authoring**: 5 articles drafted in `todo.md` are still to be written via `/admin/blog`. Infra is ready and waiting.

### Source-of-truth note

Going forward, treat **[`../todo.md`](../todo.md)** as the live tracker for
remaining portfolio work. This file (`MIGRATION_PLAN.md`) is now historical
reference for the framework migration only — do not add new phases here.
