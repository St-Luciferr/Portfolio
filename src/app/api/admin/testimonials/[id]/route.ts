import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  handleApiError,
} from '@/lib/api/responses';
import { updateTestimonialSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/testimonials/[id]
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return notFoundResponse('Testimonial not found');
    }

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/admin/testimonials/[id]
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const body = await request.json();
    const validated = updateTestimonialSchema.parse({ ...body, id });

    const supabase = await createClient();
    const { id: testimonialId, ...updateData } = validated;

    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/testimonials/[id]
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/');

    return successResponse({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
