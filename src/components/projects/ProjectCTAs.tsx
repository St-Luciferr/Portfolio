'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';

interface ProjectCTAsProps {
  slug: string;
  name: string;
  demoUrl: string | null;
  sourceCodeLink: string;
}

export function ProjectCTAs({
  slug,
  name,
  demoUrl,
  sourceCodeLink,
}: ProjectCTAsProps) {
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track('project_demo_click', { slug, source: 'detail' })
          }
          className="rounded-md bg-brand px-5 py-3 text-white font-semibold hover:bg-brand-strong transition-colors"
          aria-label={`View live demo of ${name}`}
        >
          View Live Demo
        </a>
      )}
      <a
        href={sourceCodeLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track('project_source_click', { slug, source: 'detail' })
        }
        className="rounded-md border border-brand px-5 py-3 text-fg font-semibold hover:bg-brand transition-colors"
        aria-label={`View source code for ${name}`}
      >
        View Source Code
      </a>
      <Link
        href="/#contact"
        className="rounded-md border border-fg/20 px-5 py-3 text-fg font-semibold hover:border-fg transition-colors"
      >
        Build Something Similar
      </Link>
    </div>
  );
}
