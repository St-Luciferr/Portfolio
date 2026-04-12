'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load 3D components only when needed
const ComputersCanvas = dynamic(() => import('./Computers'), { ssr: false });
const EarthCanvas = dynamic(() => import('./Earth'), { ssr: false });

interface Lazy3DCanvasProps {
  type: 'computer' | 'earth';
}

const Lazy3DCanvas = ({ type }: Lazy3DCanvasProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay 3D loading to improve initial page load
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1500); // Load after 1.5s to let critical content render first

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <div className="canvas-loader" />
      </div>
    );
  }

  return type === 'computer' ? <ComputersCanvas /> : <EarthCanvas />;
};

export default Lazy3DCanvas;
