# Migration And Comparisons

## Load when...

You are migrating from Promise/fp-ts/ZIO-style code, or need to explain tradeoffs and mental-model differences.

## Covers

- Promise -> Effect migration strategy
- fp-ts -> Effect mapping concepts
- Coming-from-ZIO notes and naming differences
- Common misconceptions/performance myths and how to respond

## Source anchors

- [Effect vs Promise](https://effect.website/docs/additional-resources/effect-vs-promise/)
- [Effect vs fp-ts](https://effect.website/docs/additional-resources/effect-vs-fp-ts/)
- [Coming From ZIO](https://effect.website/docs/additional-resources/coming-from-zio/)
- [Myths About Effect](https://effect.website/docs/additional-resources/myths/)

## TOC

- Migration strategy
- Promise mapping
- fp-ts mapping
- ZIO notes
- Myth/perf responses

## Preferred patterns

- Migrate boundaries first: wrap external async code, preserve Effect in new domain code.
- Preserve types (success/error/requirements) instead of collapsing everything to thrown exceptions.
- Introduce services/layers early to improve testability during migration.
- Use `Schema` at the same time as boundary migrations to avoid carrying unsafe parsing forward.

## Pitfalls / anti-patterns

- Big-bang rewrites when a boundary-first migration would reduce risk.
- Keeping async/await everywhere and only wrapping top-level functions without architectural change.
- Equating Promise cancellation with fiber interruption semantics without explanation.

## Debug checklist

- What migration scope is requested (single function, module, service, app)?
- Which semantics must stay unchanged (error shape, retries, timing, API contracts)?
- Can you stage the migration behind service interfaces/tests?
- Did you explain mental-model differences, not just syntax swaps?

## Snippet index

- `references/examples-core.md` — Promise boundary conversion
- `references/examples-schema-services.md` — migration plus service/layer boundary patterns
- `references/examples-testing.md` — regression tests around migrated behavior

## Search seeds

- `Effect vs Promise`
- `Effect vs fp-ts`
- `Coming From ZIO`
- `Myths About Effect`

## Notes

### Practical migration sequence (recommended)

1. Add tests around current behavior.
2. Wrap external sync/async calls in `Effect.try` / `Effect.tryPromise`.
3. Move dependencies behind `Context.Tag` services.
4. Introduce `Layer` provisioning for live and tests.
5. Move parsing/validation to `Schema` boundaries.
6. Refactor nested async/control flow to `Effect.gen`.
