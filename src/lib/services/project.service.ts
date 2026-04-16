import { readerClient as supabase } from '@/lib/supabase/reader';
import type { DBProjectTag } from '@/lib/types';
import type { Project } from '@/types/frontend';
import { mapProjects, mapProject } from '@/mappers';

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

async function fetchTagsForProjects(projectIds: string[]): Promise<DBProjectTag[]> {
  const { data, error } = await supabase
    .from('project_tags')
    .select('*')
    .in('project_id', projectIds)
    .order('display_order', { ascending: true });

  if (error) console.error('Error fetching project tags:', error);
  return (data || []) as DBProjectTag[];
}

export async function getPublishedProjects(): Promise<Project[]> {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error || !projects?.length) {
    if (error) console.error('Error fetching projects:', error);
    return [];
  }

  const projectIds = projects.map((p) => p.id);
  const tags = await fetchTagsForProjects(projectIds);
  const tagsByProject = groupTagsByProject(tags);

  return mapProjects(projects.map((p) => ({ ...p, tags: tagsByProject[p.id] || [] })));
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !project) {
    if (error) console.error(`Error fetching project ${slug}:`, error);
    return null;
  }

  const tags = await fetchTagsForProjects([project.id]);

  return mapProject({ ...project, tags });
}

export async function getRelatedProjects(projectId: string): Promise<Project[]> {
  const { data: relations, error } = await supabase
    .from('project_relations')
    .select('related_project_id, display_order')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true });

  if (error || !relations?.length) return [];

  const relatedIds = relations.map((r) => r.related_project_id);

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .in('id', relatedIds)
    .eq('is_published', true);

  if (projectsError || !projects?.length) return [];

  const tags = await fetchTagsForProjects(relatedIds);
  const tagsByProject = groupTagsByProject(tags);

  const mapped = mapProjects(projects.map((p) => ({ ...p, tags: tagsByProject[p.id] || [] })));

  const orderMap = relations.reduce(
    (acc, r, idx) => { acc[r.related_project_id] = idx; return acc; },
    {} as Record<string, number>
  );

  return mapped.sort((a, b) => (orderMap[a.id] ?? 999) - (orderMap[b.id] ?? 999));
}

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

  return (data || []).map((p) => p.slug);
}
