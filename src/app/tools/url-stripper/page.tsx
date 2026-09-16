import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { UrlStripperTool } from "@/components/tools/url-stripper/url-stripper-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("url-stripper");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function UrlStripperPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <UrlStripperTool />
    </ToolPageLayout>
  );
}
