import { loadManifest, SOURCE_ORDER, SOURCE_SPECS, ensureAllSources, ensureSource, formatAgeMs, formatBytes, isStale } from "./_effect_common";
import { stat } from "node:fs/promises";

function usage(): never {
  console.error("Usage: effect-cache.ts <status|refresh> [--force]");
  process.exit(1);
}

async function status(): Promise<void> {
  const manifest = await loadManifest();
  const rows: string[] = [];
  for (const id of SOURCE_ORDER) {
    const spec = SOURCE_SPECS[id];
    const entry = manifest.entries[id];
    if (!entry) {
      rows.push(`${id}: missing (${spec.url})`);
      continue;
    }
    let fileBytes = entry.bytes;
    try {
      fileBytes = (await stat(entry.path)).size;
    } catch {
      rows.push(`${id}: missing-file ${entry.path}`);
      continue;
    }
    const fetched = Date.parse(entry.fetchedAt);
    const age = Number.isNaN(fetched) ? "unknown" : formatAgeMs(Date.now() - fetched);
    const stale = isStale(entry, spec) ? "stale" : "fresh";
    rows.push(
      `${id}: ${stale} age=${age} size=${formatBytes(fileBytes)} fetchedAt=${entry.fetchedAt} path=${entry.path}`,
    );
  }
  process.stdout.write(`${rows.join("\n")}\n`);
}

async function refresh(force: boolean): Promise<void> {
  const entries = await ensureAllSources({ force, preferStaleOnError: false });
  for (const entry of entries) {
    process.stdout.write(
      `${entry.id}: ok size=${formatBytes(entry.bytes)} fetchedAt=${entry.fetchedAt} sha256=${entry.sha256.slice(0, 12)}\n`,
    );
  }
}

async function main(): Promise<void> {
  const [, , command, ...rest] = process.argv;
  if (!command) usage();
  if (command === "status") {
    await status();
    return;
  }
  if (command === "refresh") {
    const force = rest.includes("--force");
    if (!force) {
      for (const id of SOURCE_ORDER) {
        await ensureSource(id, { force: false, preferStaleOnError: false });
      }
      await refresh(false);
      return;
    }
    await refresh(true);
    return;
  }
  usage();
}

main().catch((error) => {
  console.error(String(error instanceof Error ? error.stack ?? error.message : error));
  process.exit(1);
});

