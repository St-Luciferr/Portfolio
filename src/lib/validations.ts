import { z } from 'zod';

// ============================================
// PROJECT SCHEMAS
// ============================================

export const projectTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name too long'),
  color: z.string().min(1, 'Tag color is required'),
  display_order: z.number().int().min(0).optional(),
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
  subtitle: z.string().min(10, 'Subtitle must be at least 10 characters').max(1000, 'Subtitle too long'),
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
  bucket: z.enum(['projects', 'companies', 'technologies', 'services', 'testimonials', 'meta', 'resume']),
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
