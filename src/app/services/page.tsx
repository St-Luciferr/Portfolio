import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import { getPublishedNavLinks, getPublishedServices } from '@/lib/services';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export const revalidate = 60;

const canonical = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI chatbot, RAG, WhatsApp automation, document automation, backend, and ML deployment services by Santosh Pandey.',
  alternates: { canonical },
  openGraph: {
    type: 'website',
    url: canonical,
    title: `Services | ${SITE_NAME}`,
    description:
      'Production AI systems, automation, and backend engineering for teams that need them shipped.',
  },
};

export default async function ServicesIndexPage() {
  const [services, navLinks] = await Promise.all([
    getPublishedServices(),
    getPublishedNavLinks(),
  ]);

  // Only services with a slug have a detail page to link to.
  const linkable = services.filter((service) => service.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services',
    url: canonical,
    itemListElement: linkable.map((service, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}/services/${service.slug}`,
      name: service.title,
    })),
  };

  return (
    <>
      {linkable.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <main className="min-h-screen bg-primary">
        <Navbar navLinks={navLinks} />

        <section className="pt-32 pb-24 sm:px-16 px-6">
          <div className="max-w-7xl mx-auto">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-3 text-sm text-secondary"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white" aria-current="page">
                Services
              </span>
            </nav>

            <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-white font-black text-[38px] sm:text-[60px] leading-tight">
                  Services
                </h1>
                <p className="mt-4 max-w-3xl text-secondary text-[17px] leading-8">
                  What I can build for you, how each engagement runs, and the
                  case studies behind it.
                </p>
              </div>
              <Link
                href="/#contact"
                className="w-fit rounded-md bg-[#7a4fd4] px-5 py-3 text-white font-semibold hover:bg-[#6a3fc4] transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {linkable.length === 0 ? (
              <div className="mt-14 rounded-2xl border border-white/10 bg-tertiary/40 p-12 text-center">
                <p className="text-white font-medium">
                  Service details are being updated.
                </p>
                <p className="text-secondary mt-2 text-sm">
                  In the meantime,{' '}
                  <Link href="/#contact" className="text-[#915eff] hover:underline">
                    send a short brief
                  </Link>{' '}
                  and I will reply with the best approach.
                </p>
              </div>
            ) : (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {linkable.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col rounded-lg border border-white/10 bg-tertiary p-6 hover:border-[#915eff] transition-colors duration-300"
                  >
                    {service.iconUrl && (
                      <Image
                        src={service.iconUrl}
                        alt=""
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    )}
                    <h2 className="mt-5 text-white text-xl font-bold group-hover:text-[#915eff] transition-colors">
                      {service.title}
                    </h2>
                    {service.summary && (
                      <p className="mt-3 text-secondary text-sm leading-relaxed line-clamp-4">
                        {service.summary}
                      </p>
                    )}
                    <span className="mt-auto pt-5 text-sm font-semibold text-[#915eff]">
                      View service →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
