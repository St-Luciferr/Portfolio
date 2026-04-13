import { MetadataRoute } from 'next';
import { getPublishedProjectSlugs } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getPublishedProjectSlugs();

  const projectUrls = projectSlugs.map((slug) => ({
    url: `https://pandeysantosh.com.np/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://pandeysantosh.com.np',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
