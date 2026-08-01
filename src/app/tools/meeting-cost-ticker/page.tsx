import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { MeetingCostTickerTool } from "@/components/tools/meeting-cost-ticker/meeting-cost-ticker-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("meeting-cost-ticker");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function MeetingCostTickerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <MeetingCostTickerTool />
    </ToolPageLayout>
  );
}
