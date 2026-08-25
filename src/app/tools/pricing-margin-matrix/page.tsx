import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PricingMarginTool } from "@/components/tools/pricing-margin-matrix/pricing-margin-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("pricing-margin-matrix");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function PricingMarginPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PricingMarginTool />
    </ToolPageLayout>
  );
}
