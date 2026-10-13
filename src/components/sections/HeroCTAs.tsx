'use client';

import Link from 'next/link';
import { FaFileDownload } from 'react-icons/fa';
import { track } from '@/lib/analytics';

interface HeroCTAsProps {
  resumeUrl: string;
  /** When set, the primary CTA books a call instead of jumping to the form. */
  bookingUrl?: string;
}

export function HeroCTAs({ resumeUrl, bookingUrl }: HeroCTAsProps) {
  return (
    <div className="mt-9">
      <div className="flex flex-wrap gap-4">
        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('hero_cta_click', { variant: 'call' })}
            className="rounded-lg bg-[#7a4fd4] px-7 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#6a3fc4]"
          >
            Book a call
          </a>
        ) : (
          <a
            href="#contact"
            onClick={() => track('hero_cta_click', { variant: 'primary' })}
            className="rounded-lg bg-[#7a4fd4] px-7 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#6a3fc4]"
          >
            Start a project
          </a>
        )}

        <Link
          href="#work"
          onClick={() => track('hero_cta_click', { variant: 'projects' })}
          className="rounded-lg border border-white/20 px-7 py-3 font-semibold text-white transition-colors hover:border-[#915eff] hover:bg-[#915eff]/10"
        >
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
        className="mt-5 inline-flex items-center gap-2 text-sm text-secondary underline-offset-4 hover:text-white hover:underline"
      >
        <FaFileDownload className="h-3.5 w-3.5" />
        Download résumé (PDF)
      </a>
    </div>
  );
}
