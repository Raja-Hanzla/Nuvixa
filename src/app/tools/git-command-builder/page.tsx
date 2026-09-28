import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { GitCommandBuilderTool } from "@/components/tools/git-command-builder/git-command-builder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("git-command-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function GitCommandBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <GitCommandBuilderTool />
    </ToolPageLayout>
  );
}
