import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import { blogPosts } from "@/lib/blog-registry";

export function BlogTeaser() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              From the blog
            </h2>
            <p className="mt-2 text-muted-foreground">
              Deeper dives on the numbers behind our tools.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read all guides
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {latest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
