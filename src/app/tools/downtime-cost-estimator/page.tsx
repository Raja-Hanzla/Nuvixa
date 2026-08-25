import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { DowntimeCostTool } from "@/components/tools/downtime-cost-estimator/downtime-cost-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("downtime-cost-estimator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function DowntimeCostPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <DowntimeCostTool />
    </ToolPageLayout>
  );
}
