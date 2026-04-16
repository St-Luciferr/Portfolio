import { createClient } from '@supabase/supabase-js';
import type {
  DBProject,
  DBProjectTag,
  DBExperience,
  DBExperiencePoint,
  DBTechnology,
  DBService,
  DBTestimonial,
  DBSiteSettings,
  DBNavLink,
} from './types';
import type {
  Project,
  Experience,
  Technology,
  Service,
  Testimonial,
  SelectedResultsSettings,
  NavLink,
  SiteSettings,
} from '@/types/frontend';
import {
  mapProjects,
  mapProject,
  mapExperiences,
  mapTechnologies,
  mapServices,
  mapTestimonials,
  mapNavLinks,
  mapSiteSettings,
} from '@/mappers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Fetch all published projects with their tags
 * Returns frontend-formatted project data
 */
export async function getPublishedProjects(): Promise<Project[]> {
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (projectsError) {
    console.error('Error fetching projects:', projectsError);
    return [];
  }

  if (!projects || projects.length === 0) {
    return [];
  }

  // Fetch tags for all projects
  const projectIds = projects.map((p) => p.id);
  const { data: tags, error: tagsError } = await supabase
    .from('project_tags')
    .select('*')
    .in('project_id', projectIds)
    .order('display_order', { ascending: true });

  if (tagsError) {
    console.error('Error fetching tags:', tagsError);
  }

  // Group tags by project_id
  const tagsByProject = (tags || []).reduce(
    (acc, tag) => {
      if (!acc[tag.project_id]) {
        acc[tag.project_id] = [];
      }
      acc[tag.project_id].push(tag);
      return acc;
    },
    {} as Record<string, DBProjectTag[]>
  );

  // Combine projects with their tags
  const projectsWithTags = projects.map((project) => ({
    ...project,
    tags: tagsByProject[project.id] || [],
  }));

  // Map to frontend format
  return mapProjects(projectsWithTags);
}

/**
 * Fetch a single published project by slug with its tags
 * Returns frontend-formatted project data
 */
export async function getPublishedProjectBySlug(
  slug: string
): Promise<Project | null> {
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (projectError) {
    console.error(`Error fetching project ${slug}:`, projectError);
    return null;
  }

  const { data: tags, error: tagsError } = await supabase
    .from('project_tags')
    .select('*')
    .eq('project_id', project.id)
    .order('display_order', { ascending: true });

  if (tagsError) {
    console.error(`Error fetching tags for project ${slug}:`, tagsError);
  }

  const projectWithTags = {
    ...project,
    tags: tags || [],
  };

  // Map to frontend format
  return mapProject(projectWithTags);
}

/**
 * Fetch related projects for a given project
 * Returns frontend-formatted project data for related projects
 */
export async function getRelatedProjects(projectId: string): Promise<Project[]> {
  // Fetch project relations
  const { data: relations, error: relationsError } = await supabase
    .from('project_relations')
    .select('related_project_id, relation_type')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true });

  if (relationsError || !relations || relations.length === 0) {
    return [];
  }

  // Fetch the related projects with their tags
  const relatedProjectIds = relations.map(r => r.related_project_id);

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .in('id', relatedProjectIds)
    .eq('is_published', true);

  if (projectsError || !projects) {
    return [];
  }

  // Fetch tags for all related projects
  const { data: tags, error: tagsError } = await supabase
    .from('project_tags')
    .select('*')
    .in('project_id', relatedProjectIds)
    .order('display_order', { ascending: true });

  if (tagsError) {
    console.error('Error fetching tags for related projects:', tagsError);
  }

  // Group tags by project_id
  const tagsByProject = (tags || []).reduce(
    (acc, tag) => {
      if (!acc[tag.project_id]) {
        acc[tag.project_id] = [];
      }
      acc[tag.project_id].push(tag);
      return acc;
    },
    {} as Record<string, DBProjectTag[]>
  );

  // Combine projects with their tags
  const projectsWithTags = projects.map((project) => ({
    ...project,
    tags: tagsByProject[project.id] || [],
  }));

  // Map to frontend format and sort by original relation order
  const mappedProjects = mapProjects(projectsWithTags);

  // Sort according to the relation display_order
  const projectOrder = relations.reduce((acc, rel, idx) => {
    acc[rel.related_project_id] = idx;
    return acc;
  }, {} as Record<string, number>);

  return mappedProjects.sort((a, b) => {
    const orderA = projectOrder[a.id] ?? 999;
    const orderB = projectOrder[b.id] ?? 999;
    return orderA - orderB;
  });
}

/**
 * Fetch published project slugs for static route generation and sitemaps
 */
export async function getPublishedProjectSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('slug')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }

  return (data || []).map((project) => project.slug);
}

/**
 * Fetch all published experiences with their points
 * Returns frontend-formatted experience data
 */
export async function getPublishedExperiences(): Promise<Experience[]> {
  const { data: experiences, error: experiencesError } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (experiencesError) {
    console.error('Error fetching experiences:', experiencesError);
    return [];
  }

  if (!experiences || experiences.length === 0) {
    return [];
  }

  // Fetch points for all experiences
  const experienceIds = experiences.map((e) => e.id);
  const { data: points, error: pointsError } = await supabase
    .from('experience_points')
    .select('*')
    .in('experience_id', experienceIds)
    .order('display_order', { ascending: true });

  if (pointsError) {
    console.error('Error fetching experience points:', pointsError);
  }

  // Group points by experience_id
  const pointsByExperience = (points || []).reduce(
    (acc, point) => {
      if (!acc[point.experience_id]) {
        acc[point.experience_id] = [];
      }
      acc[point.experience_id].push(point);
      return acc;
    },
    {} as Record<string, DBExperiencePoint[]>
  );

  // Combine experiences with their points
  const experiencesWithPoints = experiences.map((experience) => ({
    ...experience,
    points: pointsByExperience[experience.id] || [],
  }));

  // Map to frontend format
  return mapExperiences(experiencesWithPoints);
}

/**
 * Fetch all published technologies
 * Returns frontend-formatted technology data
 */
export async function getPublishedTechnologies(): Promise<Technology[]> {
  const { data, error } = await supabase
    .from('technologies')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }

  // Map to frontend format
  return mapTechnologies(data || []);
}

/**
 * Fetch all published services
 * Returns frontend-formatted service data
 */
export async function getPublishedServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  // Map to frontend format
  return mapServices(data || []);
}

/**
 * Fetch all published testimonials
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return mapTestimonials((data || []) as DBTestimonial[]);
}

/**
 * Fetch a single published service by slug
 */
export async function getPublishedServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return mapServices([data as DBService])[0] || null;
}

/**
 * Fetch published service slugs for static route generation
 */
export async function getPublishedServiceSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('services')
    .select('slug')
    .eq('is_published', true)
    .not('slug', 'is', null);

  if (error) return [];
  return (data || []).map((s: { slug: string | null }) => s.slug).filter(Boolean) as string[];
}

/**
 * Fetch projects linked to a service via service_projects junction table
 */
export async function getServiceProjects(serviceId: string): Promise<Project[]> {
  const { data: links, error } = await supabase
    .from('service_projects')
    .select('project_id, display_order')
    .eq('service_id', serviceId)
    .order('display_order', { ascending: true });

  if (error || !links?.length) return [];

  const projectIds = links.map((l: { project_id: string; display_order: number }) => l.project_id);

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .in('id', projectIds)
    .eq('is_published', true);

  if (projectsError || !projects?.length) return [];

  const { data: tags } = await supabase
    .from('project_tags')
    .select('*')
    .in('project_id', projectIds)
    .order('display_order', { ascending: true });

  const tagsByProject = ((tags || []) as DBProjectTag[]).reduce(
    (acc, tag) => {
      if (!acc[tag.project_id]) acc[tag.project_id] = [];
      acc[tag.project_id].push(tag);
      return acc;
    },
    {} as Record<string, DBProjectTag[]>
  );

  const projectsWithTags = (projects as DBProject[]).map((p) => ({
    ...p,
    tags: tagsByProject[p.id] || [],
  }));

  const mapped = mapProjects(projectsWithTags);

  const orderMap = links.reduce(
    (acc: Record<string, number>, l: { project_id: string }, idx: number) => {
      acc[l.project_id] = idx;
      return acc;
    },
    {} as Record<string, number>
  );

  return mapped.sort((a, b) => (orderMap[a.id] ?? 999) - (orderMap[b.id] ?? 999));
}

/**
 * Fetch selected results settings for the homepage proof section
 */
export async function getSelectedResultsSettings(): Promise<SelectedResultsSettings | null> {
  const settings = await getSiteSettings(['selected_results']);
  const raw = settings['selected_results'];
  if (!raw) return null;

  return {
    isEnabled: raw.is_enabled ?? true,
    heading: raw.heading || 'Selected Results',
    subheading: raw.subheading || '',
    metrics: (raw.metrics || []).map((m: { label?: string; value?: string; context?: string }) => ({
      label: m.label || '',
      value: m.value || '',
      context: m.context || '',
    })),
  };
}

/**
 * Fetch published navigation links
 * Returns frontend-formatted nav link data
 */
export async function getPublishedNavLinks(): Promise<NavLink[]> {
  const { data, error } = await supabase
    .from('nav_links')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching navigation links:', error);
    return [];
  }

  // Map to frontend format
  return mapNavLinks(data || []);
}

/**
 * Fetch a specific site setting by key
 */
export async function getSiteSetting(key: string): Promise<DBSiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }

  return data;
}

/**
 * Fetch multiple site settings by keys
 */
export async function getSiteSettings(keys: string[]): Promise<Record<string, any>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .in('key', keys);

  if (error) {
    console.error('Error fetching settings:', error);
    return {};
  }

  // Convert array to key-value object
  return (data || []).reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    },
    {} as Record<string, any>
  );
}

/**
 * Fetch all site settings
 * Returns frontend-formatted site settings
 */
export async function getAllSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase.from('site_settings').select('*');

  if (error) {
    console.error('Error fetching all settings:', error);
    return mapSiteSettings({});
  }

  // Convert array to key-value object
  const settingsMap = (data || []).reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    },
    {} as Record<string, any>
  );

  // Map to frontend format
  return mapSiteSettings(settingsMap);
}
