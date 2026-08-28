import Link from "next/link";

import { ArticleLead, ArticleH2, ArticleP, ArticleList, Callout, ArticleTable } from "@/components/blog/typography";

export function WcagContrastRatioContent() {
  return (
    <>
      <ArticleLead>
        "4.5:1" gets quoted constantly in accessibility checklists, almost always without
        explanation. It's not a round number chosen for convenience — it comes from an actual
        formula, and understanding that formula explains some genuinely surprising results.
      </ArticleLead>

      <ArticleH2>The rule everyone quotes</ArticleH2>
      <ArticleP>
        WCAG 2.1's AA standard requires a contrast ratio of at least 4.5:1 between text and its
        background for normal-sized text, and at least 3:1 for large text. The stricter AAA
        standard raises those to 7:1 and 4.5:1. Those numbers show up in nearly every
        accessibility guide, but rarely with an explanation of where "contrast ratio" actually
        comes from.
      </ArticleP>

      <ArticleH2>It's not just "how different do these colors look"</ArticleH2>
      <ArticleP>
        Contrast ratio is calculated from each color's <em>relative luminance</em> — a measure of
        how bright a color appears to the human eye, not just its raw RGB values. The formula
        applies a gamma-correction curve to each color channel before combining them, because
        human perception of brightness isn't linear with respect to raw pixel values — a color
        channel value of 128 doesn't look "half as bright" as 255 to your eyes, so a naive
        average of RGB numbers would misjudge how contrasty two colors actually look.
      </ArticleP>
      <ArticleP>
        Once each color has a relative luminance value, the ratio is simply: (lighter luminance +
        0.05) ÷ (darker luminance + 0.05). The +0.05 in both places accounts for a small amount of
        ambient light scatter that affects perceived contrast even against a theoretically pure
        black or white.
      </ArticleP>

      <ArticleH2>Why two similar-looking grays can have very different outcomes</ArticleH2>
      <ArticleP>
        Take two shades of gray text on a white background — #767676 and #999999. Side by side,
        they look like close cousins. Run the actual formula, though:
      </ArticleP>
      <ArticleTable
        headers={["Color on white", "Contrast ratio", "AA normal text (needs 4.5:1)"]}
        rows={[
          ["#767676", "4.54:1", "Passes"],
          ["#999999", "2.85:1", "Fails"],
        ]}
      />
      <ArticleP>
        That's a real, meaningful gap hiding behind what looks like a minor shade difference —
        which is exactly why eyeballing "is this readable enough" is unreliable, even for
        designers with a good eye for contrast.
      </ArticleP>

      <ArticleH2>Why large text gets an easier threshold</ArticleH2>
      <ArticleP>
        WCAG defines "large text" as 24px or larger at any weight, or roughly 18.66px (about
        14pt) or larger when bold. Bigger, heavier strokes are inherently easier to read at lower
        contrast than small, thin ones — so the standard relaxes the requirement from 4.5:1 down
        to 3:1 specifically for text that size.
      </ArticleP>
      <Callout>
        This is why the exact same color pair can pass as a large, bold headline and fail as a
        small paragraph — it's not a bug in the checker, it's the standard correctly treating
        the two as genuinely different readability problems.
      </Callout>

      <ArticleH2>A color that only works for headlines</ArticleH2>
      <ArticleP>
        A common brand blue at roughly 3.7:1 against a dark background is a perfect example of
        this in action: it clears the 3:1 bar required for large, bold text — so it's fine for a
        big headline — but it falls short of the 4.5:1 bar required for normal body text. Use the
        exact same color for a paragraph of regular-weight 16px text on that same background, and
        it technically fails accessibility standards, even though visually it might not look
        dramatically different from the headline usage.
      </ArticleP>

      <ArticleH2>AA vs AAA, briefly</ArticleH2>
      <ArticleList
        items={[
          <><strong className="text-foreground">AA</strong> is the level most legal and
            organizational accessibility requirements reference — treat it as the practical
            baseline.</>,
          <><strong className="text-foreground">AAA</strong> is stricter and optional for most
            sites, but worth aiming for on critical text like form labels or error messages,
            where legibility failures are especially costly.</>,
        ]}
      />

      <ArticleP>
        The{" "}
        <Link href="/tools/wcag-checker" className="text-primary underline-offset-4 hover:underline">
          WCAG Typography Readability Checker
        </Link>{" "}
        runs the actual formula above against any color, font size, and weight combination you
        pick, and tells you exactly which threshold applies and whether you clear it.
      </ArticleP>
    </>
  );
}
