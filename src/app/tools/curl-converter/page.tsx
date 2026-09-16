import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CurlConverterTool } from "@/components/tools/curl-converter/curl-converter-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("curl-converter");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function CurlConverterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CurlConverterTool />
    </ToolPageLayout>
  );
}
