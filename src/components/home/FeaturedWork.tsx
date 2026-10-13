import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionLink } from './Section';
import { HUES, OFFER_ORDER } from './hues';
import { CaseImage } from './CaseImage';
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
      eyebrow="Work"
      title="Selected case studies"
      intro="What was built, who it was for, and what changed."
      action={<SectionLink href="/projects">All projects</SectionLink>}
    >
      <div className="space-y-14 sm:space-y-20">
        {projects.map((project, i) => {
          const context = project.clientName || project.details.eyebrow;
          const outcome = project.outcomeLine || project.details.summary;
          const flip = i % 2 === 1;
          const hue = HUES[OFFER_ORDER[i % OFFER_ORDER.length]];
          const image = project.screenshotUrl || project.imageUrl;
          return (
            <article key={project.id} data-reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <Link
                href={`/projects/${project.slug}`}
                className={`group block rounded-2xl border p-4 sm:p-7 ${hue.panel} ${flip ? 'lg:order-2' : ''}`}
                aria-label={`${project.name} case study`}
              >
                <CaseImage src={image} />
              </Link>

              <div className={flip ? 'lg:order-1' : ''}>
                {context && (
                  <p className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${hue.tile} ${hue.ink}`}>{context}</p>
                )}
                <h3 className="mt-3 text-fg text-2xl sm:text-[28px] font-semibold leading-tight tracking-[-0.015em]">
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
                  className="tap-target group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-brand-fg transition-colors"
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
