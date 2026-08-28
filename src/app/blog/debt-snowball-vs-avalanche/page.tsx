import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { DebtSnowballVsAvalancheContent } from "@/components/blog/posts/debt-snowball-vs-avalanche-content";
import { getPostBySlug } from "@/lib/blog-registry";

const post = getPostBySlug("debt-snowball-vs-avalanche");

export const metadata: Metadata = post
  ? {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: { title: post.title, description: post.excerpt, type: "article" },
    }
  : {};

export default function Page() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <DebtSnowballVsAvalancheContent />
    </BlogPostLayout>
  );
}
