import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { OooGeneratorTool } from "@/components/tools/ooo-generator/ooo-generator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("ooo-generator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function OooGeneratorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <OooGeneratorTool />
    </ToolPageLayout>
  );
}
