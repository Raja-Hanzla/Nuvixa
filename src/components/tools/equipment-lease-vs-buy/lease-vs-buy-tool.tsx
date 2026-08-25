"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import { calculateLeaseVsBuy, defaultLeaseVsBuyInput, type LeaseVsBuyInput } from "@/lib/generators/lease-vs-buy";
import { cn, formatCurrency } from "@/lib/utils";

export function LeaseVsBuyTool() {
  const [input, setInput] = React.useState<LeaseVsBuyInput>(defaultLeaseVsBuyInput);

  function update<K extends keyof LeaseVsBuyInput>(key: K, value: LeaseVsBuyInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const result = calculateLeaseVsBuy(input);

  function summaryText() {
    const lines = [
      `Buy NPV: ${formatCurrency(result.buyNpv, "USD")}`,
      `Lease NPV: ${formatCurrency(result.leaseNpv, "USD")}`,
      `Cheaper option: ${result.cheaperOption === "tie" ? "Essentially a tie" : result.cheaperOption === "buy" ? "Buy" : "Lease"} (by ${formatCurrency(Math.abs(result.npvDifference), "USD")})`,
      "",
      "Year-by-year cumulative cash flow:",
      ...result.rows.map(
        (r) => `  Year ${r.year}: Buy ${formatCurrency(r.buyCumulative, "USD")} | Lease ${formatCurrency(r.leaseCumulative, "USD")}`
      ),
    ];
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Assumptions</CardTitle>
            <CardDescription>Compares full cash purchase against leasing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="lb-cost">Equipment cost (buy price)</Label>
              <Input
                id="lb-cost"
                type="number"
                min={0}
                value={input.equipmentCost}
                onChange={(e) => update("equipmentCost", Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="lb-life">Useful life (years)</Label>
                <Input
                  id="lb-life"
                  type="number"
                  min={1}
                  value={input.usefulLifeYears}
                  onChange={(e) => update("usefulLifeYears", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lb-tax">Tax rate (%)</Label>
                <Input
                  id="lb-tax"
                  type="number"
                  min={0}
                  max={100}
                  value={input.taxRatePercent}
                  onChange={(e) => update("taxRatePercent", Number(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lb-lease">Monthly lease payment</Label>
              <Input
                id="lb-lease"
                type="number"
                min={0}
                value={input.monthlyLeasePayment}
                onChange={(e) => update("monthlyLeasePayment", Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="lb-period">Analysis period (years)</Label>
                <Input
                  id="lb-period"
                  type="number"
                  min={1}
                  max={20}
                  value={input.analysisPeriodYears}
                  onChange={(e) => update("analysisPeriodYears", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lb-discount">Discount rate (%)</Label>
                <Input
                  id="lb-discount"
                  type="number"
                  min={0}
                  step="0.1"
                  value={input.discountRatePercent}
                  onChange={(e) => update("discountRatePercent", Number(e.target.value))}
                />
              </div>
            </div>
            <Button variant="ghost" onClick={() => setInput(defaultLeaseVsBuyInput)} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Reset form
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Net present value comparison</CardTitle>
            <CardDescription>Higher (less negative) NPV is the cheaper option.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className={cn("rounded-lg border p-4", result.cheaperOption === "buy" ? "border-success/30 bg-success/5" : "border-border bg-secondary/30")}>
                <p className="text-xs text-muted-foreground">Buy — NPV</p>
                <p className="mt-1 mono-nums text-xl font-bold text-foreground">{formatCurrency(result.buyNpv, "USD")}</p>
              </div>
              <div className={cn("rounded-lg border p-4", result.cheaperOption === "lease" ? "border-success/30 bg-success/5" : "border-border bg-secondary/30")}>
                <p className="text-xs text-muted-foreground">Lease — NPV</p>
                <p className="mt-1 mono-nums text-xl font-bold text-foreground">{formatCurrency(result.leaseNpv, "USD")}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {result.cheaperOption === "tie"
                ? "These two options are essentially equivalent over this period."
                : `${result.cheaperOption === "buy" ? "Buying" : "Leasing"} is cheaper by ${formatCurrency(Math.abs(result.npvDifference), "USD")} in present-value terms.`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumulative cash flow by year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">Buy (cumulative)</th>
                    <th className="pb-3">Lease (cumulative)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.year} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.year}</td>
                      <td className="py-3 pr-4 mono-nums text-muted-foreground">{formatCurrency(row.buyCumulative, "USD")}</td>
                      <td className="py-3 mono-nums text-muted-foreground">{formatCurrency(row.leaseCumulative, "USD")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Separator className="my-4" />
            <CopyButton getText={summaryText} label="Copy comparison" successMessage="Comparison copied" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
