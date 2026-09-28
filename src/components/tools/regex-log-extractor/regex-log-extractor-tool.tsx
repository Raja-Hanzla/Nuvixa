"use client";

import * as React from "react";
import { RotateCcw, Regex, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/tools/copy-button";
import { extractMatches, toCsv, toJson, sampleLogText, samplePattern } from "@/lib/generators/regex-log-extractor";

export function RegexLogExtractorTool() {
  const [logText, setLogText] = React.useState(sampleLogText);
  const [pattern, setPattern] = React.useState(samplePattern);
  const [caseInsensitive, setCaseInsensitive] = React.useState(false);

  const result = extractMatches(logText, pattern, caseInsensitive);
  const csv = toCsv(result.columns, result.rows);
  const json = toJson(result.rows);

  function loadSample() {
    setLogText(sampleLogText);
    setPattern(samplePattern);
    setCaseInsensitive(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Log text & pattern</CardTitle>
          <CardDescription>
            One record per line. Use named groups like <code className="font-mono">(?&lt;ip&gt;\S+)</code> for
            clean column names.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
            rows={8}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="Paste log lines or raw text, one record per line"
          />

          <div className="space-y-1.5">
            <Label htmlFor="regex-pattern">Regular expression</Label>
            <Input
              id="regex-pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="font-mono text-xs"
              placeholder="^(?<ip>\S+) .* \[(?<timestamp>[^\]]+)\]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Switch checked={caseInsensitive} onCheckedChange={setCaseInsensitive} id="case-insensitive" />
              <Label htmlFor="case-insensitive" className="cursor-pointer text-sm font-normal text-muted-foreground">
                Case-insensitive
              </Label>
            </div>
            <Button variant="ghost" onClick={loadSample} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample
            </Button>
          </div>

          {!result.success && (
            <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{result.error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Regex className="h-4 w-4 text-primary" />
              Extracted table
            </CardTitle>
            <CardDescription>Every line the pattern matched, split into columns.</CardDescription>
          </div>
          {result.success && result.totalLines > 0 && (
            <Badge variant="outline">
              {result.matchedLines} of {result.totalLines} lines matched
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {!result.success || result.rows.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              {result.success ? "No lines matched that pattern yet." : "Fix the pattern to see extracted results."}
            </p>
          ) : (
            <>
              <div className="max-h-[360px] overflow-auto rounded-lg border border-border">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="sticky top-0 bg-secondary/60 backdrop-blur">
                    <tr>
                      {result.columns.map((col) => (
                        <th key={col} className="whitespace-nowrap border-b border-border px-3 py-2 font-semibold text-foreground">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/60 last:border-0">
                        {result.columns.map((col) => (
                          <td key={col} className="whitespace-nowrap px-3 py-2 font-mono text-muted-foreground">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-3">
                <CopyButton getText={() => csv} label="Copy as CSV" successMessage="CSV copied" />
                <CopyButton getText={() => json} label="Copy as JSON" successMessage="JSON copied" variant="outline" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
