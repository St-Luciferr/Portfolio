/**
 * Frontend Data Types
 *
 * These types represent the data structure used by the frontend components.
 * They are decoupled from the database schema, allowing schema changes
 * without breaking the UI.
 */

// ============================================
// PROJECT TYPES
// ============================================

export interface ProjectTag {
  id: string;
  name: string;
  color: string;
}

export interface ProjectDetail {
  eyebrow: string;
  summary: string;
  problem: string[];
  solution: string[];
  features: string[];
  architecture: string[];
  results: string[];
  stack: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  sourceCodeLink: string;
  demoUrl: string | null;
  isDemo: boolean;
  tags: ProjectTag[];
  // Detail fields for case study page
  details: ProjectDetail;
}

// ============================================
// EXPERIENCE TYPES
// ============================================

export interface ExperiencePoint {
  id: string;
  text: string;
}

export interface Experience {
  id: string;
  title: string;
  companyName: string;
  iconUrl: string;
  iconBgColor: string;
  date: string;
  points: ExperiencePoint[];
}

// ============================================
// TECHNOLOGY TYPES
// ============================================

export interface Technology {
  id: string;
  name: string;
  iconUrl: string;
}

// ============================================
// SERVICE TYPES
// ============================================

export interface ServiceProcessStep {
  step: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  iconUrl: string;
  slug: string | null;
  summary: string | null;
  description: string | null;
  process: ServiceProcessStep[];
  benefits: string[];
  toolsTechnologies: string[];
  deliverables: string[];
  pricingModel: string | null;
}

// ============================================
// TESTIMONIAL TYPES
// ============================================

export interface Testimonial {
  id: string;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  imageUrl: string;
}

// ============================================
// SELECTED RESULTS TYPES
// ============================================

export interface SelectedResultMetric {
  label: string;
  value: string;
  context: string;
}

export interface SelectedResultsSettings {
  isEnabled: boolean;
  heading: string;
  subheading: string;
  metrics: SelectedResultMetric[];
}

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavLink {
  id: string;
  linkId: string;
  title: string;
}

// ============================================
// SITE SETTINGS TYPES
// ============================================

export interface HeroSettings {
  heading: string;
  name: string;
  role: string;
  tagLine: string;
  ctaText?: string;
  ctaURL?: string;
  backgroundImageUrl?: string;
  resumeUrl: string;
}

export interface BioSettings {
  paragraphs: string[];
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl?: string;
}

export interface ContactSettings {
  email: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export interface SiteSettings {
  hero: HeroSettings;
  bio: BioSettings;
  seo: SEOSettings;
  contact: ContactSettings;
  socialLinks: SocialLinks;
}
