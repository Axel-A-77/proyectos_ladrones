// QA de assets: refs ill() existen, PNGs sin uso, % útil (bounding box de alfa).
import {readFileSync, writeFileSync, readdirSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {PNG} from 'pngjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scenesDir = resolve(root, 'src/scenes');
const illDir = resolve(root, 'assets/ilustraciones');

const refs = new Set();
for (const f of readdirSync(scenesDir).filter((f) => /\.(tsx?|jsx?)$/.test(f))) {
  const t = readFileSync(resolve(scenesDir, f), 'utf8');
  // capta tanto ill('x.png') como <Hero src="x.png" /> (cualquier literal .png)
  for (const m of t.matchAll(/['"]([^'"]*?\.png)['"]/g)) refs.add(m[1].split('/').pop());
}

const files = readdirSync(illDir).filter((f) => f.toLowerCase().endsWith('.png'));
const missing = [...refs].filter((r) => !files.includes(r));
const used = files.filter((f) => refs.has(f));
const unused = files.filter((f) => !refs.has(f));

const bbox = (file) => {
  try {
    const png = PNG.sync.read(readFileSync(resolve(illDir, file)));
    const {width: W, height: H, data} = png;
    let minX = W, minY = H, maxX = 0, maxY = 0, any = false;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const a = data[(y * W + x) * 4 + 3];
        if (a > 12) {
          any = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    if (!any) return {W, H, pct: 0};
    const pct = (((maxX - minX + 1) * (maxY - minY + 1)) / (W * H)) * 100;
    return {W, H, pct};
  } catch {
    return null;
  }
};

const lines = [];
const note = (s) => lines.push(s);
note('# QA de assets (ilustraciones)\n');
note(`- Referenciadas por escenas (ill()): ${refs.size}`);
note(`- PNG en assets/ilustraciones: ${files.length}`);
note(`- **En uso: ${used.length}** | sin uso: ${unused.length}`);
let errors = 0;
if (missing.length) {
  note(`\n## ⚠ Referenciadas pero NO existen (${missing.length}):`);
  missing.forEach((m) => note(`- ${m}`));
  errors += missing.length;
}
note(`\n## En uso — % útil (bounding box de alfa):`);
const lowUse = [];
for (const f of used.sort()) {
  const b = bbox(f);
  if (!b) {
    note(`- ${f}: (no se pudo leer)`);
    continue;
  }
  note(`- ${f}: ${b.W}x${b.H}, útil ${b.pct.toFixed(0)}%`);
  if (b.pct < 55) lowUse.push(f);
}
if (lowUse.length) {
  note(`\n## A recortar (útil < 55%): ${lowUse.join(', ')}`);
}
note(`\n## Sin uso (candidatas a quitar del montaje): ${unused.length}`);
unused.sort().forEach((u) => note(`- ${u}`));

mkdirSync(resolve(root, 'docs'), {recursive: true});
writeFileSync(resolve(root, 'docs/ASSETS_QA.md'), lines.join('\n') + '\n');
console.log(`assets: ${used.length} en uso, ${unused.length} sin uso, ${missing.length} faltantes`);
console.log('-> docs/ASSETS_QA.md');
if (errors > 0) process.exit(1);
