#!/usr/bin/env bash
# Reframe the getirfinans-ai captures onto the part of the UI each one is about.
#
# Sources are 600x1304 full-screen simulator recordings. A whole phone screen at
# 256px wide makes the detail under discussion unreadable, so each capture is
# cropped to its subject and the Gallery renders it as a detail rather than a
# phone (see `frame: "detail"` in page.tsx).
#
# Re-run after any recapture. Windows are `crop=W:H:X:Y` against the 600x1304
# source. Heights stay even for yuv420p.
set -euo pipefail

cd "$(dirname "$0")/.."
VID=public/video/getirfinans-ai
IMG=public/images/getirfinans-ai

crop() {
  local name=$1 w=$2 h=$3 x=$4 y=$5
  echo "  $name -> ${w}x${h} at ${x},${y}"
  ffmpeg -v error -i "$VID/$name.mp4" \
    -vf "crop=$w:$h:$x:$y" \
    -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
    -y "$VID/$name.cropped.mp4"
  mv "$VID/$name.cropped.mp4" "$VID/$name.mp4"

  python3 - "$IMG/$name.webp" "$x" "$y" "$w" "$h" <<'PY'
import sys
from PIL import Image
path, x, y, w, h = sys.argv[1], *map(int, sys.argv[2:6])
Image.open(path).convert("RGB").crop((x, y, x + w, y + h)).save(path, "WEBP", quality=90, method=6)
PY
}

echo "Reframing captures:"
# The listening state lives entirely in the composer.
crop voice-listening   600 210 0 1090
# The thinking-to-answer handoff, plus the first row of campaign cards.
crop assistant-answer  600 520 0 140
# The field growing line by line and then refusing.
crop char-limit        600 290 0 1000
echo "Done."
