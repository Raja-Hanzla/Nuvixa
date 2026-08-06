import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { UtmBuilderTool } from "@/components/tools/utm-builder/utm-builder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("utm-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function UtmBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <UtmBuilderTool />
    </ToolPageLayout>
  );
}
