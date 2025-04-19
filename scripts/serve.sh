#!/bin/bash

# Check if a parameter is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <workspace>"
    exit 1
fi

WORKSPACE=$1

# Run the build process using pnpm
pnpm build:commons

# Get the path to the dist folder of the workspace
DIST_FOLDER=$(pnpm --filter "$WORKSPACE" exec pwd)/dist

# Check if the dist folder exists
if [ ! -d "$DIST_FOLDER" ]; then
    echo "Error: dist folder not found for workspace $WORKSPACE"
    exit 1
fi

# Serve the static files with a chosen server, e.g., http-server or serve
npx serve "$DIST_FOLDER" --cors
