const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');

const GALLERY = 'C:/Users/pxl08/Desktop/Zproj/haifan_yin/public/gallery';
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

(async () => {
  const allFiles = walkSync(GALLERY);
  let totalBefore = 0, totalAfter = 0, count = 0;

  for (const file of allFiles) {
    const kb = Math.round(fs.statSync(file).size / 1024);
    if (kb <= MAX_KB) continue;

    const rel = path.relative(GALLERY, file);
    try {
      const meta = await sharp(file).metadata();
      let q = 82, buf;
      for (; q >= 50; q -= 5) {
        let p = sharp(file);
        if (meta.width > MAX_WIDTH) p = p.resize(MAX_WIDTH);
        buf = await p.jpeg({ quality: q, mozjpeg: true }).toBuffer();
        if (Math.round(buf.length / 1024) <= MAX_KB) break;
      }
      const nk = Math.round(buf.length / 1024);
      // Write to temp file first, then rename
      const tmp = file + '.tmp';
      fs.writeFileSync(tmp, buf);
      fs.renameSync(tmp, file);
      console.log('✅', rel, kb+'KB →', nk+'KB (q='+q+')');
      totalBefore += kb;
      totalAfter += nk;
      count++;
    } catch (err) {
      console.error('❌', rel, err.message);
    }
  }
  console.log('\n' + count + ' files: ' + totalBefore + ' KB → ' + totalAfter + ' KB (' + Math.round((1 - totalAfter/totalBefore)*100) + '% saved)');
})();
