'use client';

import SectionWrapper from '@/components/hoc/SectionWrapper';
import { technologies } from '@/lib/constants';
import LazyBallCanvas from '@/components/canvas/LazyBallCanvas';

const Tech = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div
            title={technology.name}
            className="w-28 h-28"
            key={technology.name}
          >
            <LazyBallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');
