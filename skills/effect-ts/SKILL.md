---
name: "effect-ts"
description: "Strongly opinionated Effect-TS coding, refactoring, debugging, and testing guidance for TypeScript projects using the `effect` ecosystem. Use when the user is working with Effect, Effect.Schema, `Context.Tag`, `Layer`, fibers/concurrency, `Stream`/`Sink`, `@effect/vitest`, `@effect/platform`, retries/schedules, or migrating from Promise/fp-ts/ZIO-style code to idiomatic Effect. Do not use for generic English uses of the word effect unrelated to the Effect-TS library."
---

# Effect-TS

Use this skill for TypeScript work in the Effect ecosystem. Be strongly opinionated toward idiomatic, testable Effect code and use the bundled scripts to verify exact API/docs details from official sources.

## Stance (important)

Default to these patterns unless the user explicitly asks otherwise:

- Prefer `Effect.gen` for sequential workflows.
- Push I/O behind services (`Context.Tag`) and provide implementations via `Layer`.
- Use `Schema` at boundaries (decode/encode/validation) instead of ad hoc parsing.
- Prefer typed failures (`Data.TaggedError` or domain error types) over thrown exceptions.
- Treat raw `Promise` as a boundary concern only.
- Prefer `@effect/vitest` (`it.effect`, `it.scoped`, `it.live`, `it.layer`, `it.prop`) for tests.
- Keep domain logic pure and dependency-injected.

## Prerequisite check (Bun-first)

The bundled helper scripts are Bun-first.

```bash
command -v bun >/dev/null 2>&1 && bun --version
```

If Bun is missing:

1. Read the relevant `references/*.md` files directly.
2. Use links from `references/source-links.md`.
3. Provide commands/examples in Bun-first style, but also note Node alternatives if the repo is not using Bun.

## Quick start (scripts)

Set the wrapper path once:

```bash
export EFFECT_SKILL="/Users/timbo/workspace/personal/effect-codex/skills/effect-ts/scripts/effect.sh"
```

Common commands:

```bash
"$EFFECT_SKILL" cache status
"$EFFECT_SKILL" cache refresh
"$EFFECT_SKILL" docs search "TestClock"
"$EFFECT_SKILL" docs search "Effect vs Promise" --full --limit 5
"$EFFECT_SKILL" docs section --heading "Fibers" --max-lines 80
"$EFFECT_SKILL" docs section --link "https://effect.website/docs/testing/testclock/"
"$EFFECT_SKILL" api search "Stream.mapEffect" --limit 10
```

## Routing workflow (intent x domain)

1. Classify the user intent: `build`, `refactor`, `debug`, `test`, `migrate`, `explain`, `performance`.
2. Classify the domain: core runtime, schema, services/layers, concurrency, streams, platform, testing, advanced.
3. Open the matching reference file(s) from the list below.
4. Use scripts for exact/latest API and docs confirmation before making claims about signatures or behavior.
5. Implement/refactor with the guardrails in this file + the domain reference.

### Fast routing matrix

- `build` + core/services: open `references/core-effect-runtime.md` and `references/services-context-layer.md`
- `refactor` from async/await: open `references/migration-and-comparisons.md`, `references/code-style-and-anti-patterns.md`
- `debug` failures/interruption: open `references/errors-cause-exit.md`, `references/concurrency-fibers.md`
- `test`: open `references/testing.md` and an `examples-testing` snippet
- `schema` boundary/data parsing: open `references/schema.md` and `references/examples-schema-services.md`
- `streams`: open `references/streams-and-sinks.md` and `references/examples-streams.md`
- `platform` filesystem/http/runtime: open `references/platform-runtime-filesystem-http.md` and `references/examples-platform.md`
- `performance`/parallelism/backpressure: open `references/concurrency-fibers.md`, `references/streams-and-sinks.md`, `references/state-caching-queues-pubsub.md`
- advanced/niche package work: open `references/advanced-ai-workflow.md` or `references/advanced-ecosystem.md`, then verify live docs with scripts

## Core guardrails (hard rules)

### Architecture

- Do not embed external I/O directly into business logic when a service boundary is appropriate.
- Prefer `Context.Tag` service interfaces + `Layer` wiring for dependencies.
- Separate live layers from test layers.
- Keep `Effect.run*` at app boundaries, CLI entrypoints, or tests (not scattered through domain code).

### Error handling

- Prefer `Effect.fail` / typed error values over `throw`.
- Convert exceptions at boundaries with `Effect.try` / `Effect.tryPromise`.
- Inspect rich failure information with `Cause` / `Exit` when debugging.

### Data boundaries

- Prefer `Schema.decodeUnknown`, `Schema.parseJson`, and schema transformations for inputs/outputs.
- Avoid raw `JSON.parse` in domain logic unless immediately wrapped and validated.

### Concurrency

- Be explicit about parallel vs sequential execution.
- Use Effect concurrency operators/fibers rather than ad hoc shared mutable state.
- Respect interruption and scope lifecycles when introducing background work.

### Testing

- Prefer `@effect/vitest` helpers over manually calling `Effect.runPromise` inside plain Vitest tests.
- Test services with `Layer`-provided test doubles/in-memory implementations.
- Use `TestClock` for time-dependent logic; do not wait on real time in unit tests.

## Open only what you need (progressive disclosure)

### Core references

- `references/workflow-routing.md` — task classification, repo inspection, first-command choices
- `references/code-style-and-anti-patterns.md` — idioms and anti-patterns (strongly opinionated)
- `references/core-effect-runtime.md` — `Effect<A, E, R>` fundamentals and runtime entrypoints
- `references/errors-cause-exit.md` — failure semantics and debugging
- `references/services-context-layer.md` — services, layers, dependency graphs
- `references/concurrency-fibers.md` — fibers, interruption, racing, coordination
- `references/resource-management-scope.md` — scope/finalization and resource lifecycles
- `references/schema.md` — Schema workflows, decoding, transformations, Arbitrary tie-ins
- `references/testing.md` — `@effect/vitest`, `TestClock`, property tests, service test layers
- `references/streams-and-sinks.md` — stream/sink workflows and debugging
- `references/state-caching-queues-pubsub.md` — state primitives, queues, pubsub, cache
- `references/scheduling-and-retries.md` — schedules, retries, backoff, jitter
- `references/platform-runtime-filesystem-http.md` — `@effect/platform` runtime and I/O boundaries
- `references/observability.md` — logs/traces/metrics guidance
- `references/data-types-and-pattern-matching.md` — Option/Either/Cause/etc. and Match
- `references/migration-and-comparisons.md` — Promise/fp-ts/ZIO migrations and comparisons

### Advanced opt-in references

- `references/advanced-ai-workflow.md` — Effect AI/workflow docs and usage notes (volatile; verify live docs)
- `references/advanced-ecosystem.md` — niche/advanced packages (volatile; verify live docs/API)

### Snippet packs (examples only)

- `references/examples-core.md`
- `references/examples-testing.md`
- `references/examples-streams.md`
- `references/examples-schema-services.md`
- `references/examples-platform.md`

### Link index

- `references/index.md` — master navigation
- `references/source-links.md` — canonical upstream links by category

## Script usage details

### `scripts/effect.sh`

Wrapper for all helper scripts. Use it instead of calling `.ts` files directly.

- `cache status` — report cache freshness and file sizes
- `cache refresh [--force]` — refresh upstream docs/index artifacts into local cache
- `docs search` — search `llms.txt` or `llms-full.txt`
- `docs section` — extract a doc section by heading regex or docs URL
- `api search` — search the official API docs index for symbols/pages

### `scripts/effect-docs-search.ts`

Use when you need official docs discovery or keyword lookup (topics, guides, testing concepts, migration docs).

### `scripts/effect-docs-section.ts`

Use when you need to pull the exact section text context (e.g. `Fibers`, `TestClock`, schedules, schema features).

### `scripts/effect-api-search.ts`

Use when the task depends on exact API doc pages or symbol names (e.g. `Fiber`, `Deferred`, `Stream.mapEffect`, `Layer.provide`).

## Source-of-truth policy

- Local references are for workflow guidance, idioms, anti-patterns, and curated snippets.
- Official docs + API docs are the source of truth for exact signatures and behavior.
- For advanced/volatile packages (AI/workflow/niche ecosystem), always verify current docs with the bundled scripts before answering.

## Output expectations when using this skill

- Explain the chosen Effect architecture (services/layers/errors/schema boundaries) briefly.
- Show idiomatic code, not just API trivia.
- Name failure modes (typed errors, interruption, resource cleanup, backpressure, retries) when relevant.
- For tests, prefer deterministic test layers and `TestClock` over real side effects/time.
