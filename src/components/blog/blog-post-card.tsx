import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{post.category}</Badge>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </div>
      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatDate(post.publishedDate)}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {post.readingMinutes} min read
        </span>
      </div>
    </Link>
  );
}
