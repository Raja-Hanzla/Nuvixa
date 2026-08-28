import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

export function ArticleLead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg leading-relaxed text-foreground">{children}</p>;
}

export function ArticleH2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-display text-2xl font-bold text-foreground">{children}</h2>;
}

export function ArticleH3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 font-display text-lg font-semibold text-foreground">{children}</h3>;
}

export function ArticleP({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-foreground/80">{children}</p>;
}

export function ArticleList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/80">
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ArticleOrderedList({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground/80">
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}

export function Callout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4", className)}>
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

export function ArticleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={cn("px-4 py-3", j === 0 ? "font-medium text-foreground" : "mono-nums text-muted-foreground")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
