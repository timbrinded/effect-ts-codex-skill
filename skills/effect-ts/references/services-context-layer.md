# Services Context Layer

## Load when...

You need dependency injection, service boundaries, `Context.Tag`, `Layer` composition, or test/live layer patterns.

## Covers

- Service interface modeling with `Context.Tag`
- Live/test layer separation and composition
- Dependency graph wiring and layer memoization concepts
- Default services vs custom services
- Testability-first architectural boundaries

## Source anchors

- [Managing Services](https://effect.website/docs/requirements-management/services/)
- [Managing Layers](https://effect.website/docs/requirements-management/layers/)
- [Layer Memoization](https://effect.website/docs/requirements-management/layer-memoization/)
- [Default Services](https://effect.website/docs/requirements-management/default-services/)

## TOC

- Service boundary design
- Tag/layer patterns
- Live vs test layers
- Dependency graphs
- Review checklist

## Preferred patterns

- Put every external dependency (DB/API/fs/clock/random/queue SDK) behind a service interface.
- Keep business logic depending on service contracts, not concrete clients.
- Create separate live and test layers; in-memory test layers are the default testing strategy.
- Compose layers explicitly and keep provisioning close to the boundary/app/test harness.

## Pitfalls / anti-patterns

- Directly importing singleton clients into domain modules.
- Constructing live dependencies inside tests instead of layering test doubles.
- Mixing layer construction and business logic in the same function.
- Leaking framework/runtime assumptions into service interfaces.

## Debug checklist

- List all effectful dependencies in the workflow: are they modeled as services?
- Does the code have a clear live layer and a test layer path?
- Can the test path avoid network/db/filesystem entirely?
- Did layer composition accidentally duplicate expensive dependencies?

## Snippet index

- `references/examples-schema-services.md` (service + schema boundary)
- `references/examples-testing.md` (layered service tests)
- `references/examples-platform.md` (platform-backed service boundaries)

## Search seeds

- `Context.Tag Layer`
- `Managing Services`
- `Managing Layers`
- `Layer Memoization`

## Notes

### Service design rule (strict)

If the code touches external state or performs I/O, prefer a service boundary unless the user explicitly wants a tiny one-off script.

### Typical split

- `FooService` tag/interface (domain-facing methods)
- `FooServiceLive` layer (real SDK/filesystem/http implementation)
- `FooServiceTest` layer (deterministic in-memory or stubbed implementation)
- business logic effects that depend on `FooService`
