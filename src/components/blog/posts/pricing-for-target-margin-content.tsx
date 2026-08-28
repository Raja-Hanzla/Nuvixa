import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout, ArticleTable } from "@/components/blog/typography";

export function PricingForTargetMarginContent() {
  return (
    <>
      <ArticleLead>
        Most pricing advice starts and ends with one formula: price equals cost divided by one
        minus your target margin. It's clean, it's memorable, and for a huge number of real
        businesses, it quietly produces the wrong number.
      </ArticleLead>

      <ArticleH2>The formula everyone starts with</ArticleH2>
      <ArticleP>
        If your cost of goods is $12 and you want a 40% margin, the standard approach says:
        price = $12 / (1 − 0.40) = $20. Sell at $20, and 40% of that ($8) is profit. Simple,
        and correct — as far as it goes.
      </ArticleP>
      <ArticleP>
        The problem is that "cost" in that formula usually only means the cost of physically
        making or sourcing the product. It doesn't account for two things that come directly out
        of your revenue on nearly every sale: payment processing fees, and — if you're running
        paid acquisition — the cost of the ad that got someone to buy in the first place.
      </ArticleP>

      <ArticleH2>Where the simple formula breaks down</ArticleH2>
      <ArticleP>
        Payment processors don't charge a flat fee on your cost — they take a percentage of the
        <em> price</em>, plus usually a small fixed amount. A typical rate is around 2.9% + $0.30
        per transaction. That percentage scales with whatever price you charge, which means it
        has to be part of the equation you're solving, not something you subtract afterward.
      </ArticleP>
      <ArticleP>
        Ad spend works the same way, if you're paying to acquire the customer. If your target
        cost-per-acquisition is $8, that $8 has to come out of the same pool of money as your
        target profit — otherwise a price that looks like it carries a 40% margin can flip into
        an outright loss once the real acquisition cost is subtracted.
      </ArticleP>

      <ArticleH2>The corrected formula</ArticleH2>
      <ArticleP>
        Once you treat payment fees and ad cost as claims on the final price rather than
        afterthoughts, the formula becomes:
      </ArticleP>
      <Callout>
        price = (COGS + ad CPA + fixed payment fee) / (1 − target margin% − payment fee%)
      </Callout>
      <ArticleP>
        The percentage-based costs (margin and payment fee %) move into the denominator, because
        they scale with price. The flat-dollar costs (COGS, ad spend, fixed payment fee) stay in
        the numerator, because they don't change no matter what you charge.
      </ArticleP>

      <ArticleH2>A worked example</ArticleH2>
      <ArticleP>
        Take the same $12 COGS and 40% target margin, now with an $8 ad CPA target and a
        typical 2.9% + $0.30 payment fee:
      </ArticleP>
      <ArticleTable
        headers={["Approach", "Formula", "Required price"]}
        rows={[
          ["Naive markup", "$12 / (1 − 0.40)", "$20.00"],
          ["Accounting for fees + ads", "($12 + $8 + $0.30) / (1 − 0.40 − 0.029)", "$35.55"],
        ]}
      />
      <ArticleP>
        That's not a rounding difference — it's nearly double. At $20, once you subtract COGS,
        the payment fee, and the $8 ad spend, you're actually left with <em>negative</em> $0.88
        per sale — a loss, on a product you thought carried a healthy 40% margin. At $35.55, you
        actually clear your 40%, verified: $14.22 of profit on a $35.55 sale.
      </ArticleP>

      <ArticleH2>What this means in practice</ArticleH2>
      <ArticleList
        items={[
          <>
            <strong className="text-foreground">Ad-driven businesses feel this the most.</strong>{" "}
            If most of your sales come from paid acquisition, your real required price is often
            meaningfully higher than a simple cost-plus calculation suggests.
          </>,
          <>
            <strong className="text-foreground">Organic-heavy businesses can set the ad CPA input to zero</strong> and the formula collapses back toward the simpler version — this isn't a
            different model, just the general case.
          </>,
          <>
            <strong className="text-foreground">This is also why margin targets and CPA targets should be set together</strong>, not
            independently — raising your ad budget without revisiting price is a common way
            margins quietly erode over a quarter.
          </>,
        ]}
      />

      <ArticleP>
        If you'd rather not do this math by hand every time you're testing a price point, the{" "}
        <Link href="/tools/pricing-margin-matrix" className="text-primary underline-offset-4 hover:underline">
          Product Pricing &amp; Target Profit Margin Matrix
        </Link>{" "}
        solves this exact formula for you. If you're specifically working through e-commerce
        unit economics with shipping and packaging costs layered in too, the{" "}
        <Link href="/tools/ecommerce-margin" className="text-primary underline-offset-4 hover:underline">
          E-Commerce Break-Even &amp; Profit Margin Matrix
        </Link>{" "}
        extends this same logic across a full range of margin targets at once.
      </ArticleP>
    </>
  );
}
