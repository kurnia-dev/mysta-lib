import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspace = process.argv[2];

if (!workspace) {
  console.log("Usage: node serve.js <workspace>");
  process.exit(1);
}

// Find workspace directory
let workspaceDir;
if (workspace.includes('commons') || workspace === 'library') {
  workspaceDir = path.resolve(__dirname, '../library');
} else if (workspace.includes('lib') || workspace.includes('packages/mysta-lib')) {
  workspaceDir = path.resolve(__dirname, '../packages/mysta-lib');
} else if (workspace.includes('presets') || workspace === 'presets') {
  workspaceDir = path.resolve(__dirname, '../presets');
} else {
  console.error(`Unknown workspace: ${workspace}`);
  process.exit(1);
}

const distFolder = path.join(workspaceDir, 'dist');
if (!fs.existsSync(distFolder)) {
  console.error(`Error: dist folder not found for workspace ${workspace} at ${distFolder}`);
  process.exit(1);
}

console.log(`Serving ${distFolder} with serve...`);
execSync(`npx serve "${distFolder}" --cors`, { stdio: 'inherit' });
