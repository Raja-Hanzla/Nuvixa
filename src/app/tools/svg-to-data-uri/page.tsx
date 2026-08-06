import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SvgToDataUriTool } from "@/components/tools/svg-to-data-uri/svg-to-data-uri-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("svg-to-data-uri");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function SvgToDataUriPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SvgToDataUriTool />
    </ToolPageLayout>
  );
}
