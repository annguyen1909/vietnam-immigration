import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = '.img-candidates/_finals';
const COLS = 3;
const CELL_W = 380;
const CELL_H = Math.round((CELL_W * 675) / 1200);
const PAD = 6;
const LABEL_H = 30;

const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg')).sort();
const part = process.argv[2] ? +process.argv[2] : 0; // 0=all, else split into halves
let list = files;
if (part === 1) list = files.slice(0, Math.ceil(files.length / 2));
if (part === 2) list = files.slice(Math.ceil(files.length / 2));

const rows = Math.ceil(list.length / COLS);
const sheetW = COLS * (CELL_W + PAD) + PAD;
const sheetH = rows * (CELL_H + LABEL_H + PAD) + PAD;
const composites = [];

for (let i = 0; i < list.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (CELL_W + PAD);
  const y = PAD + row * (CELL_H + LABEL_H + PAD);
  const thumb = await sharp(join(SRC, list[i])).resize(CELL_W, CELL_H).jpeg().toBuffer();
  composites.push({ input: thumb, top: y, left: x });
  const label = list[i].replace('.jpg', '').replace(/-2026$/, '');
  const svg = Buffer.from(
    `<svg width="${CELL_W}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#111"/><text x="5" y="20" font-family="sans-serif" font-size="13" fill="#6cf">${label}</text></svg>`
  );
  composites.push({ input: svg, top: y + CELL_H, left: x });
}

const name = part ? `_review_${part}.jpg` : '_review_all.jpg';
await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: '#000' } })
  .composite(composites)
  .jpeg({ quality: 80 })
  .toFile(join('.img-candidates', name));
console.log('wrote', name, `(${list.length} imgs)`);
