import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SitemapBuilderTool } from "@/components/tools/sitemap-builder/sitemap-builder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("sitemap-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function SitemapBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SitemapBuilderTool />
    </ToolPageLayout>
  );
}
