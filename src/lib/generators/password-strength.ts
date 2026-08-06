export interface StrengthCriteria {
  minLength8: boolean;
  minLength12: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

export interface StrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  entropyBits: number;
  criteria: StrengthCriteria;
  feedback: string[];
}

// A small sample of extremely common passwords/words — matching or nearly matching these
// caps the score regardless of raw entropy, since attackers try these first.
const COMMON_PASSWORDS = [
  "password", "123456", "123456789", "qwerty", "12345678", "111111", "1234567890",
  "letmein", "1234567", "admin", "welcome", "monkey", "login", "abc123", "starwars",
  "dragon", "passw0rd", "master", "hello", "freedom", "whatever", "qazwsx", "trustno1",
  "iloveyou", "football", "baseball", "shadow", "michael", "superman", "jennifer",
  "princess", "sunshine", "azerty", "000000", "password1", "changeme", "guest",
];

function hasSequential(password: string): boolean {
  const lower = password.toLowerCase();
  const sequences = ["abcdefgh", "qwertyui", "01234567", "12345678", "asdfghjk"];
  return sequences.some((seq) => {
    for (let i = 0; i <= seq.length - 4; i++) {
      if (lower.includes(seq.slice(i, i + 4))) return true;
    }
    return false;
  });
}

function hasRepeatedRun(password: string): boolean {
  return /(.)\1{2,}/.test(password);
}

function estimatePoolSize(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  return pool || 1;
}

export function evaluatePassword(password: string): StrengthResult {
  const criteria: StrengthCriteria = {
    minLength8: password.length >= 8,
    minLength12: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^a-zA-Z0-9]/.test(password),
  };

  if (password.length === 0) {
    return { score: 0, label: "Empty", entropyBits: 0, criteria, feedback: ["Start typing to see your strength."] };
  }

  const poolSize = estimatePoolSize(password);
  let entropyBits = password.length * Math.log2(poolSize);

  const feedback: string[] = [];
  const lower = password.toLowerCase();
  const isCommon = COMMON_PASSWORDS.some((common) => lower === common || lower.includes(common));

  if (isCommon) {
    entropyBits = Math.min(entropyBits, 15);
    feedback.push("This is a known common password — avoid it entirely.");
  }
  if (hasSequential(password)) {
    entropyBits *= 0.6;
    feedback.push("Avoid sequential characters like \"abcd\" or \"1234\".");
  }
  if (hasRepeatedRun(password)) {
    entropyBits *= 0.7;
    feedback.push("Avoid repeating the same character multiple times in a row.");
  }
  if (!criteria.minLength12) {
    feedback.push("Use at least 12 characters for meaningfully stronger security.");
  }
  if (!criteria.hasSymbol) {
    feedback.push("Add a symbol (like ! or #) to increase complexity.");
  }
  if (!criteria.hasUpper || !criteria.hasLower) {
    feedback.push("Mix uppercase and lowercase letters.");
  }

  let score: StrengthResult["score"];
  let label: string;
  if (entropyBits < 28) {
    score = 0;
    label = "Very Weak";
  } else if (entropyBits < 36) {
    score = 1;
    label = "Weak";
  } else if (entropyBits < 60) {
    score = 2;
    label = "Fair";
  } else if (entropyBits < 80) {
    score = 3;
    label = "Strong";
  } else {
    score = 4;
    label = "Very Strong";
  }

  if (feedback.length === 0) feedback.push("Great password — no obvious weaknesses detected.");

  return { score, label, entropyBits, criteria, feedback };
}

const GENERATOR_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*-_=+";

/** Generates a cryptographically random password using the browser's Web Crypto API. Client-only. */
export function generateStrongPassword(length = 16): string {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (v) => GENERATOR_CHARSET[v % GENERATOR_CHARSET.length]).join("");
}
