'use client';

import SectionWrapper from '@/components/hoc/SectionWrapper';
import LazyBallCanvas from '@/components/canvas/LazyBallCanvas';
import type { Technology } from '@/types/frontend';

interface TechProps {
  technologies?: Technology[];
}

const Tech = ({ technologies = [] }: TechProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div
            title={technology.name}
            className="w-28 h-28"
            key={technology.id}
          >
            <LazyBallCanvas icon={technology.iconUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');
