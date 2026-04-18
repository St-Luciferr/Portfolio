import type { DBBlogPost, DBBlogTag } from '@/lib/types';
import type { BlogPost, BlogTag } from '@/types/frontend';

export function mapBlogTag(dbTag: DBBlogTag): BlogTag {
  return {
    id: dbTag.id,
    name: dbTag.name,
    slug: dbTag.slug,
  };
}

export function mapBlogPost(dbPost: DBBlogPost & { blog_tags?: DBBlogTag[] }): BlogPost {
  const tags = (dbPost.blog_tags || [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map(mapBlogTag);

  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    coverImageUrl: dbPost.cover_image_url,
    coverImageAlt: dbPost.cover_image_alt,
    readingTimeMinutes: dbPost.reading_time_minutes || 0,
    seo: {
      title: dbPost.seo_title ?? undefined,
      description: dbPost.seo_description ?? undefined,
      keywords: Array.isArray(dbPost.seo_keywords) ? dbPost.seo_keywords : [],
      canonicalUrl: dbPost.canonical_url ?? undefined,
    },
    publishedAt: dbPost.published_at,
    updatedAt: dbPost.updated_at,
    tags,
  };
}

export function mapBlogPosts(dbPosts: (DBBlogPost & { blog_tags?: DBBlogTag[] })[]): BlogPost[] {
  return dbPosts.map(mapBlogPost);
}
