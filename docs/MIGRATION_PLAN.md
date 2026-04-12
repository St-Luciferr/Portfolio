# React to Next.js 14+ Migration Plan

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

### Phase 1: Project Setup

- [ ] Initialize Next.js 14+ project with TypeScript and Tailwind
  
  ```bash
  npx create-next-app@latest portfolio-nextjs --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
  ```

- [ ] Install dependencies

  ```bash
  npm install three @react-three/fiber @react-three/drei framer-motion maath \
              react-vertical-timeline-component react-parallax-tilt react-icons \
              @emailjs/browser
  npm install -D @types/three
  ```

- [ ] Configure tailwind.config.ts with custom theme
- [ ] Migrate global CSS (gradients, animations, hash-span)
- [ ] Set up folder structure

### Phase 2: Core Infrastructure

- [ ] Create `lib/types.ts` with TypeScript interfaces
- [ ] Migrate `lib/constants.ts` with typed data
- [ ] Migrate `lib/motion.ts` animation variants
- [ ] Migrate `lib/styles.ts` Tailwind utilities
- [ ] Create root `app/layout.tsx` with:
  - next/font Poppins configuration
  - Comprehensive metadata (OG, Twitter)
  - JSON-LD structured data
  - Viewport settings
- [ ] Configure `next.config.ts` for Three.js
- [ ] Set up environment variables

### Phase 3: Asset Migration & Optimization

- [ ] Apply Draco compression to GLTF models

  ```bash
  npx gltf-pipeline -i desktop_pc/scene.gltf -o desktop_pc/scene.gltf -d
  npx gltf-pipeline -i planet/scene.gltf -o planet/scene.gltf -d
  ```

- [ ] Organize images into public/images/ structure
- [ ] Create mobile fallback images for 3D scenes
- [ ] Create OG image (1200x630) for social sharing
- [ ] Update all asset import paths

### Phase 4: Component Migration

- [ ] Migrate Navbar (`'use client'`, next/link)
- [ ] Migrate SectionWrapper HOC (`'use client'`)
- [ ] Migrate Canvas components:
  - Add `'use client'` directive
  - Update GLTF paths to `/models/`
  - Add mobile detection for fallbacks
- [ ] Create Loader and MobileFallback components
- [ ] Migrate Hero section (server wrapper + dynamic 3D)
- [ ] Migrate About section with ServiceCards
- [ ] Migrate Experience section (timeline)
- [ ] Migrate Tech section with BallCanvas
- [ ] Migrate Works section with ProjectCards
- [ ] Migrate Contact section (form + EarthCanvas)
- [ ] Migrate StarsCanvas background

### Phase 5: Routing & SEO

- [ ] Create main `app/page.tsx` with all sections
- [ ] Create `app/projects/[slug]/page.tsx` for individual projects
- [ ] Implement `generateStaticParams()` for project pages
- [ ] Implement per-page metadata for project pages
- [ ] Create `app/robots.ts`
- [ ] Create `app/sitemap.ts`
- [ ] Add JSON-LD structured data

### Phase 6: Testing & Deployment

- [ ] Test all sections render correctly
- [ ] Test 3D components and mobile fallbacks
- [ ] Test hash navigation and project pages
- [ ] Test contact form with EmailJS
- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Build and verify: `npm run build`
- [ ] Deploy to Vercel
- [ ] Configure custom domain (pandeysantosh.com.np)

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
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (Person schema)
- [ ] Dynamic sitemap.xml
- [ ] Dynamic robots.txt
- [ ] Canonical URLs
- [ ] Alt text for all images

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
