# Streams And Sinks

## Load when...

You are building or debugging Effect streams/sinks, including composition, leftovers, concurrency, and backpressure behavior.

## Covers

- Stream/Sink mental model and composition patterns
- Sinks, leftovers, and result handling
- Concurrency/backpressure tuning cues
- Common stream failure/debugging workflows

## Source anchors

- [Stream Introduction](https://effect.website/docs/stream/introduction/)
- [Sink Introduction](https://effect.website/docs/sink/introduction/)
- [Sink Operations](https://effect.website/docs/sink/operations/)
- [Sink Leftovers](https://effect.website/docs/sink/leftovers/)

## TOC

- Mental model
- Composition patterns
- Sinks/leftovers
- Debugging
- Performance notes

## Preferred patterns

- Keep stream stages explicit and reason about element flow, errors, and end conditions.
- Choose sinks deliberately (fold/collect/count/etc.) based on output and memory behavior.
- Be explicit about concurrency and buffering decisions when using stream effects.
- Test stream stages with controlled inputs and deterministic service layers.

## Pitfalls / anti-patterns

- Collecting unbounded streams into memory accidentally.
- Ignoring leftovers semantics in sink composition.
- Hidden concurrency causing order/backpressure surprises.
- Debugging stream issues without isolating a minimal pipeline.

## Debug checklist

- What is the stream source, and can you replace it with a deterministic test source?
- Where are buffering/boundaries/concurrency limits configured?
- What sink is consuming the stream, and what are its leftover semantics?
- Is the issue order, throughput, memory, failure propagation, or cancellation?

## Snippet index

- `references/examples-streams.md` — stream/sink pipeline and debugging snippets
- `references/examples-testing.md` — stream-related tests with `@effect/vitest`/layers

## Search seeds

- `Stream introduction`
- `Sink leftovers`
- `Sink operations`
- `stream backpressure`

## Notes

For performance questions, pair this file with `concurrency-fibers.md` and `state-caching-queues-pubsub.md` to reason about queues, buffering, and coordination choices.
