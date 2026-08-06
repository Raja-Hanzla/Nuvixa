import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { WcagCheckerTool } from "@/components/tools/wcag-checker/wcag-checker-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("wcag-checker");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function WcagCheckerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <WcagCheckerTool />
    </ToolPageLayout>
  );
}
