import { readerClient as supabase } from '@/lib/supabase/reader';
import type { DBTestimonial } from '@/lib/types';
import type { Testimonial } from '@/types/frontend';
import { mapTestimonials } from '@/mappers';

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return mapTestimonials((data || []) as DBTestimonial[]);
}
