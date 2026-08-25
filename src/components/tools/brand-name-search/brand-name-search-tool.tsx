"use client";

import * as React from "react";
import { Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/tools/copy-button";
import {
  generatePhoneticVariants,
  generateLookalikeVariants,
  generateWildcardTerms,
} from "@/lib/generators/brand-name-search";

export function BrandNameSearchTool() {
  const [name, setName] = React.useState("Nuvixa");

  const phonetic = generatePhoneticVariants(name);
  const lookalikes = generateLookalikeVariants(name);
  const wildcards = generateWildcardTerms(name);

  function allTermsText() {
    return [
      `Brand name: ${name}`,
      "",
      "Phonetic variants:",
      ...phonetic.map((v) => `  ${v.value} (${v.label})`),
      "",
      "Lookalike / character-swap variants:",
      ...lookalikes.map((v) => `  ${v.value} (${v.label})`),
      "",
      "Wildcard search terms:",
      ...wildcards.map((w) => `  ${w.value} (${w.label})`),
    ].join("\n");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Proposed brand name</CardTitle>
          <CardDescription>Generates variants to check across trademark databases.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="bn-name">Brand name</Label>
            <Input id="bn-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kwikstart" />
          </div>
          <CopyButton getText={allTermsText} label="Copy all variants" successMessage="All search terms copied" disabled={!name.trim()} />
        </CardContent>
      </Card>

      {name.trim() && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Phonetic variants</CardTitle>
              <CardDescription>Names that sound similar when spoken.</CardDescription>
            </CardHeader>
            <CardContent>
              {phonetic.length === 0 ? (
                <p className="text-sm text-muted-foreground">No common substitutions apply to this name.</p>
              ) : (
                <ul className="space-y-2">
                  {phonetic.map((v) => (
                    <li key={v.label} className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5">
                      <span className="font-mono text-sm text-foreground">{v.value}</span>
                      <Badge variant="secondary" className="shrink-0 text-[10px]">{v.label}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lookalike variants</CardTitle>
              <CardDescription>Character swaps and typo-adjacent spellings.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lookalikes.map((v) => (
                  <li key={v.label} className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5">
                    <span className="font-mono text-sm text-foreground">{v.value}</span>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">{v.label}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Wildcard search terms</CardTitle>
              <CardDescription>Generic wildcard convention — see note below.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {wildcards.map((w) => (
                  <li key={w.label} className="rounded-lg border border-border p-2.5">
                    <p className="font-mono text-sm text-foreground">{w.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{w.label}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          These use the widely-recognized "*" wildcard convention, but exact search syntax varies
          by database. USPTO retired its old TESS system in 2023 in favor of a newer, regex-based
          trademark search tool — check that system's own search help before relying on exact
          syntax. This tool doesn't perform searches or check availability itself; use these terms
          as a starting point in the actual databases (USPTO, WIPO Global Brand Database, etc.),
          and consult a trademark attorney before filing.
        </p>
      </div>
    </div>
  );
}
