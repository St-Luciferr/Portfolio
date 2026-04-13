'use client';

import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { styles } from '@/lib/styles';
import { fadeIn, textVariant } from '@/lib/motion';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import type { DBService } from '@/lib/types';

interface ServiceCardProps {
  index: number;
  title: string;
  icon_url: string;
}

const ServiceCard = ({ index, title, icon_url }: ServiceCardProps) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-slate-900 shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <Image
            src={icon_url}
            alt={title}
            width={64}
            height={64}
            className="object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

interface AboutProps {
  data?: {
    paragraphs?: string[];
  };
  services?: DBService[];
}

const About = ({ data, services = [] }: AboutProps) => {
  const paragraphs = data?.paragraphs || [
    "I am a passionate machine learning enthusiast and backend-focused engineer, with over two years of hands-on experience developing AI-powered systems and scalable backend services using Python, Django, and FastAPI.",
    "I've worked on impactful projects such as medical chatbots using RAG architectures, LLM-powered WhatsApp agents, and intelligent document automation tools—leveraging technologies like HuggingFace, OpenAI, LlamaIndex, Pinecone, and Robocorp RPA.",
    "Constantly exploring innovations in model optimization, embedding techniques, and knowledge retrieval, I'm seeking opportunities to contribute to forward-thinking teams working in the fields of Generative AI, computer vision, and applied machine learning.",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={textVariant()} className={styles.paddingX}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn('', 'tween', 0.1, 1)}
        className={`mt-8 ${styles.paddingX} text-secondary text-[17px] max-w-5xl leading-[30px]`}
        style={{ textAlign: 'justify' }}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index > 0 ? 'mt-4' : ''}>
            {paragraph}
          </p>
        ))}
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            index={index}
            title={service.title}
            icon_url={service.icon_url}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
