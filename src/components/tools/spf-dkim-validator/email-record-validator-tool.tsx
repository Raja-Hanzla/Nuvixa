"use client";

import * as React from "react";
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  analyzeSpf,
  analyzeDkim,
  sampleSpf,
  sampleDkim,
  type RecordIssue,
} from "@/lib/generators/email-record-validator";
import { cn } from "@/lib/utils";

type RecordType = "spf" | "dkim";

export function EmailRecordValidatorTool() {
  const [type, setType] = React.useState<RecordType>("spf");
  const [spfInput, setSpfInput] = React.useState(sampleSpf);
  const [dkimInput, setDkimInput] = React.useState(sampleDkim);

  const spfResult = analyzeSpf(spfInput);
  const dkimResult = analyzeDkim(dkimInput);
  const result = type === "spf" ? spfResult : dkimResult;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Paste your record</CardTitle>
          <CardDescription>The raw TXT record value, exactly as published in DNS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={type} onValueChange={(v) => setType(v as RecordType)}>
            <TabsList>
              <TabsTrigger value="spf">SPF</TabsTrigger>
              <TabsTrigger value="dkim">DKIM</TabsTrigger>
            </TabsList>
          </Tabs>

          {type === "spf" ? (
            <Textarea
              value={spfInput}
              onChange={(e) => setSpfInput(e.target.value)}
              rows={6}
              spellCheck={false}
              className="font-mono text-xs"
            />
          ) : (
            <Textarea
              value={dkimInput}
              onChange={(e) => setDkimInput(e.target.value)}
              rows={6}
              spellCheck={false}
              className="font-mono text-xs"
            />
          )}

          <Button
            variant="ghost"
            onClick={() => (type === "spf" ? setSpfInput(sampleSpf) : setDkimInput(sampleDkim))}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Load sample
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Analysis</CardTitle>
          {result.isValid ? (
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              No errors
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 border-destructive/40 text-destructive">
              <XCircle className="h-3 w-3" />
              Has errors
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {result.issues.length === 0 ? (
            <p className="rounded-lg border border-success/30 bg-success/5 p-4 text-sm text-success">
              No syntax issues found.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {result.issues.map((issue: RecordIssue, i: number) => (
                <li
                  key={i}
                  className={cn(
                    "flex items-start gap-2.5 rounded-lg border p-3 text-sm",
                    issue.severity === "error"
                      ? "border-destructive/30 bg-destructive/5 text-foreground"
                      : "border-spark/30 bg-spark/5 text-foreground"
                  )}
                >
                  {issue.severity === "error" ? (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                  )}
                  <span>{issue.message}</span>
                </li>
              ))}
            </ul>
          )}

          {type === "spf" && "lookupCount" in result && (
            <p className="mt-4 text-xs text-muted-foreground">
              DNS lookups used: <strong className="text-foreground">{result.lookupCount} / 10</strong>
            </p>
          )}

          {type === "dkim" && "tags" in result && Object.keys(result.tags).length > 0 && (
            <div className="mt-4 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parsed tags</p>
              {Object.entries(result.tags).map(([key, value]) => (
                <div key={key} className="flex gap-2 font-mono text-xs">
                  <span className="text-primary">{key}=</span>
                  <span className="truncate text-muted-foreground">{value || "(empty)"}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
