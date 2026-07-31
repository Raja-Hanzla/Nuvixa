import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="h-6 w-6" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
        This page wandered off.
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you're looking for doesn't exist, or the tool may have moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/tools">Browse all tools</Link>
      </Button>
    </div>
  );
}
