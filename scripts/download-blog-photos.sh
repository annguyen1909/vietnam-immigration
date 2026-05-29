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

download "vietnam-national-parks-wildlife-2026" "$(u 1761127138372-cad230082b19)"
download "vietnam-currency-exchange-guide-2026" "$(u 1700394474173-6428c2ea061c)"
download "hidden-gems-vietnam-2026" "$(u 1707292098544-755fa220732b)"
download "best-islands-vietnam-beyond-hanoi-2026" "$(p 31509800)"
download "vietnam-tropical-islands-paradise-2026" "$(p 30953351)"
download "vietnam-volcano-trekking-guide-2026" "$(p 1287145)"
download "vietnamese-festivals-cultural-celebrations-2026" "$(u 1528127269322-539801943592)"
download "discover-vietnamese-regional-cuisine-2026" "$(p 2175211)"
download "vietnam-best-diving-destinations-2026" "$(u 1544551763-46a013bb70d5)"
download "vietnam-beach-holidays-coast-2026" "$(p 18995259)"
download "family-friendly-vietnam-2026" "$(u 1511895426328-dc8714191300)"
download "best-photography-spots-vietnam-2026" "$(u 1685381547979-ae792dadd91a)"
download "vietnam-shopping-markets-guide-2026" "$(p 1032650)"
download "vietnamese-music-arts-culture-2026" "$(p 267394)"
download "top-10-historical-places-vietnam" "$(p 2387873)"
download "vietnam-adventure-travel-2026" "$(u 1682687220063-4742bd7fd538)"
download "vietnamese-wellness-spa-retreats-2026" "$(u 1544161515-4ab6ce6db874)"
download "vietnam-wildlife-nature-encounters-2026" "$(u 1432405972618-c60b0225b8f9)"

# Visa guide covers (distinct from travel posts)
download "vietnam-evisa-requirements-guide-2026" "$(u 1700394474173-6428c2ea061c)"
download "how-to-apply-vietnam-evisa-online-2026" "$(p 1032650)"
download "vietnam-evisa-photo-requirements-2026" "$(u 1685381547979-ae792dadd91a)"
download "vietnam-evisa-processing-time-2026" "$(p 2387873)"
download "vietnam-evisa-approved-entry-ports-2026" "$(u 1544551763-46a013bb70d5)"
download "vietnam-evisa-extension-guide-2026" "$(u 1682687220063-4742bd7fd538)"
download "vietnam-evisa-common-mistakes-2026" "$(p 267394)"
download "vietnam-evisa-vs-embassy-visa-2026" "$(p 31509800)"
download "vietnam-evisa-fees-explained-2026" "$(u 1700394474173-6428c2ea061c)"
download "vietnam-evisa-rejection-reasons-2026" "$(p 1032650)"
download "vietnam-evisa-multiple-entry-guide-2026" "$(u 1544551763-46a013bb70d5)"
download "vietnam-evisa-for-minors-families-2026" "$(u 1511895426328-dc8714191300)"

HERO_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/img"
mkdir -p "$HERO_DIR"
echo "→ vietnam-hero (site OG image)"
curl -fsSL "$(u 1528127269322-539801943592)" -o "$HERO_DIR/vietnam-hero.jpg"

echo "Done. $(ls -1 "$DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ') blog covers + vietnam-hero.jpg"
