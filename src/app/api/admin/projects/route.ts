import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { projectSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

/**
 * GET /api/admin/projects
 * Get all projects (including unpublished) for admin
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*, project_tags(*)')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/admin/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const validated = projectSchema.parse(body);

    const supabase = await createClient();

    // Separate tags from project data
    const { tags, ...projectData } = validated;

    // Insert project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (projectError) throw projectError;

    // Insert tags
    if (tags && tags.length > 0) {
      const projectTags = tags.map((tag, index) => ({
        project_id: project.id,
        name: tag.name,
        color: tag.color,
        display_order: tag.display_order ?? index,
      }));

      const { error: tagsError } = await supabase
        .from('project_tags')
        .insert(projectTags);

      if (tagsError) throw tagsError;
    }

    // Fetch the complete project with tags
    const { data: completeProject } = await supabase
      .from('projects')
      .select('*, project_tags(*)')
      .eq('id', project.id)
      .single();

    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/projects');

    return successResponse(completeProject, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
