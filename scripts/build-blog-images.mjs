// Crop + compress curated candidates into final blog cover images (1200x675, 16:9).
// Usage: node scripts/build-blog-images.mjs            -> writes finals to public
//        node scripts/build-blog-images.mjs --preview  -> writes previews to .img-candidates/_finals
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = '.img-candidates';
const DEST = 'public/img/blog/photos';
const PREVIEW_DIR = '.img-candidates/_finals';
const W = 1200;
const H = 675;

// blog slug -> curated candidate file. Cuisine intentionally omitted (already good).
const MAP = {
  // Destinations & experiences
  'best-islands-vietnam-beyond-hanoi-2026': 'best-islands__4.jpg',
  'vietnam-beach-holidays-coast-2026': 'beach__1.jpg',
  'vietnam-tropical-islands-paradise-2026': 'island-sunny__1.jpg',
  'vietnam-best-diving-destinations-2026': 'best-islands__1.jpg',
  'best-photography-spots-vietnam-2026': 'golden-bridge__2.jpg',
  'hidden-gems-vietnam-2026': 'hidden-gems__1.jpg',
  'vietnam-adventure-travel-2026': 'adventure-b__1.jpg',
  'vietnam-volcano-trekking-guide-2026': 'volcano-b__5.jpg',
  'vietnam-wildlife-nature-encounters-2026': 'wildlife__4.jpg',
  'vietnam-national-parks-wildlife-2026': 'national-parks__2.jpg',
  'top-10-historical-places-vietnam': 'historical__5.jpg',
  'vietnamese-festivals-cultural-celebrations-2026': 'festivals__1.jpg',
  'vietnamese-music-arts-culture-2026': 'music-arts__2.jpg',
  'vietnam-shopping-markets-guide-2026': 'shopping__4.jpg',
  'family-friendly-vietnam-2026': 'family__2.jpg',
  'vietnamese-wellness-spa-retreats-2026': 'tropical-islands__3.jpg',
  // eVisa / admin guides (Vietnam scenics + thematically adjacent travel/finance imagery)
  'vietnam-evisa-approved-entry-ports-2026': 'airport__2.jpg',
  'vietnam-evisa-multiple-entry-guide-2026': 'airport-b__4.jpg',
  'vietnam-evisa-processing-time-2026': 'hanoi__3.jpg',
  'vietnam-evisa-extension-guide-2026': 'danang-bridge__1.jpg',
  'how-to-apply-vietnam-evisa-online-2026': 'hcmc__6.jpg',
  'vietnam-evisa-requirements-guide-2026': 'hanoi__2.jpg',
  'vietnam-evisa-for-minors-families-2026': 'family__1.jpg',
  'vietnam-evisa-photo-requirements-2026': 'adventure__2.jpg',
  'vietnam-evisa-common-mistakes-2026': 'danang-bridge__2.jpg',
  'vietnam-evisa-rejection-reasons-2026': 'hcmc__2.jpg',
  'vietnam-evisa-fees-explained-2026': 'currency-b__2.jpg',
  'vietnam-currency-exchange-guide-2026': 'currency-b__6.jpg',
  'vietnam-evisa-vs-embassy-visa-2026': 'golden-bridge__1.jpg',
};

const preview = process.argv.includes('--preview');
const outDir = preview ? PREVIEW_DIR : DEST;
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const [slug, file] of Object.entries(MAP)) {
  const src = join(SRC, file);
  const out = join(outDir, `${slug}.jpg`);
  try {
    await sharp(src)
      .resize(W, H, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    ok += 1;
    console.log(`${slug}  <-  ${file}`);
  } catch (e) {
    console.log(`FAILED ${slug} (${file}): ${e.message}`);
  }
}
console.log(`\n${ok}/${Object.keys(MAP).length} written to ${outDir}`);
