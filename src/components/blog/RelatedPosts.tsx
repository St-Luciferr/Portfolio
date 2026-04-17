import { PostCard } from './PostCard';
import type { BlogPost } from '@/types/frontend';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-20">
      <div className="border-t border-white/10 pt-12">
        <h2
          id="related-heading"
          className="text-white text-2xl sm:text-3xl font-bold"
        >
          Keep reading
        </h2>
        <p className="mt-2 text-secondary">
          More deep-dives on similar topics.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
