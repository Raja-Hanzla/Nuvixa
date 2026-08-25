import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CspGeneratorTool } from "@/components/tools/csp-generator/csp-generator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("csp-generator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function CspGeneratorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CspGeneratorTool />
    </ToolPageLayout>
  );
}
