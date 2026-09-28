import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { TextDiffCheckerTool } from "@/components/tools/text-diff-checker/text-diff-checker-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("text-diff-checker");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function TextDiffCheckerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <TextDiffCheckerTool />
    </ToolPageLayout>
  );
}
