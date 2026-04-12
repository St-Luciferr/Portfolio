'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import SectionWrapper from '@/components/hoc/SectionWrapper';
import { technologies } from '@/lib/constants';

// Dynamic import for 3D canvas with SSR disabled
const BallCanvas = dynamic(() => import('@/components/canvas/Ball'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="canvas-loader" />
    </div>
  ),
});

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
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');
