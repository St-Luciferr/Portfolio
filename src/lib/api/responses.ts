import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Standard API response helper functions
 */

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status: number = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details && { details }),
    },
    { status }
  );
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return errorResponse(message, 401);
}

export function notFoundResponse(message: string = 'Resource not found') {
  return errorResponse(message, 404);
}

export function validationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      details: error.issues,
    },
    { status: 400 }
  );
}

export function serverErrorResponse(error: unknown) {
  console.error('Server error:', error);

  const message =
    error instanceof Error ? error.message : 'Internal server error';

  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 500 }
  );
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  return serverErrorResponse(error);
}
