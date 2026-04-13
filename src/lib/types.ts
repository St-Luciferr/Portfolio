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

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
  demo_url?: boolean;
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

// ============================================
// DATABASE ENTITY TYPES
// ============================================

export interface DBProject {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  source_code_link: string;
  demo_url: string | null;
  is_demo: boolean;
  is_published: boolean;
  display_order: number;
  // Project detail fields
  eyebrow: string | null;
  summary: string | null;
  problem: string[];
  solution: string[];
  features: string[];
  architecture: string[];
  results: string[];
  stack: string[];
  created_at: string;
  updated_at: string;
  project_tags?: DBProjectTag[];
}

export interface DBProjectTag {
  id: string;
  project_id: string;
  name: string;
  color: string;
  display_order: number;
}

export interface DBExperience {
  id: string;
  title: string;
  company_name: string;
  icon_url: string;
  icon_bg_color: string;
  date: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  experience_points?: DBExperiencePoint[];
}

export interface DBExperiencePoint {
  id: string;
  experience_id: string;
  point: string;
  display_order: number;
}

export interface DBTechnology {
  id: string;
  name: string;
  icon_url: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DBService {
  id: string;
  title: string;
  icon_url: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DBTestimonial {
  id: string;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image_url: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DBNavLink {
  id: string;
  link_id: string;
  title: string;
  is_published: boolean;
  display_order: number;
}

export interface DBSiteSettings {
  id: string;
  key: string;
  value: unknown;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  hero: {
    heading: string;
    name: string;
    subtitle: string;
    background_image_url?: string;
    resume_url: string;
  };
  bio: {
    paragraphs: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    og_image: string;
  };
  contact: {
    email: string;
  };
  social_links: {
    github: string;
    linkedin: string;
    [key: string]: string;
  };
}

// Helper type for creating new entities (without id, timestamps)
export type CreateProject = Omit<DBProject, 'id' | 'created_at' | 'updated_at'> & {
  tags: Array<Omit<DBProjectTag, 'id' | 'project_id'>>;
};

export type CreateExperience = Omit<DBExperience, 'id' | 'created_at' | 'updated_at'> & {
  points: string[];
};

export type CreateTechnology = Omit<DBTechnology, 'id' | 'created_at' | 'updated_at'>;
export type CreateService = Omit<DBService, 'id' | 'created_at' | 'updated_at'>;
export type CreateTestimonial = Omit<DBTestimonial, 'id' | 'created_at' | 'updated_at'>;
