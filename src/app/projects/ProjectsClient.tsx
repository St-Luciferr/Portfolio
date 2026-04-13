'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Tilt from 'react-parallax-tilt';

import Navbar from '@/components/layout/Navbar';
import { getProjectDetailContent } from '@/lib/project-details';
import type { Project, NavLink } from '@/types/frontend';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [readMore, setReadMore] = useState(false);
  const content = getProjectDetailContent(project);
  const maxDescriptionLength = 140;

  const truncatedDescription =
    content.summary.length > maxDescriptionLength
      ? content.summary.slice(0, maxDescriptionLength) + '...'
      : content.summary;

  const linkUrl = project.isDemo && project.demoUrl ? project.demoUrl : project.sourceCodeLink;

  return (
    <article className="sm:w-[360px] w-full">
      <Tilt className="bg-tertiary p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border border-white/5">
        <Link
          href={`/projects/${project.slug}`}
          className="group block"
          aria-label={`View ${project.name} case study`}
        >
          <div className="relative w-full h-48 rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt={`${project.name} project preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex justify-end items-start p-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(linkUrl, '_blank');
                }}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800/70 transition-colors duration-200"
                title={project.isDemo ? 'View Demo' : 'View Source Code'}
                aria-label={project.isDemo ? `View ${project.name} demo` : `View ${project.name} source code`}
              >
                <Image
                  src={project.isDemo ? '/images/web.png' : '/images/github.png'}
                  alt={project.isDemo ? 'demo' : 'github'}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </Link>

        <div className="mt-5 flex flex-col flex-grow">
          <p className="text-secondary text-xs uppercase tracking-wider">
            {content.eyebrow}
          </p>

          <Link href={`/projects/${project.slug}`} className="group">
            <h2 className="mt-2 text-white text-xl font-bold group-hover:text-[#915eff] transition-colors line-clamp-1">
              {project.name}
            </h2>
          </Link>

          <p className="mt-3 text-secondary text-sm leading-relaxed">
            {readMore ? content.summary : truncatedDescription}
            {content.summary.length > maxDescriptionLength && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setReadMore(!readMore);
                }}
                className="ml-2 text-[#915eff] hover:underline focus:outline-none"
              >
                {readMore ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>

          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag.id}
                  className={`text-xs ${tag.color} bg-gray-800/30 px-2.5 py-1 rounded-full select-none`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-[#915eff] hover:text-white transition-colors"
            >
              View case study →
            </Link>
          </div>
        </div>
      </Tilt>
    </article>
  );
}

interface ProjectsClientProps {
  projects: Project[];
  navLinks: NavLink[];
}

export default function ProjectsClient({ projects, navLinks }: ProjectsClientProps) {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar navLinks={navLinks} />

      <section className="pt-32 pb-20 sm:px-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-secondary uppercase tracking-wider text-sm sm:text-base">
            Case studies
          </p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-white font-black text-[38px] sm:text-[60px] leading-tight">
                Projects
              </h1>
              <p className="mt-4 max-w-3xl text-secondary text-[17px] leading-8">
                A collection of AI, RAG, automation, backend, mobile, and
                full-stack work with notes on the problem, implementation,
                architecture, and results.
              </p>
            </div>
            <Link
              href="/#contact"
              className="w-fit rounded-md bg-[#915eff] px-5 py-3 text-white font-semibold hover:bg-[#7a4fd4] transition-colors"
            >
              Discuss a Project
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-7">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
