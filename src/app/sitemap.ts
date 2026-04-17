import { MetadataRoute } from 'next';
import { getPublishedProjectSlugs } from '@/lib/services/project.service';
import {
  getAllPublishedTags,
  getPublishedPostSlugs,
  getPublishedPosts,
} from '@/lib/services';

const SITE_URL = 'https://pandeysantosh.com.np';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, posts, postSlugs, tags] = await Promise.all([
    getPublishedProjectSlugs(),
    getPublishedPosts(),
    getPublishedPostSlugs(),
    getAllPublishedTags(),
  ]);

  const lastModByPostSlug = new Map(posts.map((p) => [p.slug, p.updatedAt]));

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
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
    ...projectUrls,
    ...postUrls,
    ...tagUrls,
  ];
}
