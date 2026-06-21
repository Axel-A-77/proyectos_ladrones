import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {PersonBase, Outfit} from './People';
import {useReducedMotion} from '../lib/reducedMotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Medallón del capítulo activo (esquina superior derecha): busto del personaje + rótulo.
export const ChapterBadge: React.FC<{outfit: Outfit; label: string; at?: number}> = ({outfit, label, at = 8}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const op = reduced ? 1 : interpolate(frame, [at, at + 10], [0, 1], clamp);
  const sc = reduced ? 1 : interpolate(frame, [at, at + 12], [0.6, 1], clamp);
  return (
    <div style={{position: 'absolute', right: 56, top: 46, opacity: op, transform: `scale(${sc})`, transformOrigin: 'top right', textAlign: 'center'}}>
      <div
        style={{
          width: 124,
          height: 124,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `6px solid ${COLORS.ink}`,
          background: COLORS.paper,
          boxShadow: '3px 5px 0 rgba(21,18,13,0.18)',
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', left: '50%', top: 4, transform: 'translateX(-50%)'}}>
          <PersonBase outfit={outfit} expression="neutral" height={210} />
        </div>
      </div>
      <div style={{fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink, marginTop: 4, whiteSpace: 'nowrap'}}>{label}</div>
    </div>
  );
};
