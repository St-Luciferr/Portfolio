import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { reorderSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

/**
 * PUT /api/admin/projects/reorder
 * Reorder projects (for drag-and-drop)
 */
export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const validated = reorderSchema.parse(body);

    const supabase = await createClient();

    // Update display_order for each project
    const updates = validated.items.map((item) =>
      supabase
        .from('projects')
        .update({ display_order: item.display_order })
        .eq('id', item.id)
    );

    await Promise.all(updates);

    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/projects');

    return successResponse({ message: 'Projects reordered successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
