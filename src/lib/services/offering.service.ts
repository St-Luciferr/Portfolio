/**
 * Service Offerings — portfolio service listings and their linked case studies.
 * Named "offering" to avoid collision with the Node/Next "service" concept.
 */
import { readerClient as supabase } from '@/lib/supabase/reader';
import type { DBService, DBProject, DBProjectTag } from '@/lib/types';
import type { Service, Project } from '@/types/frontend';
import { mapServices, mapProjects } from '@/mappers';

function groupTagsByProject(tags: DBProjectTag[]): Record<string, DBProjectTag[]> {
  return tags.reduce(
    (acc, tag) => {
      if (!acc[tag.project_id]) acc[tag.project_id] = [];
      acc[tag.project_id].push(tag);
      return acc;
    },
    {} as Record<string, DBProjectTag[]>
  );
}

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

  return mapServices(data || []);
}

export async function getPublishedServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) return null;

  return mapServices([data as DBService])[0] || null;
}

export async function getPublishedServiceSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('services')
    .select('slug')
    .eq('is_published', true)
    .not('slug', 'is', null);

  if (error) return [];
  return (data || []).map((s: { slug: string | null }) => s.slug).filter(Boolean) as string[];
}

export async function getServiceProjects(serviceId: string): Promise<Project[]> {
  const { data: links, error } = await supabase
    .from('service_projects')
    .select('project_id, display_order')
    .eq('service_id', serviceId)
    .order('display_order', { ascending: true });

  if (error || !links?.length) return [];

  const projectIds = links.map((l: { project_id: string }) => l.project_id);

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

  const tagsByProject = groupTagsByProject((tags || []) as DBProjectTag[]);

  const mapped = mapProjects(
    (projects as DBProject[]).map((p) => ({ ...p, tags: tagsByProject[p.id] || [] }))
  );

  const orderMap = links.reduce(
    (acc: Record<string, number>, l: { project_id: string }, idx: number) => {
      acc[l.project_id] = idx;
      return acc;
    },
    {} as Record<string, number>
  );

  return mapped.sort((a, b) => (orderMap[a.id] ?? 999) - (orderMap[b.id] ?? 999));
}
