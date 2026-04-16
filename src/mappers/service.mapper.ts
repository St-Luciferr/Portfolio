/**
 * Service Data Mappers
 *
 * Transforms database service entities to frontend-friendly formats.
 */

import type { DBService } from '@/lib/types';
import type { Service } from '@/types/frontend';

/**
 * Map database service to frontend format
 */
export function mapService(dbService: DBService): Service {
  return {
    id: dbService.id,
    title: dbService.title,
    iconUrl: dbService.icon_url,
    slug: dbService.slug || null,
    summary: dbService.summary || null,
    description: dbService.description || null,
    process: dbService.process || [],
    benefits: dbService.benefits || [],
    toolsTechnologies: dbService.tools_technologies || [],
    deliverables: dbService.deliverables || [],
    pricingModel: dbService.pricing_model || null,
  };
}

/**
 * Map array of database services to frontend format
 */
export function mapServices(dbServices: DBService[]): Service[] {
  return dbServices.map(mapService);
}
