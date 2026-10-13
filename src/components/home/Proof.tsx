import Image from 'next/image';
import { Section } from './Section';
import type { SelectedResultMetric, Testimonial } from '@/types/frontend';

interface ProofProps {
  testimonials: Testimonial[];
  metrics: SelectedResultMetric[];
  heading?: string;
  subheading?: string;
}

/** Testimonials and result metrics in one section; hidden when both are empty. */
export function Proof({ testimonials, metrics, heading, subheading }: ProofProps) {
  if (testimonials.length === 0 && metrics.length === 0) return null;

  return (
    <Section id="results" tone="band" title={heading || 'Results'} intro={subheading}>
      {metrics.length > 0 && (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-fg/10 bg-fg/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col bg-tertiary p-6 sm:p-7">
              {/* dt before dd for valid markup; order-first keeps the value on top */}
              <dt className="mt-3 text-fg text-[15px] font-medium">{metric.label}</dt>
              <dd className="order-first text-fg text-[36px] sm:text-[42px] font-semibold leading-none tracking-[-0.03em]">
                {metric.value}
              </dd>
              {metric.context && <dd className="mt-1 text-[13px] leading-5 text-secondary">{metric.context}</dd>}
            </div>
          ))}
        </dl>
      )}

      {testimonials.length > 0 && (
        <div className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${metrics.length > 0 ? 'mt-8' : ''}`}>
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-xl border border-fg/10 bg-tertiary p-7 shadow-soft">
              <blockquote className="flex-1 text-[15px] leading-7 text-white-100">&ldquo;{t.testimonial}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-fg/[0.08] pt-5">
                <Image src={t.imageUrl} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-fg text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-secondary">
                    {t.designation}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
