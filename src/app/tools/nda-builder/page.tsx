import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { NdaBuilderTool } from "@/components/tools/nda-builder/nda-builder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("nda-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function NdaBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <NdaBuilderTool />
    </ToolPageLayout>
  );
}
