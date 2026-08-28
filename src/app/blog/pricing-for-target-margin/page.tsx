import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { PricingForTargetMarginContent } from "@/components/blog/posts/pricing-for-target-margin-content";
import { getPostBySlug } from "@/lib/blog-registry";

const post = getPostBySlug("pricing-for-target-margin");

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
      <PricingForTargetMarginContent />
    </BlogPostLayout>
  );
}
