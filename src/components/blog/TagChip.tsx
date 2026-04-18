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
          ? 'bg-[#915eff] border-[#915eff] text-white shadow-md shadow-[#915eff]/30'
          : 'bg-white/5 border-white/10 text-secondary hover:border-[#915eff] hover:text-white',
        className
      )}
    >
      #{name}
    </Link>
  );
}
