import { PostCard } from './PostCard';
import type { BlogPost } from '@/types/frontend';

/** Blog posts related to a service page. Renders nothing when none match. */
export function RelatedReading({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="related-reading-heading" className="pb-24 sm:px-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-white/10 pt-16">
          <p className="text-secondary uppercase tracking-wider text-sm">From the Blog</p>
          <h2 id="related-reading-heading" className="mt-3 text-white text-3xl font-bold">
            Related Reading
          </h2>
          <p className="mt-2 text-secondary">Deep-dives on the techniques behind this service</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
