import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-16 text-center sm:px-16">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]" />
        <div className="relative">
          <h2 className="mx-auto max-w-lg text-balance font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Stop hunting for tools that make you sign up first.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-background/70">
            Every tool on Nuvixa is free to use, right now, with nothing to install.
          </p>
          <Button asChild size="lg" className="mt-7 bg-background text-foreground hover:bg-background/90">
            <Link href="/tools">
              Explore all tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
