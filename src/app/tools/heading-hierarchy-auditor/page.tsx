import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { HeadingHierarchyAuditorTool } from "@/components/tools/heading-hierarchy-auditor/heading-hierarchy-auditor-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("heading-hierarchy-auditor");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function HeadingHierarchyAuditorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <HeadingHierarchyAuditorTool />
    </ToolPageLayout>
  );
}
