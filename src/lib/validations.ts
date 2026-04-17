import { z } from 'zod';

// ============================================
// PROJECT SCHEMAS
// ============================================

export const projectTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name too long'),
  color: z.string().min(1, 'Tag color is required'),
  display_order: z.number().int().min(0).optional(),
});

export const projectArrayItemSchema = z.object({
  value: z.string().min(1).max(1000),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  name: z.string().min(1, 'Project name is required').max(200, 'Project name too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description too long'),
  image_url: z.string().url('Invalid image URL'),
  source_code_link: z.string().url('Invalid source code URL'),
  demo_url: z.string().url('Invalid demo URL').nullable().optional(),
  is_demo: z.boolean().default(false),
  is_published: z.boolean().default(true),
  display_order: z.number().int().min(0),
  tags: z.array(projectTagSchema).min(1, 'At least one tag is required'),
  // Project detail fields
  eyebrow: z.string().max(100, 'Eyebrow too long').optional(),
  summary: z.string().max(2000, 'Summary too long').optional(),
  problem: z.array(projectArrayItemSchema).default([]).transform(arr => arr.map(item => item.value)),
  solution: z.array(projectArrayItemSchema).default([]).transform(arr => arr.map(item => item.value)),
  features: z.array(projectArrayItemSchema).default([]).transform(arr => arr.map(item => item.value)),
  architecture: z.array(projectArrayItemSchema).default([]).transform(arr => arr.map(item => item.value)),
  results: z.array(projectArrayItemSchema).default([]).transform(arr => arr.map(item => item.value)),
  stack: z.array(projectArrayItemSchema).default([]).transform(arr => arr.map(item => item.value)),
});

export const updateProjectSchema = projectSchema.partial().extend({
  id: z.string().uuid(),
});

// ============================================
// EXPERIENCE SCHEMAS
// ============================================

export const experienceSchema = z.object({
  title: z.string().min(1, 'Job title is required').max(200, 'Title too long'),
  company_name: z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
  icon_url: z.string().url('Invalid icon URL'),
  icon_bg_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color (e.g., #E6DEDD)'),
  date: z.string().min(1, 'Date is required').max(100, 'Date too long'),
  is_published: z.boolean().default(true),
  display_order: z.number().int().min(0),
  points: z
    .array(z.string().min(1, 'Point cannot be empty').max(500, 'Point too long'))
    .min(1, 'At least one point is required'),
});

export const updateExperienceSchema = experienceSchema.partial().extend({
  id: z.string().uuid(),
});

// ============================================
// TECHNOLOGY SCHEMAS
// ============================================

export const technologySchema = z.object({
  name: z.string().min(1, 'Technology name is required').max(100, 'Name too long'),
  icon_url: z.string().url('Invalid icon URL'),
  is_published: z.boolean().default(true),
  display_order: z.number().int().min(0),
});

export const updateTechnologySchema = technologySchema.partial().extend({
  id: z.string().uuid(),
});

// ============================================
// SERVICE SCHEMAS
// ============================================

export const serviceSchema = z.object({
  title: z.string().min(1, 'Service title is required').max(200, 'Title too long'),
  icon_url: z.string().url('Invalid icon URL'),
  is_published: z.boolean().default(true),
  display_order: z.number().int().min(0),
});

export const updateServiceSchema = serviceSchema.partial().extend({
  id: z.string().uuid(),
});

// ============================================
// TESTIMONIAL SCHEMAS
// ============================================

export const testimonialSchema = z.object({
  testimonial: z
    .string()
    .min(10, 'Testimonial must be at least 10 characters')
    .max(1000, 'Testimonial too long'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  designation: z.string().min(1, 'Designation is required').max(100, 'Designation too long'),
  company: z.string().min(1, 'Company is required').max(100, 'Company name too long'),
  image_url: z.string().url('Invalid image URL'),
  is_published: z.boolean().default(true),
  display_order: z.number().int().min(0),
});

export const updateTestimonialSchema = testimonialSchema.partial().extend({
  id: z.string().uuid(),
});

// ============================================
// SITE SETTINGS SCHEMAS
// ============================================

export const heroSettingsSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(100, 'Heading too long'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  role: z.string().min(1, 'Role is required').max(200, 'Role too long'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters').max(1000, 'Tagline too long'),
  cta_text: z.string().min(1, 'CTA text is required').max(50, 'CTA text too long'),
  cta_url: z.string().min(1, 'CTA URL is required'),
  background_image_url: z.string().url('Invalid background image URL').optional(),
  resume_url: z
    .string()
    .min(1, 'Resume URL is required')
    .refine(
      (value) => value.startsWith('/') || z.string().url().safeParse(value).success,
      'Invalid resume URL'
    ),
});

export const bioSettingsSchema = z.object({
  paragraphs: z
    .array(z.string().min(10, 'Paragraph must be at least 10 characters').max(2000, 'Paragraph too long'))
    .min(1, 'At least one paragraph is required'),
});

export const seoSettingsSchema = z.object({
  title: z.string().min(1, 'SEO title is required').max(200, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  keywords: z.array(z.string().min(1).max(50)).min(1, 'At least one keyword is required'),
  og_image: z.string().url('Invalid OG image URL'),
});

export const contactSettingsSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const socialLinksSchema = z.object({
  github: z.string().url('Invalid GitHub URL').optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  twitter: z.string().url('Invalid Twitter URL').optional(),
}).catchall(z.string().url());

// ============================================
// NAV LINK SCHEMAS
// ============================================

export const navLinkSchema = z.object({
  link_id: z
    .string()
    .min(1, 'Link ID is required')
    .max(50, 'Link ID too long')
    .regex(/^[a-z0-9-]+$/, 'Link ID must contain only lowercase letters, numbers, and hyphens'),
  title: z.string().min(1, 'Title is required').max(50, 'Title too long'),
  is_published: z.boolean().default(true),
  display_order: z.number().int().min(0),
});

export const updateNavLinkSchema = navLinkSchema.partial().extend({
  id: z.string().uuid(),
});

// ============================================
// BLOG POST SCHEMAS
// ============================================

export const blogTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name too long'),
  slug: z
    .string()
    .min(1, 'Tag slug is required')
    .max(60, 'Tag slug too long')
    .regex(/^[a-z0-9-]+$/, 'Tag slug must contain only lowercase letters, numbers, and hyphens'),
  display_order: z.number().int().min(0).optional(),
});

export const blogPostSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(140, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(320, 'Excerpt too long (keep under ~160 chars for best SEO)'),
  content: z.string().min(1, 'Content is required'),
  cover_image_url: z.string().url('Invalid cover image URL').nullable().optional(),
  cover_image_alt: z.string().max(200, 'Alt text too long').nullable().optional(),
  // SEO overrides (all optional)
  seo_title: z.string().max(80, 'SEO title too long').nullable().optional(),
  seo_description: z.string().max(200, 'SEO description too long').nullable().optional(),
  seo_keywords: z.array(z.string().min(1).max(60)).default([]),
  canonical_url: z.string().url('Invalid canonical URL').nullable().optional(),
  is_published: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0),
  tags: z.array(blogTagSchema).default([]),
});

export const updateBlogPostSchema = blogPostSchema.partial().extend({
  id: z.string().uuid(),
});

export type BlogPostSchema = z.infer<typeof blogPostSchema>;
export type BlogTagSchema = z.infer<typeof blogTagSchema>;

// ============================================
// REORDER SCHEMA (for drag-and-drop)
// ============================================

export const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().uuid(),
      display_order: z.number().int().min(0),
    })
  ),
});

// ============================================
// FILE UPLOAD SCHEMA
// ============================================

export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  bucket: z.enum(['projects', 'companies', 'technologies', 'services', 'testimonials', 'meta', 'resume', 'blog']),
});

// Type exports for TypeScript inference
export type ProjectSchema = z.infer<typeof projectSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type TechnologySchema = z.infer<typeof technologySchema>;
export type ServiceSchema = z.infer<typeof serviceSchema>;
export type TestimonialSchema = z.infer<typeof testimonialSchema>;
export type HeroSettingsSchema = z.infer<typeof heroSettingsSchema>;
export type BioSettingsSchema = z.infer<typeof bioSettingsSchema>;
export type SEOSettingsSchema = z.infer<typeof seoSettingsSchema>;
export type ContactSettingsSchema = z.infer<typeof contactSettingsSchema>;
export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;
export type NavLinkSchema = z.infer<typeof navLinkSchema>;
