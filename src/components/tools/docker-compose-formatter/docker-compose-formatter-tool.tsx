"use client";

import * as React from "react";
import { RotateCcw, Container, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/tools/copy-button";
import { inspectCompose, sampleCompose } from "@/lib/generators/docker-compose-inspector";
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

export function DockerComposeFormatterTool() {
  const [input, setInput] = React.useState(sampleCompose);

  const result = inspectCompose(input);
  const errorCount = result.issues.filter((i) => i.severity === "error").length;
  const warningCount = result.issues.filter((i) => i.severity === "warning").length;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>docker-compose.yml</CardTitle>
          <CardDescription>Paste your Compose file — checked as you type.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={20}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="services:&#10;  web:&#10;    image: nginx"
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setInput(sampleCompose)} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample
            </Button>
            <Button variant="ghost" onClick={() => setInput("")} className="text-muted-foreground">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Container className="h-4 w-4 text-primary" />
              Inspection
            </CardTitle>
            <CardDescription>Structure, deprecated syntax, and indentation checks.</CardDescription>
          </div>
          {input.trim() && (
            <Badge variant={errorCount > 0 ? "outline" : "success"} className={errorCount > 0 ? "border-destructive/40 text-destructive" : ""}>
              {errorCount > 0 ? `${errorCount} error${errorCount === 1 ? "" : "s"}` : "No errors"}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-5">
          {!input.trim() ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Paste a Compose file on the left to inspect it.
            </p>
          ) : (
            <>
              {result.services.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Services ({result.services.length})
                  </span>
                  {result.services.map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                {result.issues.length === 0 ? (
                  <div className="flex items-center gap-2.5 rounded-lg border border-success/30 bg-success/5 p-4 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    No issues found — this file looks clean.
                  </div>
                ) : (
                  result.issues.map((issue, idx) => {
                    const Icon = SEVERITY_ICON[issue.severity];
                    return (
                      <div
                        key={idx}
                        className={cn("flex items-start gap-2.5 rounded-lg border p-3 text-sm", SEVERITY_STYLES[issue.severity])}
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                        <p className="leading-relaxed">{issue.message}</p>
                      </div>
                    );
                  })
                )}
              </div>

              {warningCount > 0 && errorCount === 0 && (
                <p className="text-xs text-muted-foreground">
                  No blocking errors, but {warningCount} thing{warningCount === 1 ? "" : "s"} worth cleaning up.
                </p>
              )}

              {result.formatted && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cleaned YAML</p>
                  <pre className="max-h-[280px] overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
                    {result.formatted}
                  </pre>
                  <CopyButton getText={() => result.formatted ?? ""} label="Copy cleaned YAML" successMessage="YAML copied" />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
