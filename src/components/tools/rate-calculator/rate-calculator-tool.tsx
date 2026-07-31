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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies, currencySymbol } from "@/lib/generators/invoice";
import { calculateRate, defaultRateForm, type RateFormState } from "@/lib/generators/rate-calculator";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function RateCalculatorTool() {
  const [form, setForm] = React.useState<RateFormState>(defaultRateForm);

  function update<K extends keyof RateFormState>(key: K, value: RateFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const results = calculateRate(form);
  const symbol = currencySymbol(form.currency);

  function proposalText() {
    const lines = [
      form.projectName ? `Project: ${form.projectName}` : "Project estimate",
      form.clientName ? `Prepared for: ${form.clientName}` : "",
      "",
      `Estimated hours: ${formatNumber(form.projectHours)}`,
      `Rate: ${formatCurrency(results.hourlyRate, form.currency)} / hour`,
      `Estimated project total: ${formatCurrency(results.projectQuote, form.currency)}`,
      "",
      `This estimate is based on ${formatNumber(form.projectHours)} hours of work at an hourly rate of ${formatCurrency(results.hourlyRate, form.currency)}. Final cost may vary if project scope changes.`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Income &amp; time</CardTitle>
            <CardDescription>Set your income goal and how much you actually work.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="rate-currency">Currency</Label>
              <Select value={form.currency} onValueChange={(v) => update("currency", v)}>
                <SelectTrigger id="rate-currency" className="sm:w-64">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rate-income">Target annual income</Label>
                <Input
                  id="rate-income"
                  type="number"
                  min={0}
                  value={form.desiredAnnualIncome}
                  onChange={(e) => update("desiredAnnualIncome", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rate-expenses">Annual business expenses</Label>
                <Input
                  id="rate-expenses"
                  type="number"
                  min={0}
                  value={form.annualExpenses}
                  onChange={(e) => update("annualExpenses", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rate-weeks">Working weeks / year</Label>
                <Input
                  id="rate-weeks"
                  type="number"
                  min={1}
                  max={52}
                  value={form.workWeeksPerYear}
                  onChange={(e) => update("workWeeksPerYear", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rate-hours">Hours / week</Label>
                <Input
                  id="rate-hours"
                  type="number"
                  min={1}
                  max={100}
                  value={form.hoursPerWeek}
                  onChange={(e) => update("hoursPerWeek", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rate-billable">Billable hours (%)</Label>
                <Input
                  id="rate-billable"
                  type="number"
                  min={1}
                  max={100}
                  value={form.billablePercentage}
                  onChange={(e) => update("billablePercentage", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rate-margin">Profit margin (%)</Label>
                <Input
                  id="rate-margin"
                  type="number"
                  min={0}
                  max={200}
                  value={form.profitMargin}
                  onChange={(e) => update("profitMargin", Number(e.target.value))}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => setForm(defaultRateForm)}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Reset form
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project quote</CardTitle>
            <CardDescription>Turn your rate into an estimate for a specific project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rate-project-name">Project name (optional)</Label>
                <Input
                  id="rate-project-name"
                  placeholder="Website redesign"
                  value={form.projectName}
                  onChange={(e) => update("projectName", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rate-client">Client name (optional)</Label>
                <Input
                  id="rate-client"
                  placeholder="Acme Corp"
                  value={form.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rate-project-hours">Estimated project hours</Label>
              <Input
                id="rate-project-hours"
                type="number"
                min={0}
                value={form.projectHours}
                onChange={(e) => update("projectHours", Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader>
            <CardTitle>Your rates</CardTitle>
            <CardDescription>Based on {formatNumber(results.billableHours)} billable hours a year.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <RateStat label="Hourly rate" value={formatCurrency(results.hourlyRate, form.currency)} highlight />
              <RateStat
                label={`Day rate (${formatNumber(results.hoursPerDay, 1)}h)`}
                value={formatCurrency(results.dayRate, form.currency)}
              />
              <RateStat label="Weekly rate" value={formatCurrency(results.weeklyRate, form.currency)} />
            </div>

            <Separator className="my-5" />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Total working hours / year</dt>
                <dd className="mono-nums text-foreground">{formatNumber(results.totalWorkingHours)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Billable hours / year</dt>
                <dd className="mono-nums text-foreground">{formatNumber(results.billableHours)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Income + expenses</dt>
                <dd className="mono-nums text-foreground">
                  {formatCurrency(results.baseIncomeNeeded, form.currency)}
                </dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>With profit margin</dt>
                <dd className="mono-nums text-foreground">
                  {formatCurrency(results.incomeWithMargin, form.currency)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimated project total</CardTitle>
            <CardDescription>
              {formatNumber(form.projectHours)} hours at {formatCurrency(results.hourlyRate, form.currency)}/hr
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-bold text-foreground">
              {formatCurrency(results.projectQuote, form.currency)}
            </p>
            <div className="mt-4">
              <CopyButton getText={proposalText} label="Copy proposal text" successMessage="Proposal text copied" className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RateStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg border p-4 ${highlight ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30"}`}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={`mt-1 font-display text-xl font-bold mono-nums ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}
