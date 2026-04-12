import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/api/auth';
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
  handleApiError,
} from '@/lib/api/responses';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * POST /api/admin/upload
 * Upload a file to Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = (formData.get('bucket') as string) || 'projects';

    if (!file) {
      return errorResponse('No file provided');
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse(
        `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return errorResponse(
        `File too large. Maximum size is ${MAX_SIZE / (1024 * 1024)}MB`
      );
    }

    const supabase = await createClient();

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${bucket}/${fileName}`;

    // Upload file to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { data, error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: '31536000', // 1 year
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);

    return successResponse({
      url: publicUrl,
      path: filePath,
      fileName,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/upload
 * Delete a file from Supabase Storage
 */
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await verifyAdmin(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { filePath } = await request.json();

    if (!filePath) {
      return errorResponse('File path is required');
    }

    const supabase = await createClient();

    const { error } = await supabase.storage
      .from('portfolio-images')
      .remove([filePath]);

    if (error) throw error;

    return successResponse({ message: 'File deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
