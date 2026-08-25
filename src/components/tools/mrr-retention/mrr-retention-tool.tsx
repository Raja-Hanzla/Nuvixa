"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import { calculateMrrMetrics, defaultMrrInput, type MrrInput } from "@/lib/generators/mrr-retention";
import { cn, formatCurrency } from "@/lib/utils";

export function MrrRetentionTool() {
  const [input, setInput] = React.useState<MrrInput>(defaultMrrInput);

  function update<K extends keyof MrrInput>(key: K, value: MrrInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const results = calculateMrrMetrics(input);

  function summaryText() {
    return [
      `Starting MRR: ${formatCurrency(input.startingMrr, "USD")}`,
      `New: +${formatCurrency(input.newMrr, "USD")} | Expansion: +${formatCurrency(input.expansionMrr, "USD")} | Contraction: -${formatCurrency(input.contractionMrr, "USD")} | Churned: -${formatCurrency(input.churnedMrr, "USD")}`,
      `Ending MRR: ${formatCurrency(results.endingMrr, "USD")} (${results.growthRatePercent >= 0 ? "+" : ""}${results.growthRatePercent.toFixed(1)}%)`,
      "",
      `Net Revenue Retention (NRR): ${results.nrrPercent.toFixed(1)}%`,
      `Gross Revenue Retention (GRR): ${results.grrPercent.toFixed(1)}%`,
      `Net churn: ${results.netChurnPercent.toFixed(1)}% | Gross churn: ${results.grossChurnPercent.toFixed(1)}%`,
    ].join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>MRR movement this period</CardTitle>
          <CardDescription>Enter your starting MRR and how it moved.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="mrr-start">Starting MRR</Label>
            <Input
              id="mrr-start"
              type="number"
              min={0}
              value={input.startingMrr}
              onChange={(e) => update("startingMrr", Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="mrr-new">New MRR</Label>
              <Input
                id="mrr-new"
                type="number"
                min={0}
                value={input.newMrr}
                onChange={(e) => update("newMrr", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">From brand-new customers</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mrr-expansion">Expansion MRR</Label>
              <Input
                id="mrr-expansion"
                type="number"
                min={0}
                value={input.expansionMrr}
                onChange={(e) => update("expansionMrr", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Upgrades from existing customers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="mrr-contraction">Contraction MRR</Label>
              <Input
                id="mrr-contraction"
                type="number"
                min={0}
                value={input.contractionMrr}
                onChange={(e) => update("contractionMrr", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Downgrades from existing customers</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mrr-churned">Churned MRR</Label>
              <Input
                id="mrr-churned"
                type="number"
                min={0}
                value={input.churnedMrr}
                onChange={(e) => update("churnedMrr", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Lost from cancellations</p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setInput(defaultMrrInput)}
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
            <CardTitle>Ending MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <p className="font-display text-3xl font-bold text-foreground">
                {formatCurrency(results.endingMrr, "USD")}
              </p>
              <span
                className={cn(
                  "font-mono text-sm font-semibold",
                  results.growthRatePercent >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {results.growthRatePercent >= 0 ? "+" : ""}
                {results.growthRatePercent.toFixed(1)}%
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Net new MRR this period: {results.netNewMrr >= 0 ? "+" : ""}
              {formatCurrency(results.netNewMrr, "USD")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retention metrics</CardTitle>
            <CardDescription>Based only on your existing customer base.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <RetentionStat
                label="Net Revenue Retention"
                value={`${results.nrrPercent.toFixed(1)}%`}
                good={results.nrrPercent >= 100}
              />
              <RetentionStat
                label="Gross Revenue Retention"
                value={`${results.grrPercent.toFixed(1)}%`}
                good={results.grrPercent >= 90}
              />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <RetentionStat
                label="Net churn"
                value={`${results.netChurnPercent.toFixed(1)}%`}
                good={results.netChurnPercent <= 0}
                invert
              />
              <RetentionStat
                label="Gross churn"
                value={`${results.grossChurnPercent.toFixed(1)}%`}
                good={results.grossChurnPercent <= 3}
                invert
              />
            </div>
            <div className="pt-2">
              <CopyButton getText={summaryText} label="Copy full breakdown" successMessage="Metrics copied" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RetentionStat({
  label,
  value,
  good,
}: {
  label: string;
  value: string;
  good: boolean;
  invert?: boolean;
}) {
  return (
    <div className={cn("rounded-lg border p-3.5", good ? "border-success/30 bg-success/5" : "border-spark/30 bg-spark/5")}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-mono text-xl font-bold", good ? "text-success" : "text-spark")}>{value}</p>
    </div>
  );
}
