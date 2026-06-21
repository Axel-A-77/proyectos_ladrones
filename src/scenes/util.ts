import {findWord} from '../lib/words';

// Frame (relativo a la escena) en que se dice una palabra clave.
// Usa Whisper (words.json) pero acepta su tiempo SOLO si cae cerca del tiempo
// esperado del SRT (evita coincidencias de la misma palabra en otra parte del audio).
// Si no la encuentra o cae lejos, usa el fallback del SRT.
export const beatAt = (
  kw: string,
  fallbackSec: number,
  fromSec: number,
  fps: number,
  drift = 6,
  after?: number
): number => {
  const found = findWord(kw, after ?? fromSec - 3);
  const sec = found != null && Math.abs(found - fallbackSec) <= drift ? found : fallbackSec;
  return Math.max(0, Math.round((sec - fromSec) * fps));
};
