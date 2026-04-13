'use client';

import { useInView } from 'react-intersection-observer';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '@/lib/styles';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import { textVariant } from '@/lib/motion';
import type { Experience } from '@/types/frontend';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <VerticalTimelineElement
        visible={inView}
        position={index % 2 === 0 ? 'left' : 'right'}
        contentStyle={{ background: '#1d1836', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid #232631' }}
        date={experience.date}
        iconStyle={{ background: experience.iconBgColor }}
        icon={
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={experience.iconUrl}
              alt={experience.companyName}
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
        }
      >
        <div>
          <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
          <p
            className="text-secondary text-[16px] font-semibold"
            style={{ margin: 0 }}
          >
            {experience.companyName}
          </p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={point.id || `experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point.text}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </div>
  );
};

interface ExperienceProps {
  experiences?: Experience[];
}

const Experience = ({ experiences = [] }: ExperienceProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={textVariant()} className={styles.paddingX}>
        <p className={styles.sectionSubText}>What I Have Done So Far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline animate={true} layout="2-columns" lineColor="#232631">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, 'work');
