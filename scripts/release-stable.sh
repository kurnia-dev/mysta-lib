#!/bin/bash

# Check if a parameter is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <workspace>"
    exit 1
fi

WORKSPACE=$1

# Run the build process using pnpm
if [[ "$WORKSPACE" != *"presets"* ]]; then
    pnpm build:commons
fi
pnpm --filter $WORKSPACE build

# Set the version for the filtered workspace to stable
pnpm --filter $WORKSPACE exec npm version patch

ROOT_PACKAGE_JSON=$(pnpm --filter $WORKSPACE exec pwd)/package.json
git add "$ROOT_PACKAGE_JSON"

VERSION=$(pnpm --filter $WORKSPACE exec npm pkg get version | tr -d '"')
git commit -m "chore($WORKSPACE): bump version to $VERSION"

# Run release for the filtered workspace
pnpm --filter $WORKSPACE release
