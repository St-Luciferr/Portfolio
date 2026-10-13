/**
 * Canonical site origin used for absolute URLs (canonical tags, sitemap, JSON-LD).
 *
 * `www.` is the primary host: Vercel serves it and 307-redirects the apex to it, so
 * every canonical signal must use `www.` to point at a URL that returns 200.
 * NEXT_PUBLIC_SITE_URL overrides it (e.g. for preview deployments).
 * See docs/SITE_REVIEW_2026-10.md (F7) and todo.md task 12.18.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pandeysantosh.com.np'
).replace(/\/+$/, '');

export const SITE_NAME = 'Santosh Pandey';
