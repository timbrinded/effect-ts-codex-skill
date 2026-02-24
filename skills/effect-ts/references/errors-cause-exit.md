# Errors Cause Exit

## Load when...

You are debugging Effect failures, defects, interruptions, retries, or need to explain typed errors vs defects and structured exits.

## Covers

- Expected failures vs defects vs interruption
- `Cause` and `Exit` for diagnostics
- Error channel transforms and recovery patterns
- Failure reporting strategies in apps and tests

## Source anchors

- [Expected Errors](https://effect.website/docs/error-management/expected-errors/)
- [Error Channel Operations](https://effect.website/docs/error-management/error-channel-operations/)
- [Fallback](https://effect.website/docs/error-management/fallback/)
- [Cause](https://effect.website/docs/data-types/cause/)
- [Exit](https://effect.website/docs/data-types/exit/)

## TOC

- Failure model
- Recovery operators
- Cause/Exit diagnostics
- Debug workflow

## Preferred patterns

- Model domain failures in the error channel with explicit error types.
- Use `Cause`/`Exit` when debugging richer failure behavior (defects/interruption).
- Keep retry/fallback decisions explicit and local to the boundary that owns them.
- Preserve structured failure details in logs/tests instead of flattening to strings too early.

## Pitfalls / anti-patterns

- Treating all failures as exceptions and losing typed error information.
- Masking defects as expected errors without investigation.
- Ignoring interruption when debugging timeouts/cancellation-like behavior.
- Overusing catch-all recovery and hiding root causes.

## Debug checklist

- Is the failure in the error channel (`E`) or a defect/bug?
- Was the fiber interrupted (timeout/race/scope shutdown)?
- Can `runPromiseExit` or test assertions inspect `Exit` instead of throwing?
- Should you add logging around layer acquisition/finalization?

## Snippet index

- `references/examples-core.md` (typed error conversion)
- `references/examples-testing.md` (asserting failures with Effect-aware tests)
- `references/examples-streams.md` (stream failure propagation patterns)

## Search seeds

- `Cause interruption defect`
- `Exit runPromiseExit`
- `error channel operations`
- `fallback`

## Notes

### Debug workflow for mysterious failures

1. Reproduce with the smallest effect possible.
2. Switch to `runPromiseExit` (or Effect-aware test assertions) to inspect `Exit`.
3. Distinguish typed failure, defect, and interruption.
4. Check scope/layer lifecycle and timeouts if interruption is present.
5. Only add retries/fallbacks after understanding the original cause.
