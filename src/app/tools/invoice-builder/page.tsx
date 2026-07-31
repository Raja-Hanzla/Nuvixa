import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { InvoiceBuilderTool } from "@/components/tools/invoice-builder/invoice-builder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("invoice-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function InvoiceBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <InvoiceBuilderTool />
    </ToolPageLayout>
  );
}
