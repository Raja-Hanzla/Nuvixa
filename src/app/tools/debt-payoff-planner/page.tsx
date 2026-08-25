import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { DebtPayoffTool } from "@/components/tools/debt-payoff-planner/debt-payoff-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("debt-payoff-planner");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function DebtPayoffPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <DebtPayoffTool />
    </ToolPageLayout>
  );
}
