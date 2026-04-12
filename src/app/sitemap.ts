import { MetadataRoute } from 'next';
import { projects } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((project) => ({
    url: `https://pandeysantosh.com.np/projects/${project.slug}`,
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
