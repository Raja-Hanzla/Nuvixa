import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { LeaseVsBuyTool } from "@/components/tools/equipment-lease-vs-buy/lease-vs-buy-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("equipment-lease-vs-buy");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function LeaseVsBuyPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <LeaseVsBuyTool />
    </ToolPageLayout>
  );
}
