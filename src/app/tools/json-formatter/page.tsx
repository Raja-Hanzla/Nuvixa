import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { JsonFormatterTool } from "@/components/tools/json-formatter/json-formatter-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("json-formatter");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function JsonFormatterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
