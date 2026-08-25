export type NdaType = "mutual" | "unilateral";

export interface NdaInput {
  ndaType: NdaType;
  partyAName: string;
  partyBName: string;
  effectiveDate: string;
  termYears: number;
  jurisdiction: string;
  purpose: string;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export const defaultNdaInput: NdaInput = {
  ndaType: "mutual",
  partyAName: "",
  partyBName: "",
  effectiveDate: todayIso(),
  termYears: 2,
  jurisdiction: "",
  purpose: "evaluating a potential business relationship",
};

function formatDisplayDate(value: string): string {
  if (!value) return "[Effective Date]";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function buildNdaText(input: NdaInput): string {
  const partyA = input.partyAName.trim() || "[Party A]";
  const partyB = input.partyBName.trim() || "[Party B]";
  const jurisdiction = input.jurisdiction.trim() || "[State/Country]";
  const purpose = input.purpose.trim() || "[state the purpose of disclosure]";
  const isMutual = input.ndaType === "mutual";

  const sections: string[] = [];

  sections.push(`${isMutual ? "MUTUAL " : ""}NON-DISCLOSURE AGREEMENT`);
  sections.push(`Effective Date: ${formatDisplayDate(input.effectiveDate)}`);
  sections.push("");
  sections.push(
    isMutual
      ? `This Non-Disclosure Agreement ("Agreement") is entered into between ${partyA} and ${partyB} (each a "Party" and together the "Parties") for the purpose of ${purpose}.`
      : `This Non-Disclosure Agreement ("Agreement") is entered into between ${partyA} ("Disclosing Party") and ${partyB} ("Receiving Party") for the purpose of ${purpose}.`
  );

  sections.push("");
  sections.push("1. DEFINITION OF CONFIDENTIAL INFORMATION");
  sections.push(
    `"Confidential Information" means any non-public information disclosed by ${isMutual ? "either Party" : "the Disclosing Party"}, whether written, oral, or in any other form, that is designated as confidential or that would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.`
  );

  sections.push("");
  sections.push("2. OBLIGATIONS");
  sections.push(
    `${isMutual ? "Each Party" : "The Receiving Party"} agrees to: (a) hold the other Party's Confidential Information in strict confidence; (b) not disclose it to any third party without prior written consent; and (c) use it solely for the purpose stated above.`
  );

  sections.push("");
  sections.push("3. EXCLUSIONS");
  sections.push(
    "Confidential Information does not include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was already known to the receiving party prior to disclosure; (c) is independently developed without use of the disclosing party's Confidential Information; or (d) is rightfully received from a third party without restriction."
  );

  sections.push("");
  sections.push("4. TERM");
  sections.push(
    `This Agreement remains in effect for ${input.termYears} year${input.termYears === 1 ? "" : "s"} from the Effective Date. The confidentiality obligations survive termination of this Agreement with respect to Confidential Information disclosed during its term.`
  );

  sections.push("");
  sections.push("5. RETURN OF MATERIALS");
  sections.push(
    "Upon written request, each party will promptly return or destroy all materials containing the other party's Confidential Information."
  );

  sections.push("");
  sections.push("6. NO LICENSE");
  sections.push(
    "Nothing in this Agreement grants either party any license or rights to the other party's intellectual property, except the limited right to use Confidential Information for the stated purpose."
  );

  sections.push("");
  sections.push("7. REMEDIES");
  sections.push(
    "Each party acknowledges that unauthorized disclosure may cause irreparable harm for which monetary damages would be an inadequate remedy, entitling the non-breaching party to seek injunctive relief in addition to any other available remedies."
  );

  sections.push("");
  sections.push("8. GOVERNING LAW");
  sections.push(`This Agreement is governed by the laws of ${jurisdiction}, without regard to conflict of law principles.`);

  sections.push("");
  sections.push("SIGNATURES");
  sections.push("");
  sections.push(`${partyA}`);
  sections.push("By: ______________________     Date: __________");
  sections.push("");
  sections.push(`${partyB}`);
  sections.push("By: ______________________     Date: __________");

  sections.push("");
  sections.push(
    "--- This is a generic starting-point template, not legal advice. Have a lawyer review and adapt it before using it as a binding agreement. ---"
  );

  return sections.join("\n");
}
