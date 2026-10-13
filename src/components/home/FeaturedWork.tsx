import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionLink } from './Section';
import type { Project } from '@/types/frontend';

interface FeaturedWorkProps {
  projects: Project[];
}

/** Projects flagged `is_featured` (migration 009); first three by order until any are flagged. */
export function pickFeatured(projects: Project[], count = 3): Project[] {
  const featured = projects.filter((p) => p.isFeatured);
  return (featured.length > 0 ? featured : projects).slice(0, count);
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Case studies."
      intro="What was built, for whom, and what it changed."
      action={<SectionLink href="/projects">All projects</SectionLink>}
      className="bg-black-100/40"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) => {
          const context = project.clientName || project.details.eyebrow;
          const outcome = project.outcomeLine || project.details.summary;
          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-tertiary/60 transition-colors hover:border-[#915eff]/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black-100">
                <Image
                  src={project.screenshotUrl || project.imageUrl}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {context && <p className="text-xs uppercase tracking-wider text-[#cbb5ff]">{context}</p>}
                <h3 className="mt-2 text-white text-xl font-bold">{project.name}</h3>
                {outcome && <p className="mt-3 text-sm leading-6 text-secondary line-clamp-3">{outcome}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.details.stack.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-md bg-black-100 px-2 py-1 text-[11px] text-secondary">
                      {item}
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#cbb5ff] group-hover:text-white">
                  Read the case study <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
