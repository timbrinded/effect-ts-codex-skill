# Advanced AI Workflow (Opt-In)

## Load when...

The user explicitly asks about Effect AI/workflow packages or LLM orchestration with Effect. This area is more volatile; verify live docs before finalizing guidance.

## Covers

- Opt-in advanced coverage for Effect AI and workflow docs
- Volatility warnings and verification workflow
- How to route AI/workflow tasks without polluting core guidance

## Source anchors

- [AI Introduction](https://effect.website/docs/ai/introduction/)
- [AI Getting Started](https://effect.website/docs/ai/getting-started/)
- [Planning LLM Interactions](https://effect.website/docs/ai/planning-llm-interactions/)
- [AI Tool Use](https://effect.website/docs/ai/tool-use/)
- [Effect API Reference](https://effect-ts.github.io/effect/)

## TOC

- When to load this file
- Verification workflow
- Architecture boundaries
- Risk notes

## Preferred patterns

- Load this file only when the user explicitly asks for AI/workflow packages or LLM orchestration patterns in Effect.
- Verify current package/module names and APIs with `docs search`, `docs section`, and `api search` before answering.
- Keep core Effect service/layer/error/schema guidance intact; advanced AI/workflow features are additive.

## Pitfalls / anti-patterns

- Assuming package APIs are stable from memory.
- Leading with AI/workflow packages for general Effect questions.
- Mixing advanced abstractions into simple app architecture recommendations.

## Debug checklist

- Did the user actually ask for AI/workflow functionality?
- Did you verify the latest docs sections and API symbols?
- Can the solution still use normal service/layer/error boundaries?

## Snippet index

- `references/examples-core.md` for underlying Effect composition patterns
- `references/source-links.md` for canonical advanced docs links

## Search seeds

- `effect ai introduction`
- `planning LLM interactions`
- `tool use effect`

## Notes

### Verification rule (strict)

Before giving concrete code for AI/workflow packages:

1. Run `scripts/effect.sh docs search "<feature>"`
2. Run `scripts/effect.sh docs section --heading "<relevant heading>"`
3. Run `scripts/effect.sh api search "<symbol/module>"` if exact APIs matter

This avoids stale guidance in a rapidly evolving area.
