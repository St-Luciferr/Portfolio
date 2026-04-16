import type { DBTestimonial } from '@/lib/types';
import type { Testimonial } from '@/types/frontend';

export function mapTestimonial(db: DBTestimonial): Testimonial {
  return {
    id: db.id,
    testimonial: db.testimonial,
    name: db.name,
    designation: db.designation,
    company: db.company,
    imageUrl: db.image_url,
  };
}

export function mapTestimonials(dbs: DBTestimonial[]): Testimonial[] {
  return dbs.map(mapTestimonial);
}
