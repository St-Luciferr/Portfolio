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

export interface Service {
  id: string;
  title: string;
  iconUrl: string;
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
  subtitle: string;
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
