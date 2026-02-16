#!/bin/bash

# Remove previous build
rm -rf dist

# # Create type declaration
tsc ./index.ts --declaration --allowJs --outDir dist

# Preset names array
presetNames=(
  "kitsune" "yurei" "raijin" "inari" "yuki" "sakuragi"
)

# Loop through the array and run Tailwind CSS for each preset
for preset in "${presetNames[@]}"; do
  echo $preset
  inputDir="./${preset}"
  outputDir="./dist/${preset}"

  mkdir -p "${outputDir}"
  cp "${inputDir}/colors.config.json" "${outputDir}/colors.config.json"

  # Run Tailwind CSS
  tailwind -i "${inputDir}/index.css" -o "${outputDir}/style.css" --config "./${preset}/tailwind.config.js"

  cd $inputDir

  npx vite build --config ../vite.config.ts

  # List all items in the current folder
  cp -r ./dist/* "../${outputDir}"
  rm -r "./dist"

  cd ../
done

# Replace internal 'lib/' alias with public package import in all JS and D.TS files
echo "Replacing aliases in dist..."
# Special handling for utils (bundled into root)
find dist -type f \( -name "*.js" -o -name "*.d.ts" \) -exec sed -i "s|'lib/utils'|'@mystaline/mysta-lib'|g; s|\"lib/utils\"|\"@mystaline/mysta-lib\"|g" {} +
# Fallback for remaining deep imports (types etc)
find dist -type f \( -name "*.js" -o -name "*.d.ts" \) -exec sed -i "s|'lib/|'@mystaline/mysta-lib/|g; s|\"lib/|\"@mystaline/mysta-lib/|g" {} +
echo "Replacements complete."
