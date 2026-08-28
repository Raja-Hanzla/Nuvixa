import type { BlogPost } from "@/types/blog";

/**
 * Single source of truth for every blog post on Nuvixa.
 * To add a new post:
 *   1. Add an entry here with a unique `slug`.
 *   2. Write the post body as a component at src/components/blog/posts/<slug>-content.tsx.
 *   3. Create src/app/blog/<slug>/page.tsx that renders <BlogPostLayout> with it.
 * The /blog listing, homepage teaser, and related-posts sections all read from this array.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "pricing-for-target-margin",
    title: "How to Price a Product for a Target Profit Margin",
    excerpt:
      "The markup formula most people use quietly ignores payment fees and ad spend — here's the version that doesn't, and why the difference matters more than it looks.",
    publishedDate: "2026-08-15",
    readingMinutes: 7,
    category: "Pricing",
    relatedTools: ["pricing-margin-matrix", "ecommerce-margin"],
  },
  {
    slug: "nrr-vs-grr-saas-metrics",
    title: "NRR vs. GRR: What SaaS Investors Actually Look At",
    excerpt:
      "Two retention metrics, one very different story. Here's why a board deck can show 95% retention and 105% retention on the same numbers — and which one to lead with.",
    publishedDate: "2026-08-16",
    readingMinutes: 8,
    category: "SaaS Metrics",
    relatedTools: ["mrr-retention"],
  },
  {
    slug: "debt-snowball-vs-avalanche",
    title: "Debt Snowball vs. Avalanche: Which One Actually Saves You More?",
    excerpt:
      "One method is mathematically optimal. The other is more likely to actually work. Here's how to decide which problem you're really solving.",
    publishedDate: "2026-08-17",
    readingMinutes: 6,
    category: "Personal Finance",
    relatedTools: ["debt-payoff-planner"],
  },
  {
    slug: "safe-notes-explained",
    title: "SAFE Notes Explained: What a Valuation Cap and Discount Actually Do",
    excerpt:
      "A SAFE isn't equity yet, and it isn't a loan. Here's what actually happens to your cap table when one converts — and why the math surprises most first-time founders.",
    publishedDate: "2026-08-18",
    readingMinutes: 9,
    category: "Startup Finance",
    relatedTools: ["cap-table-simulator"],
  },
  {
    slug: "irs-mileage-rate-2026",
    title: "The 2026 IRS Mileage Rate Changed Mid-Year — Here's What That Means",
    excerpt:
      "The standard mileage rate jumped from 72.5¢ to 76¢ per mile on July 1. If your mileage log spans both halves of the year, one flat rate will get your deduction wrong.",
    publishedDate: "2026-08-19",
    readingMinutes: 5,
    category: "Freelance Tax",
    relatedTools: ["tax-deduction-estimator"],
  },
  {
    slug: "wcag-contrast-ratio-explained",
    title: "WCAG Contrast Ratios Explained: Why 4.5:1 Isn't an Arbitrary Number",
    excerpt:
      "The formula behind WCAG contrast requirements is genuinely interesting once you see it — and it explains why some \"readable-looking\" color pairs still fail.",
    publishedDate: "2026-08-20",
    readingMinutes: 7,
    category: "Accessibility",
    relatedTools: ["wcag-checker"],
  },
  {
    slug: "google-search-snippet-truncation",
    title: "Why Google Rewrites Your Meta Description Anyway (And What Still Matters)",
    excerpt:
      "Google ignores your carefully-written meta description more often than you'd think. Here's what it actually uses instead, and what's still worth optimizing.",
    publishedDate: "2026-08-21",
    readingMinutes: 6,
    category: "SEO",
    relatedTools: ["serp-simulator"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);

  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === current.category);
  const others = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
