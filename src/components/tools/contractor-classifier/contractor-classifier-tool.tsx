"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import {
  classificationFactors,
  factorCategoryLabels,
  evaluateClassification,
  type FactorCategory,
} from "@/lib/generators/contractor-classifier";
import { cn } from "@/lib/utils";

const riskBandStyles = {
  Low: "text-success border-success/30 bg-success/5",
  Moderate: "text-spark border-spark/30 bg-spark/5",
  High: "text-orange-500 border-orange-500/30 bg-orange-500/5",
  "Very High": "text-destructive border-destructive/30 bg-destructive/5",
};

const riskBandCopy = {
  Low: "This pattern looks broadly consistent with independent contractor status.",
  Moderate: "Some factors lean employee-like. Worth a closer review before finalizing classification.",
  High: "Many factors suggest an employment relationship. Misclassification risk is meaningful here.",
  "Very High": "This pattern strongly resembles an employment relationship, regardless of what any contract says.",
};

const categories: FactorCategory[] = ["behavioral", "financial", "relationship"];

export function ContractorClassifierTool() {
  const [checked, setChecked] = React.useState<Set<string>>(new Set());

  function toggle(id: string, value: boolean) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const result = evaluateClassification(checked);

  function summaryText() {
    const lines = [
      `Misclassification risk: ${result.riskBand} (${result.checkedCount}/${result.totalCount} employee-like factors, ${result.riskPercent.toFixed(0)}%)`,
      "",
      "Category breakdown:",
      ...categories.map(
        (cat) =>
          `  ${factorCategoryLabels[cat]}: ${result.categoryBreakdown[cat].checked}/${result.categoryBreakdown[cat].total}`
      ),
      "",
      "Checked factors:",
      ...classificationFactors.filter((f) => checked.has(f.id)).map((f) => `  - ${f.label}`),
    ];
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        {categories.map((cat) => (
          <Card key={cat}>
            <CardHeader>
              <CardTitle className="text-base">{factorCategoryLabels[cat]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {classificationFactors
                .filter((f) => f.category === cat)
                .map((factor) => (
                  <div key={factor.id} className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
                    <Label htmlFor={factor.id} className="text-sm font-normal text-foreground">
                      {factor.label}
                    </Label>
                    <Switch
                      id={factor.id}
                      checked={checked.has(factor.id)}
                      onCheckedChange={(v) => toggle(factor.id, v)}
                    />
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader>
            <CardTitle>Misclassification risk</CardTitle>
            <CardDescription>Based on {result.checkedCount} of {result.totalCount} employee-like factors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn("rounded-lg border p-5 text-center", riskBandStyles[result.riskBand])}>
              <p className="font-display text-3xl font-bold">{result.riskBand}</p>
              <p className="mt-1 font-mono text-sm">{result.riskPercent.toFixed(0)}%</p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{riskBandCopy[result.riskBand]}</p>

            <Separator className="my-4" />

            <div className="space-y-2">
              {categories.map((cat) => {
                const b = result.categoryBreakdown[cat];
                return (
                  <div key={cat} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{factorCategoryLabels[cat]}</span>
                    <span className="mono-nums font-semibold text-foreground">
                      {b.checked}/{b.total}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <CopyButton getText={summaryText} label="Copy breakdown" successMessage="Breakdown copied" className="w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            This reflects common IRS common-law factors and is not a legal determination. Some
            states (California among them) apply a stricter "ABC test" where even minor company
            control over the work can make a worker an employee, regardless of other factors.
            Consult an employment lawyer for an actual classification decision.
          </p>
        </div>
      </div>
    </div>
  );
}
