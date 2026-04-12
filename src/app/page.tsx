'use client';

import dynamic from 'next/dynamic';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

// Lazy load below-the-fold sections for better performance
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="h-screen" />,
});
const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <div className="h-screen" />,
});
const Tech = dynamic(() => import('@/components/sections/Tech'), {
  loading: () => <div className="h-screen" />,
});
const Works = dynamic(() => import('@/components/sections/Works'), {
  loading: () => <div className="h-screen" />,
});
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="h-screen" />,
});

// Dynamic import for Stars canvas (background)
const StarsCanvas = dynamic(() => import('@/components/canvas/Stars'), {
  ssr: false,
});

// JSON-LD Structured Data
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
    'RAG',
    'LLM',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'QuickFox Consulting',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </main>
    </>
  );
}
