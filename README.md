# Effect-TS Codex Skill

A Codex skill for working with the [Effect](https://effect.website) ecosystem in TypeScript.

It is intentionally opinionated toward idiomatic, testable Effect code and includes:

- A lean `SKILL.md` router with strong architectural guardrails
- Progressive-disclosure references (`references/*.md`) for core + advanced topics
- Bun-first helper scripts for live docs/API lookup and local caching
- Snippet-focused examples for common build/refactor/test/debug workflows

## What This Repo Contains

This repository currently contains one skill:

- `skills/effect-ts` — the Codex skill package

The skill is designed to help with:

- `Effect`, `Layer`, `Context.Tag`, fibers/concurrency
- `Effect.Schema` boundary modeling
- `@effect/vitest` and `TestClock`
- `Stream` / `Sink`
- `@effect/platform`
- Promise / fp-ts / ZIO-style migration to idiomatic Effect

## Install In Codex App

### Option 1 (Recommended): Install via Codex `skill-installer` from GitHub

This repo is public, so you can install directly:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo timbrinded/effect-ts-codex-skill \
  --path skills/effect-ts
```

The skill will be installed to:

```bash
~/.codex/skills/effect-ts
```

Restart Codex after installing so the new skill is loaded.

### Option 2: Manual install (symlink for local development)

If you are editing the skill locally and want Codex to use your working copy:

```bash
mkdir -p ~/.codex/skills
ln -s /Users/timbo/workspace/personal/effect-codex/skills/effect-ts ~/.codex/skills/effect-ts
```

Restart Codex after linking.

## Using the Skill in Codex

You can invoke it explicitly:

```text
$effect-ts refactor this service to use Layer and Context.Tag
```

Or let Codex auto-trigger it on Effect-related tasks.

The skill is intentionally strict about:

- `Effect.gen` for sequential workflows
- services + layers for I/O boundaries
- typed error channels
- schema-first boundary validation
- `@effect/vitest` for tests

## Bundled Helper Scripts (Bun-first)

The skill ships with docs/API helpers in:

- `skills/effect-ts/scripts/effect.sh` (wrapper)

Examples:

```bash
skills/effect-ts/scripts/effect.sh cache status
skills/effect-ts/scripts/effect.sh cache refresh
skills/effect-ts/scripts/effect.sh docs search "TestClock"
skills/effect-ts/scripts/effect.sh docs section --heading "Fibers"
skills/effect-ts/scripts/effect.sh api search "Stream.mapEffect"
```

These scripts fetch and cache official Effect docs and the API search index locally (not in the repo).

## Repository Structure

```text
skills/effect-ts/
├── SKILL.md
├── agents/openai.yaml
├── scripts/
│   ├── effect.sh
│   ├── effect-cache.ts
│   ├── effect-docs-search.ts
│   ├── effect-docs-section.ts
│   ├── effect-api-search.ts
│   └── smoke-test.sh
└── references/
    ├── index.md
    ├── source-links.md
    ├── topic references (*.md for runtime, layers, schema, testing, streams, etc.)
    └── examples-*.md
```

## Development

### Prerequisites

- `bun` (required for the bundled helper scripts)
- `python3` (used by the Codex skill tooling scripts)
- `PyYAML` (needed for `skill-creator` helper scripts such as validation/regeneration)

Install `PyYAML` if needed:

```bash
python3 -m pip install --user pyyaml
```

### Validate the Skill

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
  /Users/timbo/workspace/personal/effect-codex/skills/effect-ts
```

### Run Smoke Tests

```bash
/Users/timbo/workspace/personal/effect-codex/skills/effect-ts/scripts/smoke-test.sh
```

The smoke test checks:

- docs/API cache refresh
- docs search
- docs section extraction
- API symbol search

### Regenerate `agents/openai.yaml` (if `SKILL.md` changes materially)

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py \
  /Users/timbo/workspace/personal/effect-codex/skills/effect-ts \
  --interface display_name='Effect-TS' \
  --interface short_description='Idiomatic Effect-TS coding and docs lookup' \
  --interface default_prompt='Use $effect-ts to build, refactor, or test this TypeScript code with Effect, Layers, Schema, and @effect/vitest.'
```

## Source-of-Truth Policy

- Local `references/*.md` files are for workflow guidance, examples, and coding heuristics.
- Official Effect docs and API docs are the source of truth for exact signatures/behavior.
- Advanced/niche ecosystem guidance should be verified using the bundled scripts before answering.

## Upstream References

- [Effect Docs](https://effect.website)
- [Effect API Reference](https://effect-ts.github.io/effect/)
- [Effect LLM docs index (`llms.txt`)](https://effect.website/llms.txt)
- [Effect LLM full docs (`llms-full.txt`)](https://effect.website/llms-full.txt)
- [Effect testing examples (`effect.solutions/testing`)](https://www.effect.solutions/testing)

## Contributing

Contributions are welcome, especially:

- better reference routing / progressive-disclosure improvements
- sharper examples for common Effect tasks
- script robustness improvements (search ranking, parsing edge cases)
- docs corrections when Effect upstream changes

Keep additions focused and avoid duplicating large upstream docs into this repo.

## License

No license file is currently included in this repository. Add one before accepting external contributions that require an explicit license.
