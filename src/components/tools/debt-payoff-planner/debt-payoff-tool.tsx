"use client";

import * as React from "react";
import { Plus, Trash2, RotateCcw, Snowflake, Mountain } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import {
  newDebt,
  defaultDebts,
  simulateSnowball,
  simulateAvalanche,
  totalMinimumPayments,
  type Debt,
} from "@/lib/generators/debt-payoff";
import { cn, formatCurrency } from "@/lib/utils";

export function DebtPayoffTool() {
  const [debts, setDebts] = React.useState<Debt[]>(defaultDebts);
  const [extraPayment, setExtraPayment] = React.useState(200);

  function updateDebt(id: string, patch: Partial<Debt>) {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }
  function removeDebt(id: string) {
    setDebts((prev) => (prev.length > 1 ? prev.filter((d) => d.id !== id) : prev));
  }

  const snowball = simulateSnowball(debts, extraPayment);
  const avalanche = simulateAvalanche(debts, extraPayment);
  const interestSaved = snowball.totalInterest - avalanche.totalInterest;

  function summaryText() {
    return [
      `Total debt: ${formatCurrency(debts.reduce((s, d) => s + d.balance, 0), "USD")}`,
      `Monthly payment: ${formatCurrency(totalMinimumPayments(debts) + extraPayment, "USD")} (minimums + ${formatCurrency(extraPayment, "USD")} extra)`,
      "",
      `Snowball: ${snowball.months} months, ${formatCurrency(snowball.totalInterest, "USD")} total interest`,
      `  Payoff order: ${snowball.payoffOrder.join(" -> ")}`,
      "",
      `Avalanche: ${avalanche.months} months, ${formatCurrency(avalanche.totalInterest, "USD")} total interest`,
      `  Payoff order: ${avalanche.payoffOrder.join(" -> ")}`,
      "",
      `Interest saved with avalanche: ${formatCurrency(interestSaved, "USD")}`,
    ].join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your debts</CardTitle>
              <CardDescription>Balances, interest rates, and minimums.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDebts((prev) => [...prev, newDebt(prev.length + 1)])}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="space-y-2 rounded-lg border border-border p-3.5">
                <div className="flex items-center gap-2">
                  <Input
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, { name: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDebt(debt.id)}
                    disabled={debts.length === 1}
                    aria-label="Remove debt"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Balance</Label>
                    <Input
                      type="number"
                      min={0}
                      value={debt.balance}
                      onChange={(e) => updateDebt(debt.id, { balance: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">APR (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      step="0.1"
                      value={debt.apr}
                      onChange={(e) => updateDebt(debt.id, { apr: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Min payment</Label>
                    <Input
                      type="number"
                      min={0}
                      value={debt.minPayment}
                      onChange={(e) => updateDebt(debt.id, { minPayment: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-1.5 pt-2">
              <Label htmlFor="dp-extra">Extra monthly payment</Label>
              <Input
                id="dp-extra"
                type="number"
                min={0}
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                On top of minimums — this is what gets thrown at your target debt each month.
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => {
                setDebts(defaultDebts);
                setExtraPayment(200);
              }}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-6">
        {(snowball.hitMaxMonths || avalanche.hitMaxMonths) && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="py-4 text-sm text-destructive">
              At this payment level, these debts won't be fully paid off within 50 years. Increase
              your extra payment to see a realistic payoff timeline.
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StrategyCard
            icon={<Snowflake className="h-4 w-4 text-sky-500" />}
            title="Snowball"
            subtitle="Smallest balance first"
            result={snowball}
          />
          <StrategyCard
            icon={<Mountain className="h-4 w-4 text-emerald-500" />}
            title="Avalanche"
            subtitle="Highest interest rate first"
            result={avalanche}
            highlight
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Which saves more?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Avalanche saves you{" "}
              <span className={cn("font-semibold", interestSaved > 0 ? "text-success" : "text-foreground")}>
                {formatCurrency(Math.abs(interestSaved), "USD")}
              </span>{" "}
              in interest compared to snowball
              {interestSaved <= 0 && " (in this case, they're essentially equivalent)"}. Snowball
              can still be worth it if the psychological win of clearing small balances first
              keeps you motivated to stick with the plan.
            </p>
            <Separator className="my-4" />
            <CopyButton getText={summaryText} label="Copy full comparison" successMessage="Comparison copied" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StrategyCard({
  icon,
  title,
  subtitle,
  result,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  result: { months: number; totalInterest: number; payoffOrder: string[] };
  highlight?: boolean;
}) {
  return (
    <Card className={cn(highlight && "border-primary/30")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Debt-free in</p>
          <p className="font-display text-2xl font-bold text-foreground">
            {result.months} <span className="text-base font-normal text-muted-foreground">months</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total interest paid</p>
          <p className="mono-nums text-lg font-semibold text-foreground">
            {formatCurrency(result.totalInterest, "USD")}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Payoff order</p>
          <p className="text-sm text-foreground">{result.payoffOrder.join(" → ")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
