# Code Style And Anti-Patterns

## Load when...

You are generating or refactoring Effect code and need strong idiomatic rules plus explicit anti-patterns to avoid.

## Covers

- Strong defaults for idiomatic Effect code in this skill
- Allowed alternatives and when to use them
- Anti-pattern catalog with preferred rewrites
- Review checklist for generated patches

## Source anchors

- [Effect Code Style Guidelines](https://effect.website/docs/code-style/guidelines/)
- [Dual APIs](https://effect.website/docs/code-style/dual/)
- [Pattern Matching](https://effect.website/docs/code-style/pattern-matching/)
- [Effect vs Promise](https://effect.website/docs/additional-resources/effect-vs-promise/)

## TOC

- Core style rules
- Alternatives and tradeoffs
- Anti-patterns
- Review checklist

## Preferred patterns

- Prefer `Effect.gen(function* () { ... })` for multi-step sequential flows.
- Keep `Effect.run*` at app/test boundaries; return `Effect` values from library/domain code.
- Use `Context.Tag` + `Layer` for effectful dependencies.
- Prefer pipeable/data-last style for consistency unless local codebase convention differs.
- Encode input/output boundaries with `Schema` and domain-specific error types.

## Pitfalls / anti-patterns

- Direct `fetch`, DB calls, filesystem calls, or env reads inside business logic functions.
- Wrapping everything in `Effect.sync` including code that returns promises (use `Effect.promise` / `Effect.tryPromise`).
- Throwing exceptions inside domain logic instead of using typed failures.
- Nested `flatMap` chains when `Effect.gen` is clearer.
- Calling `Effect.runPromise` inside every helper instead of composing effects.
- Unit tests that sleep real time instead of using `TestClock`.

## Debug checklist

- Did you move side effects to service boundaries?
- Did you preserve/introduce typed error channels?
- Did you keep runtime execution at boundaries only?
- Did you choose sequential vs parallel composition explicitly?
- Did test code use `@effect/vitest` and layers when appropriate?

## Snippet index

- `references/examples-core.md` (sequential composition, error conversion, runtime boundaries)
- `references/examples-schema-services.md` (services + schema boundaries)
- `references/examples-testing.md` (idiomatic tests)

## Search seeds

- `Effect.gen`
- `Dual APIs`
- `Pattern Matching`
- `Effect vs Promise`
- `Data.TaggedError`

## Notes

### Allowed alternatives (state them explicitly when chosen)

- `pipe(...)` + `Effect.flatMap/map` is acceptable for short pipelines or when matching existing code style.
- Data-first APIs are acceptable in localized helper composition, but prefer consistency within a file.
- `async/await` can remain at integration edges when a full migration is out of scope; convert at the boundary and keep domain logic in Effect.

### Review rewrite patterns

- Replace `try/catch + throw` with `Effect.try` / `Effect.tryPromise` and typed `catch` mapping.
- Replace direct singleton clients with service tags and injected layer implementations.
- Replace ad hoc validation with `Schema` decode/parse at boundaries.
- Replace hidden concurrency with explicit `Effect.all`, `forEach`, race, or fiber operators.
