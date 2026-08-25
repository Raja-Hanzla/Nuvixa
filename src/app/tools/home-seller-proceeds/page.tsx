import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SellerProceedsTool } from "@/components/tools/home-seller-proceeds/seller-proceeds-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("home-seller-proceeds");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function SellerProceedsPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SellerProceedsTool />
    </ToolPageLayout>
  );
}
