'use client';

import type { ReactNode } from 'react';

export type BentoCellSize = 'default' | 'wide' | 'tall' | 'large';

const SIZE_CLASSES: Record<BentoCellSize, string> = {
  default: '',
  wide: 'md:col-span-2',
  tall: 'lg:row-span-2',
  large: 'md:col-span-2 lg:row-span-2',
};

export const DEFAULT_BENTO_PATTERN: BentoCellSize[] = [
  'large',
  'default',
  'tall',
  'wide',
  'default',
  'default',
];

export function getBentoSizeByIndex(
  index: number,
  pattern: BentoCellSize[] = DEFAULT_BENTO_PATTERN,
): BentoCellSize {
  return pattern[index % pattern.length];
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  rowHeight?: string;
}

export function BentoGrid({
  children,
  className = '',
  rowHeight = '260px',
}: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 [grid-auto-flow:dense] ${className}`}
      style={{ gridAutoRows: `minmax(${rowHeight}, auto)` }}
    >
      {children}
    </div>
  );
}

interface BentoCellProps {
  children: ReactNode;
  size?: BentoCellSize;
  index?: number;
  pattern?: BentoCellSize[];
  className?: string;
}

export function BentoCell({
  children,
  size,
  index,
  pattern = DEFAULT_BENTO_PATTERN,
  className = '',
}: BentoCellProps) {
  const resolvedSize =
    size ??
    (typeof index === 'number'
      ? getBentoSizeByIndex(index, pattern)
      : 'default');

  return (
    <div className={`${SIZE_CLASSES[resolvedSize]} ${className}`}>
      {children}
    </div>
  );
}
