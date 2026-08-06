import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { EcommerceMarginTool } from "@/components/tools/ecommerce-margin/ecommerce-margin-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("ecommerce-margin");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function EcommerceMarginPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <EcommerceMarginTool />
    </ToolPageLayout>
  );
}
