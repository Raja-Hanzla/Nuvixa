import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SqlFormatterTool } from "@/components/tools/sql-formatter/sql-formatter-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("sql-formatter");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function SqlFormatterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SqlFormatterTool />
    </ToolPageLayout>
  );
}
