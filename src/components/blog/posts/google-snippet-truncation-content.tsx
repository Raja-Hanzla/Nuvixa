import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout } from "@/components/blog/typography";

export function GoogleSnippetTruncationContent() {
  return (
    <>
      <ArticleLead>
        You can write a genuinely great meta description — clear, compelling, exactly the right
        length — and Google will still frequently show something else entirely in the actual
        search result. That's not a bug or a penalty. It's how the system is designed to work.
      </ArticleLead>

      <ArticleH2>What Google actually builds the snippet from</ArticleH2>
      <ArticleP>
        Google's own documentation is direct about this: your meta description is a hint, not an
        instruction. When someone searches, Google frequently generates the visible snippet
        dynamically, pulling the text that best matches that specific query from anywhere on the
        page — not necessarily the description tag you wrote.
      </ArticleP>
      <ArticleP>
        The reasoning makes sense once you think about it from Google's side: a single static
        meta description can't be tailored to every possible search query that might land on a
        page. Someone searching "pricing calculator for dropshippers" and someone searching "how
        to calculate profit margin" might both land on the same page — and the most useful
        snippet for each of them is genuinely different text, pulled from whichever part of the
        page best answers their specific query.
      </ArticleP>

      <ArticleH2>So is writing a meta description pointless?</ArticleH2>
      <ArticleP>No — it still does real work, just not always the job people assume:</ArticleP>
      <ArticleList
        items={[
          <>It's still used as-written in a meaningful share of results, especially when it's
            accurate, concise, and closely matches how people actually search for the page.</>,
          <>It's typically used directly for social sharing previews (via Open Graph tags) on
            platforms like Twitter/X, LinkedIn, and Facebook — a very different context from
            organic search, where it isn't subject to the same query-matching rewrite.</>,
          <>A well-written description is a strong signal of what the page is actually about,
            which indirectly helps even when Google chooses different exact wording to display.</>,
        ]}
      />

      <ArticleH2>What still matters about your title tag</ArticleH2>
      <ArticleP>
        Title tags get rewritten far less often than descriptions, but it does still happen —
        usually when a title is too long, stuffed with keywords in a way that reads unnaturally,
        or doesn't clearly match the page's actual content. A clear, accurately descriptive title
        under roughly 60 characters is the most reliable way to keep control over what shows up
        as your blue link text.
      </ArticleP>

      <Callout>
        The practical takeaway: write your meta description for the person, not for a guaranteed
        display. Make it accurate and compelling enough that if it does show verbatim, it earns
        the click — and trust that if Google swaps in different matching text for a specific
        query, that's usually the more useful outcome for that particular searcher anyway.
      </Callout>

      <ArticleH2>What's actually worth optimizing</ArticleH2>
      <ArticleList
        items={[
          <>Keep your title accurate and reasonably concise — this is the part most likely to
            display exactly as written.</>,
          <>Write a genuine, specific meta description rather than a generic one — even when
            Google swaps it out for search, an accurate description still shapes what Google
            considers relevant to pull instead.</>,
          <>Don't obsess over hitting an exact character count — being clear and accurate matters
            more than precisely maximizing every available pixel.</>,
        ]}
      />

      <ArticleP>
        The{" "}
        <Link href="/tools/serp-simulator" className="text-primary underline-offset-4 hover:underline">
          Google SERP &amp; AI Overview Snippet Simulator
        </Link>{" "}
        shows how your title and description would display on desktop and mobile if used
        verbatim, which is still worth checking even knowing Google may show something else for
        any given search.
      </ArticleP>
    </>
  );
}
