// Quita el fondo (cuadrícula de transparencia horneada) de las ilustraciones.
// Estrategia: flood-fill desde los bordes sobre píxeles claros; se detiene en los
// contornos negros del doodle, así respeta los interiores claros (camisas, etc.).
// Hace backup de los originales en masters/ilustraciones_raw y sobrescribe los PNG.
//   node scripts/key-illustrations.mjs
import {PNG} from 'pngjs';
import {readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, existsSync} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dir = path.join(root, 'assets/ilustraciones');
const backup = path.join(root, 'masters/ilustraciones_raw');
mkdirSync(backup, {recursive: true});

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

for (const file of readdirSync(dir)) {
  if (!file.toLowerCase().endsWith('.png')) continue;
  const fp = path.join(dir, file);
  const bp = path.join(backup, file);
  if (!existsSync(bp)) copyFileSync(fp, bp);

  const png = PNG.sync.read(readFileSync(fp));
  const {width: w, height: h, data} = png; // siempre RGBA
  const idx = (x, y) => (y * w + x) * 4;

  // Semillas: píxeles del borde que parecen fondo claro (o ya transparente).
  const seedLight = (x, y) => {
    const i = idx(x, y);
    if (data[i + 3] < 10) return true;
    return lum(data[i], data[i + 1], data[i + 2]) > 150;
  };
  const seeds = [];
  for (let x = 0; x < w; x++) {
    if (seedLight(x, 0)) seeds.push([x, 0]);
    if (seedLight(x, h - 1)) seeds.push([x, h - 1]);
  }
  for (let y = 0; y < h; y++) {
    if (seedLight(0, y)) seeds.push([0, y]);
    if (seedLight(w - 1, y)) seeds.push([w - 1, y]);
  }
  if (seeds.length === 0) {
    console.log(file, '- bordes no claros, saltado');
    continue;
  }

  // Umbral a partir del cuadro de cuadrícula más oscuro visto en el borde.
  let bgMin = 255;
  for (const [x, y] of seeds) {
    const i = idx(x, y);
    if (data[i + 3] >= 10) bgMin = Math.min(bgMin, lum(data[i], data[i + 1], data[i + 2]));
  }
  const T = Math.max(150, bgMin - 28);

  const visited = new Uint8Array(w * h);
  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);
  let head = 0;
  let tail = 0;
  const push = (x, y) => {
    const p = y * w + x;
    if (visited[p]) return;
    visited[p] = 1;
    qx[tail] = x;
    qy[tail] = y;
    tail++;
  };
  const isBg = (x, y) => {
    const i = idx(x, y);
    if (data[i + 3] < 10) return true;
    return lum(data[i], data[i + 1], data[i + 2]) >= T;
  };
  for (const [x, y] of seeds) push(x, y);
  while (head < tail) {
    const x = qx[head];
    const y = qy[head];
    head++;
    data[idx(x, y) + 3] = 0; // transparente
    if (x > 0 && isBg(x - 1, y)) push(x - 1, y);
    if (x < w - 1 && isBg(x + 1, y)) push(x + 1, y);
    if (y > 0 && isBg(x, y - 1)) push(x, y - 1);
    if (y < h - 1 && isBg(x, y + 1)) push(x, y + 1);
  }

  writeFileSync(fp, PNG.sync.write(png));
  console.log(`${file} - ok (T=${T.toFixed(0)}, recortados=${tail})`);
}
console.log('Listo.');
