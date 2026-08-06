export interface PrivacyPolicyInput {
  companyName: string;
  url: string;
  email: string;
  usesCookies: boolean;
  usesAnalytics: boolean;
  usesAdvertising: boolean;
  usesForms: boolean;
  usesEcommerce: boolean;
  usesNewsletter: boolean;
  servesEu: boolean;
  servesCalifornia: boolean;
}

export const defaultPrivacyPolicyInput: PrivacyPolicyInput = {
  companyName: "",
  url: "",
  email: "",
  usesCookies: true,
  usesAnalytics: true,
  usesAdvertising: false,
  usesForms: true,
  usesEcommerce: false,
  usesNewsletter: false,
  servesEu: false,
  servesCalifornia: false,
};

export interface ToggleOption {
  key: keyof Omit<PrivacyPolicyInput, "companyName" | "url" | "email">;
  label: string;
  hint: string;
}

export const toggleOptions: ToggleOption[] = [
  { key: "usesCookies", label: "Uses cookies", hint: "Session cookies, preference cookies, etc." },
  { key: "usesAnalytics", label: "Uses analytics", hint: "Google Analytics or similar traffic tools" },
  { key: "usesAdvertising", label: "Shows third-party ads", hint: "Google AdSense or another ad network" },
  { key: "usesForms", label: "Collects form submissions", hint: "Contact forms, signup forms, etc." },
  { key: "usesEcommerce", label: "Processes payments", hint: "Sells products or services online" },
  { key: "usesNewsletter", label: "Sends email newsletters", hint: "Marketing or update emails" },
  { key: "servesEu", label: "Has EU/UK visitors", hint: "Adds a GDPR rights section" },
  { key: "servesCalifornia", label: "Has California visitors", hint: "Adds a CCPA rights section" },
];

function today(): string {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function buildPrivacyPolicyText(input: PrivacyPolicyInput): string {
  const name = input.companyName.trim() || "[Company Name]";
  const url = input.url.trim() || "[yourwebsite.com]";
  const email = input.email.trim() || "[contact@yourwebsite.com]";

  const sections: string[] = [];

  sections.push(`${name} — Privacy Policy`);
  sections.push(`Effective date: ${today()}`);
  sections.push("");
  sections.push(
    `This Privacy Policy explains how ${name} ("we," "us," or "our") collects, uses, and shares information when you visit ${url}. By using this site, you agree to the practices described below.`
  );

  sections.push("");
  sections.push("INFORMATION WE COLLECT");
  const collected: string[] = [];
  if (input.usesForms) collected.push("Information you submit through contact or signup forms, such as your name and email address");
  if (input.usesEcommerce) collected.push("Billing and order information needed to process payments, handled through our payment processor");
  if (input.usesNewsletter) collected.push("Your email address if you subscribe to our newsletter");
  collected.push("Standard technical information such as your IP address, browser type, device type, and pages visited");
  sections.push(collected.map((line) => `- ${line}`).join("\n"));

  if (input.usesCookies) {
    sections.push("");
    sections.push("COOKIES");
    sections.push(
      `We use cookies and similar technologies to operate the site, remember your preferences, and — where applicable — support analytics and advertising as described below. You can control cookies through your browser settings, though disabling them may affect how the site functions.`
    );
  }

  if (input.usesAnalytics) {
    sections.push("");
    sections.push("ANALYTICS");
    sections.push(
      `We use analytics tools to understand how visitors use ${url}, in aggregate. This helps us improve the site. Analytics data is generally not used to identify you personally.`
    );
  }

  if (input.usesAdvertising) {
    sections.push("");
    sections.push("ADVERTISING");
    sections.push(
      `We display advertising on this site through third-party networks such as Google AdSense. These networks may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising through your ad network's own settings (for Google, at adssettings.google.com) or through aboutads.info/choices.`
    );
  }

  if (input.usesEcommerce) {
    sections.push("");
    sections.push("PAYMENT PROCESSING");
    sections.push(
      `Payments are handled by a third-party payment processor. We do not store your full payment card details on our own servers — that information is handled directly by our payment processor in accordance with its own security standards and privacy policy.`
    );
  }

  if (input.usesNewsletter) {
    sections.push("");
    sections.push("EMAIL COMMUNICATIONS");
    sections.push(
      `If you subscribe to our newsletter, we'll use your email address to send updates and marketing communications. You can unsubscribe at any time using the link included in every email.`
    );
  }

  if (input.servesEu) {
    sections.push("");
    sections.push("YOUR RIGHTS (EU/UK — GDPR)");
    sections.push(
      `If you're located in the EU or UK, you have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. To exercise any of these rights, contact us at ${email}.`
    );
  }

  if (input.servesCalifornia) {
    sections.push("");
    sections.push("YOUR RIGHTS (CALIFORNIA — CCPA)");
    sections.push(
      `If you're a California resident, you have the right to know what personal information we collect, to request deletion of that information, and to opt out of the sale or sharing of your personal information. To exercise any of these rights, contact us at ${email}.`
    );
  }

  sections.push("");
  sections.push("CHILDREN'S PRIVACY");
  sections.push(`This site is not directed at children under 13, and we do not knowingly collect personal information from children under 13.`);

  sections.push("");
  sections.push("CHANGES TO THIS POLICY");
  sections.push(`We may update this policy from time to time. Changes will be posted on this page with an updated effective date.`);

  sections.push("");
  sections.push("CONTACT US");
  sections.push(`Questions about this policy can be sent to ${email}.`);

  sections.push("");
  sections.push(
    "--- This is a generic starting-point template, not legal advice. Have a lawyer review it before publishing, especially if GDPR, CCPA, or other specific regulations apply to your business. ---"
  );

  return sections.join("\n");
}
