'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Case-study image frame that adapts to what it is given. Wide images
 * (screenshots, diagrams) fill a white 16:10 frame; square-ish ones are logos,
 * so they sit small on a see-through frame (inverted in the dark theme)
 * instead of being blown up. The aspect ratio is only known after load, so the
 * first paint assumes a screenshot, the common case.
 */
export function CaseImage({ src }: { src: string }) {
  const [logo, setLogo] = useState(false);
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-xl ${
        logo ? 'bg-white/60 ring-1 ring-fg/[0.06] dark:bg-white/[0.03]' : 'bg-white shadow-lift ring-1 ring-black/5'
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 540px"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalWidth / img.naturalHeight < 1.3) setLogo(true);
        }}
        className={`transition-transform duration-500 group-hover:scale-[1.02] ${
          logo ? 'object-contain p-[20%] opacity-85 dark:invert' : 'object-cover'
        }`}
      />
    </div>
  );
}
