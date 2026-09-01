"use client";

import * as React from "react";
import { Info, Gauge } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  defaultRatings,
  ratingLabels,
  estimateQualityScore,
  cpcPercentChange,
  projectedCpc,
  qualityScoreScale,
  type ComponentRatings,
  type ComponentRating,
} from "@/lib/generators/quality-score";
import { cn, formatCurrency } from "@/lib/utils";

export function QualityScoreEstimatorTool() {
  const [ratings, setRatings] = React.useState<ComponentRatings>(defaultRatings);
  const [currentCpc, setCurrentCpc] = React.useState(3.5);

  function update<K extends keyof ComponentRatings>(key: K, value: ComponentRatings[K]) {
    setRatings((prev) => ({ ...prev, [key]: value }));
  }

  const qs = estimateQualityScore(ratings);
  const percentChange = cpcPercentChange(qs);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your three components</CardTitle>
          <CardDescription>Rate each as shown in your Google Ads account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <RatingField
            label="Expected CTR"
            hint="Weighted most heavily of the three"
            value={ratings.expectedCtr}
            onChange={(v) => update("expectedCtr", v)}
          />
          <RatingField
            label="Landing Page Experience"
            value={ratings.landingPageExperience}
            onChange={(v) => update("landingPageExperience", v)}
          />
          <RatingField
            label="Ad Relevance"
            value={ratings.adRelevance}
            onChange={(v) => update("adRelevance", v)}
          />

          <div className="space-y-1.5 pt-2">
            <Label htmlFor="qs-cpc">Your current average CPC (optional)</Label>
            <Input
              id="qs-cpc"
              type="number"
              min={0}
              step="0.01"
              value={currentCpc}
              onChange={(e) => setCurrentCpc(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <CardTitle>Estimated Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <p className="font-display text-5xl font-bold text-foreground">{qs}</p>
              <p className="text-muted-foreground">/ 10</p>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
              Relative to an average (QS 5) advertiser bidding for the same position, your
              estimated cost impact is:
            </p>
            <p
              className={cn(
                "mt-2 font-display text-2xl font-bold",
                percentChange <= 0 ? "text-success" : "text-destructive"
              )}
            >
              {percentChange >= 0 ? "+" : ""}
              {percentChange.toFixed(0)}% CPC
            </p>
          </CardContent>
        </Card>

        {currentCpc > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Projected CPC by Quality Score</CardTitle>
              <CardDescription>Based on your entered current CPC.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {qualityScoreScale.map((target) => (
                  <div key={target} className="flex items-center justify-between text-sm">
                    <span className={cn("text-muted-foreground", target === qs && "font-semibold text-foreground")}>
                      QS {target} {target === qs && "(you)"}
                    </span>
                    <span className="mono-nums text-foreground">
                      {formatCurrency(projectedCpc(currentCpc, qs, target), "USD")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Google doesn't publish its exact Quality Score formula or component weights. This
            estimate is grounded in Google's documented Ad Rank formula (bid × Quality Score),
            which implies cost scales inversely with your score — but real auctions also depend
            on competitor bids, ad rank thresholds, and factors Google doesn't disclose. Treat
            this as directional, not a guaranteed cost prediction.
          </p>
        </div>
      </div>
    </div>
  );
}

function RatingField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: ComponentRating;
  onChange: (value: ComponentRating) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as ComponentRating)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ratingLabels).map(([v, l]) => (
            <SelectItem key={v} value={v}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
