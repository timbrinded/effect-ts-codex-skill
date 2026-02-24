#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  cat <<'EOF'
Effect-TS docs/API helper wrapper (Bun-first)

Usage:
  effect.sh cache status
  effect.sh cache refresh [--force]
  effect.sh docs search <query> [--full|--index] [--limit N] [--json]
  effect.sh docs section (--heading <regex> | --link <effect.website/docs/...>) [--context-lines N] [--max-lines N] [--json]
  effect.sh api search <symbol/query> [--doc <Doc.ts>] [--limit N] [--json]
EOF
}

if ! command -v bun >/dev/null 2>&1; then
  cat <<'EOF' >&2
bun is required for the bundled Effect-TS helper scripts.

Check/install:
  bun --version
  curl -fsSL https://bun.sh/install | bash

Fallback while bun is missing:
  Read references/*.md directly and use official docs links in references/source-links.md
EOF
  exit 1
fi

cmd="${1:-}"
sub="${2:-}"
shift $(( $# > 0 ? 1 : 0 )) || true
if [[ -n "${sub:-}" ]]; then
  shift 1 || true
fi

case "$cmd" in
  ""|-h|--help|help)
    usage
    ;;
  cache)
    case "$sub" in
      status|refresh)
        exec bun "$SCRIPT_DIR/effect-cache.ts" "$sub" "$@"
        ;;
      *)
        usage
        exit 1
        ;;
    esac
    ;;
  docs)
    case "$sub" in
      search)
        exec bun "$SCRIPT_DIR/effect-docs-search.ts" "$@"
        ;;
      section)
        exec bun "$SCRIPT_DIR/effect-docs-section.ts" "$@"
        ;;
      *)
        usage
        exit 1
        ;;
    esac
    ;;
  api)
    case "$sub" in
      search)
        exec bun "$SCRIPT_DIR/effect-api-search.ts" "$@"
        ;;
      *)
        usage
        exit 1
        ;;
    esac
    ;;
  *)
    usage
    exit 1
    ;;
esac

