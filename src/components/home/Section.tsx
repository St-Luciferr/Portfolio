import type { ReactNode } from 'react';
import type React from 'react';
import { ArrowRight } from 'lucide-react';
import { styles } from '@/lib/styles';

type Hue = 'violet' | 'sky' | 'emerald' | 'amber' | 'rose';

// Soft colour fields behind each section: two large blurred patches per hue pair.
// Opacity is a touch higher in dark mode, where low-alpha colour reads weaker.
const HUE_CLASS: Record<Hue, string> = {
  violet: 'bg-violet-500/[0.15] dark:bg-violet-500/[0.16]',
  sky: 'bg-sky-400/[0.16] dark:bg-sky-500/[0.13]',
  emerald: 'bg-emerald-400/[0.15] dark:bg-emerald-500/[0.12]',
  amber: 'bg-amber-400/[0.17] dark:bg-amber-500/[0.11]',
  rose: 'bg-rose-400/[0.12] dark:bg-rose-500/[0.10]',
};

interface SectionProps {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Right-aligned header slot, e.g. a "See all" link. */
  action?: ReactNode;
  children: ReactNode;
  /** Alternate band background for rhythm between sections. */
  tone?: 'plain' | 'band';
  /** Colour field: [top-left hue, bottom-right hue]. */
  glow?: [Hue, Hue];
  /** Fine dot texture over the band. */
  dots?: boolean;
}

/**
 * Homepage section shell (docs/DESIGN_SPEC.md): theme tokens, a fixed type
 * scale, a per-section colour field and a one-time scroll reveal.
 */
export function Section({ id, title, intro, action, children, tone = 'plain', glow, dots }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-clip scroll-mt-20 py-20 sm:py-28 ${styles.paddingX} ${
        tone === 'band' ? 'bg-black-100' : ''
      }`}
    >
      {tone === 'band' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />
      )}
      {dots && <div aria-hidden="true" className="dot-pattern pointer-events-none absolute inset-0 -z-10" />}
      {glow && (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -left-40 -top-32 -z-10 h-[460px] w-[560px] rounded-full blur-[120px] ${HUE_CLASS[glow[0]]}`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-40 -right-40 -z-10 h-[460px] w-[560px] rounded-full blur-[120px] ${HUE_CLASS[glow[1]]}`}
          />
        </>
      )}

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
