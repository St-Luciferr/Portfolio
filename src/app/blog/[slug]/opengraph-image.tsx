import { getPostBySlug } from '@/lib/services';
import { renderOgCard, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Santosh Pandey blog post';
export const size = ogSize;
export const contentType = ogContentType;
export const revalidate = 3600;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return renderOgCard({ eyebrow: 'Blog', title: 'Post not found' });
  }

  const meta = [
    post.readingTimeMinutes > 0 ? `${post.readingTimeMinutes} min read` : null,
    post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return renderOgCard({
    eyebrow: meta ? `Blog · ${meta}` : 'Blog',
    title: post.title,
    tags: post.tags.map((tag) => tag.name),
  });
}
