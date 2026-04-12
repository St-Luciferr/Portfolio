import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { experienceSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

/**
 * GET /api/admin/experiences
 * Get all experiences (including unpublished) for admin
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('experiences')
      .select('*, experience_points(*)')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/admin/experiences
 * Create a new experience
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const validated = experienceSchema.parse(body);

    const supabase = await createClient();

    // Separate points from experience data
    const { points, ...experienceData } = validated;

    // Insert experience
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .insert([experienceData])
      .select()
      .single();

    if (experienceError) throw experienceError;

    // Insert points
    if (points && points.length > 0) {
      const experiencePoints = points.map((point, index) => ({
        experience_id: experience.id,
        point,
        display_order: index,
      }));

      const { error: pointsError } = await supabase
        .from('experience_points')
        .insert(experiencePoints);

      if (pointsError) throw pointsError;
    }

    // Fetch the complete experience with points
    const { data: completeExperience } = await supabase
      .from('experiences')
      .select('*, experience_points(*)')
      .eq('id', experience.id)
      .single();

    // Revalidate home page
    revalidatePath('/');

    return successResponse(completeExperience, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
