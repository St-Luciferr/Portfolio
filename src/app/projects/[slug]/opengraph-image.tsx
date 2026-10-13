import { getPublishedProjectBySlug } from '@/lib/services';
import { getProjectDetailContent } from '@/lib/project-details';
import { renderOgCard, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Santosh Pandey case study';
export const size = ogSize;
export const contentType = ogContentType;
export const revalidate = 3600;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return renderOgCard({ eyebrow: 'Case Study', title: 'Project not found' });
  }

  const content = getProjectDetailContent(project);

  return renderOgCard({
    eyebrow: 'Case Study',
    title: project.name,
    subtitle: content.eyebrow,
    tags: project.tags.map((tag) => tag.name),
  });
}
