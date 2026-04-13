import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import {
  getAllSiteSettings,
  getPublishedNavLinks,
  getPublishedProjectBySlug,
  getPublishedProjectSlugs,
} from '@/lib/data';
import { getProjectDetailContent } from '@/lib/project-details';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const content = getProjectDetailContent(project);
  const title = `${project.name} Case Study`;
  const description = content.summary || project.description;
  const canonicalUrl = `https://pandeysantosh.com.np/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: `${title} | Santosh Pandey`,
      description,
      images: [
        {
          url: project.imageUrl,
          alt: `${project.name} project preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.imageUrl],
    },
  };
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-secondary leading-7">
          <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#915eff]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, navLinks, settings] = await Promise.all([
    getPublishedProjectBySlug(slug),
    getPublishedNavLinks(),
    getAllSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const content = getProjectDetailContent(project);
  const canonicalUrl = `https://pandeysantosh.com.np/projects/${project.slug}`;
  const authorName = settings['hero']?.name || 'Santosh Pandey';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    headline: `${project.name} Case Study`,
    description: content.summary,
    image: project.image_url,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    keywords: project.tags.map((tag) => tag.name),
    codeRepository: project.source_code_link,
    sameAs: [project.demo_url, project.source_code_link].filter(Boolean),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://pandeysantosh.com.np',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: 'https://pandeysantosh.com.np/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-primary">
        <Navbar navLinks={navLinks} />

        <section className="pt-32 pb-16 sm:px-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-sm text-secondary">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-white">{project.name}</span>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-secondary uppercase tracking-wider text-sm sm:text-base">
                  {content.eyebrow}
                </p>
                <h1 className="mt-4 text-white font-black text-[34px] sm:text-[52px] leading-tight">
                  {project.name}
                </h1>
                <p className="mt-6 text-secondary text-[17px] leading-8 max-w-3xl">
                  {content.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`text-sm ${tag.color} bg-gray-800/30 px-3 py-1 rounded-md`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap gap-4">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-[#915eff] px-5 py-3 text-white font-semibold hover:bg-[#7a4fd4] transition-colors"
                    >
                      View Live Demo
                    </a>
                  )}
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[#915eff] px-5 py-3 text-white font-semibold hover:bg-[#915eff] transition-colors"
                  >
                    View Source Code
                  </a>
                  <Link
                    href="/#contact"
                    className="rounded-md border border-white/20 px-5 py-3 text-white font-semibold hover:border-white transition-colors"
                  >
                    Build Something Similar
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={project.imageUrl}
                  alt={`${project.name} project preview`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24 sm:px-16 px-6">
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="space-y-14">
              <article>
                <p className="text-secondary uppercase tracking-wider text-sm">
                  Problem
                </p>
                <h2 className="mt-3 text-white text-3xl font-bold">
                  What this project solves
                </h2>
                <DetailList items={content.problem} />
              </article>

              <article>
                <p className="text-secondary uppercase tracking-wider text-sm">
                  Solution
                </p>
                <h2 className="mt-3 text-white text-3xl font-bold">
                  How it works
                </h2>
                <DetailList items={content.solution} />
              </article>

              <article>
                <p className="text-secondary uppercase tracking-wider text-sm">
                  Architecture
                </p>
                <h2 className="mt-3 text-white text-3xl font-bold">
                  System design
                </h2>
                <DetailList items={content.architecture} />
              </article>

              <article>
                <p className="text-secondary uppercase tracking-wider text-sm">
                  Features
                </p>
                <h2 className="mt-3 text-white text-3xl font-bold">
                  Key capabilities
                </h2>
                <DetailList items={content.features} />
              </article>

              <article>
                <p className="text-secondary uppercase tracking-wider text-sm">
                  Outcome
                </p>
                <h2 className="mt-3 text-white text-3xl font-bold">
                  What it demonstrates
                </h2>
                <DetailList items={content.results} />
              </article>
            </div>

            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-lg border border-white/10 bg-tertiary p-6">
                <h2 className="text-white text-xl font-bold">Project Stack</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-black-100 px-3 py-2 text-sm text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-tertiary p-6">
                <h2 className="text-white text-xl font-bold">Next Step</h2>
                <p className="mt-3 text-secondary leading-7">
                  Need a similar AI, automation, backend, or product workflow?
                  Send a short brief and I will review the best implementation path.
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex rounded-md bg-[#915eff] px-4 py-3 text-white font-semibold hover:bg-[#7a4fd4] transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
