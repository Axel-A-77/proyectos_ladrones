import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {useReducedMotion} from '../lib/reducedMotion';

// Efecto "se dibuja": traza un path SVG como dibujado a mano.
// Usa pathLength=1 para no tener que medir la longitud real del trazo.
type Props = {
  d: string;
  delay?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
} & Omit<React.SVGProps<SVGPathElement>, 'd' | 'stroke' | 'fill' | 'strokeWidth'>;

export const DrawPath: React.FC<Props> = ({
  d,
  delay = 0,
  duration = 30,
  stroke = COLORS.ink,
  strokeWidth = 10,
  fill = 'none',
  ...rest
}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const progress = reduced
    ? 1
    : interpolate(frame - delay, [0, duration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <path
      d={d}
      pathLength={1}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
      {...rest}
    />
  );
};
