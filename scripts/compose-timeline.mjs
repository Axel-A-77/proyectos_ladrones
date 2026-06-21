// Compone docs/qa/timeline-every-10s.png desde out/qa/tl*.png (extraídos del MP4).
import {PNG} from 'pngjs';
import {readFileSync, writeFileSync, readdirSync, rmSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const qa = resolve(root, 'out/qa');
const files = readdirSync(qa).filter((f) => /^tl\d+\.png$/.test(f)).sort();

const downscale = (file, tw, th) => {
  const src = PNG.sync.read(readFileSync(resolve(qa, file)));
  const out = new PNG({width: tw, height: th});
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) {
      const sx = Math.floor((x / tw) * src.width);
      const sy = Math.floor((y / th) * src.height);
      const si = (sy * src.width + sx) * 4;
      const di = (y * tw + x) * 4;
      out.data[di] = src.data[si];
      out.data[di + 1] = src.data[si + 1];
      out.data[di + 2] = src.data[si + 2];
      out.data[di + 3] = 255;
    }
  return out;
};

const tw = 192, th = 108, gap = 4, cols = 10;
const thumbs = files.map((f) => downscale(f, tw, th));
const rows = Math.ceil(thumbs.length / cols);
const W = cols * tw + (cols + 1) * gap;
const H = rows * th + (rows + 1) * gap;
const sheet = new PNG({width: W, height: H});
for (let i = 0; i < sheet.data.length; i += 4) {
  sheet.data[i] = 38; sheet.data[i + 1] = 38; sheet.data[i + 2] = 38; sheet.data[i + 3] = 255;
}
thumbs.forEach((t, i) => {
  const cx = gap + (i % cols) * (tw + gap);
  const cy = gap + Math.floor(i / cols) * (th + gap);
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) {
      const di = ((cy + y) * W + (cx + x)) * 4;
      const si = (y * tw + x) * 4;
      sheet.data[di] = t.data[si];
      sheet.data[di + 1] = t.data[si + 1];
      sheet.data[di + 2] = t.data[si + 2];
      sheet.data[di + 3] = 255;
    }
});
writeFileSync(resolve(root, 'docs/qa/timeline-every-10s.png'), PNG.sync.write(sheet));
for (const f of files) rmSync(resolve(qa, f));
console.log(`timeline-every-10s.png: ${thumbs.length} frames (cada 10s) -> docs/qa/`);
