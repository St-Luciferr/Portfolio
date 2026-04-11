'use client';

import { motion } from 'framer-motion';
import { styles } from '@/lib/styles';
import { staggerContainer } from '@/lib/motion';
import type { ComponentType } from 'react';

function SectionWrapper<P extends object>(
  Component: ComponentType<P>,
  idName: string
) {
  return function HOC(props: P) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.paddingY} relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    );
  };
}

export default SectionWrapper;
