import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { tools } from "@/lib/tools-registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${siteConfig.name} exists, how the tools work, and what "free, always" actually means.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Nuvixa
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Nuvixa is a free library of small, well-made tools for everyday work — the kind of thing
          you reach for once, use for thirty seconds, and forget about until next time you need it.
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Why this exists</h2>
            <p className="mt-3 leading-relaxed">
              Most "free tools" online today are the same handful of features buried behind
              sign-up walls, autoplay video ads, or a dozen clicks to find the actual button you
              need. We got tired of that, so we started building the tools we kept wishing existed
              — no account required, no bait-and-switch premium tier, just a page that does the
              one thing you came for.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">How the tools work</h2>
            <p className="mt-3 leading-relaxed">
              Every tool on Nuvixa runs entirely in your browser. When you fill in a form —
              whether that's drafting an out-of-office message, building an invoice, or timing a
              meeting's cost — the calculation happens on your device, not on a server somewhere.
              We don't see what you type, and we don't store it once you close the tab.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">What "free, always" means</h2>
            <p className="mt-3 leading-relaxed">
              Every tool on this site is free to use, with no usage limits and no "upgrade to
              unlock" walls. The site is supported by advertising rather than subscriptions —
              you can read exactly how that works on our{" "}
              <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Where we're headed</h2>
            <p className="mt-3 leading-relaxed">
              Nuvixa currently has {tools.length} tools live across business, productivity,
              developer, AI, finance, marketing, and utility categories, with new ones shipping
              regularly. If there's a tool you keep wishing existed, that's exactly the kind of
              thing we want to hear about.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/tools">Browse all tools</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
