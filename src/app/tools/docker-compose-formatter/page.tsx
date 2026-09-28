import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { DockerComposeFormatterTool } from "@/components/tools/docker-compose-formatter/docker-compose-formatter-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("docker-compose-formatter");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function DockerComposeFormatterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <DockerComposeFormatterTool />
    </ToolPageLayout>
  );
}
