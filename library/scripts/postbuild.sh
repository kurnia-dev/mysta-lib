#!/bin/bash
cp -r ./components/menuitem dist/types/components

# Navigate to the directory containing .d.ts files
cd ./components

# Copy all .d.ts files to the target directory
for file in **/*.d.ts; do
    # Create necessary directories if they don't exist
    mkdir -p "../dist/types/components/${file%/*}"
    cp "$file" "../dist/types/components/$file"
done
