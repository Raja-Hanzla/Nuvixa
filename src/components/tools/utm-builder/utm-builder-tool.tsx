"use client";

import * as React from "react";
import { toast } from "sonner";
import { RotateCcw, Bookmark, Trash2, Link2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import {
  buildUtmUrl,
  defaultUtmInput,
  utmPresets,
  UTM_STORAGE_KEY,
  type UtmInput,
  type SavedCampaign,
} from "@/lib/generators/utm-builder";
import { copyToClipboard } from "@/lib/utils";

export function UtmBuilderTool() {
  const [input, setInput] = React.useState<UtmInput>(defaultUtmInput);
  const [saved, setSaved] = React.useState<SavedCampaign[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  // Load saved campaigns from localStorage once, on mount (client-only).
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(UTM_STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist whenever the list changes, after the initial load.
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // storage unavailable (private browsing, quota, etc.) — fail silently
    }
  }, [saved, hydrated]);

  function update<K extends keyof UtmInput>(key: K, value: UtmInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: { source: string; medium: string }) {
    setInput((prev) => ({ ...prev, source: preset.source, medium: preset.medium }));
  }

  const generatedUrl = buildUtmUrl(input);

  function handleSave() {
    if (!generatedUrl) {
      toast.error("Add a valid URL before saving this campaign.");
      return;
    }
    const entry: SavedCampaign = {
      id: Math.random().toString(36).slice(2, 9),
      label: input.campaign.trim() || "Untitled campaign",
      url: generatedUrl,
      createdAt: Date.now(),
    };
    setSaved((prev) => [entry, ...prev]);
    toast.success("Campaign saved");
  }

  function removeSaved(id: string) {
    setSaved((prev) => prev.filter((c) => c.id !== id));
  }

  async function copySaved(url: string) {
    const ok = await copyToClipboard(url);
    toast[ok ? "success" : "error"](ok ? "Link copied" : "Couldn't copy link");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Build your link</CardTitle>
          <CardDescription>Fill in your destination URL and campaign parameters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="utm-url">Website URL</Label>
            <Input
              id="utm-url"
              placeholder="https://example.com/landing-page"
              value={input.url}
              onChange={(e) => update("url", e.target.value)}
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Quick presets</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {utmPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="utm-source">Campaign source</Label>
              <Input
                id="utm-source"
                placeholder="google"
                value={input.source}
                onChange={(e) => update("source", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="utm-medium">Campaign medium</Label>
              <Input
                id="utm-medium"
                placeholder="cpc"
                value={input.medium}
                onChange={(e) => update("medium", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="utm-campaign">Campaign name</Label>
            <Input
              id="utm-campaign"
              placeholder="spring_sale"
              value={input.campaign}
              onChange={(e) => update("campaign", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="utm-term">Campaign term (optional)</Label>
              <Input
                id="utm-term"
                placeholder="running+shoes"
                value={input.term}
                onChange={(e) => update("term", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="utm-content">Campaign content (optional)</Label>
              <Input
                id="utm-content"
                placeholder="banner_v2"
                value={input.content}
                onChange={(e) => update("content", e.target.value)}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setInput(defaultUtmInput)}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset form
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your tracking link</CardTitle>
            <CardDescription>Updates live as you fill in the form.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-4">
              <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="break-all font-mono text-sm text-foreground">
                {generatedUrl || "Add a website URL to generate your link"}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <CopyButton
                getText={() => generatedUrl ?? ""}
                successMessage="Link copied"
                disabled={!generatedUrl}
              />
              <Button variant="outline" onClick={handleSave} disabled={!generatedUrl}>
                <Bookmark className="h-4 w-4" />
                Save campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved campaigns</CardTitle>
            <CardDescription>Stored in this browser, so they'll be here next visit.</CardDescription>
          </CardHeader>
          <CardContent>
            {saved.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No campaigns saved yet — build a link and click "Save campaign."
              </p>
            ) : (
              <ul className="space-y-3">
                {saved.map((campaign) => (
                  <li key={campaign.id}>
                    <div className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                      <div className="min-w-0">
                        <Badge variant="secondary" className="mb-1.5">
                          {campaign.label}
                        </Badge>
                        <p className="truncate font-mono text-xs text-muted-foreground">{campaign.url}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copySaved(campaign.url)}
                          aria-label="Copy link"
                        >
                          <Link2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSaved(campaign.id)}
                          aria-label="Delete campaign"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {saved.length > 0 && (
              <>
                <Separator className="my-4" />
                <Button variant="ghost" size="sm" onClick={() => setSaved([])} className="text-muted-foreground">
                  Clear all saved campaigns
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
