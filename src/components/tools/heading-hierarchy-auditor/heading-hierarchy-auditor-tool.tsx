"use client";

import * as React from "react";
import { RotateCcw, ListTree, XCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auditHtml, sampleHeadingHtml } from "@/lib/generators/heading-hierarchy-auditor";
import { cn } from "@/lib/utils";

const SEVERITY_STYLES: Record<string, string> = {
  error: "border-destructive/30 bg-destructive/5 text-destructive",
  warning: "border-spark/30 bg-spark/5 text-spark",
  info: "border-border bg-secondary/30 text-foreground",
};

const SEVERITY_ICON: Record<string, React.ElementType> = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

export function HeadingHierarchyAuditorTool() {
  const [input, setInput] = React.useState(sampleHeadingHtml);

  const result = auditHtml(input);
  const errorCount = result.issues.filter((i) => i.severity === "error").length;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>HTML source</CardTitle>
          <CardDescription>Paste a page's HTML — view-source works, so does a component's markup.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="<h1>Page title</h1>&#10;<h2>Section</h2>"
          />
          <Button variant="ghost" onClick={() => setInput(sampleHeadingHtml)} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" />
            Load sample
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ListTree className="h-4 w-4 text-primary" />
              Heading tree
            </CardTitle>
            <CardDescription>{result.headings.length} headings found.</CardDescription>
          </div>
          {result.headings.length > 0 && (
            <Badge variant={errorCount > 0 ? "outline" : "success"} className={errorCount > 0 ? "border-destructive/40 text-destructive" : ""}>
              {errorCount > 0 ? `${errorCount} issue${errorCount === 1 ? "" : "s"}` : "No issues"}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-5">
          {result.headings.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Paste HTML with heading tags to see the structure.
            </p>
          ) : (
            <div className="max-h-[320px] space-y-1 overflow-auto rounded-lg border border-border bg-secondary/20 p-3">
              {result.headings.map((h) => (
                <div
                  key={h.index}
                  style={{ paddingLeft: `${(h.level - 1) * 16}px` }}
                  className="flex items-center gap-2 rounded px-2 py-1 text-sm"
                >
                  <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
                    H{h.level}
                  </Badge>
                  <span className={cn("truncate", h.text ? "text-foreground" : "italic text-muted-foreground")}>
                    {h.text || "(empty)"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {result.issues.length === 0 ? (
              result.headings.length > 0 && (
                <div className="flex items-center gap-2.5 rounded-lg border border-success/30 bg-success/5 p-4 text-sm text-success">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Clean hierarchy — no skipped levels or missing text.
                </div>
              )
            ) : (
              result.issues.map((issue, idx) => {
                const Icon = SEVERITY_ICON[issue.severity];
                return (
                  <div key={idx} className={cn("flex items-start gap-2.5 rounded-lg border p-3 text-sm", SEVERITY_STYLES[issue.severity])}>
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <p className="leading-relaxed">{issue.message}</p>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
