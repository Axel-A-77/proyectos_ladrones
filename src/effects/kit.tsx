import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {DrawPath} from './DrawPath';
import {useReducedMotion} from '../lib/reducedMotion';

type ColorKey = keyof typeof COLORS;
export const ill = (f: string) => staticFile('ilustraciones/' + f);

// Rebote tipo back.out: spring con sobre-impulso. Opcional deslizar desde un lado.
export const Pop: React.FC<{
  at?: number;
  slide?: 'left' | 'right' | 'top' | 'bottom';
  dist?: number;
  scaleFrom?: number;
  durationInFrames?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at = 0, slide, dist = 70, scaleFrom = 0.4, durationInFrames = 18, style, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reduced = useReducedMotion();
  if (reduced) return <div style={style}>{children}</div>;

  // Pop snappy: entra JUSTO en `at` (invisible antes) y asienta rápido (back.out).
  const s = spring({fps, frame: frame - at, durationInFrames, config: {damping: 12, mass: 0.6, stiffness: 180}});
  const opacity = interpolate(frame - at, [0, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let tx = 0;
  let ty = 0;
  let scale = 1;
  if (slide) {
    const d = interpolate(s, [0, 1], [dist, 0]);
    if (slide === 'left') tx = -d;
    else if (slide === 'right') tx = d;
    else if (slide === 'top') ty = -d;
    else ty = d;
  } else {
    scale = interpolate(s, [0, 1], [scaleFrom, 1]);
  }
  return <div style={{...style, transform: `translate(${tx}px, ${ty}px) scale(${scale})`, opacity}}>{children}</div>;
};

// Flote vertical continuo (vida sutil; nada queda quieto).
export const FloatY: React.FC<{amp?: number; speed?: number; phase?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
  amp = 8,
  speed = 18,
  phase = 0,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const y = reduced ? 0 : Math.sin(frame / speed + phase) * amp;
  return <div style={{...style, transform: `translateY(${y}px)`}}>{children}</div>;
};

// Zoom/paneo lento (Ken Burns) sobre la vida del plano.
export const KenBurns: React.FC<{
  src: string;
  durationInFrames: number;
  from?: number;
  to?: number;
  panX?: number;
  panY?: number;
  style?: React.CSSProperties;
}> = ({src, durationInFrames, from = 1.0, to = 1.12, panX = 0, panY = 0, style}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const p = reduced ? 0 : interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = interpolate(p, [0, 1], [from, to]);
  const tx = interpolate(p, [0, 1], [0, panX]);
  const ty = interpolate(p, [0, 1], [0, panY]);
  return <Img src={src} style={{...style, transform: `scale(${scale}) translate(${tx}px, ${ty}px)`}} />;
};

// Personaje (PNG): aparece con rebote y flota. Posición vía `style` (absolute).
export const Actor: React.FC<{
  src: string;
  height: number;
  at?: number;
  float?: boolean;
  floatAmp?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}> = ({src, height, at = 0, float = false, floatAmp = 9, flip = false, style}) => {
  const img = (
    <Img src={src} style={{height, objectFit: 'contain', transform: flip ? 'scaleX(-1)' : undefined}} />
  );
  return (
    <div style={{position: 'absolute', ...style}}>
      <Pop at={at}>{float ? <FloatY amp={floatAmp} speed={24}>{img}</FloatY> : img}</Pop>
    </div>
  );
};

// Objeto/ilustración (PNG): aparece con rebote (o desliza), opcional flote. Posición vía `style`.
export const Prop: React.FC<{
  src: string;
  height: number;
  at?: number;
  slide?: 'left' | 'right' | 'top' | 'bottom';
  float?: boolean;
  floatAmp?: number;
  style?: React.CSSProperties;
}> = ({src, height, at = 0, slide, float = false, floatAmp = 6, style}) => {
  const img = <Img src={src} style={{height, objectFit: 'contain'}} />;
  return (
    <div style={{position: 'absolute', ...style}}>
      <Pop at={at} slide={slide}>{float ? <FloatY amp={floatAmp}>{img}</FloatY> : img}</Pop>
    </div>
  );
};

// Bocadillo de cómic con cola hacia abajo (se coloca ENCIMA del personaje).
export const Bubble: React.FC<{
  at?: number;
  text: React.ReactNode;
  maxWidth?: number;
  tailX?: number; // px desde la izquierda del globo donde apunta la cola
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({at = 0, text, maxWidth = 460, tailX = 46, fontSize = 34, style}) => (
  <Pop at={at} style={{position: 'absolute', ...style}}>
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
      <div
        style={{position: 'absolute', left: tailX, bottom: -24, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `24px solid ${COLORS.ink}`}}
      />
      <div
        style={{position: 'absolute', left: tailX + 3, bottom: -15, width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderTop: '15px solid #fff'}}
      />
    </div>
  </Pop>
);

// Rótulo de rol (EL ALCALDE) con subrayado dorado que se dibuja.
// Rótulo de rol (EL ALCALDE…) TRANSITORIO: entra, se lee ~1.5-2s y se va.
export const RoleTitle: React.FC<{
  at?: number;
  text: string;
  width?: number;
  hold?: number;
  style?: React.CSSProperties;
}> = ({at = 0, text, width = 460, hold = 48, style}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const out = reduced
    ? 1
    : interpolate(frame, [at + hold, at + hold + 14], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', opacity: out, ...style}}>
      <Pop at={at} slide="left" dist={60}>
        <div style={{fontFamily: FONTS.poster, fontSize: 60, letterSpacing: 1, color: COLORS.ink}}>{text}</div>
      </Pop>
      <svg width={width} height={26} viewBox={`0 0 ${width} 26`} style={{display: 'block', marginTop: 4}}>
        <DrawPath d={`M6 16 C ${width * 0.3} 26, ${width * 0.6} 4, ${width - 8} 16`} delay={at + 8} duration={20} stroke={COLORS.gold} strokeWidth={10} />
      </svg>
    </div>
  );
};

// Etiqueta/cartel pequeño con rebote.
export const Chip: React.FC<{
  at?: number;
  text: React.ReactNode;
  bg?: ColorKey;
  color?: ColorKey;
  rotate?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({at = 0, text, bg = 'gold', color = 'ink', rotate = -3, fontSize = 30, style}) => (
  <Pop at={at} style={{position: 'absolute', ...style}}>
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
  </Pop>
);

// Destellos que titilan.
export const Sparkles: React.FC<{points: Array<{x: number; y: number; size?: number; delay?: number}>; color?: ColorKey}> = ({points, color = 'gold'}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  return (
    <>
      {points.map((p, i) => {
        const ph = reduced ? 0.8 : (Math.sin((frame - (p.delay ?? i * 7)) / 9) + 1) / 2;
        const size = (p.size ?? 26) * (0.6 + ph * 0.7);
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" style={{position: 'absolute', left: p.x, top: p.y, opacity: 0.4 + ph * 0.6, transform: `rotate(${ph * 40}deg)`}}>
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={COLORS[color]} stroke={COLORS.ink} strokeWidth={1.5} />
          </svg>
        );
      })}
    </>
  );
};

// Sub-escena (beat) con fundido de entrada/salida, sobre el fondo del Overlay.
export const Beat: React.FC<{durationInFrames: number; fade?: number; children: React.ReactNode}> = ({durationInFrames, fade = 8, children}) => {
  const frame = useCurrentFrame();
  const op = Math.min(
    interpolate(frame, [0, fade], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(frame, [durationInFrames - fade, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  return <AbsoluteFill style={{opacity: op}}>{children}</AbsoluteFill>;
};

// Texto manuscrito que entra y, opcionalmente, se TACHA (línea roja que cruza).
export const StrikeText: React.FC<{
  text: string;
  at?: number;
  strikeAt?: number;
  color?: ColorKey;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({text, at = 0, strikeAt, color = 'ink', fontSize = 52, style}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const strikeW = strikeAt == null ? 0 : reduced ? 100 : interpolate(frame - strikeAt, [0, 12], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Pop at={at} slide="left" dist={30} style={{position: 'absolute', ...style}}>
      <div style={{position: 'relative', display: 'inline-block', fontFamily: FONTS.hand, fontWeight: 700, fontSize, color: COLORS[color], whiteSpace: 'nowrap'}}>
        {text}
        <div style={{position: 'absolute', left: -4, top: '54%', height: 8, width: strikeW <= 0 ? 0 : `calc(${strikeW}% + 8px)`, background: COLORS.red, borderRadius: 5, opacity: strikeW <= 0 ? 0 : 1}} />
      </div>
    </Pop>
  );
};

// Una frase que se dice, se tacha, y aparece otra debajo (estilo "eufemismo").
export const PhraseSwap: React.FC<{
  from: string;
  to: string;
  at?: number;
  strikeAt: number;
  toAt: number;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({from, to, at = 0, strikeAt, toAt, fontSize = 50, style}) => (
  <div style={{position: 'absolute', ...style}}>
    <StrikeText text={from} at={at} strikeAt={strikeAt} color="ink" fontSize={fontSize} />
    <StrikeText text={to} at={toAt} color="green" fontSize={fontSize} style={{top: fontSize + 22}} />
  </div>
);

// Titular cinético: las palabras entran una a una con rebote.
export const WordsIn: React.FC<{
  text: string;
  at?: number;
  gap?: number;
  fontSize?: number;
  color?: ColorKey;
  style?: React.CSSProperties;
}> = ({text, at = 0, gap = 4, fontSize = 60, color = 'ink', style}) => (
  <div style={{position: 'absolute', display: 'flex', flexWrap: 'wrap', columnGap: '0.28em', rowGap: 6, ...style}}>
    {text.split(' ').map((w, i) => (
      <Pop key={i} at={at + i * gap}>
        <span style={{fontFamily: FONTS.display, fontSize, color: COLORS[color], lineHeight: 1.05}}>{w}</span>
      </Pop>
    ))}
  </div>
);

// Lluvia de "$" (partículas en código) — para "el dinero desaparece/llueve".
export const MoneyRain: React.FC<{count?: number; width: number; height: number; speed?: number; color?: ColorKey}> = ({
  count = 14,
  width,
  height,
  speed = 2.2,
  color = 'green',
}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', width, height}}>
      {Array.from({length: count}).map((_, i) => {
        const x = ((i * 137.5) % 100) / 100 * width;
        const phase = (i * 53) % 100;
        const yRaw = reduced ? phase / 100 * height : (((frame * speed + phase * 4) % (height + 80)) - 40);
        const rot = (frame * (2 + (i % 3)) + i * 40) % 360;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: yRaw, fontFamily: FONTS.poster, fontSize: 34 + (i % 3) * 8, color: COLORS[color], transform: `rotate(${rot}deg)`, textShadow: `2px 2px 0 ${COLORS.ink}`}}>
            $
          </div>
        );
      })}
    </div>
  );
};
