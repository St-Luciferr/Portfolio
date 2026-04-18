'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/lib/markdown';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <>
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-4">
          On this page
        </p>
        <ul className="space-y-2 border-l border-white/10">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  '-ml-px block border-l-2 pl-4 text-sm transition-colors',
                  h.depth === 3 && 'pl-7 text-[13px]',
                  activeId === h.id
                    ? 'border-[#915eff] text-white'
                    : 'border-transparent text-secondary hover:text-white'
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <details className="lg:hidden group rounded-lg border border-white/10 bg-tertiary/30 mb-8">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white list-none flex items-center justify-between">
          Table of contents
          <span className="text-secondary transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <ul className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
          {headings.map((h) => (
            <li key={h.id} className={cn(h.depth === 3 && 'pl-4')}>
              <a
                href={`#${h.id}`}
                className="text-sm text-secondary hover:text-[#915eff]"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
