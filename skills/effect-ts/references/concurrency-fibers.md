# Concurrency Fibers

## Load when...

You need to reason about fibers, interruption, racing, parallelism, or coordination primitives in Effect.

## Covers

- Fiber mental model and structured concurrency
- Parallel vs sequential composition decisions
- Interruption/cancellation semantics
- Coordination primitives (Deferred/Queue/PubSub/Semaphore/Latch) pointers
- Performance/backpressure debugging cues

## Source anchors

- [Fibers](https://effect.website/docs/concurrency/fibers/)
- [Basic Concurrency](https://effect.website/docs/concurrency/basic-concurrency/)
- [Deferred](https://effect.website/docs/concurrency/deferred/)
- [Queue](https://effect.website/docs/concurrency/queue/)
- [PubSub](https://effect.website/docs/concurrency/pubsub/)
- [Semaphore](https://effect.website/docs/concurrency/semaphore/)

## TOC

- Mental model
- Parallel composition
- Interruption
- Coordination primitives
- Debugging

## Preferred patterns

- Choose sequential or parallel composition explicitly; make concurrency intent visible in code.
- Assume fibers are interruptible and design resource cleanup/scope ownership accordingly.
- Use coordination primitives instead of ad hoc shared mutable state.
- Use bounded queues/semaphores when pressure or fan-out needs control.

## Pitfalls / anti-patterns

- Treating Effect interruption like JS Promise cancellation (they are not identical mental models).
- Spawning background fibers without ownership/scope and forgetting cleanup.
- Unbounded fan-out with no backpressure or concurrency limits.
- Debugging timing issues without checking timeouts/races/interruption paths.

## Debug checklist

- Where is the fiber created and who owns its lifetime?
- Can the operation be interrupted? What cleanup runs?
- Is concurrency bounded and intentional?
- Would a `Deferred`, `Queue`, or `Semaphore` clarify coordination?

## Snippet index

- `references/examples-core.md` (sequential vs explicit composition)
- `references/examples-streams.md` (stream concurrency patterns)
- `references/examples-testing.md` (time/concurrency tests with `TestClock`)

## Search seeds

- `Fibers`
- `Basic Concurrency`
- `Deferred`
- `Queue PubSub Semaphore`
- `interruption`

## Notes

### Common debugging symptoms and likely causes

- Timeouts or "hung" work: blocked queue/deferred, missing completion, interrupted worker, or leaked scope.
- Work finishing twice: duplicated fiber startup or race without coordination.
- Throughput collapse: accidental sequentialization or unbounded contention.
- Memory growth: unbounded queues/pubsub/backlog or orphaned fibers.
