# Observability

## Load when...

You need logging, tracing, or metrics guidance for Effect applications, or you are debugging production-like behavior.

## Covers

- Logging/tracing/metrics entry points and patterns
- How to instrument without contaminating domain logic
- Failure diagnostics workflow using logs + `Cause`/`Exit`

## Source anchors

- [Logging](https://effect.website/docs/observability/logging/)
- [Tracing](https://effect.website/docs/observability/tracing/)
- [Metrics](https://effect.website/docs/observability/metrics/)
- [Cause](https://effect.website/docs/data-types/cause/)

## TOC

- Instrumentation boundaries
- Logging patterns
- Tracing/metrics pointers
- Debug workflow

## Preferred patterns

- Instrument at boundaries and important workflow transitions, not every trivial step.
- Keep domain logic return values/errors structured; let observability layers/loggers format output.
- Correlate logs with retries/timeouts/interruption using explicit context where possible.

## Pitfalls / anti-patterns

- Sprinkling ad hoc `console.log`/logging side effects throughout domain code.
- Logging away typed error details by immediately stringifying everything.
- Adding instrumentation that changes control flow or error semantics.

## Debug checklist

- Do logs show typed errors/causes clearly?
- Can retries/timeouts be distinguished in telemetry?
- Are metrics emitted at the correct boundary (request/job/stream stage)?

## Snippet index

- `references/examples-core.md` (structured error handling boundaries)
- `references/examples-streams.md` (instrumenting stream stages without obscuring flow)

## Search seeds

- `observability logging tracing metrics`
- `Cause diagnostics`
- `Exit`

## Notes

Use this file with `errors-cause-exit.md` for failure diagnosis and with domain references for instrumentation placement decisions.
