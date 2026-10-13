import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { PostCard } from '@/components/blog/PostCard';
import { Section, SectionLink } from './Section';
import type { BlogPost } from '@/types/frontend';

/** A lone post spans the row (image beside text) instead of leaving two empty columns. */
function FeaturedPost({ post }: { post: BlogPost }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-2xl border border-fg/10 bg-tertiary shadow-soft transition-[box-shadow,border-color] hover:border-brand/40 hover:shadow-lift md:grid-cols-2"
    >
      {post.coverImageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden bg-black-100 md:aspect-auto md:min-h-[280px]">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-9">
        {post.tags.length > 0 && (
          <p className="flex flex-wrap gap-2 text-xs font-medium text-brand-fg">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag.slug}>#{tag.name}</span>
            ))}
          </p>
        )}
        <h3 className="text-fg text-[22px] font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-brand-fg">
          {post.title}
        </h3>
        {post.excerpt && <p className="text-[15px] leading-relaxed text-secondary line-clamp-3">{post.excerpt}</p>}
        <p className="mt-2 flex items-center gap-3 text-xs text-secondary">
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
          {post.readingTimeMinutes > 0 && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readingTimeMinutes} min read
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

export function Writing({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Notes from the build"
      intro="Practical write-ups on RAG, automation and shipping AI features."
      action={<SectionLink href="/blog">All posts</SectionLink>}
    >
      {posts.length === 1 ? (
        <FeaturedPost post={posts[0]} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </Section>
  );
}
