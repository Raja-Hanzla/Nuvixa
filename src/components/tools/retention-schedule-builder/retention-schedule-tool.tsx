"use client";

import * as React from "react";
import { toast } from "sonner";
import { Download, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";
import { Button } from "@/components/ui/button";
import {
  dataCategoryDefaults,
  newRetentionRow,
  buildRetentionScheduleText,
  type RetentionRow,
  type DataCategoryKey,
} from "@/lib/generators/retention-schedule";
import { downloadTextFile } from "@/lib/utils";

export function RetentionScheduleTool() {
  const [companyName, setCompanyName] = React.useState("");
  const [selected, setSelected] = React.useState<Set<DataCategoryKey>>(
    new Set(["account_info", "email", "ip_address", "payment_logs"])
  );
  const [overrides, setOverrides] = React.useState<Record<string, RetentionRow>>({});

  function toggle(key: DataCategoryKey, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(key);
      else next.delete(key);
      return next;
    });
  }

  function updateRow(key: DataCategoryKey, patch: Partial<RetentionRow>) {
    setOverrides((prev) => {
      const base = prev[key] ?? newRetentionRow(dataCategoryDefaults.find((d) => d.key === key)!);
      return { ...prev, [key]: { ...base, ...patch } };
    });
  }

  const rows: RetentionRow[] = dataCategoryDefaults
    .filter((d) => selected.has(d.key))
    .map((d) => overrides[d.key] ?? newRetentionRow(d));

  const scheduleText = buildRetentionScheduleText(companyName, rows);

  function handleDownload() {
    downloadTextFile("data-retention-schedule.txt", scheduleText);
    toast.success("Retention schedule downloaded");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>What data do you collect?</CardTitle>
          <CardDescription>Toggle categories on, then adjust retention details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="rs-company">Company name</Label>
            <Input
              id="rs-company"
              placeholder="Acme Corp"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {dataCategoryDefaults.map((cat) => {
              const isOn = selected.has(cat.key);
              const row = overrides[cat.key] ?? newRetentionRow(cat);
              return (
                <div key={cat.key} className="rounded-lg border border-border p-3.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`rs-${cat.key}`} className="text-sm font-medium text-foreground">
                      {cat.label}
                    </Label>
                    <Switch id={`rs-${cat.key}`} checked={isOn} onCheckedChange={(v) => toggle(cat.key, v)} />
                  </div>
                  {isOn && (
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <Input
                        placeholder="Retention period"
                        value={row.retention}
                        onChange={(e) => updateRow(cat.key, { retention: e.target.value })}
                      />
                      <Input
                        placeholder="Legal basis"
                        value={row.legalBasis}
                        onChange={(e) => updateRow(cat.key, { legalBasis: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Generated retention schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-8 text-center text-sm text-muted-foreground">
              Toggle on at least one data category to generate a schedule.
            </p>
          ) : (
            <>
              <div className="max-h-[420px] overflow-auto rounded-lg border border-border bg-secondary/40 p-4">
                <pre className="whitespace-pre font-mono text-[11px] leading-relaxed text-foreground">
                  {scheduleText}
                </pre>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton getText={() => scheduleText} successMessage="Retention schedule copied" />
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download .txt
                </Button>
              </div>
            </>
          )}
          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              This is a generic starting-point template, not legal advice. Actual retention
              periods should reflect your specific legal obligations and jurisdiction — have a
              lawyer or privacy officer review before adopting.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
