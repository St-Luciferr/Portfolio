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
  };
}

/**
 * Map array of database services to frontend format
 */
export function mapServices(dbServices: DBService[]): Service[] {
  return dbServices.map(mapService);
}
