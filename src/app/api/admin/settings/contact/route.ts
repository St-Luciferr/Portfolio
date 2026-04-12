import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from '@/lib/api/responses';
import { contactSettingsSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

/**
 * GET /api/admin/settings/contact
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
      .eq('key', 'contact')
      .single();

    if (error) throw error;

    return successResponse(data.value);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/admin/settings/contact
 */
export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const validated = contactSettingsSchema.parse(body);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_settings')
      .update({ value: validated })
      .eq('key', 'contact')
      .select('value')
      .single();

    if (error) throw error;

    revalidatePath('/');

    return successResponse(data.value);
  } catch (error) {
    return handleApiError(error);
  }
}
