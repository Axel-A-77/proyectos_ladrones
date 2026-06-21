// Recorta el lienzo transparente de los PNG EN USO (alpha bbox + 4% padding).
// Escribe a assets/ilustraciones/trimmed/ (NO destruye originales) + reporte JSON.
import {readFileSync, writeFileSync, readdirSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {PNG} from 'pngjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scenesDir = resolve(root, 'src/scenes');
const illDir = resolve(root, 'assets/ilustraciones');
const outDir = resolve(illDir, 'trimmed');
mkdirSync(outDir, {recursive: true});

// PNGs realmente referenciados por las escenas (no perder tiempo con los eliminados).
const refs = new Set();
for (const f of readdirSync(scenesDir).filter((f) => /\.(tsx?|jsx?)$/.test(f))) {
  const t = readFileSync(resolve(scenesDir, f), 'utf8');
  for (const m of t.matchAll(/['"]([^'"]*?\.png)['"]/g)) refs.add(m[1].split('/').pop());
}

const report = [];
for (const file of [...refs].sort()) {
  let png;
  try {
    png = PNG.sync.read(readFileSync(resolve(illDir, file)));
  } catch {
    continue;
  }
  const {width: W, height: H, data} = png;
  let minX = W, minY = H, maxX = 0, maxY = 0, any = false;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 12) {
        any = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  if (!any) continue;
  const padX = Math.round((maxX - minX + 1) * 0.04);
  const padY = Math.round((maxY - minY + 1) * 0.04);
  minX = Math.max(0, minX - padX);
  minY = Math.max(0, minY - padY);
  maxX = Math.min(W - 1, maxX + padX);
  maxY = Math.min(H - 1, maxY + padY);
  const nW = maxX - minX + 1;
  const nH = maxY - minY + 1;
  const out = new PNG({width: nW, height: nH});
  for (let y = 0; y < nH; y++)
    for (let x = 0; x < nW; x++) {
      const si = ((minY + y) * W + (minX + x)) * 4;
      const di = (y * nW + x) * 4;
      out.data[di] = data[si];
      out.data[di + 1] = data[si + 1];
      out.data[di + 2] = data[si + 2];
      out.data[di + 3] = data[si + 3];
    }
  writeFileSync(resolve(outDir, file), PNG.sync.write(out));
  report.push({file, from: `${W}x${H}`, to: `${nW}x${nH}`});
}

writeFileSync(resolve(outDir, '_trim-report.json'), JSON.stringify(report, null, 2));
console.log(`trim: ${report.length} PNG recortados -> assets/ilustraciones/trimmed/`);
