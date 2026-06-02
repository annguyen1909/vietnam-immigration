import sharp from 'sharp';
import { readdir, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = '.img-candidates';
const OUT = '.img-candidates/_sheets';

const COLS = 3;
const CELL_W = 420;
const CELL_H = 260;
const PAD = 8;
const LABEL_H = 26;

async function buildSheet(category, files) {
  const rows = Math.ceil(files.length / COLS);
  const sheetW = COLS * (CELL_W + PAD) + PAD;
  const sheetH = rows * (CELL_H + LABEL_H + PAD) + PAD + 30;

  const composites = [];

  // title
  const titleSvg = Buffer.from(
    `<svg width="${sheetW}" height="30"><rect width="100%" height="100%" fill="#111"/><text x="10" y="21" font-family="sans-serif" font-size="18" fill="#fff">${category}</text></svg>`
  );
  composites.push({ input: titleSvg, top: 0, left: 0 });

  for (let i = 0; i < files.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PAD + col * (CELL_W + PAD);
    const y = 30 + PAD + row * (CELL_H + LABEL_H + PAD);

    let thumb;
    try {
      thumb = await sharp(join(SRC, files[i]))
        .resize(CELL_W, CELL_H, { fit: 'cover', position: 'attention' })
        .jpeg()
        .toBuffer();
    } catch {
      thumb = await sharp({ create: { width: CELL_W, height: CELL_H, channels: 3, background: '#400' } })
        .jpeg()
        .toBuffer();
    }
    composites.push({ input: thumb, top: y, left: x });

    const n = files[i].match(/__(\d+)\./)?.[1] ?? '?';
    const labelSvg = Buffer.from(
      `<svg width="${CELL_W}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#222"/><text x="6" y="18" font-family="sans-serif" font-size="15" fill="#0f0">#${n}</text></svg>`
    );
    composites.push({ input: labelSvg, top: y + CELL_H, left: x });
  }

  await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: '#000' } })
    .composite(composites)
    .jpeg({ quality: 78 })
    .toFile(join(OUT, `${category}.jpg`));
}

const all = (await readdir(SRC)).filter((f) => f.endsWith('.jpg'));
const byCat = {};
for (const f of all) {
  const cat = f.replace(/__\d+\.jpg$/, '');
  (byCat[cat] ||= []).push(f);
}
for (const cat of Object.keys(byCat)) {
  byCat[cat].sort((a, b) => {
    const na = +(a.match(/__(\d+)\./)?.[1] ?? 0);
    const nb = +(b.match(/__(\d+)\./)?.[1] ?? 0);
    return na - nb;
  });
}

await mkdir(OUT, { recursive: true });
for (const cat of Object.keys(byCat).sort()) {
  await buildSheet(cat, byCat[cat]);
  console.log(`sheet: ${cat} (${byCat[cat].length})`);
}
console.log('done');
