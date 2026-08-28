import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { NrrVsGrrContent } from "@/components/blog/posts/nrr-vs-grr-content";
import { getPostBySlug } from "@/lib/blog-registry";

const post = getPostBySlug("nrr-vs-grr-saas-metrics");

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
      <NrrVsGrrContent />
    </BlogPostLayout>
  );
}
