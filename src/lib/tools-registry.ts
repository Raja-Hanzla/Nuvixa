import { CalendarClock, FileText, Calculator, Timer, Search, ShoppingCart, BarChart3, Link2, KeyRound, ScrollText, Lock, Braces, Contrast, LayoutGrid, FileImage } from "lucide-react";

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
    isNew: true,
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
