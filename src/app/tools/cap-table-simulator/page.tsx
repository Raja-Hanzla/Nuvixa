import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CapTableSimulatorTool } from "@/components/tools/cap-table-simulator/cap-table-simulator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("cap-table-simulator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function CapTableSimulatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CapTableSimulatorTool />
    </ToolPageLayout>
  );
}
