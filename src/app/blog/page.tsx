import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import {
  getAllPublishedTags,
  getAllSiteSettings,
  getPublishedNavLinks,
  getPublishedPosts,
} from '@/lib/services';
import { PostCard } from '@/components/blog/PostCard';
import { TagChip } from '@/components/blog/TagChip';

export const revalidate = 60;

const SITE_URL = 'https://pandeysantosh.com.np';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Blog and deep-dives lessons from the field';
  const description =
    'Technical write-ups on RAG, automation, backend architecture, and building AI products that ship.';
  const canonical = `${SITE_URL}/blog`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: 'Santosh Pandey Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Su_n_toss',
      creator: '@Su_n_toss',
      title,
      description,
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
  };
}

export default async function BlogIndexPage() {
  const [posts, tags, navLinks, settings] = await Promise.all([
    getPublishedPosts(),
    getAllPublishedTags(),
    getPublishedNavLinks(),
    getAllSiteSettings(),
  ]);

  const authorName = settings['hero']?.name || 'Santosh Pandey';

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${authorName} — Blog`,
    url: `${SITE_URL}/blog`,
    description:
      'Technical write-ups on RAG, automation, backend architecture, and building AI products.',
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <main className="min-h-screen bg-primary">
        <Navbar navLinks={navLinks} />

        <section className="pt-32 pb-10 sm:px-16 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#915eff] text-sm font-semibold tracking-wider uppercase">
              Developer Notes
            </p>
            <h1 className="mt-3 text-white font-black text-[40px] sm:text-[56px] leading-tight max-w-3xl">
              Notes, deep-dives, and lessons from the field.
            </h1>
            <p className="mt-5 text-secondary text-lg max-w-2xl">
              Practical write-ups on RAG, automation, backend architecture,
              and what I learn while shipping AI-powered products.
            </p>

            {tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagChip key={tag.slug} name={tag.name} slug={tag.slug} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="pb-24 sm:px-16 px-6">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-tertiary/40 p-12 text-center">
                <p className="text-white font-medium">
                  Posts are on the way.
                </p>
                <p className="text-secondary mt-2 text-sm">
                  The first deep-dive lands here soon.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, idx) => (
                  <PostCard key={post.id} post={post} priority={idx < 3} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
