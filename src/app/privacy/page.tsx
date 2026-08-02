import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles data, cookies, and advertising.`,
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "August 2026";

export default function PrivacyPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Overview</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} ("we," "us," or "our") operates {siteConfig.url}. This policy
              explains what information is collected when you use the site, how it's used, and
              the choices you have. By using {siteConfig.name}, you agree to the practices
              described here.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Information you enter into tools</h2>
            <p className="mt-3 leading-relaxed">
              Every tool on {siteConfig.name} runs in your browser. Text, numbers, and dates you
              type into a tool — for example, invoice details or meeting attendee counts — are
              processed locally on your device to generate the tool's output. We do not transmit,
              store, or have access to what you enter into any tool.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Automatically collected information
            </h2>
            <p className="mt-3 leading-relaxed">
              Like most websites, our hosting provider and any analytics tools we use may
              automatically log standard technical information when you visit — such as your IP
              address, browser type, device type, pages visited, and approximate location derived
              from your IP address. This is used in aggregate to understand traffic and improve
              the site, not to identify you individually.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Cookies and local storage</h2>
            <p className="mt-3 leading-relaxed">
              We use your browser's local storage to remember simple preferences, such as whether
              you prefer light or dark mode. This stays on your device and isn't sent to us.
              Third-party services we use, including advertising partners, may also set their own
              cookies as described below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Advertising</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} is supported by advertising, including Google AdSense. Google and
              its partners may use cookies to serve ads based on your prior visits to this site or
              other websites, and to measure ad performance. Google's use of advertising cookies
              enables it and its partners to serve ads based on your visit to this site and/or
              other sites on the Internet.
            </p>
            <p className="mt-3 leading-relaxed">
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Google Ads Settings
              </a>
              , or opt out of a participating vendor's use of cookies for personalized advertising
              at{" "}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                aboutads.info
              </a>
              . You can read more about how Google uses information from sites that use its
              services at{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Third-party links</h2>
            <p className="mt-3 leading-relaxed">
              Some pages may link to third-party websites or services. We aren't responsible for
              the content or privacy practices of sites we don't operate, and we'd encourage you
              to review their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Children's privacy</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} is not directed at children under 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Changes to this policy</h2>
            <p className="mt-3 leading-relaxed">
              We may update this policy from time to time. Changes will be posted on this page
              with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact us</h2>
            <p className="mt-3 leading-relaxed">
              Questions about this policy can be sent to{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              , or via our{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
