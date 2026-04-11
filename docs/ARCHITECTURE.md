# Portfolio Architecture Documentation

## Overview

This document describes the architecture of the Next.js 14+ portfolio website, including component structure, rendering strategies, performance optimizations, and deployment configuration.

---

## Tech Stack

| Layer | Technology | Purpose |
| ------- | ------------ | --------- |
| Framework | Next.js 14+ | App Router, SSG, API routes |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| 3D Graphics | Three.js, React Three Fiber | WebGL rendering |
| Animations | Framer Motion | Motion animations |
| Forms | EmailJS | Contact form submission |
| Fonts | next/font (Poppins) | Optimized font loading |
| Images | next/image | Automatic optimization |
| Deployment | Vercel | Edge network, serverless |

---

## Component Architecture

### Server vs Client Components

Next.js App Router uses React Server Components by default. Components that need browser APIs or interactivity must be marked with `'use client'`.

```bash
                                    ┌─────────────────────────────┐
                                    │      app/layout.tsx         │
                                    │      (Server Component)     │
                                    │  - Metadata, fonts, shell   │
                                    └─────────────┬───────────────┘
                                                  │
                                    ┌─────────────▼───────────────┐
                                    │       app/page.tsx          │
                                    │      (Server Component)     │
                                    │  - Composes all sections    │
                                    └─────────────┬───────────────┘
                                                  │
              ┌──────────────┬────────────────────┼────────────────────┬──────────────┐
              │              │                    │                    │              │
    ┌─────────▼─────────┐   ┌▼────────────────┐  ┌▼────────────────┐  ┌▼────────────┐ │
    │     Navbar        │   │     Hero        │  │     About       │  │  Experience │ │
    │  (Client: state)  │   │ (Hybrid: 3D)    │  │ (Client: anim)  │  │(Client:anim)│ │
    └───────────────────┘   └─────────────────┘  └─────────────────┘  └─────────────┘ │
                                                                                       │
              ┌──────────────┬────────────────────┬────────────────────┬──────────────┘
              │              │                    │                    │
    ┌─────────▼─────────┐   ┌▼────────────────┐  ┌▼────────────────┐  ┌▼────────────┐
    │      Tech         │   │     Works       │  │    Contact      │  │ StarsCanvas │
    │  (Hybrid: 3D)     │   │ (Client: anim)  │  │ (Client: form)  │  │ (Client: 3D)│
    └───────────────────┘   └─────────────────┘  └─────────────────┘  └─────────────┘
```

### Component Classification

| Component | Type | Reason |
| ----------- | ------ | -------- |
| `layout.tsx` | Server | Static metadata, no interactivity |
| `page.tsx` | Server | Composes sections, passes data |
| `Navbar` | Client | useState for mobile menu toggle |
| `Hero` | Hybrid | Server wrapper, dynamic 3D import |
| `About` | Client | Framer Motion, react-parallax-tilt |
| `Experience` | Client | Timeline component, Framer Motion |
| `Tech` | Hybrid | Server data, dynamic BallCanvas |
| `Works` | Client | Framer Motion, tilt, useState |
| `Contact` | Client | Form state, EmailJS, 3D Earth |
| `StarsCanvas` | Client | Three.js animation loop |
| `SectionWrapper` | Client | Framer Motion HOC |
| All Canvas/* | Client | Three.js/WebGL requires browser |

### Hybrid Component Pattern

For sections with both static content and 3D elements:

```tsx
// components/sections/Hero.tsx (Server Component)
import dynamic from 'next/dynamic';

const ComputersCanvas = dynamic(
  () => import('@/components/canvas/Computers'),
  {
    ssr: false,
    loading: () => <MobileFallback image="/images/fallbacks/computer.webp" />
  }
);

export default function Hero() {
  return (
    <section>
      {/* Static content rendered on server */}
      <div className="...">
        <h1>Santosh Pandey</h1>
        <p>ML Engineer</p>
      </div>

      {/* 3D component loaded on client only */}
      <ComputersCanvas />
    </section>
  );
}
```

---

## Rendering Strategy

### Static Site Generation (SSG)

All pages are pre-rendered at build time:

```tsx
// app/page.tsx - Main page
export default function Home() {
  // Rendered at build time
  return (
    <main>
      <Hero />
      <About />
      {/* ... */}
    </main>
  );
}

// app/projects/[slug]/page.tsx - Dynamic routes
export async function generateStaticParams() {
  // Pre-render all project pages at build
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

### Client-Side Hydration

3D components are hydrated on the client:

1. Server sends HTML with placeholder/fallback
2. JavaScript bundle loads
3. React hydrates the page
4. 3D canvases initialize WebGL
5. Models load asynchronously

---

## Data Flow

### Constants & Configuration

```bash
lib/constants.ts
      │
      ├──► navLinks: NavLink[]
      │         └──► Navbar component
      │
      ├──► services: Service[]
      │         └──► About section (ServiceCards)
      │
      ├──► technologies: Technology[]
      │         └──► Tech section (BallCanvas)
      │
      ├──► experiences: Experience[]
      │         └──► Experience section (Timeline)
      │
      └──► projects: Project[]
                └──► Works section (ProjectCards)
                └──► /projects/[slug] pages
```

### TypeScript Interfaces

```typescript
// lib/types.ts

export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface Project {
  slug: string;            // URL-friendly identifier
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string;
  demo_url?: string;
}
```

---

## 3D Graphics Architecture

### Three.js Integration

```bash
                    ┌─────────────────────────────────────┐
                    │           React Application         │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │        @react-three/fiber           │
                    │    (React reconciler for Three.js)  │
                    └─────────────────┬───────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
┌────────▼────────┐        ┌──────────▼──────────┐      ┌─────────▼─────────┐
│  @react-three/  │        │      Three.js       │      │       maath       │
│      drei       │        │   (WebGL renderer)  │      │  (Math utilities) │
│  (Helpers/HOCs) │        │                     │      │                   │
└─────────────────┘        └─────────────────────┘      └───────────────────┘
```

### Canvas Components

```tsx
// Pattern for all canvas components

'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

function Model({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF('/models/desktop_pc/scene.gltf');

  return (
    <primitive
      object={scene}
      scale={isMobile ? 0.7 : 0.75}
      position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
    />
  );
}

export default function ComputersCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    setIsMobile(query.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  // Show fallback on mobile for performance
  if (isMobile) {
    return <MobileFallback image="/images/fallbacks/computer.webp" />;
  }

  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

// Preload model at module level
useGLTF.preload('/models/desktop_pc/scene.gltf');
```

### Performance Optimizations for 3D

1. **Demand Frame Loop**: Only render when scene changes

  ```tsx
   <Canvas frameLoop="demand" />
  ```

2. **Draco Compression**: Reduce GLTF size by 60-90%
  
  ```bash
  npx gltf-pipeline -i scene.gltf -o scene.gltf -d
  ```

3. **Model Preloading**: Cache models before render
  
  ```tsx
  useGLTF.preload('/models/desktop_pc/scene.gltf');
  ```

4. **Mobile Fallback**: Show static images on mobile

   ```tsx
   if (isMobile) return <Image src="/images/fallbacks/computer.webp" />;
   ```

5. **Suspense Boundaries**: Non-blocking loading

   ```tsx
   <Suspense fallback={<CanvasLoader />}>
     <Model />
   </Suspense>
   ```

---

## Animation System

### Framer Motion Variants

```typescript
// lib/motion.ts

import { Variants } from 'framer-motion';

export const textVariant = (delay?: number): Variants => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay: delay,
    },
  },
});

export const fadeIn = (
  direction: 'left' | 'right' | 'up' | 'down',
  type: string,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: 'easeOut',
    },
  },
});

export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});
```

### SectionWrapper HOC

```tsx
// components/hoc/SectionWrapper.tsx

'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';
import { styles } from '@/lib/styles';

export function SectionWrapper<P extends object>(
  Component: React.ComponentType<P>,
  idName: string
) {
  return function WrappedComponent(props: P) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    );
  };
}
```

---

## SEO Architecture

### Metadata API

```tsx
// app/layout.tsx

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://pandeysantosh.com.np'),
  title: {
    default: 'Santosh Pandey | ML Engineer & Full Stack Developer',
    template: '%s | Santosh Pandey',
  },
  description: 'Machine Learning Engineer passionate about Generative AI...',
  keywords: ['Machine Learning', 'Generative AI', 'NLP', 'Python', 'Django'],
  authors: [{ name: 'Santosh Pandey' }],
  creator: 'Santosh Pandey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pandeysantosh.com.np',
    siteName: 'Santosh Pandey Portfolio',
    title: 'Santosh Pandey | ML Engineer',
    description: 'ML Engineer building AI solutions...',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Santosh Pandey Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santosh Pandey | ML Engineer',
    description: 'ML Engineer building AI solutions...',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050816',
  width: 'device-width',
  initialScale: 1,
};
```

### JSON-LD Structured Data

```tsx
// app/page.tsx

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Santosh Pandey',
    jobTitle: 'Machine Learning Engineer',
    url: 'https://pandeysantosh.com.np',
    sameAs: [
      'https://github.com/St-Luciferr',
      'https://linkedin.com/in/santosh-pandey',
    ],
    knowsAbout: [
      'Machine Learning',
      'Generative AI',
      'Natural Language Processing',
      'Python',
      'Django',
      'FastAPI',
      'React',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-0 bg-primary">
        {/* Sections */}
      </main>
    </>
  );
}
```

### Dynamic Routes

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://pandeysantosh.com.np/sitemap.xml',
  };
}

// app/sitemap.ts
import { MetadataRoute } from 'next';
import { projects } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((project) => ({
    url: `https://pandeysantosh.com.np/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://pandeysantosh.com.np',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
```

---

## Performance Optimizations

### Image Optimization

```tsx
// Using next/image for automatic optimization
import Image from 'next/image';

<Image
  src="/images/projects/ragbot.webp"
  alt="Medical Q/A Chatbot"
  width={360}
  height={200}
  sizes="(max-width: 640px) 100vw, 360px"
  className="object-cover rounded-3xl"
  priority={false}  // Set true for above-the-fold images
/>
```

### Font Optimization

```tsx
// app/layout.tsx
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',  // Prevents FOIT
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">{children}</body>
    </html>
  );
}
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

// 3D components (SSR disabled)
const ComputersCanvas = dynamic(
  () => import('@/components/canvas/Computers'),
  { ssr: false }
);

// Below-the-fold sections
const Contact = dynamic(
  () => import('@/components/sections/Contact'),
  { loading: () => <ContactSkeleton /> }
);
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Or with @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## Environment Configuration

### Environment Variables

```bash
# .env.local (not committed to git)

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://pandeysantosh.com.np
```

### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile Three.js packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },

  // Webpack config for Three.js
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: 'three',
    };
    return config;
  },
};

export default nextConfig;
```

---

## Deployment

### Vercel Configuration

```json
// vercel.json (optional, most settings auto-detected)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["sin1"],  // Singapore for Nepal users
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Deployment Checklist

1. [ ] Set environment variables in Vercel dashboard
2. [ ] Configure custom domain (pandeysantosh.com.np)
3. [ ] Enable HTTPS
4. [ ] Set up analytics (optional)
5. [ ] Configure redirects if needed
6. [ ] Test production build locally: `npm run build && npm start`

---

## Directory Structure Summary

```bash
portfolio-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout, metadata, fonts
│   ├── page.tsx                 # Homepage with all sections
│   ├── globals.css              # Global styles
│   ├── loading.tsx              # Loading state
│   ├── not-found.tsx            # 404 page
│   ├── robots.ts                # Dynamic robots.txt
│   ├── sitemap.ts               # Dynamic sitemap
│   └── projects/[slug]/
│       └── page.tsx             # Individual project pages
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx           # Navigation (client)
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section (hybrid)
│   │   ├── About.tsx            # About section (client)
│   │   ├── Experience.tsx       # Timeline (client)
│   │   ├── Tech.tsx             # Tech stack (hybrid)
│   │   ├── Works.tsx            # Projects (client)
│   │   └── Contact.tsx          # Contact form (client)
│   ├── canvas/
│   │   ├── Computers.tsx        # Desktop 3D (client)
│   │   ├── Ball.tsx             # Tech balls (client)
│   │   ├── Earth.tsx            # Earth 3D (client)
│   │   └── Stars.tsx            # Stars background (client)
│   ├── hoc/
│   │   └── SectionWrapper.tsx   # Animation HOC (client)
│   └── ui/
│       ├── Loader.tsx           # Canvas loader
│       └── MobileFallback.tsx   # 3D fallback images
│
├── lib/
│   ├── constants.ts             # Data constants (typed)
│   ├── motion.ts                # Animation variants
│   ├── styles.ts                # Tailwind utilities
│   └── types.ts                 # TypeScript interfaces
│
├── public/
│   ├── models/                  # 3D models (GLTF)
│   ├── images/                  # Optimized images
│   ├── cv.pdf                   # Resume
│   └── og-image.png             # Social sharing image
│
├── docs/
│   ├── MIGRATION_PLAN.md        # Migration documentation
│   └── ARCHITECTURE.md          # This file
│
├── .env.local                   # Environment variables
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```
