import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {getCaptionAt} from '../lib/captions';
import {useReducedMotion} from '../lib/reducedMotion';

// Subtítulos constantes, sincronizados al .srt. Van encima de todo (papá y animación).
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reduced = useReducedMotion();
  const t = frame / fps;
  const cap = getCaptionAt(t);
  if (!cap) return null;

  const appear = reduced
    ? 1
    : interpolate(t, [cap.start, cap.start + 0.18], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <AbsoluteFill
      style={{justifyContent: 'flex-end', alignItems: 'center', padding: '0 11% 58px', pointerEvents: 'none'}}
    >
      <div
        style={{
          maxWidth: '78%',
          backgroundColor: 'rgba(21,18,13,0.84)',
          color: COLORS.white,
          fontFamily: FONTS.body,
          fontWeight: 800,
          fontSize: 46,
          lineHeight: 1.22,
          textAlign: 'center',
          padding: '12px 28px',
          borderRadius: 18,
          opacity: appear,
          boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {cap.text}
      </div>
    </AbsoluteFill>
  );
};
