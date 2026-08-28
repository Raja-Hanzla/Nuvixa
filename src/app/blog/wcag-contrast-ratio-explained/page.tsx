import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { WcagContrastRatioContent } from "@/components/blog/posts/wcag-contrast-ratio-content";
import { getPostBySlug } from "@/lib/blog-registry";

const post = getPostBySlug("wcag-contrast-ratio-explained");

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
      <WcagContrastRatioContent />
    </BlogPostLayout>
  );
}
