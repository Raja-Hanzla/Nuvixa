"use client";

import * as React from "react";
import { toast } from "sonner";
import { Download, Trash2, RotateCcw, Info, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  newEntryFromUrl,
  parseUrlList,
  buildSitemapXml,
  isValidUrl,
  autoAssign,
  changeFreqOptions,
  sampleUrls,
  type SitemapEntry,
  type ChangeFreq,
} from "@/lib/generators/sitemap-builder";
import { downloadTextFile } from "@/lib/utils";

export function SitemapBuilderTool() {
  const [rawUrls, setRawUrls] = React.useState(sampleUrls);
  const [entries, setEntries] = React.useState<SitemapEntry[]>(() =>
    parseUrlList(sampleUrls).map(newEntryFromUrl)
  );

  function generateEntries() {
    const urls = parseUrlList(rawUrls);
    setEntries(urls.map(newEntryFromUrl));
  }

  function updateEntry(id: string, patch: Partial<SitemapEntry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function reassignAll() {
    setEntries((prev) => prev.map((e) => ({ ...e, ...autoAssign(e.url) })));
    toast.success("Priority and changefreq re-assigned by URL depth");
  }

  const invalidCount = entries.filter((e) => !isValidUrl(e.url)).length;
  const xml = buildSitemapXml(entries);

  function handleDownload() {
    downloadTextFile("sitemap.xml", xml);
    toast.success("sitemap.xml downloaded");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Paste your URLs</CardTitle>
            <CardDescription>One per line — priority and changefreq are auto-assigned by URL depth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={rawUrls}
              onChange={(e) => setRawUrls(e.target.value)}
              rows={6}
              spellCheck={false}
              className="font-mono text-xs"
            />
            <div className="flex flex-wrap gap-3">
              <Button onClick={generateEntries}>Generate entries</Button>
              <Button variant="ghost" onClick={reassignAll} className="text-muted-foreground">
                <RotateCcw className="h-4 w-4" />
                Re-assign all
              </Button>
            </div>
          </CardContent>
        </Card>

        {entries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Entries ({entries.length})</CardTitle>
              {invalidCount > 0 && (
                <CardDescription className="flex items-center gap-1.5 text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {invalidCount} invalid URL{invalidCount === 1 ? "" : "s"} excluded from output
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-2 rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={entry.url}
                      onChange={(e) => updateEntry(entry.id, { url: e.target.value })}
                      className={`flex-1 font-mono text-xs ${!isValidUrl(entry.url) ? "border-destructive" : ""}`}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeEntry(entry.id)} aria-label="Remove URL">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="date"
                      value={entry.lastmod}
                      onChange={(e) => updateEntry(entry.id, { lastmod: e.target.value })}
                      className="text-xs"
                    />
                    <Select
                      value={entry.changefreq}
                      onValueChange={(v) => updateEntry(entry.id, { changefreq: v as ChangeFreq })}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {changeFreqOptions.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min={0}
                      max={1}
                      step="0.1"
                      value={entry.priority}
                      onChange={(e) => updateEntry(entry.id, { priority: Number(e.target.value) })}
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>sitemap.xml</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="max-h-[480px] overflow-auto rounded-lg border border-border bg-secondary/40 p-4 font-mono text-xs leading-relaxed text-foreground">
            {xml}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <CopyButton getText={() => xml} successMessage="sitemap.xml copied" />
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download sitemap.xml
            </Button>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Google has stated it ignores the priority and changefreq values for ranking or
              crawling decisions — they're valid per the sitemap protocol and some other crawlers
              may still use them, but don't expect adjusting these numbers to influence Google
              search rankings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
