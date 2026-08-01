import { CalendarClock, FileText, Calculator, Timer, Search } from "lucide-react";

import type { Tool } from "@/types/tool";

/**
 * Single source of truth for every tool on Nuvixa.
 * To add a new tool:
 *   1. Add an entry here with a unique `slug`.
 *   2. Build the tool's client component under src/components/tools/<slug>/.
 *   3. Create src/app/tools/<slug>/page.tsx that renders <ToolPageLayout> with it.
 * The homepage, /tools listing, search, and related-tools sections all read from this array.
 */
export const tools: Tool[] = [
  {
    slug: "ooo-generator",
    name: "Corporate OOO Generator",
    tagline: "Write a polished out-of-office reply in under a minute.",
    description:
      "Generate a clear, professional out-of-office email for vacation, sick leave, parental leave, conferences, or any time away — with a tone that fits your workplace and the right details for whoever emails you while you're gone.",
    category: "business",
    icon: CalendarClock,
    keywords: [
      "out of office",
      "ooo",
      "auto reply",
      "email autoresponder",
      "vacation email",
      "leave message",
    ],
    howTo: [
      "Enter your name, role, and the dates you'll be away.",
      "Choose the reason for your absence and a tone — formal, friendly, or casual.",
      "Add a backup contact so people know who to reach in your absence.",
      "Review the generated message, then copy it straight into your email client.",
    ],
    faq: [
      {
        question: "Can I use this for Gmail and Outlook auto-replies?",
        answer:
          "Yes. Copy the generated message and paste it into Gmail's \"Vacation responder\" or Outlook's \"Automatic replies\" settings — it works with both.",
      },
      {
        question: "Does it work for reasons other than vacation?",
        answer:
          "Yes. Choose from vacation, sick leave, parental leave, a conference or offsite, or a general absence, and the wording adjusts to match.",
      },
      {
        question: "Will it include my backup contact automatically?",
        answer:
          "If you fill in a backup name and email, the tool adds a clear line pointing urgent messages to them. Leave it blank to omit it.",
      },
      {
        question: "Is my information stored anywhere?",
        answer:
          "No. Everything runs in your browser — nothing you type is sent to a server or saved once you leave the page.",
      },
    ],
  },
  {
    slug: "invoice-builder",
    name: "PDF Invoice & Receipt Builder",
    tagline: "Create a branded invoice or receipt and download it as a PDF.",
    description:
      "Build a professional invoice or receipt with itemized line items, automatic tax and discount calculations, and a clean layout — then export it as a ready-to-send PDF in seconds.",
    category: "finance",
    icon: FileText,
    keywords: [
      "invoice generator",
      "invoice maker",
      "receipt maker",
      "pdf invoice",
      "billing tool",
      "freelance invoice",
    ],
    howTo: [
      "Fill in your business details and your client's billing details.",
      "Add line items with a description, quantity, and rate — totals calculate automatically.",
      "Set a tax rate and discount if they apply, and add any payment notes.",
      "Click \"Download PDF\" to save a print-ready invoice or receipt.",
    ],
    faq: [
      {
        question: "Is this an invoice generator or a receipt generator?",
        answer:
          "Both — switch the document type between \"Invoice\" and \"Receipt\" and the labels, numbering, and totals adjust accordingly.",
      },
      {
        question: "Can I add my own logo?",
        answer:
          "This version focuses on clean typographic invoices without image uploads. You can still add your full business name, address, and contact details.",
      },
      {
        question: "How is tax calculated?",
        answer:
          "Enter a single tax rate as a percentage and it's applied to the subtotal after any discount, with the breakdown shown on the invoice.",
      },
      {
        question: "What currency does it support?",
        answer:
          "Choose from major currencies including USD, EUR, GBP, and more — the symbol updates across the preview and the exported PDF.",
      },
      {
        question: "Can clients pay directly from the PDF?",
        answer:
          "The PDF is a document, not a payment page. Add your payment instructions or a payment link in the notes field so clients know how to pay.",
      },
    ],
  },
  {
    slug: "rate-calculator",
    name: "Freelance Rate & Proposal Calculator",
    tagline: "Turn your income goals into an hourly rate and project quote.",
    description:
      "Work out the hourly and day rate you actually need to charge based on your income goal, expenses, and billable hours — then turn it into a project estimate you can drop straight into a proposal.",
    category: "finance",
    icon: Calculator,
    keywords: [
      "freelance rate calculator",
      "hourly rate calculator",
      "day rate calculator",
      "proposal calculator",
      "freelance pricing",
      "consultant rate",
    ],
    howTo: [
      "Enter your target annual income and yearly business expenses.",
      "Set how many weeks a year you work and your billable hours per week.",
      "Add your desired profit margin to see the recommended rate range.",
      "Enter estimated project hours to get an instant project quote you can copy into a proposal.",
    ],
    faq: [
      {
        question: "How is the hourly rate calculated?",
        answer:
          "It adds your target income to your annual expenses, divides that by your realistic billable hours per year, then layers on your profit margin — the same logic professional pricing guides use.",
      },
      {
        question: "What's a realistic billable-hours percentage?",
        answer:
          "Most freelancers can only bill 60–80% of their working hours once you account for admin, marketing, and finding clients — the calculator defaults to a conservative estimate you can adjust.",
      },
      {
        question: "Can I use this for a fixed-price project quote?",
        answer:
          "Yes. Once your hourly rate is set, enter your estimated hours for the project and the calculator produces a suggested fixed price you can include in a proposal.",
      },
      {
        question: "Does it account for taxes?",
        answer:
          "Add your estimated tax rate as part of your expenses or profit margin — the calculator gives you the gross rate to charge; what you keep after tax depends on your local tax rules.",
      },
    ],
  },
  {
    slug: "meeting-cost-ticker",
    name: "Remote Meeting Cost Ticker",
    tagline: "Watch what this meeting is actually costing, in real time.",
    description:
      "Enter how many people are in a meeting and their average hourly wage, then start the ticker — a live counter shows exactly how much the meeting is costing as it runs, so everyone feels the value of the time being spent.",
    category: "business",
    icon: Timer,
    isNew: true,
    keywords: [
      "meeting cost calculator",
      "meeting cost ticker",
      "meeting cost counter",
      "how much does this meeting cost",
      "remote meeting cost",
      "team meeting cost calculator",
    ],
    howTo: [
      "Enter how many people are in the meeting.",
      "Enter an average hourly wage across attendees — a rough blended estimate is fine.",
      "Click \"Start meeting\" right when the meeting begins to start the live counter.",
      "Pause or reset any time, and copy a summary once the meeting wraps up.",
    ],
    faq: [
      {
        question: "How is the cost calculated?",
        answer:
          "It multiplies the number of attendees by the average hourly wage to get a combined per-hour burn rate, then scales that down to whatever fraction of an hour has elapsed since you hit start.",
      },
      {
        question: "Can I adjust the numbers while the meeting is running?",
        answer:
          "Yes. If someone joins late or leaves early, update the attendee count or wage at any point and the running total adjusts immediately.",
      },
      {
        question: "Where do I get an average hourly wage for the group?",
        answer:
          "A quick blended estimate works well — take a rough average salary for the roles in the room, divide by roughly 2,080 working hours a year, and use that number.",
      },
      {
        question: "Does pausing reset the counter?",
        answer:
          "No. Pause freezes the total exactly where it is so you can screenshot or copy it, and \"Resume\" picks back up from that point. Only \"Reset\" clears it to zero.",
      },
    ],
  },
  {
    slug: "serp-simulator",
    name: "Google SERP & AI Overview Snippet Simulator",
    tagline: "Preview your title and description before you publish.",
    description:
      "Type your meta title and description and see a live preview of how they'll likely display on desktop and mobile search results, complete with character-limit warnings and a simulated AI Overview snippet, so you can catch truncation and weak copy before it goes live.",
    category: "marketing",
    icon: Search,
    isNew: true,
    keywords: [
      "serp preview tool",
      "meta description checker",
      "title tag checker",
      "google snippet preview",
      "ai overview simulator",
      "seo snippet generator",
    ],
    howTo: [
      "Enter your meta title and watch the character counter — green means safely under Google's typical truncation point.",
      "Enter your meta description and check it against the same limit.",
      "Add your page URL to see the breadcrumb path Google would display.",
      "Switch between the Desktop and Mobile tabs to compare how the snippet wraps on each.",
    ],
    faq: [
      {
        question: "Are these the exact pixel widths Google uses?",
        answer:
          "They're a close, widely-used approximation based on typical Google SERP container widths and fonts. Google's actual rendering can shift slightly over time and varies by query, so treat this as a strong guide rather than a guarantee.",
      },
      {
        question: "What counts as too long for a title or description?",
        answer:
          "As a rule of thumb, titles start risking truncation past about 55–60 characters, and descriptions past about 150–160 characters — the counter turns amber near that point and red once you're over it.",
      },
      {
        question: "What is the \"Simulated AI Overview\" section?",
        answer:
          "It's a stylized preview of how your content might be quoted in an AI-generated answer box, built from your description. It's meant to help you sanity-check tone and clarity — it doesn't predict what Google's AI Overview will actually generate.",
      },
      {
        question: "Do I need to enter a real URL?",
        answer:
          "No — any URL works to preview the breadcrumb path. Just make sure it reflects your real site structure if you want an accurate picture before publishing.",
      },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slug: string, limit = 3): Tool[] {
  const current = getToolBySlug(slug);
  if (!current) return tools.slice(0, limit);

  const sameCategory = tools.filter((t) => t.slug !== slug && t.category === current.category);
  const others = tools.filter((t) => t.slug !== slug && t.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((tool) =>
    [tool.name, tool.tagline, tool.description, ...tool.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
