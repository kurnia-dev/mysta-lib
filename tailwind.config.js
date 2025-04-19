import config from './presets/kitsune/tailwind.config';

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

