import { readerClient as supabase } from '@/lib/supabase/reader';
import type { Technology } from '@/types/frontend';
import { mapTechnologies } from '@/mappers';

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

  return mapTechnologies(data || []);
}
