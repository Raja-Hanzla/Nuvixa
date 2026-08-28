import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout, ArticleTable } from "@/components/blog/typography";

export function IrsMileageRate2026Content() {
  return (
    <>
      <ArticleLead>
        The IRS standard mileage rate almost always changes once a year, on January 1. In 2026,
        it changed twice — and if your mileage log spans both halves of the year, using one flat
        rate for the whole thing will quietly get your deduction wrong.
      </ArticleLead>

      <ArticleH2>What actually happened</ArticleH2>
      <ArticleP>
        The IRS set the 2026 standard business mileage rate at 72.5 cents per mile, effective
        January 1 — itself already up from 70 cents in 2025. Then, in a rare mid-year move, the
        IRS raised it again to 76 cents per mile, effective July 1 through the end of the year,
        citing rising fuel costs. Mid-year adjustments like this are uncommon; the standard rate
        normally holds steady for the full calendar year.
      </ArticleP>
      <ArticleTable
        headers={["Period", "Rate per mile"]}
        rows={[
          ["2025 (full year)", "70.0¢"],
          ["2026, Jan 1 – Jun 30", "72.5¢"],
          ["2026, Jul 1 – Dec 31", "76.0¢"],
        ]}
      />

      <ArticleH2>Why this actually matters for your deduction</ArticleH2>
      <ArticleP>
        If you drove 3,000 business miles in the first half of 2026 and another 3,000 in the
        second half, the correct deduction isn't 6,000 miles at one flat rate — it's each half
        calculated at the rate that was actually in effect at the time.
      </ArticleP>
      <ArticleTable
        headers={["Approach", "Calculation", "Deduction"]}
        rows={[
          ["Using only the July rate (76¢) for all 6,000 miles", "6,000 × $0.76", "$4,560.00"],
          ["Using only the January rate (72.5¢) for all 6,000 miles", "6,000 × $0.725", "$4,350.00"],
          ["Correct: each half at its actual rate", "(3,000 × $0.725) + (3,000 × $0.76)", "$4,455.00"],
        ]}
      />
      <ArticleP>
        The difference between guessing wrong in either direction and getting it right is over
        $100 on just 6,000 miles — and it compounds the more miles you log, and the more evenly
        your driving is split across the two periods.
      </ArticleP>

      <ArticleH2>Why most quick calculators get this wrong</ArticleH2>
      <ArticleP>
        A calculator built once, with a hardcoded rate, is correct until the rate changes — and
        most tools don't get revisited every time the IRS updates a number, let alone when it
        updates it mid-year unexpectedly. The safest approach is to calculate mileage deductions
        per trip, applying whichever rate was actually in effect on that trip's specific date,
        rather than applying one number to a whole year's log at once.
      </ArticleP>
      <Callout>
        This is exactly what changed for anyone doing rideshare driving, delivery work, client
        visits, or any other business driving that spans both halves of 2026 — the correct
        deduction depends on knowing which trips happened before July 1 and which happened after.
      </Callout>

      <ArticleH2>What this doesn't cover</ArticleH2>
      <ArticleP>
        The standard mileage rate is a simplified alternative to tracking actual vehicle
        expenses — gas, insurance, depreciation, repairs, and so on. Whether the standard rate or
        actual expenses produces a bigger deduction depends on your specific vehicle and how much
        you drive for business versus personal use; a tax professional can help you compare both
        methods for your situation.
      </ArticleP>

      <ArticleP>
        The{" "}
        <Link href="/tools/tax-deduction-estimator" className="text-primary underline-offset-4 hover:underline">
          Freelance Tax Deduction &amp; Mileage Expense Estimator
        </Link>{" "}
        applies the correct rate automatically based on each trip's date, so a log spanning both
        halves of 2026 calculates correctly without you having to split it manually.
      </ArticleP>
    </>
  );
}
