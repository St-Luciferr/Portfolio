import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import readingTime from 'reading-time';

export interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['heading-anchor'] },
    })
    .use(rehypePrettyCode, {
      theme: 'github-dark-dimmed',
      keepBackground: false,
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify)
    .process(md);

  return String(file);
}

export function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Set<string>();
  const lines = md.split('\n');
  let inCodeFence = false;

  for (const raw of lines) {
    const line = raw.trimStart();
    if (line.startsWith('```')) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, '').trim();
    let id = slugify(text);
    let candidate = id;
    let n = 1;
    while (seen.has(candidate)) {
      candidate = `${id}-${n++}`;
    }
    id = candidate;
    seen.add(id);

    headings.push({ id, text, depth });
  }

  return headings;
}

export function computeReadingTime(md: string): number {
  if (!md.trim()) return 0;
  return Math.max(1, Math.round(readingTime(md).minutes));
}
