import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout, ArticleTable } from "@/components/blog/typography";

export function SafeNotesExplainedContent() {
  return (
    <>
      <ArticleLead>
        A SAFE isn't a loan — there's no interest, no repayment date, no debt on the balance
        sheet. It's also not equity, at least not yet. It's a contract that says: "when a priced
        round happens, this money turns into shares, at a price we've agreed on the rules for
        today."
      </ArticleLead>

      <ArticleH2>What "SAFE" actually stands for</ArticleH2>
      <ArticleP>
        SAFE stands for Simple Agreement for Future Equity — a structure popularized by Y
        Combinator specifically to let early investors put money into a company before anyone
        has agreed on what the company is actually worth. Instead of pricing the round now, both
        sides agree on the terms that will determine the price later, when a real priced round
        (like a Series A) finally happens.
      </ArticleP>

      <ArticleH2>The valuation cap: protecting against a wildly successful company</ArticleH2>
      <ArticleP>
        The valuation cap sets a ceiling on the company valuation used to calculate the SAFE
        holder's conversion price — even if the company is actually worth far more by the time
        it converts. If a SAFE has a $4,000,000 cap, the investor's money converts as if the
        company were valued at $4,000,000, regardless of what the actual priced round values it
        at. A $200,000 SAFE at that cap works out to $200,000 ÷ $4,000,000 = 5% ownership.
      </ArticleP>
      <ArticleP>
        The cap exists because SAFE investors are taking real risk early, often before there's
        much to point to besides a team and an idea. Without a cap, a wildly successful company
        could raise its next round at a valuation so high that the SAFE investor's early risk
        barely shows up in their final ownership stake.
      </ArticleP>

      <ArticleH2>The discount: a guaranteed better price than the next round</ArticleH2>
      <ArticleP>
        A discount does something different — it gives the SAFE holder a percentage off whatever
        price the next round actually sets, independent of the cap. A 20% discount means the SAFE
        converts at 80% of the priced round's per-share price, whatever that ends up being.
      </ArticleP>
      <ArticleP>
        In practice, many SAFEs include both a cap and a discount, and the investor gets whichever
        one produces more ownership for their money at the time of conversion — the cap protects
        against a very high valuation, the discount guarantees a baseline benefit even if the cap
        never comes into play.
      </ArticleP>

      <ArticleH2>Putting a number on it</ArticleH2>
      <ArticleP>
        Take that same $200,000 SAFE with a $4,000,000 cap, now add a 20% discount:
      </ArticleP>
      <ArticleTable
        headers={["Scenario", "Calculation", "Ownership"]}
        rows={[
          ["Cap only", "$200,000 / $4,000,000", "5.00%"],
          ["Cap + 20% discount", "$200,000 / ($4,000,000 × 0.80)", "6.25%"],
        ]}
      />
      <ArticleP>
        The discount alone moved the investor from 5% to 6.25% ownership on the exact same
        $200,000 check — a real, non-trivial difference that's easy to overlook when you're
        focused on the headline cap number.
      </ArticleP>

      <ArticleH2>Where founders get surprised</ArticleH2>
      <ArticleP>
        The real surprise usually isn't any single SAFE — it's stacking several of them. A
        pre-seed SAFE, a bridge SAFE six months later, maybe a second bridge after that, each
        with its own cap and discount, all sitting on the cap table waiting to convert. Add an
        option pool top-up at the eventual priced round, and founders are often shocked at how
        much of the company is already accounted for before the "real" investors even show up.
      </ArticleP>
      <Callout>
        One honest simplification worth knowing: SAFEs technically don't convert the moment
        they're issued — they convert later, at the next priced round, using whichever
        calculation (cap or discount) is more favorable at that time. Quick modeling tools
        (including ours) often simplify this by treating each SAFE as converting immediately at
        its own cap, which is directionally useful for understanding dilution but isn't exactly
        how the legal mechanics work.
      </Callout>

      <ArticleP>
        To see how a whole sequence of SAFEs and priced rounds compounds against your own cap
        table — including the option pool shuffle that catches a lot of first-time founders off
        guard — try the{" "}
        <Link href="/tools/cap-table-simulator" className="text-primary underline-offset-4 hover:underline">
          Startup Equity Dilution &amp; Cap Table Simulator
        </Link>
        .
      </ArticleP>
    </>
  );
}
