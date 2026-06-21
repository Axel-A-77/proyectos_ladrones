import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {useReducedMotion} from '../lib/reducedMotion';

type ColorKey = keyof typeof COLORS;
type Dir = 'left' | 'right' | 'up' | 'down' | 'scale' | 'fade';

// Bocadillo "plano" (sin animación propia) — la entrada/salida la da FlowItem.
export const BubbleBox: React.FC<{text: React.ReactNode; tailX?: number; maxWidth?: number; fontSize?: number}> = ({
  text,
  tailX = 46,
  maxWidth = 470,
  fontSize = 34,
}) => (
  <div
    style={{
      position: 'relative',
      background: '#fff',
      border: `4px solid ${COLORS.ink}`,
      borderRadius: 22,
      padding: '15px 24px',
      fontFamily: FONTS.hand,
      fontWeight: 700,
      fontSize,
      lineHeight: 1.15,
      color: COLORS.ink,
      maxWidth,
      boxShadow: '5px 7px 0 rgba(21,18,13,0.18)',
    }}
  >
    {text}
    <div style={{position: 'absolute', left: tailX, bottom: -24, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `24px solid ${COLORS.ink}`}} />
    <div style={{position: 'absolute', left: tailX + 3, bottom: -15, width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderTop: '15px solid #fff'}} />
  </div>
);

// Texto LIBRE (sin cuadro), manuscrito, más grande — para palabras/frases.
export const FreeText: React.FC<{
  text: React.ReactNode;
  color?: ColorKey;
  fontSize?: number;
  rotate?: number;
  font?: 'hand' | 'display';
}> = ({text, color = 'ink', fontSize = 50, rotate = 0, font = 'hand'}) => (
  <div
    style={{
      fontFamily: font === 'display' ? FONTS.display : FONTS.hand,
      fontWeight: font === 'display' ? 400 : 700,
      fontSize,
      lineHeight: 1.1,
      color: COLORS[color],
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      whiteSpace: 'nowrap',
      textShadow: '0 2px 6px rgba(251,248,241,0.9)',
    }}
  >
    {text}
  </div>
);

// Etiqueta/cartel "plano" (sin animación propia).
export const TagBox: React.FC<{text: React.ReactNode; bg?: ColorKey; color?: ColorKey; rotate?: number; fontSize?: number}> = ({
  text,
  bg = 'gold',
  color = 'ink',
  rotate = -3,
  fontSize = 30,
}) => (
  <div
    style={{
      fontFamily: FONTS.poster,
      background: COLORS[bg],
      color: COLORS[color],
      fontSize,
      padding: '6px 16px',
      borderRadius: 9,
      border: `4px solid ${COLORS.ink}`,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '3px 5px 0 rgba(21,18,13,0.2)',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

// Elemento de FLUJO CONTINUO: aparece en `inAt` (frame) y SALE en `outAt`.
// Mientras no es visible, no se renderiza → las cosas entran y se van al ritmo de la voz.
// inAt/outAt en frames RELATIVOS a la escena.
export const FlowItem: React.FC<{
  inAt: number;
  outAt?: number;
  enter?: Dir;
  exit?: Dir;
  dist?: number;
  dur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({inAt, outAt, enter = 'scale', exit = 'fade', dist = 90, dur = 9, style, children}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();

  const opIn = interpolate(frame, [inAt, inAt + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const opOut = outAt == null ? 1 : interpolate(frame, [outAt, outAt + dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const opacity = Math.min(opIn, opOut);
  // No retornar null (eso causaba "fantasmas" por reconciliación de React);
  // mantenemos el nodo y lo ocultamos con opacidad/visibility.
  const hidden = opacity <= 0.002;

  let tx = 0;
  let ty = 0;
  let sc = 1;
  if (!reduced) {
    const ein = 1 - interpolate(frame, [inAt, inAt + dur + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (enter === 'scale') sc = interpolate(frame, [inAt, inAt + dur + 4], [0.5, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    else if (enter === 'left') tx = -ein * dist;
    else if (enter === 'right') tx = ein * dist;
    else if (enter === 'up') ty = -ein * dist;
    else if (enter === 'down') ty = ein * dist;

    if (outAt != null) {
      const eout = interpolate(frame, [outAt, outAt + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * dist;
      if (exit === 'left') tx -= eout;
      else if (exit === 'right') tx += eout;
      else if (exit === 'up') ty -= eout;
      else if (exit === 'down') ty += eout;
    }
  }

  return (
    <div style={{position: 'absolute', ...style, opacity, visibility: hidden ? 'hidden' : 'visible', isolation: 'isolate', transform: `translate(${tx}px, ${ty}px) scale(${sc}) translateZ(0)`}}>
      {children}
    </div>
  );
};

// Latido/flote sutil continuo para que un ancla (casa, personaje) nunca quede 100% quieta.
export const Idle: React.FC<{amp?: number; speed?: number; rot?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
  amp = 5,
  speed = 26,
  rot = 0,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const y = reduced ? 0 : Math.sin(frame / speed) * amp;
  const r = reduced ? 0 : Math.sin(frame / (speed * 1.4)) * rot;
  return <div style={{...style, transform: `translateY(${y}px) rotate(${r}deg)`}}>{children}</div>;
};
