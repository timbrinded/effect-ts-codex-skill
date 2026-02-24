# Effect-TS Source Links

## Load when...

You need canonical upstream links (official docs/API/examples) or want to verify a topic in the latest docs before answering.

## Covers

- Official Effect docs links grouped by category
- API reference and API search index locations
- Testing examples site
- Comparison/migration links
- Inspiration repo link (Claude Effect skill) for structure ideas only

## Source anchors

- [Effect Docs Home](https://effect.website)
- [Effect API Reference](https://effect-ts.github.io/effect/)
- [Effect LLM Index](https://effect.website/llms.txt)
- [Effect LLM Full Docs](https://effect.website/llms-full.txt)
- [Effect Testing Examples](https://www.effect.solutions/testing)

## TOC

- Core docs categories
- Testing and schema
- Concurrency/streams/platform
- Migration/comparisons
- Advanced opt-in docs
- API docs endpoints
- External inspiration

## Preferred patterns

- Prefer official `effect.website` and `effect-ts.github.io` links for factual claims.
- Use `scripts/effect.sh docs search` / `docs section` / `api search` before quoting signatures or semantics.
- Use the testing examples site for practical test shapes, then verify semantics in official docs.

## Pitfalls / anti-patterns

- Relying on old blog posts or unofficial snippets when official docs cover the topic.
- Treating community examples as source-of-truth for exact API signatures.
- Using advanced package docs without first confirming the package is relevant.

## Debug checklist

- Is the claim about exact API shape? Use `api search`.
- Is the claim about guide semantics or behavior? Use `docs section`.
- Is the topic advanced/volatile? Prefer live docs over memory.

## Snippet index

- For runnable snippets, open one of `examples-*.md` files instead.
- `examples-testing.md` pairs with [Effect Testing Examples](https://www.effect.solutions/testing).

## Search seeds

- `Fibers interruption`
- `Layer services`
- `Schema Arbitrary`
- `TestClock`
- `Effect vs Promise`

## Core docs categories

### Runtime, core, code style

- [Introduction to Runtime](https://effect.website/docs/runtime/)
- [Code Style Guidelines](https://effect.website/docs/code-style/guidelines/)
- [Dual APIs](https://effect.website/docs/code-style/dual/)
- [Pattern Matching](https://effect.website/docs/code-style/pattern-matching/)
- [Default Services](https://effect.website/docs/requirements-management/default-services/)

### Services and layers

- [Managing Services](https://effect.website/docs/requirements-management/services/)
- [Managing Layers](https://effect.website/docs/requirements-management/layers/)
- [Layer Memoization](https://effect.website/docs/requirements-management/layer-memoization/)

### Error management and diagnostics

- [Expected Errors](https://effect.website/docs/error-management/expected-errors/)
- [Error Channel Operations](https://effect.website/docs/error-management/error-channel-operations/)
- [Fallback](https://effect.website/docs/error-management/fallback/)
- [Matching (errors)](https://effect.website/docs/error-management/matching/)
- [Cause](https://effect.website/docs/data-types/cause/)
- [Exit](https://effect.website/docs/data-types/exit/)

## Testing and schema

- [TestClock](https://effect.website/docs/testing/testclock/)
- [Schema Introduction](https://effect.website/docs/schema/introduction/)
- [Schema Basic Usage](https://effect.website/docs/schema/basic-usage/)
- [Schema Classes](https://effect.website/docs/schema/classes/)
- [Schema Transformations](https://effect.website/docs/schema/transformations/)
- [Schema Error Formatters](https://effect.website/docs/schema/error-formatters/)
- [Schema Arbitrary](https://effect.website/docs/schema/arbitrary/)
- [Effect Testing Examples (community site)](https://www.effect.solutions/testing)

## Concurrency, streams, state, scheduling

- [Fibers](https://effect.website/docs/concurrency/fibers/)
- [Basic Concurrency](https://effect.website/docs/concurrency/basic-concurrency/)
- [Deferred](https://effect.website/docs/concurrency/deferred/)
- [Queue](https://effect.website/docs/concurrency/queue/)
- [PubSub](https://effect.website/docs/concurrency/pubsub/)
- [Semaphore](https://effect.website/docs/concurrency/semaphore/)
- [Ref](https://effect.website/docs/state-management/ref/)
- [SubscriptionRef](https://effect.website/docs/state-management/subscriptionref/)
- [Stream Introduction](https://effect.website/docs/stream/introduction/)
- [Sink Introduction](https://effect.website/docs/sink/introduction/)
- [Sink Operations](https://effect.website/docs/sink/operations/)
- [Scheduling Introduction](https://effect.website/docs/scheduling/introduction/)
- [Built-In Schedules](https://effect.website/docs/scheduling/built-in-schedules/)
- [Schedule Examples](https://effect.website/docs/scheduling/examples/)
- [Cron](https://effect.website/docs/scheduling/cron/)

## Platform and observability

- [Platform Runtime](https://effect.website/docs/platform/runtime/)
- [FileSystem](https://effect.website/docs/platform/file-system/)
- [Path](https://effect.website/docs/platform/path/)
- [HttpClient](https://effect.website/docs/platform/http-client/)
- [Terminal](https://effect.website/docs/platform/terminal/)
- [KeyValueStore](https://effect.website/docs/platform/key-value-store/)
- [Logging](https://effect.website/docs/observability/logging/)
- [Metrics](https://effect.website/docs/observability/metrics/)
- [Tracing](https://effect.website/docs/observability/tracing/)

## Migration and comparisons

- [Effect vs Promise](https://effect.website/docs/additional-resources/effect-vs-promise/)
- [Effect vs fp-ts](https://effect.website/docs/additional-resources/effect-vs-fp-ts/)
- [Coming From ZIO](https://effect.website/docs/additional-resources/coming-from-zio/)
- [Myths About Effect](https://effect.website/docs/additional-resources/myths/)

## Advanced opt-in docs

- [Effect AI Introduction](https://effect.website/docs/ai/introduction/)
- [Effect AI Getting Started](https://effect.website/docs/ai/getting-started/)
- [Planning LLM Interactions](https://effect.website/docs/ai/planning-llm-interactions/)
- [AI Tool Use](https://effect.website/docs/ai/tool-use/)
- [Workflow / API docs index (via API search)](https://effect-ts.github.io/effect/)
- [Micro docs (via llms search)](https://effect.website/docs/micro/)
- [Trait docs (via llms search)](https://effect.website/docs/trait/)

## API docs endpoints

- [API Reference Root](https://effect-ts.github.io/effect/)
- [API Search Index JSON](https://effect-ts.github.io/effect/assets/js/search-data.json)

## External inspiration (structure only)

- [Claude Effect skill repo](https://github.com/andrueandersoncs/claude-skill-effect-ts)
- [Claude effect-core skill example](https://raw.githubusercontent.com/andrueandersoncs/claude-skill-effect-ts/main/skills/effect-core/SKILL.md)
- [Claude testing skill example](https://raw.githubusercontent.com/andrueandersoncs/claude-skill-effect-ts/main/skills/testing/SKILL.md)
