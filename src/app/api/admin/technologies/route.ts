import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { technologySchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

/**
 * GET /api/admin/technologies
 * Get all technologies (including unpublished)
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/admin/technologies
 * Create a new technology
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const validated = technologySchema.parse(body);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('technologies')
      .insert([validated])
      .select()
      .single();

    if (error) throw error;

    // Revalidate home page
    revalidatePath('/');

    return successResponse(data, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
