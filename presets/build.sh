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
