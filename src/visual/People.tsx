import React from 'react';
import {COLORS} from '../theme';

// Sistema de personajes ORIGINAL en SVG (un solo estilo doodle, consistente).
// Contorno negro grueso, colores planos, cabeza grande caricaturesca.
const INK = COLORS.ink;

export type Expression =
  | 'neutral'
  | 'sad'
  | 'greedy'
  | 'worried'
  | 'smug'
  | 'angry'
  | 'hopeful'
  | 'tired';

export type Outfit =
  | 'citizen'
  | 'suit'
  | 'mayor'
  | 'governor'
  | 'congress'
  | 'president'
  | 'auditor'
  | 'father';

export type ArmPose = 'down' | 'chest' | 'up' | 'wave';

type OutfitCfg = {
  body: string;
  tie?: string;
  sash?: string; // banda diagonal (alcalde/gobernador/presidente)
  sashEdge?: string;
  glasses?: boolean;
  hat?: boolean;
  hair: string;
};

const OUTFITS: Record<Outfit, OutfitCfg> = {
  citizen: {body: '#5AA6D8', hair: '#3a2a1a'},
  suit: {body: '#28324c', tie: COLORS.red, hair: '#241a12'},
  mayor: {body: '#2c3040', tie: COLORS.red, sash: COLORS.gold, sashEdge: '#b98a04', hair: '#241a12'},
  governor: {body: '#202840', tie: COLORS.gold, sash: COLORS.red, sashEdge: '#a8281c', hair: '#2a2018'},
  congress: {body: '#34394c', tie: '#5AA6D8', hair: '#9a917f'},
  president: {body: '#1c2438', tie: COLORS.red, sash: COLORS.red, sashEdge: '#a8281c', hair: '#241a12'},
  auditor: {body: '#2f9e5a', tie: '#28324c', glasses: true, hair: '#3a2a1a'},
  father: {body: COLORS.orange, hair: '#3a2a1a'},
};

// Rasgos faciales por expresión (ojos + cejas + boca), centrados ~ (110,92).
const Face: React.FC<{e: Expression}> = ({e}) => {
  const eye = (cx: number, cy = 90, r = 7) => <circle cx={cx} cy={cy} r={r} fill={INK} />;
  switch (e) {
    case 'sad':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
          {eye(88)}
          {eye(132)}
          <path d="M78 76 q10 -8 20 -2" />
          <path d="M122 74 q10 -6 20 2" />
          <path d="M96 120 q14 -12 28 0" />
        </g>
      );
    case 'greedy':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round">
          <path d="M80 86 l16 8 l-16 8" fill="none" />
          <path d="M140 86 l-16 8 l16 8" fill="none" />
          <path d="M86 114 q24 18 48 0 q-24 6 -48 0 Z" fill="#fff" />
        </g>
      );
    case 'worried':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
          {eye(88, 90, 8)}
          {eye(132, 90, 8)}
          <path d="M76 72 q12 -8 22 -2" />
          <path d="M124 70 q10 -6 22 2" />
          <ellipse cx={110} cy={120} rx={12} ry={9} fill="#fff" />
          <path d="M150 96 q10 12 0 22" stroke="#5AA6D8" strokeWidth={5} />
        </g>
      );
    case 'smug':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
          <path d="M80 90 q8 -6 18 0" />
          <path d="M124 90 q8 -6 18 0" />
          <path d="M92 116 q22 8 38 -4" />
        </g>
      );
    case 'angry':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
          {eye(90)}
          {eye(130)}
          <path d="M74 74 l24 10" />
          <path d="M146 74 l-24 10" />
          <path d="M92 122 q18 -10 36 0" />
        </g>
      );
    case 'hopeful':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round">
          <circle cx={88} cy={88} r={8} fill={INK} />
          <circle cx={132} cy={88} r={8} fill={INK} />
          <circle cx={91} cy={85} r={2.4} fill="#fff" />
          <circle cx={135} cy={85} r={2.4} fill="#fff" />
          <path d="M90 116 q20 16 40 0" fill="none" />
        </g>
      );
    case 'tired':
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
          <path d="M78 90 q10 6 20 0" />
          <path d="M122 90 q10 6 20 0" />
          <path d="M96 118 h28" />
          <path d="M80 100 q8 4 16 2" opacity={0.5} />
        </g>
      );
    case 'neutral':
    default:
      return (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
          {eye(88)}
          {eye(132)}
          <path d="M94 116 q16 8 32 0" />
        </g>
      );
  }
};

export const PersonBase: React.FC<{
  outfit?: Outfit;
  expression?: Expression;
  height?: number;
  arm?: ArmPose;
  skin?: string;
  build?: 'normal' | 'thin' | 'fat';
  flip?: boolean;
  style?: React.CSSProperties;
}> = ({outfit = 'citizen', expression = 'neutral', height = 320, arm = 'down', skin = '#E8B98A', build = 'normal', flip = false, style}) => {
  const c = OUTFITS[outfit];
  const w = (height * 220) / 360;

  // Complexión: SOLO cambia torso/hombros (no la cabeza ni la altura).
  const B = {
    normal: {torso: 'M62 250 L66 168 Q110 140 154 168 L158 250 Z', shL: 70, shR: 150},
    thin: {torso: 'M80 250 L84 172 Q110 152 136 172 L140 250 Z', shL: 86, shR: 134},
    fat: {torso: 'M44 250 Q34 194 64 166 Q110 136 156 166 Q186 194 176 250 Z', shL: 62, shR: 158},
  }[build];

  // Brazo derecho (del personaje) según pose, anclado al hombro de la complexión.
  const rightArm =
    arm === 'up'
      ? `M${B.shR} 196 C ${B.shR + 26} 182, ${B.shR + 34} 150, ${B.shR + 28} 120`
      : arm === 'wave'
        ? `M${B.shR} 196 C ${B.shR + 30} 188, ${B.shR + 46} 168, ${B.shR + 42} 140`
        : arm === 'chest'
          ? `M${B.shR} 196 C ${B.shR} 220, ${B.shR - 24} 226, 112 214`
          : `M${B.shR + 2} 196 C ${B.shR + 18} 220, ${B.shR + 20} 250, ${B.shR + 16} 276`;
  const rightHandXY = arm === 'up' ? [B.shR + 28, 116] : arm === 'wave' ? [B.shR + 42, 136] : arm === 'chest' ? [110, 212] : [B.shR + 16, 280];

  return (
    <svg width={w} height={height} viewBox="0 0 220 360" style={{transform: flip ? 'scaleX(-1)' : undefined, ...style}}>
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx={110} cy={352} rx={66} ry={10} fill="rgba(21,18,13,0.12)" />
        {/* piernas */}
        <path d="M86 250 L80 330" stroke="#2a2a2a" strokeWidth={26} />
        <path d="M134 250 L140 330" stroke="#2a2a2a" strokeWidth={26} />
        <ellipse cx={76} cy={336} rx={20} ry={11} fill={INK} />
        <ellipse cx={144} cy={336} rx={20} ry={11} fill={INK} />
        {/* brazo izquierdo (del personaje) */}
        <path d={`M${B.shL} 196 C ${B.shL - 16} 220, ${B.shL - 18} 250, ${B.shL - 14} 276`} fill="none" stroke={c.body} strokeWidth={28} />
        <circle cx={B.shL - 14} cy={280} r={13} fill={skin} stroke={INK} strokeWidth={5} />
        {/* torso */}
        <path d={B.torso} fill={c.body} stroke={INK} strokeWidth={8} />
        {/* cuello */}
        <rect x={98} y={150} width={24} height={22} fill={skin} stroke={INK} strokeWidth={5} />
        {/* cuello camisa / corbata */}
        {c.tie && (
          <>
            <path d="M110 158 L92 176 L110 190 L128 176 Z" fill="#fff" stroke={INK} strokeWidth={4} />
            <path d="M110 178 L102 220 L110 238 L118 220 Z" fill={c.tie} stroke={INK} strokeWidth={4} />
          </>
        )}
        {outfit === 'father' && (
          <path d="M84 176 Q110 168 136 176" fill="none" stroke="#c97a2a" strokeWidth={6} />
        )}
        {/* banda (sash) */}
        {c.sash && (
          <>
            <path d="M70 172 L150 244 L138 256 L58 184 Z" fill={c.sash} stroke={c.sashEdge ?? INK} strokeWidth={4} />
            <circle cx={140} cy={250} r={9} fill={COLORS.gold} stroke={INK} strokeWidth={4} />
          </>
        )}
        {/* brazo derecho */}
        <path d={rightArm} fill="none" stroke={c.body} strokeWidth={28} />
        <circle cx={rightHandXY[0]} cy={rightHandXY[1]} r={13} fill={skin} stroke={INK} strokeWidth={5} />
        {/* orejas */}
        <circle cx={56} cy={92} r={11} fill={skin} stroke={INK} strokeWidth={5} />
        <circle cx={164} cy={92} r={11} fill={skin} stroke={INK} strokeWidth={5} />
        {/* cabeza */}
        <ellipse cx={110} cy={92} rx={58} ry={60} fill={skin} stroke={INK} strokeWidth={7} />
        {/* pelo */}
        <path d="M54 78 C 56 24, 164 24, 166 78 C 150 52, 130 44, 110 44 C 90 44, 70 52, 54 78 Z" fill={c.hair} stroke={INK} strokeWidth={6} />
        {/* cara */}
        <Face e={expression} />
        {/* lentes (auditor) */}
        {c.glasses && (
          <g stroke={INK} strokeWidth={4} fill="none">
            <circle cx={88} cy={90} r={17} />
            <circle cx={132} cy={90} r={17} />
            <path d="M105 90 h10" />
            <path d="M71 86 l-14 -4" />
          </g>
        )}
      </g>
    </svg>
  );
};

// Presets cómodos.
export const Citizen: React.FC<{height?: number; expression?: Expression; arm?: ArmPose; flip?: boolean; skin?: string; style?: React.CSSProperties}> = (p) => (
  <PersonBase outfit="citizen" {...p} />
);
export const Auditor: React.FC<{height?: number; expression?: Expression; arm?: ArmPose; flip?: boolean; style?: React.CSSProperties}> = (p) => (
  <PersonBase outfit="auditor" expression={p.expression ?? 'smug'} {...p} />
);
export const Father: React.FC<{height?: number; expression?: Expression; arm?: ArmPose; flip?: boolean; style?: React.CSSProperties}> = (p) => (
  <PersonBase outfit="father" expression={p.expression ?? 'hopeful'} {...p} />
);

// Diógenes en el MISMO lenguaje (toga, barba, lámpara). Mantiene su identidad.
export const Diogenes: React.FC<{height?: number; style?: React.CSSProperties}> = ({height = 360, style}) => {
  const w = (height * 220) / 360;
  const skin = '#E8B98A';
  const robe = '#efe6cf';
  const gray = '#cfcabd';
  return (
    <svg width={w} height={height} viewBox="0 0 220 360" style={style}>
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx={110} cy={352} rx={64} ry={10} fill="rgba(21,18,13,0.12)" />
        {/* piernas desnudas + sandalias */}
        <path d="M94 296 L88 330" stroke={skin} strokeWidth={22} />
        <path d="M126 296 L132 330" stroke={skin} strokeWidth={22} />
        <path d="M72 334 h32 M116 334 h32" stroke={INK} strokeWidth={7} />
        {/* brazo izquierdo */}
        <path d="M74 198 C 58 222, 58 252, 62 278" fill="none" stroke={robe} strokeWidth={26} />
        <circle cx={62} cy={282} r={12} fill={skin} stroke={INK} strokeWidth={5} />
        {/* toga (A-line) */}
        <path d="M58 300 L82 154 Q110 134 138 154 L162 300 Z" fill={robe} stroke={INK} strokeWidth={8} />
        <path d="M110 150 L104 298 M88 170 L80 296 M132 170 L140 296" stroke="#d8cdb0" strokeWidth={4} fill="none" />
        <path d="M82 158 Q120 178 150 152" fill="none" stroke="#d8cdb0" strokeWidth={6} />
        {/* brazo derecho levantado con la lámpara */}
        <path d="M150 182 C 176 170, 188 146, 182 122" fill="none" stroke={robe} strokeWidth={24} />
        <circle cx={182} cy={120} r={12} fill={skin} stroke={INK} strokeWidth={5} />
        {/* lámpara de aceite + llama */}
        <path d="M166 102 q24 -10 40 4 q-4 14 -22 12 q-16 -2 -18 -16 Z" fill={COLORS.gold} stroke={INK} strokeWidth={5} />
        <path d="M198 98 q12 -6 6 8" fill="none" stroke={INK} strokeWidth={4} />
        <path d="M182 92 q3 -16 12 -3 q3 11 -5 13 q-9 -1 -7 -10 Z" fill={COLORS.red} stroke={INK} strokeWidth={3} />
        {/* cuello + orejas + cabeza */}
        <rect x={98} y={150} width={24} height={16} fill={skin} stroke={INK} strokeWidth={5} />
        <circle cx={56} cy={92} r={10} fill={skin} stroke={INK} strokeWidth={5} />
        <circle cx={164} cy={92} r={10} fill={skin} stroke={INK} strokeWidth={5} />
        <ellipse cx={110} cy={88} rx={56} ry={58} fill={skin} stroke={INK} strokeWidth={7} />
        {/* pelo gris a los lados (calvo arriba) */}
        <path d="M56 84 C 56 52, 78 42, 96 48 C 78 56, 64 68, 60 88 Z" fill={gray} stroke={INK} strokeWidth={5} />
        <path d="M164 84 C 164 52, 142 42, 124 48 C 142 56, 156 68, 160 88 Z" fill={gray} stroke={INK} strokeWidth={5} />
        {/* ojos + cejas (buscando) */}
        <circle cx={92} cy={84} r={6} fill={INK} />
        <circle cx={130} cy={84} r={6} fill={INK} />
        <path d="M80 72 q12 -6 22 -2 M120 70 q10 -6 22 2" fill="none" stroke={INK} strokeWidth={4} />
        {/* barba gris grande */}
        <path d="M60 100 Q66 154 90 172 Q110 188 130 172 Q154 154 160 100 Q138 124 110 126 Q82 124 60 100 Z" fill={gray} stroke={INK} strokeWidth={6} />
        <path d="M98 116 q12 6 24 0" fill="none" stroke={INK} strokeWidth={4} />
      </g>
    </svg>
  );
};
