import captionsData from '../data/captions.json';

export type Caption = {start: number; end: number; text: string};

export const CAPTIONS = captionsData as Caption[];

// Devuelve el subtítulo activo en un instante (segundos), o null.
export const getCaptionAt = (timeSec: number): Caption | null => {
  for (let i = CAPTIONS.length - 1; i >= 0; i--) {
    const c = CAPTIONS[i];
    if (timeSec >= c.start && timeSec < c.end) return c;
  }
  return null;
};
