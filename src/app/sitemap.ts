import { MetadataRoute } from 'next';
import { getPublishedProjectSlugs } from '@/lib/services/project.service';
import {
  getAllPublishedTags,
  getPublishedPostSlugs,
  getPublishedPosts,
  getPublishedServiceSlugs,
} from '@/lib/services';
import { SITE_URL } from '@/lib/site';

// Regenerate hourly so services, projects, and posts published via the CMS
// appear without a redeploy (otherwise the sitemap is frozen at build time).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, posts, postSlugs, tags, serviceSlugs] = await Promise.all([
    getPublishedProjectSlugs(),
    getPublishedPosts(),
    getPublishedPostSlugs(),
    getAllPublishedTags(),
    getPublishedServiceSlugs(),
  ]);

  const lastModByPostSlug = new Map(posts.map((p) => [p.slug, p.updatedAt]));

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const serviceUrls = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postUrls = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: lastModByPostSlug.get(slug)
      ? new Date(lastModByPostSlug.get(slug)!)
      : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${SITE_URL}/blog/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Only list the services index once at least one service page is live,
    // otherwise it would advertise an empty page to crawlers.
    ...(serviceUrls.length > 0
      ? [
          {
            url: `${SITE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          },
        ]
      : []),
    ...serviceUrls,
    ...projectUrls,
    ...postUrls,
    ...tagUrls,
  ];
}
