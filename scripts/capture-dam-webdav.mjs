import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../../unopim/tests/e2e-pw/test-results/docs-screenshots');
const OUT = path.resolve(__dirname, '../docs/dam-webdav/images');

await fs.mkdir(OUT, { recursive: true });

let entries;
try {
  entries = await fs.readdir(SRC);
} catch {
  console.error(`Cannot read ${SRC}. Run \`npm run docs:dam-webdav:capture\` first.`);
  process.exit(1);
}

const pngs = entries.filter((f) => f.endsWith('.png'));
if (pngs.length === 0) {
  console.error('No PNGs found.');
  process.exit(1);
}

let total = 0;
for (const file of pngs) {
  const id = file.replace(/\.png$/, '');
  const outPath = path.join(OUT, `${id}.webp`);
  await sharp(path.join(SRC, file))
    .resize({ width: 1600, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 88, effort: 5, smartSubsample: true })
    .toFile(outPath);
  const { size } = await fs.stat(outPath);
  total += size;
  console.log(`${id.padEnd(28)} ${(size / 1024).toFixed(1).padStart(8)} KB`);
}
console.log(`\n${pngs.length} files -> ${OUT} (${(total / 1024 / 1024).toFixed(2)} MB total)`);
