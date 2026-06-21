// QA de línea de tiempo: orden, from<to, huecos, dentro de duración, escenas
// registradas, duración por tipo. (El "contenido desde frame 0" lo valida qa:stills.)
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const segTxt = readFileSync(resolve(root, 'src/segments.ts'), 'utf8');
const allTxt = readFileSync(resolve(root, 'src/scenes/all.tsx'), 'utf8');
const caps = JSON.parse(readFileSync(resolve(root, 'src/data/captions.json'), 'utf8'));

const evalTime = (expr) => {
  expr = expr.trim();
  const m = expr.match(/^t\(\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (m) return +m[1] * 60 + +m[2];
  const n = parseFloat(expr);
  return Number.isNaN(n) ? null : n;
};

const body = segTxt.slice(segTxt.indexOf('export const SEGMENTS'));
const objs = [...body.matchAll(/\{[^{}]*\}/g)].map((m) => m[0]);
const segs = [];
for (const o of objs) {
  const id = (o.match(/id:\s*'([^']+)'/) || [])[1];
  const kind = (o.match(/kind:\s*'([^']+)'/) || [])[1];
  const scene = (o.match(/scene:\s*'([^']+)'/) || [])[1];
  const fromM = o.match(/from:\s*(t\(\s*\d+\s*,\s*\d+\s*\)|[\d.]+)/);
  const toM = o.match(/to:\s*(t\(\s*\d+\s*,\s*\d+\s*\)|[\d.]+)/);
  if (!id || !kind || !fromM || !toM) continue;
  segs.push({id, kind, scene, from: evalTime(fromM[1]), to: evalTime(toM[1])});
}

// claves registradas en SCENES
const scBlock = allTxt.slice(allTxt.indexOf('export const SCENES'));
const sceneKeys = new Set([...scBlock.matchAll(/^\s*'?([\w]+)'?:\s*\w+,/gm)].map((m) => m[1]));

const totalDur = caps[caps.length - 1].end + 1.2;
let errors = 0;
const lines = [];
const note = (s) => lines.push(s);
note('# QA de línea de tiempo\n');
note(`- Segmentos: **${segs.length}** | duración total ~${totalDur.toFixed(1)}s\n`);

for (let i = 0; i < segs.length; i++) {
  const s = segs[i];
  if (s.from == null || s.to == null) {
    note(`- ERROR ${s.id}: from/to no numérico`);
    errors++;
    continue;
  }
  if (s.from >= s.to) {
    note(`- ERROR ${s.id}: from >= to (${s.from}->${s.to})`);
    errors++;
  }
  if (i > 0 && s.from < segs[i - 1].from) {
    note(`- ERROR ${s.id}: desordenado`);
    errors++;
  }
  if (i > 0) {
    const gap = s.from - segs[i - 1].to;
    if (gap > 0.1) {
      note(`- HUECO ${segs[i - 1].id} → ${s.id}: ${gap.toFixed(2)}s`);
      errors++;
    }
  }
  if (s.to > totalDur + 0.5) {
    note(`- ERROR ${s.id}: termina (${s.to}) tras la duración (${totalDur.toFixed(1)})`);
    errors++;
  }
  if (s.kind !== 'PAPA' && s.scene && !sceneKeys.has(s.scene)) {
    note(`- ERROR ${s.id}: escena '${s.scene}' no registrada en SCENES`);
    errors++;
  }
}

const byKind = {};
for (const s of segs) byKind[s.kind] = (byKind[s.kind] || 0) + ((s.to ?? 0) - (s.from ?? 0));
note('\n## Duración por tipo:');
for (const [k, v] of Object.entries(byKind)) note(`- ${k}: ${v.toFixed(1)}s`);
note(`\n> El "contenido visible desde frame 0" de cada ANIM se valida en qa:stills (detección de frame casi vacío).`);

mkdirSync(resolve(root, 'docs'), {recursive: true});
writeFileSync(resolve(root, 'docs/TIMELINE_QA.md'), lines.join('\n') + '\n');
console.log(`timeline: ${segs.length} segmentos | errores ${errors}`);
console.log('-> docs/TIMELINE_QA.md');
if (errors > 0) process.exit(1);
