import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const workspace = process.argv[2];
const releaseType = process.argv[3]; // "stable" or "alpha"

if (!workspace || !releaseType) {
  console.log("Usage: node release.js <workspace> <stable|alpha>");
  process.exit(1);
}

const tag = releaseType === 'alpha' ? 'alpha' : 'latest';

// Find workspace directory
let workspaceDir;
if (workspace.includes('commons') || workspace === 'library') {
  workspaceDir = 'library';
} else if (workspace.includes('lib') || workspace.includes('packages/mysta-lib')) {
  workspaceDir = 'packages/mysta-lib';
} else if (workspace.includes('presets') || workspace === 'presets') {
  workspaceDir = 'presets';
} else {
  console.error(`Unknown workspace: ${workspace}`);
  process.exit(1);
}

console.log(`Building workspace: ${workspaceDir}...`);
execSync(`pnpm --filter ${workspace} build`, { stdio: 'inherit' });

console.log(`Bumping version for ${workspaceDir}...`);
if (releaseType === 'alpha') {
  execSync(`pnpm --filter ${workspace} exec npm version prerelease --preid=alpha`, { stdio: 'inherit' });
} else {
  execSync(`pnpm --filter ${workspace} exec npm version patch`, { stdio: 'inherit' });
}

// Read the new version
const childPkgJson = JSON.parse(fs.readFileSync(path.join(workspaceDir, 'package.json'), 'utf-8'));
const newVersion = childPkgJson.version;

console.log(`Version bumped to ${newVersion}. Committing changes...`);
execSync(`git add ${path.join(workspaceDir, 'package.json')}`, { stdio: 'inherit' });
execSync(`git commit -m "chore(${workspace}): bump version to ${newVersion}"`, { stdio: 'inherit' });

console.log(`Running release script for ${workspace}...`);
execSync(`pnpm --filter ${workspace} release ${tag}`, { stdio: 'inherit' });

console.log(`Release complete for ${workspace}!`);
