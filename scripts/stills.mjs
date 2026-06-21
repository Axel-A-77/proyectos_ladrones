// QA: bundlea una vez y saca fotogramas de control del video completo.
//   node scripts/stills.mjs            (frames por defecto)
//   node scripts/stills.mjs 0 660 9600 (frames a elegir)
import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill} from '@remotion/renderer';
import {mkdirSync, rmSync, readdirSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'out/qa');
mkdirSync(outDir, {recursive: true});

const frames =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2).map(Number)
    : [0, 660, 2220, 2730, 5280, 9600, 16380, 21600, 25380];

console.log('Bundling…');
const serveUrl = await bundle({
  entryPoint: path.join(root, 'src/index.ts'),
  publicDir: path.join(root, 'assets'),
});

const composition = await selectComposition({serveUrl, id: 'LosLadrones'});

for (const frame of frames) {
  const output = path.join(outDir, `f_${frame}.png`);
  await renderStill({composition, serveUrl, output, frame, imageFormat: 'png', overwrite: true});
  console.log('still', frame, '->', output);
}

// Limpia los temporales (copias del public dir) para no llenar el disco.
const tmp = os.tmpdir();
for (const d of readdirSync(tmp)) {
  if (d.startsWith('remotion-webpack-bundle-') || d.startsWith('remotion-v4')) {
    try {
      rmSync(path.join(tmp, d), {recursive: true, force: true});
    } catch {
      /* en uso, se ignora */
    }
  }
}
console.log('Listo (temporales limpiados).');
