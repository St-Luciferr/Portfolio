/**
 * Experience Data Mappers
 *
 * Transforms database experience entities to frontend-friendly formats.
 */

import type { DBExperience, DBExperiencePoint } from '@/lib/types';
import type { Experience, ExperiencePoint } from '@/types/frontend';

/**
 * Map database experience point to frontend format
 */
export function mapExperiencePoint(dbPoint: DBExperiencePoint): ExperiencePoint {
  return {
    id: dbPoint.id,
    text: dbPoint.point,
  };
}

/**
 * Map database experience to frontend format
 */
export function mapExperience(
  dbExperience: DBExperience & { points?: DBExperiencePoint[] }
): Experience {
  const points = (dbExperience.points || dbExperience.experience_points || []).map(
    mapExperiencePoint
  );

  return {
    id: dbExperience.id,
    title: dbExperience.title,
    companyName: dbExperience.company_name,
    iconUrl: dbExperience.icon_url,
    iconBgColor: dbExperience.icon_bg_color,
    date: dbExperience.date,
    points,
  };
}

/**
 * Map array of database experiences to frontend format
 */
export function mapExperiences(
  dbExperiences: (DBExperience & { points?: DBExperiencePoint[] })[]
): Experience[] {
  return dbExperiences.map(mapExperience);
}
