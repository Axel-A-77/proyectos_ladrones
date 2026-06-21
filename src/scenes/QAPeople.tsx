import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {PersonBase, Outfit, Expression} from '../visual/People';

// Composición SOLO para QA: ver de cerca personajes y expresiones (no entra al video).
const CHARS: Array<[Outfit, string, Expression]> = [
  ['mayor', 'ALCALDE', 'smug'],
  ['governor', 'GOBERNADOR', 'greedy'],
  ['congress', 'CONGRESISTA', 'tired'],
  ['president', 'PRESIDENTE', 'smug'],
  ['auditor', 'EL AUDITOR', 'hopeful'],
];
const EXPR: Expression[] = ['neutral', 'sad', 'greedy', 'worried', 'smug', 'angry', 'hopeful', 'tired'];

export const QAPeople: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: COLORS.sun, alignItems: 'center', justifyContent: 'space-around', fontFamily: FONTS.display}}>
    <div style={{display: 'flex', gap: 44, alignItems: 'flex-end'}}>
      {CHARS.map(([o, l, e]) => (
        <div key={o} style={{textAlign: 'center'}}>
          <PersonBase outfit={o} expression={e} height={470} />
          <div style={{fontSize: 30, color: COLORS.ink, marginTop: 4}}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{display: 'flex', gap: 26, alignItems: 'flex-end'}}>
      {EXPR.map((e) => (
        <div key={e} style={{textAlign: 'center'}}>
          <PersonBase outfit="citizen" expression={e} height={230} />
          <div style={{fontSize: 22, color: COLORS.ink}}>{e}</div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
