import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const linkSchema = z.object({
  project_id: z.string().uuid(),
  display_order: z.number().int().min(0).optional().default(0),
});

/**
 * GET /api/admin/services/[id]/projects
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
      .from('service_projects')
      .select('project_id, display_order, projects(id, name, slug)')
      .eq('service_id', id)
      .order('display_order', { ascending: true });

    if (error) throw error;

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/admin/services/[id]/projects - Link a project to a service
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const body = await request.json();
    const validated = linkSchema.parse(body);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('service_projects')
      .insert([{ service_id: id, ...validated }])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');

    return successResponse(data, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/services/[id]/projects?project_id=... - Unlink a project
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');

    if (!projectId) {
      return handleApiError(new Error('project_id query param is required'));
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('service_projects')
      .delete()
      .eq('service_id', id)
      .eq('project_id', projectId);

    if (error) throw error;

    revalidatePath('/');

    return successResponse({ message: 'Project unlinked from service' });
  } catch (error) {
    return handleApiError(error);
  }
}
