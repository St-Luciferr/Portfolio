'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { styles } from '@/lib/styles';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import { fadeIn, textVariant } from '@/lib/motion';
import { track } from '@/lib/analytics';
import { BentoCell, BentoGrid, getBentoSizeByIndex } from '@/components/ui/BentoGrid';
import type { Project, ProjectTag } from '@/types/frontend';

interface ProjectCardProps {
  index: number;
  slug: string;
  name: string;
  description: string;
  tags: ProjectTag[];
  sourceCodeLink: string;
  demoUrl: string | null;
  isDemo: boolean;
  eyebrow?: string;
  stack?: string[];
}

const MAX_STACK_CHIPS_LARGE = 6;
const MAX_STACK_CHIPS_DEFAULT = 4;

const ProjectCard = ({
  index,
  slug,
  name,
  description,
  tags,
  sourceCodeLink,
  demoUrl,
  isDemo,
  eyebrow,
  stack = [],
}: ProjectCardProps) => {
  const linkUrl = isDemo && demoUrl ? demoUrl : sourceCodeLink;

  const size = getBentoSizeByIndex(index);
  const isLarge = size === 'large';
  const isWide = size === 'wide';

  const primaryTagName = tags[0]?.name?.toUpperCase();
  const eyebrowBase = eyebrow?.trim() || 'Case Study';
  const eyebrowLabel = primaryTagName
    ? `${eyebrowBase} · ${primaryTagName}`
    : eyebrowBase;

  const stackLimit = isLarge ? MAX_STACK_CHIPS_LARGE : MAX_STACK_CHIPS_DEFAULT;
  const visibleStack = stack.slice(0, stackLimit);
  const extraStackCount = Math.max(0, stack.length - stackLimit);

  return (
    <motion.div
      variants={fadeIn('up', 'tween', 0.04 * index, 0.4)}
      className="green-pink-gradient group relative h-full w-full rounded-[20px] p-[1px] shadow-card shadow-slate-900"
    >
      <Link
        href={`/projects/${slug}`}
        aria-label={`View ${name} case study`}
        data-cursor-label="Case Study"
        className="relative flex h-full w-full flex-col rounded-[19px] bg-tertiary p-6 sm:p-7 transition-colors duration-300 hover:bg-[#1a1538]"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary/80">
            {eyebrowLabel}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              track(
                isDemo ? 'project_demo_click' : 'project_source_click',
                { slug, source: 'card' }
              );
              window.open(linkUrl, '_blank', 'noopener,noreferrer');
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black-200/60 text-secondary transition-colors duration-200 hover:border-[#915eff] hover:bg-[#915eff] hover:text-white"
            title={isDemo ? 'View Demo' : 'View Source Code'}
            aria-label={isDemo ? `View ${name} demo` : `View ${name} source code`}
            data-cursor-label={isDemo ? 'Live Demo' : 'Source'}
          >
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 11L11 5" />
              <path d="M6 5h5v5" />
            </svg>
          </button>
        </div>

        <h3
          className={`mt-8 font-bold text-white tracking-tight ${
            isLarge
              ? 'text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1]'
              : isWide
              ? 'text-[24px] sm:text-[28px] leading-[1.15]'
              : 'text-[22px] sm:text-[24px] leading-[1.2]'
          }`}
        >
          {name}
        </h3>

        <p
          className={`mt-3 text-[14px] leading-relaxed text-secondary ${
            isLarge ? 'max-w-2xl line-clamp-4' : 'line-clamp-3'
          }`}
        >
          {description}
        </p>

        {visibleStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {visibleStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#915eff]/20 bg-black-200/40 px-3 py-1 text-[11px] font-medium text-secondary"
              >
                {item}
              </span>
            ))}
            {extraStackCount > 0 && (
              <span className="rounded-full border border-white/10 bg-black-200/40 px-3 py-1 text-[11px] font-medium text-secondary/60">
                +{extraStackCount}
              </span>
            )}
          </div>
        )}
      </Link>
    </motion.div>
  );
};

interface WorksProps {
  projects?: Project[];
}

const Works = ({ projects = [] }: WorksProps) => {
  const projectCount = projects.length;
  const countLabel = projectCount.toString().padStart(2, '0');

  return (
    <div className="relative max-w-7xl mx-auto">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-[#00cea8]/10 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-10 h-[320px] w-[320px] rounded-full bg-[#915eff]/15 blur-[140px]"
      />

      <motion.div
        variants={textVariant()}
        className={`${styles.paddingX} relative`}
      >
        <p className={styles.sectionSubText}>
          <span className="mr-3 text-[#915eff]">Selected Works</span>
        </p>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className={styles.sectionHeadText}>
            Projects that{' '}
            <span className="font-light text-[#915eff]">shipped.</span>
          </h2>
          {projectCount > 0 && (
            <span className="pb-2 text-xs font-medium uppercase tracking-[0.22em] text-secondary/60">
              {countLabel}&nbsp;Projects
            </span>
          )}
        </div>
      </motion.div>

      <div className={`${styles.paddingX} w-full flex relative`}>
        <motion.p
          variants={fadeIn('', 'tween', 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A selection of case studies — end-to-end builds across GenAI, full-stack
          web, and data platforms. Tap any card for the full case study, or the
          arrow to jump straight to the demo or source.
        </motion.p>
      </div>

      <div className={`${styles.paddingX} mt-12 relative`}>
        <BentoGrid rowHeight="260px">
          {projects.map((project, index) => (
            <BentoCell key={project.id} index={index}>
              <ProjectCard
                index={index}
                slug={project.slug}
                name={project.name}
                description={project.description}
                tags={project.tags}
                sourceCodeLink={project.sourceCodeLink}
                demoUrl={project.demoUrl}
                isDemo={project.isDemo}
                eyebrow={project.details?.eyebrow}
                stack={project.details?.stack}
              />
            </BentoCell>
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'projects');
