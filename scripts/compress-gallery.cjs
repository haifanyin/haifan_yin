const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const GALLERY = path.join(PROJECT_ROOT, 'public', 'gallery');
const MAX_KB = 500;
const MAX_WIDTH = 1920;

function walkSync(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkSync(full));
    else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

async function compressOne(file, rel) {
  const { size } = fs.statSync(file);
  const kb = Math.round(size / 1024);
  
  const metadata = await sharp(file).metadata();
  let quality = 82;
  let buffer;

  for (let q = quality; q >= 50; q -= 5) {
    let p = sharp(file);
    if (metadata.width > MAX_WIDTH) p = p.resize(MAX_WIDTH);
    buffer = await p.jpeg({ quality: q, mozjpeg: true }).toBuffer();
    quality = q;
    if (Math.round(buffer.length / 1024) <= MAX_KB) break;
  }

  const newKb = Math.round(buffer.length / 1024);
  fs.writeFileSync(file, buffer);
  const ok = newKb <= MAX_KB ? '✅' : '⚠️';
  console.log(`${ok} ${rel}: ${kb} KB → ${newKb} KB (q=${quality})`);
  return { before: kb, after: newKb };
}

(async () => {
  const allFiles = walkSync(GALLERY);
  const results = [];
  
  for (const file of allFiles) {
    const kb = Math.round(fs.statSync(file).size / 1024);
    if (kb <= MAX_KB) continue;
    const rel = path.relative(GALLERY, file);
    try {
      results.push(await compressOne(file, rel));
    } catch (err) {
      console.error(`❌ ${rel}: ${err.message}`);
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  console.log(`\nDone! ${results.length} files: ${totalBefore} KB → ${totalAfter} KB (${Math.round((1 - totalAfter/totalBefore) * 100)}% saved)`);
})();
