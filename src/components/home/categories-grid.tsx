import Link from "next/link";
import { Briefcase, Gauge, Code2, Bot, Landmark, Wrench, Megaphone, ShieldCheck, ArrowRight } from "lucide-react";

import { tools } from "@/lib/tools-registry";
import { categoryLabels, type ToolCategory } from "@/types/tool";

const categoryIcons: Record<ToolCategory, typeof Briefcase> = {
  business: Briefcase,
  productivity: Gauge,
  developer: Code2,
  ai: Bot,
  finance: Landmark,
  marketing: Megaphone,
  security: ShieldCheck,
  utility: Wrench,
};

const categoryCopy: Record<ToolCategory, string> = {
  business: "Docs and workflows for running day-to-day operations.",
  productivity: "Small tools that save you real minutes, daily.",
  developer: "Formatters, converters, and generators for builders.",
  ai: "AI-assisted tools for writing and thinking faster.",
  finance: "Invoices, rates, and calculators that handle the math.",
  marketing: "SEO and content tools for growing traffic that converts.",
  security: "Policy and compliance starting points for IT and security teams.",
  utility: "General-purpose tools for whatever comes up.",
};

export function CategoriesGrid() {
  const categories = Object.keys(categoryLabels) as ToolCategory[];

  return (
    <section className="border-b border-border">
      <div className="container py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Browse by category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Eight categories today, all growing toward 100+ tools.
            </p>
          </div>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            See every tool
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const count = tools.filter((t) => t.category === category).length;
            return (
              <Link
                key={category}
                href={`/tools?category=${category}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {categoryLabels[category]}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(count).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {categoryCopy[category]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
