# Data Types And Pattern Matching

## Load when...

You need guidance on common Effect data types (`Option`, `Either`, `Exit`, `Cause`, `Chunk`, etc.) or `Match`-based branching.

## Covers

- Choosing the right data type for control flow and data modeling
- `Match` for readable branching
- How these types interact with `Effect` workflows

## Source anchors

- [Option](https://effect.website/docs/data-types/option/)
- [Either](https://effect.website/docs/data-types/either/)
- [Exit](https://effect.website/docs/data-types/exit/)
- [Cause](https://effect.website/docs/data-types/cause/)
- [Chunk](https://effect.website/docs/data-types/chunk/)
- [Pattern Matching](https://effect.website/docs/code-style/pattern-matching/)

## TOC

- Choosing types
- Pattern matching
- Interoperability with Effect
- Debugging misuse

## Preferred patterns

- Use `Option` for absence/presence and `Either` for local success/failure before lifting into `Effect` when appropriate.
- Use `Match` to keep branching readable in complex unions or tagged data.
- Keep `Exit`/`Cause` for diagnostics and runtime result inspection, not everyday domain return types (unless intentionally modeling them).

## Pitfalls / anti-patterns

- Using exceptions where `Option`/`Either`/typed failures communicate intent better.
- Returning overly generic `unknown`/`any` unions instead of tagged data + pattern matching.
- Confusing `Either` local branching with `Effect` error channel semantics.

## Debug checklist

- Is this absence, recoverable local branch, or effectful failure?
- Would a tagged union + `Match` clarify branching?
- Are you accidentally collapsing `Cause`/`Exit` information too early?

## Snippet index

- `references/examples-core.md` — Option/Either-to-Effect conversion snippets
- `references/examples-testing.md` — assertions against structured results

## Search seeds

- `Option Either Exit Cause Chunk Match`
- `pattern matching`

## Notes

Prefer explicit tagged data and pattern matching over boolean flag pyramids or stringly typed branching.
