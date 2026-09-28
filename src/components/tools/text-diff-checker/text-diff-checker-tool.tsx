"use client";

import * as React from "react";
import { RotateCcw, Diff, Plus, Minus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  computeDiff,
  sampleTextA,
  sampleTextB,
  type DiffGranularity,
} from "@/lib/generators/text-diff";
import { cn } from "@/lib/utils";

const GRANULARITY_LABELS: Record<DiffGranularity, string> = {
  line: "Line",
  word: "Word",
  char: "Character",
};

export function TextDiffCheckerTool() {
  const [textA, setTextA] = React.useState(sampleTextA);
  const [textB, setTextB] = React.useState(sampleTextB);
  const [granularity, setGranularity] = React.useState<DiffGranularity>("word");

  const result = computeDiff(textA, textB, granularity);

  function loadSample() {
    setTextA(sampleTextA);
    setTextB(sampleTextB);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Original</CardTitle>
            <CardDescription>{textA.split(/\r?\n/).length} lines</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              rows={10}
              spellCheck={false}
              className="font-mono text-xs"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changed</CardTitle>
            <CardDescription>{textB.split(/\r?\n/).length} lines</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              rows={10}
              spellCheck={false}
              className="font-mono text-xs"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={granularity} onValueChange={(v) => setGranularity(v as DiffGranularity)}>
          <TabsList>
            {(Object.keys(GRANULARITY_LABELS) as DiffGranularity[]).map((key) => (
              <TabsTrigger key={key} value={key}>
                {GRANULARITY_LABELS[key]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="ghost" onClick={loadSample} className="text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          Load sample
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Diff className="h-4 w-4 text-primary" />
            Diff
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="success" className="flex items-center gap-1">
              <Plus className="h-3 w-3" />
              {result.added}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 border-destructive/40 text-destructive">
              <Minus className="h-3 w-3" />
              {result.removed}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {result.truncated && (
            <p className="mb-3 rounded-lg border border-spark/30 bg-spark/5 p-3 text-xs text-spark">
              These blocks are large enough that a detailed {granularity}-level diff would be slow — showing a
              simplified remove/add view instead. Try line or word mode for big pastes.
            </p>
          )}

          {granularity === "line" ? (
            <div className="max-h-[420px] overflow-auto rounded-lg border border-border font-mono text-xs">
              {result.tokens.map((t, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "whitespace-pre-wrap border-b border-border/40 px-3 py-1.5 last:border-0",
                    t.type === "add" && "bg-success/10 text-success",
                    t.type === "remove" && "bg-destructive/10 text-destructive",
                    t.type === "equal" && "text-muted-foreground"
                  )}
                >
                  <span className="mr-2 select-none opacity-60">
                    {t.type === "add" ? "+" : t.type === "remove" ? "−" : " "}
                  </span>
                  {t.value || "\u00A0"}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-secondary/20 p-4 font-mono text-xs leading-relaxed">
              {result.tokens.map((t, idx) => (
                <span
                  key={idx}
                  className={cn(
                    t.type === "add" && "rounded bg-success/15 text-success",
                    t.type === "remove" && "rounded bg-destructive/15 text-destructive line-through"
                  )}
                >
                  {t.value}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
