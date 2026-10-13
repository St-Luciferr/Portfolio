import type { ReactNode } from 'react';
import type React from 'react';
import { ArrowRight } from 'lucide-react';
import { styles } from '@/lib/styles';

interface SectionProps {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Right-aligned header slot, e.g. a "See all" link. */
  action?: ReactNode;
  children: ReactNode;
}

/**
 * Homepage section shell (docs/DESIGN_SPEC.md): theme tokens, a fixed type
 * scale and a one-time scroll reveal.
 */
export function Section({ id, title, intro, action, children }: SectionProps) {
  return (
    <section
      id={id}
      // No per-section fill: every section sits on the page-wide colour wash
      // in app/page.tsx (.page-wash), so the page reads as one continuous surface.
      className={`relative isolate scroll-mt-20 py-20 sm:py-28 ${styles.paddingX}`}
    >
      <div className="max-w-6xl mx-auto">
        <div data-reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-fg text-[30px] sm:text-[40px] font-semibold leading-[1.15] tracking-[-0.02em]">
              {title}
            </h2>
            {intro && <p className="mt-4 text-secondary text-[17px] leading-[1.7]">{intro}</p>}
          </div>
          {action && <div className="flex-none">{action}</div>}
        </div>
        <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="mt-12 sm:mt-14">
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-fg hover:text-fg transition-colors"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
