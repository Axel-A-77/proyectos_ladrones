import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useReducedMotion} from '../lib/reducedMotion';

// Efecto "aparecer": el elemento entra con un rebote suave (escala + fade).
// Con reduced-motion, simplemente aparece sin movimiento.
export const Appear: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reduced = useReducedMotion();

  if (reduced) {
    return <div style={style}>{children}</div>;
  }

  const s = spring({
    fps,
    frame: frame - delay,
    config: {damping: 11, mass: 0.7, stiffness: 130},
    durationInFrames: 28,
  });
  const scale = interpolate(s, [0, 1], [0.55, 1]);
  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return <div style={{...style, transform: `scale(${scale})`, opacity}}>{children}</div>;
};
