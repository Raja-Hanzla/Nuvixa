import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center gap-2", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <span className="absolute inset-0 rounded-md bg-primary blur-[6px] opacity-50" />
        <span className="relative font-display text-base font-bold text-primary-foreground">
          N
        </span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Nuvixa
      </span>
    </Link>
  );
}
