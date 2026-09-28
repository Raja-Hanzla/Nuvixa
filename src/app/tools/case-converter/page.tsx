import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CaseConverterTool } from "@/components/tools/case-converter/case-converter-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("case-converter");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function CaseConverterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CaseConverterTool />
    </ToolPageLayout>
  );
}
