# Examples: Platform (Bun-first)

## Load when...

You need Bun-first platform snippets for `@effect/platform`-style runtime/filesystem/http/terminal workflows and boundary design.

## Covers

- Bun-first command examples and boundary notes
- Filesystem/path service boundary pattern
- HTTP client boundary pattern
- CLI runtime boundary guidance

## Source anchors

- [Platform Runtime](https://effect.website/docs/platform/runtime/)
- [FileSystem](https://effect.website/docs/platform/file-system/)
- [Path](https://effect.website/docs/platform/path/)
- [HttpClient](https://effect.website/docs/platform/http-client/)
- [Terminal](https://effect.website/docs/platform/terminal/)

## TOC

- Bun-first command usage
- Filesystem boundary sketch
- HTTP boundary sketch
- CLI runtime boundary

## Preferred patterns

- Keep platform-specific APIs behind services.
- Keep runtime execution at the CLI/app boundary.
- Preserve typed errors and schema decoding on I/O boundaries.

## Pitfalls / anti-patterns

- Bun-specific calls inside domain logic when portability matters.
- Raw filesystem/http access scattered through business code.
- Unvalidated payloads crossing boundaries.

## Debug checklist

- Is this code infrastructure or domain logic?
- Should filesystem/http be wrapped in a service tag?
- Are commands/examples aligned with the repo's runtime/package manager?

## Snippet index

- Bun commands
- filesystem service boundary sketch
- http service boundary sketch
- CLI runtime entrypoint

## Search seeds

- `@effect/platform runtime`
- `FileSystem Path`
- `HttpClient`
- `Terminal`

## Bun-first commands [intent: build]

```bash
bun add effect @effect/platform
bun test
bun run src/main.ts
```

## Filesystem boundary sketch [intent: build/refactor]

```ts
import { Context, Effect } from "effect"

class FileStore extends Context.Tag("FileStore")<
  FileStore,
  {
    readonly readText: (path: string) => Effect.Effect<string, Error>
    readonly writeText: (path: string, content: string) => Effect.Effect<void, Error>
  }
>() {}

// Provide a live layer using @effect/platform FileSystem in infrastructure code.
// Provide an in-memory test layer in tests.
```

## HTTP boundary sketch [intent: build/refactor]

```ts
// Wrap external HTTP calls in a service (e.g., UserApi), map errors to typed domain errors,
// decode payloads with Schema at the boundary, and keep business logic Effect-based.
```

## CLI runtime boundary [intent: build]

```ts
import { Effect } from "effect"

const main = Effect.gen(function* () {
  // compose services + program here
  return 0
})

await Effect.runPromise(main)
```
