// Compone docs/qa/contact-sheet.png a partir de stills YA renderizados (sin re-render).
import {PNG} from 'pngjs';
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const find = (name) => {
  for (const d of ['out/qa', 'docs/qa']) {
    const p = resolve(root, d, name);
    if (existsSync(p)) return p;
  }
  return null;
};

// un still representativo por escena, en orden de aparición
const wanted = [
  'f_95.png', 'f_540.png', 'f_2350.png', 'f_2900.png', 'f_3560.png', 'f_3700.png',
  'f_4480.png', 'f_4820.png', 'f_6570.png', 'f_8950.png', 'f_11400.png', 'f_13500.png',
  'f_14640.png', 'f_16780.png', 'f_17010.png', 'f_17950.png', 'f_19880.png', 'f_20420.png',
  'f_20920.png', 'f_22100.png', 'f_23180.png', 'f_24210.png', 'f_24460.png', 'f_25250.png',
  'f_26600.png', 'f_27470.png', 'f_28760.png', 'people.png',
];

const downscale = (file, tw, th) => {
  const src = PNG.sync.read(readFileSync(file));
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

const thumbs = [];
let missing = 0;
for (const w of wanted) {
  const p = find(w);
  if (!p) {
    missing++;
    continue;
  }
  thumbs.push(downscale(p, 360, 203));
}

const cols = 5;
const tw = 360, th = 203, gap = 8;
const rows = Math.ceil(thumbs.length / cols);
const W = cols * tw + (cols + 1) * gap;
const H = rows * th + (rows + 1) * gap;
const sheet = new PNG({width: W, height: H});
for (let i = 0; i < sheet.data.length; i += 4) {
  sheet.data[i] = 38;
  sheet.data[i + 1] = 38;
  sheet.data[i + 2] = 38;
  sheet.data[i + 3] = 255;
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
writeFileSync(resolve(root, 'docs/qa/contact-sheet.png'), PNG.sync.write(sheet));
console.log(`contact-sheet.png: ${thumbs.length} escenas (${missing} faltantes) -> docs/qa/`);
