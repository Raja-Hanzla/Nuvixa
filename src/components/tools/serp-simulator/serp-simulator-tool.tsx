"use client";

import * as React from "react";
import { RotateCcw, Sparkles, Monitor, Smartphone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  buildAioSnippet,
  defaultSerpForm,
  descriptionLimits,
  getLimitStatus,
  parseDisplayUrl,
  titleLimits,
  type LimitStatus,
} from "@/lib/generators/serp-preview";
import { cn } from "@/lib/utils";

type Device = "desktop" | "mobile";

export function SerpSimulatorTool() {
  const [title, setTitle] = React.useState(defaultSerpForm.title);
  const [description, setDescription] = React.useState(defaultSerpForm.description);
  const [url, setUrl] = React.useState(defaultSerpForm.url);
  const [device, setDevice] = React.useState<Device>("desktop");

  const { domain, breadcrumb } = parseDisplayUrl(url);
  const titleStatus = getLimitStatus(title.length, titleLimits);
  const descriptionStatus = getLimitStatus(description.length, descriptionLimits);
  const aioSnippet = buildAioSnippet(title, description);

  function reset() {
    setTitle(defaultSerpForm.title);
    setDescription(defaultSerpForm.description);
    setUrl(defaultSerpForm.url);
  }

  function summaryText() {
    return [`Title: ${title}`, `Description: ${description}`, `URL: ${url}`].join("\n");
  }

  const isDesktop = device === "desktop";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your metadata</CardTitle>
          <CardDescription>Updates the preview as you type.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="serp-title">Meta title</Label>
              <CharCount length={title.length} limits={titleLimits} status={titleStatus} />
            </div>
            <Input
              id="serp-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A clear, compelling page title"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="serp-description">Meta description</Label>
              <CharCount length={description.length} limits={descriptionLimits} status={descriptionStatus} />
            </div>
            <Textarea
              id="serp-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A one or two sentence summary that makes someone want to click"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="serp-url">Page URL</Label>
            <Input
              id="serp-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/blog/your-post"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <CopyButton getText={summaryText} label="Copy metadata" successMessage="Metadata copied" />
            <Button variant="ghost" onClick={reset} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Search preview</CardTitle>
              <CardDescription>How this might appear in results.</CardDescription>
            </div>
            <Tabs value={device} onValueChange={(v) => setDevice(v as Device)}>
              <TabsList>
                <TabsTrigger value="desktop">
                  <Monitor className="h-3.5 w-3.5" />
                  <span className="ml-1.5 hidden sm:inline">Desktop</span>
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="ml-1.5 hidden sm:inline">Mobile</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-card p-5">
              <div
                className={cn(
                  "flex flex-col gap-1",
                  isDesktop ? "max-w-[600px]" : "max-w-[380px]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground">
                    {domain.charAt(0).toUpperCase() || "?"}
                  </span>
                  <span className="truncate text-xs text-success">{breadcrumb}</span>
                </div>
                <p
                  className={cn(
                    "truncate font-sans text-primary",
                    isDesktop ? "text-xl" : "text-base"
                  )}
                >
                  {title || "Your meta title will appear here"}
                </p>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {description || "Your meta description will appear here, wrapped as Google typically shows it."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                Simulated AI Overview
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm leading-relaxed text-foreground">{aioSnippet}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background text-[9px] font-semibold text-muted-foreground">
                  {domain.charAt(0).toUpperCase() || "?"}
                </span>
                <span className="text-xs text-muted-foreground">{domain}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              This is a stylized approximation to help you gauge tone and length — it doesn't
              predict Google's actual AI Overview output, which is generated dynamically.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CharCount({
  length,
  limits,
  status,
}: {
  length: number;
  limits: { idealMax: number; hardMax: number };
  status: LimitStatus;
}) {
  const statusStyles: Record<LimitStatus, string> = {
    good: "text-success",
    warn: "text-spark",
    over: "text-destructive",
  };

  return (
    <span className={cn("font-mono text-xs", statusStyles[status])}>
      {length} / {limits.hardMax}
    </span>
  );
}