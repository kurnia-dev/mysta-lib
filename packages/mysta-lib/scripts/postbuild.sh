#!/bin/bash

# Define the workspace directory variable
workspace_directory="mysta-lib"

# Create the dist/components directory if it doesn't exist
mkdir -p dist/components

# Define source and target directories
source_directory="./dist/packages/$workspace_directory"
target_directory="./dist"

# Loop through each directory in the source directory
for dir in "$source_directory"/*/; do
  if [[ -d "$dir" ]]; then
    dir_name=$(basename "$dir")
    target_dir="$target_directory"

    # Create the target directory if it doesn't exist
    mkdir -p "$target_dir"

    # Copy the directory to the target directory
    cp -r "$dir" "$target_dir"
    echo "Moved $dir to $target_dir"
  fi
done

# Copy the build-entry.d.ts file to the dist directory
cp -r dist/packages/$workspace_directory/build-entry.d.ts dist/build-entry.d.ts

# Remove the source directory
rm -r dist/packages/$workspace_directory

# Create the main.d.ts file with export statements
echo "export * from './build-entry'" >dist/main.d.ts
echo "export {}" >>dist/main.d.ts

# Remove the unecesarry file and dir
rm -r dist/packages
rm dist/index.d.ts

# Define the library types directory
library_types_directory="../../library/dist/types"

# Find and copy all .d.ts files from the library types directory to the target directory
find "$library_types_directory" -type f -name "*.d.ts" | while read -r file; do
  relative_path="${file#$library_types_directory/}"
  target_file="$target_directory/$relative_path"
  target_dir=$(dirname "$target_file")

  # Create the target directory if it doesn't exist
  mkdir -p "$target_dir"

  # Copy the file if it doesn't exist in the target directory or if the source file is newer
  if [[ ! -f "$target_file" || "$file" -nt "$target_file" || ! "$relative_path" =~ (index|build-entry)\.d\.ts$ ]]; then
    if cp "$file" "$target_file"; then
      echo "Copied $file to $target_file"
    else
      echo "Failed to copy $file to $target_file" >&2
    fi
  else
    echo "Skipped $relative_path as it already exists in $target_directory and is up to date"
  fi
done

# Append the contents of library/dist/types/components/index.d.ts to dist/components/index.d.ts
cat ../../library/dist/types/components/index.d.ts >>dist/components/index.d.ts

# Append the contents of library/dist/types/utils/index.d.ts to dist/utils/index.d.ts
cat ../../library/dist/types/utils/index.d.ts >>dist/utils/index.d.ts

# Replace all occurrences of ../../library with . in all .d.ts files in the dist directory
find ./dist -type f -name "*.d.ts" -exec sed -i 's|\.\./\.\./library|.|g' {} +
