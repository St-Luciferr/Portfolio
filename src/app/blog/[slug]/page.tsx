import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import {
  getAllSiteSettings,
  getPostBySlug,
  getPublishedNavLinks,
  getPublishedPostSlugs,
  getRelatedPosts,
} from '@/lib/services';
import { renderMarkdown, extractHeadings } from '@/lib/markdown';
import { PostMeta } from '@/components/blog/PostMeta';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export const revalidate = 60;

const SITE_URL = 'https://pandeysantosh.com.np';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post Not Found' };

  const title = post.seo.title || post.title;
  const description = post.seo.description || post.excerpt;
  const canonical = post.seo.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const tagNames = post.tags.map((t) => t.name);
  const keywords = Array.from(new Set([...tagNames, ...post.seo.keywords]));
  const images = post.coverImageUrl
    ? [
        {
          url: post.coverImageUrl,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.title,
        },
      ]
    : [];

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Santosh Pandey', url: SITE_URL }],
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      siteName: 'Santosh Pandey Portfolio',
      images,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: ['Santosh Pandey'],
      tags: tagNames,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Su_n_toss',
      creator: '@Su_n_toss',
      title,
      description,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, navLinks, settings] = await Promise.all([
    getPostBySlug(slug),
    getPublishedNavLinks(),
    getAllSiteSettings(),
  ]);

  if (!post) notFound();

  const [html, related] = await Promise.all([
    renderMarkdown(post.content),
    getRelatedPosts(
      post.id,
      post.tags.map((t) => t.slug),
      3
    ),
  ]);
  const headings = extractHeadings(post.content);

  const canonical = post.seo.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const authorName = settings['hero']?.name || 'Santosh Pandey';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
    keywords: post.tags.map((t) => t.name).join(', '),
    articleBody: post.excerpt,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-primary">
        <Navbar navLinks={navLinks} />

        <article className="pt-28 pb-16 sm:px-16 px-6">
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
              <span className="text-white truncate max-w-[60vw]" aria-current="page">
                {post.title}
              </span>
            </nav>

            <header className="mt-10 max-w-4xl">
              <h1 className="text-white font-black text-[34px] sm:text-[48px] leading-tight">
                {post.title}
              </h1>
              <p className="mt-5 text-secondary text-lg leading-relaxed">
                {post.excerpt}
              </p>
              <PostMeta
                className="mt-6"
                publishedAt={post.publishedAt}
                readingTimeMinutes={post.readingTimeMinutes}
                tags={post.tags}
                author={authorName}
              />
            </header>

            {post.coverImageUrl && (
              <figure className="mt-10 relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
              </figure>
            )}
          </div>
        </article>

        <section className="pb-24 sm:px-16 px-6">
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="min-w-0">
              <div className="lg:hidden mb-6">
                <TableOfContents headings={headings} />
              </div>
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-xl prose-p:text-secondary prose-p:leading-8 prose-li:text-secondary prose-strong:text-white prose-a:text-[#915eff] hover:prose-a:text-[#b48cff] prose-a:no-underline hover:prose-a:underline prose-code:text-[#b48cff] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-black-100 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-blockquote:border-l-[#915eff] prose-blockquote:text-secondary prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <RelatedPosts posts={related} />

              <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/blog"
                  className="text-sm text-secondary hover:text-white transition-colors"
                >
                  ← Back to blog
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-md bg-[#915eff] px-4 py-2 text-white text-sm font-semibold hover:bg-[#7a4fd4] transition-colors"
                >
                  Let&apos;s work together
                </Link>
              </div>
            </div>

            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
