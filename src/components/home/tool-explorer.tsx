"use client";

import * as React from "react";
import { ChevronRight, TerminalSquare } from "lucide-react";

import { ToolCard } from "@/components/tools/tool-card";
import { cn } from "@/lib/utils";
import { tools, searchTools } from "@/lib/tools-registry";
import { categoryDot, categoryLabels, type ToolCategory } from "@/types/tool";

const categories = Object.keys(categoryLabels) as ToolCategory[];

export function ToolExplorer() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<ToolCategory | "all">("all");
  const [focused, setFocused] = React.useState(false);

  const results = React.useMemo(() => {
    const base = searchTools(query);
    return category === "all" ? base : base.filter((t) => t.category === category);
  }, [query, category]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Signature element: a terminal-styled command console for finding tools */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border bg-card px-4 py-3.5 shadow-sm transition-all",
          focused ? "border-primary/60 ring-2 ring-primary/15" : "border-border"
        )}
      >
        <TerminalSquare className="h-4 w-4 shrink-0 text-primary" />
        <span className="hidden font-mono text-sm text-primary sm:inline">nuvixa&nbsp;~$</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="find --tool invoice, ooo reply, freelance rate..."
          className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        {query === "" && <span className="h-4 w-[7px] shrink-0 animate-blink bg-primary" aria-hidden />}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            category === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          All tools
        </button>
        {categories.map((c) => (
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
            <span className={cn("h-1.5 w-1.5 rounded-full", category === c ? "bg-primary-foreground" : categoryDot[c])} />
            {categoryLabels[c]}
          </button>
        ))}
      </div>

      <div id="categories" className="mt-10 scroll-mt-24">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {query || category !== "all" ? `${results.length} tool${results.length === 1 ? "" : "s"} found` : `Available now — ${tools.length} tools`}
          </h2>
          <a
            href="/tools"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
            <p className="font-display text-base font-medium text-foreground">
              No tools match that search yet.
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              New tools ship every week — try a different keyword or check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
