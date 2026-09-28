function stripDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Splits arbitrary text — sentences, camelCase, snake_case, acronym runs — into clean lowercase-able word tokens. */
export function splitWords(input: string): string[] {
  const cleaned = stripDiacritics(input).replace(/[_\-.]+/g, " ");
  const matches = cleaned.match(/[A-Z]{2,}(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|[0-9]+/g);
  return matches ? matches.filter(Boolean) : [];
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export interface CaseConversionResult {
  words: string[];
  slug: string;
  kebabCase: string;
  snakeCase: string;
  camelCase: string;
  pascalCase: string;
  constantCase: string;
  titleCase: string;
  sentenceCase: string;
}

export function convertCase(input: string): CaseConversionResult {
  const words = splitWords(input);

  const kebabCase = words.map((w) => w.toLowerCase()).join("-");
  const snakeCase = words.map((w) => w.toLowerCase()).join("_");
  const constantCase = words.map((w) => w.toUpperCase()).join("_");
  const camelCase = words.map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w))).join("");
  const pascalCase = words.map((w) => capitalize(w)).join("");
  const titleCase = words.map((w) => capitalize(w)).join(" ");
  const sentenceCase = words.length === 0 ? "" : words.map((w, i) => (i === 0 ? capitalize(w) : w.toLowerCase())).join(" ");

  return {
    words,
    slug: kebabCase,
    kebabCase,
    snakeCase,
    camelCase,
    pascalCase,
    constantCase,
    titleCase,
    sentenceCase,
  };
}

export const sampleCaseInput = "10 Best Coffee Shops in New York City!";
