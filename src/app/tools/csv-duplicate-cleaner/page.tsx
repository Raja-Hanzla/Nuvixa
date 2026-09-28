import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CsvDuplicateCleanerTool } from "@/components/tools/csv-duplicate-cleaner/csv-duplicate-cleaner-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("csv-duplicate-cleaner");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function CsvDuplicateCleanerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CsvDuplicateCleanerTool />
    </ToolPageLayout>
  );
}
