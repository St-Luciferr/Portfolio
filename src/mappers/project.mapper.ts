/**
 * Project Data Mappers
 *
 * Transforms database project entities to frontend-friendly formats.
 * Handles field name transformations, default values, and data validation.
 */

import type { DBProject, DBProjectTag } from '@/lib/types';
import type { Project, ProjectTag, ProjectDetail } from '@/types/frontend';

/**
 * Map database project tag to frontend format
 */
export function mapProjectTag(dbTag: DBProjectTag): ProjectTag {
  return {
    id: dbTag.id,
    name: dbTag.name,
    color: dbTag.color,
  };
}

/**
 * Map database project to frontend format
 * Handles field name transformations and provides safe defaults
 */
export function mapProject(
  dbProject: DBProject & { tags?: DBProjectTag[] }
): Project {
  // Map tags
  const tags = (dbProject.tags || dbProject.project_tags || []).map(mapProjectTag);

  // Build project details with safe defaults
  const details: ProjectDetail = {
    eyebrow: dbProject.eyebrow || 'Project',
    summary: dbProject.summary || dbProject.description,
    problem: Array.isArray(dbProject.problem) ? dbProject.problem : [],
    solution: Array.isArray(dbProject.solution) ? dbProject.solution : [],
    features: Array.isArray(dbProject.features) ? dbProject.features : [],
    architecture: Array.isArray(dbProject.architecture) ? dbProject.architecture : [],
    results: Array.isArray(dbProject.results) ? dbProject.results : [],
    stack: Array.isArray(dbProject.stack) ? dbProject.stack : tags.map(t => t.name),
  };

  // Ensure image URL is never empty string (use placeholder)
  const imageUrl = dbProject.image_url?.trim() || '/images/placeholder-project.svg';

  return {
    id: dbProject.id,
    slug: dbProject.slug,
    name: dbProject.name,
    description: dbProject.description,
    imageUrl: imageUrl,
    sourceCodeLink: dbProject.source_code_link,
    demoUrl: dbProject.demo_url,
    isDemo: dbProject.is_demo,
    tags,
    details,
  };
}

/**
 * Map array of database projects to frontend format
 */
export function mapProjects(
  dbProjects: (DBProject & { tags?: DBProjectTag[] })[]
): Project[] {
  return dbProjects.map(mapProject);
}
