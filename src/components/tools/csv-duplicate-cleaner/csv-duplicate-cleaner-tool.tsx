"use client";

import * as React from "react";
import { RotateCcw, FileSpreadsheet, UploadCloud, Download } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv, findDuplicates, toCsvText, sampleCsv } from "@/lib/generators/csv-duplicate-cleaner";
import { cn } from "@/lib/utils";

export function CsvDuplicateCleanerTool() {
  const [input, setInput] = React.useState(sampleCsv);
  const [keyColumns, setKeyColumns] = React.useState<Record<string, boolean>>({});
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const parsed = parseCsv(input);
  const activeKeyIndexes = parsed.headers
    .map((header, idx) => (keyColumns[header] ?? true ? idx : -1))
    .filter((idx) => idx !== -1);

  const result = findDuplicates(parsed.rows, activeKeyIndexes);
  const cleanedCsv = toCsvText(parsed.headers, result.cleanedRows);

  function loadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setInput(reader.result);
        setKeyColumns({});
      }
    };
    reader.readAsText(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }

  function downloadCleaned() {
    const blob = new Blob([cleanedCsv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadSample() {
    setInput(sampleCsv);
    setKeyColumns({});
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your CSV</CardTitle>
          <CardDescription>Drop a .csv file, or paste its contents below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:bg-secondary/30"
            )}
          >
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag a CSV file here, or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) loadFile(file);
              }}
            />
          </div>

          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setKeyColumns({});
            }}
            rows={8}
            spellCheck={false}
            className="font-mono text-xs"
            placeholder="name,email,city&#10;Ada Lovelace,ada@example.com,London"
          />

          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={loadSample} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInput("");
                setKeyColumns({});
              }}
              className="text-muted-foreground"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {parsed.headers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Columns to compare</CardTitle>
            <CardDescription>
              Rows are duplicates if all selected columns match. Turn off a column (like a unique ID) to compare on
              the rest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {parsed.headers.map((header) => (
                <div key={header} className="flex items-center gap-2">
                  <Switch
                    checked={keyColumns[header] ?? true}
                    onCheckedChange={(checked) => setKeyColumns((prev) => ({ ...prev, [header]: checked }))}
                    id={`col-${header}`}
                  />
                  <label htmlFor={`col-${header}`} className="cursor-pointer font-mono text-sm text-foreground">
                    {header}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-primary" />
              Cleaned result
            </CardTitle>
            <CardDescription>Duplicates removed, first occurrence of each kept.</CardDescription>
          </div>
          {parsed.rows.length > 0 && (
            <Badge variant={result.duplicateCount > 0 ? "spark" : "success"}>
              {result.duplicateCount} duplicate{result.duplicateCount === 1 ? "" : "s"} found
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {parsed.rows.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Load a CSV above to check for duplicates.
            </p>
          ) : (
            <>
              <div className="max-h-[360px] overflow-auto rounded-lg border border-border">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="sticky top-0 bg-secondary/60 backdrop-blur">
                    <tr>
                      {parsed.headers.map((h) => (
                        <th key={h} className="whitespace-nowrap border-b border-border px-3 py-2 font-semibold text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.cleanedRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/60 last:border-0">
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="whitespace-nowrap px-3 py-2 font-mono text-muted-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground">
                Kept <strong className="text-foreground">{result.cleanedRows.length}</strong> of{" "}
                <strong className="text-foreground">{result.totalRows}</strong> rows.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button onClick={downloadCleaned}>
                  <Download className="h-4 w-4" />
                  Download cleaned CSV
                </Button>
                <CopyButton getText={() => cleanedCsv} label="Copy as CSV" successMessage="CSV copied" variant="outline" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
