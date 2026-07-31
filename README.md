# Nuvixa

Free, high-quality online business, productivity, developer, AI, finance, and utility tools —
fast, beautiful, and SEO-friendly. Built with Next.js App Router, TypeScript, Tailwind CSS, and
shadcn/ui-style components, designed to scale to 100+ tools with minimal added code per tool.

## Tech stack

- **Next.js 14** (App Router, Server Components by default)
- **TypeScript** (strict mode)
- **Tailwind CSS** with a custom design token system (light + dark mode via CSS variables)
- **shadcn/ui-style primitives** built on Radix UI (Button, Card, Select, Accordion, Sheet, Dialog, etc.)
- **jsPDF + jspdf-autotable** for client-side PDF generation (Invoice/Receipt Builder)
- **next-themes** for dark/light mode
- **sonner** for toast notifications
- **lucide-react** for icons

Everything runs client-side where it matters — no backend, no database, no accounts. Tool state
never leaves the browser.

## Getting started

This project was built in an offline sandbox without network access, so dependencies have **not**
been installed and the build has **not** been run yet. On your machine:

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

To type-check without a full build:

```bash
npm run type-check
```

To build for production:

```bash
npm run build
npm run start
```

## Deploying to Vercel

This project is Vercel-ready out of the box:

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Import the repo in the [Vercel dashboard](https://vercel.com/new).
3. Vercel auto-detects Next.js — no config changes needed. Click **Deploy**.
4. Once deployed, update `url` in `src/lib/site-config.ts` to your production domain so
   sitemap.xml, robots.txt, and Open Graph tags resolve correctly.

## Project structure

```
src/
  app/                        Routes (App Router)
    layout.tsx                 Root layout: fonts, metadata, theme provider, navbar/footer shell
    page.tsx                   Homepage
    sitemap.ts                 Auto-generated sitemap.xml (reads the tools registry)
    robots.ts                  Auto-generated robots.txt
    not-found.tsx               Custom 404
    tools/
      page.tsx                  /tools — full searchable/filterable tool listing
      ooo-generator/page.tsx     /tools/ooo-generator
      invoice-builder/page.tsx   /tools/invoice-builder
      rate-calculator/page.tsx   /tools/rate-calculator

  components/
    ui/                        Reusable shadcn-style primitives (Button, Card, Select, etc.)
    layout/                    Navbar, Footer, Logo, theme provider/toggle, ⌘K command search
    home/                      Homepage-only sections (hero, categories grid, CTA, value props)
    tools/
      tool-card.tsx             Card used in grids everywhere a tool is listed
      tool-page-layout.tsx      Shared shell for every tool page (header, how-to, FAQ, related, JSON-LD)
      copy-button.tsx           Reusable "Copy to clipboard" button with toast feedback
      <tool-slug>/              Each tool's own interactive client component

  lib/
    tools-registry.ts          Single source of truth for every tool's metadata (see below)
    site-config.ts             Site name, description, URL, social links
    utils.ts                   cn(), currency/number formatting, clipboard helper
    generators/                Pure calculation/text-generation logic per tool, kept UI-free

  types/
    tool.ts                    Tool, ToolCategory, FaqItem types + category labels/colors
```

## How the tools registry works

`src/lib/tools-registry.ts` is the single source of truth. The homepage, the `/tools` listing
page, the ⌘K command search, and every tool page's "Related tools" section all read from this one
array — nothing about a tool is hardcoded in more than one place.

## Adding a new tool

Because of the registry pattern, adding tool #4 (and #5, #6... up to 100+) only takes three steps:

1. **Register it.** Add an entry to the `tools` array in `src/lib/tools-registry.ts` with a unique
   `slug`, `name`, `tagline`, `description`, `category`, `icon` (any `lucide-react` icon),
   `keywords` (for search/SEO), `howTo` steps, and `faq` items.
2. **Build the tool.** Create a client component at
   `src/components/tools/<slug>/<slug>-tool.tsx` with the tool's actual UI and logic. If the tool
   needs calculations or text generation, keep that logic UI-free in
   `src/lib/generators/<slug>.ts` so it's easy to test and reuse.
3. **Create the route.** Add `src/app/tools/<slug>/page.tsx`:

   ```tsx
   import type { Metadata } from "next";
   import { notFound } from "next/navigation";

   import { ToolPageLayout } from "@/components/tools/tool-page-layout";
   import { YourTool } from "@/components/tools/<slug>/<slug>-tool";
   import { getToolBySlug } from "@/lib/tools-registry";

   const tool = getToolBySlug("<slug>");

   export const metadata: Metadata = tool
     ? {
         title: tool.name,
         description: tool.description,
         alternates: { canonical: `/tools/${tool.slug}` },
       }
     : {};

   export default function Page() {
     if (!tool) notFound();
     return (
       <ToolPageLayout tool={tool}>
         <YourTool />
       </ToolPageLayout>
     );
   }
   ```

`ToolPageLayout` automatically renders the header, "About this tool", numbered "How to use" steps,
an FAQ accordion, related tools (matched by category), and JSON-LD structured data
(`SoftwareApplication` + `FAQPage` + `BreadcrumbList`) for SEO — you never have to rebuild that
shell per tool.

## Design system

- **Colors:** "Signal" blue (`#3D5AFE`-ish) as the primary accent, deep-ink dark mode background
  (not pure black), cool off-white light mode background (not cream), amber "Spark" as a secondary
  accent for highlights like "New" badges.
- **Type:** Space Grotesk for display/headings, Inter for body text, JetBrains Mono for numbers,
  currency, and the command-search console — ties into the "tools you actually run" positioning.
- **Signature element:** the homepage hero's terminal-styled command console, which doubles as a
  live, filterable search across every tool.
- All tokens live in `src/app/globals.css` (CSS variables) and `tailwind.config.ts`.

## Included tools (v1)

| Tool | Route | Category |
| --- | --- | --- |
| Corporate OOO Generator | `/tools/ooo-generator` | Business |
| PDF Invoice & Receipt Builder | `/tools/invoice-builder` | Finance |
| Freelance Rate & Proposal Calculator | `/tools/rate-calculator` | Finance |

## Notes / follow-ups

- `public/favicon.svg` is a simple placeholder mark — swap in real brand assets when ready.
- `siteConfig.ogImage` points to `/og-image.png`, which doesn't exist yet — add a real 1200×630
  Open Graph image at that path for link previews.
- Because this was built offline, `npm install` has not been run — do that first before `npm run
  dev` or `npm run build`.
