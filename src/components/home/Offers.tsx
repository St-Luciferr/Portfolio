import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';
import { Section, SectionLink } from './Section';
import { HUES, OFFER_ORDER } from './hues';
import type { Service } from '@/types/frontend';

const card =
  'group relative flex h-full flex-col rounded-2xl border p-6 shadow-soft transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

function More({ ink }: { ink: string }) {
  return (
    <span className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium ${ink}`}>
      Learn more
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  );
}

/** Three AI offers from the CMS plus the full-stack work that surrounds them. */
export function Offers({ services }: { services: Service[] }) {
  const offers = services.filter((s) => s.slug);
  const fullStack = HUES.sky;

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Products, and the AI inside them"
      intro="End-to-end builds: the web app, the backend and the AI features, delivered by one developer who owns the whole stack."
      action={<SectionLink href="/services">All services</SectionLink>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((service, i) => {
          const hue = HUES[OFFER_ORDER[i % 3]];
          return (
            <Link key={service.id} href={`/services/${service.slug}`} className={`${card} ${hue.card}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${hue.tile}`}>
                <Image src={service.iconUrl} alt="" width={24} height={24} className="object-contain" />
              </span>
              <h3 className="mt-5 text-fg text-[17px] font-semibold leading-snug tracking-[-0.01em]">{service.title}</h3>
              {service.summary && (
                <p className="mt-2 text-sm leading-6 text-secondary line-clamp-4">{service.summary}</p>
              )}
              {(service.timeline || service.engagementModel) && (
                <p className="mt-3 text-xs text-secondary">
                  {[service.timeline, service.engagementModel].filter(Boolean).join(', ')}
                </p>
              )}
              <More ink={hue.ink} />
            </Link>
          );
        })}

        <Link href="/projects" className={`${card} ${fullStack.card}`}>
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${fullStack.tile}`}>
            <Code2 className={`h-5 w-5 ${fullStack.ink}`} />
          </span>
          <h3 className="mt-5 text-fg text-[17px] font-semibold leading-snug tracking-[-0.01em]">Full-Stack Web &amp; APIs</h3>
          <p className="mt-2 text-sm leading-6 text-secondary line-clamp-4">
            Web apps, dashboards and backends in Next.js, React, Django and FastAPI, with or without an AI feature.
          </p>
          <More ink={fullStack.ink} />
        </Link>
      </div>
    </Section>
  );
}
