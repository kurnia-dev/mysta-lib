#!/usr/bin/env bash
set -euo pipefail

# Source preset
SRC="presets/raijin"

# What to copy from the root of raijin
ROOT_FILES=( "index.ts" "global.ts" "icons.css" )

# Loop over all theme folders
for TARGET in presets/*; do
  # skip the source itself and any non-directories
  [[ "$TARGET" == "$SRC" || ! -d "$TARGET" ]] && continue

  PRESET_NAME=$(basename "$TARGET")
  echo "👉 Syncing into $TARGET (preset: $PRESET_NAME)…"

  # 1) copy every component directory
  for COMPONENT_DIR in "$SRC"/*/; do
    # basename gives you e.g. "badge/" → "badge"
    COMP_NAME=$(basename "$COMPONENT_DIR")
    echo "   • $COMP_NAME/"
    # force-copy (overwrite) the whole folder
    rm -rf "$TARGET/$COMP_NAME"
    cp -R "$COMPONENT_DIR" "$TARGET/$COMP_NAME"
  done

  # 2) copy root files (index.js + icons.css), then patch index.js
  for F in "${ROOT_FILES[@]}"; do
    echo "   • $F"
    cp "$SRC/$F" "$TARGET/$F"

    if [[ "$F" == "index.ts" ]]; then
      # in-place replace `raijin` → "${PRESET_NAME}"
      sed -i \
        -e "s/\bconst[[:space:]]\+raijin\b/const ${PRESET_NAME}/g" \
        -e "s/\bexport[[:space:]]\+default[[:space:]]\+raijin\b/export default ${PRESET_NAME}/g" \
        "$TARGET/$F"
    fi
  done

  echo "✅  Done with $TARGET"
done
