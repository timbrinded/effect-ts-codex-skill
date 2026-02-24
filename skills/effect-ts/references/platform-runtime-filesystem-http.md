# Platform Runtime Filesystem Http

## Load when...

You are using `@effect/platform` runtime or common platform services (filesystem/path/http/terminal/key-value) and need Bun-first guidance.

## Covers

- `@effect/platform` runtime and common services
- Filesystem/path/terminal/http/key-value basics
- Bun-first command/runtime notes with portability caveats
- Service boundary design for platform APIs

## Source anchors

- [Platform Runtime](https://effect.website/docs/platform/runtime/)
- [FileSystem](https://effect.website/docs/platform/file-system/)
- [Path](https://effect.website/docs/platform/path/)
- [HttpClient](https://effect.website/docs/platform/http-client/)
- [Terminal](https://effect.website/docs/platform/terminal/)
- [KeyValueStore](https://effect.website/docs/platform/key-value-store/)

## TOC

- Boundary design
- Platform services overview
- Bun-first notes
- Testing and portability

## Preferred patterns

- Wrap platform services behind domain-facing service interfaces for testability.
- Keep Bun/Node portability decisions at the infrastructure layer.
- Use `Path`/filesystem abstractions instead of ad hoc string path handling when possible.
- Keep HTTP client calls typed and error-mapped at the boundary.

## Pitfalls / anti-patterns

- Leaking Bun-specific APIs deep into domain logic when portability matters.
- Direct filesystem/http calls inside business logic without service boundaries.
- Skipping path normalization/abstraction and hardcoding separators.

## Debug checklist

- Is this truly platform code or should it be a domain service interface?
- Does the repo target Bun-only, Node-only, or multiple runtimes?
- Can the filesystem/http layer be replaced with a deterministic test implementation?

## Snippet index

- `references/examples-platform.md` — Bun-first platform patterns
- `references/examples-schema-services.md` — schema on HTTP/file boundaries

## Search seeds

- `@effect/platform runtime`
- `FileSystem Path HttpClient Terminal`
- `KeyValueStore`

## Notes

### Bun-first guidance

Use Bun for local commands/examples in this skill, but do not assume Bun-only production deployments unless the repo explicitly does. Keep platform-specific choices isolated so code remains testable and portable.
