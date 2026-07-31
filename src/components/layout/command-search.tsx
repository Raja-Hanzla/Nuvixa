"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { searchTools } from "@/lib/tools-registry";
import { categoryLabels } from "@/types/tool";
import { cn } from "@/lib/utils";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const router = useRouter();

  const results = React.useMemo(() => searchTools(query).slice(0, 7), [query]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/tools/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].slug);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-64 items-center justify-between gap-2 rounded-md bg-background px-3 text-muted-foreground shadow-none md:flex"
      >
        <span className="flex items-center gap-2 text-sm">
          <Search className="h-4 w-4" />
          Search tools&hellip;
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          &#8984;K
        </kbd>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="shrink-0 md:hidden"
        aria-label="Search tools"
      >
        <Search className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0">
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search 100+ tools&hellip; try 'invoice' or 'rate'"
              className="flex h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
              ESC
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No tools match &ldquo;{query}&rdquo; yet. More tools ship every week.
              </p>
            ) : (
              <ul>
                {results.map((tool, i) => (
                  <li key={tool.slug}>
                    <button
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => go(tool.slug)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                        i === activeIndex ? "bg-accent" : "hover:bg-accent/60"
                      )}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <tool.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {tool.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {categoryLabels[tool.category]}
                          </span>
                        </span>
                      </span>
                      {i === activeIndex ? (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
