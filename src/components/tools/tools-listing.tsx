"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { ToolCard } from "@/components/tools/tool-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchTools } from "@/lib/tools-registry";
import { categoryDot, categoryLabels, type ToolCategory } from "@/types/tool";

const categories = Object.keys(categoryLabels) as ToolCategory[];

export function ToolsListing() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as ToolCategory | null) ?? "all";

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<ToolCategory | "all">(
    categories.includes(initialCategory as ToolCategory) ? initialCategory : "all"
  );

  const results = React.useMemo(() => {
    const base = searchTools(query);
    return category === "all" ? base : base.filter((t) => t.category === category);
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all tools by name or keyword&hellip;"
            className="h-11 pl-9"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            category === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          All ({searchTools(query).length})
        </button>
        {categories.map((c) => {
          const count = searchTools(query).filter((t) => t.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  category === c ? "bg-primary-foreground" : categoryDot[c]
                )}
              />
              {categoryLabels[c]} ({count})
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} tool{results.length === 1 ? "" : "s"} found
      </p>

      {results.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <p className="font-display text-base font-medium text-foreground">
            No tools match that search yet.
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            We ship new tools every week &mdash; try a broader keyword or a different category.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
