#!/bin/bash

# Check if a tag is provided as an argument
if [ -z "$1" ]; then
    echo "Error: No tag provided. Usage: ./publish.sh <tag>"
    exit 1
fi

TAG=$1

cd dist
# npm link and publish
npm link
npm publish --access public --tag "$TAG"

cd ../
rm -r dist

echo "Publish tasks completed successfully with tag: $TAG!"
