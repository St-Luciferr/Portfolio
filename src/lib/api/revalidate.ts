import { revalidatePath } from 'next/cache';

/**
 * On-demand cache invalidation for admin writes.
 *
 * Pages also carry a time-based `revalidate` as a fallback (for seed scripts and
 * direct DB edits that bypass these routes). Route patterns with `'page'` mark
 * every matching page stale; each one re-renders lazily on its next visit, so this
 * stays cheap no matter how many slugs exist. Patterns also cover slug renames,
 * which a literal `/services/${slug}` call would miss.
 */

/** Pages that render service data: homepage cards, services index, detail pages, sitemap. */
export function revalidateServicePages() {
  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/services/[slug]', 'page');
  revalidatePath('/sitemap.xml');
}

/**
 * Pages that render project data: homepage grid, projects index, case studies
 * (including their related-project cards), service pages (linked case studies),
 * share images, and the sitemap.
 */
export function revalidateProjectPages() {
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/projects/[slug]', 'page');
  revalidatePath('/projects/[slug]/opengraph-image');
  revalidatePath('/services/[slug]', 'page');
  revalidatePath('/sitemap.xml');
}
