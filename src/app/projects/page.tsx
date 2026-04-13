import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  getPublishedNavLinks,
  getPublishedProjects,
} from '@/lib/data';

const ProjectsClient = dynamic(() => import('./ProjectsClient'), {
  ssr: true,
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI, machine learning, automation, backend, and full-stack projects by Santosh Pandey.',
  alternates: {
    canonical: 'https://pandeysantosh.com.np/projects',
  },
  openGraph: {
    type: 'website',
    url: 'https://pandeysantosh.com.np/projects',
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
    url: 'https://pandeysantosh.com.np/projects',
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.name,
      url: `https://pandeysantosh.com.np/projects/${project.slug}`,
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
