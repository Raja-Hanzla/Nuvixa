import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/tools/tool-card";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getRelatedPosts } from "@/lib/blog-registry";
import { tools } from "@/lib/tools-registry";
import { siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/types/blog";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostLayout({ post, children }: { post: BlogPost; children: React.ReactNode }) {
  const relatedPosts = getRelatedPosts(post.slug);
  const relatedTools = tools.filter((t) => post.relatedTools.includes(t.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-border bg-secondary/30">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{post.title}</span>
          </nav>

          <div className="mx-auto mt-5 max-w-2xl">
            <div className="flex items-center gap-3">
              <Badge variant="outline">{post.category}</Badge>
              <span className="text-xs text-muted-foreground">{formatDate(post.publishedDate)}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.readingMinutes} min read
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <article className="mx-auto max-w-2xl">{children}</article>
      </div>

      {(relatedTools.length > 0 || relatedPosts.length > 0) && (
        <div className="border-t border-border bg-secondary/20">
          <div className="container grid grid-cols-1 gap-10 py-14 lg:grid-cols-3">
            {relatedTools.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="font-display text-xl font-semibold text-foreground">Try the related tool</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
            )}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">More reading</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {relatedPosts.map((p) => (
                    <BlogPostCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
