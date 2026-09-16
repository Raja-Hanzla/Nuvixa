import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { EmailRecordValidatorTool } from "@/components/tools/spf-dkim-validator/email-record-validator-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("spf-dkim-validator");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function SpfDkimValidatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <EmailRecordValidatorTool />
    </ToolPageLayout>
  );
}
