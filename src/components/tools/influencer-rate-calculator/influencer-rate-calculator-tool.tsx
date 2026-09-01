"use client";

import * as React from "react";
import { Info, Gift } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deliverableBaseRates,
  nicheMultipliers,
  defaultRateInput,
  calculateInfluencerRate,
  type RateInput,
  type Niche,
  type DeliverableFormat,
} from "@/lib/generators/influencer-rate";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function InfluencerRateCalculatorTool() {
  const [input, setInput] = React.useState<RateInput>(defaultRateInput);

  function update<K extends keyof RateInput>(key: K, value: RateInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const result = calculateInfluencerRate(input);

  function summaryText() {
    return [
      `Platform/format: ${deliverableBaseRates[input.format].label}`,
      `Audience: ${formatNumber(input.followers)} followers, ${input.engagementRate}% engagement (${result.tierLabel})`,
      `Per-deliverable rate: ${formatCurrency(result.perDeliverableRate, "USD")}`,
      `Deliverables: ${input.numberOfDeliverables}${result.volumeDiscountPercent > 0 ? ` (${result.volumeDiscountPercent}% volume discount applied)` : ""}`,
      `Estimated package price: ${formatCurrency(result.totalPackagePrice, "USD")}`,
    ].join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Audience & deliverable</CardTitle>
          <CardDescription>Baseline pricing built from industry rules of thumb.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ir-followers">Follower / subscriber count</Label>
              <Input
                id="ir-followers"
                type="number"
                min={0}
                value={input.followers}
                onChange={(e) => update("followers", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ir-engagement">Engagement rate (%)</Label>
              <Input
                id="ir-engagement"
                type="number"
                min={0}
                step="0.1"
                value={input.engagementRate}
                onChange={(e) => update("engagementRate", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ir-format">Deliverable format</Label>
            <Select value={input.format} onValueChange={(v) => update("format", v as DeliverableFormat)}>
              <SelectTrigger id="ir-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(deliverableBaseRates).map(([value, cfg]) => (
                  <SelectItem key={value} value={value}>
                    {cfg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ir-niche">Content niche</Label>
            <Select value={input.niche} onValueChange={(v) => update("niche", v as Niche)}>
              <SelectTrigger id="ir-niche">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(nicheMultipliers).map(([value, cfg]) => (
                  <SelectItem key={value} value={value}>
                    {cfg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ir-count">Number of deliverables in this package</Label>
            <Input
              id="ir-count"
              type="number"
              min={1}
              value={input.numberOfDeliverables}
              onChange={(e) => update("numberOfDeliverables", Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">3+ pieces typically earn a bulk discount.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border p-3.5">
              <Label htmlFor="ir-usage" className="text-sm font-medium text-foreground">
                Usage rights / whitelisting
              </Label>
              <Switch
                id="ir-usage"
                checked={input.includeUsageRights}
                onCheckedChange={(v) => update("includeUsageRights", v)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3.5">
              <Label htmlFor="ir-exclusivity" className="text-sm font-medium text-foreground">
                Category exclusivity
              </Label>
              <Switch
                id="ir-exclusivity"
                checked={input.includeExclusivity}
                onCheckedChange={(v) => update("includeExclusivity", v)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Estimated rate</CardTitle>
          <CardDescription>{result.tierLabel} &middot; benchmark engagement {result.benchmarkEngagement}%</CardDescription>
        </CardHeader>
        <CardContent>
          {result.isGiftedRange && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3.5">
              <Gift className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                At this follower count, gifted-only collaborations (free product, no cash fee) are
                common in the industry — though that doesn't mean you have to accept unpaid work
                if your engagement or niche adds real value. The rate below is a useful floor to
                negotiate from either way.
              </p>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Base rate (before engagement adjustment)</span>
              <span className="mono-nums text-foreground">
                {formatCurrency(result.perDeliverableRate / result.engagementAdjustment, "USD")}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Engagement adjustment ({result.engagementAdjustment.toFixed(2)}x)</span>
              <span className="mono-nums text-foreground">{formatCurrency(result.perDeliverableRate, "USD")}</span>
            </div>
            {result.usageRightsAddOn > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Usage rights add-on</span>
                <span className="mono-nums text-foreground">+{formatCurrency(result.usageRightsAddOn, "USD")}</span>
              </div>
            )}
            {result.exclusivityAddOn > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Exclusivity add-on</span>
                <span className="mono-nums text-foreground">+{formatCurrency(result.exclusivityAddOn, "USD")}</span>
              </div>
            )}
            {result.volumeDiscountPercent > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Volume discount ({result.volumeDiscountPercent}%)</span>
                <span className="mono-nums text-foreground">
                  -{formatCurrency(result.subtotal - result.totalPackagePrice, "USD")}
                </span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-display text-lg font-bold text-foreground">
              <span>Estimated package price</span>
              <span className="mono-nums text-primary">{formatCurrency(result.totalPackagePrice, "USD")}</span>
            </div>
          </div>

          <div className="mt-5">
            <CopyButton getText={summaryText} label="Copy rate breakdown" successMessage="Breakdown copied" className="w-full" />
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              This is an illustrative baseline built from commonly-cited industry rules of thumb,
              not a guaranteed market rate — actual rates vary widely by negotiation, brand
              budget, and relationship. Use it as a starting point for a conversation, not a
              final number.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
