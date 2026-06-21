// Genera docs/qa/contact-sheet.png (primer/intermedio/final de cada escena ANIM)
// y docs/qa/timeline-every-10s.png (un frame cada 10s). Compone con pngjs (sin ffmpeg).
// También detecta inicios casi vacíos (frame ~from).
import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill} from '@remotion/renderer';
import {PNG} from 'pngjs';
import {readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import os from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = resolve(root, 'out/qa/_frames');
mkdirSync(tmp, {recursive: true});
mkdirSync(resolve(root, 'docs/qa'), {recursive: true});

const FPS = 30;
const evalTime = (e) => {
  e = e.trim();
  const m = e.match(/^t\(\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  return m ? +m[1] * 60 + +m[2] : parseFloat(e);
};
const segTxt = readFileSync(resolve(root, 'src/segments.ts'), 'utf8');
const body = segTxt.slice(segTxt.indexOf('export const SEGMENTS'));
const anim = [];
for (const o of [...body.matchAll(/\{[^{}]*\}/g)].map((m) => m[0])) {
  const kind = (o.match(/kind:\s*'([^']+)'/) || [])[1];
  if (kind === 'PAPA') continue;
  const id = (o.match(/id:\s*'([^']+)'/) || [])[1];
  const from = evalTime((o.match(/from:\s*(t\(\s*\d+\s*,\s*\d+\s*\)|[\d.]+)/) || [])[1]);
  const to = evalTime((o.match(/to:\s*(t\(\s*\d+\s*,\s*\d+\s*\)|[\d.]+)/) || [])[1]);
  if (id && from != null && to != null) anim.push({id, from, to});
}
const caps = JSON.parse(readFileSync(resolve(root, 'src/data/captions.json'), 'utf8'));
const lastEnd = caps[caps.length - 1].end;

console.log('Bundling…');
const serveUrl = await bundle({entryPoint: resolve(root, 'src/index.ts'), publicDir: resolve(root, 'assets')});
const composition = await selectComposition({serveUrl, id: 'LosLadrones'});

const renderFrame = async (frame, name) => {
  const out = resolve(tmp, `${name}.png`);
  await renderStill({composition, serveUrl, output: out, frame, imageFormat: 'png', overwrite: true});
  return out;
};

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

const isBlank = (file) => {
  const src = PNG.sync.read(readFileSync(file));
  const seen = new Set();
  for (let i = 0; i < src.data.length; i += 4 * 997) {
    seen.add(`${src.data[i] >> 4},${src.data[i + 1] >> 4},${src.data[i + 2] >> 4}`);
  }
  return seen.size <= 3; // casi un solo color = vacío
};

const grid = (thumbs, cols, tw, th, gap, outPath) => {
  const rows = Math.ceil(thumbs.length / cols);
  const W = cols * tw + (cols + 1) * gap;
  const H = rows * th + (rows + 1) * gap;
  const sheet = new PNG({width: W, height: H});
  sheet.data.fill(40);
  for (let i = 0; i < sheet.data.length; i += 4) sheet.data[i + 3] = 255;
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
  writeFileSync(outPath, PNG.sync.write(sheet));
};

// --- Contact sheet: primer/intermedio/final de cada ANIM ---
const blanks = [];
const csThumbs = [];
for (const s of anim) {
  const fFirst = Math.round((s.from + 0.25) * FPS);
  const fMid = Math.round(((s.from + s.to) / 2) * FPS);
  const fLast = Math.round((s.to - 0.35) * FPS);
  const a = await renderFrame(fFirst, `${s.id}_a`);
  if (isBlank(a)) blanks.push(s.id);
  const b = await renderFrame(fMid, `${s.id}_b`);
  const c = await renderFrame(fLast, `${s.id}_c`);
  csThumbs.push(downscale(a, 300, 169), downscale(b, 300, 169), downscale(c, 300, 169));
  console.log(`  ${s.id}: ${fFirst}/${fMid}/${fLast}${isBlank(a) ? ' (¡INICIO VACÍO!)' : ''}`);
}
grid(csThumbs, 6, 300, 169, 8, resolve(root, 'docs/qa/contact-sheet.png'));
console.log('-> docs/qa/contact-sheet.png');

// --- Timeline cada 10s ---
const tlThumbs = [];
for (let s = 0; s < lastEnd; s += 10) {
  const f = Math.round(s * FPS);
  const p = await renderFrame(f, `tl_${s}`);
  tlThumbs.push(downscale(p, 192, 108));
}
grid(tlThumbs, 10, 192, 108, 4, resolve(root, 'docs/qa/timeline-every-10s.png'));
console.log('-> docs/qa/timeline-every-10s.png');

writeFileSync(resolve(root, 'docs/qa/_blanks.json'), JSON.stringify(blanks, null, 2));
console.log(blanks.length ? `INICIOS VACÍOS: ${blanks.join(', ')}` : 'Sin inicios vacíos ✓');

// limpia frames temporales + temporales de remotion
rmSync(tmp, {recursive: true, force: true});
const t = os.tmpdir();
for (const d of readdirSync(t)) if (d.startsWith('remotion-')) try { rmSync(resolve(t, d), {recursive: true, force: true}); } catch {}
console.log('Listo.');
