import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout, ArticleTable } from "@/components/blog/typography";

export function DebtSnowballVsAvalancheContent() {
  return (
    <>
      <ArticleLead>
        There's a mathematically correct answer to "which debt should I pay off first" — and a
        behaviorally correct one. They're not always the same debt, and picking the wrong one for
        your actual situation can cost you the whole plan.
      </ArticleLead>

      <ArticleH2>Two ways to order the same debts</ArticleH2>
      <ArticleP>
        Both strategies work the same basic way: pay the minimum on every debt, then throw every
        extra dollar at one target debt until it's gone, then roll that payment into the next
        one. The only difference is which debt you target first.
      </ArticleP>
      <ArticleList
        items={[
          <><strong className="text-foreground">Snowball</strong> targets the smallest balance
            first, regardless of interest rate.</>,
          <><strong className="text-foreground">Avalanche</strong> targets the highest interest
            rate first, regardless of balance size.</>,
        ]}
      />

      <ArticleH2>A real example</ArticleH2>
      <ArticleP>
        Take two debts: a $1,000 balance at 8% APR with a $50 minimum, and a $5,000 balance at
        22% APR with a $150 minimum. You can put $200 extra toward debt each month. Snowball
        attacks the $1,000 balance first, even though it carries the lower rate. Avalanche
        attacks the $5,000 balance first, even though it's larger, because 22% is the more
        expensive debt to be carrying.
      </ArticleP>
      <ArticleTable
        headers={["Strategy", "Months to debt-free", "Total interest paid"]}
        rows={[
          ["Snowball", "18", "$1,036.95"],
          ["Avalanche", "18", "$925.39"],
        ]}
      />
      <ArticleP>
        In this case, both strategies clear all debt in the same 18 months — but avalanche does
        it for $111.56 less in total interest. That gap isn't huge here because the balances are
        fairly close in size, but it scales up sharply with larger balances, bigger rate gaps, or
        longer payoff timelines.
      </ArticleP>

      <ArticleH2>Why avalanche almost always wins on paper</ArticleH2>
      <ArticleP>
        Interest accrues on whatever balance is sitting there, at whatever rate applies to it.
        Eliminating your most expensive debt first means less total interest accrues over the
        life of the payoff plan, full stop — it's the same logic as paying down the highest-APR
        balance on a credit card statement before a lower-APR car loan.
      </ArticleP>

      <ArticleH2>Why snowball still works for a lot of people</ArticleH2>
      <ArticleP>
        The math isn't the whole story. Snowball clears entire debts faster when balances vary a
        lot in size — that $1,000 balance in the example above would likely disappear in just a
        few months under snowball, giving you a real, visible win early in the plan. Avalanche,
        by contrast, might have you grinding on the same large balance for a year or more before
        anything actually closes out.
      </ArticleP>
      <Callout>
        A debt payoff plan you actually stick with beats a mathematically optimal one you abandon
        after three months. If early wins are what keep you motivated, that behavioral edge can
        be worth more than the extra interest.
      </Callout>

      <ArticleH2>How to decide</ArticleH2>
      <ArticleList
        items={[
          <>If your balances are similar in size but your rates vary a lot, avalanche's interest
            savings will be more meaningful — lean avalanche.</>,
          <>If you have one or two small balances mixed in with larger ones, and you know you
            need quick wins to stay motivated, snowball's faster early payoffs may matter more
            than the extra interest.</>,
          <>If you're not sure, run both — the gap between them tells you how much the "correct"
            answer actually costs, which is often smaller than people assume.</>,
        ]}
      />

      <ArticleP>
        The{" "}
        <Link href="/tools/debt-payoff-planner" className="text-primary underline-offset-4 hover:underline">
          Debt Snowball vs. Avalanche Repayment Planner
        </Link>{" "}
        runs both simulations side by side on your actual balances, rates, and minimums, so you
        can see the real dollar gap for your specific situation instead of a generic example.
      </ArticleP>
    </>
  );
}
