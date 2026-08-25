"use client";

import * as React from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  cspDirectiveOrder,
  cspDirectiveLabels,
  sourceKeywordOptions,
  defaultCspConfig,
  buildCspHeader,
  type CspConfig,
  type CspDirectiveKey,
  type SourceKeyword,
} from "@/lib/generators/csp-generator";
import { cn } from "@/lib/utils";

export function CspGeneratorTool() {
  const [config, setConfig] = React.useState<CspConfig>(defaultCspConfig);

  function toggleKeyword(directive: CspDirectiveKey, keyword: SourceKeyword) {
    setConfig((prev) => {
      const current = prev[directive].keywords;
      const next = current.includes(keyword) ? current.filter((k) => k !== keyword) : [...current, keyword];
      return { ...prev, [directive]: { ...prev[directive], keywords: next } };
    });
  }

  function updateDomains(directive: CspDirectiveKey, value: string) {
    setConfig((prev) => ({ ...prev, [directive]: { ...prev[directive], customDomains: value } }));
  }

  const { header, warnings } = buildCspHeader(config);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        {cspDirectiveOrder.map((key) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mono">{cspDirectiveLabels[key]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex flex-wrap gap-2">
                {sourceKeywordOptions.map((opt) => {
                  const active = config[key].keywords.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleKeyword(key, opt.value)}
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                        active
                          ? opt.caution
                            ? "border-destructive bg-destructive text-destructive-foreground"
                            : "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      {opt.value}
                    </button>
                  );
                })}
              </div>
              <Input
                placeholder="Custom domains, space or comma separated (e.g. cdn.example.com)"
                value={config[key].customDomains}
                onChange={(e) => updateDomains(key, e.target.value)}
                className="font-mono text-xs"
              />
            </CardContent>
          </Card>
        ))}

        <Button variant="ghost" onClick={() => setConfig(defaultCspConfig())} className="text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          Reset to defaults
        </Button>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader>
            <CardTitle>Generated header</CardTitle>
            <CardDescription>Use as an HTTP response header or a meta tag.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Label className="text-xs text-muted-foreground">HTTP header</Label>
              <pre className="mt-1 overflow-x-auto rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs text-foreground">
                {`Content-Security-Policy: ${header || "(no directives configured)"}`}
              </pre>
            </div>
            <div className="mt-4">
              <Label className="text-xs text-muted-foreground">HTML meta tag</Label>
              <pre className="mt-1 overflow-x-auto rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs text-foreground">
                {`<meta http-equiv="Content-Security-Policy" content="${header}">`}
              </pre>
            </div>
            <div className="mt-4">
              <CopyButton getText={() => header} label="Copy header value" successMessage="CSP header copied" />
            </div>
          </CardContent>
        </Card>

        {warnings.length > 0 && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {warnings.map((w, i) => (
                  <li key={i} className="text-xs leading-relaxed text-muted-foreground">
                    &bull; {w.message}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
