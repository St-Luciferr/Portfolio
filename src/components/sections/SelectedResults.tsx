'use client';

import { motion } from 'framer-motion';
import { styles } from '@/lib/styles';
import { fadeIn, textVariant } from '@/lib/motion';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import type { SelectedResultMetric } from '@/types/frontend';

interface MetricCardProps {
  metric: SelectedResultMetric;
  index: number;
}

const MetricCard = ({ metric, index }: MetricCardProps) => (
  <motion.div
    variants={fadeIn('up', 'spring', 0.15 * index, 0.75)}
    className="bg-tertiary rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center"
  >
    <span className="text-[#915eff] text-4xl sm:text-5xl font-black leading-none">
      {metric.value}
    </span>
    <span className="text-white font-bold text-base sm:text-lg mt-3">
      {metric.label}
    </span>
    <span className="text-secondary text-xs sm:text-sm mt-1 leading-relaxed">
      {metric.context}
    </span>
  </motion.div>
);

interface SelectedResultsProps {
  heading?: string;
  subheading?: string;
  metrics?: SelectedResultMetric[];
}

const SelectedResults = ({
  heading,
  subheading,
  metrics = [],
}: SelectedResultsProps) => {
  if (metrics.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={textVariant()} className={styles.paddingX}>
        <p className={styles.sectionSubText}>Proof of Work</p>
        <h2 className={styles.sectionHeadText}>
          {heading || 'Selected Results.'}
        </h2>
        {subheading && (
          <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
            {subheading}
          </p>
        )}
      </motion.div>

      <div className={`mt-10 ${styles.paddingX} grid grid-cols-2 sm:grid-cols-4 gap-5`}>
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(SelectedResults, 'results');
