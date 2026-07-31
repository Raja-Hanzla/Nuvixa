import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToolCard } from "@/components/tools/tool-card";
import { categoryLabels } from "@/types/tool";
import { getRelatedTools } from "@/lib/tools-registry";
import { siteConfig } from "@/lib/site-config";
import type { Tool } from "@/types/tool";

export function ToolPageLayout({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const related = getRelatedTools(tool.slug);
  const Icon = tool.icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any (runs in browser)",
        description: tool.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: `${siteConfig.url}/tools/${tool.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
          {
            "@type": "ListItem",
            position: 3,
            name: tool.name,
            item: `${siteConfig.url}/tools/${tool.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools" className="hover:text-foreground">
              Tools
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{tool.name}</span>
          </nav>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {tool.name}
                  </h1>
                  <Badge variant="outline">{categoryLabels[tool.category]}</Badge>
                  {tool.isNew && <Badge variant="spark">New</Badge>}
                </div>
                <p className="mt-2 max-w-2xl text-muted-foreground">{tool.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool body */}
      <div className="container py-10">{children}</div>

      {/* Description */}
      <div className="border-t border-border bg-secondary/20">
        <div className="container grid grid-cols-1 gap-10 py-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-foreground">
              About this tool
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{tool.description}</p>

            <h2 className="mt-10 font-display text-xl font-semibold text-foreground">
              How to use {tool.name}
            </h2>
            <ol className="mt-4 space-y-4">
              {tool.howTo.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-display text-xl font-semibold text-foreground">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="mt-2">
              {tool.faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Related tools</h2>
            <div className="mt-4 flex flex-col gap-4">
              {related.map((relatedTool) => (
                <ToolCard key={relatedTool.slug} tool={relatedTool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
