import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import {
  getAllSiteSettings,
  getPublishedNavLinks,
  getPublishedServiceBySlug,
  getPublishedServiceSlugs,
  getServiceProjects,
  getPostsByTerms,
} from '@/lib/services';
import { ProjectMiniCard } from '@/components/projects/ProjectMiniCard';
import { RelatedReading } from '@/components/blog/RelatedReading';

// Refresh CMS edits (titles, FAQs, linked case studies) without a redeploy.
export const revalidate = 60;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) return { title: 'Service Not Found' };

  const title = service.title;
  const description = service.summary || `Professional ${service.title} service by Santosh Pandey`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://pandeysantosh.com.np/services/${slug}`,
    },
    openGraph: {
      title: `${title} | Santosh Pandey`,
      description,
      url: `https://pandeysantosh.com.np/services/${slug}`,
      type: 'website',
    },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-secondary uppercase tracking-wider text-sm">{children}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-secondary leading-7">
          <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#915eff]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  const [service, navLinks, settings] = await Promise.all([
    getPublishedServiceBySlug(slug),
    getPublishedNavLinks(),
    getAllSiteSettings(),
  ]);

  if (!service) notFound();

  const linkedProjects = await getServiceProjects(service.id);
  // Match posts on the service's stack plus its case studies' tags (e.g. "RAG"),
  // since the stack list alone names tools rather than topics. Require 2 shared
  // terms so one common SDK (OpenAI) doesn't pull in an unrelated post.
  const relatedPosts = await getPostsByTerms(
    [...service.toolsTechnologies, ...linkedProjects.flatMap((p) => p.tags.map((t) => t.name))],
    3,
    2
  );

  const canonicalUrl = `https://pandeysantosh.com.np/services/${slug}`;
  const authorName = (settings as any)['hero']?.name || 'Santosh Pandey';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary || service.description,
    provider: {
      '@type': 'Person',
      name: authorName,
      url: 'https://pandeysantosh.com.np',
    },
    url: canonicalUrl,
    areaServed: 'Worldwide',
    ...(service.pricingModel && { priceSpecification: { priceType: service.pricingModel } }),
  };

  // FAQPage must mirror the visible Q&As exactly (Google requires the content to be on-page).
  const faqJsonLd =
    service.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <main className="min-h-screen bg-primary">
        <Navbar navLinks={navLinks} />

        {/* Hero */}
        <section className="pt-32 pb-16 sm:px-16 px-6">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-secondary">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white" aria-current="page">{service.title}</span>
            </nav>

            <h1 className="mt-10 text-white font-black text-[34px] sm:text-[52px] leading-tight max-w-4xl">
              {service.title}
            </h1>

            {service.summary && (
              <p className="mt-6 text-secondary text-[17px] leading-8 max-w-3xl">
                {service.summary}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="rounded-md bg-[#915eff] px-6 py-3 text-white font-semibold hover:bg-[#7a4fd4] transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/services"
                className="rounded-md border border-white/20 px-6 py-3 text-white font-semibold hover:border-white transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="pb-24 sm:px-16 px-6">
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.72fr_0.28fr]">

            {/* Left column */}
            <div className="space-y-14">
              {service.description && (
                <article>
                  <SectionLabel>Overview</SectionLabel>
                  <h2 className="mt-3 text-white text-3xl font-bold">What You Get</h2>
                  <p className="mt-5 text-secondary leading-7">{service.description}</p>
                </article>
              )}

              {service.process.length > 0 && (
                <article>
                  <SectionLabel>Process</SectionLabel>
                  <h2 className="mt-3 text-white text-3xl font-bold">How I Work</h2>
                  <ol className="mt-6 space-y-6">
                    {service.process.map((step, i) => (
                      <li key={step.step} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#915eff] flex items-center justify-center text-white font-bold text-sm">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-white font-semibold">{step.step}</p>
                          <p className="mt-1 text-secondary text-sm leading-6">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              )}

              {service.benefits.length > 0 && (
                <article>
                  <SectionLabel>Benefits</SectionLabel>
                  <h2 className="mt-3 text-white text-3xl font-bold">Why Choose This Service</h2>
                  <BulletList items={service.benefits} />
                </article>
              )}

              {service.deliverables.length > 0 && (
                <article>
                  <SectionLabel>Deliverables</SectionLabel>
                  <h2 className="mt-3 text-white text-3xl font-bold">What You Receive</h2>
                  <BulletList items={service.deliverables} />
                </article>
              )}

              {service.faqs.length > 0 && (
                <article>
                  <SectionLabel>FAQ</SectionLabel>
                  <h2 className="mt-3 text-white text-3xl font-bold">Common Questions</h2>
                  <div className="mt-6 divide-y divide-white/10 rounded-lg border border-white/10 bg-tertiary">
                    {service.faqs.map((faq) => (
                      <details key={faq.question} className="group px-6 py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-white font-semibold [&::-webkit-details-marker]:hidden">
                          <span>{faq.question}</span>
                          <span
                            aria-hidden="true"
                            className="mt-0.5 text-[#915eff] transition-transform duration-200 group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-secondary leading-7">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </article>
              )}
            </div>

            {/* Right sidebar */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-6">
              {service.toolsTechnologies.length > 0 && (
                <div className="rounded-lg border border-white/10 bg-tertiary p-6">
                  <h2 className="text-white text-xl font-bold">Tech Stack</h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.toolsTechnologies.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-black-100 px-3 py-2 text-sm text-secondary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-white/10 bg-tertiary p-6">
                <h2 className="text-white text-xl font-bold">Ready to Start?</h2>
                <p className="mt-3 text-secondary leading-7 text-sm">
                  Send a brief description of your project and I will get back to you within 24 hours.
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex rounded-md bg-[#915eff] px-4 py-3 text-white font-semibold hover:bg-[#7a4fd4] transition-colors text-sm"
                >
                  Start a Conversation
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Linked case studies */}
        {linkedProjects.length > 0 && (
          <section className="pb-24 sm:px-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="border-t border-white/10 pt-16">
                <p className="text-secondary uppercase tracking-wider text-sm">Live Examples</p>
                <h2 className="mt-3 text-white text-3xl font-bold">Case Studies</h2>
                <p className="mt-2 text-secondary">
                  Real projects built using this service
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {linkedProjects.map((project) => (
                    <ProjectMiniCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <RelatedReading posts={relatedPosts} />
      </main>
    </>
  );
}
