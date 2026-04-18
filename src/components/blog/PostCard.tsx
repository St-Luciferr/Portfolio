import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import type { BlogPost } from '@/types/frontend';

interface PostCardProps {
  post: BlogPost;
  priority?: boolean;
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function PostCard({ post, priority }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-tertiary/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#915eff]/50 hover:shadow-2xl hover:shadow-[#915eff]/10"
    >
      {post.coverImageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden bg-black-100">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/0 to-primary/0" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.slug}
                className="text-[11px] uppercase tracking-wider text-[#915eff] font-semibold"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-white text-xl font-bold leading-tight group-hover:text-[#915eff] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="mt-3 text-secondary text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between text-xs text-secondary">
          <time dateTime={post.publishedAt ?? undefined}>
            {formatDate(post.publishedAt)}
          </time>
          {post.readingTimeMinutes > 0 && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTimeMinutes} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
