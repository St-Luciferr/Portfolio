'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { styles } from '@/lib/styles';
import { fadeIn, textVariant } from '@/lib/motion';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import type { Testimonial } from '@/types/frontend';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => (
  <motion.div
    variants={fadeIn('', 'spring', index * 0.5, 0.75)}
    className="bg-black-200 p-8 rounded-3xl xs:w-[320px] w-full border border-white/5"
  >
    <p className="text-white font-black text-[48px] leading-none">"</p>
    <div className="mt-1">
      <p className="text-white tracking-wider text-[17px] leading-7">
        {testimonial.testimonial}
      </p>
      <div className="mt-7 flex justify-between items-center gap-3">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {testimonial.name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {testimonial.designation} at {testimonial.company}
          </p>
        </div>
        <Image
          src={testimonial.imageUrl}
          alt={testimonial.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      </div>
    </div>
  </motion.div>
);

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  if (testimonials.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={textVariant()} className={styles.paddingX}>
        <p className={styles.sectionSubText}>What Clients Say</p>
        <h2 className={styles.sectionHeadText}>Testimonials.</h2>
      </motion.div>

      <div className={`mt-10 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {testimonials.map((t, index) => (
          <TestimonialCard key={t.id} testimonial={t} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, 'testimonials');
