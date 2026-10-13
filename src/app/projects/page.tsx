import type { Metadata } from 'next';
import {
  getPublishedNavLinks,
  getPublishedProjects,
} from '@/lib/services';
import { SITE_URL } from '@/lib/site';

import ProjectsClient from './ProjectsClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI, machine learning, automation, backend, and full-stack projects by Santosh Pandey.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/projects`,
    title: 'Projects | Santosh Pandey',
    description:
      'Explore AI, RAG, automation, backend, and full-stack case studies by Santosh Pandey.',
  },
};

export default async function ProjectsPage() {
  const [projects, navLinks] = await Promise.all([
    getPublishedProjects(),
    getPublishedNavLinks(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects',
    url: `${SITE_URL}/projects`,
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.name,
      url: `${SITE_URL}/projects/${project.slug}`,
      description: project.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient projects={projects} navLinks={navLinks} />
    </>
  );
}
