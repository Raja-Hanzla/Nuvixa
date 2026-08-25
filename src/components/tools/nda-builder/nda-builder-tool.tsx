"use client";

import * as React from "react";
import { toast } from "sonner";
import { Download, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/tools/copy-button";
import { buildNdaText, defaultNdaInput, type NdaInput, type NdaType } from "@/lib/generators/nda-builder";
import { downloadTextFile } from "@/lib/utils";

export function NdaBuilderTool() {
  const [input, setInput] = React.useState<NdaInput>(defaultNdaInput);

  function update<K extends keyof NdaInput>(key: K, value: NdaInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const ndaText = buildNdaText(input);

  function handleDownload() {
    downloadTextFile("nda-draft.txt", ndaText);
    toast.success("NDA draft downloaded");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Agreement details</CardTitle>
          <CardDescription>Fill these in to build the draft.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Tabs value={input.ndaType} onValueChange={(v) => update("ndaType", v as NdaType)}>
            <TabsList>
              <TabsTrigger value="mutual">Mutual</TabsTrigger>
              <TabsTrigger value="unilateral">Unilateral</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="nda-a">{input.ndaType === "mutual" ? "Party A" : "Disclosing party"}</Label>
              <Input
                id="nda-a"
                placeholder="Acme Corp"
                value={input.partyAName}
                onChange={(e) => update("partyAName", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nda-b">{input.ndaType === "mutual" ? "Party B" : "Receiving party"}</Label>
              <Input
                id="nda-b"
                placeholder="Beta LLC"
                value={input.partyBName}
                onChange={(e) => update("partyBName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="nda-date">Effective date</Label>
              <Input
                id="nda-date"
                type="date"
                value={input.effectiveDate}
                onChange={(e) => update("effectiveDate", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nda-term">Term (years)</Label>
              <Input
                id="nda-term"
                type="number"
                min={1}
                max={20}
                value={input.termYears}
                onChange={(e) => update("termYears", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nda-jurisdiction">Governing jurisdiction</Label>
            <Input
              id="nda-jurisdiction"
              placeholder="Delaware, USA"
              value={input.jurisdiction}
              onChange={(e) => update("jurisdiction", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nda-purpose">Purpose of disclosure</Label>
            <Textarea
              id="nda-purpose"
              rows={2}
              value={input.purpose}
              onChange={(e) => update("purpose", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Generated NDA draft</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[520px] overflow-y-auto rounded-lg border border-border bg-secondary/40 p-5">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">{ndaText}</pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <CopyButton getText={() => ndaText} successMessage="NDA draft copied" />
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download .txt
            </Button>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-spark/30 bg-spark/5 p-3.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              This is a generic starting-point template, not legal advice. Have a lawyer review
              and adapt it before using it as a binding agreement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
