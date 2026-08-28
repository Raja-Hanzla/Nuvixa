import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { GoogleSnippetTruncationContent } from "@/components/blog/posts/google-snippet-truncation-content";
import { getPostBySlug } from "@/lib/blog-registry";

const post = getPostBySlug("google-search-snippet-truncation");

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
      <GoogleSnippetTruncationContent />
    </BlogPostLayout>
  );
}
