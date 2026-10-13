/**
 * Fuzzy overlap between free-text tag lists that come from different tables
 * (blog_tags, project_tags, services.tools_technologies). Their spellings
 * differ ("AI Chatbot" vs "Chatbot", "OpenAI GPT-4" vs "OpenAI"), so terms
 * are normalised to words and compared at word boundaries.
 */

// Present in nearly every stack; matching on them would relate everything.
const GENERIC_TERMS = new Set(['python', 'docker', 'postgresql', 'javascript', 'typescript']);

/** "PostgreSQL + pgvector" -> ["postgresql", "pgvector"]; "Redis (session state)" -> ["redis"]. */
export function toTerms(values: string[]): string[] {
  const terms = values.flatMap((value) =>
    value
      .replace(/\([^)]*\)/g, ' ')
      .split(/[\/+,]/)
      .map((part) =>
        part
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ' ')
          .trim()
      )
  );
  return Array.from(new Set(terms.filter((t) => t && !GENERIC_TERMS.has(t))));
}

function termsMatch(a: string, b: string): boolean {
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  return ` ${long} `.includes(` ${short} `);
}

/** Number of terms in `source` that match at least one term in `candidate`. */
export function tagOverlapScore(source: string[], candidate: string[]): number {
  return source.filter((s) => candidate.some((c) => termsMatch(s, c))).length;
}

/** Keep items scoring at least `minScore`, best first; ties keep input order. */
export function rankByOverlap<T>(
  items: T[],
  sourceTerms: string[],
  getTerms: (item: T) => string[],
  limit: number,
  minScore = 1
): T[] {
  if (!sourceTerms.length) return [];
  return items
    .map((item, index) => ({ item, index, score: tagOverlapScore(sourceTerms, getTerms(item)) }))
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((r) => r.item);
}
