import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { RegexLogExtractorTool } from "@/components/tools/regex-log-extractor/regex-log-extractor-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("regex-log-extractor");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function RegexLogExtractorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <RegexLogExtractorTool />
    </ToolPageLayout>
  );
}
