import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

export type Tone = 'cream' | 'dark';

// Envoltorio de cada corte a animación: fondo según el tono y fundidos cortos
// de entrada/salida (transición suave, no corte seco). Cubre toda la pantalla.
export const Overlay: React.FC<{
  tone?: Tone;
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({tone = 'cream', durationInFrames, fadeIn = 10, fadeOut = 10, children}) => {
  const frame = useCurrentFrame();
  // fadeIn/fadeOut = 0 => sin fundido (el título arranca opaco; entre animaciones
  // contiguas la saliente no se desvanece, la entrante la cubre solapada).
  const opIn =
    fadeIn <= 0
      ? 1
      : interpolate(frame, [0, fadeIn], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const opOut =
    fadeOut <= 0
      ? 1
      : interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const opacity = Math.min(opIn, opOut);
  // Por ahora TODAS las escenas en crema (sin fondos negros).
  const backgroundColor = COLORS.cream;

  return <AbsoluteFill style={{backgroundColor, opacity}}>{children}</AbsoluteFill>;
};
