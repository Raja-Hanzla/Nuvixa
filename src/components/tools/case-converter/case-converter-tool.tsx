"use client";

import * as React from "react";
import { RotateCcw, CaseSensitive, Link2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { convertCase, sampleCaseInput } from "@/lib/generators/case-converter";

export function CaseConverterTool() {
  const [input, setInput] = React.useState(sampleCaseInput);

  const result = convertCase(input);

  const variants: { label: string; value: string }[] = [
    { label: "camelCase", value: result.camelCase },
    { label: "PascalCase", value: result.pascalCase },
    { label: "snake_case", value: result.snakeCase },
    { label: "CONSTANT_CASE", value: result.constantCase },
    { label: "Title Case", value: result.titleCase },
    { label: "Sentence case", value: result.sentenceCase },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your text</CardTitle>
          <CardDescription>A title, heading, or phrase — any format works as input.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="text-sm"
            placeholder="10 Best Coffee Shops in New York City!"
          />
          <Button variant="ghost" onClick={() => setInput(sampleCaseInput)} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" />
            Load sample
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            URL slug
          </CardTitle>
          <CardDescription>Clean, lowercase, hyphenated — ready to drop into a URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="break-all rounded-lg border border-border bg-secondary/30 p-4 font-mono text-sm text-foreground">
            {result.slug || <span className="text-muted-foreground">Type something above</span>}
          </div>
          <CopyButton getText={() => result.slug} label="Copy slug" successMessage="Slug copied" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CaseSensitive className="h-4 w-4 text-primary" />
            Other formats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {variants.map((v) => (
              <div key={v.label} className="space-y-2 rounded-lg border border-border bg-secondary/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{v.label}</p>
                  <CopyButton getText={() => v.value} label="Copy" successMessage={`${v.label} copied`} variant="ghost" />
                </div>
                <p className="break-all font-mono text-sm text-foreground">
                  {v.value || <span className="text-muted-foreground">—</span>}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
