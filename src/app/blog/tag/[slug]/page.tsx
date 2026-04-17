import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import {
  getAllPublishedTags,
  getPostsByTag,
  getPublishedNavLinks,
} from '@/lib/services';
import { PostCard } from '@/components/blog/PostCard';
import { TagChip } from '@/components/blog/TagChip';

export const revalidate = 60;

const SITE_URL = 'https://pandeysantosh.com.np';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllPublishedTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getAllPublishedTags();
  const tag = tags.find((t) => t.slug === slug);

  const title = tag
    ? `Posts tagged #${tag.name}`
    : `Posts tagged #${slug}`;
  const description = `All blog posts filed under ${tag?.name || slug}.`;
  const canonical = `${SITE_URL}/blog/tag/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
    robots: { index: true, follow: true },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const [posts, allTags, navLinks] = await Promise.all([
    getPostsByTag(slug),
    getAllPublishedTags(),
    getPublishedNavLinks(),
  ]);

  const current = allTags.find((t) => t.slug === slug);
  if (!current && posts.length === 0) notFound();

  return (
    <main className="min-h-screen bg-primary">
      <Navbar navLinks={navLinks} />

      <section className="pt-32 pb-10 sm:px-16 px-6">
        <div className="max-w-6xl mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-3 text-sm text-secondary"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white" aria-current="page">
              #{current?.name || slug}
            </span>
          </nav>

          <h1 className="mt-8 text-white font-black text-[36px] sm:text-[48px] leading-tight">
            <span className="text-[#915eff]">#</span>
            {current?.name || slug}
          </h1>
          <p className="mt-3 text-secondary text-lg">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with{' '}
            <span className="text-white">#{current?.name || slug}</span>.
          </p>

          {allTags.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <TagChip
                  key={tag.slug}
                  name={tag.name}
                  slug={tag.slug}
                  active={tag.slug === slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24 sm:px-16 px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-tertiary/40 p-12 text-center">
              <p className="text-white font-medium">No posts yet</p>
              <p className="text-secondary mt-2 text-sm">
                Nothing tagged with #{current?.name || slug} is published right
                now.
              </p>
              <Link
                href="/blog"
                className="inline-block mt-4 text-[#915eff] hover:underline"
              >
                ← Back to all posts
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
