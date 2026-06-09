import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = process.argv[2]; // "stable", "alpha", or a specific version string (e.g. "1.0.0-alpha.38")

if (!input) {
  console.log("Usage: node release.js <stable|alpha|version_string>");
  process.exit(1);
}

// 1. Read current version from root package.json
const rootPkgPath = path.resolve(__dirname, '../package.json');
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf-8'));
const currentVersion = rootPkg.version;
console.log(`Current synchronized version: ${currentVersion}`);

let newVersion;
if (input === 'stable') {
  // If current version has a prerelease tag (e.g., 1.0.0-alpha.37), promote it to stable (1.0.0)
  // Else bump patch
  if (currentVersion.includes('-')) {
    newVersion = currentVersion.split('-')[0];
  } else {
    // simple patch bump
    const parts = currentVersion.split('.');
    parts[2] = String(Number(parts[2]) + 1);
    newVersion = parts.join('.');
  }
} else if (input === 'alpha') {
  // If current version has an alpha prerelease tag (e.g. 1.0.0-alpha.37), bump alpha number
  // Else bump patch and add -alpha.0
  if (currentVersion.includes('-alpha.')) {
    const parts = currentVersion.split('-alpha.');
    const alphaNum = Number(parts[1]) + 1;
    newVersion = `${parts[0]}-alpha.${alphaNum}`;
  } else {
    // bump patch and add -alpha.0
    const cleanVersion = currentVersion.split('-')[0];
    const parts = cleanVersion.split('.');
    parts[2] = String(Number(parts[2]) + 1);
    newVersion = `${parts.join('.')}-alpha.0`;
  }
} else {
  // Assume it is a specific version string
  newVersion = input;
}

const tag = newVersion.includes('-') ? newVersion.split('-')[1].split('.')[0] : 'latest';
console.log(`Bumping to synchronized version: ${newVersion} (NPM tag: ${tag})`);

// 2. Bump version in root and all packages
console.log('Bumping version in root package.json...');
rootPkg.version = newVersion;
fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');

const workspaces = ['library', 'packages/mysta-lib', 'presets'];
workspaces.forEach(workspace => {
  const pkgPath = path.resolve(__dirname, '..', workspace, 'package.json');
  if (fs.existsSync(pkgPath)) {
    console.log(`Bumping version in ${workspace}/package.json...`);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.version = newVersion;
    
    // Also bump inter-workspace dependencies if they exist
    if (pkg.dependencies) {
      Object.keys(pkg.dependencies).forEach(dep => {
        if (dep.startsWith('@mystaline/')) {
          // Keep workspace:* protocol so that pnpm resolves it during development/publish
          pkg.dependencies[dep] = 'workspace:*';
        }
      });
    }
    
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }
});

// 3. Build all packages recursively
console.log('Running clean workspace build...');
execSync('pnpm build', { stdio: 'inherit' });

// 4. Git commit
console.log('Staging and committing version bump...');
execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });

// 5. Publish all packages topologically
console.log(`Publishing all packages with tag: ${tag}...`);
execSync(`pnpm -r publish --access public --no-git-checks --tag ${tag}`, { stdio: 'inherit' });

console.log(`✅ Synchronized release of v${newVersion} complete!`);
