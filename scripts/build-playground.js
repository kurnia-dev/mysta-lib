import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const presetName = "kitsune";

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

console.log(`Generating files for build with preset: ${presetName}...`);
fs.writeFileSync('tailwind.config.js', configContent);
fs.writeFileSync('main.tsx', mainContent);

function cleanup() {
  console.log('Cleaning up generated files...');
  try {
    if (fs.existsSync('tailwind.config.js')) fs.unlinkSync('tailwind.config.js');
    if (fs.existsSync('main.tsx')) fs.unlinkSync('main.tsx');
  } catch (e) {
    // Ignore
  }
}

console.log('Running vite build...');
try {
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Vite build completed successfully.');
} catch (e) {
  cleanup();
  process.exit(1);
}

cleanup();
console.log('Build script finished.');
