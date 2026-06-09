import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const preset = process.argv[2];

if (!preset) {
  console.log("Usage: node dev.js <preset_name>");
  console.log("<preset_name> The preset name to watch (e.g., kitsune).");
  process.exit(1);
}

const inputDir = path.resolve(__dirname, preset);
const outputDir = path.resolve(__dirname, 'dist', preset);

fs.mkdirSync(outputDir, { recursive: true });

console.log(`Watching tailwind css for preset: ${preset}`);
execSync(
  `npx tailwindcss -i ${path.join(inputDir, 'index.css')} -o ${path.join(outputDir, 'style.css')} --config ${path.join(inputDir, 'tailwind.config.js')} --watch`,
  { stdio: 'inherit' }
);
