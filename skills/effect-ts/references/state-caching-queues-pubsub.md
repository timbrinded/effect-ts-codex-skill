# State Caching Queues PubSub

## Load when...

You are modeling concurrent state, cache behavior, or asynchronous coordination using `Ref`, `SubscriptionRef`, `Queue`, `PubSub`, or caching modules.

## Covers

- State primitives (`Ref`, `SubscriptionRef`) and when to use them
- Queue/PubSub coordination choices
- Cache and caching-effects pointers
- Stateful test layer patterns

## Source anchors

- [Ref](https://effect.website/docs/state-management/ref/)
- [SubscriptionRef](https://effect.website/docs/state-management/subscriptionref/)
- [Queue](https://effect.website/docs/concurrency/queue/)
- [PubSub](https://effect.website/docs/concurrency/pubsub/)
- [Cache](https://effect.website/docs/caching/cache/)
- [Caching Effects](https://effect.website/docs/caching/caching-effects/)

## TOC

- Choosing primitives
- Coordination patterns
- Caching
- Testing stateful services

## Preferred patterns

- Use `Ref` for localized concurrent state with controlled updates.
- Use `SubscriptionRef` when consumers need to react to changes.
- Use `Queue` for work distribution/backpressure; use `PubSub` for broadcasting semantics.
- Model caches explicitly and test hit/miss/eviction behavior deterministically.

## Pitfalls / anti-patterns

- Using shared mutable JS objects/maps across fibers without synchronization strategy.
- Using `PubSub` when queue semantics (single consumer or work queue) are needed.
- Caching without clear invalidation or visibility into misses/staleness.

## Debug checklist

- Is this state local, shared, or reactive?
- Should consumers each receive every message (PubSub) or should work be distributed (Queue)?
- Can a test layer hold state in `Ref` for deterministic assertions?
- Are cache boundaries and invalidation rules explicit?

## Snippet index

- `references/examples-testing.md` — stateful in-memory layer testing patterns
- `references/examples-streams.md` — queue/stream integration examples

## Search seeds

- `Ref SubscriptionRef`
- `Queue PubSub`
- `Cache caching effects`
- `stateful test layer`

## Notes

When in doubt, start with the simplest primitive (`Ref` or `Queue`) and add complexity only when the required semantics demand it.
