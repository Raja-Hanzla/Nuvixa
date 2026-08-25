import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { ContractorClassifierTool } from "@/components/tools/contractor-classifier/contractor-classifier-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("contractor-classifier");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function ContractorClassifierPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <ContractorClassifierTool />
    </ToolPageLayout>
  );
}
