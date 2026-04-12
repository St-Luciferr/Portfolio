'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Lazy load BallCanvas only when visible
const BallCanvas = dynamic(() => import('./Ball'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="canvas-loader" />
    </div>
  ),
});

interface LazyBallCanvasProps {
  icon: string;
}

const LazyBallCanvas = ({ icon }: LazyBallCanvasProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setShowFallback(true);
      return;
    }

    // Intersection Observer to load 3D only when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            // Small delay to stagger loading of multiple balls
            setTimeout(() => {
              setShouldLoad(true);
            }, Math.random() * 500); // Random 0-500ms delay
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [shouldLoad]);

  // Fallback for reduced motion or mobile
  if (showFallback) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="relative w-20 h-20 transition-transform hover:scale-110 duration-300">
          <Image
            src={icon}
            alt="Technology icon"
            fill
            className="object-contain drop-shadow-lg"
            sizes="80px"
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldLoad ? <BallCanvas icon={icon} /> : null}
    </div>
  );
};

export default LazyBallCanvas;
