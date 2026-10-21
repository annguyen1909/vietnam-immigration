#!/usr/bin/env bash
# Download real blog cover photos (Unsplash + Pexels, free licenses)
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/img/blog/photos"
mkdir -p "$DIR"

download() {
  local slug="$1"
  local url="$2"
  echo "→ $slug"
  curl -fsSL "$url" -o "$DIR/${slug}.jpg"
}

UNSPLASH_Q="w=1200&h=675&fit=crop&q=85&auto=format"
PEXELS_Q="auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop"

u() { echo "https://images.unsplash.com/photo-$1?${UNSPLASH_Q}"; }
p() { echo "https://images.pexels.com/photos/$1/pexels-photo-$1.jpeg?${PEXELS_Q}"; }


# Visa guide covers
download "vietnam-evisa-requirements-guide-2026" "$(u 1700394474173-6428c2ea061c)"
download "how-to-apply-vietnam-evisa-online-2026" "$(p 1032650)"
download "vietnam-evisa-photo-requirements-2026" "$(u 1685381547979-ae792dadd91a)"
download "vietnam-evisa-processing-time-2026" "$(p 2387873)"
download "vietnam-evisa-approved-entry-ports-2026" "$(u 1544551763-46a013bb70d5)"
download "vietnam-evisa-extension-guide-2026" "$(u 1682687220063-4742bd7fd538)"
download "vietnam-evisa-common-mistakes-2026" "$(p 267394)"
download "vietnam-evisa-vs-embassy-visa-2026" "$(p 31509800)"
download "vietnam-evisa-multiple-entry-guide-2026" "$(u 1544551763-46a013bb70d5)"
download "vietnam-evisa-for-minors-families-2026" "$(u 1511895426328-dc8714191300)"

HERO_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/img"
mkdir -p "$HERO_DIR"
echo "→ vietnam-hero (site OG image)"
curl -fsSL "$(u 1528127269322-539801943592)" -o "$HERO_DIR/vietnam-hero.jpg"

echo "Done. $(ls -1 "$DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ') blog covers + vietnam-hero.jpg"
