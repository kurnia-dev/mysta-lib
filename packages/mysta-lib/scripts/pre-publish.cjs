// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

// Get the version from package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const { version, name, author, description } = packageJson;

// Change directory to 'dist'
process.chdir('dist');

// Create a new package.json with the dynamic version
const newPackageJson = {
  name,
  version,
  author,
  description,
  type: 'module',
  module: './mysta-lib.es.js',
  types: './main.d.ts',
  exports: {
    '.': './mysta-lib.es.js',
    './style.css': './style.css',
    './types': './types',
    './utils': './utils',
  },
};

fs.writeFileSync('package.json', JSON.stringify(newPackageJson, null, 2));

// Change back to the original directory
process.chdir('../');
