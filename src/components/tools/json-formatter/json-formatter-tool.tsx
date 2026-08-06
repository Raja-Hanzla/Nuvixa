"use client";

import * as React from "react";
import { CheckCircle2, XCircle, RotateCcw, FileJson } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/tools/copy-button";
import { JsonTreeNode } from "@/components/tools/json-formatter/json-tree-node";
import {
  parseJson,
  formatJson,
  minifyJson,
  countKeys,
  maxDepth,
  sampleJson,
} from "@/lib/generators/json-formatter";
import { formatNumber } from "@/lib/utils";

export function JsonFormatterTool() {
  const [input, setInput] = React.useState(sampleJson);

  const result = parseJson(input);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your JSON</CardTitle>
            <CardDescription>Paste minified, messy, or broken JSON here.</CardDescription>
          </div>
          {result.success ? (
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Valid
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 border-destructive/40 text-destructive">
              <XCircle className="h-3 w-3" />
              Invalid
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            className="font-mono text-xs"
          />

          {!result.success && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3.5">
              <p className="text-sm font-medium text-destructive">{result.message}</p>
              {result.line !== null && (
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Line {result.line}, column {result.column}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setInput(sampleJson)} className="text-muted-foreground">
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-4 w-4 text-primary" />
            Formatted tree
          </CardTitle>
          <CardDescription>Click any row to expand or collapse it.</CardDescription>
        </CardHeader>
        <CardContent>
          {!result.success ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Fix the syntax error to see the formatted tree.
            </p>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">{formatNumber(countKeys(result.value))}</strong> keys
                </span>
                <span>
                  <strong className="text-foreground">{formatNumber(maxDepth(result.value))}</strong> levels deep
                </span>
                <span>
                  <strong className="text-foreground">{formatNumber(minifyJson(result.value).length)}</strong> characters minified
                </span>
              </div>

              <div className="max-h-[420px] overflow-auto rounded-lg border border-border bg-secondary/30 p-4">
                <JsonTreeNode label={null} value={result.value} depth={0} />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton
                  getText={() => formatJson(result.value)}
                  label="Copy formatted"
                  successMessage="Formatted JSON copied"
                />
                <CopyButton
                  getText={() => minifyJson(result.value)}
                  label="Copy minified"
                  successMessage="Minified JSON copied"
                  variant="outline"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
