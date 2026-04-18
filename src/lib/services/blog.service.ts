import { readerClient as supabase } from '@/lib/supabase/reader';
import type { DBBlogTag, DBBlogPost } from '@/lib/types';
import type { BlogPost, BlogTag } from '@/types/frontend';
import { mapBlogPosts, mapBlogPost, mapBlogTag } from '@/mappers';

function groupTagsByPost(tags: DBBlogTag[]): Record<string, DBBlogTag[]> {
  return tags.reduce(
    (acc, tag) => {
      if (!acc[tag.post_id]) acc[tag.post_id] = [];
      acc[tag.post_id].push(tag);
      return acc;
    },
    {} as Record<string, DBBlogTag[]>
  );
}

async function fetchTagsForPosts(postIds: string[]): Promise<DBBlogTag[]> {
  if (!postIds.length) return [];
  const { data, error } = await supabase
    .from('blog_tags')
    .select('*')
    .in('post_id', postIds)
    .order('display_order', { ascending: true });

  if (error) console.error('Error fetching blog tags:', error);
  return (data || []) as DBBlogTag[];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false });

  if (error || !posts?.length) {
    if (error) console.error('Error fetching posts:', error);
    return [];
  }

  const postIds = posts.map((p) => p.id);
  const tags = await fetchTagsForPosts(postIds);
  const tagsByPost = groupTagsByPost(tags);

  return mapBlogPosts(
    (posts as DBBlogPost[]).map((p) => ({ ...p, blog_tags: tagsByPost[p.id] || [] }))
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !post) {
    if (error && error.code !== 'PGRST116') console.error(`Error fetching post ${slug}:`, error);
    return null;
  }

  const tags = await fetchTagsForPosts([post.id]);
  return mapBlogPost({ ...(post as DBBlogPost), blog_tags: tags });
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('is_published', true);

  if (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
  return (data || []).map((p: { slug: string }) => p.slug);
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  // Find posts that have a blog_tag with this slug
  const { data: tagRows, error: tagErr } = await supabase
    .from('blog_tags')
    .select('post_id')
    .eq('slug', tagSlug);

  if (tagErr || !tagRows?.length) return [];
  const postIds = Array.from(new Set(tagRows.map((t: { post_id: string }) => t.post_id)));

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .in('id', postIds)
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false });

  if (error || !posts?.length) return [];

  const tags = await fetchTagsForPosts(posts.map((p) => p.id));
  const tagsByPost = groupTagsByPost(tags);

  return mapBlogPosts(
    (posts as DBBlogPost[]).map((p) => ({ ...p, blog_tags: tagsByPost[p.id] || [] }))
  );
}

export async function getAllPublishedTags(): Promise<BlogTag[]> {
  const { data: tagRows, error } = await supabase
    .from('blog_tags')
    .select('id, name, slug, post_id, display_order');

  if (error || !tagRows?.length) return [];

  // Filter to tags whose posts are published
  const postIds = Array.from(new Set(tagRows.map((t: { post_id: string }) => t.post_id)));
  const { data: publishedPosts } = await supabase
    .from('blog_posts')
    .select('id')
    .in('id', postIds)
    .eq('is_published', true);

  const publishedIds = new Set((publishedPosts || []).map((p: { id: string }) => p.id));

  // Dedupe by slug, keep earliest display_order
  const seen = new Map<string, BlogTag>();
  for (const t of tagRows as DBBlogTag[]) {
    if (!publishedIds.has(t.post_id)) continue;
    if (!seen.has(t.slug)) seen.set(t.slug, mapBlogTag(t));
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRelatedPosts(
  postId: string,
  tagSlugs: string[],
  limit = 3
): Promise<BlogPost[]> {
  if (!tagSlugs.length) return [];

  const { data: tagRows } = await supabase
    .from('blog_tags')
    .select('post_id')
    .in('slug', tagSlugs);

  if (!tagRows?.length) return [];

  const candidateIds = Array.from(
    new Set(
      tagRows
        .map((t: { post_id: string }) => t.post_id)
        .filter((id: string) => id !== postId)
    )
  );

  if (!candidateIds.length) return [];

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .in('id', candidateIds)
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !posts?.length) return [];

  const tags = await fetchTagsForPosts(posts.map((p) => p.id));
  const tagsByPost = groupTagsByPost(tags);

  return mapBlogPosts(
    (posts as DBBlogPost[]).map((p) => ({ ...p, blog_tags: tagsByPost[p.id] || [] }))
  );
}
