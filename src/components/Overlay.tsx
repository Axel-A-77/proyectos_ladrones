import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

export type Tone = 'sun' | 'cream' | 'dark';

// Todas las escenas ilustradas comparten el mismo lienzo exterior amarillo.
// El tono se conserva en el modelo de datos por compatibilidad, pero las variaciones
// serias o cómicas deben construirse con paneles internos, no cambiando el fondo global.
export const Overlay: React.FC<{
  tone?: Tone;
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({durationInFrames, fadeIn = 10, fadeOut = 10, children}) => {
  const frame = useCurrentFrame();
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

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.sun, opacity: Math.min(opIn, opOut)}}>
      {children}
    </AbsoluteFill>
  );
};
