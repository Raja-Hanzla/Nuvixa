import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { tools } from "@/lib/tools-registry";
import { categoryLabels } from "@/types/tool";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const categories = Object.entries(categoryLabels);

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/tools?category=${key}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">Tools</h3>
            <ul className="mt-4 space-y-2.5">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">Nuvixa</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/tools" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  All tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nuvixa. All tools are free, always.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for people who just need the thing to work.
          </p>
        </div>
      </div>
    </footer>
  );
}
