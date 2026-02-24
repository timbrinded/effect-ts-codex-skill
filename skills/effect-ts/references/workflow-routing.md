# Workflow Routing

## Load when...

You need to decide how to approach an Effect task before writing code (which references to open, which scripts to run, what repo facts to inspect).

## Covers

- Intent classification (`build`, `refactor`, `debug`, `test`, `migrate`, `explain`, `performance`)
- Domain classification (core/schema/services/concurrency/streams/platform/testing/advanced)
- Repo/tooling inspection checklist before suggesting code
- First-command recommendations for bundled docs/API scripts

## Source anchors

- [Effect Docs Home](https://effect.website)
- [Effect LLM Index](https://effect.website/llms.txt)
- [Effect API Reference](https://effect-ts.github.io/effect/)

## TOC

- Intent classification
- Domain classification
- Repo inspection checklist
- Script-first verification choices
- Common routing playbooks

## Preferred patterns

- Inspect the repository first: package manager, runtime, test runner, existing Effect version, module boundaries.
- Match the answer depth to the user intent (explain vs implement vs debug).
- Open one domain reference plus one example file instead of many files at once.
- Verify exact APIs with `scripts/effect.sh api search` before naming functions/signatures.

## Pitfalls / anti-patterns

- Jumping straight into code without checking whether the repo already standardizes on `Effect.gen`, `Layer`, or a test harness pattern.
- Mixing migration guidance with greenfield guidance without stating which path you chose.
- Treating a debug question as a rewrite request; debug first, then propose minimal changes.

## Debug checklist

- Confirm package manager (`pnpm`, `bun`, `npm`, `yarn`) and test runner before giving commands.
- Confirm the codebase is actually using Effect (imports from `effect`, `@effect/*`).
- Identify whether the question is about API discovery, semantics, or architecture.
- Select at most 2-3 reference files to start; expand only if blocked.

## Snippet index

- `references/examples-core.md` for greenfield build/refactor snippets
- `references/examples-testing.md` for `@effect/vitest` and `TestClock`
- `references/examples-streams.md` for stream pipelines
- `references/examples-schema-services.md` for schema + service boundary patterns

## Search seeds

- `Effect.gen`
- `Layer Context.Tag`
- `@effect/vitest it.effect`
- `Fibers interruption`
- `Stream backpressure`

## Notes

Use this mini workflow before implementation:

1. Inspect repo facts (`package.json`, `tsconfig`, test setup, existing Effect imports).
2. Classify intent and domain.
3. Load the matching domain reference and an examples file.
4. Run `api search` or `docs section` for exact semantics.
5. Implement the smallest change consistent with the repo's existing architecture.

### First script to run by task type

- API/symbol lookup: `scripts/effect.sh api search "<symbol>"`
- Guide/topic discovery: `scripts/effect.sh docs search "<topic>"`
- Exact section extraction: `scripts/effect.sh docs section --heading "<heading>"`
- Cache warmup before a long task: `scripts/effect.sh cache refresh`

### Repo inspection checklist (practical)

- Which runtime: Bun, Node, Deno?
- Which package manager and lockfile?
- Which test runner: Vitest + `@effect/vitest`, plain Vitest, Jest?
- Is `Schema` used already or is validation ad hoc?
- Are services modeled with `Context.Tag` + `Layer`, or direct modules?
- Are errors typed or thrown?
- Are there existing stream/platform modules to extend?
