import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { TaxDeductionEstimatorTool } from "@/components/tools/tax-deduction-estimator/tax-deduction-estimator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("tax-deduction-estimator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function TaxDeductionEstimatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <TaxDeductionEstimatorTool />
    </ToolPageLayout>
  );
}
