/**
 * Navigation Data Mappers
 *
 * Transforms database navigation entities to frontend-friendly formats.
 */

import type { DBNavLink } from '@/lib/types';
import type { NavLink } from '@/types/frontend';

/**
 * Map database nav link to frontend format
 */
export function mapNavLink(dbNavLink: DBNavLink): NavLink {
  return {
    id: dbNavLink.id,
    linkId: dbNavLink.link_id,
    title: dbNavLink.title,
  };
}

/**
 * Map array of database nav links to frontend format
 */
export function mapNavLinks(dbNavLinks: DBNavLink[]): NavLink[] {
  return dbNavLinks.map(mapNavLink);
}
