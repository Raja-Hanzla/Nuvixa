export interface BlogPost {
  /** URL slug — route lives at /blog/[slug]. */
  slug: string;
  title: string;
  /** One or two sentences shown on cards and used as the meta description. */
  excerpt: string;
  /** ISO date string, e.g. "2026-08-15". */
  publishedDate: string;
  readingMinutes: number;
  category: string;
  /** Tool slugs to cross-link from this post. */
  relatedTools: string[];
}
