import { readerClient as supabase } from '@/lib/supabase/reader';
import type { NavLink } from '@/types/frontend';
import { mapNavLinks } from '@/mappers';

export async function getPublishedNavLinks(): Promise<NavLink[]> {
  const { data, error } = await supabase
    .from('nav_links')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching navigation links:', error);
    return [];
  }

  return mapNavLinks(data || []);
}
