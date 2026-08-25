"use client";

import * as React from "react";
import { RotateCcw, Building2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import { buildRentRoll, defaultLeaseInput, type LeaseInput } from "@/lib/generators/lease-calculator";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function LeaseCalculatorTool() {
  const [input, setInput] = React.useState<LeaseInput>(defaultLeaseInput);

  function update<K extends keyof LeaseInput>(key: K, value: LeaseInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const rentRoll = buildRentRoll(input);
  const yearOne = rentRoll[0];

  function summaryText() {
    const lines = [
      `${formatNumber(input.squareFootage)} sq ft — Year 1: ${formatCurrency(yearOne.totalPerSqft, "USD")}/sqft/yr`,
      `Year 1 monthly cost: ${formatCurrency(yearOne.monthlyTotal, "USD")}`,
      `Year 1 annual cost: ${formatCurrency(yearOne.annualTotal, "USD")}`,
      "",
      "Rent roll:",
      ...rentRoll.map(
        (row) =>
          `  Year ${row.year}: ${formatCurrency(row.totalPerSqft, "USD")}/sqft/yr — ${formatCurrency(row.monthlyTotal, "USD")}/mo (${formatCurrency(row.annualTotal, "USD")}/yr)`
      ),
    ];
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Lease terms</CardTitle>
            <CardDescription>Rates are entered per square foot, per year.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="lc-sqft">Rentable square footage</Label>
              <Input
                id="lc-sqft"
                type="number"
                min={0}
                value={input.squareFootage}
                onChange={(e) => update("squareFootage", Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="lc-base">Base rent ($/sqft/yr)</Label>
                <Input
                  id="lc-base"
                  type="number"
                  min={0}
                  step="0.01"
                  value={input.baseRentPerSqft}
                  onChange={(e) => update("baseRentPerSqft", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lc-nnn">NNN / CAM ($/sqft/yr)</Label>
                <Input
                  id="lc-nnn"
                  type="number"
                  min={0}
                  step="0.01"
                  value={input.nnnPerSqft}
                  onChange={(e) => update("nnnPerSqft", Number(e.target.value))}
                />
              </div>
            </div>
            <p className="-mt-2 text-xs text-muted-foreground">
              NNN/CAM typically covers property taxes, insurance, and common area maintenance.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="lc-base-esc">Base rent escalation (%/yr)</Label>
                <Input
                  id="lc-base-esc"
                  type="number"
                  min={0}
                  step="0.1"
                  value={input.baseEscalationPercent}
                  onChange={(e) => update("baseEscalationPercent", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lc-nnn-esc">NNN escalation (%/yr)</Label>
                <Input
                  id="lc-nnn-esc"
                  type="number"
                  min={0}
                  step="0.1"
                  value={input.nnnEscalationPercent}
                  onChange={(e) => update("nnnEscalationPercent", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lc-term">Lease term (years)</Label>
              <Input
                id="lc-term"
                type="number"
                min={1}
                max={20}
                value={input.leaseTermYears}
                onChange={(e) => update("leaseTermYears", Number(e.target.value))}
              />
            </div>

            <Button
              variant="ghost"
              onClick={() => setInput(defaultLeaseInput)}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Reset form
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Year 1 operational cost</CardTitle>
            <CardDescription>Base rent + NNN, before any escalation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="$/sqft/yr" value={formatCurrency(yearOne.totalPerSqft, "USD")} />
              <Stat label="Monthly total" value={formatCurrency(yearOne.monthlyTotal, "USD")} highlight />
              <Stat label="Annual total" value={formatCurrency(yearOne.annualTotal, "USD")} />
              <Stat label="Square footage" value={formatNumber(input.squareFootage)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <div>
              <CardTitle>Rent roll</CardTitle>
              <CardDescription>Full lease term with escalation applied.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">Base $/sqft</th>
                    <th className="pb-3 pr-4">NNN $/sqft</th>
                    <th className="pb-3 pr-4">Monthly</th>
                    <th className="pb-3">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {rentRoll.map((row) => (
                    <tr key={row.year} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.year}</td>
                      <td className="py-3 pr-4 mono-nums text-muted-foreground">
                        {formatCurrency(row.baseRentPerSqft, "USD")}
                      </td>
                      <td className="py-3 pr-4 mono-nums text-muted-foreground">
                        {formatCurrency(row.nnnPerSqft, "USD")}
                      </td>
                      <td className="py-3 pr-4 mono-nums font-semibold text-primary">
                        {formatCurrency(row.monthlyTotal, "USD")}
                      </td>
                      <td className="py-3 mono-nums text-foreground">{formatCurrency(row.annualTotal, "USD")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Separator className="my-4" />
            <CopyButton getText={summaryText} label="Copy rent roll" successMessage="Rent roll copied" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg border p-3 ${highlight ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30"}`}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 mono-nums text-lg font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
