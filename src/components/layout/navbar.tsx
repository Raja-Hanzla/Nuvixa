"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandSearch } from "@/components/layout/command-search";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { tools } from "@/lib/tools-registry";
import { categoryDot, categoryLabels } from "@/types/tool";

const navLinks = [
  { href: "/tools", label: "All Tools" },
  { href: "/#categories", label: "Categories" },
  { href: "/#about", label: "About" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <CommandSearch />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/tools">
              Browse tools
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-2 h-px bg-border" />
              <div className="mt-4 flex-1 overflow-y-auto">
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SheetClose asChild key={key}>
                      <Link
                        href={`/tools?category=${key}`}
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${categoryDot[key as keyof typeof categoryDot]}`} />
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <p className="mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Popular tools
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  {tools.slice(0, 5).map((tool) => (
                    <SheetClose asChild key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <tool.icon className="h-4 w-4 text-primary" />
                        {tool.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
