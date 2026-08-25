import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { MrrRetentionTool } from "@/components/tools/mrr-retention/mrr-retention-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("mrr-retention");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function MrrRetentionPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <MrrRetentionTool />
    </ToolPageLayout>
  );
}
