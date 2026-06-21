import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {IlloScene, SceneImage} from './IlloScene';

type ColorKey = keyof typeof COLORS;

export type RotatePanel = {
  img: SceneImage;
  heading?: {text: string; color?: ColorKey};
  caption?: string;
};

// Rota entre varias ilustraciones dentro de un mismo tramo (sin volver a papá):
// el fondo del Overlay queda opaco todo el bloque y aquí solo se cruzan
// (crossfade) las imágenes. Para personajes que "rotan cada ~12s".
export const RotateScene: React.FC<{
  durationInFrames: number;
  panels: RotatePanel[];
  onDark?: boolean;
  crossfade?: number;
}> = ({durationInFrames, panels, onDark, crossfade = 16}) => {
  const frame = useCurrentFrame();
  const per = durationInFrames / panels.length;

  return (
    <AbsoluteFill>
      {panels.map((p, i) => {
        const start = i * per;
        const end = (i + 1) * per;
        const fadeIn =
          i === 0
            ? 1
            : interpolate(frame, [start, start + crossfade], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
        const fadeOut =
          i === panels.length - 1
            ? 1
            : interpolate(frame, [end - crossfade, end], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
        const opacity = Math.min(fadeIn, fadeOut);
        if (opacity <= 0.001) return null;
        return (
          <AbsoluteFill key={i} style={{opacity}}>
            <IlloScene
              images={[p.img]}
              heading={p.heading}
              caption={p.caption}
              onDark={onDark}
              animate={false}
            />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
