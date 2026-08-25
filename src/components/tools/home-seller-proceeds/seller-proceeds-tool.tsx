"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import {
  calculateSellerProceeds,
  defaultSellerProceedsInput,
  type SellerProceedsInput,
} from "@/lib/generators/seller-proceeds";
import { formatCurrency } from "@/lib/utils";

export function SellerProceedsTool() {
  const [input, setInput] = React.useState<SellerProceedsInput>(defaultSellerProceedsInput);

  function update<K extends keyof SellerProceedsInput>(key: K, value: SellerProceedsInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const result = calculateSellerProceeds(input);

  function summaryText() {
    const lines = [
      `Sale price: ${formatCurrency(input.salePrice, "USD")}`,
      "",
      ...result.deductions.map((d) => `-  ${d.label}: ${formatCurrency(d.amount, "USD")}`),
      "",
      `Total deductions: ${formatCurrency(result.totalDeductions, "USD")}`,
      `Net proceeds: ${formatCurrency(result.netProceeds, "USD")}`,
    ];
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sale details</CardTitle>
          <CardDescription>Enter your expected sale price and costs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="sp-price">Sale price</Label>
            <Input
              id="sp-price"
              type="number"
              min={0}
              value={input.salePrice}
              onChange={(e) => update("salePrice", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-mortgage">Remaining mortgage payoff</Label>
            <Input
              id="sp-mortgage"
              type="number"
              min={0}
              value={input.mortgagePayoff}
              onChange={(e) => update("mortgagePayoff", Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="sp-commission">Agent commission (%)</Label>
              <Input
                id="sp-commission"
                type="number"
                min={0}
                step="0.1"
                value={input.agentCommissionPercent}
                onChange={(e) => update("agentCommissionPercent", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-transfer">Transfer tax (%)</Label>
              <Input
                id="sp-transfer"
                type="number"
                min={0}
                step="0.01"
                value={input.transferTaxPercent}
                onChange={(e) => update("transferTaxPercent", Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-title">Title & escrow fees</Label>
            <Input
              id="sp-title"
              type="number"
              min={0}
              value={input.titleAndEscrowFees}
              onChange={(e) => update("titleAndEscrowFees", Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="sp-concessions">Seller concessions</Label>
              <Input
                id="sp-concessions"
                type="number"
                min={0}
                value={input.sellerConcessions}
                onChange={(e) => update("sellerConcessions", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-repairs">Repair credits</Label>
              <Input
                id="sp-repairs"
                type="number"
                min={0}
                value={input.repairCredits}
                onChange={(e) => update("repairCredits", Number(e.target.value))}
              />
            </div>
          </div>
          <Button variant="ghost" onClick={() => setInput(defaultSellerProceedsInput)} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" />
            Reset form
          </Button>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Net proceeds summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between font-medium text-foreground">
              <span>Sale price</span>
              <span className="mono-nums">{formatCurrency(input.salePrice, "USD")}</span>
            </div>
            <Separator className="my-2" />
            {result.deductions.map((d) => (
              <div key={d.label} className="flex justify-between text-muted-foreground">
                <span>{d.label}</span>
                <span className="mono-nums">-{formatCurrency(d.amount, "USD")}</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between font-display text-lg font-bold text-foreground">
              <span>Net proceeds</span>
              <span className="mono-nums text-primary">{formatCurrency(result.netProceeds, "USD")}</span>
            </div>
          </div>
          <div className="mt-5">
            <CopyButton getText={summaryText} label="Copy summary sheet" successMessage="Summary copied" className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
