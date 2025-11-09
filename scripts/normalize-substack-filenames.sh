#!/usr/bin/env bash
set -euo pipefail

shopt -s nullglob
ROOT="substack"

# matches files that end with -xxxxxxxx.md (8 hex chars)
for f in "$ROOT"/*-[0-9a-fA-F]{8}.md; do
  base="$(basename "$f")"

  # 1) strip the trailing -<hash>.md
  nohash="${base%-????????.md}.md"

  # 2) collapse multiple dashes; 3) trim trailing dashes (before .md)
  cleaned="$(echo "$nohash" | sed -E 's/--+/-/g; s/-+\.md$/.md/')"

  if [[ "$base" != "$cleaned" ]]; then
    src="$ROOT/$base"
    dst="$ROOT/$cleaned"

    # avoid overwrite; append numeric suffix if needed
    if [[ -e "$dst" ]]; then
      i=1
      stem="${cleaned%.md}"
      while [[ -e "$ROOT/${stem}-$i.md" ]]; do
        ((i++))
      done
      dst="$ROOT/${stem}-$i.md"
    fi

    echo "Renaming $base -> $(basename "$dst")"
    git mv "$src" "$dst"
  fi
done
