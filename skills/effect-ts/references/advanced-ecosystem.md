# Advanced Ecosystem (Opt-In)

## Load when...

The user explicitly asks for niche or advanced Effect ecosystem modules/packages (for example SQL/RPC/micro/trait/cluster/workflow internals).

## Covers

- Opt-in pointers for advanced/niche packages
- How to verify current docs/API before answering
- Guidance for keeping mainstream answers focused

## Source anchors

- [Effect Docs Home](https://effect.website)
- [Effect LLM Index](https://effect.website/llms.txt)
- [Effect API Reference](https://effect-ts.github.io/effect/)

## TOC

- When to load this file
- Verification workflow
- Package categories
- Response strategy

## Preferred patterns

- Treat this file as a router, not a frozen reference for exact APIs.
- Verify package/module names and signatures via scripts before coding.
- Keep advanced ecosystem discussion opt-in and clearly scoped to the user request.

## Pitfalls / anti-patterns

- Mentioning niche packages in generic Effect answers “because they exist.”
- Assuming module paths/names from memory across releases.
- Using advanced packages when core `Effect`/`Layer`/`Stream`/`Schema` already solves the problem.

## Debug checklist

- Is the package mainstream enough for the current task, or is a core module sufficient?
- Did you verify docs/API recently?
- Did you separate stable architectural advice from volatile package specifics?

## Snippet index

- `references/source-links.md` for canonical entry points
- `references/workflow-routing.md` for task classification before package selection

## Search seeds

- `effect sql rpc micro trait cluster workflow`
- `api search`

## Notes

### Common advanced categories to check live

- `sql` / database integration packages
- `rpc`-style modules and transport helpers
- `micro` and service framework modules
- `trait` modules
- workflow-related modules in the API docs
- observability/platform specializations not covered by core platform docs

Use `docs search` first, then `api search` for exact symbols.
