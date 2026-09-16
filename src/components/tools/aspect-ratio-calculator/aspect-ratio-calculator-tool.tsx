"use client";

import * as React from "react";
import { Ratio } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { calculateAspectRatio, ratioPresets } from "@/lib/generators/aspect-ratio";
import { cn } from "@/lib/utils";

export function AspectRatioCalculatorTool() {
  const [width, setWidth] = React.useState("1920");
  const [height, setHeight] = React.useState("1080");

  const result = calculateAspectRatio(parseFloat(width), parseFloat(height));

  function applyPreset(w: number, h: number) {
    setWidth(String(w));
    setHeight(String(h));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Dimensions</CardTitle>
          <CardDescription>Enter any width and height in pixels — or start from a common ratio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ar-width">Width (px)</Label>
              <Input
                id="ar-width"
                type="number"
                min={1}
                inputMode="decimal"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ar-height">Height (px)</Label>
              <Input
                id="ar-height"
                type="number"
                min={1}
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Common ratios</p>
            <div className="flex flex-wrap gap-2">
              {ratioPresets.map((preset) => {
                const active = result?.simplifiedW === preset.width && result?.simplifiedH === preset.height;
                return (
                  <Button
                    key={preset.label}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => applyPreset(preset.width, preset.height)}
                    className={cn(
                      "border border-border text-muted-foreground",
                      active && "border-primary bg-primary/10 text-primary"
                    )}
                  >
                    {preset.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {!result && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              Enter a positive width and height to calculate a ratio.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ratio className="h-4 w-4 text-primary" />
            Ratio & CSS
          </CardTitle>
          <CardDescription>Modern aspect-ratio and the legacy padding-top fallback.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {!result ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Waiting on valid dimensions.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 rounded-lg border border-border bg-secondary/30 p-4">
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {result.simplifiedW} : {result.simplifiedH}
                  </p>
                  <p className="text-xs text-muted-foreground">Simplified ratio</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{result.decimalRatio.toFixed(4)}</p>
                  <p className="text-xs text-muted-foreground">Decimal ratio</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{result.paddingTopPercent.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">Padding-top</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Modern (aspect-ratio)
                </p>
                <pre className="overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
                  {result.modernCss}
                </pre>
                <CopyButton getText={() => result.modernCss} label="Copy modern CSS" successMessage="Modern CSS copied" />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Legacy fallback (padding-top)
                </p>
                <pre className="overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
                  {result.legacyCss}
                </pre>
                <CopyButton getText={() => result.legacyCss} label="Copy legacy CSS" successMessage="Legacy CSS copied" variant="outline" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
