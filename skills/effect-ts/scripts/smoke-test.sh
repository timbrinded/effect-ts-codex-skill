#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
WRAPPER="$SCRIPT_DIR/effect.sh"

echo "[1/8] wrapper help"
"$WRAPPER" --help >/dev/null

echo "[2/8] cache refresh"
"$WRAPPER" cache refresh >/dev/null

echo "[3/8] cache status"
"$WRAPPER" cache status | grep -q "llmsIndex:"

echo "[4/8] docs search (index)"
"$WRAPPER" docs search "TestClock" --limit 3 | grep -qi "TestClock"

echo "[5/8] docs search (full)"
"$WRAPPER" docs search "Effect vs Promise" --full --limit 3 | grep -qi "Promise"

echo "[6/8] docs section by heading"
"$WRAPPER" docs section --heading "Fibers" --max-lines 40 | grep -qi "Fibers"

echo "[7/8] docs section by link"
"$WRAPPER" docs section --link "https://effect.website/docs/testing/testclock/" --max-lines 40 | grep -qi "TestClock"

echo "[8/8] api search"
"$WRAPPER" api search "Fiber" --limit 5 | grep -qi "Fiber"

echo "Smoke tests passed."

