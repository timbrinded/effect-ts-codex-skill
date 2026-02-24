import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export type SourceId = "llmsIndex" | "llmsFull" | "llmsSmall" | "apiSearchIndex";

export interface SourceSpec {
  readonly id: SourceId;
  readonly url: string;
  readonly filename: string;
  readonly ttlMs: number;
  readonly kind: "text" | "json";
}

export interface CacheEntry {
  readonly id: SourceId;
  readonly url: string;
  readonly path: string;
  readonly fetchedAt: string;
  readonly bytes: number;
  readonly sha256: string;
  readonly etag?: string;
  readonly lastModified?: string;
}

interface Manifest {
  readonly version: 1;
  readonly entries: Partial<Record<SourceId, CacheEntry>>;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const SOURCE_SPECS: Record<SourceId, SourceSpec> = {
  llmsIndex: {
    id: "llmsIndex",
    url: "https://effect.website/llms.txt",
    filename: "llms.txt",
    ttlMs: DAY_MS,
    kind: "text",
  },
  llmsFull: {
    id: "llmsFull",
    url: "https://effect.website/llms-full.txt",
    filename: "llms-full.txt",
    ttlMs: DAY_MS,
    kind: "text",
  },
  llmsSmall: {
    id: "llmsSmall",
    url: "https://effect.website/llms-small.txt",
    filename: "llms-small.txt",
    ttlMs: DAY_MS,
    kind: "text",
  },
  apiSearchIndex: {
    id: "apiSearchIndex",
    url: "https://effect-ts.github.io/effect/assets/js/search-data.json",
    filename: "api-search-data.json",
    ttlMs: DAY_MS,
    kind: "json",
  },
};

export const SOURCE_ORDER: SourceId[] = [
  "llmsIndex",
  "llmsFull",
  "llmsSmall",
  "apiSearchIndex",
];

export const CACHE_ROOT = path.join(
  process.env.XDG_CACHE_HOME ?? path.join(process.env.HOME ?? ".", ".cache"),
  "codex",
  "effect-ts",
);

const MANIFEST_PATH = path.join(CACHE_ROOT, "manifest.json");

function defaultManifest(): Manifest {
  return { version: 1, entries: {} };
}

export function sourcePath(id: SourceId): string {
  return path.join(CACHE_ROOT, SOURCE_SPECS[id].filename);
}

export async function ensureCacheDir(): Promise<void> {
  await mkdir(CACHE_ROOT, { recursive: true });
}

export async function loadManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw) as Manifest;
    if (parsed.version !== 1 || typeof parsed.entries !== "object" || parsed.entries == null) {
      return defaultManifest();
    }
    return parsed;
  } catch {
    return defaultManifest();
  }
}

export async function saveManifest(manifest: Manifest): Promise<void> {
  await ensureCacheDir();
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export function isStale(entry: CacheEntry | undefined, spec: SourceSpec): boolean {
  if (!entry) return true;
  const fetched = Date.parse(entry.fetchedAt);
  if (Number.isNaN(fetched)) return true;
  return Date.now() - fetched > spec.ttlMs;
}

function sha256Hex(data: Uint8Array): string {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

function nowIso(): string {
  return new Date().toISOString();
}

export interface EnsureSourceOptions {
  readonly force?: boolean;
  readonly preferStaleOnError?: boolean;
}

export async function ensureSource(
  id: SourceId,
  options: EnsureSourceOptions = {},
): Promise<CacheEntry> {
  const spec = SOURCE_SPECS[id];
  await ensureCacheDir();
  const manifest = await loadManifest();
  const current = manifest.entries[id];
  const targetPath = sourcePath(id);
  const hasFile = await fileExists(targetPath);
  const needsFetch = options.force === true || !current || !hasFile || isStale(current, spec);

  if (!needsFetch && current) {
    return current;
  }

  const headers = new Headers();
  if (current?.etag) headers.set("If-None-Match", current.etag);
  if (current?.lastModified) headers.set("If-Modified-Since", current.lastModified);

  let response: Response;
  try {
    response = await fetch(spec.url, { headers });
  } catch (error) {
    if (options.preferStaleOnError !== false && current && hasFile) return current;
    throw error;
  }

  if (response.status === 304 && current && hasFile) {
    const size = (await stat(targetPath)).size;
    const updated: CacheEntry = {
      ...current,
      fetchedAt: nowIso(),
      bytes: size,
      path: targetPath,
    };
    const nextManifest: Manifest = {
      version: 1,
      entries: { ...manifest.entries, [id]: updated },
    };
    await saveManifest(nextManifest);
    return updated;
  }

  if (!response.ok) {
    if (options.preferStaleOnError !== false && current && hasFile) return current;
    throw new Error(`Failed to fetch ${spec.url} (${response.status} ${response.statusText})`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  await writeFile(targetPath, bytes);
  const entry: CacheEntry = {
    id,
    url: spec.url,
    path: targetPath,
    fetchedAt: nowIso(),
    bytes: bytes.byteLength,
    sha256: sha256Hex(bytes),
    etag: response.headers.get("etag") ?? undefined,
    lastModified: response.headers.get("last-modified") ?? undefined,
  };
  const nextManifest: Manifest = {
    version: 1,
    entries: { ...manifest.entries, [id]: entry },
  };
  await saveManifest(nextManifest);
  return entry;
}

export async function ensureAllSources(options: EnsureSourceOptions = {}): Promise<CacheEntry[]> {
  const entries: CacheEntry[] = [];
  for (const id of SOURCE_ORDER) {
    entries.push(await ensureSource(id, options));
  }
  return entries;
}

export async function readSourceText(
  id: Extract<SourceId, "llmsIndex" | "llmsFull" | "llmsSmall">,
  options?: EnsureSourceOptions,
): Promise<string> {
  const entry = await ensureSource(id, options);
  return readFile(entry.path, "utf8");
}

export async function readSourceJson<T>(id: Extract<SourceId, "apiSearchIndex">, options?: EnsureSourceOptions): Promise<T> {
  const entry = await ensureSource(id, options);
  const raw = await readFile(entry.path, "utf8");
  return JSON.parse(raw) as T;
}

export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export function formatBytes(value: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let n = value;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  const digits = i === 0 ? 0 : 1;
  return `${n.toFixed(digits)} ${units[i]}`;
}

export function formatAgeMs(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function parseNumberFlag(
  args: string[],
  flag: string,
  defaultValue: number,
): number {
  const index = args.indexOf(flag);
  if (index === -1) return defaultValue;
  const value = args[index + 1];
  if (!value) return defaultValue;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

export function hasFlag(args: string[], ...flags: string[]): boolean {
  return flags.some((flag) => args.includes(flag));
}

export function stringFlag(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
}

export function trimArgs(args: string[], consumedFlags: string[]): string[] {
  const consumed = new Set<number>();
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (consumedFlags.includes(arg)) {
      consumed.add(i);
      if (i + 1 < args.length && !args[i + 1]?.startsWith("--")) consumed.add(i + 1);
    }
  }
  return args.filter((_, index) => !consumed.has(index));
}

export function printJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export function normalizeDocsUrl(url: string): string {
  const parsed = new URL(url);
  const pathname = parsed.pathname.endsWith("/") && parsed.pathname !== "/" ? parsed.pathname.slice(0, -1) : parsed.pathname;
  return `${parsed.origin}${pathname}`;
}

export function normalizeAnchor(value: string): string {
  return value.replace(/^#/, "").trim().toLowerCase();
}

export function headingTextToSlug(text: string): string {
  const stripped = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return stripped
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function headingLevel(line: string): number | null {
  const match = /^(#{1,6})\s+/.exec(line);
  return match ? match[1]!.length : null;
}

export function extractSnippet(content: string, query: string, width = 180): string {
  const normalized = normalizeWhitespace(content);
  if (normalized.length <= width) return normalized;
  const q = query.toLowerCase();
  const index = normalized.toLowerCase().indexOf(q);
  if (index === -1) return `${normalized.slice(0, width - 1)}…`;
  const start = Math.max(0, index - Math.floor(width / 3));
  const end = Math.min(normalized.length, start + width);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < normalized.length ? "…" : "";
  return `${prefix}${normalized.slice(start, end)}${suffix}`;
}

