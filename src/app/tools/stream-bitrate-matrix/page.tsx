import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { StreamBitrateMatrixTool } from "@/components/tools/stream-bitrate-matrix/stream-bitrate-matrix-tool";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("stream-bitrate-matrix");

export const metadata: Metadata = tool
  ? {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${tool.slug}` },
      openGraph: { title: tool.name, description: tool.description },
    }
  : {};

export default function StreamBitrateMatrixPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <StreamBitrateMatrixTool />
    </ToolPageLayout>
  );
}
