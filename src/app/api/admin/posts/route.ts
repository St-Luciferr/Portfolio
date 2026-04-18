import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { blogPostSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import readingTime from 'reading-time';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) return unauthorizedResponse(auth.error);

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, blog_tags(*)')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) return unauthorizedResponse(auth.error);

    const body = await request.json();
    const validated = blogPostSchema.parse(body);

    const supabase = await createClient();
    const { tags, ...postData } = validated;

    const minutes = Math.max(1, Math.round(readingTime(postData.content).minutes));
    const now = new Date().toISOString();

    const insertPayload = {
      ...postData,
      reading_time_minutes: minutes,
      published_at: postData.is_published ? now : null,
    };

    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert([insertPayload])
      .select()
      .single();

    if (postError) throw postError;

    if (tags && tags.length > 0) {
      const tagRows = tags.map((tag, index) => ({
        post_id: post.id,
        name: tag.name,
        slug: tag.slug,
        display_order: tag.display_order ?? index,
      }));
      const { error: tagError } = await supabase.from('blog_tags').insert(tagRows);
      if (tagError) throw tagError;
    }

    const { data: complete } = await supabase
      .from('blog_posts')
      .select('*, blog_tags(*)')
      .eq('id', post.id)
      .single();

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');

    return successResponse(complete, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
