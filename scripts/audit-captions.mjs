// QA de subtítulos: orden, solapes, duración, CPS, cues largos, espacios, líneas.
// Escribe docs/CAPTIONS_QA.md. Sale != 0 si hay errores duros.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const caps = JSON.parse(readFileSync(resolve(root, 'src/data/captions.json'), 'utf8'));

let errors = 0;
const lines = [];
const note = (s) => lines.push(s);

let overlaps = 0;
let highCps = 0;
let longCues = 0;
let dblSpace = 0;
let badPunct = 0;
const highCpsList = [];

for (let i = 0; i < caps.length; i++) {
  const c = caps[i];
  const dur = c.end - c.start;
  if (dur <= 0) {
    note(`- ERROR cue ${i + 1}: duración <= 0 (${c.text.slice(0, 40)})`);
    errors++;
  }
  if (i > 0 && c.start < caps[i - 1].start - 0.001) {
    note(`- ERROR cue ${i + 1}: desordenado`);
    errors++;
  }
  if (i > 0 && c.start < caps[i - 1].end - 0.06) {
    overlaps++;
  }
  const cps = c.text.length / Math.max(dur, 0.1);
  if (cps > 22) {
    highCps++;
    if (cps > 27) highCpsList.push(`  - cue ${i + 1} (${cps.toFixed(1)} CPS): "${c.text}"`);
  }
  if (dur > 7) longCues++;
  if (/\s{2,}/.test(c.text)) dblSpace++;
  if (/\s[,.;:]/.test(c.text)) badPunct++;
}

const lastEnd = caps[caps.length - 1].end;

note(`# QA de subtítulos (captions.json)\n`);
note(`Fuente maestra: subtitulos_corregidos.srt → captions.json\n`);
note(`- Total de cues: **${caps.length}**`);
note(`- Último cue termina en: ${lastEnd.toFixed(1)}s`);
note(`- Solapes (>0.06s): ${overlaps}`);
note(`- Cues con CPS alto (>22): ${highCps}`);
note(`- Cues muy largos (>7s): ${longCues}`);
note(`- Cues con espacios dobles: ${dblSpace}`);
note(`- Cues con espacio antes de signo: ${badPunct}`);
note(`- Errores duros (orden/duración): ${errors}`);
if (highCpsList.length) {
  note(`\n## Cues con CPS muy alto (>27) a revisar:`);
  highCpsList.forEach((l) => note(l));
}

mkdirSync(resolve(root, 'docs'), {recursive: true});
writeFileSync(resolve(root, 'docs/CAPTIONS_QA.md'), lines.join('\n') + '\n');
console.log(`captions: ${caps.length} cues | solapes ${overlaps} | CPS>22 ${highCps} | largos ${longCues} | errores ${errors}`);
console.log('-> docs/CAPTIONS_QA.md');
if (errors > 0) process.exit(1);
