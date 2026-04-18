import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  handleApiError,
} from '@/lib/api/responses';
import { updateBlogPostSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import readingTime from 'reading-time';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) return unauthorizedResponse(auth.error);

    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, blog_tags(*)')
      .eq('id', id)
      .single();

    if (error || !data) return notFoundResponse('Post not found');
    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) return unauthorizedResponse(auth.error);

    const { id } = await params;
    const body = await request.json();
    const validated = updateBlogPostSchema.parse({ ...body, id });

    const supabase = await createClient();
    const { tags, id: _postId, ...postData } = validated;

    const { data: existing, error: existingError } = await supabase
      .from('blog_posts')
      .select('published_at, slug')
      .eq('id', id)
      .single();

    if (existingError || !existing) return notFoundResponse('Post not found');

    const updatePayload: Record<string, unknown> = { ...postData };

    if (typeof postData.content === 'string') {
      updatePayload.reading_time_minutes = Math.max(
        1,
        Math.round(readingTime(postData.content).minutes)
      );
    }

    if (postData.is_published === true && !existing.published_at) {
      updatePayload.published_at = new Date().toISOString();
    }

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update(updatePayload)
      .eq('id', id);

    if (updateError) throw updateError;

    if (tags) {
      await supabase.from('blog_tags').delete().eq('post_id', id);

      if (tags.length > 0) {
        const tagRows = tags.map((tag, index) => ({
          post_id: id,
          name: tag.name,
          slug: tag.slug,
          display_order: tag.display_order ?? index,
        }));
        const { error: tagError } = await supabase.from('blog_tags').insert(tagRows);
        if (tagError) throw tagError;
      }
    }

    const { data: complete } = await supabase
      .from('blog_posts')
      .select('*, blog_tags(*)')
      .eq('id', id)
      .single();

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');
    if (complete?.slug) revalidatePath(`/blog/${complete.slug}`);
    if (existing.slug && existing.slug !== complete?.slug) {
      revalidatePath(`/blog/${existing.slug}`);
    }

    return successResponse(complete);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) return unauthorizedResponse(auth.error);

    const { id } = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');
    if (post?.slug) revalidatePath(`/blog/${post.slug}`);

    return successResponse({ message: 'Post deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
