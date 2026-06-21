import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {DrawPath} from '../effects/DrawPath';
import {useReducedMotion} from '../lib/reducedMotion';

// 00_titulo — "Los ladrones de cuello y corbata".
// Muestra el efecto "se dibuja" (subrayado dorado trazado a mano).
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();

  const titleOpacity = reduced
    ? 1
    : interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const titleY = reduced
    ? 0
    : interpolate(frame, [0, 16], [26, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
      <div style={{opacity: titleOpacity, transform: `translateY(${titleY}px)`}}>
        <div
          style={{
            fontFamily: FONTS.hand,
            color: COLORS.ink,
            fontSize: 40,
            marginBottom: 6,
            opacity: 0.75,
          }}
        >
          un comentario con humor (y verdad)
        </div>
        <div
          style={{
            fontFamily: FONTS.poster,
            color: COLORS.ink,
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: 2,
          }}
        >
          LOS LADRONES
        </div>
        <div
          style={{
            fontFamily: FONTS.poster,
            color: COLORS.red,
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: 2,
          }}
        >
          DE CUELLO Y CORBATA
        </div>
      </div>

      {/* subrayado que se dibuja */}
      <svg width={1120} height={90} viewBox="0 0 1120 90" style={{marginTop: 10}}>
        <DrawPath
          d="M40 50 C 280 84, 560 14, 800 46 S 1050 76, 1085 38"
          delay={reduced ? 0 : 16}
          duration={26}
          stroke={COLORS.gold}
          strokeWidth={14}
        />
      </svg>
    </AbsoluteFill>
  );
};
