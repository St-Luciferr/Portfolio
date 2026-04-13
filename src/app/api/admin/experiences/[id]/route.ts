import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  handleApiError,
} from '@/lib/api/responses';
import { updateExperienceSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/experiences/[id]
 * Get a single experience by ID
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
      .from('experiences')
      .select('*, experience_points(*)')
      .eq('id', id)
      .single();

    if (error || !data) {
      return notFoundResponse('Experience not found');
    }

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/admin/experiences/[id]
 * Update an experience
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const body = await request.json();
    const validated = updateExperienceSchema.parse({ ...body, id });

    const supabase = await createClient();

    // Separate points from experience data
    const { points, id: experienceId, ...experienceData } = validated;

    // Update experience
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .update(experienceData)
      .eq('id', id)
      .select()
      .single();

    if (experienceError) throw experienceError;

    // Update points if provided
    if (points) {
      // Delete existing points
      await supabase.from('experience_points').delete().eq('experience_id', id);

      // Insert new points
      if (points.length > 0) {
        const experiencePoints = points.map((point, index) => ({
          experience_id: id,
          point,
          display_order: index,
        }));

        const { error: pointsError } = await supabase
          .from('experience_points')
          .insert(experiencePoints);

        if (pointsError) throw pointsError;
      }
    }

    // Fetch the complete experience with points
    const { data: completeExperience } = await supabase
      .from('experiences')
      .select('*, experience_points(*)')
      .eq('id', id)
      .single();

    // Revalidate home page
    revalidatePath('/');

    return successResponse(completeExperience);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/experiences/[id]
 * Delete an experience
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const supabase = await createClient();

    // Delete experience (points will be deleted automatically via CASCADE)
    const { error } = await supabase.from('experiences').delete().eq('id', id);

    if (error) throw error;

    // Revalidate home page
    revalidatePath('/');

    return successResponse({ message: 'Experience deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
