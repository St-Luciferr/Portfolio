/**
 * Technology Data Mappers
 *
 * Transforms database technology entities to frontend-friendly formats.
 */

import type { DBTechnology } from '@/lib/types';
import type { Technology } from '@/types/frontend';

/**
 * Map database technology to frontend format
 */
export function mapTechnology(dbTechnology: DBTechnology): Technology {
  return {
    id: dbTechnology.id,
    name: dbTechnology.name,
    iconUrl: dbTechnology.icon_url,
  };
}

/**
 * Map array of database technologies to frontend format
 */
export function mapTechnologies(dbTechnologies: DBTechnology[]): Technology[] {
  return dbTechnologies.map(mapTechnology);
}
