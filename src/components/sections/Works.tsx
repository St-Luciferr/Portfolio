'use client';

import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { styles } from '@/lib/styles';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import { fadeIn, textVariant } from '@/lib/motion';
import { track } from '@/lib/analytics';
import type { Project, ProjectTag } from '@/types/frontend';

interface ProjectCardProps {
  index: number;
  slug: string;
  name: string;
  description: string;
  tags: ProjectTag[];
  imageUrl: string;
  sourceCodeLink: string;
  demoUrl: string | null;
  isDemo: boolean;
}

const ProjectCard = ({
  index,
  slug,
  name,
  description,
  tags,
  imageUrl,
  sourceCodeLink,
  demoUrl,
  isDemo,
}: ProjectCardProps) => {
  const [readMore, setReadMore] = useState(false);
  const maxDescriptionLength = 120;

  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + '...'
      : description;

  const linkUrl = isDemo && demoUrl ? demoUrl : sourceCodeLink;

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="sm:w-[360px] w-full"
      style={{ minHeight: '480px' }}
    >
      <Link href={`/projects/${slug}`} className="block h-full">
        <Tilt className="bg-tertiary p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col h-full cursor-pointer">
          <div className="relative w-full h-48 sm:h-54 md:h-62 lg:h-68 xl:h-76 rounded-3xl overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover rounded-3xl transition-transform duration-300 hover:scale-105"
            />

            <div className="absolute inset-0 flex justify-end items-start p-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  track(
                    isDemo ? 'project_demo_click' : 'project_source_click',
                    { slug, source: 'card' }
                  );
                  window.open(linkUrl, '_blank');
                }}
                className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800/70 transition-colors duration-200 z-10"
                title={isDemo ? 'View Demo' : 'View Source Code'}
                aria-label={isDemo ? `View ${name} demo` : `View ${name} source code`}
              >
                <Image
                  src={isDemo ? '/images/web.png' : '/images/github.png'}
                  alt={isDemo ? 'demo' : 'github'}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col flex-grow">
            <h3
              className="text-white font-semibold text-xl sm:text-2xl truncate hover:text-[#915eff] transition-colors"
              title={name}
            >
              {name}
            </h3>

            <p
              className="mt-3 text-secondary text-sm sm:text-base leading-relaxed"
              style={{ textAlign: 'justify' }}
            >
              {readMore ? description : truncatedDescription}
              {description.length > maxDescriptionLength && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setReadMore(!readMore);
                  }}
                  className="ml-2 text-[#915eff] hover:underline focus:outline-none"
                >
                  {readMore ? 'Read less' : 'Read more'}
                </button>
              )}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`text-[13px] sm:text-sm ${tag.color} bg-gray-800/30 px-2 py-1 rounded-full select-none`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <span className="mt-5 inline-flex w-fit text-sm font-semibold text-[#915eff] hover:text-white transition-colors">
              View case study →
            </span>
          </div>
        </Tilt>
      </Link>
    </motion.div>
  );
};

interface WorksProps {
  projects?: Project[];
}

const Works = ({ projects = [] }: WorksProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={textVariant()} className={styles.paddingX}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className={`${styles.paddingX} w-full flex`}>
        <motion.p
          variants={fadeIn('', 'tween', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          The following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to detailed case studies, source code, and live demos where available.
        </motion.p>
      </div>

      <div
        className={`${styles.paddingX} mt-10 flex flex-wrap items-center justify-center gap-7`}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'projects');
