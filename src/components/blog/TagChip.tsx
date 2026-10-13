import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagChipProps {
  name: string;
  slug: string;
  active?: boolean;
  className?: string;
}

export function TagChip({ name, slug, active, className }: TagChipProps) {
  return (
    <Link
      href={`/blog/tag/${slug}`}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all',
        'border',
        active
          ? 'bg-brand border-brand text-white shadow-soft'
          : 'bg-fg/5 border-fg/10 text-secondary hover:border-brand hover:text-fg',
        className
      )}
    >
      #{name}
    </Link>
  );
}
