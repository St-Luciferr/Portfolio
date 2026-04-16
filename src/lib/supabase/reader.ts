import { createClient } from '@supabase/supabase-js';

/**
 * Read-only Supabase client for server component data fetching.
 * Uses the anon key — RLS restricts to published rows only.
 * Session persistence is disabled since this runs server-side.
 */
export const readerClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
