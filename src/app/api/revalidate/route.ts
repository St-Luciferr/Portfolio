import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
  handleApiError,
} from '@/lib/api/responses';

/**
 * POST /api/revalidate
 * Manually trigger ISR revalidation for specific paths or tags
 *
 * Body:
 * - path?: string (e.g., '/', '/projects', '/projects/[slug]')
 * - tag?: string (e.g., 'projects', 'experiences')
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const { path, tag } = body;

    if (!path && !tag) {
      return errorResponse('Either path or tag is required');
    }

    if (path) {
      revalidatePath(path);
      return successResponse({
        message: `Path "${path}" revalidated successfully`,
        revalidated: true,
      });
    }

    if (tag) {
      revalidateTag(tag);
      return successResponse({
        message: `Tag "${tag}" revalidated successfully`,
        revalidated: true,
      });
    }

    return errorResponse('Invalid revalidation request');
  } catch (error) {
    return handleApiError(error);
  }
}
