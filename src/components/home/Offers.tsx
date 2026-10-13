import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { Section, SectionLink } from './Section';
import type { Service } from '@/types/frontend';

const card =
  'group relative flex flex-col rounded-xl border border-fg/10 bg-tertiary p-6 shadow-soft transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

/** Three AI offers from the CMS plus the full-stack work that surrounds them. */
export function Offers({ services }: { services: Service[] }) {
  const offers = services.filter((s) => s.slug);

  return (
    <Section
      id="services"
      title="Products, and the AI inside them"
      intro="End-to-end builds: the web app, the backend and the AI features, delivered by one developer who owns the whole stack."
      action={<SectionLink href="/services">All services</SectionLink>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`} className={card}>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/[0.08] ring-1 ring-brand/15">
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

        <Link href="/projects" className={card}>
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/[0.08] ring-1 ring-brand/15">
            <Code2 className="h-5 w-5 text-brand-fg" />
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
