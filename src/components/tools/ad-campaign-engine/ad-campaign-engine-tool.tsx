"use client";

import * as React from "react";
import { RotateCcw, ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies, currencySymbol } from "@/lib/generators/invoice";
import {
  calculateCampaign,
  defaultCampaignInput,
  type CampaignInput,
} from "@/lib/generators/ad-campaign";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

export function AdCampaignEngineTool() {
  const [input, setInput] = React.useState<CampaignInput>(defaultCampaignInput);
  const [currency, setCurrency] = React.useState("USD");

  function update<K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const results = calculateCampaign(input);

  function summaryText() {
    return [
      `Ad spend: ${formatCurrency(input.adSpend, currency)} across ${formatNumber(input.impressions)} impressions`,
      `CPM: ${formatCurrency(results.cpm, currency)}`,
      `Clicks: ${formatNumber(results.clicks)} (CTR ${input.ctr}%) — CPC: ${formatCurrency(results.cpc, currency)}`,
      `Conversions: ${formatNumber(results.conversions, 1)} (rate ${input.conversionRate}%) — CPA: ${formatCurrency(results.cpa, currency)}`,
      `Revenue: ${formatCurrency(results.revenue, currency)}`,
      `ROAS: ${results.roas.toFixed(2)}x — ROI: ${results.roiPercent.toFixed(1)}%`,
    ].join("\n");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Campaign inputs</CardTitle>
            <CardDescription>Every result below updates instantly as you type.</CardDescription>
          </div>
          <div className="w-full sm:w-48">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Field
              id="ac-spend"
              label="Ad spend"
              value={input.adSpend}
              onChange={(v) => update("adSpend", v)}
            />
            <Field
              id="ac-impressions"
              label="Impressions"
              value={input.impressions}
              onChange={(v) => update("impressions", v)}
            />
            <Field id="ac-ctr" label="CTR (%)" step="0.01" value={input.ctr} onChange={(v) => update("ctr", v)} />
            <Field
              id="ac-cvr"
              label="Conversion rate (%)"
              step="0.01"
              value={input.conversionRate}
              onChange={(v) => update("conversionRate", v)}
            />
            <Field
              id="ac-aov"
              label="Avg. order value"
              step="0.01"
              value={input.aov}
              onChange={(v) => update("aov", v)}
            />
          </div>
          <Button
            variant="ghost"
            onClick={() => setInput(defaultCampaignInput)}
            className="mt-4 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset form
          </Button>
        </CardContent>
      </Card>

      {/* Connected calculation blocks */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Block
          title="Reach & cost"
          rows={[
            ["Ad spend", formatCurrency(input.adSpend, currency)],
            ["Impressions", formatNumber(input.impressions)],
            ["CPM", formatCurrency(results.cpm, currency), true],
          ]}
        />
        <Block
          title="Engagement"
          rows={[
            ["CTR", `${input.ctr}%`],
            ["Clicks", formatNumber(results.clicks)],
            ["CPC", formatCurrency(results.cpc, currency), true],
          ]}
        />
        <Block
          title="Conversion & return"
          isLast
          rows={[
            ["Conversions", formatNumber(results.conversions, 1)],
            ["CPA", formatCurrency(results.cpa, currency)],
            ["Revenue", formatCurrency(results.revenue, currency)],
            ["ROAS", `${results.roas.toFixed(2)}x`, true],
            ["ROI", `${results.roiPercent.toFixed(1)}%`, true],
          ]}
        />
      </div>

      <div className="flex justify-end">
        <CopyButton getText={summaryText} label="Copy full breakdown" successMessage="Campaign breakdown copied" />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  step = "1",
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Block({
  title,
  rows,
  isLast = false,
}: {
  title: string;
  rows: [string, string, boolean?][];
  isLast?: boolean;
}) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {rows.map(([label, value, highlight]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={cn("mono-nums font-semibold", highlight ? "text-primary text-base" : "text-foreground")}>
              {value}
            </span>
          </div>
        ))}
      </CardContent>
      {!isLast && (
        <ArrowRight className="absolute -right-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/40 lg:block" />
      )}
    </Card>
  );
}
