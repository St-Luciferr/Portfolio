import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SelectedResults from '@/components/sections/SelectedResults';
import Experience from '@/components/sections/Experience';
import Tech from '@/components/sections/Tech';
import Works from '@/components/sections/Works';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

import {
  getPublishedProjects,
  getPublishedExperiences,
  getPublishedTechnologies,
  getPublishedServices,
  getPublishedNavLinks,
  getAllSiteSettings,
  getPublishedTestimonials,
  getSelectedResultsSettings,
} from '@/lib/data';

// Dynamic import for Stars canvas (background - client component)
const StarsCanvas = dynamic(() => import('@/components/canvas/Stars'));

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate dynamic metadata from database
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAllSiteSettings();

  const seoSettings = settings['seo'] || {};
  const heroSettings = settings['hero'] || {};

  const title = seoSettings.title || 'Santosh Pandey | ML Engineer & Full Stack Developer';
  const description = seoSettings.description || 'Machine Learning Engineer passionate about Generative AI, NLP, and intelligent automation.';
  const keywords = seoSettings.keywords || [];
  const canonicalUrl = seoSettings.canonical_url || 'https://pandeysantosh.com.np';
  const ogImage = seoSettings.og_image || '/og-image.png';

  return {
    metadataBase: new URL(canonicalUrl),
    title: {
      default: title,
      template: `%s | ${heroSettings.name || 'Santosh Pandey'}`,
    },
    description,
    keywords,
    authors: [{ name: heroSettings.name || 'Santosh Pandey' }],
    creator: heroSettings.name || 'Santosh Pandey',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: `${heroSettings.name || 'Santosh Pandey'} Portfolio`,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${heroSettings.name || 'Santosh Pandey'} - ${heroSettings.role || 'ML Engineer'} Portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
}

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [projects, experiences, technologies, services, navLinks, settings, testimonials, selectedResults] =
    await Promise.all([
      getPublishedProjects(),
      getPublishedExperiences(),
      getPublishedTechnologies(),
      getPublishedServices(),
      getPublishedNavLinks(),
      getAllSiteSettings(),
      getPublishedTestimonials(),
      getSelectedResultsSettings(),
    ]);

  // Build JSON-LD structured data from settings
  const heroSettings = settings['hero'] || {};
  const seoSettings = settings['seo'] || {};
  const socialSettings = settings['social_links'] || {};
  const bioSettings = settings['bio'] || {};
  const backgroundImage = heroSettings.background_image_url
    ? { backgroundImage: `url(${heroSettings.background_image_url})` }
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: heroSettings.name || 'Santosh Pandey',
    jobTitle: heroSettings.role || 'Machine Learning Engineer',
    url: seoSettings.canonical_url || 'https://pandeysantosh.com.np',
    sameAs: [
      socialSettings.github,
      socialSettings.linkedin,
      socialSettings.twitter,
    ].filter(Boolean),
    knowsAbout: seoSettings.keywords || [],
    description: bioSettings.paragraphs?.[0] || '',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-0 bg-primary">
        <div
          className="bg-cover bg-no-repeat bg-center"
          style={backgroundImage}
        >
          <Navbar navLinks={navLinks} />
          <Hero data={settings['hero']} />
        </div>
        <About data={settings['bio']} services={services} />
        {selectedResults?.isEnabled && (
          <SelectedResults
            heading={selectedResults.heading}
            subheading={selectedResults.subheading}
            metrics={selectedResults.metrics}
          />
        )}
        <Experience experiences={experiences} />
        <Tech technologies={technologies} />
        <Works projects={projects} />
        <Testimonials testimonials={testimonials} />
        <div className="relative z-0">
          <Contact data={settings['contact']} />
          <StarsCanvas />
        </div>
      </main>
    </>
  );
}
