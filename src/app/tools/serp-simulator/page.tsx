import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SerpSimulatorTool } from "@/components/tools/serp-simulator/serp-simulator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("serp-simulator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function SerpSimulatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SerpSimulatorTool />
    </ToolPageLayout>
  );
}
