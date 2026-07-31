import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";
import { categoryDot, categoryLabels } from "@/types/tool";

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </span>
          <div className="flex items-center gap-2">
            {tool.isNew && <Badge variant="spark">New</Badge>}
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tool.tagline}</p>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span className={cn("h-1.5 w-1.5 rounded-full", categoryDot[tool.category])} />
        {categoryLabels[tool.category]}
      </div>
    </Link>
  );
}
