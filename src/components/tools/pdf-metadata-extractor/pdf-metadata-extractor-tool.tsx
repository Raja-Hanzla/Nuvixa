"use client";

import * as React from "react";
import { FileDigit, UploadCloud, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inspectPdfBytes, type PdfInspection } from "@/lib/generators/pdf-metadata";
import { cn } from "@/lib/utils";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function PdfMetadataExtractorTool() {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<PdfInspection | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function loadFile(file: File) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        setResult(inspectPdfBytes(new Uint8Array(reader.result)));
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Drop a PDF</CardTitle>
          <CardDescription>Nothing is uploaded — it's read directly in your browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-10 text-center transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:bg-secondary/30"
            )}
          >
            <UploadCloud className="h-7 w-7 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag a PDF file here, or click to browse</p>
            {fileName && <p className="mt-1 truncate text-xs font-medium text-foreground">{fileName}</p>}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) loadFile(file);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDigit className="h-4 w-4 text-primary" />
            Metadata
          </CardTitle>
          <CardDescription>Page count, dimensions, and color space.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Drop a PDF on the left to inspect it.
            </p>
          ) : !result.valid ? (
            <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{result.error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                  <p className="text-xl font-semibold text-foreground">{result.pageCount}</p>
                  <p className="text-[11px] text-muted-foreground">Pages</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                  <p className="text-xl font-semibold text-foreground">{formatBytes(result.fileSizeBytes)}</p>
                  <p className="text-[11px] text-muted-foreground">File size</p>
                </div>
              </div>

              {result.mayBeIncomplete && (
                <div className="flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                  <p className="text-xs leading-relaxed text-spark">
                    This PDF uses compressed object streams, so some page details may not be visible to this
                    in-browser scan — the numbers above may be incomplete for this specific file.
                  </p>
                </div>
              )}

              {result.sizeGroups.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Page size{result.sizeGroups.length > 1 ? "s" : ""}
                  </p>
                  {result.sizeGroups.map((g, idx) => (
                    <div key={idx} className="rounded-lg border border-border bg-secondary/20 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-mono text-sm text-foreground">
                          {g.widthIn.toFixed(2)}″ × {g.heightIn.toFixed(2)}″{" "}
                          <span className="text-muted-foreground">
                            ({Math.round(g.widthPt)} × {Math.round(g.heightPt)} pt)
                          </span>
                        </p>
                        <Badge variant="outline" className="capitalize">
                          {g.orientation}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Aspect ratio {g.aspectRatio.toFixed(3)} ·{" "}
                        {result.detectedBoxCount < result.pageCount && result.sizeGroups.length === 1
                          ? `applies to all ${result.pageCount} pages (inherited page size)`
                          : `${g.count} page${g.count === 1 ? "" : "s"}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {result.colorSpaces.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Color spaces detected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.colorSpaces.map((cs) => (
                      <Badge key={cs} variant="outline">
                        {cs}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
