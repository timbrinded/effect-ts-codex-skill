import {
  headingLevel,
  headingTextToSlug,
  normalizeAnchor,
  normalizeDocsUrl,
  parseNumberFlag,
  printJson,
  readSourceText,
  stringFlag,
} from "./_effect_common";

interface Heading {
  readonly index: number;
  readonly level: number;
  readonly text: string;
  readonly pageTitle?: string;
  readonly pageUrl?: string;
  readonly isPageHeading: boolean;
  readonly slug: string;
}

function usage(): never {
  console.error(
    "Usage: effect-docs-section.ts (--heading <regex> | --link <effect.website/docs/...>) [--context-lines N] [--max-lines N] [--json]",
  );
  process.exit(1);
}

function parseHeadings(lines: string[]): Heading[] {
  const headings: Heading[] = [];
  let pageTitle: string | undefined;
  let pageUrl: string | undefined;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    const pageMatch = /^# \[(.+?)\]\((https:\/\/effect\.website\/docs\/[^)]+)\)\s*$/.exec(line);
    if (pageMatch) {
      pageTitle = pageMatch[1]!;
      pageUrl = pageMatch[2]!;
      headings.push({
        index: i,
        level: 1,
        text: pageTitle,
        pageTitle,
        pageUrl,
        isPageHeading: true,
        slug: headingTextToSlug(pageTitle),
      });
      continue;
    }
    const level = headingLevel(line);
    if (level == null) continue;
    const text = line.replace(/^#{1,6}\s+/, "").trim();
    headings.push({
      index: i,
      level,
      text,
      pageTitle,
      pageUrl,
      isPageHeading: false,
      slug: headingTextToSlug(text),
    });
  }
  return headings;
}

function findSectionEnd(headings: Heading[], target: Heading, totalLines: number): number {
  const targetPos = headings.findIndex((h) => h.index === target.index && h.level === target.level && h.text === target.text);
  for (let i = targetPos + 1; i < headings.length; i += 1) {
    const next = headings[i]!;
    if (next.level <= target.level) return next.index;
  }
  return totalLines;
}

function parseLinkArg(linkArg: string): { baseUrl: string; anchor?: string } {
  const url = new URL(linkArg);
  return {
    baseUrl: normalizeDocsUrl(url.toString()),
    anchor: url.hash ? normalizeAnchor(url.hash) : undefined,
  };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0) usage();
  const headingPattern = stringFlag(args, "--heading");
  const linkArg = stringFlag(args, "--link");
  const json = args.includes("--json");
  const contextLines = Math.max(0, parseNumberFlag(args, "--context-lines", 0));
  const maxLines = Math.max(1, parseNumberFlag(args, "--max-lines", 200));

  if ((headingPattern ? 1 : 0) + (linkArg ? 1 : 0) !== 1) usage();

  const text = await readSourceText("llmsFull", { preferStaleOnError: true });
  const lines = text.split(/\r?\n/);
  const headings = parseHeadings(lines);

  let target: Heading | undefined;
  if (headingPattern) {
    let regex: RegExp;
    try {
      regex = new RegExp(headingPattern, "i");
    } catch (error) {
      throw new Error(`Invalid heading regex: ${String(error)}`);
    }
    target = headings.find((h) => regex.test(h.text));
  } else if (linkArg) {
    const { baseUrl, anchor } = parseLinkArg(linkArg);
    if (!anchor) {
      target = headings.find((h) => h.isPageHeading && h.pageUrl && normalizeDocsUrl(h.pageUrl) === baseUrl);
    } else {
      target = headings.find(
        (h) =>
          h.pageUrl != null &&
          normalizeDocsUrl(h.pageUrl) === baseUrl &&
          h.slug === anchor,
      );
      if (!target) {
        target = headings.find(
          (h) =>
            h.pageUrl != null &&
            normalizeDocsUrl(h.pageUrl) === baseUrl &&
            headingTextToSlug(h.text) === anchor,
        );
      }
    }
  }

  if (!target) {
    console.error("No matching section found.");
    process.exit(2);
  }

  const end = findSectionEnd(headings, target, lines.length);
  const start = Math.max(0, target.index - contextLines);
  const sliced = lines.slice(start, end);
  const limited = sliced.slice(0, maxLines);
  const truncated = sliced.length > limited.length;

  if (json) {
    printJson({
      heading: target.text,
      level: target.level,
      pageTitle: target.pageTitle,
      pageUrl: target.pageUrl,
      startLine: start + 1,
      endLineExclusive: Math.min(end, start + maxLines),
      truncated,
      content: limited.join("\n"),
    });
    return;
  }

  process.stdout.write(`Heading: ${target.text}\n`);
  if (target.pageTitle) process.stdout.write(`Page: ${target.pageTitle}\n`);
  if (target.pageUrl) process.stdout.write(`URL: ${target.pageUrl}\n`);
  process.stdout.write(`Lines: ${start + 1}-${Math.min(end, start + maxLines)}${truncated ? " (truncated)" : ""}\n\n`);
  process.stdout.write(`${limited.join("\n")}\n`);
}

main().catch((error) => {
  console.error(String(error instanceof Error ? error.stack ?? error.message : error));
  process.exit(1);
});

