import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { Section, SectionLink } from './Section';
import type { Service } from '@/types/frontend';

// One hue per offer, so the four cards read as distinct products.
const HUES = [
  { tile: 'bg-violet-500/10 ring-violet-500/20', bar: 'from-violet-500' },
  { tile: 'bg-emerald-500/10 ring-emerald-500/20', bar: 'from-emerald-500' },
  { tile: 'bg-amber-500/10 ring-amber-500/25', bar: 'from-amber-500' },
  { tile: 'bg-sky-500/10 ring-sky-500/20', bar: 'from-sky-500' },
];

const card =
  'group relative flex flex-col rounded-xl border border-fg/10 bg-tertiary p-6 shadow-soft transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

/** Three AI offers from the CMS plus the full-stack work that surrounds them. */
export function Offers({ services }: { services: Service[] }) {
  const offers = services.filter((s) => s.slug);

  return (
    <Section
      id="services"
      glow={['violet', 'sky']}
      title="Products, and the AI inside them"
      intro="End-to-end builds: the web app, the backend and the AI features, delivered by one developer who owns the whole stack."
      action={<SectionLink href="/services">All services</SectionLink>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((service, i) => (
          <Link key={service.id} href={`/services/${service.slug}`} className={`${card} overflow-hidden`}>
            <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${HUES[i % 4].bar} to-transparent opacity-80`} />
            <span className={`flex h-11 w-11 items-center justify-center rounded-lg ring-1 ${HUES[i % 4].tile}`}>
              <Image src={service.iconUrl} alt="" width={26} height={26} className="object-contain" />
            </span>
            <h3 className="mt-5 text-fg text-[17px] font-semibold leading-snug">{service.title}</h3>
            {service.summary && (
              <p className="mt-2 text-sm leading-6 text-secondary line-clamp-4">{service.summary}</p>
            )}
            {(service.timeline || service.engagementModel) && (
              <p className="mt-4 text-xs text-secondary">
                {[service.timeline, service.engagementModel].filter(Boolean).join(', ')}
              </p>
            )}
            <ArrowUpRight
              className="absolute right-5 top-6 h-4 w-4 text-secondary transition-colors group-hover:text-brand-fg"
              aria-hidden="true"
            />
          </Link>
        ))}

        <Link href="/projects" className={`${card} overflow-hidden`}>
          <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${HUES[3].bar} to-transparent opacity-80`} />
          <span className={`flex h-11 w-11 items-center justify-center rounded-lg ring-1 ${HUES[3].tile}`}>
            <Code2 className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </span>
          <h3 className="mt-5 text-fg text-[17px] font-semibold leading-snug">Full-Stack Web &amp; APIs</h3>
          <p className="mt-2 text-sm leading-6 text-secondary">
            Web apps, dashboards and backends in Next.js, React, Django and FastAPI, with or without an AI feature.
          </p>
          <ArrowUpRight
            className="absolute right-5 top-6 h-4 w-4 text-secondary transition-colors group-hover:text-brand-fg"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Section>
  );
}
