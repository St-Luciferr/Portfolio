'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import type { Technology } from '@/types/frontend';

interface TechProps {
  technologies?: Technology[];
}

// Plain icon + label list. Replaced one WebGL canvas per technology
// (docs/SITE_REVIEW_2026-10.md F5); names are now readable text too.
const Tech = ({ technologies = [] }: TechProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <ul className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6">
        {technologies.map((technology) => (
          <li
            key={technology.id}
            className="flex w-28 flex-col items-center gap-3 rounded-xl border border-white/10 bg-tertiary/60 px-3 py-4 transition-colors hover:border-[#915eff]/60"
          >
            <div className="relative h-12 w-12">
              <Image
                src={technology.iconUrl}
                alt=""
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <span className="text-center text-xs font-medium text-secondary">
              {technology.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionWrapper(Tech, '');
