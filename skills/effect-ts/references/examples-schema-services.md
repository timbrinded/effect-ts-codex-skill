# Examples: Schema + Services

## Load when...

You need end-to-end boundary patterns: decode untrusted data with `Schema`, then call domain logic via service interfaces/layers.

## Covers

- HTTP/JSON boundary decode with schema
- Service interface (`Context.Tag`) and live/test layer split
- Typed error mapping at the boundary
- Testability-friendly architecture

## Source anchors

- [Schema Introduction](https://effect.website/docs/schema/introduction/)
- [Managing Services](https://effect.website/docs/requirements-management/services/)
- [Managing Layers](https://effect.website/docs/requirements-management/layers/)

## TOC

- Build: schema-first service workflow
- Refactor: move direct I/O behind a service tag
- Test: test layer boundary

## Preferred patterns

- Decode once at the boundary, operate on validated domain values.
- Use `Context.Tag` interfaces for dependencies.
- Provide live/test implementations with `Layer`.

## Pitfalls / anti-patterns

- Passing unchecked JSON objects through the domain layer.
- Mixing schema decode, HTTP, and business logic in one function.
- Hardcoding external clients in domain modules.

## Debug checklist

- Where does decode happen?
- Is the service dependency abstracted?
- Are errors typed and mapped at the edge?

## Snippet index

- schema decode + service call
- direct fetch to service tag refactor sketch
- test layer shape

## Search seeds

- `Schema decodeUnknown`
- `Context.Tag Layer`
- `Schema parseJson`

## Build: schema-first service workflow [intent: build]

```ts
import { Context, Data, Effect, Layer, Schema } from "effect"

const CreateUserInput = Schema.Struct({
  email: Schema.String,
  name: Schema.String
})

type CreateUserInput = Schema.Schema.Type<typeof CreateUserInput>

class UserRepoError extends Data.TaggedError("UserRepoError")<{ readonly cause: unknown }> {}

class UserRepo extends Context.Tag("UserRepo")<
  UserRepo,
  {
    readonly insert: (input: CreateUserInput) => Effect.Effect<{ id: string }, UserRepoError>
  }
>() {}

const createUser = (raw: unknown) =>
  Effect.gen(function* () {
    const input = yield* Schema.decodeUnknown(CreateUserInput)(raw)
    const repo = yield* UserRepo
    return yield* repo.insert(input)
  })

const UserRepoLive = Layer.succeed(UserRepo, {
  insert: (input) =>
    Effect.tryPromise({
      try: () => Promise.resolve({ id: `user_${input.email}` }),
      catch: (cause) => new UserRepoError({ cause })
    })
})
```

## Refactor: move direct I/O behind a service tag [intent: refactor]

```ts
// Before: domain function calls fetch directly.
// After: define a service (e.g., UserApi) and inject it with Layer.
// Keep the domain function pure and return Effect requiring UserApi.
```

## Test: minimal test layer shape [intent: test]

```ts
const UserRepoTest = Layer.succeed(UserRepo, {
  insert: (input) => Effect.succeed({ id: `test_${input.email}` })
})
```
