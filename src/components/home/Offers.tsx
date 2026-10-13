import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { Section, SectionLink } from './Section';
import type { Service } from '@/types/frontend';

interface OffersProps {
  services: Service[];
}

/** Three AI offers from the CMS plus the full-stack work that surrounds them. */
export function Offers({ services }: OffersProps) {
  const offers = services.filter((s) => s.slug);

  return (
    <Section
      id="services"
      eyebrow="What I do"
      title="Products and the AI inside them."
      intro="End-to-end builds: the web app, the backend and the AI features, shipped by one developer who owns the whole stack."
      action={<SectionLink href="/services">All services</SectionLink>}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {offers.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex flex-col rounded-2xl border border-white/10 bg-tertiary/60 p-6 transition-colors hover:border-[#915eff]/60"
          >
            <Image src={service.iconUrl} alt="" width={44} height={44} className="object-contain" />
            <h3 className="mt-5 text-white text-lg font-bold">{service.title}</h3>
            {service.summary && (
              <p className="mt-2 text-sm leading-6 text-secondary line-clamp-4">{service.summary}</p>
            )}
            {(service.timeline || service.engagementModel) && (
              <p className="mt-4 text-xs text-secondary/80">
                {[service.timeline, service.engagementModel].filter(Boolean).join(' · ')}
              </p>
            )}
            <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#cbb5ff] group-hover:text-white">
              Learn more <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}

        <Link
          href="/projects"
          className="group flex flex-col rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 transition-colors hover:border-[#915eff]/60"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#915eff] to-[#4f8cff]">
            <Code2 className="h-5 w-5 text-white" />
          </span>
          <h3 className="mt-5 text-white text-lg font-bold">Full-Stack Web &amp; APIs</h3>
          <p className="mt-2 text-sm leading-6 text-secondary">
            Web apps, dashboards and backends in Next.js, React, Django and FastAPI, with or without an AI feature.
          </p>
          <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#cbb5ff] group-hover:text-white">
            See the work <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </Section>
  );
}
