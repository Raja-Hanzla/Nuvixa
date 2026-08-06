"use client";

import * as React from "react";
import { ArrowLeftRight, CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  parseHexColor,
  evaluateWcag,
  fontFamilyOptions,
  defaultCheckerState,
} from "@/lib/generators/contrast-checker";
import { cn } from "@/lib/utils";

export function WcagCheckerTool() {
  const [textColor, setTextColor] = React.useState(defaultCheckerState.textColor);
  const [backgroundColor, setBackgroundColor] = React.useState(defaultCheckerState.backgroundColor);
  const [fontFamily, setFontFamily] = React.useState(defaultCheckerState.fontFamily);
  const [fontSize, setFontSize] = React.useState(defaultCheckerState.fontSize);
  const [bold, setBold] = React.useState(defaultCheckerState.bold);

  const textRgb = parseHexColor(textColor);
  const bgRgb = parseHexColor(backgroundColor);
  const result = textRgb && bgRgb ? evaluateWcag(textRgb, bgRgb, fontSize, bold) : null;

  function swapColors() {
    setTextColor(backgroundColor);
    setBackgroundColor(textColor);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Typography settings</CardTitle>
          <CardDescription>Choose your colors, font, size, and weight.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ColorField label="Text color" value={textColor} onChange={setTextColor} />
            <ColorField label="Background color" value={backgroundColor} onChange={setBackgroundColor} />
          </div>

          <Button variant="ghost" size="sm" onClick={swapColors} className="text-muted-foreground">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            Swap colors
          </Button>

          <div className="space-y-1.5">
            <Label htmlFor="wcag-font">Font family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger id="wcag-font">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilyOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="wcag-size">Font size</Label>
              <span className="font-mono text-xs text-muted-foreground">{fontSize}px</span>
            </div>
            <input
              id="wcag-size"
              type="range"
              min={10}
              max={48}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3.5">
            <Label htmlFor="wcag-bold" className="text-sm font-medium text-foreground">
              Bold weight
            </Label>
            <Switch id="wcag-bold" checked={bold} onCheckedChange={setBold} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="rounded-lg border border-border p-8"
              style={{ backgroundColor: bgRgb ? backgroundColor : "#ffffff" }}
            >
              <p
                style={{
                  color: textRgb ? textColor : "#000000",
                  fontFamily,
                  fontSize: `${fontSize}px`,
                  fontWeight: bold ? 700 : 400,
                  lineHeight: 1.5,
                }}
              >
                The quick brown fox jumps over the lazy dog. Readable text depends on real contrast, not just good intentions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WCAG result</CardTitle>
            <CardDescription>
              {result ? (result.large ? "Evaluated as large text" : "Evaluated as normal text") : "Enter valid hex colors"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-8 text-center text-sm text-muted-foreground">
                Enter valid hex colors (e.g. #1a1a2e) for both fields.
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                  <span className="text-sm text-muted-foreground">Contrast ratio</span>
                  <span className="font-mono text-2xl font-bold text-foreground">{result.ratio.toFixed(2)}:1</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <ResultBadge label="WCAG AA" threshold={result.aaThreshold} passes={result.passesAA} />
                  <ResultBadge label="WCAG AAA" threshold={result.aaaThreshold} passes={result.passesAAA} />
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {result.large
                    ? "Large text (24px+, or 18.66px+ bold) needs 3:1 for AA and 4.5:1 for AAA."
                    : "Normal text needs 4.5:1 for AA and 7:1 for AAA."}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-input bg-background p-1"
          aria-label={`${label} picker`}
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="font-mono" />
      </div>
    </div>
  );
}

function ResultBadge({ label, threshold, passes }: { label: string; threshold: number; passes: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3.5",
        passes ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
      )}
    >
      <div className="flex items-center gap-1.5">
        {passes ? (
          <CheckCircle2 className="h-4 w-4 text-success" />
        ) : (
          <XCircle className="h-4 w-4 text-destructive" />
        )}
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {passes ? "Passes" : "Fails"} &middot; needs {threshold}:1
      </p>
    </div>
  );
}
