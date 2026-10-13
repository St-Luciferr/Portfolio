import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionLink } from './Section';
import type { Project } from '@/types/frontend';

/** Projects flagged `is_featured` (migration 009); first three by order until any are flagged. */
export function pickFeatured(projects: Project[], count = 3): Project[] {
  const featured = projects.filter((p) => p.isFeatured);
  return (featured.length > 0 ? featured : projects).slice(0, count);
}

/** Alternating image / text rows: each case study gets room to read. */
export function FeaturedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <Section
      id="work"
      tone="band"
      title="Selected case studies"
      intro="What was built, who it was for, and what changed."
      action={<SectionLink href="/projects">All projects</SectionLink>}
    >
      <div className="space-y-16 sm:space-y-24">
        {projects.map((project, i) => {
          const context = project.clientName || project.details.eyebrow;
          const outcome = project.outcomeLine || project.details.summary;
          const flip = i % 2 === 1;
          return (
            <article key={project.id} data-reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <Link
                href={`/projects/${project.slug}`}
                className={`group block overflow-hidden rounded-xl border border-fg/10 bg-tertiary p-2 shadow-lift ${flip ? 'lg:order-2' : ''}`}
                aria-label={`${project.name} case study`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white">
                  <Image
                    src={project.screenshotUrl || project.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className={flip ? 'lg:order-1' : ''}>
                {context && <p className="text-sm font-medium text-brand-fg">{context}</p>}
                <h3 className="mt-2 text-fg text-2xl sm:text-[28px] font-semibold leading-tight tracking-[-0.015em]">
                  {project.name}
                </h3>
                {outcome && <p className="mt-4 text-[16px] leading-[1.7] text-secondary">{outcome}</p>}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.details.stack.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-fg/10 bg-tertiary px-2.5 py-1 text-xs text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-brand-fg transition-colors"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
