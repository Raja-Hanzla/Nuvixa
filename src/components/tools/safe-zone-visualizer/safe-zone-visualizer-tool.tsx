"use client";

import * as React from "react";
import { UploadCloud, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { safeZones, combinedSafeZone, platformOrder, type Platform } from "@/lib/generators/safe-zone";
import { cn } from "@/lib/utils";

type Mode = Platform | "combined";

export function SafeZoneVisualizerTool() {
  const [mode, setMode] = React.useState<Mode>("tiktok");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const zone = mode === "combined" ? combinedSafeZone() : safeZones[mode];
  const detail = mode !== "combined" ? safeZones[mode] : null;

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Preview your creative</CardTitle>
            <CardDescription>Optional — upload a frame to check against the overlay.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary/40"
            >
              <UploadCloud className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-foreground">Upload a still frame or cover image</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>
            {imageUrl && (
              <Button variant="ghost" size="sm" onClick={() => setImageUrl(null)} className="text-muted-foreground">
                Clear image
              </Button>
            )}

            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
              <TabsList className="flex h-auto flex-wrap">
                {platformOrder.map((p) => (
                  <TabsTrigger key={p} value={p}>
                    {safeZones[p].label}
                  </TabsTrigger>
                ))}
                <TabsTrigger value="combined">All 3 (combined)</TabsTrigger>
              </TabsList>
            </Tabs>

            {detail && (
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  <strong className="text-foreground">Top:</strong> {detail.topLabel}
                </p>
                <p>
                  <strong className="text-foreground">Bottom:</strong> {detail.bottomLabel}
                </p>
                <p>
                  <strong className="text-foreground">Right:</strong> {detail.rightLabel}
                </p>
              </div>
            )}
            {mode === "combined" && (
              <p className="text-xs text-muted-foreground">
                Design inside this zone and your content clears all three platforms' UI at once —
                useful when repurposing one video everywhere.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>9:16 frame preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div
              className="relative overflow-hidden rounded-xl border border-border shadow-sm"
              style={{ width: 252, height: 448 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: imageUrl
                    ? `url(${imageUrl})`
                    : "linear-gradient(160deg, hsl(231 60% 30%), hsl(231 40% 15%))",
                }}
              />
              {/* Blocked zones */}
              <div
                className="absolute inset-x-0 top-0 bg-destructive/40"
                style={{ height: `${zone.top}%` }}
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-destructive/40"
                style={{ height: `${zone.bottom}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-destructive/40"
                style={{ width: `${zone.left}%` }}
              />
              <div
                className="absolute inset-y-0 right-0 bg-destructive/40"
                style={{ width: `${zone.right}%` }}
              />
              {/* Safe zone border */}
              <div
                className="absolute rounded-md border-2 border-dashed border-success"
                style={{
                  top: `${zone.top}%`,
                  bottom: `${zone.bottom}%`,
                  left: `${zone.left}%`,
                  right: `${zone.right}%`,
                }}
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Red = typically blocked by platform UI &middot; Dashed green = safe zone for text, faces, and CTAs
            </p>
          </CardContent>
        </Card>

        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            These are rounded, illustrative approximations based on commonly published guidance —
            not exact pixel specs. All three platforms update their UI overlays periodically
            (each has shifted at least once in the past year), so always preview your actual
            export inside the real app before finalizing paid creative.
          </p>
        </div>
      </div>
    </div>
  );
}
