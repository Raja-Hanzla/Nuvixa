"use client";

import * as React from "react";
import { toast } from "sonner";
import { UploadCloud, RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/tools/copy-button";
import { convertSvg, isLikelySvg, sampleSvg } from "@/lib/generators/svg-data-uri";
import { cn, formatNumber } from "@/lib/utils";

type OutputFormat = "base64" | "url" | "css" | "img";

export function SvgToDataUriTool() {
  const [svgSource, setSvgSource] = React.useState("");
  const [minify, setMinify] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const [format, setFormat] = React.useState<OutputFormat>("base64");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const trimmed = svgSource.trim();
  const valid = trimmed.length > 0 && isLikelySvg(trimmed);
  const result = valid ? convertSvg(trimmed, minify) : null;

  function handleFile(file: File) {
    const looksRight = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
    if (!looksRight) {
      toast.error("That doesn't look like an .svg file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setSvgSource(reader.result);
    };
    reader.onerror = () => toast.error("Couldn't read that file.");
    reader.readAsText(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const outputText = result
    ? {
        base64: result.base64DataUri,
        url: result.urlEncodedDataUri,
        css: result.cssSnippet,
        img: result.imgSnippet,
      }[format]
    : "";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your SVG</CardTitle>
          <CardDescription>Drop a .svg file, or paste the XML directly below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            )}
          >
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-foreground">Drag & drop an .svg file, or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>

          <Textarea
            value={svgSource}
            onChange={(e) => setSvgSource(e.target.value)}
            placeholder="Or paste raw SVG XML here..."
            rows={10}
            spellCheck={false}
            className="font-mono text-xs"
          />

          <div className="flex items-center justify-between rounded-lg border border-border p-3.5">
            <div>
              <Label htmlFor="svg-minify" className="text-sm font-medium text-foreground">
                Minify before encoding
              </Label>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Strips comments, doctype, and extra whitespace
              </p>
            </div>
            <Switch id="svg-minify" checked={minify} onCheckedChange={setMinify} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setSvgSource(sampleSvg)} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample
            </Button>
            <Button variant="ghost" onClick={() => setSvgSource("")} className="text-muted-foreground">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
          <CardDescription>Choose the format you need, then copy.</CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Add an SVG to see the preview and generated code.
            </p>
          ) : (
            <>
              <div className="flex items-center justify-center rounded-lg border border-border bg-secondary/40 p-6">
                {/* Rendered via <img>, never dangerouslySetInnerHTML — this keeps any embedded
                    scripts from executing, since <img> treats SVGs as static images. */}
                <img src={result.base64DataUri} alt="SVG preview" className="max-h-32 max-w-full" />
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>
                  Original: <strong className="text-foreground">{formatNumber(result.originalSize)} B</strong>
                </span>
                {minify && (
                  <span>
                    Minified: <strong className="text-foreground">{formatNumber(result.finalSize)} B</strong>
                  </span>
                )}
                <span>
                  Encoded (base64): <strong className="text-foreground">{formatNumber(result.encodedSize)} B</strong>
                </span>
              </div>

              <div className="mt-4">
                <Tabs value={format} onValueChange={(v) => setFormat(v as OutputFormat)}>
                  <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="base64">Base64 URI</TabsTrigger>
                    <TabsTrigger value="url">URL-encoded</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="img">HTML img</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="mt-3 max-h-40 overflow-auto rounded-lg border border-border bg-secondary/40 p-4">
                <pre className="whitespace-pre-wrap break-all font-mono text-xs text-foreground">{outputText}</pre>
              </div>

              <div className="mt-4">
                <CopyButton getText={() => outputText} successMessage="Copied to clipboard" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
