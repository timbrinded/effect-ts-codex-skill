# Schema

## Load when...

You are defining/decoding/encoding data with `effect/Schema`, validating boundaries, generating test data, or transforming payloads.

## Covers

- Schema-first boundary design (decode/encode/transform)
- Basic and advanced schema modeling patterns
- Classes, annotations, filters, transformations
- Schema error formatting and diagnostics
- Arbitrary generation and property-testing tie-ins

## Source anchors

- [Schema Introduction](https://effect.website/docs/schema/introduction/)
- [Schema Basic Usage](https://effect.website/docs/schema/basic-usage/)
- [Schema Classes](https://effect.website/docs/schema/classes/)
- [Schema Transformations](https://effect.website/docs/schema/transformations/)
- [Schema Error Formatters](https://effect.website/docs/schema/error-formatters/)
- [Schema Arbitrary](https://effect.website/docs/schema/arbitrary/)

## TOC

- Boundary strategy
- Schema modeling patterns
- Transformations
- Error handling
- Testing tie-ins

## Preferred patterns

- Decode unknown inputs at the edge and pass validated domain values inward.
- Keep schemas near domain types or API boundary modules to prevent drift.
- Use transformations/annotations instead of hand-rolled parse/format pipelines when possible.
- Use `Arbitrary` from schemas for property tests instead of ad hoc sample factories where feasible.

## Pitfalls / anti-patterns

- Using raw `JSON.parse` + unchecked object access throughout domain code.
- Mixing external wire shape and internal domain shape without a schema transformation step.
- Dropping schema error structure too early when debugging invalid input.

## Debug checklist

- Where is the boundary decode happening?
- Is the domain type distinct from the wire type (needs transformation)?
- Are schema decode errors being formatted usefully for logs/tests?
- Can a property test use `Schema.Arbitrary` here?

## Snippet index

- `references/examples-schema-services.md` — schema boundary + service integration snippets
- `references/examples-testing.md` — property tests using schema-derived data

## Search seeds

- `Schema basic usage`
- `Schema transformations`
- `Schema Arbitrary`
- `Schema error formatters`

## Notes

### Boundary rule

Use `Schema` where untrusted data enters or exits the system:

- HTTP request/response payloads
- config/env parsing
- file contents / JSON blobs
- database row mapping (especially legacy schemas)
- third-party SDK payload normalization

Decode once, then operate on typed domain values.
