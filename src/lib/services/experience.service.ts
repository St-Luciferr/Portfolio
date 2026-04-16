import { readerClient as supabase } from '@/lib/supabase/reader';
import type { DBExperiencePoint } from '@/lib/types';
import type { Experience } from '@/types/frontend';
import { mapExperiences } from '@/mappers';

export async function getPublishedExperiences(): Promise<Experience[]> {
  const { data: experiences, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error || !experiences?.length) {
    if (error) console.error('Error fetching experiences:', error);
    return [];
  }

  const experienceIds = experiences.map((e) => e.id);

  const { data: points, error: pointsError } = await supabase
    .from('experience_points')
    .select('*')
    .in('experience_id', experienceIds)
    .order('display_order', { ascending: true });

  if (pointsError) console.error('Error fetching experience points:', pointsError);

  const pointsByExperience = ((points || []) as DBExperiencePoint[]).reduce(
    (acc, point) => {
      if (!acc[point.experience_id]) acc[point.experience_id] = [];
      acc[point.experience_id].push(point);
      return acc;
    },
    {} as Record<string, DBExperiencePoint[]>
  );

  return mapExperiences(
    experiences.map((e) => ({ ...e, points: pointsByExperience[e.id] || [] }))
  );
}
