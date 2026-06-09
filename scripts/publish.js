import { execSync } from 'child_process';
import fs from 'fs';

const tag = process.argv[2];

if (!fs.existsSync('dist')) {
  console.error('Error: dist directory does not exist. Please run build first.');
  process.exit(1);
}

// Publish using pnpm publish from the package directory itself
const publishCmd = tag ? `pnpm publish --access public --no-git-checks --tag ${tag}` : 'pnpm publish --access public --no-git-checks';
console.log(`Running publish: ${publishCmd}`);
execSync(publishCmd, { stdio: 'inherit' });

console.log('Publish complete.');
