import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout, ArticleTable } from "@/components/blog/typography";

export function NrrVsGrrContent() {
  return (
    <>
      <ArticleLead>
        Two SaaS companies can have the exact same underlying numbers — same expansion, same
        churn, same contraction — and report retention figures 15 points apart. Neither one is
        lying. They're just measuring different things.
      </ArticleLead>

      <ArticleH2>Two metrics, one dataset</ArticleH2>
      <ArticleP>
        Net Revenue Retention (NRR) and Gross Revenue Retention (GRR) both start from the same
        four numbers: your MRR from existing customers at the start of the period, how much of
        it expanded (upgrades), how much contracted (downgrades), and how much churned entirely
        (cancellations). New customers acquired during the period aren't part of either
        calculation — both metrics are specifically about how well you retain and grow the
        customers you already had.
      </ArticleP>

      <ArticleH2>What NRR measures</ArticleH2>
      <ArticleP>
        NRR includes the upside. It asks: of the revenue I started the period with, how much do
        I have now, after adding expansion and subtracting contraction and churn?
      </ArticleP>
      <Callout>
        NRR = (Starting MRR + Expansion − Contraction − Churn) / Starting MRR
      </Callout>
      <ArticleP>
        Because expansion is included, NRR can exceed 100% — and for strong SaaS companies, it
        often does. An NRR above 100% means existing customers are spending more over time even
        before you sign a single new logo, which is one of the most reliable growth signals a
        subscription business can show.
      </ArticleP>

      <ArticleH2>What GRR measures</ArticleH2>
      <ArticleP>
        GRR strips out the upside entirely. It only asks: of the revenue I started with, how much
        did I keep, ignoring any expansion?
      </ArticleP>
      <Callout>GRR = (Starting MRR − Contraction − Churn) / Starting MRR</Callout>
      <ArticleP>
        Because it never adds anything back, GRR is mathematically capped at 100% — a company
        that loses zero revenue to churn and contraction scores a perfect 100%, but can never
        score higher. That ceiling is the point: GRR is a "worst case" view, showing how sticky
        your base is independent of any upsell success covering for it.
      </ArticleP>

      <ArticleH2>The same numbers, two different stories</ArticleH2>
      <ArticleP>
        Take a company starting the quarter with $100,000 in MRR. Over the quarter: $15,000 in
        expansion, $5,000 in contraction, and $8,000 churned entirely.
      </ArticleP>
      <ArticleTable
        headers={["Metric", "Calculation", "Result"]}
        rows={[
          ["NRR", "($100k + $15k − $5k − $8k) / $100k", "102%"],
          ["GRR", "($100k − $5k − $8k) / $100k", "87%"],
        ]}
      />
      <ArticleP>
        Same company, same quarter, same underlying activity — a 15-point spread depending on
        which number gets put in the headline. Neither figure is wrong. They're answering
        different questions: NRR says "the base is growing," GRR says "13% of that base is at
        risk before you even count any upsells covering for it."
      </ArticleP>

      <ArticleH2>Why investors ask for both</ArticleH2>
      <ArticleList
        items={[
          <>A high NRR propped up by one or two large expansion deals can mask a genuinely weak
            GRR underneath — a small number of accounts growing fast while most of the base
            quietly erodes.</>,
          <>A strong GRR with a mediocre NRR suggests a stable base that isn't being expanded
            effectively — a sales/success execution question rather than a churn problem.</>,
          <>Looking at both together tells you whether growth is broad-based or concentrated in a
            handful of accounts, which matters a lot for how repeatable it actually is.</>,
        ]}
      />

      <ArticleH2>What counts as "good"</ArticleH2>
      <ArticleP>
        Benchmarks vary by company size, price point, and market, but as a rough compass: NRR in
        the 100–110% range is generally considered solid, and best-in-class enterprise SaaS
        companies often report NRR well above 120%. GRR above roughly 90% is typically viewed as
        healthy, since even strong businesses lose some revenue to churn and downgrades over any
        given period.
      </ArticleP>

      <ArticleP>
        If you want to run your own numbers without doing this math by hand every board meeting,
        the{" "}
        <Link href="/tools/mrr-retention" className="text-primary underline-offset-4 hover:underline">
          SaaS Expansion MRR &amp; Net Retention Calculator
        </Link>{" "}
        computes NRR, GRR, net churn, and gross churn from the same four inputs used here.
      </ArticleP>
    </>
  );
}
