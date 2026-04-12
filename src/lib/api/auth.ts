import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export interface AuthResult {
  authorized: boolean;
  user?: any;
  error?: string;
}

/**
 * Verify admin authentication for API routes
 * Checks if the request has a valid Supabase session
 */
export async function verifyAdmin(request: NextRequest): Promise<AuthResult> {
  try {
    const supabase = await createClient();

    // Get the current session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return {
        authorized: false,
        error: 'Unauthorized - Please login',
      };
    }

    return {
      authorized: true,
      user: session.user,
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return {
      authorized: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}
