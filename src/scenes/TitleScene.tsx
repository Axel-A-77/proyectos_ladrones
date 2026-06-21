import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {DrawPath} from '../effects/DrawPath';
import {FlowItem} from '../effects/flow';
import {PersonBase, Outfit, Expression} from '../visual/People';
import {useReducedMotion} from '../lib/reducedMotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// El "recorrido": los personajes que iremos viendo (mapa inicial de temas).
const CAST: Array<{outfit: Outfit; label: string; expr: Expression}> = [
  {outfit: 'mayor', label: 'ALCALDE', expr: 'smug'},
  {outfit: 'governor', label: 'GOBERNADOR', expr: 'greedy'},
  {outfit: 'congress', label: 'CONGRESISTA', expr: 'tired'},
  {outfit: 'president', label: 'PRESIDENTE', expr: 'smug'},
  {outfit: 'auditor', label: 'EL AUDITOR', expr: 'neutral'},
];

// 00_titulo — título + mapa del recorrido (aparición progresiva de la "galería").
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();

  const titleOpacity = reduced ? 1 : interpolate(frame, [0, 12], [0, 1], clamp);
  const titleY = reduced ? 0 : interpolate(frame, [0, 16], [22, 0], clamp);

  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <div style={{marginTop: 60, textAlign: 'center', opacity: titleOpacity, transform: `translateY(${titleY}px)`}}>
        <div style={{fontFamily: FONTS.hand, color: COLORS.ink, fontSize: 36, marginBottom: 4, opacity: 0.8}}>
          un comentario con humor (y verdad)
        </div>
        <div style={{fontFamily: FONTS.poster, color: COLORS.ink, fontSize: 88, lineHeight: 1.02, letterSpacing: 2}}>LOS LADRONES</div>
        <div style={{fontFamily: FONTS.poster, color: COLORS.red, fontSize: 88, lineHeight: 1.02, letterSpacing: 2}}>DE CUELLO Y CORBATA</div>
        <svg width={900} height={64} viewBox="0 0 900 64" style={{display: 'block', margin: '6px auto 0'}}>
          <DrawPath d="M30 36 C 240 60, 480 12, 660 34 S 840 56, 872 28" delay={reduced ? 0 : 14} duration={22} stroke={COLORS.gold} strokeWidth={12} />
        </svg>
      </div>

      {/* galería del recorrido — aparece uno por uno */}
      {CAST.map((c, i) => (
        <FlowItem key={i} inAt={26 + i * 11} enter="up" dist={40} style={{left: 215 + i * 330, top: 470}}>
          <PersonBase outfit={c.outfit} expression={c.expr} height={230} />
        </FlowItem>
      ))}
      {CAST.map((c, i) => (
        <FlowItem key={`l${i}`} inAt={30 + i * 11} enter="scale" style={{left: 215 + i * 330, top: 720, width: 200, textAlign: 'center'}}>
          <div style={{fontFamily: FONTS.display, color: i === 4 ? COLORS.green : COLORS.ink, fontSize: 30}}>{c.label}</div>
        </FlowItem>
      ))}
    </AbsoluteFill>
  );
};
