'use client';

import { FaFileDownload } from 'react-icons/fa';
import { track } from '@/lib/analytics';

interface HeroCTAsProps {
  ctaText: string;
  ctaUrl: string;
  resumeUrl: string;
}

export function HeroCTAs({ ctaText, ctaUrl, resumeUrl }: HeroCTAsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <a
        href={ctaUrl}
        onClick={() => track('hero_cta_click', { variant: 'primary' })}
        className="bg-[#915eff] hover:bg-[#7a4fd4] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        {ctaText}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>

      <a
        href={resumeUrl}
        download
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          track('hero_cta_click', { variant: 'resume' });
          track('resume_download', { source: 'hero' });
        }}
        className="bg-tertiary hover:bg-tertiary/80 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-white/10"
      >
        <FaFileDownload className="w-5 h-5" />
        Download Resume
      </a>
    </div>
  );
}
