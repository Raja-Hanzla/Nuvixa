import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { BrandNameSearchTool } from "@/components/tools/brand-name-search/brand-name-search-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("brand-name-search");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function BrandNameSearchPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <BrandNameSearchTool />
    </ToolPageLayout>
  );
}
