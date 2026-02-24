# Scheduling And Retries

## Load when...

You are implementing retries, repetition, cron-like schedules, timeouts, or time-driven workflows in Effect.

## Covers

- Schedule basics and composition
- Retry and repetition strategies
- Backoff/jitter patterns
- Cron and periodic execution pointers
- Testing schedules with `TestClock`

## Source anchors

- [Scheduling Introduction](https://effect.website/docs/scheduling/introduction/)
- [Built-In Schedules](https://effect.website/docs/scheduling/built-in-schedules/)
- [Schedule Combinators](https://effect.website/docs/scheduling/schedule-combinators/)
- [Schedule Examples](https://effect.website/docs/scheduling/examples/)
- [Cron](https://effect.website/docs/scheduling/cron/)
- [TestClock](https://effect.website/docs/testing/testclock/)

## TOC

- When to retry
- Backoff/jitter
- Repetition/periodic work
- Testing with time control

## Preferred patterns

- Treat retry policy as a first-class decision (what errors, how often, when to stop).
- Use jitter/backoff for external calls to reduce synchronized retry storms.
- Separate retry policy from business logic where possible.
- Test time-based behavior with `TestClock` instead of real delays.

## Pitfalls / anti-patterns

- Retrying non-idempotent operations blindly.
- Using real timers in tests for retry logic.
- Hiding retry behavior deep inside services without surfacing policy intent.

## Debug checklist

- What failures should be retried vs fail fast?
- Is the operation idempotent or compensatable?
- Is the policy observable/logged for debugging?
- Can the behavior be tested with `TestClock`?

## Snippet index

- `references/examples-core.md` — simple retry wrappers
- `references/examples-testing.md` — `TestClock` schedule tests

## Search seeds

- `Schedule built-in`
- `Schedule combinators`
- `Cron`
- `TestClock retries`

## Notes

Pair this file with `errors-cause-exit.md` when debugging retry exhaustion or fallback behavior.
