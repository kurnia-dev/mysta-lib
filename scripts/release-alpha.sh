#!/bin/bash

RELEASE_TAG="alpha"
source scripts/build.sh

# Set the version for the filtered workspace
pnpm --filter $WORKSPACE exec npm version prerelease --preid=alpha

ROOT_PACKAGE_JSON=$(pnpm --filter $WORKSPACE exec pwd)/package.json
git add "$ROOT_PACKAGE_JSON"

VERSION=$(pnpm --filter $WORKSPACE exec npm pkg get version | tr -d '"')
git commit -m "chore($WORKSPACE): bump version to $VERSION prerelease"

# Run release for the filtered workspace
pnpm --filter $WORKSPACE release "alpha"
