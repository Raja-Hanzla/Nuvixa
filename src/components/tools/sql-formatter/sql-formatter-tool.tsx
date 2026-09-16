"use client";

import * as React from "react";
import { RotateCcw, DatabaseZap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { formatSql, compactSql, sampleSql } from "@/lib/generators/sql-formatter";
import { formatNumber } from "@/lib/utils";

export function SqlFormatterTool() {
  const [input, setInput] = React.useState(sampleSql);

  const formatted = formatSql(input);
  const compact = compactSql(input);
  const lineCount = formatted ? formatted.split("\n").length : 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your SQL</CardTitle>
          <CardDescription>Paste a messy or single-line query.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="select * from ..."
          />

          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setInput(sampleSql)} className="text-muted-foreground">
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
            <DatabaseZap className="h-4 w-4 text-primary" />
            Formatted
          </CardTitle>
          <CardDescription>Keywords uppercased, clauses and lists broken onto their own lines.</CardDescription>
        </CardHeader>
        <CardContent>
          {!formatted ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Paste a query on the left to see it formatted.
            </p>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">{formatNumber(lineCount)}</strong> lines
                </span>
                <span>
                  <strong className="text-foreground">{formatNumber(compact.length)}</strong> characters
                </span>
              </div>

              <pre className="max-h-[420px] overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
                {formatted}
              </pre>

              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton getText={() => formatted} label="Copy formatted" successMessage="Formatted SQL copied" />
                <CopyButton
                  getText={() => compact}
                  label="Copy single line"
                  successMessage="Single-line SQL copied"
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
