import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PasswordPolicyBuilderTool } from "@/components/tools/password-policy-builder/password-policy-builder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("password-policy-builder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function PasswordPolicyBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PasswordPolicyBuilderTool />
    </ToolPageLayout>
  );
}
