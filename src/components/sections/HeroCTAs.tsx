'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import { track } from '@/lib/analytics';

interface HeroCTAsProps {
  resumeUrl: string;
  /** When set, the primary CTA books a call instead of jumping to the form. */
  bookingUrl?: string;
}

const primary =
  'inline-flex items-center justify-center rounded-full bg-brand-strong px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_20px_-10px_rgb(var(--site-brand-strong)/0.8)] transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';
const secondary =
  'inline-flex items-center justify-center rounded-full border border-fg/15 bg-tertiary px-6 py-3 text-[15px] font-medium text-fg shadow-soft transition-colors hover:border-fg/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

export function HeroCTAs({ resumeUrl, bookingUrl }: HeroCTAsProps) {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-3">
        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('hero_cta_click', { variant: 'call' })}
            className={primary}
          >
            Book a call
          </a>
        ) : (
          <a href="#contact" onClick={() => track('hero_cta_click', { variant: 'primary' })} className={primary}>
            Start a project
          </a>
        )}

        <Link href="#work" onClick={() => track('hero_cta_click', { variant: 'projects' })} className={secondary}>
          See case studies
        </Link>
      </div>

      <a
        href={resumeUrl}
        download
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          track('hero_cta_click', { variant: 'resume' });
          track('resume_download', { source: 'hero' });
        }}
        className="mt-6 inline-flex items-center gap-2 text-sm text-secondary hover:text-fg transition-colors"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download résumé (PDF)
      </a>
    </div>
  );
}
