import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const presets = ["kitsune", "yurei", "raijin", "inari", "yuki", "sakuragi"];

presets.forEach(preset => {
  console.log(`Building styles for preset: ${preset}`);
  const inputDir = path.resolve(__dirname, preset);
  const outputDir = path.resolve(__dirname, 'dist', preset);

  fs.mkdirSync(outputDir, { recursive: true });
  
  if (fs.existsSync(path.join(inputDir, 'colors.config.json'))) {
    fs.copyFileSync(
      path.join(inputDir, 'colors.config.json'),
      path.join(outputDir, 'colors.config.json')
    );
  }

  // Run Tailwind CSS compilation
  execSync(
    `npx tailwindcss -i ${path.join(inputDir, 'index.css')} -o ${path.join(outputDir, 'style.css')} --config ${path.join(inputDir, 'tailwind.config.js')}`,
    { stdio: 'inherit' }
  );
});
console.log('All preset styles compiled.');
