import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import { getProjectDetailContent } from '@/lib/project-details';
import type { Project, NavLink } from '@/types/frontend';

function ProjectCard({ project }: { project: Project }) {
  const content = getProjectDetailContent(project);
  const context = project.clientName || content.eyebrow;
  const outcome = project.outcomeLine || content.summary;
  const externalUrl = project.isDemo && project.demoUrl ? project.demoUrl : project.sourceCodeLink;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-fg/10 bg-tertiary/60 transition-colors hover:border-brand/60">
      <Link href={`/projects/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-white">
        <Image
          src={project.screenshotUrl || project.imageUrl}
          alt={`${project.name} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {context && <p className="text-xs font-medium text-brand-fg line-clamp-1">{context}</p>}
        <h3 className="mt-2 text-fg text-xl font-bold">
          <Link href={`/projects/${project.slug}`} className="hover:text-brand-fg transition-colors">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-secondary line-clamp-3">{outcome}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag.id} className="rounded-md bg-black-100 px-2 py-1 text-[11px] text-secondary">
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="font-semibold text-brand-fg hover:text-fg transition-colors"
          >
            Read the case study →
          </Link>
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-secondary hover:text-fg transition-colors"
            >
              {project.isDemo ? 'Demo' : 'Source'} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

interface ProjectsClientProps {
  projects: Project[];
  navLinks: NavLink[];
}

// Server-rendered list. Splits into client / research groups once any project
// has a category (migration 009); until then everything shows as one grid.
export default function ProjectsClient({ projects, navLinks }: ProjectsClientProps) {
  const isGrouped = projects.some((p) => p.category);
  const groups = isGrouped
    ? [
        { title: 'Client work', items: projects.filter((p) => p.category === 'client') },
        { title: 'Research & experiments', items: projects.filter((p) => p.category === 'research') },
        { title: 'More projects', items: projects.filter((p) => !p.category) },
      ].filter((g) => g.items.length > 0)
    : [{ title: null, items: projects }];

  return (
    <main className="min-h-screen bg-primary">
      <Navbar navLinks={navLinks} />

      <section className="pt-32 pb-20 sm:px-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-fg font-medium text-sm sm:text-base">Case studies</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-fg font-semibold tracking-[-0.025em] text-[38px] sm:text-[56px] leading-tight">Work</h1>
              <p className="mt-4 max-w-3xl text-secondary text-[17px] leading-8">
                Full-stack products, AI assistants and automation, each with notes on the problem, the
                implementation and the result.
              </p>
            </div>
            <Link
              href="/#contact"
              className="w-fit rounded-md bg-brand px-5 py-3 text-white font-semibold hover:bg-brand-strong transition-colors"
            >
              Discuss a project
            </Link>
          </div>

          <div className="mt-14 space-y-16">
            {groups.map((group) => (
              <div key={group.title ?? 'all'}>
                {group.title && <h2 className="mb-6 text-fg text-2xl font-bold">{group.title}</h2>}
                <ProjectGrid projects={group.items} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
