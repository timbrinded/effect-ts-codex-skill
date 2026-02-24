# Resource Management Scope

## Load when...

You are acquiring/releasing resources, debugging leaks, or working with scoped effects in apps/tests.

## Covers

- `Scope` lifecycle basics and finalization
- Resource acquisition/release patterns
- Scoped resources in tests and services
- Leak prevention and cleanup debugging

## Source anchors

- [Resource Management Introduction](https://effect.website/docs/resource-management/introduction/)
- [Scope](https://effect.website/docs/resource-management/scope/)
- [Fibers](https://effect.website/docs/concurrency/fibers/)

## TOC

- Scope ownership
- Acquire/release patterns
- Scoped tests
- Leak debugging

## Preferred patterns

- Make resource ownership explicit and tie it to a scope.
- Prefer structured acquire/release patterns over manual cleanup scattered across branches.
- Keep long-lived resources in layers; keep short-lived resources scoped to a workflow or test.

## Pitfalls / anti-patterns

- Creating resources in one place and releasing in another unrelated place.
- Ignoring finalizers during interruption/error paths.
- Keeping background fibers alive after parent scope exits.

## Debug checklist

- What scope owns the resource?
- What finalizer runs on success, failure, and interruption?
- Is the resource lifetime longer than needed?
- Can the resource move into a layer or a scoped test helper?

## Snippet index

- `references/examples-platform.md` (filesystem/http resource boundaries)
- `references/examples-testing.md` (scoped tests)

## Search seeds

- `Scope`
- `resource management`
- `finalization`
- `scoped tests`

## Notes

When debugging leaks or shutdown hangs, inspect both resource scopes and spawned fibers. Many “resource leaks” are actually orphaned fibers holding references or blocking finalization.
