'use client';

import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { styles } from '@/lib/styles';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import { projects } from '@/lib/constants';
import { fadeIn, textVariant } from '@/lib/motion';
import type { Project, ProjectTag } from '@/lib/types';

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
  demo_url?: boolean;
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_url,
}: ProjectCardProps) => {
  const [readMore, setReadMore] = useState(false);
  const maxDescriptionLength = 120;

  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + '...'
      : description;

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="sm:w-[360px] w-full"
      style={{ minHeight: '480px' }}
    >
      <Tilt className="bg-tertiary p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col h-full">
        <div className="relative w-full h-48 sm:h-54 md:h-62 lg:h-68 xl:h-76 rounded-3xl overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-3xl"
          />

          <div className="absolute inset-0 flex justify-end items-start p-4">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, '_blank');
              }}
              className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800/70 transition-colors duration-200"
              title={demo_url ? 'View Demo' : 'View Source Code'}
            >
              <Image
                src={demo_url ? '/images/web.png' : '/images/github.png'}
                alt={demo_url ? 'demo' : 'github'}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col flex-grow">
          <h3
            className="text-white font-semibold text-xl sm:text-2xl truncate"
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
                  e.stopPropagation();
                  setReadMore(!readMore);
                }}
                className="ml-2 text-blue-400 hover:underline focus:outline-none"
              >
                {readMore ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-[13px] sm:text-sm ${tag.color} bg-gray-800/30 px-2 py-1 rounded-full select-none`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
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
          links to code repositories.
        </motion.p>
      </div>

      <div
        className={`${styles.paddingX} mt-10 flex flex-wrap items-center justify-center gap-7`}
      >
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'projects');
