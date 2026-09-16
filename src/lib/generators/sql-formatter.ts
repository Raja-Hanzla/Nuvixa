const KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "IS", "NULL", "AS", "ON",
  "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "CROSS",
  "GROUP", "BY", "ORDER", "HAVING", "LIMIT", "OFFSET",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "UNION", "ALL", "DISTINCT",
  "ASC", "DESC", "BETWEEN", "LIKE", "EXISTS", "CASE", "WHEN", "THEN", "ELSE", "END",
  "COUNT", "SUM", "AVG", "MIN", "MAX",
  "CREATE", "TABLE", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "DEFAULT", "UNIQUE",
  "INDEX", "ALTER", "DROP", "ADD", "COLUMN",
]);

/** Multi-word clause starters, longest first so e.g. "LEFT OUTER JOIN" matches before "LEFT JOIN". */
const CLAUSE_STARTERS: string[][] = [
  ["LEFT", "OUTER", "JOIN"], ["RIGHT", "OUTER", "JOIN"], ["FULL", "OUTER", "JOIN"],
  ["LEFT", "JOIN"], ["RIGHT", "JOIN"], ["INNER", "JOIN"], ["FULL", "JOIN"], ["CROSS", "JOIN"],
  ["GROUP", "BY"], ["ORDER", "BY"], ["INSERT", "INTO"], ["DELETE", "FROM"], ["UNION", "ALL"],
  ["SELECT"], ["FROM"], ["WHERE"], ["JOIN"], ["HAVING"], ["LIMIT"], ["OFFSET"],
  ["SET"], ["VALUES"], ["UPDATE"], ["UNION"],
];

interface Token {
  text: string;
  isString: boolean;
  precededBySpace: boolean;
}

const TOKEN_RE = /'(?:[^'\\]|\\.|'')*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|[(),;]|[^\s(),;'"`]+/g;

function tokenize(sql: string): Token[] {
  const tokens: Token[] = [];
  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(sql)) !== null) {
    const text = m[0];
    const isString = /^['"`]/.test(text);
    const precededBySpace = m.index === 0 || /\s/.test(sql[m.index - 1]);
    tokens.push({ text, isString, precededBySpace });
  }
  return tokens;
}

function buildLines(raw: string): string[] {
  const input = raw.trim();
  if (!input) return [];

  const tokens = tokenize(input);
  const lines: string[] = [];
  let current = "";
  let depth = 0;

  const flush = () => {
    lines.push(current);
    current = "";
  };

  const append = (text: string) => {
    if (current.length === 0 || current.trim() === "" || current.endsWith("(")) {
      current += text;
    } else {
      current += " " + text;
    }
  };

  let i = 0;
  while (i < tokens.length) {
    if (depth === 0) {
      let matched: string[] | null = null;
      for (const phrase of CLAUSE_STARTERS) {
        if (i + phrase.length > tokens.length) continue;
        let ok = true;
        for (let k = 0; k < phrase.length; k++) {
          const tk = tokens[i + k];
          if (tk.isString || tk.text.toUpperCase() !== phrase[k]) {
            ok = false;
            break;
          }
        }
        if (ok) {
          matched = phrase;
          break;
        }
      }
      if (matched) {
        if (current.length > 0) flush();
        current = matched.join(" ");
        i += matched.length;
        continue;
      }
    }

    const t = tokens[i];
    const tUpper = t.isString ? "" : t.text.toUpperCase();

    if (!t.isString && depth === 0 && (tUpper === "AND" || tUpper === "OR")) {
      if (current.length > 0) flush();
      current = "  " + tUpper;
      i++;
      continue;
    }

    if (t.text === ",") {
      current += ",";
      if (depth === 0) {
        flush();
        current = "  ";
      }
      i++;
      continue;
    }

    if (t.text === "(") {
      if (current.length > 0 && t.precededBySpace) {
        current += " (";
      } else {
        current += "(";
      }
      depth++;
      i++;
      continue;
    }

    if (t.text === ")") {
      depth = Math.max(0, depth - 1);
      current += ")";
      i++;
      continue;
    }

    if (t.text === ";") {
      current += ";";
      flush();
      i++;
      continue;
    }

    const displayText = t.isString ? t.text : KEYWORDS.has(tUpper) ? tUpper : t.text;
    append(displayText);
    i++;
  }

  if (current.trim().length > 0) flush();

  return lines.filter((line) => line.length > 0);
}

/** Formats raw SQL into clean, multi-line, uppercase-keyword output. */
export function formatSql(raw: string): string {
  return buildLines(raw).join("\n");
}

/** Collapses formatted SQL back into a single, uppercase-keyword line. */
export function compactSql(raw: string): string {
  return buildLines(raw)
    .map((line) => line.trim())
    .join(" ");
}

export const sampleSql = `select o.id, o.created_at, u.name, u.email, sum(oi.price * oi.quantity) as total from orders o inner join users u on u.id = o.user_id left join order_items oi on oi.order_id = o.id where o.status = 'completed' and o.created_at > '2024-01-01' group by o.id, o.created_at, u.name, u.email order by o.created_at desc limit 50;`;
