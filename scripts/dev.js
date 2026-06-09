import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const supportedPresets = ["kitsune", "yurei", "raijin", "inari", "yuki", "sakuragi"];
let presetName = "kitsune";

// Parse arguments
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--preset') {
    presetName = args[i + 1];
    i++;
  }
}

if (!supportedPresets.includes(presetName)) {
  console.error(`Error: Invalid preset name '${presetName}'.`);
  console.error(`Supported preset names: ${supportedPresets.join(', ')}`);
  process.exit(1);
}

console.log(`Using preset: ${presetName}`);

const configContent = `import config from './presets/${presetName}/tailwind.config';

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
`;

const mainContent = `import React from 'react';
import ReactDOM from 'react-dom/client';

import { MystaLibProvider } from './library/context';

import './library/assets/css/main.css';
import './presets/${presetName}/index.css';

import App from './playground/App';
import { ${presetName} } from './presets';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MystaLibProvider configOptions={{ preset: ${presetName} }}>
        <App />
      </MystaLibProvider>
    </React.StrictMode>
  );
}
`;

fs.writeFileSync('tailwind.config.js', configContent);
console.log(`tailwind.config.js has been generated with preset: ${presetName}`);
fs.writeFileSync('main.tsx', mainContent);
console.log(`main.tsx has been generated with preset: ${presetName}`);

function cleanup() {
  console.log('\nCleaning up generated tailwind.config.js and main.tsx...');
  try {
    if (fs.existsSync('tailwind.config.js')) fs.unlinkSync('tailwind.config.js');
    if (fs.existsSync('main.tsx')) fs.unlinkSync('main.tsx');
  } catch (e) {
    // Ignore
  }
  console.log('Cleanup complete.');
}

// Register exit handlers
process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});
process.on('exit', () => {
  cleanup();
});

console.log('Starting the development server...');
try {
  execSync('npx vite --host', { stdio: 'inherit' });
} catch (e) {
  // Ignore
}
