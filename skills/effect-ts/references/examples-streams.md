# Examples: Streams

## Load when...

You need stream/sink snippet patterns for build/debug/performance tasks.

## Covers

- Stream pipeline composition
- `mapEffect` style stages and error mapping
- Sink collection/aggregation
- Debug-oriented decomposition

## Source anchors

- [Stream Introduction](https://effect.website/docs/stream/introduction/)
- [Sink Introduction](https://effect.website/docs/sink/introduction/)
- [Sink Operations](https://effect.website/docs/sink/operations/)

## TOC

- Build: simple stream pipeline
- Debug: isolate failing stage
- Sink: aggregate results
- Performance: bound concurrency (conceptual pattern)

## Preferred patterns

- Keep stream stages small and testable.
- Separate source, transform, and sink concerns.
- Make concurrency/buffering choices explicit.

## Pitfalls / anti-patterns

- Unbounded collection into memory.
- Hiding errors inside broad catch-all stages.
- Debugging large pipelines without isolating a minimal failing stage.

## Debug checklist

- Can you replace the source with `fromIterable`?
- Which stage fails or stalls?
- Is sink behavior (including leftovers) what you expect?

## Snippet index

- stream transform pipeline
- debugging stage isolation
- sink aggregation
- bounded concurrency pattern

## Search seeds

- `Stream mapEffect`
- `Sink collect`
- `Stream concurrency`

## Build: simple pipeline [intent: build]

```ts
import { Effect, Stream } from "effect"

const pipeline = Stream.fromIterable([1, 2, 3]).pipe(
  Stream.map((n) => n * 2),
  Stream.mapEffect((n) => Effect.succeed(String(n)))
)
```

## Debug: isolate a failing stage [intent: debug]

```ts
import { Data, Effect, Stream } from "effect"

class ParseError extends Data.TaggedError("ParseError")<{ readonly input: string }> {}

const parseNumber = (input: string) =>
  Number.isNaN(Number(input))
    ? Effect.fail(new ParseError({ input }))
    : Effect.succeed(Number(input))

const stage = Stream.fromIterable(["1", "x", "3"]).pipe(Stream.mapEffect(parseNumber))

// Debug by running only this stage with a small deterministic source.
```

## Sink: aggregate results [intent: build]

```ts
import { Effect, Sink, Stream } from "effect"

const program = Stream.fromIterable([1, 2, 3, 4]).pipe(
  Stream.run(Sink.foldLeft(0, (acc, n) => acc + n))
)

const sum = await Effect.runPromise(program)
```

## Performance: bounded concurrency (conceptual) [intent: performance]

```ts
// Prefer explicit concurrency limits when effectful stages call external services.
// Verify exact operators/signatures with: scripts/effect.sh api search "Stream concurrency"
```
