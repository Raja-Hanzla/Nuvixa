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
  buildPrivacyPolicyText,
  defaultPrivacyPolicyInput,
  toggleOptions,
  type PrivacyPolicyInput,
} from "@/lib/generators/privacy-policy-builder";
import { downloadTextFile } from "@/lib/utils";

export function PrivacyPolicyGeneratorTool() {
  const [input, setInput] = React.useState<PrivacyPolicyInput>(defaultPrivacyPolicyInput);

  function update<K extends keyof PrivacyPolicyInput>(key: K, value: PrivacyPolicyInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const policyText = buildPrivacyPolicyText(input);

  function handleDownload() {
    const filename = `${(input.companyName || "company").toLowerCase().replace(/\s+/g, "-")}-privacy-policy.txt`;
    downloadTextFile(filename, policyText);
    toast.success("Privacy policy downloaded");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>About your site</CardTitle>
          <CardDescription>Fill in the basics, then toggle what applies to you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pp-name">Company or website name</Label>
              <Input
                id="pp-name"
                placeholder="Acme Corp"
                value={input.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pp-url">Website URL</Label>
              <Input
                id="pp-url"
                placeholder="acmecorp.com"
                value={input.url}
                onChange={(e) => update("url", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pp-email">Contact email</Label>
            <Input
              id="pp-email"
              type="email"
              placeholder="hello@acmecorp.com"
              value={input.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="space-y-3 pt-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              What does your site do?
            </Label>
            {toggleOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between gap-4 rounded-lg border border-border p-3.5"
              >
                <div>
                  <Label htmlFor={`pp-${option.key}`} className="text-sm font-medium text-foreground">
                    {option.label}
                  </Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{option.hint}</p>
                </div>
                <Switch
                  id={`pp-${option.key}`}
                  checked={input[option.key]}
                  onCheckedChange={(v) => update(option.key, v)}
                  className="shrink-0"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Generated policy</CardTitle>
          <CardDescription>Updates instantly as you fill in the form.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[520px] overflow-y-auto rounded-lg border border-border bg-secondary/40 p-5">
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
              This is a generic starting-point template, not legal advice. Have a lawyer review it
              before publishing — especially if GDPR, CCPA, or other specific regulations apply to
              your business.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
