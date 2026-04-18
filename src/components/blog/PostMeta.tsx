import { Clock, Calendar } from 'lucide-react';
import { TagChip } from './TagChip';
import type { BlogTag } from '@/types/frontend';

interface PostMetaProps {
  publishedAt: string | null;
  readingTimeMinutes: number;
  tags?: BlogTag[];
  author?: string;
  className?: string;
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function PostMeta({
  publishedAt,
  readingTimeMinutes,
  tags,
  author,
  className,
}: PostMetaProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary">
        {author && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#915eff]" />
            {author}
          </span>
        )}
        {publishedAt && (
          <time
            dateTime={publishedAt}
            className="inline-flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(publishedAt)}
          </time>
        )}
        {readingTimeMinutes > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readingTimeMinutes} min read
          </span>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagChip key={tag.slug} name={tag.name} slug={tag.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
