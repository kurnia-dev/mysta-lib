import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../presets/kitsune');
const rootFiles = ["index.ts", "global.ts", "icons.css", "tailwind.config.js"];

const presetsDir = path.resolve(__dirname, '../presets');

function copyFolderRecursiveSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderRecursiveSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

if (!fs.existsSync(srcDir)) {
  console.error(`Error: Source preset directory not found at ${srcDir}`);
  process.exit(1);
}

const targets = fs.readdirSync(presetsDir).filter(file => {
  const fullPath = path.join(presetsDir, file);
  return fs.statSync(fullPath).isDirectory() && file !== 'kitsune' && file !== 'node_modules' && file !== 'dist';
});

targets.forEach(target => {
  const targetPath = path.join(presetsDir, target);
  console.log(`👉 Syncing into ${targetPath} (preset: ${target})…`);

  // 1) copy every component directory
  fs.readdirSync(srcDir).forEach(item => {
    const itemPath = path.join(srcDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      console.log(`   • ${item}/`);
      const targetItemPath = path.join(targetPath, item);
      fs.rmSync(targetItemPath, { recursive: true, force: true });
      copyFolderRecursiveSync(itemPath, targetItemPath);
    }
  });

  // 2) copy root files, then patch index.ts
  rootFiles.forEach(file => {
    const srcFilePath = path.join(srcDir, file);
    if (fs.existsSync(srcFilePath)) {
      console.log(`   • ${file}`);
      const targetFilePath = path.join(targetPath, file);
      fs.copyFileSync(srcFilePath, targetFilePath);

      if (file === 'index.ts') {
        let content = fs.readFileSync(targetFilePath, 'utf-8');
        // Replace `const kitsune` with `const target` and default export
        content = content.replace(/\bconst\s+kitsune\b/g, `const ${target}`);
        content = content.replace(/\bexport\s+default\s+kitsune\b/g, `export default ${target}`);
        fs.writeFileSync(targetFilePath, content, 'utf-8');
      }
    }
  });

  console.log(`✅  Done with ${target}`);
});
