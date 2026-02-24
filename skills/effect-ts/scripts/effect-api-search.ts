import { extractSnippet, hasFlag, parseNumberFlag, printJson, readSourceJson, stringFlag, trimArgs } from "./_effect_common";

interface ApiRow {
  readonly doc: string;
  readonly title: string;
  readonly content: string;
  readonly url: string;
  readonly relUrl?: string;
}

interface ApiHit {
  readonly doc: string;
  readonly title: string;
  readonly url: string;
  readonly snippet: string;
  readonly score: number;
}

function usage(): never {
  console.error("Usage: effect-api-search.ts <query> [--doc <Doc.ts>] [--limit N] [--json]");
  process.exit(1);
}

function score(query: string, row: ApiRow): number {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  const title = row.title.toLowerCase();
  const doc = row.doc.toLowerCase();
  const content = row.content.toLowerCase();
  let value = 0;
  if (title === q) value += 1000;
  if (title.startsWith(q)) value += 700;
  else if (title.includes(q)) value += 500;
  if (doc === q) value += 450;
  if (doc.startsWith(q)) value += 300;
  else if (doc.includes(q)) value += 200;
  if (content.includes(q)) value += 120;
  for (const term of terms) {
    if (title === term) value += 250;
    else if (title.startsWith(term)) value += 120;
    else if (title.includes(term)) value += 60;
    if (doc.includes(term)) value += 35;
    if (content.includes(term)) value += 10;
  }
  return value;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0) usage();
  const docFilter = stringFlag(args, "--doc")?.toLowerCase();
  const limit = Math.max(1, Math.min(parseNumberFlag(args, "--limit", 10), 50));
  const json = hasFlag(args, "--json");
  const queryParts = trimArgs(args, ["--doc", "--limit"]).filter((arg) => arg !== "--json");
  const query = queryParts.join(" ").trim();
  if (!query) usage();

  const payload = await readSourceJson<Record<string, ApiRow>>("apiSearchIndex", { preferStaleOnError: true });
  const rows = Object.values(payload);
  const hits: ApiHit[] = [];

  for (const row of rows) {
    if (docFilter && !row.doc.toLowerCase().includes(docFilter)) continue;
    const hitScore = score(query, row);
    if (hitScore <= 0) continue;
    hits.push({
      doc: row.doc,
      title: row.title,
      url: `https://effect-ts.github.io${row.url}`,
      snippet: extractSnippet(row.content, query),
      score: hitScore,
    });
  }

  hits.sort((a, b) => b.score - a.score || a.doc.localeCompare(b.doc) || a.title.localeCompare(b.title));
  const output = hits.slice(0, limit);

  if (json) {
    printJson({ query, docFilter, count: output.length, hits: output });
    return;
  }

  process.stdout.write(`Query: ${query}\n${docFilter ? `Doc filter: ${docFilter}\n` : ""}Results: ${output.length}\n`);
  for (const [index, hit] of output.entries()) {
    process.stdout.write(`${index + 1}. ${hit.title} (${hit.doc}) [score=${hit.score}]\n`);
    process.stdout.write(`   URL: ${hit.url}\n`);
    if (hit.snippet) process.stdout.write(`   Snippet: ${hit.snippet}\n`);
  }
}

main().catch((error) => {
  console.error(String(error instanceof Error ? error.stack ?? error.message : error));
  process.exit(1);
});

