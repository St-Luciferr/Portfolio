import type { ReactNode } from 'react';
import { styles } from '@/lib/styles';

interface SectionProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Right-aligned header slot, e.g. a "See all" link. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Homepage section shell (Phase 13 design system): one accent colour, a fixed
 * type scale and no entrance animations, so sections render as plain HTML.
 */
export function Section({ id, eyebrow, title, intro, action, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-24 ${styles.paddingX} ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className={styles.sectionSubText}>{eyebrow}</p>
            <h2 className="mt-3 text-white font-black text-[32px] sm:text-[44px] leading-tight">{title}</h2>
            {intro && <p className="mt-4 text-secondary text-[17px] leading-[30px]">{intro}</p>}
          </div>
          {action && <div className="flex-none">{action}</div>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-sm font-semibold text-[#cbb5ff] hover:text-white transition-colors"
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}
