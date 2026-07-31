import type { Metadata } from "next";
import { Suspense } from "react";

import { ToolsListing } from "@/components/tools/tools-listing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "All Tools",
  description: `Browse every free tool on ${siteConfig.name} — business, productivity, developer, AI, finance, and utility tools in one place.`,
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="container py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          All tools
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every tool on Nuvixa, free and ready to use. Search by name or filter by category.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <ToolsListing />
        </Suspense>
      </div>
    </div>
  );
}
