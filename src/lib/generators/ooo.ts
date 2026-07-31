export type OooReason =
  | "vacation"
  | "sick"
  | "parental"
  | "conference"
  | "general";

export type OooTone = "formal" | "friendly" | "casual";

export interface OooFormState {
  name: string;
  role: string;
  reason: OooReason;
  startDate: string;
  endDate: string;
  tone: OooTone;
  backupName: string;
  backupEmail: string;
  note: string;
}

export const oooReasonLabels: Record<OooReason, string> = {
  vacation: "Vacation",
  sick: "Sick leave",
  parental: "Parental leave",
  conference: "Conference / offsite",
  general: "General leave",
};

export const oooToneLabels: Record<OooTone, string> = {
  formal: "Formal",
  friendly: "Friendly",
  casual: "Casual",
};

function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const openers: Record<OooTone, string> = {
  formal: "Thank you for your email.",
  friendly: "Thanks so much for reaching out!",
  casual: "Thanks for the email!",
};

const reasonLine: Record<OooReason, Record<OooTone, string>> = {
  vacation: {
    formal: "I am currently out of the office on vacation",
    friendly: "I'm currently out of the office on vacation",
    casual: "I'm out on vacation",
  },
  sick: {
    formal: "I am currently out of the office due to illness",
    friendly: "I'm out sick and away from my inbox",
    casual: "I'm out sick right now",
  },
  parental: {
    formal: "I am currently on parental leave",
    friendly: "I'm currently on parental leave",
    casual: "I'm on parental leave",
  },
  conference: {
    formal: "I am currently attending a conference and away from my desk",
    friendly: "I'm currently at a conference and away from my desk",
    casual: "I'm at a conference and mostly offline",
  },
  general: {
    formal: "I am currently out of the office",
    friendly: "I'm currently out of the office",
    casual: "I'm out of the office",
  },
};

const closers: Record<OooTone, string> = {
  formal: "I appreciate your patience and will respond as soon as possible upon my return.",
  friendly: "Thanks for your patience — I'll get back to you as soon as I'm back!",
  casual: "Appreciate the patience — I'll reply as soon as I'm back!",
};

const signOffs: Record<OooTone, string> = {
  formal: "Best regards,",
  friendly: "Best,",
  casual: "Cheers,",
};

export function generateOoo(form: OooFormState): string {
  const { name, role, reason, startDate, endDate, tone, backupName, backupEmail, note } = form;

  const displayName = name.trim() || "[Your name]";
  const displayRole = role.trim();
  const start = formatDate(startDate) || "[start date]";
  const end = formatDate(endDate) || "[return date]";

  const lines: string[] = [];
  lines.push(openers[tone]);
  lines.push("");

  const dateRange =
    startDate && endDate
      ? `from ${start} through ${end}`
      : startDate
        ? `starting ${start}`
        : endDate
          ? `until ${end}`
          : "";

  lines.push(`${reasonLine[reason][tone]}${dateRange ? " " + dateRange : ""}, with limited or no access to email.`);

  if (note.trim()) {
    lines.push("");
    lines.push(note.trim());
  }

  if (backupName.trim() || backupEmail.trim()) {
    lines.push("");
    const contactBits = [backupName.trim(), backupEmail.trim()].filter(Boolean).join(" at ");
    lines.push(
      `For anything urgent before ${end}, please reach out to ${contactBits || "my backup contact"} and I'll follow up as soon as I'm back.`
    );
  }

  lines.push("");
  lines.push(closers[tone]);
  lines.push("");
  lines.push(signOffs[tone]);
  lines.push(displayName);
  if (displayRole) lines.push(displayRole);

  return lines.join("\n");
}

export const defaultOooForm: OooFormState = {
  name: "",
  role: "",
  reason: "vacation",
  startDate: "",
  endDate: "",
  tone: "friendly",
  backupName: "",
  backupEmail: "",
  note: "",
};
