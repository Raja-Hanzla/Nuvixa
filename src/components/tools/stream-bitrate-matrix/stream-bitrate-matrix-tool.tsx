"use client";

import * as React from "react";
import { Radio, CheckCircle2, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getBitrateRecommendation,
  resolutionOptions,
  type Platform,
  type FrameRate,
} from "@/lib/generators/stream-bitrate-matrix";
import { cn } from "@/lib/utils";

export function StreamBitrateMatrixTool() {
  const [platform, setPlatform] = React.useState<Platform>("twitch");
  const [resolutionId, setResolutionId] = React.useState("1080p");
  const [fps, setFps] = React.useState<FrameRate>(60);
  const [uploadMbps, setUploadMbps] = React.useState("35");

  const result = getBitrateRecommendation(platform, resolutionId, fps, Number(uploadMbps) || 0);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your setup</CardTitle>
          <CardDescription>Platform, target quality, and your tested upload speed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label>Platform</Label>
            <Tabs value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
              <TabsList>
                <TabsTrigger value="twitch">Twitch</TabsTrigger>
                <TabsTrigger value="youtube">YouTube</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-1.5">
            <Label>Resolution</Label>
            <Select value={resolutionId} onValueChange={setResolutionId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resolutionOptions.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label} ({r.width}×{r.height})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Frame rate</Label>
            <Tabs value={String(fps)} onValueChange={(v) => setFps(Number(v) as FrameRate)}>
              <TabsList>
                <TabsTrigger value="30">30 fps</TabsTrigger>
                <TabsTrigger value="60">60 fps</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="upload-speed">Tested upload speed (Mbps)</Label>
            <Input
              id="upload-speed"
              type="number"
              min={0}
              value={uploadMbps}
              onChange={(e) => setUploadMbps(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Run a speed test while nothing else is uploading — this is your ceiling, not your download speed.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary" />
            Recommended settings
          </CardTitle>
          <CardDescription>Encoder settings to punch into OBS.</CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Choose a resolution to see recommended settings.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                  <p className="text-lg font-semibold text-foreground">{result.videoKbps}</p>
                  <p className="text-[11px] text-muted-foreground">Video (kbps)</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                  <p className="text-lg font-semibold text-foreground">{result.audioKbps}</p>
                  <p className="text-[11px] text-muted-foreground">Audio (kbps)</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                  <p className="text-lg font-semibold text-foreground">{result.totalKbps}</p>
                  <p className="text-[11px] text-muted-foreground">Total (kbps)</p>
                </div>
              </div>

              <div
                className={cn(
                  "flex items-start gap-2.5 rounded-lg border p-3 text-sm",
                  result.uploadIsSufficient
                    ? "border-success/30 bg-success/5 text-success"
                    : "border-destructive/30 bg-destructive/5 text-destructive"
                )}
              >
                {result.uploadIsSufficient ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p className="leading-relaxed">
                  {result.uploadIsSufficient
                    ? `Your upload speed comfortably covers this bitrate, with about ${result.uploadMarginPercent.toFixed(0)}% headroom to spare.`
                    : `This needs roughly ${result.requiredUploadMbps.toFixed(1)} Mbps of upload with headroom — try a lower resolution, frame rate, or bitrate.`}
                </p>
              </div>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-muted-foreground">Rate control</dt>
                  <dd className="font-medium text-foreground">{result.rateControl}</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-muted-foreground">Keyframe interval</dt>
                  <dd className="font-medium text-foreground">{result.keyframeIntervalSeconds}s</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-muted-foreground">Profile</dt>
                  <dd className="font-medium text-foreground">{result.profile}</dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-muted-foreground">Preset</dt>
                  <dd className="font-medium text-foreground">{result.recommendedPreset}</dd>
                </div>
              </dl>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
