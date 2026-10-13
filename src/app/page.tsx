import type { Metadata } from 'next';
import Image from 'next/image';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SelectedResults from '@/components/sections/SelectedResults';
import Experience from '@/components/sections/Experience';
import Tech from '@/components/sections/Tech';
import Works from '@/components/sections/Works';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

import { SITE_URL } from '@/lib/site';
import {
  getPublishedProjects,
  getPublishedExperiences,
  getPublishedTechnologies,
  getPublishedServices,
  getPublishedNavLinks,
  getAllSiteSettings,
  getPublishedTestimonials,
  getSelectedResultsSettings,
} from '@/lib/services';


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
  const canonicalUrl = seoSettings.canonicalUrl || SITE_URL;
  const ogImage = seoSettings.ogImage || '/og-image.png';

  return {
    metadataBase: new URL(canonicalUrl),
    title: {
      default: title,
      template: `%s | ${heroSettings.name || 'Santosh Pandey'}`,
    },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
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
  const socialSettings = settings['socialLinks'] || {};
  const bioSettings = settings['bio'] || {};

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: heroSettings.name || 'Santosh Pandey',
    jobTitle: heroSettings.role || 'Machine Learning Engineer',
    url: seoSettings.canonicalUrl || SITE_URL,
    sameAs: [
      socialSettings.github,
      socialSettings.linkedin,
      socialSettings.twitter,
    ].filter(Boolean),
    knowsAbout: seoSettings.keywords || [],
    description: bioSettings.paragraphs?.[0] || '',
  };

  // Testimonials as schema.org Review entries about the Person.
  // No `reviewRating` / `AggregateRating`: testimonials carry no star score, and
  // inventing one would be a fabricated rating (and violates Google's review
  // snippet policy for self-serving reviews).
  const reviewsJsonLd =
    testimonials.length > 0
      ? {
          '@context': 'https://schema.org',
          '@graph': testimonials.map((t) => ({
            '@type': 'Review',
            reviewBody: t.testimonial,
            author: {
              '@type': 'Person',
              name: t.name,
              ...(t.designation && { jobTitle: t.designation }),
              ...(t.company && {
                worksFor: { '@type': 'Organization', name: t.company },
              }),
            },
            itemReviewed: {
              '@type': 'Person',
              name: jsonLd.name,
              url: jsonLd.url,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {reviewsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape `<` so testimonial text can never close the script tag.
            __html: JSON.stringify(reviewsJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <main className="relative z-0 bg-primary">
        {/* Hero background is the mobile LCP element: next/image + priority gets it
            preloaded and resized instead of waiting on CSS + hydration. */}
        <div className="relative isolate">
          {heroSettings.backgroundImageUrl && (
            <Image
              src={heroSettings.backgroundImageUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover object-center"
            />
          )}
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
        <Contact
          data={settings['contact']}
          services={services.flatMap((s) => (s.slug ? [{ title: s.title, slug: s.slug }] : []))}
          socialLinks={settings['socialLinks']}
        />
      </main>
      <Footer
        socialLinks={settings['socialLinks']}
        navLinks={navLinks}
        name={heroSettings.name}
      />
    </>
  );
}
