import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { AspectRatioCalculatorTool } from "@/components/tools/aspect-ratio-calculator/aspect-ratio-calculator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("aspect-ratio-calculator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function AspectRatioCalculatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <AspectRatioCalculatorTool />
    </ToolPageLayout>
  );
}
