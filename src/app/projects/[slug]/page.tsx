import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import { ProjectCTAs } from '@/components/projects/ProjectCTAs';
import {
  getAllSiteSettings,
  getPublishedNavLinks,
  getPublishedProjectBySlug,
  getPublishedProjectSlugs,
  getRelatedProjects,
} from '@/lib/services';
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
    keywords: project.tags.map(tag => tag.name),
    authors: [{ name: 'Santosh Pandey', url: 'https://pandeysantosh.com.np' }],
    creator: 'Santosh Pandey',
    publisher: 'Santosh Pandey',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: `${title} | Santosh Pandey`,
      description,
      siteName: 'Santosh Pandey Portfolio',
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.name} project preview`,
        },
      ],
      authors: ['Santosh Pandey'],
      tags: project.tags.map(tag => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Su_n_toss',
      creator: '@Su_n_toss',
      title,
      description,
      images: [project.imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
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

  // Fetch related projects after we have the project
  const relatedProjects = await getRelatedProjects(project.id);

  const content = getProjectDetailContent(project);
  const canonicalUrl = `https://pandeysantosh.com.np/projects/${project.slug}`;
  const authorName = settings['hero']?.name || 'Santosh Pandey';

  // Determine if this is a software project (use SoftwareApplication schema)
  const isSoftwareProject = project.tags.some(tag =>
    ['AI', 'ML', 'Backend', 'Frontend', 'Full Stack', 'Mobile', 'Automation'].includes(tag.name)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isSoftwareProject ? 'SoftwareApplication' : 'CreativeWork',
    name: project.name,
    headline: `${project.name} Case Study`,
    description: content.summary,
    image: project.imageUrl,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://pandeysantosh.com.np',
    },
    keywords: project.tags.map((tag) => tag.name),
    ...(isSoftwareProject && {
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
    }),
    ...(project.sourceCodeLink && { codeRepository: project.sourceCodeLink }),
    ...(project.demoUrl && { installUrl: project.demoUrl }),
    sameAs: [project.demoUrl, project.sourceCodeLink].filter(Boolean),
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

        <article className="pt-32 pb-16 sm:px-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb navigation for better UX and SEO */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-secondary">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white" aria-current="page">{project.name}</span>
            </nav>

            <header className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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

                {/* Technology tags */}
                <div className="mt-7 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.id}
                      role="listitem"
                      className={`text-sm ${tag.color} bg-gray-800/30 px-3 py-1 rounded-md`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Call-to-action buttons */}
                <ProjectCTAs
                  slug={project.slug}
                  name={project.name}
                  demoUrl={project.demoUrl}
                  sourceCodeLink={project.sourceCodeLink}
                />
              </div>

              <figure className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={project.imageUrl}
                  alt={`${project.name} project preview showing the main interface`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              </figure>
            </header>
          </div>
        </article>

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

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="pb-24 sm:px-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="border-t border-white/10 pt-16">
                <h2 className="text-white text-3xl font-bold">Related Projects</h2>
                <p className="mt-2 text-secondary">
                  Explore similar work using related technologies and approaches
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/${relatedProject.slug}`}
                      className="group rounded-lg border border-white/10 bg-tertiary p-5 hover:border-[#915eff] transition-all duration-300"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={relatedProject.imageUrl}
                          alt={`${relatedProject.name} preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-4 text-white font-bold text-lg group-hover:text-[#915eff] transition-colors line-clamp-1">
                        {relatedProject.name}
                      </h3>
                      <p className="mt-2 text-secondary text-sm leading-relaxed line-clamp-2">
                        {relatedProject.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {relatedProject.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className={`text-xs ${tag.color} bg-gray-800/30 px-2 py-1 rounded-md`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
