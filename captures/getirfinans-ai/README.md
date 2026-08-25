Drop raw simulator captures here. Anything in this folder is a source, not a
shipped asset: `scripts/ai-captures.sh` trims, crops and re-encodes it into
`public/video/getirfinans-ai/` and `public/images/getirfinans-ai/`.

This folder is git-ignored, and it lives outside `public/` so that a build
input can never be served at a URL. It used to be
`public/video/getirfinans-ai/incoming/`, where three recordings totalling
18.4MB were committed and deployed to every visitor. Removed 2026-08-25.

The originals live on the device they were captured from. Nothing in a normal
build needs them: the trimmed clips they produce are committed, so neither the
sources nor ffmpeg are required to build the site. Re-run the script only when
a capture itself changes.
