import type { ReactNode } from 'react';
import type React from 'react';
import { ArrowRight } from 'lucide-react';
import { styles } from '@/lib/styles';

interface SectionProps {
  id?: string;
  /** Small mono label above the title, e.g. "Services". */
  eyebrow?: string;
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
export function Section({ id, eyebrow, title, intro, action, children }: SectionProps) {
  return (
    <section
      id={id}
      // No per-section fill: one continuous ground; colour lives in the cards.
      className={`relative isolate scroll-mt-20 py-14 sm:py-20 ${styles.paddingX}`}
    >
      <div className="max-w-6xl mx-auto">
        <div data-reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="mb-2.5 font-mono text-[13px] text-brand-fg">{eyebrow}</p>}
            <h2 className="text-fg text-[30px] sm:text-[36px] font-semibold leading-[1.12] tracking-[-0.03em]">
              {title}
            </h2>
            {intro && <p className="mt-4 text-secondary text-[17px] leading-[1.7]">{intro}</p>}
          </div>
          {action && <div className="flex-none">{action}</div>}
        </div>
        <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="mt-10">
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
      className="tap-target group inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-fg transition-colors"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
