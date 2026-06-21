// Convierte el SRT CORREGIDO -> src/data/captions.json (tiempos en segundos).
// FUENTE MAESTRA: subtitulos_corregidos.srt (NO subtitulos_original.srt).
// Edita correcciones en subtitulos_corregidos.srt y re-corre: npm run captions
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const corrected = resolve(root, 'subtitulos_corregidos.srt');
// Por seguridad: si no existe el corregido, NO usar el original (evita reintroducir typos).
if (!existsSync(corrected)) {
  console.error('FALTA subtitulos_corregidos.srt — no se regeneran captions para no reintroducir errores.');
  process.exit(1);
}
const srtPath = corrected;
const outPath = resolve(root, 'src/data/captions.json');

const toSec = (t) => {
  const m = t.trim().match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/);
  if (!m) return null;
  const [, h, mi, s, ms] = m;
  return +h * 3600 + +mi * 60 + +s + +ms / 1000;
};

const raw = readFileSync(srtPath, 'utf8').replace(/\r\n?/g, '\n');
const blocks = raw.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

const cues = [];
for (const block of blocks) {
  const lines = block.split('\n');
  const tcIdx = lines.findIndex((l) => l.includes('-->'));
  if (tcIdx < 0) continue;
  const [a, b] = lines[tcIdx].split('-->');
  const start = toSec(a);
  const end = toSec(b);
  const text = lines.slice(tcIdx + 1).join(' ').replace(/\s+/g, ' ').trim();
  if (start == null || end == null || !text) continue;
  cues.push({start, end, text});
}

mkdirSync(dirname(outPath), {recursive: true});
writeFileSync(outPath, JSON.stringify(cues));
console.log(`OK: ${cues.length} subtitulos -> ${outPath}`);
