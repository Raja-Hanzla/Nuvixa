"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button, type ButtonProps } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  getText: () => string;
  label?: string;
  successMessage?: string;
}

export function CopyButton({
  getText,
  label = "Copy",
  successMessage = "Copied to clipboard",
  variant = "outline",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleClick() {
    const ok = await copyToClipboard(getText());
    if (ok) {
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 1800);
    } else {
      toast.error("Couldn't copy — try selecting the text manually.");
    }
  }

  return (
    <Button variant={variant} onClick={handleClick} {...props}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}
