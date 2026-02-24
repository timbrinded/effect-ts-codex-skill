import {
  extractSnippet,
  hasFlag,
  normalizeWhitespace,
  parseNumberFlag,
  printJson,
  readSourceText,
  stringFlag,
  trimArgs,
} from "./_effect_common";

interface Hit {
  readonly title: string;
  readonly url?: string;
  readonly snippet: string;
  readonly source: "llms-index" | "llms-full";
  readonly score: number;
}

interface ParsedIndexRow {
  readonly title: string;
  readonly url: string;
  readonly description: string;
}

interface ParsedFullRow {
  readonly title: string;
  readonly url?: string;
  readonly body: string;
}

function usage(): never {
  console.error("Usage: effect-docs-search.ts <query> [--full|--index] [--limit N] [--json]");
  process.exit(1);
}

function scoreField(query: string, value: string, weight: number): number {
  const q = query.toLowerCase();
  const v = value.toLowerCase();
  if (!v) return 0;
  let score = 0;
  if (v === q) score += weight * 8;
  if (v.includes(q)) score += weight * (v.startsWith(q) ? 6 : 4);
  const terms = q.split(/\s+/).filter(Boolean);
  for (const term of terms) {
    if (v === term) score += weight * 4;
    else if (v.startsWith(term)) score += weight * 3;
    else if (v.includes(term)) score += weight * 1;
  }
  return score;
}

function parseLlmsIndex(text: string): ParsedIndexRow[] {
  const rows: ParsedIndexRow[] = [];
  const re = /^- \[(.+?)\]\((https:\/\/effect\.website\/docs\/[^)]+)\):\s*(.*)$/;
  for (const line of text.split(/\r?\n/)) {
    const match = re.exec(line.trim());
    if (!match) continue;
    rows.push({
      title: match[1]!,
      url: match[2]!,
      description: match[3]!,
    });
  }
  return rows;
}

function parseLlmsFull(text: string): ParsedFullRow[] {
  const lines = text.split(/\r?\n/);
  const rows: ParsedFullRow[] = [];
  let currentPageTitle: string | undefined;
  let currentPageUrl: string | undefined;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    const pageMatch = /^# \[(.+?)\]\((https:\/\/effect\.website\/docs\/[^)]+)\)\s*$/.exec(line);
    if (pageMatch) {
      currentPageTitle = pageMatch[1]!;
      currentPageUrl = pageMatch[2]!;
      continue;
    }
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!headingMatch) continue;
    const level = headingMatch[1]!.length;
    const heading = headingMatch[2]!.trim();
    const bodyLines: string[] = [];
    for (let j = i + 1; j < lines.length; j += 1) {
      const next = lines[j]!;
      if (/^#{1,6}\s+/.test(next)) break;
      if (next.trim()) bodyLines.push(next.trim());
      if (bodyLines.length >= 6) break;
    }
    const contextPrefix =
      currentPageTitle && level > 1 ? `${heading} (${currentPageTitle})` : heading;
    rows.push({
      title: contextPrefix,
      url: currentPageUrl,
      body: normalizeWhitespace(bodyLines.join(" ")),
    });
  }
  return rows;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0) usage();

  const useFull = hasFlag(args, "--full");
  const useIndex = hasFlag(args, "--index");
  const json = hasFlag(args, "--json");
  const limit = Math.max(1, Math.min(parseNumberFlag(args, "--limit", 10), 50));
  const queryParts = trimArgs(args, ["--limit"]).filter(
    (arg) => !["--full", "--index", "--json"].includes(arg),
  );
  const query = queryParts.join(" ").trim();
  if (!query) usage();

  if (useFull && useIndex) {
    console.error("Choose only one of --full or --index");
    process.exit(1);
  }

  const source = useFull ? "llms-full" : "llms-index";
  const hits: Hit[] = [];

  if (source === "llms-index") {
    const text = await readSourceText("llmsIndex", { preferStaleOnError: true });
    for (const row of parseLlmsIndex(text)) {
      const score =
        scoreField(query, row.title, 10) +
        scoreField(query, row.url, 8) +
        scoreField(query, row.description, 4);
      if (score <= 0) continue;
      hits.push({
        title: row.title,
        url: row.url,
        snippet: extractSnippet(row.description, query),
        source: "llms-index",
        score,
      });
    }
  } else {
    const text = await readSourceText("llmsFull", { preferStaleOnError: true });
    for (const row of parseLlmsFull(text)) {
      const score =
        scoreField(query, row.title, 10) +
        scoreField(query, row.url ?? "", 8) +
        scoreField(query, row.body, 3);
      if (score <= 0) continue;
      hits.push({
        title: row.title,
        url: row.url,
        snippet: extractSnippet(row.body, query),
        source: "llms-full",
        score,
      });
    }
  }

  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const output = hits.slice(0, limit);

  if (json) {
    printJson({ query, source, count: output.length, hits: output });
    return;
  }

  process.stdout.write(`Query: ${query}\nSource: ${source}\nResults: ${output.length}\n`);
  for (const [index, hit] of output.entries()) {
    process.stdout.write(`${index + 1}. ${hit.title} [score=${hit.score}]\n`);
    if (hit.url) process.stdout.write(`   URL: ${hit.url}\n`);
    if (hit.snippet) process.stdout.write(`   Snippet: ${hit.snippet}\n`);
  }
}

main().catch((error) => {
  console.error(String(error instanceof Error ? error.stack ?? error.message : error));
  process.exit(1);
});

