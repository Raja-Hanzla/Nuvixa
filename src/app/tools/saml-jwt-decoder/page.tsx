import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { TokenDecoderTool } from "@/components/tools/saml-jwt-decoder/token-decoder-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("saml-jwt-decoder");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function TokenDecoderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <TokenDecoderTool />
    </ToolPageLayout>
  );
}
