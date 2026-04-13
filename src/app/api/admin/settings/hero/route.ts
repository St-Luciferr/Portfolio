import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { heroSettingsSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

/**
 * GET /api/admin/settings/hero
 * Get hero section settings
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'hero')
      .single();

    if (error) throw error;

    return successResponse(data.value);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/admin/settings/hero
 * Update hero section settings
 */
export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const validated = heroSettingsSchema.parse(body);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_settings')
      .update({ value: validated })
      .eq('key', 'hero')
      .select('value')
      .single();

    if (error) throw error;

    // Revalidate home page
    revalidatePath('/');

    return successResponse(data.value);
  } catch (error) {
    return handleApiError(error);
  }
}
