import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Contact from '@/components/sections/Contact';
import { Offers } from '@/components/home/Offers';
import { FeaturedWork, pickFeatured } from '@/components/home/FeaturedWork';
import { Engagement } from '@/components/home/Engagement';
import { Proof } from '@/components/home/Proof';
import { AboutSection } from '@/components/home/AboutSection';
import { Writing } from '@/components/home/Writing';
import { StackStrip } from '@/components/home/StackStrip';
import { RevealObserver } from '@/components/home/RevealObserver';
import Footer from '@/components/layout/Footer';

import { SITE_URL } from '@/lib/site';
import {
  getPublishedProjects,
  getPublishedPosts,
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
  const [projects, posts, experiences, technologies, services, navLinks, settings, testimonials, selectedResults] =
    await Promise.all([
      getPublishedProjects(),
      getPublishedPosts(),
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
  const contactSettings = settings['contact'] || {};

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
      <main className="relative bg-primary">
        <Navbar navLinks={navLinks} bookingUrl={contactSettings.bookingUrl} />
        <Hero
          data={settings['hero']}
          bookingUrl={contactSettings.bookingUrl}
          availability={bioSettings.availability}
        />
        <StackStrip technologies={technologies} />
        <Offers services={services} />
        <FeaturedWork projects={pickFeatured(projects)} />
        <Engagement />
        <Proof
          testimonials={testimonials}
          metrics={selectedResults?.isEnabled ? selectedResults.metrics : []}
          heading={selectedResults?.heading}
          subheading={selectedResults?.subheading}
        />
        <AboutSection
          bio={bioSettings}
          name="Santosh Pandey"
          role={heroSettings.role || 'Full-Stack GenAI Developer'}
          experiences={experiences}
          resumeUrl={heroSettings.resumeUrl || '/cv.pdf'}
        />
        <Writing posts={posts} />
        <Contact
          data={settings['contact']}
          services={services.flatMap((s) => (s.slug ? [{ title: s.title, slug: s.slug }] : []))}
          socialLinks={settings['socialLinks']}
          bookingUrl={contactSettings.bookingUrl}
          whatsapp={contactSettings.whatsapp}
          availability={bioSettings.availability}
          location={bioSettings.location}
        />
      </main>
      <RevealObserver />
      <Footer
        socialLinks={settings['socialLinks']}
        navLinks={navLinks}
      />
    </>
  );
}
