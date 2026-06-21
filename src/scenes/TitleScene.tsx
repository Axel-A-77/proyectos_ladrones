import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {FlowItem} from '../effects/flow';
import {PersonBase, Outfit, Expression} from '../visual/People';
import {useReducedMotion} from '../lib/reducedMotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const CAST: Array<{outfit: Outfit; label: string; expr: Expression; color: string}> = [
  {outfit: 'mayor', label: 'ALCALDE', expr: 'smug', color: COLORS.orange},
  {outfit: 'governor', label: 'GOBERNADOR', expr: 'greedy', color: COLORS.purple},
  {outfit: 'congress', label: 'CONGRESISTA', expr: 'tired', color: COLORS.blue},
  {outfit: 'president', label: 'PRESIDENTE', expr: 'smug', color: COLORS.red},
  {outfit: 'auditor', label: 'AUDITOR', expr: 'hopeful', color: COLORS.green},
];

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const opacity = reduced ? 1 : interpolate(frame, [0, 12], [0, 1], clamp);
  const y = reduced ? 0 : interpolate(frame, [0, 16], [22, 0], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.sun, alignItems: 'center'}}>
      <div style={{marginTop: 42, textAlign: 'center', opacity, transform: `translateY(${y}px)`}}>
        <div style={{fontFamily: FONTS.hand, color: COLORS.ink, fontSize: 34}}>una reflexion con humor y memoria</div>
        <div style={{fontFamily: FONTS.poster, color: COLORS.ink, fontSize: 86, lineHeight: 1}}>LOS LADRONES</div>
        <div style={{fontFamily: FONTS.poster, color: COLORS.red, fontSize: 82, lineHeight: 1}}>DE CUELLO Y CORBATA</div>
      </div>

      <svg width="1600" height="160" viewBox="0 0 1600 160" style={{position: 'absolute', left: 160, top: 405}}>
        <path d="M90 90 C 380 10, 550 150, 800 75 C 1050 0, 1220 145, 1510 70" fill="none" stroke={COLORS.ink} strokeWidth="9" strokeLinecap="round" strokeDasharray="18 16" />
      </svg>

      {CAST.map((c, i) => (
        <FlowItem key={c.label} inAt={22 + i * 10} enter="up" dist={36} style={{left: 160 + i * 330, top: 470}}>
          <div style={{width: 250, height: 365, borderRadius: 28, background: COLORS.paper, border: `7px solid ${COLORS.ink}`, boxShadow: '7px 9px 0 rgba(21,18,13,.15)', position: 'relative'}}>
            <div style={{position: 'absolute', left: 58, top: 24}}><PersonBase outfit={c.outfit} expression={c.expr} height={245} /></div>
            <div style={{position: 'absolute', right: 16, top: 16, width: 50, height: 50, borderRadius: '50%', background: c.color, border: `5px solid ${COLORS.ink}`}} />
            <div style={{position: 'absolute', left: 12, right: 12, bottom: 22, textAlign: 'center', fontFamily: FONTS.display, color: c.outfit === 'auditor' ? COLORS.green : COLORS.ink, fontSize: 29}}>{c.label}</div>
          </div>
        </FlowItem>
      ))}
    </AbsoluteFill>
  );
};
