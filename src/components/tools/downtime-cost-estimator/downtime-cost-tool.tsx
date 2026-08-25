"use client";

import * as React from "react";
import { RotateCcw, ServerCrash } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import { calculateDowntimeCost, defaultDowntimeInput, type DowntimeInput } from "@/lib/generators/downtime-cost";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function DowntimeCostTool() {
  const [input, setInput] = React.useState<DowntimeInput>(defaultDowntimeInput);

  function update<K extends keyof DowntimeInput>(key: K, value: DowntimeInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const result = calculateDowntimeCost(input);

  function summaryText() {
    return [
      `Outage duration: ${input.outageMinutes} minutes`,
      `Revenue loss: ${formatCurrency(result.totalRevenueLoss, "USD")}`,
      `Idled labor cost: ${formatCurrency(result.totalLaborCost, "USD")}`,
      `Total estimated cost: ${formatCurrency(result.totalCost, "USD")}`,
      `Cost per minute of downtime: ${formatCurrency(result.costPerMinute, "USD")}`,
    ].join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Outage details</CardTitle>
          <CardDescription>Rough numbers are fine — this is a directional estimate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="dt-minutes">Outage duration (minutes)</Label>
            <Input
              id="dt-minutes"
              type="number"
              min={0}
              value={input.outageMinutes}
              onChange={(e) => update("outageMinutes", Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dt-transactions">Transactions per hour</Label>
              <Input
                id="dt-transactions"
                type="number"
                min={0}
                value={input.hourlyTransactions}
                onChange={(e) => update("hourlyTransactions", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dt-aov">Avg. order / cart value</Label>
              <Input
                id="dt-aov"
                type="number"
                min={0}
                step="0.01"
                value={input.avgOrderValue}
                onChange={(e) => update("avgOrderValue", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dt-impact">Conversion impact (%)</Label>
            <Input
              id="dt-impact"
              type="number"
              min={0}
              max={100}
              value={input.conversionImpactPercent}
              onChange={(e) => update("conversionImpactPercent", Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              100% means the outage blocks all transactions; lower it if some traffic still converts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dt-employees">Employees idled</Label>
              <Input
                id="dt-employees"
                type="number"
                min={0}
                value={input.employeesIdled}
                onChange={(e) => update("employeesIdled", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dt-wage">Avg. hourly wage</Label>
              <Input
                id="dt-wage"
                type="number"
                min={0}
                step="0.01"
                value={input.avgHourlyWage}
                onChange={(e) => update("avgHourlyWage", Number(e.target.value))}
              />
            </div>
          </div>

          <Button variant="ghost" onClick={() => setInput(defaultDowntimeInput)} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" />
            Reset form
          </Button>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader className="flex flex-row items-center gap-2">
          <ServerCrash className="h-4 w-4 text-destructive" />
          <div>
            <CardTitle>Estimated damage</CardTitle>
            <CardDescription>{formatNumber(input.outageMinutes)} minutes of downtime</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-display text-4xl font-bold text-destructive">
            {formatCurrency(result.totalCost, "USD")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatCurrency(result.costPerMinute, "USD")}/minute burn rate
          </p>

          <Separator className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Lost revenue</span>
              <span className="mono-nums text-foreground">{formatCurrency(result.totalRevenueLoss, "USD")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Idled labor cost</span>
              <span className="mono-nums text-foreground">{formatCurrency(result.totalLaborCost, "USD")}</span>
            </div>
          </div>

          <div className="mt-5">
            <CopyButton getText={summaryText} label="Copy incident summary" successMessage="Summary copied" className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
