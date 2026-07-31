import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { RateCalculatorTool } from "@/components/tools/rate-calculator/rate-calculator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("rate-calculator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function RateCalculatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <RateCalculatorTool />
    </ToolPageLayout>
  );
}
