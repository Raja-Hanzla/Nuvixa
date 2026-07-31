import { Sparkles } from "lucide-react";

import { ToolExplorer } from "@/components/home/tool-explorer";
import { tools } from "@/lib/tools-registry";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="container relative py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3 w-3 text-spark" />
            Free, forever &mdash; {tools.length} tools live, more every week
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The tools you reach for at work.
            <span className="text-primary"> Ready in one tab.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Nuvixa is a free, growing library of business, productivity, developer, AI, finance,
            and utility tools &mdash; no sign-up, no paywall, no clutter. Just the thing you need,
            built to load fast and get out of your way.
          </p>
        </div>

        <div className="mt-12">
          <ToolExplorer />
        </div>
      </div>
    </section>
  );
}
