/**
 * Settings Data Mappers
 *
 * Transforms database site settings to frontend-friendly formats.
 * Provides safe defaults for all settings.
 */

import type {
  SiteSettings,
  HeroSettings,
  BioSettings,
  SEOSettings,
  ContactSettings,
  SocialLinks,
} from '@/types/frontend';

/**
 * Map database site settings to typed frontend format
 * Provides safe defaults for all settings
 */
export function mapSiteSettings(dbSettings: Record<string, any>): SiteSettings {
  const hero: HeroSettings = {
    heading: dbSettings.hero?.heading || 'Hi, I\'m',
    tagLine: dbSettings.hero?.tagline || 'Building intelligent, real-world systems with GenAI, NLP, and scalable backend engineering.',
    name: dbSettings.hero?.name || 'Santosh',
    role: dbSettings.hero?.role || 'Full Stack Developer',
    ctaText: dbSettings.hero?.cta_text || 'Get in Touch',
    ctaURL: dbSettings.hero?.cta_url || '/contact',
    backgroundImageUrl: dbSettings.hero?.background_image_url,
    resumeUrl: dbSettings.hero?.resume_url || '/resume.pdf',
  };

  const bio: BioSettings = {
    paragraphs: Array.isArray(dbSettings.bio?.paragraphs)
      ? dbSettings.bio.paragraphs
      : ['No bio available'],
  };

  const seo: SEOSettings = {
    title: dbSettings.seo?.title || 'Portfolio',
    description: dbSettings.seo?.description || 'My portfolio website',
    keywords: Array.isArray(dbSettings.seo?.keywords)
      ? dbSettings.seo.keywords
      : [],
    ogImage: dbSettings.seo?.og_image || '/og-image.png',
  };

  const contact: ContactSettings = {
    email: dbSettings.contact?.email || 'contact@example.com',
  };

  const socialLinks: SocialLinks = {
    github: dbSettings.social_links?.github,
    linkedin: dbSettings.social_links?.linkedin,
    twitter: dbSettings.social_links?.twitter,
    ...dbSettings.social_links,
  };

  return {
    hero,
    bio,
    seo,
    contact,
    socialLinks,
  };
}

/**
 * Map a single site setting value
 * Useful for fetching individual settings
 */
export function mapSiteSetting<T = any>(key: string, value: any): T {
  // Add any specific transformations needed for individual settings
  return value as T;
}
