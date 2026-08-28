import type { Metadata } from "next";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import { blogPosts } from "@/lib/blog-registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides on pricing, SaaS metrics, startup finance, and more from the ${siteConfig.name} team.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Guides
        </h1>
        <p className="mt-3 text-muted-foreground">
          Deeper dives on the numbers behind our tools — pricing, SaaS metrics, startup finance,
          accessibility, and more.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
