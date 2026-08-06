"use client";

import * as React from "react";
import { toast } from "sonner";
import { Download, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  frameworkBaselines,
  frameworkOrder,
  combinePolicies,
  buildPolicyText,
  type ComplianceFramework,
} from "@/lib/generators/password-policy";
import { downloadTextFile } from "@/lib/utils";

export function PasswordPolicyBuilderTool() {
  const [companyName, setCompanyName] = React.useState("");
  const [selected, setSelected] = React.useState<ComplianceFramework[]>(["soc2", "iso27001"]);

  function toggle(key: ComplianceFramework, checked: boolean) {
    setSelected((prev) => (checked ? [...prev, key] : prev.filter((f) => f !== key)));
  }

  const policy = combinePolicies(selected);
  const policyText = policy ? buildPolicyText(policy, companyName) : "";

  function handleDownload() {
    if (!policy) {
      toast.error("Select at least one framework first.");
      return;
    }
    downloadTextFile(`${(companyName || "company").toLowerCase().replace(/\s+/g, "-")}-password-policy.txt`, policyText);
    toast.success("Policy downloaded");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Applicable standards</CardTitle>
          <CardDescription>Select every framework your organization needs to satisfy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="pp-company">Company name (optional)</Label>
            <Input
              id="pp-company"
              placeholder="Acme Corp"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {frameworkOrder.map((key) => {
              const framework = frameworkBaselines[key];
              const checked = selected.includes(key);
              return (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
                >
                  <div>
                    <Label htmlFor={`pp-${key}`} className="text-sm font-semibold text-foreground">
                      {framework.label}
                    </Label>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{framework.note}</p>
                  </div>
                  <Switch
                    id={`pp-${key}`}
                    checked={checked}
                    onCheckedChange={(v) => toggle(key, v)}
                    className="mt-1 shrink-0"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Generated policy</CardTitle>
          <CardDescription>
            The strictest requirement across your selected standards, combined into one policy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!policy ? (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-8 text-center text-sm text-muted-foreground">
              Select at least one framework to generate a policy.
            </p>
          ) : (
            <>
              <div className="rounded-lg border border-border bg-secondary/40 p-5">
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
                  {policyText}
                </pre>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton getText={() => policyText} successMessage="Policy copied" />
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download .txt
                </Button>
              </div>
              <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3.5">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  This is a starting-point draft based on common industry baselines, not a certified
                  or legally-reviewed policy. Have your compliance officer, security lead, or auditor
                  review it before adopting it as official.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
