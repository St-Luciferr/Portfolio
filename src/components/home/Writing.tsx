import { PostCard } from '@/components/blog/PostCard';
import { Section, SectionLink } from './Section';
import type { BlogPost } from '@/types/frontend';

export function Writing({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section
      id="writing"
      title="Notes from the build"
      intro="Practical write-ups on RAG, automation and shipping AI features."
      action={<SectionLink href="/blog">All posts</SectionLink>}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Section>
  );
}
