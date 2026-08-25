"use client";

import * as React from "react";
import { RotateCcw, KeyRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/tools/copy-button";
import {
  detectType,
  decodeJwt,
  decodeSaml,
  formatClaimTimestamp,
  sampleJwt,
} from "@/lib/generators/token-decoder";

export function TokenDecoderTool() {
  const [input, setInput] = React.useState(sampleJwt);

  const type = detectType(input);
  const jwtResult = type === "jwt" ? decodeJwt(input) : null;
  const samlResult = type === "saml" ? decodeSaml(input) : null;

  const claimTimestamps = jwtResult
    ? (["iat", "exp", "nbf"] as const)
        .map((key) => ({ key, formatted: formatClaimTimestamp(jwtResult.payloadClaims[key]) }))
        .filter((c) => c.formatted !== null)
    : [];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Paste a token or assertion</CardTitle>
            <CardDescription>JWT or base64-encoded SAML XML — auto-detected.</CardDescription>
          </div>
          {type !== "unknown" && <Badge>{type === "jwt" ? "JWT" : "SAML"}</Badge>}
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            spellCheck={false}
            className="font-mono text-xs"
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" onClick={() => setInput(sampleJwt)} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Load sample JWT
            </Button>
            <Button variant="ghost" onClick={() => setInput("")} className="text-muted-foreground">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-primary" />
            Decoded
          </CardTitle>
        </CardHeader>
        <CardContent>
          {type === "unknown" && (
            <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Paste a JWT (three dot-separated segments) or a base64-encoded SAML assertion.
            </p>
          )}

          {type === "jwt" && !jwtResult && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-4 text-sm text-destructive">
              This looks like a JWT, but the header or payload isn't valid base64url-encoded JSON.
            </p>
          )}

          {type === "jwt" && jwtResult && (
            <div className="space-y-5">
              {claimTimestamps.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {claimTimestamps.map((c) => (
                    <Badge key={c.key} variant="outline">
                      {c.key}: {c.formatted}
                    </Badge>
                  ))}
                </div>
              )}
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Header</p>
                <pre className="max-h-40 overflow-auto rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs text-foreground">
                  {jwtResult.headerJson}
                </pre>
                <div className="mt-2">
                  <CopyButton getText={() => jwtResult.headerJson} label="Copy header" successMessage="Header copied" />
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payload</p>
                <pre className="max-h-64 overflow-auto rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs text-foreground">
                  {jwtResult.payloadJson}
                </pre>
                <div className="mt-2">
                  <CopyButton getText={() => jwtResult.payloadJson} label="Copy payload" successMessage="Payload copied" />
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Signature (not verified)
                </p>
                <p className="break-all rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs text-muted-foreground">
                  {jwtResult.signature || "(none)"}
                </p>
              </div>
            </div>
          )}

          {type === "saml" && !samlResult && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-4 text-sm text-destructive">
              This decoded to something that isn't valid XML, or uses deflate compression this tool doesn't support.
            </p>
          )}

          {type === "saml" && samlResult && (
            <div>
              <pre className="max-h-[480px] overflow-auto rounded-lg border border-border bg-secondary/40 p-4 font-mono text-xs leading-relaxed text-foreground">
                {samlResult}
              </pre>
              <div className="mt-3">
                <CopyButton getText={() => samlResult} label="Copy formatted XML" successMessage="XML copied" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
