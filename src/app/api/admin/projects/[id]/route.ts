import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  handleApiError,
} from '@/lib/api/responses';
import { updateProjectSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/projects/[id]
 * Get a single project by ID
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
      .from('projects')
      .select('*, project_tags(*)')
      .eq('id', id)
      .single();

    if (error || !data) {
      return notFoundResponse('Project not found');
    }

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/admin/projects/[id]
 * Update a project
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const body = await request.json();
    const validated = updateProjectSchema.parse({ ...body, id });

    const supabase = await createClient();

    // Separate tags from project data
    const { tags, id: projectId, ...projectData } = validated;

    // Update project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();

    if (projectError) throw projectError;

    // Update tags if provided
    if (tags) {
      // Delete existing tags
      await supabase.from('project_tags').delete().eq('project_id', id);

      // Insert new tags
      if (tags.length > 0) {
        const projectTags = tags.map((tag, index) => ({
          project_id: id,
          name: tag.name,
          color: tag.color,
          display_order: tag.display_order ?? index,
        }));

        const { error: tagsError } = await supabase
          .from('project_tags')
          .insert(projectTags);

        if (tagsError) throw tagsError;
      }
    }

    // Fetch the complete project with tags
    const { data: completeProject } = await supabase
      .from('projects')
      .select('*, project_tags(*)')
      .eq('id', id)
      .single();

    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${completeProject?.slug}`);

    return successResponse(completeProject);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Delete a project
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const supabase = await createClient();

    // Get project slug for revalidation
    const { data: project } = await supabase
      .from('projects')
      .select('slug')
      .eq('id', id)
      .single();

    // Delete project (tags will be deleted automatically via CASCADE)
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;

    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/projects');
    if (project?.slug) {
      revalidatePath(`/projects/${project.slug}`);
    }

    return successResponse({ message: 'Project deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
