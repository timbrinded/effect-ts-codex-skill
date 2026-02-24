# Effect-TS Skill Reference Index

## Load when...

Open this file first when you need to choose which reference to load for an Effect-TS task.

## Covers

- Master navigation for all `references/*.md` files
- Intent x domain routing matrix
- One-line descriptions for each core, advanced, and examples file
- Pointers to official upstream docs and API search scripts

## Source anchors

- [Effect Docs](https://effect.website)
- [Effect LLM Docs Index (llms.txt)](https://effect.website/llms.txt)
- [Effect LLM Full Docs (llms-full.txt)](https://effect.website/llms-full.txt)
- [Effect API Reference](https://effect-ts.github.io/effect/)
- [Effect Testing Examples](https://www.effect.solutions/testing)

## TOC

- Routing matrix
- Core references
- Advanced opt-in references
- Example/snippet packs
- Script helpers
- Suggested load sequences

## Preferred patterns

- Load the smallest set of references that covers the task.
- Use `scripts/effect.sh` to verify exact docs/API details before asserting signatures or semantics.
- Open examples after choosing the domain reference so snippets match the architecture guidance.

## Pitfalls / anti-patterns

- Loading every reference file before understanding the user task.
- Treating examples as normative without checking the domain guidance and official docs.
- Mixing advanced/niche packages into a mainstream answer without confirming they are relevant.

## Debug checklist

- Did you classify the intent (`build/refactor/debug/test/migrate/explain/performance`)?
- Did you classify the domain (`core/schema/services/concurrency/streams/platform/testing/advanced`)?
- Did you verify exact APIs with `api search` or `docs section` when needed?
- Did you select the matching examples file (if code generation is needed)?

## Snippet index

- `references/examples-core.md`
- `references/examples-testing.md`
- `references/examples-streams.md`
- `references/examples-schema-services.md`
- `references/examples-platform.md`

## Search seeds

- `Effect.gen Layer Context.Tag`
- `@effect/vitest TestClock it.effect`
- `Stream Sink mapEffect backpressure`
- `Effect vs Promise`
- `Schema Arbitrary`

## Routing matrix

| Intent | Domain | Open first | Open next | Verify with script |
| --- | --- | --- | --- | --- |
| build | core/services | `core-effect-runtime.md` | `services-context-layer.md` | `api search`, `docs search` |
| refactor | promise/async | `migration-and-comparisons.md` | `code-style-and-anti-patterns.md` | `docs search --full` |
| debug | failures/interruption | `errors-cause-exit.md` | `concurrency-fibers.md` | `docs section` |
| test | unit/integration/property | `testing.md` | `examples-testing.md` | `docs section`, `api search` |
| build/refactor | schema boundary | `schema.md` | `examples-schema-services.md` | `docs search`, `api search` |
| build/debug | streams | `streams-and-sinks.md` | `examples-streams.md` | `api search` |
| build | platform | `platform-runtime-filesystem-http.md` | `examples-platform.md` | `docs search`, `api search` |
| explain/perf | concurrency | `concurrency-fibers.md` | `state-caching-queues-pubsub.md` | `docs section` |
| advanced | AI/workflow | `advanced-ai-workflow.md` | `source-links.md` | `docs search`, `docs section` |
| advanced | niche ecosystem | `advanced-ecosystem.md` | `source-links.md` | `api search`, `docs search` |

## Core references

- `workflow-routing.md` — intent classification, repo/tooling inspection, first command choices.
- `code-style-and-anti-patterns.md` — opinionated Effect coding standards and forbidden patterns.
- `core-effect-runtime.md` — core `Effect` mental model, constructors, composition, runtime entrypoints.
- `errors-cause-exit.md` — failures, defects, causes, exit handling, debugging shape.
- `services-context-layer.md` — `Context.Tag`, `Layer`, dependency graphs, testability-first design.
- `concurrency-fibers.md` — fibers, interruption, racing, parallelism, coordination primitives.
- `resource-management-scope.md` — `Scope`, finalization, resource lifecycles.
- `schema.md` — schema-first boundaries, decoding/encoding, transformations, Arbitrary tie-ins.
- `testing.md` — `@effect/vitest`, `TestClock`, property testing, test layers.
- `streams-and-sinks.md` — stream/sink workflows, leftovers, concurrency, backpressure.
- `state-caching-queues-pubsub.md` — `Ref`, `SubscriptionRef`, cache, queue/pubsub patterns.
- `scheduling-and-retries.md` — schedules, retries, repetition, cron, jitter/backoff.
- `platform-runtime-filesystem-http.md` — `@effect/platform` runtime/filesystem/path/terminal basics.
- `observability.md` — logging, tracing, metrics, diagnostic workflow.
- `data-types-and-pattern-matching.md` — common data types and `Match` usage.
- `migration-and-comparisons.md` — Promise/fp-ts/ZIO migration/comparison guidance.

## Advanced opt-in references

- `advanced-ai-workflow.md` — Effect AI/workflow docs and volatility caveats.
- `advanced-ecosystem.md` — SQL/RPC/micro/trait/cluster and other niche package pointers.

## Example/snippet packs

- `examples-core.md` — core construction/composition/runtime snippets.
- `examples-testing.md` — `@effect/vitest`, `TestClock`, service layer tests, property tests.
- `examples-streams.md` — stream/sink pipelines and debugging-oriented examples.
- `examples-schema-services.md` — schema + service boundary examples.
- `examples-platform.md` — Bun-first platform runtime/filesystem/http patterns.

## Script helpers

Use the wrapper: `scripts/effect.sh`

- `cache status` / `cache refresh` — local cache management for official docs/index artifacts.
- `docs search` — discover official guides/topics quickly.
- `docs section` — extract exact sections from `llms-full.txt`.
- `api search` — find API docs pages/symbols in the official reference index.

## Suggested load sequences

### Refactor async/await service to Effect

1. `migration-and-comparisons.md`
2. `code-style-and-anti-patterns.md`
3. `services-context-layer.md`
4. `examples-schema-services.md` (if boundary validation is involved)
5. Verify APIs with `api search` and `docs section`

### Build tests for an Effect service

1. `testing.md`
2. `services-context-layer.md`
3. `examples-testing.md`
4. `schema.md` (if property testing/generated data is used)
5. Verify `TestClock` / `@effect/vitest` docs with `docs search` / `docs section`

### Diagnose fiber/interruption or timeout behavior

1. `errors-cause-exit.md`
2. `concurrency-fibers.md`
3. `resource-management-scope.md`
4. `scheduling-and-retries.md`
5. Verify exact semantics with `docs section --heading "Fibers"`
