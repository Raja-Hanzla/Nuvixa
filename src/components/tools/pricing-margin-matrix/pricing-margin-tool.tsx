"use client";

import * as React from "react";
import { RotateCcw, Tag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import { calculateRequiredPrice, defaultPricingInput, type PricingInput } from "@/lib/generators/pricing-margin";
import { formatCurrency } from "@/lib/utils";

export function PricingMarginTool() {
  const [input, setInput] = React.useState<PricingInput>(defaultPricingInput);

  function update<K extends keyof PricingInput>(key: K, value: PricingInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const result = calculateRequiredPrice(input);
  const isInvalid = result.requiredPrice === 0 && (input.targetMarginPercent + input.paymentFeePercent >= 100);

  function summaryText() {
    return [
      `Required listing price: ${formatCurrency(result.requiredPrice, "USD")}`,
      `COGS: ${formatCurrency(input.cogs, "USD")} | Ad CPA target: ${formatCurrency(input.adCpaTarget, "USD")} | Payment fees: ${formatCurrency(result.paymentFeeAmount, "USD")}`,
      `Net profit per sale: ${formatCurrency(result.netAfterAds, "USD")} (${result.actualMarginPercent.toFixed(1)}% margin)`,
    ].join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Cost inputs</CardTitle>
          <CardDescription>Solves for the price needed to hit your target margin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="pm-cogs">Cost of goods (COGS)</Label>
            <Input
              id="pm-cogs"
              type="number"
              min={0}
              step="0.01"
              value={input.cogs}
              onChange={(e) => update("cogs", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pm-margin">Target profit margin (%)</Label>
            <Input
              id="pm-margin"
              type="number"
              min={0}
              max={95}
              value={input.targetMarginPercent}
              onChange={(e) => update("targetMarginPercent", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pm-cpa">Target ad CPA (cost per sale)</Label>
            <Input
              id="pm-cpa"
              type="number"
              min={0}
              step="0.01"
              value={input.adCpaTarget}
              onChange={(e) => update("adCpaTarget", Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pm-fee-pct">Payment gateway fee (%)</Label>
              <Input
                id="pm-fee-pct"
                type="number"
                min={0}
                step="0.1"
                value={input.paymentFeePercent}
                onChange={(e) => update("paymentFeePercent", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pm-fee-fixed">Gateway fee (fixed)</Label>
              <Input
                id="pm-fee-fixed"
                type="number"
                min={0}
                step="0.01"
                value={input.paymentFeeFixed}
                onChange={(e) => update("paymentFeeFixed", Number(e.target.value))}
              />
            </div>
          </div>
          <Button variant="ghost" onClick={() => setInput(defaultPricingInput)} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" />
            Reset form
          </Button>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader className="flex flex-row items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <CardTitle>Required listing price</CardTitle>
        </CardHeader>
        <CardContent>
          {isInvalid ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              Your target margin plus payment fees exceed 100% — no price can satisfy this. Lower
              the target margin or fee percentage.
            </p>
          ) : (
            <>
              <p className="font-display text-4xl font-bold text-foreground">
                {formatCurrency(result.requiredPrice, "USD")}
              </p>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>COGS</span>
                  <span className="mono-nums text-foreground">{formatCurrency(input.cogs, "USD")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Payment fees</span>
                  <span className="mono-nums text-foreground">{formatCurrency(result.paymentFeeAmount, "USD")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Ad CPA target</span>
                  <span className="mono-nums text-foreground">{formatCurrency(input.adCpaTarget, "USD")}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-display text-base font-semibold text-foreground">
                  <span>Net profit per sale</span>
                  <span className="mono-nums text-primary">{formatCurrency(result.netAfterAds, "USD")}</span>
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  {result.actualMarginPercent.toFixed(1)}% margin after everything
                </p>
              </div>
              <div className="mt-5">
                <CopyButton getText={summaryText} label="Copy pricing breakdown" successMessage="Breakdown copied" className="w-full" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
