# Check if a parameter is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <workspace>"
    exit 1
fi

WORKSPACE=$1

echo $WORKSPACE

# Run the build process using pnpm
if [[ "$WORKSPACE" != *"presets"* ]]; then
    pnpm build:commons
fi
pnpm --filter $WORKSPACE build
