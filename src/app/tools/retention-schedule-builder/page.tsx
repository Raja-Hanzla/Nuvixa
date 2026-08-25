import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { RetentionScheduleTool } from "@/components/tools/retention-schedule-builder/retention-schedule-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("retention-schedule-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function RetentionScheduleBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <RetentionScheduleTool />
    </ToolPageLayout>
  );
}
