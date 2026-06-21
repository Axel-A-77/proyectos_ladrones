import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

export type Tone = 'sun' | 'cream' | 'dark';

// Fondo por tono. SIN negros (decisión del usuario): 'dark' cae a crema.
const TONE_BG: Record<Tone, string> = {
  sun: COLORS.sun, // amarillo cálido — comedia
  cream: COLORS.cream, // crema — descansos / momentos serios
  dark: COLORS.cream,
};

// Envoltorio de cada corte a animación: fondo según el tono y fundidos cortos
// de entrada/salida (transición suave, no corte seco). Cubre toda la pantalla.
export const Overlay: React.FC<{
  tone?: Tone;
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({tone = 'sun', durationInFrames, fadeIn = 10, fadeOut = 10, children}) => {
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
  const bg = TONE_BG[tone] ?? COLORS.sun;

  // Fondo plano del tono + degradado cálido muy sutil (centro un pelín más claro).
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{backgroundColor: bg}} />
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, ${COLORS.paper}66 0%, transparent 70%)`}} />
      {children}
    </AbsoluteFill>
  );
};
