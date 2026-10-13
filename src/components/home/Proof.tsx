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
    <Section
      id="results"
      eyebrow="Proof"
      title={heading || 'Results.'}
      intro={subheading}
      className="bg-black-100/40"
    >
      {metrics.length > 0 && (
        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col rounded-2xl border border-white/10 bg-tertiary/50 p-6">
              {/* dt before dd for valid markup; order-first keeps the value on top */}
              <dt className="mt-3 text-white font-bold">{metric.label}</dt>
              <dd className="order-first text-[#b48cff] text-4xl font-black leading-none">{metric.value}</dd>
              {metric.context && <dd className="mt-1 text-xs leading-5 text-secondary">{metric.context}</dd>}
            </div>
          ))}
        </dl>
      )}

      {testimonials.length > 0 && (
        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${metrics.length > 0 ? 'mt-10' : ''}`}>
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-2xl border border-white/10 bg-tertiary/50 p-7">
              <blockquote className="flex-1 text-white-100 leading-7">&ldquo;{t.testimonial}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image
                  src={t.imageUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
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
