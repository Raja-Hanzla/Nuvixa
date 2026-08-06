"use client";

import * as React from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Check, X, Sparkles, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  evaluatePassword,
  generateStrongPassword,
  type StrengthCriteria,
} from "@/lib/generators/password-strength";
import { cn } from "@/lib/utils";

const scoreStyles = [
  { bar: "bg-destructive", text: "text-destructive" },
  { bar: "bg-orange-500", text: "text-orange-500" },
  { bar: "bg-yellow-500", text: "text-yellow-600 dark:text-yellow-400" },
  { bar: "bg-lime-500", text: "text-lime-600 dark:text-lime-400" },
  { bar: "bg-success", text: "text-success" },
];

const criteriaLabels: { key: keyof StrengthCriteria; label: string }[] = [
  { key: "minLength8", label: "8+ characters" },
  { key: "minLength12", label: "12+ characters" },
  { key: "hasUpper", label: "Uppercase letter" },
  { key: "hasLower", label: "Lowercase letter" },
  { key: "hasNumber", label: "Number" },
  { key: "hasSymbol", label: "Symbol" },
];

export function PasswordStrengthEvaluatorTool() {
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [generated, setGenerated] = React.useState("");

  const result = evaluatePassword(password);
  const isEmpty = password.length === 0;
  const style = scoreStyles[result.score];
  const barWidthPercent = isEmpty ? 0 : ((result.score + 1) / 5) * 100;

  function handleGenerate() {
    const value = generateStrongPassword(16);
    setGenerated(value);
    setPassword(value);
    setVisible(true);
    toast.success("Strong password generated");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Check a password</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Never leaves your browser — nothing is logged, sent, or stored.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="pw-input">Password</Label>
            <div className="relative">
              <Input
                id="pw-input"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type or paste a password to evaluate"
                className="pr-10 font-mono"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className={cn("font-semibold", isEmpty ? "text-muted-foreground" : style.text)}>
                {isEmpty ? "No password entered" : result.label}
              </span>
              {!isEmpty && (
                <span className="font-mono text-xs text-muted-foreground">
                  {Math.round(result.entropyBits)} bits of entropy
                </span>
              )}
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full rounded-full transition-all duration-300", isEmpty ? "bg-transparent" : style.bar)}
                style={{ width: `${barWidthPercent}%` }}
              />
            </div>
          </div>

          {/* Criteria checklist */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {criteriaLabels.map(({ key, label }) => {
              const met = result.criteria[key];
              return (
                <div key={key} className="flex items-center gap-1.5 text-sm">
                  {met ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                  ) : (
                    <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <span className={met ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {!isEmpty && (
            <ul className="space-y-1.5 border-t border-border pt-4">
              {result.feedback.map((line, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  &bull; {line}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            Need a strong password instead?
          </CardTitle>
          <CardDescription>Generates a random 16-character password using your browser's secure random number generator.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button onClick={handleGenerate}>Generate strong password</Button>
          {generated && (
            <CopyButton getText={() => generated} successMessage="Password copied" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
