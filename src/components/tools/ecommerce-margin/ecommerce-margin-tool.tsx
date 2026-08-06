"use client";

import * as React from "react";
import { RotateCcw, TrendingUp, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  buildMarginMatrix,
  calculateUnitEconomics,
  defaultMarginInput,
  type MarginInput,
} from "@/lib/generators/ecommerce-margin";
import { cn, formatCurrency } from "@/lib/utils";

export function EcommerceMarginTool() {
  const [input, setInput] = React.useState<MarginInput>(defaultMarginInput);
  const [currency, setCurrency] = React.useState("USD");

  function update<K extends keyof MarginInput>(key: K, value: MarginInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const economics = calculateUnitEconomics(input);
  const matrix = buildMarginMatrix(input);
  const symbol = currencySymbol(currency);
  const isUnderwater = economics.grossProfitPerUnit <= 0;

  function summaryText() {
    const lines = [
      `Sales price: ${formatCurrency(input.salesPrice, currency)}`,
      `Total cost per unit (COGS + shipping + packaging + payment fees): ${formatCurrency(economics.totalCostPerUnit, currency)}`,
      `Gross profit per unit (before ad spend): ${formatCurrency(economics.grossProfitPerUnit, currency)} (${economics.grossMarginPercent.toFixed(1)}%)`,
      "",
      "Profit margin matrix:",
      ...matrix.map((row) =>
        row.achievable
          ? `  ${row.targetMarginPercent}% margin target — max ad spend/CPA: ${formatCurrency(row.maxAdSpendPerSale, currency)}, required ROAS: ${row.requiredRoas!.toFixed(2)}x`
          : `  ${row.targetMarginPercent}% margin target — not achievable at this price`
      ),
    ];
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Unit economics</CardTitle>
            <CardDescription>Enter your per-unit costs and price.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="em-currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="em-currency">
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

            <div className="space-y-1.5">
              <Label htmlFor="em-price">Sales price ({symbol})</Label>
              <Input
                id="em-price"
                type="number"
                min={0}
                step="0.01"
                value={input.salesPrice}
                onChange={(e) => update("salesPrice", Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="em-cogs">Manufacturing cost / COGS</Label>
                <Input
                  id="em-cogs"
                  type="number"
                  min={0}
                  step="0.01"
                  value={input.cogs}
                  onChange={(e) => update("cogs", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="em-shipping">Shipping cost</Label>
                <Input
                  id="em-shipping"
                  type="number"
                  min={0}
                  step="0.01"
                  value={input.shippingCost}
                  onChange={(e) => update("shippingCost", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="em-packaging">Packaging cost</Label>
                <Input
                  id="em-packaging"
                  type="number"
                  min={0}
                  step="0.01"
                  value={input.packagingCost}
                  onChange={(e) => update("packagingCost", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="em-fee-fixed">Payment fee (fixed)</Label>
                <Input
                  id="em-fee-fixed"
                  type="number"
                  min={0}
                  step="0.01"
                  value={input.paymentFeeFixed}
                  onChange={(e) => update("paymentFeeFixed", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="em-fee-percent">Payment processing fee (%)</Label>
              <Input
                id="em-fee-percent"
                type="number"
                min={0}
                step="0.1"
                value={input.paymentFeePercent}
                onChange={(e) => update("paymentFeePercent", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Typical card processors charge around 2.9% + {symbol}0.30 per transaction.
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => setInput(defaultMarginInput)}
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
            <CardTitle>Gross profit before ad spend</CardTitle>
            <CardDescription>What's left after product, shipping, and payment costs.</CardDescription>
          </CardHeader>
          <CardContent>
            {isUnderwater ? (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <p className="text-sm leading-relaxed text-foreground">
                  Your costs already exceed your sales price before spending a cent on ads. Raise
                  your price or cut costs before running paid traffic to this product.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat label="Total cost / unit" value={formatCurrency(economics.totalCostPerUnit, currency)} />
                <Stat label="Payment fees / unit" value={formatCurrency(economics.paymentFeeAmount, currency)} />
                <Stat
                  label="Gross profit / unit"
                  value={formatCurrency(economics.grossProfitPerUnit, currency)}
                  highlight
                />
                <Stat label="Gross margin" value={`${economics.grossMarginPercent.toFixed(1)}%`} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <CardTitle>Profit margin matrix</CardTitle>
              <CardDescription>Max ad spend and required ROAS at each margin target.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pr-4">Margin target</th>
                    <th className="pb-3 pr-4">Max ad spend (CPA)</th>
                    <th className="pb-3">Required ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.targetMarginPercent} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">
                        {row.targetMarginPercent === 0 ? "Break-even" : `${row.targetMarginPercent}% profit`}
                      </td>
                      <td className="py-3 pr-4 mono-nums text-foreground">
                        {row.achievable ? formatCurrency(row.maxAdSpendPerSale, currency) : "—"}
                      </td>
                      <td
                        className={cn(
                          "py-3 mono-nums font-semibold",
                          row.achievable ? "text-primary" : "text-destructive"
                        )}
                      >
                        {row.achievable ? `${row.requiredRoas!.toFixed(2)}x` : "Not achievable"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Separator className="my-4" />
            <CopyButton getText={summaryText} label="Copy matrix summary" successMessage="Summary copied" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn("rounded-lg border p-3", highlight ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30")}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("mt-1 mono-nums text-lg font-bold", highlight ? "text-primary" : "text-foreground")}>
        {value}
      </p>
    </div>
  );
}
