#!/usr/bin/env bash
# Build the getirfinans-ai gallery assets.
#
# Raw simulator/device recordings land in public/video/getirfinans-ai/incoming/.
# They are 1206x2622 at 60fps and include whatever happened before and after the
# moment worth showing, up to and including the swipe that stopped the recording.
# This script downscales them to the gallery's 600x1304 coordinate space, trims
# to the moment, and crops to the part of the UI the caption is about.
#
# A whole phone screen at 350px wide makes that detail unreadable, which is why
# these ship as `frame: "detail"` in page.tsx rather than as phone screens.
set -euo pipefail
cd "$(dirname "$0")/.."

RAW=public/video/getirfinans-ai/incoming
VID=public/video/getirfinans-ai
IMG=public/images/getirfinans-ai

# build <source> <name> <start> <duration> <cropY> <cropH> <posterAt>
build() {
  local src=$1 name=$2 ss=$3 dur=$4 y=$5 h=$6 poster=$7
  echo "  $name  ${ss}s +${dur}s  ->  600x${h} at 0,${y}"

  ffmpeg -v error -ss "$ss" -t "$dur" -i "$RAW/$src" \
    -vf "scale=600:1304,crop=600:$h:0:$y,fps=30" \
    -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
    -y "$VID/$name.mp4"

  # Poster is a frame from inside the clip, so the still shows the settled
  # state rather than the first frame of an animation.
  ffmpeg -v error -ss "$poster" -i "$RAW/$src" \
    -vf "scale=600:1304,crop=600:$h:0:$y" -vframes 1 \
    -y "/tmp/ai-poster-$name.png"
  python3 -c "
from PIL import Image
import sys
Image.open('/tmp/ai-poster-$name.png').convert('RGB').save('$IMG/$name.webp','WEBP',quality=90,method=6)
"
  rm -f "/tmp/ai-poster-$name.png"
}

echo "Building captures:"

# Entry: the hesapla screen, the assistant arriving, the greeting and its four
# prompts resolving. Frame 0 is deliberately the pre-entrance state — the clip
# this replaced started after everything had landed, so the animation it
# described was never in it.
build entry-raw.mp4 ai-chat-entrance 3.3 3.4 110 590 6.2

# Inline prompt suggestions: "kredi" typed, results listed, and the assistant's
# three prompts resolving inline among them.
build search-suggestions-raw.mp4 ai-search-suggestions 4.5 2.2 190 760 6.2

# The assistant answering inside search, rather than handing off to a chat.
build search-answer-raw.mp4 ai-search-answer 8.3 4.2 190 650 11.4

echo "Done."
