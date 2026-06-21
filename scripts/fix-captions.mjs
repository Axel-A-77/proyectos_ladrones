// Corrige TYPOS de transcripción en captions.json usando el guion (no cambia tiempos).
// Cada fix verifica el texto actual antes de reemplazar (seguro).
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const p = path.join(process.cwd(), 'src/data/captions.json');
const caps = JSON.parse(readFileSync(p, 'utf8'));

const fixes = [
  [63, 'con la tocino camuflado, donde el', 'con latrocinio camuflado, donde el'],
  [73, 'como si lo hubiera construido y tu Santo', 'como si la hubiera construido el Espíritu Santo'],
  [93, 'incondicional testaferro y que el', 'proveedor de confianza, y que el'],
  [116, 'hasta la paciencia del ciudadano. 1', 'hasta la paciencia del ciudadano. Uno'],
  [205, 'uh errores administrativos nunca dice.', 'hubo errores administrativos. Nunca dice.'],
  [210, 'y jamás dice Manrique, sí', 'y jamás dice «me enriquecí»,'],
  [237, 'cartel que diga gestion km.', 'cartel que diga «Gestión que cumple».'],
  [263, 'fueran espías de la caja b.', 'fueran espías de la KGB.'],
  [273, 'esfuerzo y 1 no puede negar', 'esfuerzo, y uno no puede negar'],
  [286, '1 toque del contrato, otro toque', 'uno toca el contrato, otro toca'],
  [288, 'otro toque del silencio y al', 'otro toca el silencio, y al'],
  [305, 'no tiene la justicia. Teme al', 'no teme a la justicia. Teme al'],
  [331, 'la justicia se desbordará y que la', 'la justicia se demorará y que la'],
  [338, 'cuánto costó la quisiera. Ya nos', 'cuánto costó la tijera. Ya no se'],
  [365, 'linterna enlace. Excel avanzado,', 'linterna, Excel avanzado,'],
  [375, 'estrella. Feliz día, gracias.', 'ángel guardián. Feliz día, gracias.'],
];

let ok = 0;
let bad = 0;
for (const [i, oldT, newT] of fixes) {
  if (!caps[i]) {
    console.log('MISS idx', i, '(no existe)');
    bad++;
    continue;
  }
  if (caps[i].text !== oldT) {
    console.log('MISMATCH idx', i, '\n  esperado:', JSON.stringify(oldT), '\n  actual:  ', JSON.stringify(caps[i].text));
    bad++;
    continue;
  }
  caps[i].text = newT;
  ok++;
}

if (bad === 0) {
  writeFileSync(p, JSON.stringify(caps));
  console.log(`OK: ${ok} subtítulos corregidos -> ${p}`);
} else {
  console.log(`ABORTADO: ${bad} discrepancias, ${ok} habrían pasado. No se escribió nada.`);
  process.exit(1);
}
