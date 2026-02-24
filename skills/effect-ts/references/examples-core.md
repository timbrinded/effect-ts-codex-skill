# Examples: Core Effect

## Load when...

You need snippet-sized examples for core Effect creation/composition/runtime boundaries during build, refactor, debug, or migration work.

## Covers

- Constructors and typed error conversion
- `Effect.gen` sequential composition
- Boundary runtime execution
- Promise-to-Effect migration snippets
- Explicit parallel composition

## Source anchors

- [Effect vs Promise](https://effect.website/docs/additional-resources/effect-vs-promise/)
- [Introduction to Runtime](https://effect.website/docs/runtime/)
- [Dual APIs](https://effect.website/docs/code-style/dual/)

## TOC

- Build: sequential workflow with `Effect.gen`
- Refactor: convert promise boundary to typed Effect
- Debug: inspect `Exit`
- Performance: explicit parallel composition
- Migrate: wrap legacy sync code

## Preferred patterns

- Keep runtime execution at boundaries.
- Use `Effect.gen` for readable sequential workflows.
- Use typed error mapping at boundaries.

## Pitfalls / anti-patterns

- Calling `Effect.runPromise` inside library helpers.
- Throwing exceptions in domain logic.
- Mixing `await` and Effect composition in the same workflow body.

## Debug checklist

- Did you keep the function returning `Effect`?
- Did you map errors into a typed channel?
- Do you need `runPromiseExit` instead of `runPromise` for diagnostics?

## Snippet index

- Build: sequential workflow
- Refactor: `tryPromise`
- Debug: `runPromiseExit`
- Performance: `Effect.all`
- Migrate: `Effect.try`

## Search seeds

- `Effect.gen`
- `runPromiseExit`
- `Effect.tryPromise`
- `Effect.all`

## Build (sequential workflow with `Effect.gen`)

```ts
import { Data, Effect } from "effect"

class ParseError extends Data.TaggedError("ParseError")<{ readonly cause: unknown }> {}
class SaveError extends Data.TaggedError("SaveError")<{ readonly cause: unknown }> {}

const parseInput = (raw: string) =>
  Effect.try({
    try: () => JSON.parse(raw) as { id: string; amount: number },
    catch: (cause) => new ParseError({ cause })
  })

const saveRecord = (input: { id: string; amount: number }) =>
  Effect.tryPromise({
    try: () => Promise.resolve(input),
    catch: (cause) => new SaveError({ cause })
  })

export const program = (raw: string) =>
  Effect.gen(function* () {
    const input = yield* parseInput(raw)
    const saved = yield* saveRecord(input)
    return saved.id
  })
```

## Refactor (Promise boundary to typed Effect) [intent: refactor/migrate]

```ts
import { Data, Effect } from "effect"

class FetchUserError extends Data.TaggedError("FetchUserError")<{ readonly cause: unknown }> {}

const fetchUser = (id: string) =>
  Effect.tryPromise({
    try: () => fetch(`https://example.test/users/${id}`).then((r) => r.json()),
    catch: (cause) => new FetchUserError({ cause })
  })
```

## Debug (inspect `Exit`) [intent: debug]

```ts
import { Effect, Exit } from "effect"

const exit = await Effect.runPromiseExit(program('{"id":"u1","amount":42}'))

if (Exit.isFailure(exit)) {
  // Inspect failure/cause in tests or diagnostics without throwing.
  console.error(exit.cause)
}
```

## Performance (explicit parallel composition) [intent: build/performance]

```ts
import { Effect } from "effect"

const [user, orders] = await Effect.runPromise(
  Effect.all([
    fetchUser("u1"),
    Effect.succeed([{ id: "o1" }])
  ])
)
```

## Migrate (wrap legacy sync thrower) [intent: migrate]

```ts
import { Data, Effect } from "effect"

class LegacyDecodeError extends Data.TaggedError("LegacyDecodeError")<{ readonly cause: unknown }> {}

const decodeLegacy = (raw: string) =>
  Effect.try({
    try: () => legacyDecode(raw),
    catch: (cause) => new LegacyDecodeError({ cause })
  })

declare const legacyDecode: (raw: string) => unknown
```
