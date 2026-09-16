"use client";

import * as React from "react";
import { RotateCcw, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";
import { parseUrl, buildCleanUrl, sampleTrackedUrl } from "@/lib/generators/url-stripper";

export function UrlStripperTool() {
  const [input, setInput] = React.useState(sampleTrackedUrl);
  const [overrides, setOverrides] = React.useState<Record<string, boolean>>({});

  const parsed = parseUrl(input);

  const removedKeys = new Set(
    parsed.params
      .filter((p) => overrides[p.key] ?? p.isTracking)
      .map((p) => p.key)
  );

  const cleanedUrl = parsed.valid ? buildCleanUrl(input, removedKeys) : null;
  const trackingCount = parsed.params.filter((p) => p.isTracking).length;

  function toggleParam(key: string, currentlyRemoved: boolean) {
    setOverrides((prev) => ({ ...prev, [key]: !currentlyRemoved }));
  }

  function loadSample() {
    setInput(sampleTrackedUrl);
    setOverrides({});
  }

  function clearAll() {
    setInput("");
    setOverrides({});
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Paste a link</CardTitle>
          <CardDescription>Any URL with query parameters — affiliate links, shared posts, ad URLs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="https://example.com/page?utm_source=..."
          />

          {input.trim().length > 0 && !parsed.valid && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              That doesn&apos;t look like a valid URL yet.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={loadSample} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample
            </Button>
            <Button variant="ghost" onClick={clearAll} className="text-muted-foreground">
              Clear
            </Button>
          </div>

          {parsed.valid && parsed.params.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Parameters ({parsed.params.length})
              </p>
              <div className="max-h-[320px] space-y-1.5 overflow-auto">
                {parsed.params.map((p) => {
                  const isRemoved = overrides[p.key] ?? p.isTracking;
                  return (
                    <div
                      key={p.key}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-mono text-xs text-foreground">{p.key}</span>
                          {p.isTracking && (
                            <Badge variant="spark" className="shrink-0 text-[10px]">
                              tracking
                            </Badge>
                          )}
                        </div>
                        <p className="truncate font-mono text-[11px] text-muted-foreground">{p.value || "(empty)"}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">{isRemoved ? "Remove" : "Keep"}</span>
                        <Switch checked={!isRemoved} onCheckedChange={() => toggleParam(p.key, isRemoved)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Clean link
            </CardTitle>
            <CardDescription>Sharable without the tracking baggage.</CardDescription>
          </div>
          {parsed.valid && (
            <Badge variant="outline" className="shrink-0">
              {removedKeys.size} of {parsed.params.length} removed
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {!parsed.valid ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Paste a URL on the left to see the cleaned-up version.
            </p>
          ) : (
            <>
              <div className="break-all rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs text-foreground">
                {cleanedUrl}
              </div>

              {trackingCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  Detected <strong className="text-foreground">{trackingCount}</strong> known tracking
                  parameter{trackingCount === 1 ? "" : "s"} automatically flagged for removal. Toggle any
                  parameter above to keep or strip it manually.
                </p>
              )}

              <CopyButton getText={() => cleanedUrl ?? ""} label="Copy clean link" successMessage="Clean link copied" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
