import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PdfMetadataExtractorTool } from "@/components/tools/pdf-metadata-extractor/pdf-metadata-extractor-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("pdf-metadata-extractor");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function PdfMetadataExtractorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PdfMetadataExtractorTool />
    </ToolPageLayout>
  );
}
