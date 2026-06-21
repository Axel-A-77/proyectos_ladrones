import wordsData from '../data/words.json';

export type Word = {word: string; start: number; end: number};
export const WORDS = wordsData as Word[];

const COMBINING = /[̀-ͯ]/g;
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING, '')
    .replace(/[^a-z0-9ñ ]/g, '')
    .trim();

// Momento (segundos) en que se dice una palabra, buscando desde `afterSec`.
// Match exacto primero, luego "contiene". null si no está (o si aún no hay words.json).
export const findWord = (query: string, afterSec = 0, beforeSec = Infinity): number | null => {
  const q = norm(query);
  if (!q) return null;
  for (const w of WORDS) {
    if (w.start >= afterSec && w.start <= beforeSec && norm(w.word) === q) return w.start;
  }
  for (const w of WORDS) {
    if (w.start >= afterSec && w.start <= beforeSec && norm(w.word).includes(q)) return w.start;
  }
  return null;
};

// Como findWord pero con respaldo (tiempo del SRT) si Whisper no lo encontró.
export const wordAt = (query: string, fallbackSec: number, afterSec = 0): number =>
  findWord(query, afterSec) ?? fallbackSec;
