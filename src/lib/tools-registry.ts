import { CalendarClock, FileText, Calculator, Timer, Search, ShoppingCart, BarChart3, Link2, KeyRound, ScrollText, Lock, Braces, Contrast, LayoutGrid, FileImage, Building2, TrendingUp, PieChart, Car, Scale, Snowflake, Home, FileSignature, ShieldCheck, Database, ShieldHalf, Users, ServerCrash, Fingerprint, Tag, Video, Gauge, Handshake, Map, MailCheck, Scissors, Terminal, DatabaseZap, RefreshCw, Ratio, GitBranch, Container, Regex, Diff, Podcast, FileSpreadsheet, Radio, CaseSensitive, FileDigit, ListTree } from "lucide-react";

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
  {
    slug: "ecommerce-margin",
    name: "E-Commerce Break-Even & Profit Margin Matrix",
    tagline: "Know the exact ROAS and CPA that keep a product profitable.",
    description:
      "Enter your manufacturing cost, shipping, packaging, and payment fees against your sales price, and instantly see your gross margin along with the maximum ad spend (CPA) and required ROAS at break-even and at several profit targets.",
    category: "finance",
    icon: ShoppingCart,
    keywords: [
      "break even calculator ecommerce",
      "roas calculator",
      "max cpa calculator",
      "profit margin calculator",
      "dropshipping profit calculator",
      "ecommerce margin calculator",
    ],
    howTo: [
      "Enter your sales price and per-unit manufacturing cost (COGS).",
      "Add shipping and packaging costs, plus your payment processor's fee.",
      "Check your gross profit per unit and margin percentage before any ad spend.",
      "Read the matrix to see the max ad spend and required ROAS at break-even and at 10%, 20%, and 30% profit targets.",
    ],
    faq: [
      {
        question: "What counts as \"max ad spend\" or CPA?",
        answer:
          "It's the most you can spend acquiring a single sale, at a given target margin, before that sale stops being profitable at that margin. Spending more than this per acquisition erodes your target profit.",
      },
      {
        question: "Why does the required ROAS change per row?",
        answer:
          "Each row targets a different profit margin. Hitting a higher margin requires either a lower ad spend per sale or more revenue per sale relative to spend — so the required ROAS rises as your target margin rises.",
      },
      {
        question: "What if a row shows \"not achievable\"?",
        answer:
          "That means your price and costs don't leave enough room to hit that margin target at all, regardless of ad efficiency. You'd need to raise price, cut costs, or lower the target.",
      },
      {
        question: "Does this include ad platform fees separately from ad spend?",
        answer:
          "No — \"ad spend\" here represents your total cost of acquiring the sale through ads, whatever platform you use. If you track platform fees separately from bid spend, add them together before comparing to the max ad spend figure.",
      },
    ],
  },
  {
    slug: "ad-campaign-engine",
    name: "Ad Campaign CPM & ROI Engine",
    tagline: "Turn budget, impressions, and conversion rate into a full ROI breakdown.",
    description:
      "Enter your ad spend, impressions, click-through rate, conversion rate, and average order value, and instantly see connected calculation blocks for CPM, CPC, CPA, revenue, ROAS, and ROI — all updating live as you adjust any number.",
    category: "marketing",
    icon: BarChart3,
    keywords: [
      "cpm calculator",
      "roi calculator ads",
      "roas calculator",
      "cpc calculator",
      "ad campaign calculator",
      "media buying calculator",
    ],
    howTo: [
      "Enter your total ad spend and total impressions to see your CPM.",
      "Enter your click-through rate to see estimated clicks and cost-per-click.",
      "Enter your conversion rate and average order value to see conversions, CPA, and revenue.",
      "Read ROAS and ROI in the third block, and copy the full breakdown for reporting.",
    ],
    faq: [
      {
        question: "What's the difference between ROAS and ROI here?",
        answer:
          "ROAS is revenue divided by ad spend, shown as a multiplier (e.g. 3.5x). ROI is the percentage profit relative to spend after subtracting the spend itself — a 3.5x ROAS is a 250% ROI, since you netted 2.5x your spend as profit.",
      },
      {
        question: "Are these blocks connected, or just calculated separately?",
        answer:
          "Every block reads from the same set of inputs and recalculates instantly as you change any one of them — CPM, CPC, CPA, revenue, ROAS, and ROI all update together in real time.",
      },
      {
        question: "Does this account for ad platform fees or agency markups?",
        answer:
          "No — enter your true, all-in ad spend if you want the ROAS and ROI figures to reflect your actual cost of acquisition, including any platform or management fees.",
      },
      {
        question: "What's a good CPA or ROAS to aim for?",
        answer:
          "That depends entirely on your margins — pair this with the E-Commerce Break-Even & Profit Margin Matrix tool to see the max CPA and required ROAS your specific product can actually support.",
      },
    ],
  },
  {
    slug: "utm-builder",
    name: "UTM Link Builder & Campaign Manager",
    tagline: "Build trackable campaign links and keep a running library of them.",
    description:
      "Fill in source, medium, campaign, term, and content to instantly generate a properly-tagged UTM tracking URL, then save it to a running list of campaign links stored right in your browser so you can find and copy them again later.",
    category: "marketing",
    icon: Link2,
    keywords: [
      "utm builder",
      "utm link generator",
      "campaign url builder",
      "google analytics utm",
      "utm parameter generator",
      "utm tracking link",
    ],
    howTo: [
      "Enter your destination URL, or pick a quick preset to auto-fill a common source and medium.",
      "Fill in campaign source, medium, and name — term and content are optional.",
      "Copy the generated link directly, or click \"Save campaign\" to keep it in your saved list.",
      "Come back any time — saved campaigns stay in this browser until you delete them.",
    ],
    faq: [
      {
        question: "Where are my saved campaigns stored?",
        answer:
          "Directly in your browser's local storage on this device — they aren't sent to or stored on any server, so they won't show up if you switch browsers or devices, but they'll persist across visits on this one.",
      },
      {
        question: "What's the difference between utm_term and utm_content?",
        answer:
          "utm_term is traditionally used for paid search keywords, while utm_content is used to distinguish between similar content or links within the same ad or email — for example, two different button variations in an A/B test.",
      },
      {
        question: "Do I need to fill in every field?",
        answer:
          "No — utm_source, utm_medium, and utm_campaign are the three fields Google Analytics relies on most; utm_term and utm_content are optional and mainly useful for more granular testing.",
      },
      {
        question: "Will this work with analytics tools other than Google Analytics?",
        answer:
          "Yes — UTM parameters are a widely-adopted standard, so most major analytics platforms (not just Google Analytics) recognize and parse these same parameters.",
      },
    ],
  },
  {
    slug: "password-policy-builder",
    name: "SOC 2 / ISO 27001 Password Policy Blueprint Builder",
    tagline: "Generate a starting-point password policy for your compliance framework.",
    description:
      "Select the compliance standards your organization needs to satisfy — SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR, or NIST 800-63B — and get a combined password policy built from the strictest applicable requirement across each, ready to copy or download for your handbook.",
    category: "security",
    icon: KeyRound,
    keywords: [
      "password policy generator",
      "soc 2 password policy",
      "iso 27001 password policy",
      "hipaa password requirements",
      "pci dss password policy",
      "nist password guidelines",
    ],
    howTo: [
      "Toggle on every compliance framework your organization needs to satisfy.",
      "Optionally add your company name so it appears in the generated policy header.",
      "Review the combined policy — it automatically takes the strictest requirement across your selected frameworks.",
      "Copy the policy text or download it as a .txt file to drop into your handbook.",
    ],
    faq: [
      {
        question: "Is this an officially certified or legally-reviewed policy?",
        answer:
          "No. It's a starting-point draft built from common, widely-cited industry baselines for each framework. Have your compliance officer, security lead, or auditor review and adapt it before adopting it as your official policy.",
      },
      {
        question: "Why don't the numbers match my auditor's exact requirements?",
        answer:
          "Most of these frameworks (SOC 2, ISO 27001, HIPAA, GDPR) don't specify exact numeric password rules — they require a \"reasonable\" or \"appropriate\" policy that auditors evaluate based on your specific risk environment. This tool shows commonly-accepted baselines, not a guaranteed pass.",
      },
      {
        question: "How does combining multiple frameworks work?",
        answer:
          "For each requirement — minimum length, rotation interval, lockout threshold, and so on — the tool takes the strictest value among every framework you've selected, so the result satisfies all of them at once.",
      },
      {
        question: "Why does NIST 800-63B look less strict than the others?",
        answer:
          "NIST's modern guidance deliberately moved away from forced complexity rules and frequent mandatory rotation, favoring longer passwords and screening against known breached-password lists instead — that's current best practice, even though it looks more relaxed on paper.",
      },
    ],
  },
  {
    slug: "privacy-policy-generator",
    name: "Website Privacy Policy Placeholder Text Generator",
    tagline: "Answer a few questions, get a baseline privacy policy draft.",
    description:
      "Enter your company name, URL, contact email, and how your site tracks or collects data, and instantly get a structured baseline privacy policy you can copy or download — a starting point to adapt and have reviewed before publishing.",
    category: "security",
    icon: ScrollText,
    keywords: [
      "privacy policy generator",
      "free privacy policy template",
      "website privacy policy generator",
      "gdpr privacy policy template",
      "ccpa privacy policy template",
      "privacy policy text generator",
    ],
    howTo: [
      "Enter your company name, website URL, and a contact email.",
      "Toggle on everything your site actually does — cookies, analytics, ads, forms, payments, or a newsletter.",
      "Toggle on GDPR or CCPA sections if you have EU/UK or California visitors.",
      "Copy the generated text or download it as a .txt file to adapt and publish.",
    ],
    faq: [
      {
        question: "Is this a legally valid privacy policy?",
        answer:
          "No — it's a generic starting-point template, not legal advice. Have a lawyer review and adapt it before publishing, especially if specific regulations like GDPR or CCPA apply to your business.",
      },
      {
        question: "What if my site does something not covered by the toggles?",
        answer:
          "Add a section manually after generating the base text — the toggles cover the most common cases (cookies, analytics, advertising, forms, payments, newsletters) but won't capture every possible business model.",
      },
      {
        question: "Do I need to include the GDPR or CCPA sections?",
        answer:
          "If you have visitors from the EU/UK or California, those regulations generally expect specific disclosures — toggle those sections on. If you're unsure whether they apply to you, that's a good question for a lawyer.",
      },
      {
        question: "Is my information sent anywhere when I use this tool?",
        answer:
          "No — everything is generated directly in your browser. Nothing you type is transmitted or stored.",
      },
    ],
  },
  {
    slug: "password-strength-evaluator",
    name: "Secure Password Strength Evaluator & Visual Meter",
    tagline: "See exactly how strong a password really is, instantly.",
    description:
      "Type or paste a password and get a real entropy-based strength score with a color-coded meter, a checklist of what's missing, and specific feedback — plus a one-click strong password generator. Everything runs locally in your browser; nothing is ever transmitted or stored.",
    category: "security",
    icon: Lock,
    keywords: [
      "password strength checker",
      "password strength meter",
      "how strong is my password",
      "password entropy calculator",
      "strong password generator",
      "secure password checker",
    ],
    howTo: [
      "Type or paste a password into the field — it's masked by default, with a toggle to reveal it.",
      "Watch the color-coded meter and entropy score update instantly as you type.",
      "Check the criteria list to see exactly what's missing (length, symbols, mixed case, etc.).",
      "Use \"Generate strong password\" if you'd rather start from a secure random one.",
    ],
    faq: [
      {
        question: "Does this send my password anywhere?",
        answer:
          "No. The entire evaluation runs in your browser using local JavaScript — your password is never transmitted over the network, logged, or stored anywhere, including by us.",
      },
      {
        question: "What does \"bits of entropy\" mean?",
        answer:
          "It's a measure of how unpredictable a password is, based on its length and the variety of character types used. Roughly speaking, more bits means exponentially more attempts a computer would need to guess it through brute force.",
      },
      {
        question: "Why did a long password still score poorly?",
        answer:
          "Length alone isn't enough — the evaluator also checks for common passwords, sequential characters (like \"abcd\" or \"1234\"), and repeated characters, all of which make a password much easier to guess than its raw length suggests.",
      },
      {
        question: "How is the generated password created?",
        answer:
          "It uses your browser's built-in secure random number generator (the Web Crypto API), not a predictable pseudo-random function — the same category of randomness used in real cryptographic applications.",
      },
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Tree Formatter & Syntax Validator",
    tagline: "Turn messy or broken JSON into a clean, color-coded tree.",
    description:
      "Paste minified, messy, or broken JSON and instantly get a validity check with the exact line and column of any syntax error, plus a collapsible, color-coded interactive tree view you can explore, and one-click copy for both formatted and minified output.",
    category: "developer",
    icon: Braces,
    keywords: [
      "json formatter",
      "json validator",
      "json beautifier",
      "json tree viewer",
      "json syntax checker",
      "minify json",
    ],
    howTo: [
      "Paste your JSON into the input box — minified, pretty-printed, or broken all work.",
      "If it's invalid, read the exact line and column of the syntax error.",
      "If it's valid, explore the interactive tree — click any row to expand or collapse it.",
      "Copy the formatted or minified version with one click.",
    ],
    faq: [
      {
        question: "Does this send my JSON anywhere?",
        answer:
          "No — parsing, formatting, and validation all happen locally in your browser using standard JavaScript. Nothing you paste is transmitted or stored.",
      },
      {
        question: "How accurate is the error location?",
        answer:
          "It's derived directly from the JavaScript engine's own parser error, converted into a line and column number — the same information the engine itself uses internally, not a separate guess.",
      },
      {
        question: "What counts as \"minified\" vs \"formatted\"?",
        answer:
          "Minified removes all unnecessary whitespace to produce the smallest possible file size; formatted adds 2-space indentation and line breaks so it's readable. Both represent the exact same data.",
      },
      {
        question: "Is there a size limit?",
        answer:
          "There's no hard-coded limit, but very large JSON files (several megabytes) may render the interactive tree slowly, since every node is a live, expandable element.",
      },
    ],
  },
  {
    slug: "wcag-checker",
    name: "WCAG Typography Readability Checker",
    tagline: "Check if your text and background actually pass accessibility standards.",
    description:
      "Pick a text color, background color, font, size, and weight, and instantly see the real WCAG contrast ratio along with clear pass/fail results for both AA and AAA, at whichever text-size threshold actually applies to your settings.",
    category: "developer",
    icon: Contrast,
    keywords: [
      "wcag contrast checker",
      "color contrast checker",
      "accessibility contrast ratio",
      "wcag aa aaa checker",
      "text readability checker",
      "contrast ratio calculator",
    ],
    howTo: [
      "Pick your text color and background color, either with the color picker or by typing a hex code.",
      "Choose a font family, size, and whether the text is bold.",
      "Read the live contrast ratio and see whether it passes WCAG AA and AAA.",
      "Adjust colors or size until both the look and the contrast ratio work for you.",
    ],
    faq: [
      {
        question: "What's the difference between AA and AAA?",
        answer:
          "AA is the standard most legal and organizational accessibility requirements reference — 4.5:1 for normal text, 3:1 for large text. AAA is a stricter, optional standard — 7:1 for normal text, 4.5:1 for large text.",
      },
      {
        question: "What counts as \"large text\" under WCAG?",
        answer:
          "Text at 24px or larger at any weight, or 18.66px (roughly 14pt) or larger when bold. Large text gets a lower required contrast ratio because bigger, heavier strokes are inherently easier to read at lower contrast.",
      },
      {
        question: "Is this using the real WCAG formula?",
        answer:
          "Yes — it calculates relative luminance using the official WCAG formula (with proper gamma correction for each color channel), not a simplified brightness approximation some tools use.",
      },
      {
        question: "Does font family affect the contrast ratio?",
        answer:
          "No — contrast ratio is purely a function of the two colors. Font family only affects the live preview so you can judge actual readability, not the calculated ratio itself.",
      },
    ],
  },
  {
    slug: "layout-playground",
    name: "CSS Grid & Flexbox Live Layout Playground",
    tagline: "Adjust sliders, watch the layout update, copy the CSS.",
    description:
      "Switch between Flexbox and Grid, adjust direction, alignment, wrapping, gap, and item count with live sliders and dropdowns, and watch a real layout update instantly — then copy the exact CSS it took to build it.",
    category: "developer",
    icon: LayoutGrid,
    keywords: [
      "css flexbox generator",
      "css grid generator",
      "flexbox playground",
      "css grid playground",
      "flexbox cheat sheet",
      "css layout generator",
    ],
    howTo: [
      "Choose Flexbox or Grid at the top.",
      "Adjust the dropdowns and sliders on the left — direction, alignment, wrapping, gap, and item count.",
      "Watch the live preview update instantly as colored boxes rearrange.",
      "Copy the generated CSS and drop it straight into your stylesheet.",
    ],
    faq: [
      {
        question: "Does the generated CSS include the item styles too?",
        answer:
          "No — it outputs the container's layout rules only (the properties you're adjusting). The preview boxes are just for visualization; your real content will have its own styling.",
      },
      {
        question: "Why does changing item count matter for Grid?",
        answer:
          "It shows how items actually flow into your defined columns and rows — useful for seeing what happens when you have more or fewer items than your grid template expects.",
      },
      {
        question: "Can I use this for a responsive layout?",
        answer:
          "This tool shows one configuration at a time rather than breakpoints — a common pattern is to generate your mobile layout, copy it, then adjust the controls again for your desktop layout and wrap both in media queries.",
      },
      {
        question: "Is Flexbox or Grid better for my layout?",
        answer:
          "As a rule of thumb, Flexbox suits one-dimensional layouts (a single row or column, like a nav bar), while Grid suits two-dimensional layouts (rows and columns together, like a page template) — try both here and see which one gives you the control you need.",
      },
    ],
  },
  {
    slug: "svg-to-data-uri",
    name: "Vector SVG to Data URI Code Converter",
    tagline: "Drop an SVG, get inline-ready data URI code instantly.",
    description:
      "Drag and drop an .svg file or paste its XML directly, and instantly get a clean data:image/svg+xml;base64 URI — plus a URL-encoded alternative, a ready-to-use CSS background-image snippet, and an HTML img tag, all with live preview and size comparisons.",
    category: "developer",
    icon: FileImage,
    keywords: [
      "svg to data uri",
      "svg to base64",
      "svg base64 converter",
      "svg data uri generator",
      "inline svg css",
      "svg to css background",
    ],
    howTo: [
      "Drag and drop an .svg file onto the drop zone, or paste raw SVG XML into the text box.",
      "Toggle \"Minify before encoding\" to strip comments and extra whitespace, and see the size difference.",
      "Check the live preview to confirm it rendered correctly.",
      "Switch between Base64, URL-encoded, CSS, and HTML tabs, then copy whichever format you need.",
    ],
    faq: [
      {
        question: "Does my SVG get uploaded anywhere?",
        answer:
          "No — the file is read directly in your browser using the File API, and all encoding happens locally. Nothing is sent to a server.",
      },
      {
        question: "Why offer both Base64 and URL-encoded formats?",
        answer:
          "Base64 is the more universally recognized format and always works, but adds roughly 33% overhead to the file size. URL-encoding often produces a smaller result for SVGs specifically, since SVG is already text-based — try both and use whichever is smaller for your case.",
      },
      {
        question: "Is it safe to preview an SVG I don't fully trust?",
        answer:
          "The preview renders through a standard HTML img tag rather than injecting the SVG's markup directly into the page — images loaded this way don't execute any embedded scripts, unlike some other SVG-embedding methods.",
      },
      {
        question: "When should I inline an SVG instead of linking to a file?",
        answer:
          "Inlining avoids an extra HTTP request, which helps for small, frequently-used icons — but for larger or rarely-changed SVGs, a normal file reference (cacheable by the browser) is usually more efficient. The size stats shown here can help you decide.",
      },
    ],
  },
  {
    slug: "lease-calculator",
    name: "Commercial Lease Rent Roll & Square Foot Calculator",
    tagline: "See the real monthly cost behind a $/sqft lease quote.",
    description:
      "Enter square footage, base rent, NNN expenses, and annual escalation rates, and instantly get the true monthly operational cost — plus a full year-by-year rent roll showing exactly how much it grows over your lease term.",
    category: "finance",
    icon: Building2,
    keywords: [
      "commercial lease calculator",
      "rent roll calculator",
      "nnn lease calculator",
      "price per square foot calculator",
      "commercial rent calculator",
      "triple net lease calculator",
    ],
    howTo: [
      "Enter the rentable square footage and base rent per square foot per year.",
      "Add NNN/CAM expenses per square foot — this typically covers taxes, insurance, and maintenance.",
      "Set separate annual escalation rates for base rent and NNN, and your lease term in years.",
      "Read the year-by-year rent roll to see how monthly and annual costs grow over the full term.",
    ],
    faq: [
      {
        question: "What does NNN mean?",
        answer:
          "Triple net (NNN) means the tenant pays, on top of base rent, a share of the property's taxes, insurance, and common area maintenance — the three \"nets.\" It's usually quoted as an additional $/sqft/year figure, which is what this tool adds to base rent.",
      },
      {
        question: "Why are there two separate escalation rates?",
        answer:
          "Base rent escalation is typically a fixed percentage set in the lease. NNN charges often grow at a different rate tied to actual operating cost increases, so keeping them separate gives a more realistic year-by-year projection.",
      },
      {
        question: "Is this the same as what my landlord will quote me?",
        answer:
          "It should be very close if you enter the same $/sqft figures they've quoted, but always confirm exact NNN estimates and escalation terms directly against the actual lease document before signing.",
      },
      {
        question: "Does this account for free rent or tenant improvement allowances?",
        answer:
          "No — this calculates the stated lease economics only. Free rent periods and TI allowances would need to be factored in separately when comparing the true effective cost of a lease.",
      },
    ],
  },
  {
    slug: "mrr-retention",
    name: "SaaS Expansion MRR & Net Retention Calculator",
    tagline: "Turn your MRR movement into NRR, GRR, and net churn.",
    description:
      "Enter your starting MRR along with New, Expansion, Contraction, and Churned MRR for the period, and instantly get Net Revenue Retention, Gross Revenue Retention, net churn, and gross churn — the metrics investors and boards actually ask for.",
    category: "finance",
    icon: TrendingUp,
    keywords: [
      "net revenue retention calculator",
      "nrr calculator",
      "mrr calculator",
      "saas churn calculator",
      "net dollar retention calculator",
      "gross revenue retention calculator",
    ],
    howTo: [
      "Enter your starting MRR for the period you're measuring.",
      "Enter New MRR from new customers, and Expansion MRR from upgrades to existing customers.",
      "Enter Contraction MRR from downgrades and Churned MRR from cancellations.",
      "Read your ending MRR, growth rate, and both NRR and GRR instantly.",
    ],
    faq: [
      {
        question: "Why isn't New MRR included in the NRR calculation?",
        answer:
          "NRR is specifically designed to measure how well you retain and grow revenue from customers you already had at the start of the period — including new customers would conflate two very different things: retention and new customer acquisition.",
      },
      {
        question: "What's considered a good NRR?",
        answer:
          "Above 100% means your existing customers are spending more over time even before counting new logos — generally seen as a strong signal. Best-in-class SaaS companies often report NRR in the 110-130%+ range, though \"good\" varies a lot by company size and market.",
      },
      {
        question: "What's the difference between net churn and gross churn?",
        answer:
          "Gross churn only counts revenue lost to cancellations. Net churn also factors in contraction (downgrades) and expansion (upgrades) — it can even go negative if expansion revenue outpaces losses, which is the \"negative churn\" SaaS companies aim for.",
      },
      {
        question: "Does this work for annual contracts, or just monthly?",
        answer:
          "The math works the same regardless of billing cadence — just be consistent about the period you're measuring (e.g., use ARR figures throughout instead of MRR if that's how you track revenue).",
      },
    ],
  },
  {
    slug: "cap-table-simulator",
    name: "Startup Equity Dilution & Cap Table Simulator",
    tagline: "Stack SAFEs and priced rounds, watch founder ownership shrink.",
    description:
      "Add a sequence of SAFEs, convertible notes, and priced equity rounds — each with its own cap, discount, or pre-money valuation — and instantly see how founder ownership dilutes round by round, including a correctly-modeled option pool shuffle.",
    category: "finance",
    icon: PieChart,
    keywords: [
      "cap table simulator",
      "equity dilution calculator",
      "safe note calculator",
      "startup equity calculator",
      "founder dilution calculator",
      "priced round calculator",
    ],
    howTo: [
      "Click \"Add SAFE / Note\" or \"Add priced round\" to build your funding sequence in order.",
      "Fill in each round's amount, and either a valuation cap (SAFE) or pre-money valuation (priced round).",
      "For priced rounds, set an option pool top-up percentage if one applies — it dilutes before the new investor's stake is calculated.",
      "Watch founder ownership and the full cap table update after every round you add.",
    ],
    faq: [
      {
        question: "How are SAFEs modeled here?",
        answer:
          "As a simplification, each SAFE is treated as converting immediately at its own valuation cap (adjusted for any discount), rather than waiting to convert at a later priced round the way real SAFEs legally work. This keeps the simulation straightforward for quick modeling, but it's not exactly how conversion timing works in practice.",
      },
      {
        question: "What is the \"option pool shuffle\"?",
        answer:
          "When a priced round includes a new option pool, that pool is typically carved out of the company before the new investor's percentage is calculated — meaning existing shareholders (not the incoming investor) absorb that dilution. This tool models that correctly, which many quick calculators skip.",
      },
      {
        question: "Can I model multiple founders separately?",
        answer:
          "Not directly — \"Founders\" is tracked as one combined line. If you have a known split (e.g., 60/40 between two founders), apply that ratio to the founder percentage shown at any point to find each person's individual stake.",
      },
      {
        question: "Is this a substitute for real cap table software?",
        answer:
          "No — this is a directional modeling tool for understanding dilution mechanics. For your actual cap table, use dedicated software like Carta or Pulley, and involve a startup lawyer for anything you're actually signing.",
      },
    ],
  },
  {
    slug: "tax-deduction-estimator",
    name: "Freelance Tax Deduction & Mileage Expense Estimator",
    tagline: "Turn a mileage log and receipts into an estimated deduction.",
    description:
      "Log business trips and itemized expenses, and get an estimated total tax deduction — mileage is calculated using the correct current IRS rate automatically applied per trip date, and business meals are automatically limited to their 50% deductible portion.",
    category: "finance",
    icon: Car,
    keywords: [
      "mileage deduction calculator",
      "freelance tax deduction calculator",
      "irs mileage rate calculator",
      "self employed tax deduction estimator",
      "business expense deduction calculator",
      "1099 tax deduction calculator",
    ],
    howTo: [
      "Add each business trip with its date, miles driven, and purpose — the correct IRS rate for that date is applied automatically.",
      "Add itemized business expenses by category, description, and amount.",
      "Business meals are automatically capped at 50% deductible, per IRS rules — everything else defaults to fully deductible.",
      "Review your estimated total deduction and copy the summary for your records.",
    ],
    faq: [
      {
        question: "Why does the mileage rate change depending on the date?",
        answer:
          "The IRS occasionally adjusts its standard mileage rate mid-year when fuel costs shift significantly — 2026 is one of those years, with a rate change effective July 1. This tool applies whichever rate was actually in effect for each trip's date, rather than one flat rate for the whole year.",
      },
      {
        question: "Why are business meals only 50% deductible?",
        answer:
          "IRS rules generally limit the deduction for business meals to 50% of the cost, even though the meal itself is a legitimate business expense — this tool applies that limit automatically so your estimate isn't overstated.",
      },
      {
        question: "Is this an official tax filing tool?",
        answer:
          "No — it's a planning estimate, not tax advice or a filing tool. Whether a specific expense actually qualifies as deductible depends on your individual situation; confirm with a tax professional or CPA before filing.",
      },
      {
        question: "Should I use the standard mileage rate or actual vehicle expenses?",
        answer:
          "That depends on your situation — the standard mileage rate (used here) is simpler and often favorable for lower-cost vehicles, while tracking actual expenses (gas, depreciation, repairs) can be better for more expensive or heavily-used vehicles. A tax professional can help you compare both for your specific case.",
      },
    ],
  },
  {
    slug: "equipment-lease-vs-buy",
    name: "Equipment Lease vs. Buy Cash Flow Matrix",
    tagline: "Compare the real, discounted cost of leasing against buying outright.",
    description:
      "Enter equipment cost, useful life, tax rate, and lease terms, and instantly compare the net present value of buying versus leasing — factoring in the depreciation tax shield on a purchase against the after-tax cost of lease payments over your full analysis period.",
    category: "finance",
    icon: Scale,
    keywords: [
      "lease vs buy calculator",
      "equipment financing calculator",
      "lease vs purchase analysis",
      "npv lease calculator",
      "capital expenditure calculator",
      "equipment lease calculator",
    ],
    howTo: [
      "Enter the equipment's purchase cost, useful life, and your effective tax rate.",
      "Enter the monthly lease payment you're being offered for the same equipment.",
      "Set your analysis period and discount rate — the rate you'd otherwise earn or pay on capital.",
      "Compare the two NPV figures — whichever is higher (less negative) is the cheaper option in present-value terms.",
    ],
    faq: [
      {
        question: "What is the \"depreciation tax shield\"?",
        answer:
          "When you buy equipment, depreciating it reduces your taxable income each year, which lowers your tax bill — that tax savings is the \"shield.\" This tool spreads it evenly over the equipment's useful life (straight-line depreciation), which is a simplification of real depreciation schedules like MACRS.",
      },
      {
        question: "Why use net present value instead of just comparing totals?",
        answer:
          "A dollar today is worth more than a dollar in three years, since you could otherwise invest it. NPV discounts future cash flows back to today's dollars using your discount rate, giving a fairer apples-to-apples comparison than simply summing raw totals.",
      },
      {
        question: "Does this account for the equipment's resale value?",
        answer:
          "No — it assumes you keep and fully depreciate the equipment over the analysis period. If you plan to resell it, add the expected resale value as a positive cash flow in your own follow-up analysis.",
      },
      {
        question: "Is this a substitute for advice from an accountant?",
        answer:
          "No — actual depreciation schedules, tax treatment, and financing terms vary by situation and jurisdiction. Use this for directional comparison, and confirm the real numbers with your accountant before committing.",
      },
    ],
  },
  {
    slug: "debt-payoff-planner",
    name: "Debt Snowball vs. Avalanche Repayment Planner",
    tagline: "See exactly how much faster and cheaper avalanche really is.",
    description:
      "Enter your debts with their balances, interest rates, and minimum payments, and instantly get side-by-side payoff timelines for the snowball (smallest balance first) and avalanche (highest interest first) strategies — including total interest paid and months to debt-free for each.",
    category: "finance",
    icon: Snowflake,
    keywords: [
      "debt snowball calculator",
      "debt avalanche calculator",
      "debt payoff calculator",
      "credit card payoff calculator",
      "debt free calculator",
      "debt repayment planner",
    ],
    howTo: [
      "Add each debt with its current balance, interest rate (APR), and minimum monthly payment.",
      "Enter how much extra you can put toward debt each month, beyond the minimums.",
      "Compare the snowball and avalanche timelines side by side — months to payoff and total interest for each.",
      "Copy the full comparison, including payoff order, to reference as you go.",
    ],
    faq: [
      {
        question: "Which strategy actually saves more money?",
        answer:
          "Avalanche (highest interest rate first) almost always saves more in total interest, since it eliminates your most expensive debt fastest. The difference can be small or large depending on how much your interest rates vary across debts.",
      },
      {
        question: "Then why would anyone choose snowball?",
        answer:
          "Snowball (smallest balance first) clears individual debts faster, which some people find more motivating — those quick wins can matter more for actually sticking with a payoff plan than the extra interest saved by avalanche.",
      },
      {
        question: "What happens to a debt's minimum payment once it's paid off?",
        answer:
          "That freed-up minimum payment gets rolled into your extra payment amount and redirected to your next target debt — this \"snowballing\" of payments is what makes both strategies accelerate over time.",
      },
      {
        question: "Does this account for changing interest rates or promotional periods?",
        answer:
          "No — it assumes fixed rates for the full payoff period. If you have a variable-rate card or an intro APR that expires, treat this as a rough estimate rather than an exact timeline.",
      },
    ],
  },
  {
    slug: "home-seller-proceeds",
    name: "Home Seller Proceeds & Closing Cost Estimator",
    tagline: "See exactly what you'll walk away with after selling.",
    description:
      "Enter your sale price, mortgage payoff, agent commission, transfer tax, title fees, and any concessions, and instantly get a clear net proceeds summary — a straightforward closing cost breakdown before you sign anything.",
    category: "finance",
    icon: Home,
    keywords: [
      "home seller proceeds calculator",
      "closing cost calculator seller",
      "net proceeds calculator",
      "home sale calculator",
      "real estate closing costs",
      "seller net sheet calculator",
    ],
    howTo: [
      "Enter your expected sale price and remaining mortgage payoff amount.",
      "Enter your agent's commission rate and your local transfer tax rate.",
      "Add title and escrow fees, plus any seller concessions or repair credits you're offering the buyer.",
      "Read your estimated net proceeds — the amount you'd actually walk away with.",
    ],
    faq: [
      {
        question: "What's a typical agent commission rate?",
        answer:
          "It varies by market and negotiation, but commissions in the roughly 4-6% range (often split between listing and buyer's agents) have historically been common in the US, though this has been shifting — confirm the actual rate with your agent.",
      },
      {
        question: "What are seller concessions?",
        answer:
          "Money or credits a seller agrees to give the buyer as part of the deal — often to help cover the buyer's closing costs or to compensate for needed repairs found during inspection.",
      },
      {
        question: "Does this include capital gains tax?",
        answer:
          "No — capital gains tax on a home sale depends on your cost basis, how long you've owned the property, and exclusions that may apply (like the primary residence exclusion) — this tool doesn't estimate that. Talk to a tax professional about your specific situation.",
      },
      {
        question: "Are transfer taxes the same everywhere?",
        answer:
          "No — transfer tax rates and who pays them (buyer, seller, or split) vary significantly by state and even by county or city. Confirm the actual local rate with your agent or title company.",
      },
    ],
  },
  {
    slug: "nda-builder",
    name: "Mutual Non-Disclosure Agreement (NDA) Clause Builder",
    tagline: "Answer a few questions, get a baseline NDA draft.",
    description:
      "Choose mutual or unilateral, set your term and jurisdiction, and instantly get a structured, plain-text baseline NDA you can copy or download — a starting point to adapt before you actually need to share confidential information with someone.",
    category: "security",
    icon: FileSignature,
    keywords: [
      "nda template generator",
      "mutual nda template",
      "non disclosure agreement generator",
      "free nda template",
      "unilateral nda template",
      "nda builder",
    ],
    howTo: [
      "Choose Mutual (both parties share confidential info) or Unilateral (only one party does).",
      "Enter both party names, the effective date, and how long the agreement should last.",
      "Set your governing jurisdiction and briefly describe the purpose of disclosure.",
      "Copy or download the generated draft, then have both parties (and ideally a lawyer) review it.",
    ],
    faq: [
      {
        question: "What's the difference between mutual and unilateral?",
        answer:
          "A mutual NDA protects information both parties might share with each other — common for partnership or investment discussions. A unilateral NDA protects information flowing in only one direction — common when a company shares confidential details with a single contractor or vendor.",
      },
      {
        question: "Is this legally binding as-is?",
        answer:
          "It's a generic starting-point template, not a finished legal document. Have a lawyer review and adapt it — especially the jurisdiction, term, and definitions — before either party signs it.",
      },
      {
        question: "What should I put for \"purpose of disclosure\"?",
        answer:
          "Be specific enough that it's clear what the agreement covers — e.g., \"evaluating a potential partnership around joint marketing\" rather than something vague like \"business purposes,\" which can weaken enforceability.",
      },
      {
        question: "Can I use this for an employee NDA?",
        answer:
          "This is built for a standalone mutual/unilateral NDA between two parties, not full employment agreements — those typically include additional terms (IP assignment, non-compete, etc.) that a lawyer should draft separately.",
      },
    ],
  },
  {
    slug: "saml-jwt-decoder",
    name: "SAML 2.0 / OAuth Payload Decoder & Visual Inspector",
    tagline: "Paste a token or assertion, see exactly what's inside.",
    description:
      "Paste a JWT or a base64-encoded SAML assertion and instantly get it decoded client-side into a clean, readable JSON or XML view — including human-readable timestamps for exp/iat claims — built for fast SSO troubleshooting.",
    category: "developer",
    icon: KeyRound,
    keywords: [
      "jwt decoder",
      "saml decoder",
      "jwt debugger",
      "saml assertion decoder",
      "oauth token decoder",
      "sso troubleshooting tool",
    ],
    howTo: [
      "Paste a JWT (three dot-separated segments) or a base64-encoded SAML assertion — the type is detected automatically.",
      "For JWTs, review the decoded header and payload, plus human-readable expiry and issued-at times.",
      "For SAML, review the pretty-printed XML structure.",
      "Copy whichever part you need for your troubleshooting or documentation.",
    ],
    faq: [
      {
        question: "Does this verify the token's signature?",
        answer:
          "No — it only decodes the header and payload so you can read their contents. Verifying a signature requires the actual signing secret or public key, which this tool never asks for or has access to.",
      },
      {
        question: "Is my token sent anywhere?",
        answer:
          "No — decoding happens entirely in your browser using standard JavaScript. Nothing you paste is transmitted or logged, which matters given that tokens often contain sensitive session data.",
      },
      {
        question: "Why didn't my SAML assertion decode?",
        answer:
          "This tool handles plain base64-encoded SAML XML (the common HTTP-POST binding format). It doesn't support DEFLATE-compressed SAML used in some HTTP-Redirect binding flows — if your assertion doesn't start with \"<\" after decoding, that's likely why.",
      },
      {
        question: "What do exp, iat, and nbf mean in a JWT?",
        answer:
          "They're standard timestamp claims: iat is when the token was issued, exp is when it expires, and nbf (\"not before\") is when it becomes valid. This tool converts any of these it finds into readable dates automatically.",
      },
    ],
  },
  {
    slug: "retention-schedule-builder",
    name: "GDPR & CCPA Data Retention Schedule Builder",
    tagline: "Turn your data categories into a structured retention schedule.",
    description:
      "Select the types of personal data your site collects — emails, IP addresses, payment logs, and more — and instantly build a structured, tabular data retention schedule with suggested retention periods and legal basis for each category.",
    category: "security",
    icon: Database,
    keywords: [
      "data retention policy generator",
      "gdpr retention schedule",
      "ccpa data retention",
      "data retention schedule template",
      "privacy compliance tool",
      "data retention policy builder",
    ],
    howTo: [
      "Toggle on each category of personal data your site or product actually collects.",
      "Adjust the suggested retention period and legal basis for each category as needed.",
      "Review the generated schedule in table format.",
      "Copy or download it as a starting point for your privacy documentation.",
    ],
    faq: [
      {
        question: "Are these retention periods legally required?",
        answer:
          "No — these are commonly-cited starting points, not fixed legal requirements. GDPR and CCPA both require that you retain data \"no longer than necessary,\" but the specific period depends on your actual business need and any applicable industry regulations.",
      },
      {
        question: "What does \"legal basis\" mean under GDPR?",
        answer:
          "GDPR requires a valid legal basis for processing personal data — common ones include consent, contract performance, legal obligation, and legitimate interest. Each data category should map to the actual basis you're relying on.",
      },
      {
        question: "Is this the same as a privacy policy?",
        answer:
          "No — a retention schedule is an internal (or published) record of how long you keep specific data categories and why. It often supports your privacy policy but isn't a replacement for it — see our Privacy Policy Generator for that.",
      },
      {
        question: "Do I need this if I'm a small business?",
        answer:
          "If you collect any personal data from EU/UK or California residents, having a documented retention approach is good practice regardless of size — though the formality required scales with your risk and data volume. A privacy lawyer can advise on what's appropriate for you.",
      },
    ],
  },
  {
    slug: "csp-generator",
    name: "Content Security Policy (CSP) Header Generator",
    tagline: "Build a valid CSP header by checking off allowed sources.",
    description:
      "Check off allowed script, style, image, and frame origins for each CSP directive, and instantly get a valid, correctly-formatted Content-Security-Policy header — plus real-time warnings when a setting like 'unsafe-inline' would weaken your XSS protection.",
    category: "developer",
    icon: ShieldHalf,
    keywords: [
      "csp generator",
      "content security policy generator",
      "csp header builder",
      "csp header generator",
      "http security headers",
      "csp meta tag generator",
    ],
    howTo: [
      "For each directive (script-src, style-src, img-src, etc.), select which source keywords to allow.",
      "Add any custom domains you need to allow, like a CDN or analytics provider.",
      "Review any warnings — 'unsafe-inline' and 'unsafe-eval' significantly weaken your protection.",
      "Copy the generated header value, or use the meta tag version if you can't set HTTP headers directly.",
    ],
    faq: [
      {
        question: "Should I use the HTTP header or the meta tag?",
        answer:
          "The HTTP header is generally preferred — it's set earlier in page load and supports directives (like frame-ancestors) that meta tags can't. Use the meta tag only if you don't have access to configure server headers.",
      },
      {
        question: "Why does 'unsafe-inline' trigger a warning?",
        answer:
          "Allowing inline scripts or styles defeats much of the point of CSP as an XSS defense, since injected malicious inline code would also be allowed to run. It's sometimes unavoidable for legacy code, but should be scoped as narrowly as possible.",
      },
      {
        question: "What's the difference between default-src and the other directives?",
        answer:
          "default-src is the fallback used for any resource type you haven't explicitly configured with its own directive. Setting specific directives (script-src, img-src, etc.) gives you more precise control and generally overrides the fallback for that resource type.",
      },
      {
        question: "Will this break my site if I get it wrong?",
        answer:
          "A too-strict CSP can silently block scripts, styles, or images from loading. Test thoroughly in a staging environment — many browsers also support a Content-Security-Policy-Report-Only header for testing a policy without enforcing it yet.",
      },
    ],
  },
  {
    slug: "contractor-classifier",
    name: "Independent Contractor vs. Employee Classification Evaluator",
    tagline: "Check the factors, see your misclassification risk.",
    description:
      "Work through common IRS behavioral, financial, and relationship factors used to distinguish employees from independent contractors, and get a misclassification risk score with a category-by-category breakdown — a starting point before you finalize how you classify a worker.",
    category: "business",
    icon: Users,
    keywords: [
      "employee vs contractor test",
      "worker classification test",
      "irs 20 factor test",
      "1099 vs w2 test",
      "misclassification risk calculator",
      "independent contractor test",
    ],
    howTo: [
      "Go through each factor and toggle it on if it accurately describes the working relationship.",
      "Review your misclassification risk score and which category (behavioral, financial, relationship) is driving it.",
      "Copy the breakdown to document your reasoning or discuss with HR/legal counsel.",
      "Re-run it whenever the working relationship changes meaningfully.",
    ],
    faq: [
      {
        question: "Is this the same test the IRS uses?",
        answer:
          "It's based on the same general categories the IRS common-law test considers (behavioral control, financial control, relationship of the parties), but it's a simplified checklist, not the official IRS determination process — which involves a more holistic, fact-specific analysis.",
      },
      {
        question: "What is the \"ABC test\" mentioned in the disclaimer?",
        answer:
          "Several states (California notably, via AB5) use a stricter three-part \"ABC test\" where a worker is presumed to be an employee unless the company can prove all three specific conditions — it applies regardless of what a contract says, and can classify workers as employees even when the IRS factors here would lean contractor.",
      },
      {
        question: "What happens if I misclassify a worker?",
        answer:
          "Consequences can include back taxes, penalties, unpaid overtime or benefits claims, and in some cases personal liability for company officers — the specifics depend on jurisdiction and how the misclassification is discovered.",
      },
      {
        question: "Can one factor alone determine classification?",
        answer:
          "Generally no — classification is meant to be a holistic look at the whole relationship, not a single deciding factor. This tool's score reflects an overall pattern, not a single-factor verdict.",
      },
    ],
  },
  {
    slug: "downtime-cost-estimator",
    name: "Server Outage Downtime & Revenue Loss Estimator",
    tagline: "Turn outage minutes into a real dollar figure.",
    description:
      "Enter your hourly transaction volume, average order value, and idled employee costs, and instantly calculate the true financial damage of an outage — in total and per minute — based on exactly how long it lasted.",
    category: "business",
    icon: ServerCrash,
    keywords: [
      "downtime cost calculator",
      "outage cost calculator",
      "revenue loss calculator",
      "server downtime calculator",
      "cost of downtime calculator",
      "incident cost estimator",
    ],
    howTo: [
      "Enter your typical hourly transaction volume and average order or cart value.",
      "Set the conversion impact percentage — 100% if the outage blocks all transactions entirely.",
      "Add how many employees were idled and their average hourly wage.",
      "Enter the actual outage duration to get your total estimated cost.",
    ],
    faq: [
      {
        question: "What does \"conversion impact\" mean?",
        answer:
          "It's the percentage of normal transaction volume actually lost during the outage. Use 100% for a full outage where no transactions can complete; use a lower number for a partial degradation where some traffic still converts.",
      },
      {
        question: "Should I include support/customer service costs?",
        answer:
          "You can factor them into the \"employees idled\" and wage fields if support staff are actively working the incident rather than serving customers normally — otherwise this tool focuses on the direct revenue and labor impact.",
      },
      {
        question: "Does this include reputational or churn costs?",
        answer:
          "No — this estimates direct, immediate financial impact only. Customer trust erosion and potential churn from a bad outage are real but much harder to quantify, and aren't included here.",
      },
      {
        question: "Is this useful for a post-incident report?",
        answer:
          "Yes — the copyable summary gives you a quick, defensible dollar figure to include when communicating impact to leadership, which is often more persuasive than describing an outage in purely technical terms.",
      },
    ],
  },
  {
    slug: "brand-name-search",
    name: "Brand Name Phonetic & Trademark Search Builder",
    tagline: "Generate the variants you should actually search for.",
    description:
      "Enter a proposed brand name and instantly get phonetic variations, character-swap and lookalike spellings, and wildcard-style search terms — a starting checklist to run through trademark databases before you fall in love with a name.",
    category: "marketing",
    icon: Fingerprint,
    keywords: [
      "trademark search tool",
      "brand name generator",
      "trademark availability checker",
      "phonetic name search",
      "business name search tool",
      "brand name checker",
    ],
    howTo: [
      "Enter your proposed brand name.",
      "Review the phonetic variants — names that sound similar when spoken.",
      "Review the lookalike variants — common character swaps and near-misses.",
      "Copy all the generated terms and run each one through the actual trademark databases you're checking.",
    ],
    faq: [
      {
        question: "Does this check trademark availability for me?",
        answer:
          "No — it only generates the search terms you should check. You still need to run these through the actual databases (USPTO's trademark search system, your country's equivalent, or WIPO's Global Brand Database for international marks).",
      },
      {
        question: "Why does the tool mention USPTO's TESS system being retired?",
        answer:
          "USPTO retired its older TESS search tool in 2023 in favor of a newer system with different, regex-based search syntax. If you see older guides referencing TESS wildcard syntax specifically, treat it as outdated and check the current system's own search help instead.",
      },
      {
        question: "Is a phonetic or lookalike match automatically a trademark conflict?",
        answer:
          "No — trademark conflict depends on likelihood of confusion in the marketplace, which considers the specific goods/services, industry, and more, not just spelling or sound similarity. This tool just helps you cast a wider net during initial research.",
      },
      {
        question: "Should I still hire a trademark attorney?",
        answer:
          "Yes, especially before you actually file or invest heavily in a name — a proper clearance search and legal opinion catches conflicts far beyond what a self-search tool like this can surface.",
      },
    ],
  },
  {
    slug: "pricing-margin-matrix",
    name: "Product Pricing & Target Profit Margin Matrix",
    tagline: "Solve for the exact price that hits your target margin.",
    description:
      "Enter your cost of goods, target profit margin, ad acquisition cost target, and payment gateway fees, and instantly get the precise retail price required to hit your margin after every cost is accounted for — not just a rough markup guess.",
    category: "finance",
    icon: Tag,
    keywords: [
      "pricing calculator",
      "profit margin calculator",
      "retail price calculator",
      "markup calculator",
      "target margin pricing",
      "product pricing calculator",
    ],
    howTo: [
      "Enter your cost of goods sold (COGS) per unit.",
      "Set your target profit margin as a percentage.",
      "Enter your target ad acquisition cost (CPA) per sale, and your payment gateway's fee structure.",
      "Read the exact price required, along with your true net profit per sale after everything.",
    ],
    faq: [
      {
        question: "Why isn't this just COGS divided by (1 - margin)?",
        answer:
          "That simpler formula ignores payment processing fees and ad acquisition costs, both of which scale with the final price or apply per sale — leaving them out understates the price you actually need to hit your real target margin.",
      },
      {
        question: "What if I don't run paid ads for this product?",
        answer:
          "Set the ad CPA target to 0 — the calculation still works, and the required price will reflect just COGS, fees, and your target margin.",
      },
      {
        question: "What's a typical payment gateway fee?",
        answer:
          "Many card processors charge around 2.9% plus a small fixed fee (often around $0.30) per transaction, though rates vary by provider, volume, and payment method — check your actual processor's rate.",
      },
      {
        question: "Does this account for shipping costs?",
        answer:
          "Not directly — if you absorb shipping cost into your product price rather than charging it separately, add it into your COGS figure so it's reflected in the required price.",
      },
    ],
  },
  {
    slug: "safe-zone-visualizer",
    name: "Social Media Video Ad Safe Zone Overlay Visualizer",
    tagline: "See exactly where TikTok, Reels, and Shorts UI blocks your video.",
    description:
      "Preview your vertical video creative against approximate safe-zone overlays for TikTok, Instagram Reels, and YouTube Shorts, plus a combined view showing the zone that clears all three platforms' UI at once — so captions, faces, and CTAs never end up hidden behind buttons.",
    category: "marketing",
    icon: Video,
    isNew: true,
    keywords: [
      "tiktok safe zone",
      "reels safe zone",
      "youtube shorts safe zone",
      "vertical video template",
      "social media ad safe zone",
      "9:16 video safe zone",
    ],
    howTo: [
      "Optionally upload a still frame or cover image from your video.",
      "Switch between TikTok, Reels, and Shorts to see each platform's approximate blocked zones.",
      "Use \"All 3 (combined)\" to see the single safe zone that clears every platform at once.",
      "Keep captions, faces, and calls-to-action inside the dashed green boundary.",
    ],
    faq: [
      {
        question: "Are these exact pixel-perfect safe zones?",
        answer:
          "No — they're rounded, illustrative approximations based on commonly published guidance. Different sources cite slightly different exact numbers, and all three platforms update their UI overlays periodically, so always preview your actual export inside the real app before finalizing paid creative.",
      },
      {
        question: "Why is the bottom zone so much bigger than the top?",
        answer:
          "Captions, sound/audio attribution, and (on Reels and Shorts especially) creator info and subscribe buttons stack up at the bottom of the frame — that's consistently the most crowded zone across all three platforms.",
      },
      {
        question: "Should I always design for the combined zone?",
        answer:
          "Only if you're repurposing one video across all three platforms. If you're creating platform-specific creative, using each platform's individual (larger) safe zone gives you more usable frame space.",
      },
      {
        question: "Does my uploaded image get sent anywhere?",
        answer:
          "No — it's read directly in your browser and never uploaded to a server.",
      },
    ],
  },
  {
    slug: "quality-score-estimator",
    name: "Google Ads Quality Score Breakdown & Cost Estimator",
    tagline: "See how your three Quality Score components affect what you actually pay.",
    description:
      "Rate your Expected CTR, Ad Relevance, and Landing Page Experience, and get an estimated Quality Score along with its likely relative CPC impact — grounded in Google's documented Ad Rank formula, where cost scales inversely with Quality Score.",
    category: "marketing",
    icon: Gauge,
    isNew: true,
    keywords: [
      "google ads quality score",
      "quality score calculator",
      "cpc calculator google ads",
      "expected ctr quality score",
      "ad rank calculator",
      "google ads cost estimator",
    ],
    howTo: [
      "Rate each of the three components — Expected CTR, Landing Page Experience, Ad Relevance — as shown in your Google Ads account.",
      "Review your estimated Quality Score and its relative CPC impact versus an average advertiser.",
      "Optionally enter your current average CPC to see projected costs at different Quality Score levels.",
      "Use the projection table to see how much improving your score could realistically save.",
    ],
    faq: [
      {
        question: "Is this Google's actual Quality Score formula?",
        answer:
          "No — Google doesn't publish its exact formula or component weights. This estimate uses commonly-cited third-party weightings for the three components, and models the cost relationship using Google's own documented Ad Rank formula (bid × Quality Score), which implies cost scales inversely with your score.",
      },
      {
        question: "Why does cost scale inversely with Quality Score?",
        answer:
          "Because Ad Rank = Bid × Quality Score, two advertisers achieving the same Ad Rank (and therefore the same ad position) must have bids that are inversely proportional to their Quality Scores — a higher score lets you bid less for the same position.",
      },
      {
        question: "Does the exact percentage shown actually apply to my account?",
        answer:
          "Treat it as directional. Real auctions also depend on competitor bids, ad rank thresholds, and other factors Google doesn't fully disclose — this shows the shape of the relationship, not a guaranteed dollar figure.",
      },
      {
        question: "Which component should I prioritize improving?",
        answer:
          "Google has stated Expected CTR is generally weighted most heavily of the three, which lines up with the commonly-cited third-party weightings used here — testing ad copy to improve CTR is often the highest-leverage place to start.",
      },
    ],
  },
  {
    slug: "influencer-rate-calculator",
    name: "Influencer Sponsorship Rate & Gifted Campaign Calculator",
    tagline: "Get a defensible starting rate before you negotiate.",
    description:
      "Enter your platform, follower count, engagement rate, niche, and deliverables, and get an illustrative baseline sponsorship rate built from commonly-cited industry pricing patterns — including volume discounts for multi-post packages and add-ons for usage rights or exclusivity.",
    category: "marketing",
    icon: Handshake,
    isNew: true,
    keywords: [
      "influencer rate calculator",
      "sponsored post pricing",
      "influencer pricing calculator",
      "creator rate card",
      "gifted collaboration calculator",
      "instagram sponsorship rate",
    ],
    howTo: [
      "Enter your follower count and engagement rate, then pick your platform/format and niche.",
      "Set how many deliverables are in the package — 3 or more typically earns a bulk discount.",
      "Toggle on usage rights or exclusivity if the brand is asking for either.",
      "Copy the rate breakdown to reference while negotiating.",
    ],
    faq: [
      {
        question: "Is this the exact rate I should charge?",
        answer:
          "No — it's an illustrative baseline built from commonly-cited industry rules of thumb, not a guaranteed market rate. Actual rates vary widely by negotiation, brand budget, and relationship history. Use it as a starting point for a conversation, not a final number.",
      },
      {
        question: "Why does engagement rate matter so much?",
        answer:
          "Two accounts with the same follower count can have very different actual reach — an account with above-benchmark engagement for its size is generally worth more per follower, and this tool adjusts the baseline rate accordingly.",
      },
      {
        question: "What counts as \"usage rights\" or \"whitelisting\"?",
        answer:
          "Usage rights let the brand reuse your content in their own marketing (website, email, other social accounts) beyond the original post. Whitelisting specifically lets them run ads through your account/handle. Both are common asks that go beyond a standard sponsored post and are usually priced separately.",
      },
      {
        question: "Should nano influencers accept gifted-only deals?",
        answer:
          "That's a personal call — gifted-only collaborations are common at smaller follower counts, but if your engagement or niche adds real value, you're not obligated to accept unpaid work. The calculated rate is a useful reference point either way.",
      },
    ],
  },
  {
    slug: "sitemap-builder",
    name: "XML Sitemap Priority & Changefreq Tag Builder",
    tagline: "Turn a list of URLs into a valid sitemap.xml instantly.",
    description:
      "Paste a list of URLs and get a valid sitemap.xml file with priority and changefreq values auto-assigned based on URL depth — fully editable per entry, with validation for malformed URLs before you download or copy the final markup.",
    category: "developer",
    icon: Map,
    isNew: true,
    keywords: [
      "xml sitemap generator",
      "sitemap builder",
      "sitemap.xml generator",
      "changefreq priority tags",
      "sitemap creator tool",
      "sitemaps.org generator",
    ],
    howTo: [
      "Paste your list of URLs, one per line, and click \"Generate entries.\"",
      "Review the auto-assigned priority and changefreq for each — shallower URLs get higher priority by default.",
      "Edit any entry's date, changefreq, or priority manually if needed.",
      "Copy the generated XML or download it directly as sitemap.xml.",
    ],
    faq: [
      {
        question: "Does priority or changefreq affect my Google ranking?",
        answer:
          "No — Google has stated it ignores both values for ranking and crawling decisions. They're valid per the sitemap protocol and some other search engines or crawlers may still use them, but don't expect tweaking these numbers to move your rankings.",
      },
      {
        question: "How is priority auto-assigned?",
        answer:
          "By URL depth: your homepage gets 1.0, top-level pages (like /pricing) get 0.8, and deeper nested pages get progressively lower values. This is a reasonable heuristic, not a requirement — edit any value you disagree with.",
      },
      {
        question: "What if a URL is invalid?",
        answer:
          "Invalid URLs are flagged in red and automatically excluded from the generated XML output, so a typo doesn't silently produce a broken sitemap.",
      },
      {
        question: "Is there a limit to how many URLs a sitemap can hold?",
        answer:
          "Per the sitemap protocol, a single sitemap file should contain no more than 50,000 URLs and be no larger than 50MB uncompressed — larger sites use a sitemap index file that links to multiple individual sitemaps.",
      },
    ],
  },
  {
    slug: "spf-dkim-validator",
    name: "SPF & DKIM Email Record Syntax Validator",
    tagline: "Catch email authentication errors before they cause deliverability problems.",
    description:
      "Paste a raw SPF or DKIM DNS record and get instant, client-side validation against the actual RFC standards — including the critical 10-DNS-lookup SPF limit, missing required tags, malformed IP addresses, and invalid base64 in DKIM public keys.",
    category: "developer",
    icon: MailCheck,
    isNew: true,
    keywords: [
      "spf record checker",
      "dkim record validator",
      "spf syntax checker",
      "dkim syntax validator",
      "email authentication checker",
      "spf 10 lookup limit",
    ],
    howTo: [
      "Switch between SPF and DKIM depending on which record you're checking.",
      "Paste the raw TXT record value exactly as published in your DNS.",
      "Review any errors (must fix) and warnings (worth checking) listed below.",
      "For SPF, watch your DNS lookup count — exceeding 10 causes a hard failure.",
    ],
    faq: [
      {
        question: "Why does the 10-lookup limit matter so much for SPF?",
        answer:
          "RFC 7208 caps the number of DNS-lookup-causing mechanisms (include, a, mx, ptr, exists) at 10. Exceeding it doesn't just weaken your SPF — it causes a permanent error, which many mail providers treat as an outright SPF failure for all your mail, not just a warning.",
      },
      {
        question: "What does an empty \"p=\" tag mean in DKIM?",
        answer:
          "An empty p= tag is a documented way to intentionally revoke a DKIM key while keeping the DNS record in place — it's flagged as a warning here rather than an error, since it may be deliberate.",
      },
      {
        question: "Does this actually query my DNS records?",
        answer:
          "No — you paste in the record value yourself, and everything is validated locally in your browser. This tool checks syntax and structure, not whether the record is actually published correctly in your live DNS.",
      },
      {
        question: "Why does the \"ptr\" mechanism get flagged?",
        answer:
          "The \"ptr\" mechanism is explicitly discouraged in RFC 7208 itself due to its unreliability and the extra DNS load it creates — most modern SPF guidance recommends avoiding it entirely.",
      },
    ],
  },
  {
    slug: "url-stripper",
    name: "URL Parameter Stripper",
    tagline: "Strip tracking params from any link, keep the ones that matter.",
    description:
      "Paste a cluttered affiliate, ad, or shared URL and this tool auto-detects known tracking parameters — UTM tags, fbclid, gclid, and more — so you can strip them out while keeping the core path and any parameters you actually need.",
    category: "marketing",
    icon: Scissors,
    isNew: true,
    keywords: [
      "url stripper",
      "remove utm parameters",
      "clean tracking link",
      "strip tracking url",
      "remove fbclid",
      "remove gclid",
      "clean affiliate link",
      "url parameter remover",
    ],
    howTo: [
      "Paste any URL with query parameters into the input box.",
      "Known tracking parameters (UTM tags, fbclid, gclid, and similar) are flagged and marked for removal automatically.",
      "Toggle any parameter on or off if you want to keep or strip it manually.",
      "Copy the cleaned link once it looks right.",
    ],
    faq: [
      {
        question: "Does this send my URL anywhere?",
        answer:
          "No — everything runs locally in your browser. The URL is never sent to a server, so it's safe to use on private or unpublished links.",
      },
      {
        question: "How does it decide which parameters are tracking params?",
        answer:
          "It checks against a list of well-known tracking parameters used by ad platforms, email tools, and social apps — things like utm_source, fbclid, gclid, and msclkid — but you can override any suggestion with the toggle next to each parameter.",
      },
      {
        question: "Will this break my link?",
        answer:
          "Stripping tracking parameters doesn't affect where a URL points to — those parameters are read by analytics scripts, not by routing. The page itself will load exactly the same.",
      },
    ],
  },
  {
    slug: "curl-converter",
    name: "cURL to Fetch / Axios / Python Converter",
    tagline: "Turn a cURL command into ready-to-run fetch, Axios, or Python code.",
    description:
      "Paste a raw cURL command — copied from your terminal or a browser's \"Copy as cURL\" — and get it instantly converted into JavaScript fetch(), Axios, or Python requests code, with headers, body, and basic auth carried over.",
    category: "developer",
    icon: Terminal,
    isNew: true,
    keywords: [
      "curl converter",
      "curl to fetch",
      "curl to axios",
      "curl to python",
      "curl to requests",
      "convert curl command",
      "curl command parser",
    ],
    howTo: [
      "Paste a cURL command — from your terminal history or a browser's \"Copy as cURL\" option.",
      "Choose the target: fetch, Axios, or Python requests.",
      "Copy the generated code and drop it straight into your project.",
    ],
    faq: [
      {
        question: "Does this send my request anywhere?",
        answer:
          "No — the command is only parsed and converted locally in your browser. Nothing is sent over the network, so it's safe to paste commands containing real API keys or tokens.",
      },
      {
        question: "What cURL flags are supported?",
        answer:
          "The common ones: -X/--request, -H/--header, -d/--data (and its variants), -u/--user for basic auth, -b/--cookie, -A/--user-agent, and -G/--get for converting data into query params. Less common flags are safely ignored rather than breaking the parse.",
      },
      {
        question: "Why does the output include a Content-Type header I didn't specify?",
        answer:
          "When cURL sends a request body with -d and no explicit Content-Type, it defaults to application/x-www-form-urlencoded — this tool mirrors that same default so the generated code behaves identically to the original command.",
      },
    ],
  },
  {
    slug: "sql-formatter",
    name: "SQL Query Formatter",
    tagline: "Turn messy, single-line SQL into clean, readable queries.",
    description:
      "Paste a cramped or single-line SQL query and get it reformatted into clean, multi-line SQL with uppercase keywords, one column per line, and clauses broken out — or collapse it back into a single line to paste into a config or log statement.",
    category: "developer",
    icon: DatabaseZap,
    isNew: true,
    keywords: [
      "sql formatter",
      "sql beautifier",
      "format sql query",
      "sql pretty print",
      "sql minify",
      "sql syntax formatter",
    ],
    howTo: [
      "Paste any raw or single-line SQL query into the input box.",
      "The formatted version — uppercase keywords, one item per line — appears instantly on the right.",
      "Copy the formatted version, or the single-line version if you need to paste it somewhere compact.",
    ],
    faq: [
      {
        question: "Does this run or validate my query against a real database?",
        answer:
          "No — it only reformats the text of the query locally in your browser. It doesn't connect to any database, and it doesn't check whether the query is actually valid SQL for a specific database engine.",
      },
      {
        question: "Does it handle string literals containing commas or SQL keywords?",
        answer:
          "Yes — text inside quotes is treated as a literal value and left untouched, so a value like 'Smith, John' or '%SELECT%' won't get split or re-cased by mistake.",
      },
      {
        question: "Will it perfectly format deeply nested subqueries?",
        answer:
          "It formats the outer query's clauses cleanly, but content inside parentheses (subqueries, function calls) is kept on a single line rather than recursively reformatted — this keeps the tool predictable for everyday queries.",
      },
    ],
  },
  {
    slug: "yaml-json-converter",
    name: "YAML to JSON Converter",
    tagline: "Convert configs between YAML and JSON, both directions, instantly.",
    description:
      "Paste YAML and get clean, indented JSON — or paste JSON and get readable YAML back. Handles nested mappings, sequences, inline flow collections, and common scalar types, all converted locally in your browser.",
    category: "developer",
    icon: RefreshCw,
    isNew: true,
    keywords: [
      "yaml to json",
      "json to yaml",
      "yaml converter",
      "yaml parser",
      "convert yaml",
      "config file converter",
    ],
    howTo: [
      "Pick a direction: YAML to JSON, or JSON to YAML.",
      "Paste your config in the left box.",
      "Copy the converted result from the right box — it updates as you type.",
    ],
    faq: [
      {
        question: "Is my config sent anywhere?",
        answer:
          "No — parsing and conversion both happen locally in your browser. Nothing is uploaded, so it's safe to paste configs containing internal hostnames or credentials.",
      },
      {
        question: "What YAML features are supported?",
        answer:
          "Nested mappings and sequences, sequences of mappings (the common \"- name: value\" list-of-objects pattern), inline flow collections like [a, b, c] and {a: 1, b: 2}, quoted and unquoted strings, numbers, booleans, and null. Anchors, aliases, and multi-document files aren't supported.",
      },
      {
        question: "Why did my unquoted \"yes\" or \"no\" stay a string instead of becoming a boolean?",
        answer:
          "This tool follows the modern YAML 1.2 core schema, where only true/false are booleans — older YAML 1.1 tools also treated yes/no/on/off as booleans, which caused the infamous problem of country code \"NO\" (Norway) silently becoming false. Sticking to true/false avoids that trap.",
      },
    ],
  },
  {
    slug: "aspect-ratio-calculator",
    name: "CSS Aspect Ratio Calculator",
    tagline: "Get the simplified ratio, decimal value, and ready-to-use CSS.",
    description:
      "Enter any width and height and get the simplified aspect ratio, its decimal value, the modern CSS aspect-ratio property, and the legacy padding-top percentage fallback for older browser support — all generated instantly.",
    category: "developer",
    icon: Ratio,
    isNew: true,
    keywords: [
      "aspect ratio calculator",
      "css aspect-ratio",
      "padding-top hack",
      "responsive image ratio",
      "aspect ratio to percentage",
    ],
    howTo: [
      "Enter a width and height in pixels, or pick a common ratio preset.",
      "The simplified ratio, decimal ratio, and padding-top percentage are calculated instantly.",
      "Copy the modern aspect-ratio CSS, or the legacy padding-top fallback for wider browser support.",
    ],
    faq: [
      {
        question: "When do I need the legacy padding-top fallback instead of aspect-ratio?",
        answer:
          "The CSS aspect-ratio property is supported in all current major browsers, but the padding-top percentage trick still shows up in older codebases and in projects that need to support very old browser versions — this tool gives you both so you can pick what fits your target support.",
      },
      {
        question: "Why is the padding-top percentage based on width, not height?",
        answer:
          "Percentage padding in CSS is always calculated relative to the containing block's width, even padding-top — that's the quirk the classic \"padding-top hack\" exploits to reserve vertical space before an image or iframe loads.",
      },
      {
        question: "Does this resize or crop my actual image?",
        answer:
          "No — this only calculates ratios and generates CSS. It doesn't process any image file; you'd pair the generated CSS with your own image using object-fit: cover, as shown in the legacy snippet.",
      },
    ],
  },
  {
    slug: "git-command-builder",
    name: "Git Command Builder",
    tagline: "Pick what you're trying to do — get the exact Git command.",
    description:
      "Stop guessing flag combinations. Pick a common scenario — undoing a commit, renaming a branch, squashing history, force-pushing safely — fill in the blanks, and get the exact Git command to run, copy-ready.",
    category: "developer",
    icon: GitBranch,
    isNew: true,
    keywords: [
      "git command builder",
      "git cheat sheet",
      "git commands generator",
      "undo git commit",
      "git reset vs revert",
      "force push with lease",
    ],
    howTo: [
      "Pick the scenario closest to what you're trying to do, grouped by category on the left.",
      "Fill in any blanks — branch names, commit hashes, file paths.",
      "Copy the generated command and run it in your terminal.",
    ],
    faq: [
      {
        question: "Does this run any commands for me?",
        answer:
          "No — it only builds the command text locally in your browser. Nothing is executed; you copy the result and run it yourself in your own terminal.",
      },
      {
        question: "What's the difference between git reset --hard and git revert?",
        answer:
          "git reset --hard rewrites history by removing commits entirely — risky on a branch others have already pulled. git revert adds a new commit that undoes an earlier one, leaving history intact, which is why it's the safer choice for shared branches.",
      },
      {
        question: "Why use --force-with-lease instead of --force?",
        answer:
          "A plain --force push overwrites whatever is on the remote, even if a teammate pushed new commits since you last fetched. --force-with-lease refuses to push if the remote has moved unexpectedly, protecting you from silently overwriting someone else's work.",
      },
    ],
  },
  {
    slug: "docker-compose-formatter",
    name: "Docker Compose Formatter & Inspector",
    tagline: "Catch deprecated syntax, bad indentation, and misconfigured services.",
    description:
      "Paste a docker-compose.yml file and get it checked for common problems — deprecated top-level version keys, tabs where YAML needs spaces, inconsistent indentation, services missing image or build, legacy links usage — plus a cleaned, re-indented copy of the file.",
    category: "developer",
    icon: Container,
    isNew: true,
    keywords: [
      "docker compose formatter",
      "docker compose validator",
      "compose file linter",
      "docker compose syntax checker",
      "compose version deprecated",
    ],
    howTo: [
      "Paste your docker-compose.yml contents into the input box.",
      "Review the issues list — errors block Compose from running, warnings and info items are worth a look.",
      "Copy the cleaned, consistently indented YAML from the output box.",
    ],
    faq: [
      {
        question: "Does this actually run Docker or validate against my installed Compose version?",
        answer:
          "No — everything happens locally in your browser by parsing the YAML structure. It doesn't run docker compose config or connect to Docker at all, so it won't catch things like an image that doesn't exist or a build context that's missing.",
      },
      {
        question: "Why is the version key flagged as deprecated?",
        answer:
          "The Compose Specification that modern Docker Compose (v2) follows merged the old versioned schemas into one, and the top-level version field is now ignored — Compose infers the format automatically. Docker's own documentation recommends removing it from new files.",
      },
      {
        question: "Why do tabs matter in a Compose file?",
        answer:
          "Compose files are YAML underneath, and the YAML spec disallows tab characters for indentation entirely — a file with a tab in its indentation will fail to parse rather than just looking slightly off.",
      },
    ],
  },
  {
    slug: "regex-log-extractor",
    name: "Regex Log Extractor",
    tagline: "Turn raw log lines into a clean, exportable table.",
    description:
      "Paste server access logs or any line-based text, write a regex with named capture groups, and get a structured table back — one row per matching line, one column per group — ready to export as CSV or JSON.",
    category: "developer",
    icon: Regex,
    isNew: true,
    keywords: [
      "regex log extractor",
      "log parser",
      "extract data from logs",
      "regex to csv",
      "named capture groups",
      "server log parser",
    ],
    howTo: [
      "Paste your log lines or raw text, one record per line.",
      "Write a regular expression with named groups like (?<ip>\\S+) for each field you want as a column.",
      "Review the extracted table, then copy it as CSV or JSON.",
    ],
    faq: [
      {
        question: "What happens to lines that don't match?",
        answer:
          "They're simply skipped and don't appear in the table — the match counter above the table shows how many of the total lines matched, so you can spot if your pattern is too narrow.",
      },
      {
        question: "Do I have to use named groups?",
        answer:
          "No — if your pattern has plain capturing groups without names, columns are labeled group1, group2, and so on. If it has no capturing groups at all, the whole match is used as a single \"match\" column.",
      },
      {
        question: "Is my log data uploaded anywhere?",
        answer:
          "No — matching and extraction both run locally in your browser using JavaScript's built-in regex engine. Nothing is sent to a server, which matters if your logs contain IPs, tokens, or other sensitive values.",
      },
    ],
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    tagline: "See exactly what changed between two blocks of text.",
    description:
      "Paste two versions of anything — a paragraph, a config file, a contract clause — and see the differences highlighted at the line, word, or character level, with an added/removed count for each.",
    category: "developer",
    icon: Diff,
    isNew: true,
    keywords: [
      "text diff checker",
      "compare two texts",
      "diff tool",
      "word diff",
      "line diff",
      "text comparison online",
    ],
    howTo: [
      "Paste the original text on the left and the changed version on the right.",
      "Pick a granularity — line, word, or character — depending on how fine-grained you need the comparison.",
      "Additions and removals are highlighted instantly as you edit either side.",
    ],
    faq: [
      {
        question: "What's the difference between line, word, and character mode?",
        answer:
          "Line mode treats each line as a unit — if even one word changes, the whole line shows as removed and re-added. Word mode highlights just the changed words within otherwise identical text, and character mode goes finer still, down to individual letters.",
      },
      {
        question: "Is there a size limit?",
        answer:
          "Very large pastes fall back to a simplified view rather than a detailed diff, since precise character-level comparison gets computationally expensive on huge inputs. Line and word mode comfortably handle much larger text than character mode.",
      },
      {
        question: "Is my text uploaded anywhere?",
        answer:
          "No — the comparison runs entirely in your browser. Nothing you paste is sent to a server, which matters if you're comparing contract drafts or other sensitive text.",
      },
    ],
  },
  {
    slug: "podcast-file-size-estimator",
    name: "Podcast File Size & Bitrate Estimator",
    tagline: "Know your export size before you hit render.",
    description:
      "Enter your episode's duration, channel layout, and export settings to estimate the final file size — for compressed MP3/AAC exports or uncompressed WAV masters — plus the bandwidth a batch of downloads would use.",
    category: "utility",
    icon: Podcast,
    isNew: true,
    keywords: [
      "podcast file size calculator",
      "audio bitrate calculator",
      "mp3 file size estimator",
      "podcast bandwidth calculator",
      "mono vs stereo podcast",
    ],
    howTo: [
      "Enter your episode's duration in hours, minutes, and seconds.",
      "Choose mono or stereo, and your export format — MP3, AAC, or WAV.",
      "Pick a bitrate (for MP3/AAC) or sample rate and bit depth (for WAV) to see the estimated file size.",
    ],
    faq: [
      {
        question: "Does channel layout change the file size for MP3 or AAC?",
        answer:
          "Not directly — a bitrate like 128 kbps already refers to the whole encoded stream, so mono and stereo files at the same bitrate come out the same size. What mono buys you is quality: at a given bitrate, a mono file gets the full bit budget for a single channel instead of splitting it across two, so spoken-word podcasts typically sound just as good at half the bitrate in mono.",
      },
      {
        question: "Why is my WAV export so much bigger than my MP3?",
        answer:
          "WAV stores every sample uncompressed, so its size is driven by sample rate, bit depth, and channel count rather than a target bitrate — a 45-minute stereo WAV at 44.1kHz/16-bit can easily be 15-20x larger than the same episode exported as 96 kbps MP3.",
      },
      {
        question: "Is this exact, down to the byte?",
        answer:
          "It's a close estimate based on the raw bitrate math — actual exported files vary slightly depending on your encoder, any variable bitrate settings, and embedded metadata like cover art or ID3 tags.",
      },
    ],
  },
  {
    slug: "csv-duplicate-cleaner",
    name: "CSV Duplicate Row Cleaner",
    tagline: "Find and remove duplicate rows, based on whichever columns matter.",
    description:
      "Drop in a CSV file and choose which columns define a duplicate — a full-row match, or just a subset like name and email. See exactly which rows get removed, then download or copy the cleaned result.",
    category: "business",
    icon: FileSpreadsheet,
    isNew: true,
    keywords: [
      "csv duplicate remover",
      "remove duplicate rows csv",
      "csv cleaner",
      "dedupe csv",
      "csv deduplication tool",
    ],
    howTo: [
      "Drop a CSV file, or paste its contents directly into the text box.",
      "Turn off any columns that shouldn't count toward a match — for example, a unique row ID.",
      "Review the duplicate count, then download or copy the cleaned CSV.",
    ],
    faq: [
      {
        question: "Which row does it keep when there are duplicates?",
        answer:
          "The first occurrence of each unique combination is kept, and every row after it that matches on the selected columns is treated as a duplicate and removed.",
      },
      {
        question: "Is my data uploaded anywhere?",
        answer:
          "No — parsing and deduplication both happen locally in your browser using JavaScript. Your file never leaves your device, which matters for customer lists or other sensitive data.",
      },
      {
        question: "Does it handle fields with commas or quotes inside them?",
        answer:
          "Yes — it follows standard CSV quoting rules, so a field like \"Smith, John\" wrapped in quotes is parsed as a single value rather than being split at the comma.",
      },
    ],
  },
  {
    slug: "stream-bitrate-matrix",
    name: "Twitch & YouTube Stream Bitrate Matrix",
    tagline: "The right OBS bitrate for your resolution, frame rate, and upload speed.",
    description:
      "Pick your streaming platform, target resolution, and frame rate, and get a recommended video and audio bitrate along with keyframe interval, rate control, and profile settings for OBS — checked against your actual tested upload speed.",
    category: "marketing",
    icon: Radio,
    isNew: true,
    keywords: [
      "obs bitrate calculator",
      "twitch bitrate settings",
      "youtube live bitrate",
      "streaming bitrate calculator",
      "obs encoder settings",
    ],
    howTo: [
      "Pick your platform (Twitch or YouTube), target resolution, and frame rate.",
      "Enter your tested upload speed — run a speed test first, not just your plan's advertised speed.",
      "Copy the recommended bitrate and encoder settings into OBS.",
    ],
    faq: [
      {
        question: "Why is Twitch's bitrate capped lower than YouTube's at the same resolution?",
        answer:
          "Twitch enforces a lower general bitrate ceiling than YouTube Live across most of its infrastructure, regardless of resolution, while YouTube's guidelines scale bitrate more steeply with resolution and frame rate. These limits can change over time, so it's worth checking each platform's current broadcaster documentation for the latest numbers.",
      },
      {
        question: "Why leave headroom below my tested upload speed?",
        answer:
          "Home internet upload speed fluctuates — background uploads, other devices, and ISP variance can all eat into it mid-stream. Keeping your total stream bitrate around 80% of your tested upload speed gives the encoder room to work without dropped frames or a disconnect.",
      },
      {
        question: "Should I use CBR or VBR for streaming?",
        answer:
          "CBR (constant bitrate) is what both Twitch and YouTube recommend for live streaming — it keeps your output bitrate steady and predictable, which streaming platforms and viewers' players both handle far more reliably than the variable bitrate typically used for recorded video.",
      },
    ],
  },
  {
    slug: "case-converter",
    name: "Case Converter & Slug Sanitizer",
    tagline: "One title, every case format, instantly.",
    description:
      "Paste any title or phrase and get it converted into a clean URL slug, camelCase, PascalCase, snake_case, CONSTANT_CASE, Title Case, and Sentence case — all at once, each with its own copy button.",
    category: "developer",
    icon: CaseSensitive,
    isNew: true,
    keywords: [
      "case converter",
      "slug generator",
      "camelcase converter",
      "snake case converter",
      "title case converter",
      "url slug sanitizer",
    ],
    howTo: [
      "Paste a title, heading, or phrase — any format works, including existing camelCase or snake_case text.",
      "Every case format updates instantly below.",
      "Copy whichever one you need with its dedicated copy button.",
    ],
    faq: [
      {
        question: "How does it split words from something like camelCase or an acronym?",
        answer:
          "It detects word boundaries at transitions between lowercase and uppercase letters, and treats a run of capitals followed by a capitalized word as an acronym — so \"XMLHttpRequest\" splits into \"XML\", \"Http\", \"Request\" rather than one long word.",
      },
      {
        question: "What happens to accented characters?",
        answer:
          "They're converted to their closest plain-ASCII equivalent — \"café\" becomes \"cafe\" — since accented characters can cause issues in URLs, file names, and some programming contexts.",
      },
      {
        question: "Is camelCase or PascalCase output always a valid variable name?",
        answer:
          "Not quite in every case — if your input starts with a number, the output will too (like \"10BestCoffeeShops\"), which isn't a valid JavaScript identifier. You'd want to prefix it with a letter or underscore before using it as a variable name.",
      },
    ],
  },
  {
    slug: "pdf-metadata-extractor",
    name: "PDF Page Count & Dimension Extractor",
    tagline: "Drop a PDF, instantly see page count, size, and color space.",
    description:
      "Drop a multi-page PDF and get its page count, page dimensions in both points and inches, aspect ratio, orientation, and detected color spaces — extracted directly in your browser without uploading the file anywhere.",
    category: "utility",
    icon: FileDigit,
    isNew: true,
    keywords: [
      "pdf page count",
      "pdf dimensions",
      "pdf metadata extractor",
      "pdf page size checker",
      "pdf color space",
    ],
    howTo: [
      "Drop a PDF file onto the drop zone, or click to browse for one.",
      "Page count, page size, and orientation appear instantly.",
      "Check the color spaces list to see what's used inside the document.",
    ],
    faq: [
      {
        question: "Is my PDF uploaded anywhere?",
        answer:
          "No — the file is read and inspected entirely in your browser using JavaScript's File API. It's never sent to a server, which matters for confidential or unpublished documents.",
      },
      {
        question: "Why does it say the results might be incomplete for some PDFs?",
        answer:
          "Newer PDFs can bundle multiple objects — including page definitions — into a single compressed \"object stream\" for a smaller file size. This tool reads a PDF's plain-text structure directly rather than running a full PDF decoder, so it flags this case explicitly instead of guessing at a number it can't fully verify.",
      },
      {
        question: "Why do some pages share one size instead of being listed individually?",
        answer:
          "PDF allows a page size to be set once on a shared parent node and inherited by every page under it, rather than repeated on each page — very common for documents where every page is the same size, like a standard Letter or A4 report.",
      },
    ],
  },
  {
    slug: "heading-hierarchy-auditor",
    name: "HTML Heading Hierarchy Auditor",
    tagline: "See your page's heading structure — and every skipped level.",
    description:
      "Paste raw HTML and get a visual tree of every H1–H6 tag in document order, with skipped heading levels, empty headings, and missing or duplicate H1s automatically flagged — the structural checks that matter most for accessibility and SEO.",
    category: "developer",
    icon: ListTree,
    isNew: true,
    keywords: [
      "heading hierarchy checker",
      "h1 h2 h3 audit",
      "heading structure seo",
      "skipped heading level",
      "html heading tree",
      "accessibility heading audit",
    ],
    howTo: [
      "Paste a page's HTML source — view-source, a CMS export, or a component's markup all work.",
      "Review the indented heading tree to see the structure at a glance.",
      "Fix anything flagged below: skipped levels, empty headings, or a missing or duplicated H1.",
    ],
    faq: [
      {
        question: "Why does a skipped heading level matter?",
        answer:
          "Screen reader users often navigate a page heading-by-heading rather than reading it top to bottom, using the heading levels as a table of contents. Jumping from an H2 straight to an H4 breaks that structure and can make a section feel like it's missing context, even though it displays fine visually.",
      },
      {
        question: "Is it ever okay to have more than one H1?",
        answer:
          "The HTML5 spec technically permits multiple H1s within separate sectioning elements, and it's flagged here only as an informational note, not an error. That said, most SEO guidance still recommends a single H1 that clearly states the page's main topic.",
      },
      {
        question: "Does this check visual heading size (like large bold text)?",
        answer:
          "No — it only looks at actual H1–H6 tags in the HTML. Text that's styled to look like a heading with CSS but isn't wrapped in a heading tag won't show up, and semantically that's exactly the kind of thing worth fixing.",
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
