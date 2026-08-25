"use client";

import * as React from "react";
import { Plus, Trash2, RotateCcw, TrendingDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import {
  simulateCapTable,
  newSafeRound,
  newPricedRound,
  FOUNDERS_LABEL,
  type RoundInput,
  type SafeRoundInput,
  type PricedRoundInput,
} from "@/lib/generators/cap-table-simulator";

export function CapTableSimulatorTool() {
  const [rounds, setRounds] = React.useState<RoundInput[]>([newSafeRound(1), newPricedRound(1)]);

  function addSafe() {
    setRounds((prev) => [...prev, newSafeRound(prev.filter((r) => r.type === "safe").length + 1)]);
  }
  function addPriced() {
    setRounds((prev) => [...prev, newPricedRound(prev.filter((r) => r.type === "priced").length + 1)]);
  }
  function removeRound(id: string) {
    setRounds((prev) => prev.filter((r) => r.id !== id));
  }
  function updateRound(id: string, patch: Partial<SafeRoundInput> | Partial<PricedRoundInput>) {
    setRounds((prev) => prev.map((r) => (r.id === id ? ({ ...r, ...patch } as RoundInput) : r)));
  }

  const snapshots = simulateCapTable(rounds);
  const finalSnapshot = snapshots[snapshots.length - 1];
  const finalTable = finalSnapshot?.stakeholders ?? [{ name: FOUNDERS_LABEL, percent: 100 }];
  const founderStart = 100;
  const founderEnd = finalSnapshot?.founderPercent ?? 100;

  function summaryText() {
    const lines = [
      `Founder ownership: ${founderStart}% -> ${founderEnd.toFixed(2)}%`,
      "",
      "Round by round:",
      ...snapshots.map(
        (s) =>
          `  ${s.roundLabel} (${s.roundType === "safe" ? "SAFE" : "Priced"}) — investor got ${s.investorPercentThisRound.toFixed(2)}%${s.poolAddedThisRound > 0 ? `, pool +${s.poolAddedThisRound}%` : ""} — founders now ${s.founderPercent.toFixed(2)}%`
      ),
      "",
      "Final cap table:",
      ...finalTable.map((s) => `  ${s.name}: ${s.percent.toFixed(2)}%`),
    ];
    return lines.join("\n");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Button onClick={addSafe} variant="outline">
          <Plus className="h-4 w-4" />
          Add SAFE / Note
        </Button>
        <Button onClick={addPriced} variant="outline">
          <Plus className="h-4 w-4" />
          Add priced round
        </Button>
        <Button
          variant="ghost"
          onClick={() => setRounds([newSafeRound(1), newPricedRound(1)])}
          className="text-muted-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          {rounds.length === 0 && (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                Add a SAFE or priced round to start simulating dilution.
              </CardContent>
            </Card>
          )}

          {rounds.map((round, i) => (
            <Card key={round.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={round.type === "safe" ? "outline" : "default"}>
                    {round.type === "safe" ? "SAFE / Note" : "Priced round"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Round {i + 1}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeRound(round.id)} aria-label="Remove round">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Label</Label>
                  <Input
                    value={round.label}
                    onChange={(e) => updateRound(round.id, { label: e.target.value })}
                  />
                </div>

                {round.type === "safe" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>Amount raised</Label>
                      <Input
                        type="number"
                        min={0}
                        value={round.amount}
                        onChange={(e) => updateRound(round.id, { amount: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Valuation cap</Label>
                      <Input
                        type="number"
                        min={0}
                        value={round.cap}
                        onChange={(e) => updateRound(round.id, { cap: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Discount (%)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={round.discount}
                        onChange={(e) => updateRound(round.id, { discount: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>Amount raised</Label>
                      <Input
                        type="number"
                        min={0}
                        value={round.amount}
                        onChange={(e) => updateRound(round.id, { amount: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Pre-money valuation</Label>
                      <Input
                        type="number"
                        min={0}
                        value={round.preMoney}
                        onChange={(e) => updateRound(round.id, { preMoney: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Option pool top-up (%)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={round.poolTopUpPercent}
                        onChange={(e) => updateRound(round.id, { poolTopUpPercent: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Founder ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Started at</p>
                  <p className="font-display text-2xl font-bold text-muted-foreground">{founderStart}%</p>
                </div>
                <TrendingDown className="h-5 w-5 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Now</p>
                  <p className="font-display text-2xl font-bold text-primary">{founderEnd.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final cap table</CardTitle>
              <CardDescription>After all rounds above.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {finalTable
                  .slice()
                  .sort((a, b) => b.percent - a.percent)
                  .map((s) => (
                    <li key={s.name} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{s.name}</span>
                      <span className="mono-nums font-semibold text-foreground">{s.percent.toFixed(2)}%</span>
                    </li>
                  ))}
              </ul>
              <Separator className="my-4" />
              <CopyButton getText={summaryText} label="Copy full simulation" successMessage="Cap table summary copied" className="w-full" />
            </CardContent>
          </Card>

          <p className="text-xs leading-relaxed text-muted-foreground">
            This is a simplified model for directional understanding — SAFEs are modeled as
            converting immediately at their cap, not deferred to a later priced round. Use real
            cap table software (like Carta or Pulley) and a startup lawyer for anything you're
            actually signing.
          </p>
        </div>
      </div>
    </div>
  );
}
