"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  defaultOooForm,
  generateOoo,
  oooReasonLabels,
  oooToneLabels,
  type OooFormState,
  type OooReason,
  type OooTone,
} from "@/lib/generators/ooo";

export function OooGeneratorTool() {
  const [form, setForm] = React.useState<OooFormState>(defaultOooForm);

  function update<K extends keyof OooFormState>(key: K, value: OooFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const message = generateOoo(form);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your details</CardTitle>
          <CardDescription>Fill this in — your message updates as you type.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ooo-name">Your name</Label>
              <Input
                id="ooo-name"
                placeholder="Jordan Lee"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ooo-role">Role (optional)</Label>
              <Input
                id="ooo-role"
                placeholder="Marketing Manager"
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ooo-reason">Reason for being away</Label>
              <Select value={form.reason} onValueChange={(v) => update("reason", v as OooReason)}>
                <SelectTrigger id="ooo-reason">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(oooReasonLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ooo-tone">Tone</Label>
              <Select value={form.tone} onValueChange={(v) => update("tone", v as OooTone)}>
                <SelectTrigger id="ooo-tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(oooToneLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ooo-start">First day away</Label>
              <Input
                id="ooo-start"
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ooo-end">Back in office</Label>
              <Input
                id="ooo-end"
                type="date"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ooo-backup-name">Backup contact (optional)</Label>
              <Input
                id="ooo-backup-name"
                placeholder="Sam Rivera"
                value={form.backupName}
                onChange={(e) => update("backupName", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ooo-backup-email">Backup email (optional)</Label>
              <Input
                id="ooo-backup-email"
                type="email"
                placeholder="sam@company.com"
                value={form.backupEmail}
                onChange={(e) => update("backupEmail", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ooo-note">Extra note (optional)</Label>
            <Textarea
              id="ooo-note"
              placeholder="e.g. I'll have limited access to Slack during this time."
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              rows={3}
            />
          </div>

          <Button
            variant="ghost"
            onClick={() => setForm(defaultOooForm)}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset form
          </Button>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Ready to paste into your email client's auto-reply.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-secondary/40 p-5">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {message}
            </pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <CopyButton
              getText={() => message}
              successMessage="Out-of-office message copied"
              variant="default"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
