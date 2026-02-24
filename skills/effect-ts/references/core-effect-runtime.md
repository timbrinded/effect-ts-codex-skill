# Core Effect Runtime

## Load when...

You need the fundamental `Effect<A, E, R>` mental model, constructors/composition patterns, or runtime entrypoint guidance.

## Covers

- `Effect<A, E, R>` (success/error/requirements) mental model
- Constructors (`succeed`, `fail`, `sync`, `try`, `promise`, `tryPromise`)
- Composition (`map`, `flatMap`, `andThen`, `tap`, `all`, generator syntax)
- Runtime entrypoints (`runPromise`, `runPromiseExit`, `runSync`, `runSyncExit`)
- Boundary placement for execution and environment provision

## Source anchors

- [Introduction to Runtime](https://effect.website/docs/runtime/)
- [Effect vs Promise](https://effect.website/docs/additional-resources/effect-vs-promise/)
- [Dual APIs](https://effect.website/docs/code-style/dual/)
- [API Reference Root](https://effect-ts.github.io/effect/)

## TOC

- Mental model
- Constructors
- Composition
- Running effects
- Boundary patterns

## Preferred patterns

- Model library functions as returning `Effect`; delay execution to app/test boundaries.
- Use `Effect.gen` for sequential business workflows and dependency access (`yield* SomeService`).
- Convert foreign async/sync exceptions at boundaries with `Effect.try` / `Effect.tryPromise`.
- Use `runPromiseExit` when you need structured success/failure rather than exceptions.

## Pitfalls / anti-patterns

- Mixing `await` throughout an Effect program instead of composing effects.
- Using `runSync` on effects that may suspend or require async execution.
- Returning raw promises from some branches and `Effect` from others.
- Hiding side effects in `Effect.succeed` instead of `sync`/`try`/`tryPromise`.

## Debug checklist

- Confirm the function boundary: should it return `Effect` or execute?
- Confirm if the effect may fail/require services and whether those types are preserved.
- Confirm async boundaries use `tryPromise` for typed error mapping.
- Use `api search` to confirm exact runtime helper names if unsure.

## Snippet index

- `references/examples-core.md` — constructors, composition, runtime entrypoints
- `references/examples-schema-services.md` — boundary decoding + service use

## Search seeds

- `Effect.gen`
- `runPromiseExit`
- `Dual APIs`
- `Effect.tryPromise`
- `runtime`

## Notes

### Practical decision rules

- If the function belongs to domain/application logic: return `Effect`.
- If the function is the top-level CLI/main/test adapter: call `Effect.run*`.
- If the operation can throw synchronously: use `Effect.try`.
- If the operation returns a promise: use `Effect.promise` (untyped error) or `Effect.tryPromise` (typed error mapping).
- If multiple independent effects can run together: use explicit parallel composition rather than implicit async behavior.

### Signature reading reminder

`Effect<A, E, R>` means:

- `A`: success value
- `E`: typed failure channel (expected failures)
- `R`: required environment/services

Preserve this information instead of collapsing to `Promise<any>`.
