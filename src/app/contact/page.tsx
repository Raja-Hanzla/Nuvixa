import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Found a bug, have a tool idea, or a question about how something works? Send us a note
          — we read every message.
        </p>

        <div className="mt-8">
          <Button asChild size="lg">
            <a href={`mailto:${siteConfig.email}`}>Email {siteConfig.email}</a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          We typically reply within a few business days.
        </p>
      </div>
    </div>
  );
}
