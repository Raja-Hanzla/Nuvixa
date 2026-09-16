"use client";

import * as React from "react";
import { RotateCcw, Terminal } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCurl, convert, sampleCurl, type ConvertTarget } from "@/lib/generators/curl-converter";

const TARGET_LABELS: Record<ConvertTarget, string> = {
  fetch: "Fetch",
  axios: "Axios",
  python: "Python",
};

export function CurlConverterTool() {
  const [input, setInput] = React.useState(sampleCurl);
  const [target, setTarget] = React.useState<ConvertTarget>("fetch");

  const parsed = parseCurl(input);
  const output = parsed ? convert(parsed, target) : null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Paste your cURL command</CardTitle>
          <CardDescription>Straight from your terminal or a browser&apos;s &quot;Copy as cURL&quot;.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="curl https://api.example.com/..."
          />

          {input.trim().length > 0 && !parsed && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              Couldn&apos;t find a URL in that command — check it's a valid cURL invocation.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setInput(sampleCurl)} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample
            </Button>
            <Button variant="ghost" onClick={() => setInput("")} className="text-muted-foreground">
              Clear
            </Button>
          </div>

          {parsed && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline">{parsed.method}</Badge>
              <span className="truncate font-mono text-xs text-muted-foreground">{parsed.url}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            Converted code
          </CardTitle>
          <CardDescription>Pick a target — the code updates instantly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={target} onValueChange={(v) => setTarget(v as ConvertTarget)}>
            <TabsList>
              {(Object.keys(TARGET_LABELS) as ConvertTarget[]).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {TARGET_LABELS[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {!output ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Paste a cURL command on the left to see the converted code.
            </p>
          ) : (
            <>
              <pre className="max-h-[420px] overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
                {output}
              </pre>
              <CopyButton getText={() => output} label="Copy code" successMessage="Code copied" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
