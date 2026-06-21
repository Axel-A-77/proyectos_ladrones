import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {PersonBase, Outfit} from './People';
import {useReducedMotion} from '../lib/reducedMotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Medallón global del capítulo. Se fija al viewport, no al área interna de la lámina.
// Así queda realmente en la esquina superior derecha y nunca baja sobre paneles o títulos.
export const ChapterBadge: React.FC<{outfit: Outfit; label: string; at?: number}> = ({outfit, label, at = 8}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const op = reduced ? 1 : interpolate(frame, [at, at + 10], [0, 1], clamp);
  const sc = reduced ? 1 : interpolate(frame, [at, at + 12], [0.72, 1], clamp);

  return (
    <div
      style={{
        position: 'fixed',
        right: 14,
        top: 10,
        width: 150,
        opacity: op,
        transform: `scale(${sc})`,
        transformOrigin: 'top right',
        textAlign: 'center',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 104,
          height: 104,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `5px solid ${COLORS.ink}`,
          background: COLORS.paper,
          boxShadow: '3px 5px 0 rgba(21,18,13,0.18)',
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', left: '50%', top: 3, transform: 'translateX(-50%)'}}>
          <PersonBase outfit={outfit} expression="neutral" height={176} />
        </div>
      </div>
      <div
        style={{
          display: 'inline-block',
          maxWidth: 150,
          marginTop: 1,
          padding: '2px 6px 1px',
          borderRadius: 9,
          background: 'rgba(244,201,93,0.94)',
          fontFamily: FONTS.display,
          fontSize: label.length > 15 ? 15 : label.length > 11 ? 17 : 19,
          lineHeight: 0.95,
          color: COLORS.ink,
          overflowWrap: 'break-word',
        }}
      >
        {label}
      </div>
    </div>
  );
};
