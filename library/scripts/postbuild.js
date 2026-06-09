import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../components');
const destDir = path.resolve(__dirname, '../dist/types/components');

function copyDtsFiles(src, dest) {
  if (!fs.existsSync(src)) return;
  const list = fs.readdirSync(src);
  list.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDtsFiles(srcPath, destPath);
    } else if (item.endsWith('.d.ts')) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDtsFiles(srcDir, destDir);
console.log('Postbuild type copy complete.');
