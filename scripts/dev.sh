#!/bin/bash

# List of supported preset names
SUPPORTED_PRESETS=("kitsune" "yurei" "raijin" "inari" "yuki" "sakuragi")

# Default preset and config
DEFAULT_PRESET="kitsune"

PRESET_NAME="$DEFAULT_PRESET"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  --preset)
    shift
    PRESET_NAME="$1"
    ;;
  *)
    echo "Unknown argument: $1"
    echo "Usage: pnpm dev [--preset <preset_name>]"
    echo "Supported preset names: ${SUPPORTED_PRESETS[*]}"
    exit 1
    ;;
  esac
  shift
done

# Validate the provided preset name
if [[ ! " ${SUPPORTED_PRESETS[*]} " =~ " ${PRESET_NAME} " ]]; then
  echo "Error: Invalid preset name '$PRESET_NAME'."
  echo "Supported preset names: ${SUPPORTED_PRESETS[*]}"
  exit 1
fi

# Display selected options
echo "Using preset: $PRESET_NAME"

# Define the configuration content with the dynamic preset name
CONFIG_CONTENT="import config from './presets/$PRESET_NAME/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...config,
  content: [
    './index.html',
    './{library,playground,presets,packages}/**/*.{js,ts,jsx,tsx}',
    './main.tsx',
    './App.tsx',
    '!./**/dist/**/*',
  ],
};
"

# Create main.js configuration with selected preset
MAIN_CONTENT="import React from 'react';
import ReactDOM from 'react-dom/client';

import { MystaLibProvider } from 'lib/context';

import './library/assets/css/main.css';
import './presets/$PRESET_NAME/index.css';

import App from './playground/App';
import { $PRESET_NAME } from './presets';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MystaLibProvider configOptions={{ preset: $PRESET_NAME }}>
        <App />
      </MystaLibProvider>
    </React.StrictMode>
  );
}"

# Write the configuration to tailwind.config.js
echo "$CONFIG_CONTENT" >tailwind.config.js
echo "tailwind.config.js has been generated with the preset: $PRESET_NAME"
echo "$MAIN_CONTENT" >main.tsx
echo "main.tsx has been generated with the preset: $PRESET_NAME"

# Function to clean up on server stop
cleanup() {
  echo "Cleaning up... Removing generated tailwind.config.js and main.tsx"
  rm -r tailwind.config.js
  rm -r main.tsx
  echo "Cleanup complete."
}

# Trap SIGINT and SIGTERM to perform cleanup
trap cleanup SIGINT SIGTERM

# Start the development server
echo "Starting the development server..."
vite --host