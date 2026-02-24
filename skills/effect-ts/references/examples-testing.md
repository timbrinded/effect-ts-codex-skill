# Examples: Testing

## Load when...

You need Effect-native test snippets (`@effect/vitest`, `TestClock`, service test layers, property tests).

## Covers

- `it.effect` / `it.scoped` / `it.layer` examples
- `TestClock` time control
- Stateful in-memory test layers
- Property testing with schema-derived data

## Source anchors

- [TestClock](https://effect.website/docs/testing/testclock/)
- [Schema Arbitrary](https://effect.website/docs/schema/arbitrary/)
- [Effect Testing Examples](https://www.effect.solutions/testing)

## TOC

- Unit test with `it.effect`
- Layered service test
- Time-based test with `TestClock`
- Property test with schema-driven Arbitrary

## Preferred patterns

- Use `@effect/vitest` helpers instead of manual `runPromise` in tests.
- Provide services with test layers.
- Use `TestClock` for delays/retries/timeouts.

## Pitfalls / anti-patterns

- Real network or filesystem in unit tests.
- Real sleeps for time-dependent behavior.
- Mocking deep internals instead of the service boundary.

## Debug checklist

- Does the test need `it.effect`, `it.scoped`, `it.layer`, or `it.prop`?
- Is time controlled with `TestClock`?
- Are external deps replaced by deterministic layers?

## Snippet index

- `it.effect`
- `it.layer`
- `TestClock.adjust`
- `it.prop` with schema

## Search seeds

- `@effect/vitest it.effect`
- `TestClock`
- `Schema Arbitrary`

## Unit test with `it.effect` [intent: test]

```ts
import { Effect } from "effect"
import { it, expect } from "@effect/vitest"

const add = (a: number, b: number) => Effect.succeed(a + b)

it.effect("adds numbers", () =>
  Effect.gen(function* () {
    const result = yield* add(2, 3)
    expect(result).toBe(5)
  })
)
```

## Layered service test with in-memory state [intent: test/debug]

```ts
import { Context, Effect, Layer, Ref } from "effect"
import { it, expect, layer } from "@effect/vitest"

class CounterRepo extends Context.Tag("CounterRepo")<
  CounterRepo,
  {
    readonly inc: Effect.Effect<number>
    readonly get: Effect.Effect<number>
  }
>() {}

const CounterRepoTest = Layer.effect(
  CounterRepo,
  Effect.gen(function* () {
    const ref = yield* Ref.make(0)
    return {
      inc: Ref.updateAndGet(ref, (n) => n + 1),
      get: Ref.get(ref)
    }
  })
)

layer(CounterRepoTest)("CounterRepo", (it) => {
  it.effect("increments in memory", () =>
    Effect.gen(function* () {
      const repo = yield* CounterRepo
      yield* repo.inc
      const value = yield* repo.get
      expect(value).toBe(1)
    })
  )
})
```

## Time-based test with `TestClock` [intent: test]

```ts
import { Effect, Duration, TestClock } from "effect"
import { it, expect } from "@effect/vitest"

it.effect("delay completes after virtual time advances", () =>
  Effect.gen(function* () {
    const fiber = yield* Effect.fork(Effect.sleep(Duration.seconds(5)).pipe(Effect.as("done")))
    yield* TestClock.adjust(Duration.seconds(5))
    const result = yield* Effect.join(fiber)
    expect(result).toBe("done")
  })
)
```

## Property test with schema-driven data [intent: test]

```ts
import { Effect, Schema, Arbitrary } from "effect"
import { it, expect } from "@effect/vitest"
import * as fc from "fast-check"

const Positive = Schema.Number.pipe(Schema.positive())

it.effect.prop("double is >= original for positive values", [Positive], ([n]) =>
  Effect.sync(() => {
    expect(n * 2).toBeGreaterThanOrEqual(n)
  })
)

// When you need manual sampling in helpers:
const samplePositive = () => fc.sample(Arbitrary.make(Positive)(fc), 1)[0]
```
