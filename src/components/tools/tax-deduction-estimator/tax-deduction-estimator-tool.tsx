"use client";

import * as React from "react";
import { Plus, Trash2, RotateCcw, ShieldAlert } from "lucide-react";

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
import {
  newMileageEntry,
  newExpenseEntry,
  getMileageRate,
  calculateMileageDeduction,
  calculateExpenseDeduction,
  expenseCategoryLabels,
  expenseDeductiblePercent,
  type MileageEntry,
  type ExpenseEntry,
  type ExpenseCategory,
} from "@/lib/generators/tax-deduction";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function TaxDeductionEstimatorTool() {
  const [mileageEntries, setMileageEntries] = React.useState<MileageEntry[]>([newMileageEntry()]);
  const [expenseEntries, setExpenseEntries] = React.useState<ExpenseEntry[]>([newExpenseEntry()]);

  function updateMileage(id: string, patch: Partial<MileageEntry>) {
    setMileageEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function removeMileage(id: string) {
    setMileageEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  }
  function updateExpense(id: string, patch: Partial<ExpenseEntry>) {
    setExpenseEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function removeExpense(id: string) {
    setExpenseEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  }

  const mileageDeduction = calculateMileageDeduction(mileageEntries);
  const totalMiles = mileageEntries.reduce((sum, e) => sum + (Number(e.miles) || 0), 0);
  const expenseDeduction = calculateExpenseDeduction(expenseEntries);
  const totalExpenses = expenseEntries.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const grandTotal = mileageDeduction + expenseDeduction;

  function summaryText() {
    return [
      `Mileage: ${formatNumber(totalMiles)} miles -> ${formatCurrency(mileageDeduction, "USD")} deduction`,
      `Itemized expenses: ${formatCurrency(totalExpenses, "USD")} logged -> ${formatCurrency(expenseDeduction, "USD")} deductible`,
      `Estimated total deduction: ${formatCurrency(grandTotal, "USD")}`,
    ].join("\n");
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Stat label="Total miles logged" value={formatNumber(totalMiles)} />
        <Stat label="Mileage deduction" value={formatCurrency(mileageDeduction, "USD")} />
        <Stat label="Estimated total deduction" value={formatCurrency(grandTotal, "USD")} highlight />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mileage log</CardTitle>
            <CardDescription>The correct IRS rate is applied automatically based on each trip's date.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setMileageEntries((prev) => [...prev, newMileageEntry()])}>
            <Plus className="h-4 w-4" />
            Add trip
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
            <span className="col-span-3">Date</span>
            <span className="col-span-2">Miles</span>
            <span className="col-span-4">Purpose</span>
            <span className="col-span-3">Deduction</span>
          </div>
          {mileageEntries.map((entry) => {
            const rate = getMileageRate(entry.date);
            const entryDeduction = (Number(entry.miles) || 0) * rate;
            return (
              <div key={entry.id} className="grid grid-cols-12 items-center gap-3">
                <Input
                  type="date"
                  className="col-span-6 sm:col-span-3"
                  value={entry.date}
                  onChange={(e) => updateMileage(entry.id, { date: e.target.value })}
                />
                <Input
                  type="number"
                  min={0}
                  className="col-span-6 sm:col-span-2"
                  value={entry.miles}
                  onChange={(e) => updateMileage(entry.id, { miles: Number(e.target.value) })}
                />
                <Input
                  placeholder="Client meeting"
                  className="col-span-8 sm:col-span-4"
                  value={entry.purpose}
                  onChange={(e) => updateMileage(entry.id, { purpose: e.target.value })}
                />
                <div className="col-span-4 flex items-center justify-between gap-2 sm:col-span-3">
                  <span className="mono-nums text-sm text-foreground">{formatCurrency(entryDeduction, "USD")}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMileage(entry.id)}
                    aria-label="Remove trip"
                    disabled={mileageEntries.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <p className="col-span-12 -mt-1 pl-1 text-[11px] text-muted-foreground sm:col-span-12">
                  Rate applied: {formatCurrency(rate, "USD")}/mile
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Itemized business expenses</CardTitle>
            <CardDescription>Business meals are automatically limited to 50% deductible.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setExpenseEntries((prev) => [...prev, newExpenseEntry()])}>
            <Plus className="h-4 w-4" />
            Add expense
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenseEntries.map((entry) => {
            const deductiblePercent = expenseDeductiblePercent[entry.category];
            const entryDeduction = (Number(entry.amount) || 0) * (deductiblePercent / 100);
            return (
              <div key={entry.id} className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-12 sm:col-span-4">
                  <Select
                    value={entry.category}
                    onValueChange={(v) => updateExpense(entry.id, { category: v as ExpenseCategory })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(expenseCategoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Description"
                  className="col-span-7 sm:col-span-4"
                  value={entry.description}
                  onChange={(e) => updateExpense(entry.id, { description: e.target.value })}
                />
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  className="col-span-5 sm:col-span-2"
                  value={entry.amount}
                  onChange={(e) => updateExpense(entry.id, { amount: Number(e.target.value) })}
                />
                <div className="col-span-12 flex items-center justify-between gap-2 sm:col-span-2">
                  <span className="mono-nums text-sm text-foreground">{formatCurrency(entryDeduction, "USD")}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExpense(entry.id)}
                    aria-label="Remove expense"
                    disabled={expenseEntries.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated total deduction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Mileage deduction</span>
              <span className="mono-nums text-foreground">{formatCurrency(mileageDeduction, "USD")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Itemized expense deduction</span>
              <span className="mono-nums text-foreground">{formatCurrency(expenseDeduction, "USD")}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-display text-base font-semibold text-foreground">
              <span>Total</span>
              <span className="mono-nums">{formatCurrency(grandTotal, "USD")}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <CopyButton getText={summaryText} label="Copy summary" successMessage="Summary copied" />
            <Button
              variant="ghost"
              onClick={() => {
                setMileageEntries([newMileageEntry()]);
                setExpenseEntries([newExpenseEntry()]);
              }}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              This is an estimate for planning purposes, not tax advice. Whether a specific
              expense qualifies as deductible depends on your situation — confirm with a tax
              professional or CPA before filing.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 mono-nums text-xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
