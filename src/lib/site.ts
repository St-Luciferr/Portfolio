/**
 * Canonical site origin used for absolute URLs (canonical tags, sitemap, JSON-LD).
 *
 * Production currently serves `www.` and 307-redirects the apex domain, while the
 * codebase historically emitted the apex. Set NEXT_PUBLIC_SITE_URL to whichever host
 * is primary in Vercel so every canonical signal points at a URL that returns 200.
 * See docs/SITE_REVIEW_2026-10.md (F7) and todo.md task 12.18.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://pandeysantosh.com.np'
).replace(/\/+$/, '');

export const SITE_NAME = 'Santosh Pandey';
