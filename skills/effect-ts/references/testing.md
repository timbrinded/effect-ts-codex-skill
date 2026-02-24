# Testing

## Load when...

You are writing, fixing, or reviewing tests for Effect code, especially with `@effect/vitest`, service layers, `TestClock`, or property tests.

## Covers

- `@effect/vitest` test variants (`it.effect`, `it.scoped`, `it.live`, `it.layer`, `it.prop`)
- Service-oriented testing with layer-provided test doubles
- `TestClock` for deterministic time
- Property testing with schema-derived generators
- Practical patterns from effect.solutions/testing

## Source anchors

- [TestClock](https://effect.website/docs/testing/testclock/)
- [Schema Arbitrary](https://effect.website/docs/schema/arbitrary/)
- [Effect Testing Examples](https://www.effect.solutions/testing)
- [Managing Layers](https://effect.website/docs/requirements-management/layers/)

## TOC

- Testing principles
- Effect test functions
- Service test layers
- Time control
- Property testing
- Debugging flaky tests

## Preferred patterns

- Use `@effect/vitest` helpers so tests run effects with the right environment/scoping semantics.
- Replace external dependencies with service test layers (in-memory/stub implementations).
- Use `TestClock` for time-based logic (retries, schedules, delays, timeouts) instead of real waiting.
- Prefer schema-driven generators/property tests for domain invariants when inputs have rich constraints.

## Pitfalls / anti-patterns

- Calling real APIs/databases/filesystems in unit tests.
- Using real sleeps/timers for retry/schedule tests.
- Manually `runPromise`-ing effects in plain tests when `@effect/vitest` helpers are available.
- Mocking deep internals instead of replacing service dependencies at the layer boundary.

## Debug checklist

- Can this dependency become a `Context.Tag` + test layer?
- Can `TestClock` replace real time?
- Does the test need `it.effect`, `it.scoped`, `it.layer`, or `it.prop`?
- Are flaky failures due to hidden concurrency, real I/O, or leaked state between tests?

## Snippet index

- `references/examples-testing.md` — canonical test patterns (effect/layer/scoped/clock/property)
- `references/examples-schema-services.md` — service + schema setup that makes tests straightforward

## Search seeds

- `@effect/vitest it.effect`
- `TestClock`
- `Schema Arbitrary`
- `property testing`
- `layers tests`

## Notes

### Strong testing rule

If code is hard to test with layers and `@effect/vitest`, that is usually an architecture smell (hidden I/O, missing services, or boundary validation mixed into core logic).

### Practical use of effect.solutions/testing

Use the examples site to quickly recall idiomatic `@effect/vitest` shapes (`it.effect`, `it.scoped`, clock manipulation, layer setup). Then verify exact semantics/signatures with official docs and API search if needed.
