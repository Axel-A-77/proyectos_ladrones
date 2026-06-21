import React from 'react';
import {COLORS} from '../theme';

// Librería de ilustraciones doodle en CÓDIGO (SVG).
// Estilo: línea negra gruesa uniforme, dibujo plano, colores planos, paleta del proyecto.
const INK = COLORS.ink;
const GOLD = COLORS.gold;
const RED = COLORS.red;
const CREAM = COLORS.cream;

type D = {height?: number; style?: React.CSSProperties};
const box = (h: number, ratioWH: number, vb: string, children: React.ReactNode, style?: React.CSSProperties) => (
  <svg width={h * ratioWH} height={h} viewBox={vb} style={style}>
    {children}
  </svg>
);

// Puerta institucional del PODER.
export const DoodleDoor: React.FC<D> = ({height = 440, style}) =>
  box(
    height,
    300 / 440,
    '0 0 300 440',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={40} y={408} width={220} height={24} rx={4} fill={CREAM} stroke={INK} strokeWidth={8} />
      <rect x={46} y={130} width={34} height={282} fill={CREAM} stroke={INK} strokeWidth={8} />
      <rect x={220} y={130} width={34} height={282} fill={CREAM} stroke={INK} strokeWidth={8} />
      <path d="M26 130 L150 52 L274 130 Z" fill={GOLD} stroke={INK} strokeWidth={8} />
      <rect x={70} y={128} width={160} height={22} fill={CREAM} stroke={INK} strokeWidth={8} />
      <rect x={86} y={150} width={128} height={262} fill="#8a5a2b" stroke={INK} strokeWidth={8} />
      <rect x={98} y={164} width={48} height={236} rx={4} fill="#9c6a38" stroke={INK} strokeWidth={6} />
      <rect x={154} y={164} width={48} height={236} rx={4} fill="#9c6a38" stroke={INK} strokeWidth={6} />
      <circle cx={142} cy={285} r={6} fill={GOLD} stroke={INK} strokeWidth={4} />
      <circle cx={160} cy={285} r={6} fill={GOLD} stroke={INK} strokeWidth={4} />
    </g>,
    style
  );

// Trono / sillón principal.
export const DoodleThrone: React.FC<D> = ({height = 440, style}) =>
  box(
    height,
    380 / 440,
    '0 0 380 440',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M66 70 Q190 4 314 70 L304 250 L76 250 Z" fill={RED} stroke={INK} strokeWidth={9} />
      <path d="M66 70 Q190 4 314 70" fill="none" stroke={GOLD} strokeWidth={10} />
      {[110, 160, 210, 260].map((x) => (
        <circle key={x} cx={x} cy={130} r={4} fill={INK} />
      ))}
      {[135, 185, 235].map((x) => (
        <circle key={x} cx={x} cy={175} r={4} fill={INK} />
      ))}
      <rect x={40} y={210} width={48} height={130} rx={18} fill="#a8341f" stroke={INK} strokeWidth={9} />
      <rect x={292} y={210} width={48} height={130} rx={18} fill="#a8341f" stroke={INK} strokeWidth={9} />
      <rect x={70} y={240} width={240} height={96} rx={20} fill="#c0392b" stroke={INK} strokeWidth={9} />
      <rect x={82} y={330} width={26} height={74} rx={6} fill={GOLD} stroke={INK} strokeWidth={7} />
      <rect x={272} y={330} width={26} height={74} rx={6} fill={GOLD} stroke={INK} strokeWidth={7} />
    </g>,
    style
  );

// Billetera con tarjeta y moneda.
export const DoodleWallet: React.FC<D> = ({height = 180, style}) =>
  box(
    height,
    240 / 180,
    '0 0 240 180',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={58} y={16} width={120} height={50} rx={6} fill={GOLD} stroke={INK} strokeWidth={6} />
      <rect x={20} y={44} width={200} height={120} rx={16} fill="#7d4a2e" stroke={INK} strokeWidth={8} />
      <path d="M20 70 H220" stroke={INK} strokeWidth={6} />
      <rect x={150} y={92} width={64} height={48} rx={8} fill="#6b3f26" stroke={INK} strokeWidth={6} />
      <circle cx={182} cy={116} r={11} fill={GOLD} stroke={INK} strokeWidth={5} />
    </g>,
    style
  );

// Casa modesta del pueblo.
export const DoodleHouse: React.FC<D> = ({height = 220, style}) =>
  box(
    height,
    280 / 240,
    '0 0 280 240',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={50} y={110} width={180} height={120} fill={CREAM} stroke={INK} strokeWidth={8} />
      <path d="M34 114 L140 36 L246 114 Z" fill={RED} stroke={INK} strokeWidth={8} />
      <rect x={186} y={48} width={28} height={48} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
      <rect x={120} y={160} width={40} height={70} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
      <circle cx={150} cy={196} r={4} fill={GOLD} />
      <rect x={70} y={140} width={40} height={40} fill="#9ad0e8" stroke={INK} strokeWidth={7} />
      <rect x={172} y={140} width={40} height={40} fill="#9ad0e8" stroke={INK} strokeWidth={7} />
    </g>,
    style
  );

// Ventana con marco.
export const DoodleWindow: React.FC<D> = ({height = 150, style}) =>
  box(
    height,
    120 / 150,
    '0 0 120 150',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={12} y={12} width={96} height={110} fill="#9ad0e8" stroke={INK} strokeWidth={8} />
      <path d="M60 12 V122 M12 67 H108" stroke={INK} strokeWidth={7} />
      <rect x={6} y={122} width={108} height={16} fill={CREAM} stroke={INK} strokeWidth={7} />
    </g>,
    style
  );

// Sofá / sala.
export const DoodleSofa: React.FC<D> = ({height = 130, style}) =>
  box(
    height,
    220 / 150,
    '0 0 220 150',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={20} y={60} width={180} height={56} rx={14} fill="#3a7bb5" stroke={INK} strokeWidth={8} />
      <rect x={14} y={40} width={40} height={80} rx={16} fill="#2f6caa" stroke={INK} strokeWidth={8} />
      <rect x={166} y={40} width={40} height={80} rx={16} fill="#2f6caa" stroke={INK} strokeWidth={8} />
      <rect x={56} y={48} width={50} height={26} rx={8} fill="#5a93c8" stroke={INK} strokeWidth={6} />
      <rect x={114} y={48} width={50} height={26} rx={8} fill="#5a93c8" stroke={INK} strokeWidth={6} />
      <path d="M40 116 V134 M180 116 V134" stroke={INK} strokeWidth={8} />
    </g>,
    style
  );

// Caseta de peaje con barrera.
export const DoodleTollbooth: React.FC<D> = ({height = 200, style}) =>
  box(
    height,
    200 / 200,
    '0 0 200 200',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={30} y={70} width={80} height={120} fill={CREAM} stroke={INK} strokeWidth={8} />
      <path d="M22 70 L70 40 L118 70 Z" fill={RED} stroke={INK} strokeWidth={8} />
      <rect x={46} y={92} width={48} height={40} fill="#9ad0e8" stroke={INK} strokeWidth={7} />
      <circle cx={120} cy={150} r={8} fill={INK} />
      <path d="M120 150 L196 96" stroke={RED} strokeWidth={12} strokeLinecap="round" />
      <path d="M150 132 L186 132 M150 118 L186 118" stroke={CREAM} strokeWidth={4} />
    </g>,
    style
  );

// Moneda con símbolo $.
export const DoodleCoin: React.FC<D> = ({height = 100, style}) =>
  box(
    height,
    1,
    '0 0 100 100',
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={50} cy={50} r={42} fill={GOLD} stroke={INK} strokeWidth={8} />
      <circle cx={50} cy={50} r={42} fill="none" stroke={INK} strokeWidth={3} strokeDasharray="3 6" />
      <text x={50} y={68} textAnchor="middle" fontSize={52} fontWeight={900} fill={INK} fontFamily="system-ui, sans-serif">$</text>
    </g>,
    style
  );

// Árbol genealógico / árbol simple.
export const DoodleTree: React.FC<D> = ({height = 220, style}) =>
  box(
    height,
    200 / 220,
    '0 0 200 220',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M92 210 L92 120 M92 150 L60 124 M92 150 L132 124 M92 170 L66 152 M92 170 L124 152" stroke="#7d5a3c" strokeWidth={14} fill="none" />
      <circle cx={92} cy={80} r={56} fill="#5aa84a" stroke={INK} strokeWidth={8} />
      <circle cx={50} cy={104} r={34} fill="#5aa84a" stroke={INK} strokeWidth={8} />
      <circle cx={138} cy={104} r={34} fill="#5aa84a" stroke={INK} strokeWidth={8} />
    </g>,
    style
  );

// Llave (de la casa del pueblo).
export const DoodleKey: React.FC<D> = ({height = 90, style}) =>
  box(
    height,
    160 / 90,
    '0 0 160 90',
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={36} cy={45} r={26} fill={GOLD} stroke={INK} strokeWidth={8} />
      <circle cx={36} cy={45} r={10} fill={CREAM} stroke={INK} strokeWidth={6} />
      <path d="M60 45 H146" stroke={INK} strokeWidth={12} />
      <path d="M120 45 V70 M140 45 V66" stroke={INK} strokeWidth={10} />
    </g>,
    style
  );

// Olla grande de "presupuesto".
export const DoodlePot: React.FC<D> = ({height = 200, style}) =>
  box(
    height,
    260 / 200,
    '0 0 260 200',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M30 70 Q130 -6 230 70 L230 78 L30 78 Z" fill="#b5651d" stroke={INK} strokeWidth={8} />
      <ellipse cx={130} cy={70} rx={100} ry={20} fill="#caa15a" stroke={INK} strokeWidth={6} />
      <path d="M40 78 L56 178 Q130 200 204 178 L220 78 Z" fill="#7a7a7a" stroke={INK} strokeWidth={8} />
      <circle cx={26} cy={110} r={16} fill="none" stroke={INK} strokeWidth={8} />
      <circle cx={234} cy={110} r={16} fill="none" stroke={INK} strokeWidth={8} />
    </g>,
    style
  );

// Cuchara grande.
export const DoodleSpoon: React.FC<D> = ({height = 220, style}) =>
  box(
    height,
    120 / 220,
    '0 0 120 220',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M60 200 L60 70" stroke="#caa15a" strokeWidth={16} />
      <ellipse cx={60} cy={44} rx={40} ry={48} fill="#caa15a" stroke={INK} strokeWidth={8} />
    </g>,
    style
  );

// Figura humilde (político flaco), una mano claramente sobre el ABDOMEN, mirada noble.
export const ThinHumble: React.FC<{height?: number; style?: React.CSSProperties}> = ({height = 360, style}) => (
  <svg width={(height * 170) / 380} height={height} viewBox="0 0 170 380" style={style}>
    <ellipse cx="85" cy="370" rx="48" ry="9" fill="rgba(21,18,13,0.12)" />
    {/* piernas finas + zapatos */}
    <path d="M74 250 L66 348" stroke="#6a5a48" strokeWidth={19} strokeLinecap="round" />
    <path d="M96 250 L104 348" stroke="#6a5a48" strokeWidth={19} strokeLinecap="round" />
    <path d="M48 350 q-6 15 15 15 l11 0 q8 0 4 -14 z" fill={INK} />
    <path d="M122 350 q6 15 -15 15 l-11 0 q-8 0 -4 -14 z" fill={INK} />
    {/* brazo izquierdo cae al costado */}
    <path d="M55 150 C 40 188, 40 220, 50 248" fill="none" stroke="#7a6a55" strokeWidth={17} strokeLinecap="round" />
    <circle cx="50" cy="250" r="11" fill="#e6c9a0" stroke={INK} strokeWidth={4} />
    {/* torso (traje humilde) */}
    <path d="M85 120 C 58 124, 56 186, 62 250 L 108 250 C 114 186, 112 124, 85 120 Z" fill="#7a6a55" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {/* camisa + corbata sencilla */}
    <path d="M85 122 L71 140 L85 156 L99 140 Z" fill="#efe7d6" stroke={INK} strokeWidth={3} />
    <path d="M85 144 L79 196 L85 208 L91 196 Z" fill={RED} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    {/* brazo derecho doblado: mano sobre el ABDOMEN */}
    <path d="M110 150 C 126 176, 120 196, 96 200" fill="none" stroke="#7a6a55" strokeWidth={17} strokeLinecap="round" />
    <ellipse cx="88" cy="202" rx="15" ry="12" fill="#e6c9a0" stroke={INK} strokeWidth={5} />
    <path d="M78 200 q10 5 20 0 M80 207 q8 4 16 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
    {/* cuello + cabeza mirando un poco arriba */}
    <rect x="77" y="102" width="16" height="20" fill="#e6c9a0" stroke={INK} strokeWidth={4} />
    <ellipse cx="85" cy="74" rx="31" ry="34" fill="#e6c9a0" stroke={INK} strokeWidth={6} />
    <path d="M55 60 C 60 28, 110 28, 115 60 C 106 44, 64 44, 55 60 Z" fill="#4a3a28" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    {/* ojos mirando arriba (noble) + cejas */}
    <path d="M68 58 q8 -4 16 0 M88 58 q8 -4 14 0" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    <circle cx="75" cy="66" r="3.4" fill={INK} />
    <circle cx="95" cy="66" r="3.4" fill={INK} />
    {/* bigote + sonrisa humilde */}
    <path d="M73 84 q12 5 24 0" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
    <path d="M75 92 q10 5 20 0" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
  </svg>
);

// Figura glotona (el que se sirve del presupuesto).
export const FatGlutton: React.FC<{height?: number; style?: React.CSSProperties}> = ({height = 360, style}) => (
  <svg width={(height * 260) / 360} height={height} viewBox="0 0 260 360" style={style}>
    <ellipse cx="130" cy="351" rx="84" ry="11" fill="rgba(21,18,13,0.12)" />
    <path d="M104 268 L98 330" stroke="#1c2740" strokeWidth={30} strokeLinecap="round" />
    <path d="M156 268 L162 330" stroke="#1c2740" strokeWidth={30} strokeLinecap="round" />
    <path d="M78 332 q-8 16 18 16 l14 0 q9 0 6 -15 z" fill={INK} />
    <path d="M182 332 q8 16 -18 16 l-14 0 q-9 0 -6 -15 z" fill={INK} />
    <path d="M130 120 C 44 126, 40 220, 64 278 L 196 278 C 220 220, 216 126, 130 120 Z" fill="#23314d" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M130 150 C 92 150, 88 230, 130 250 C 172 230, 168 150, 130 150 Z" fill="#2a3a57" stroke={INK} strokeWidth={4} />
    <path d="M130 124 L112 144 L130 162 L148 144 Z" fill="#fff" stroke={INK} strokeWidth={3} />
    <path d="M130 146 L122 200 L130 214 L138 200 Z" fill={RED} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    <path d="M52 150 C 30 184, 32 220, 52 244" fill="none" stroke="#23314d" strokeWidth={26} strokeLinecap="round" />
    <path d="M208 150 C 230 184, 228 220, 208 244" fill="none" stroke="#23314d" strokeWidth={26} strokeLinecap="round" />
    <circle cx="52" cy="248" r="13" fill="#E8B98A" stroke={INK} strokeWidth={4} />
    <circle cx="208" cy="248" r="13" fill="#E8B98A" stroke={INK} strokeWidth={4} />
    <ellipse cx="130" cy="74" rx="42" ry="40" fill="#E8B98A" stroke={INK} strokeWidth={6} />
    <path d="M92 60 C 96 28, 164 28, 168 60 C 158 46, 102 46, 92 60 Z" fill="#3a2a1a" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <circle cx="116" cy="74" r="3.6" fill={INK} />
    <circle cx="144" cy="74" r="3.6" fill={INK} />
    <path d="M108 92 q22 16 44 0" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx="98" cy="92" rx="8" ry="5" fill="#e89a8a" opacity={0.6} />
    <ellipse cx="162" cy="92" rx="8" ry="5" fill="#e89a8a" opacity={0.6} />
  </svg>
);

// Saco de dinero.
export const DoodleMoneyBag: React.FC<D & {shades?: boolean}> = ({height = 180, shades, style}) =>
  box(
    height,
    160 / 180,
    '0 0 160 180',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M44 44 Q80 24 116 44 L138 150 Q80 178 22 150 Z" fill="#c8a24a" stroke={INK} strokeWidth={8} />
      <path d="M44 44 L52 26 L108 26 L116 44 Z" fill="#b08e3c" stroke={INK} strokeWidth={7} />
      <path d="M52 30 Q80 18 108 30" fill="none" stroke={INK} strokeWidth={6} />
      <text x={80} y={120} textAnchor="middle" fontSize={56} fontWeight={900} fill={INK} fontFamily="system-ui, sans-serif">$</text>
      {shades ? <path d="M40 64 h32 v16 h-32 z M88 64 h32 v16 h-32 z M72 70 h16" fill={INK} stroke={INK} strokeWidth={4} /> : null}
    </g>,
    style
  );

// Puente que une dos cuentas (sacos de dinero).
export const DoodleBridge: React.FC<D> = ({height = 220, style}) =>
  box(
    height,
    460 / 220,
    '0 0 460 220',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 190 q40 -16 80 0 t80 0 t80 0 t80 0 t120 0" fill="none" stroke="#3aa0d0" strokeWidth={7} />
      <path d="M10 208 q40 -16 80 0 t80 0 t80 0 t80 0 t120 0" fill="none" stroke="#69c0e0" strokeWidth={7} />
      <path d="M70 120 C 160 30, 300 30, 390 120" fill="none" stroke="#8a5a2b" strokeWidth={12} />
      <path d="M70 120 L70 175 M150 86 L150 175 M230 74 L230 175 M310 86 L310 175 M390 120 L390 175" stroke="#8a5a2b" strokeWidth={9} />
      <circle cx={70} cy={120} r={46} fill="#c8a24a" stroke={INK} strokeWidth={8} />
      <circle cx={390} cy={120} r={46} fill="#c8a24a" stroke={INK} strokeWidth={8} />
      <text x={70} y={136} textAnchor="middle" fontSize={44} fontWeight={900} fill={INK} fontFamily="system-ui, sans-serif">$</text>
      <text x={390} y={136} textAnchor="middle" fontSize={44} fontWeight={900} fill={INK} fontFamily="system-ui, sans-serif">$</text>
    </g>,
    style
  );

// Hospital con muchas placas y una cruz.
export const DoodleHospital: React.FC<D> = ({height = 280, style}) =>
  box(
    height,
    300 / 280,
    '0 0 300 280',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={40} y={70} width={220} height={190} fill={CREAM} stroke={INK} strokeWidth={8} />
      <rect x={40} y={70} width={220} height={28} fill="#9ad0e8" stroke={INK} strokeWidth={8} />
      <rect x={128} y={20} width={44} height={44} fill="#fff" stroke={INK} strokeWidth={7} />
      <path d="M150 28 V56 M136 42 H164" stroke={RED} strokeWidth={9} />
      <rect x={128} y={196} width={44} height={64} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
      {[60, 196].map((x) => [120, 160].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width={44} height={34} fill="#9ad0e8" stroke={INK} strokeWidth={6} />))}
      {[[70, 120], [70, 165], [70, 210], [196, 120]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={34} height={12} rx={3} fill={GOLD} stroke={INK} strokeWidth={3} transform={`rotate(-6 ${x} ${y})`} />
      ))}
    </g>,
    style
  );

// Primera piedra con plaquita en terreno baldío.
export const DoodleStone: React.FC<D> = ({height = 170, style}) =>
  box(
    height,
    260 / 170,
    '0 0 260 170',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 150 q120 -20 240 0" fill="none" stroke={INK} strokeWidth={5} strokeDasharray="6 14" />
      <path d="M70 150 C 60 96, 96 78, 130 80 C 176 82, 200 110, 196 150 Z" fill="#9a917f" stroke={INK} strokeWidth={8} />
      <rect x={104} y={104} width={56} height={30} rx={4} fill={GOLD} stroke={INK} strokeWidth={6} />
      <path d="M114 119 h36" stroke={INK} strokeWidth={4} />
    </g>,
    style
  );

// Escenario de playa (sol, palmera, agua) — fondo para casa de playa / Caribe.
export const DoodleBeach: React.FC<{width?: number; style?: React.CSSProperties}> = ({width = 1000, style}) => (
  <svg width={width} height={(width * 540) / 1000} viewBox="0 0 1000 540" style={style}>
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={130} cy={120} r={56} fill={GOLD} stroke={INK} strokeWidth={7} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return <path key={a} d={`M${130 + Math.cos(r) * 70} ${120 + Math.sin(r) * 70} L${130 + Math.cos(r) * 92} ${120 + Math.sin(r) * 92}`} stroke={GOLD} strokeWidth={7} />;
      })}
      <path d="M880 470 C 870 330, 884 240, 880 170" fill="none" stroke="#7d5a3c" strokeWidth={18} />
      <path d="M880 170 C 800 130, 770 142, 744 110 M880 170 C 960 130, 990 142, 1000 108 M880 170 C 840 110, 838 84, 826 56 M880 170 C 924 110, 936 84, 950 60" fill="none" stroke={COLORS.green} strokeWidth={16} />
      <path d="M0 470 q120 -34 240 0 t240 0 t240 0 t280 0" fill="none" stroke="#3aa0d0" strokeWidth={9} />
      <path d="M0 510 q120 -34 240 0 t240 0 t240 0 t280 0" fill="none" stroke="#69c0e0" strokeWidth={9} />
    </g>
  </svg>
);

// Banca de parque.
export const DoodleBench: React.FC<D> = ({height = 140, style}) =>
  box(
    height,
    220 / 140,
    '0 0 220 140',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={20} y={40} width={180} height={14} rx={6} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
      <rect x={20} y={62} width={180} height={14} rx={6} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
      <rect x={20} y={84} width={180} height={16} rx={6} fill="#9c6a38" stroke={INK} strokeWidth={7} />
      <path d="M34 100 L34 130 M186 100 L186 130 M40 30 L40 100 M180 30 L180 100" stroke={INK} strokeWidth={8} />
    </g>,
    style
  );

// Foco / bombilla.
export const DoodleBulb: React.FC<D> = ({height = 160, style}) =>
  box(
    height,
    110 / 160,
    '0 0 110 160',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M55 14 C 20 14, 8 52, 30 84 C 40 98, 40 104, 40 112 L 70 112 C 70 104, 70 98, 80 84 C 102 52, 90 14, 55 14 Z" fill={GOLD} stroke={INK} strokeWidth={7} />
      <path d="M46 60 L55 76 L64 56" fill="none" stroke={INK} strokeWidth={4} />
      <rect x={40} y={112} width={30} height={14} fill="#9a917f" stroke={INK} strokeWidth={6} />
      <rect x={43} y={126} width={24} height={18} rx={3} fill="#9a917f" stroke={INK} strokeWidth={6} />
      <path d="M22 30 L8 20 M88 30 L102 20 M30 18 L24 4 M80 18 L86 4" stroke={GOLD} strokeWidth={6} />
    </g>,
    style
  );

// Semáforo.
export const DoodleTrafficLight: React.FC<D> = ({height = 200, style}) =>
  box(
    height,
    90 / 200,
    '0 0 90 200',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={42} y={120} width={6} height={70} fill={INK} />
      <rect x={20} y={14} width={50} height={120} rx={12} fill="#3a3a3a" stroke={INK} strokeWidth={7} />
      <circle cx={45} cy={42} r={14} fill={RED} stroke={INK} strokeWidth={4} />
      <circle cx={45} cy={74} r={14} fill={GOLD} stroke={INK} strokeWidth={4} />
      <circle cx={45} cy={106} r={14} fill="#3fae5a" stroke={INK} strokeWidth={4} />
    </g>,
    style
  );

// Sello / tampón (roba con sello, no con pala).
export const DoodleStamp: React.FC<D> = ({height = 160, style}) =>
  box(
    height,
    140 / 170,
    '0 0 140 170',
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={70} cy={28} rx={28} ry={18} fill={GOLD} stroke={INK} strokeWidth={7} />
      <rect x={58} y={40} width={24} height={52} fill={CREAM} stroke={INK} strokeWidth={7} />
      <path d="M40 92 L100 92 L114 124 L26 124 Z" fill={RED} stroke={INK} strokeWidth={7} />
      <rect x={22} y={124} width={96} height={16} rx={4} fill={INK} />
      <path d="M30 156 H110" stroke={INK} strokeWidth={7} strokeDasharray="3 12" />
    </g>,
    style
  );

// Documento / proyecto de ley con sello.
export const DoodleScroll: React.FC<D> = ({height = 170, style}) =>
  box(
    height,
    130 / 170,
    '0 0 130 170',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={22} y={18} width={86} height={130} rx={6} fill={CREAM} stroke={INK} strokeWidth={7} />
      {[44, 64, 84, 104].map((y) => (
        <path key={y} d={`M36 ${y} H94`} stroke="#9a917f" strokeWidth={6} />
      ))}
      <circle cx={92} cy={132} r={18} fill={RED} stroke={INK} strokeWidth={6} />
      <path d="M84 132 l6 6 l10 -12" fill="none" stroke={CREAM} strokeWidth={5} />
    </g>,
    style
  );

// Reloj (puntual como reloj suizo).
export const DoodleClock: React.FC<D> = ({height = 160, style}) =>
  box(
    height,
    160 / 170,
    '0 0 160 170',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={70} y={6} width={20} height={16} rx={4} fill="#9a917f" stroke={INK} strokeWidth={6} />
      <circle cx={80} cy={92} r={66} fill={CREAM} stroke={INK} strokeWidth={9} />
      <circle cx={80} cy={92} r={52} fill="none" stroke={GOLD} strokeWidth={4} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const a = (i * Math.PI) / 6;
        return <circle key={i} cx={80 + Math.sin(a) * 52} cy={92 - Math.cos(a) * 52} r={2.6} fill={INK} />;
      })}
      <path d="M80 92 L80 56" stroke={INK} strokeWidth={7} />
      <path d="M80 92 L108 100" stroke={INK} strokeWidth={6} />
      <circle cx={80} cy={92} r={6} fill={RED} stroke={INK} strokeWidth={3} />
    </g>,
    style
  );

// Mapa de país genérico.
export const DoodleCountry: React.FC<D> = ({height = 160, style}) =>
  box(
    height,
    230 / 190,
    '0 0 230 190',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M26 78 L74 30 L132 50 L202 32 L192 152 L124 174 L58 152 L22 168 Z" fill="#7FB069" stroke={INK} strokeWidth={7} />
      <circle cx={150} cy={100} r={6} fill={INK} />
    </g>,
    style
  );

// Libro abierto (diccionario).
export const DoodleBook: React.FC<D> = ({height = 150, style}) =>
  box(
    height,
    220 / 150,
    '0 0 220 150',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M110 30 C 78 14, 36 14, 16 24 L16 124 C 36 114, 78 114, 110 130 C 142 114, 184 114, 204 124 L204 24 C 184 14, 142 14, 110 30 Z" fill={CREAM} stroke={INK} strokeWidth={8} />
      <path d="M110 30 L110 130" stroke={INK} strokeWidth={7} />
      {[52, 72, 92].map((y) => (
        <g key={y}>
          <path d={`M32 ${y} H96`} stroke="#9a917f" strokeWidth={5} />
          <path d={`M124 ${y} H188`} stroke="#9a917f" strokeWidth={5} />
        </g>
      ))}
    </g>,
    style
  );

// Tijera cortando una cinta (cortar la cinta).
export const DoodleScissors: React.FC<D> = ({height = 150, style}) =>
  box(
    height,
    220 / 150,
    '0 0 220 150',
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* cinta roja que se corta */}
      <path d="M0 75 H210" stroke={RED} strokeWidth={12} />
      {/* hojas (blades) */}
      <path d="M70 75 L196 40 L204 54 L86 84 Z" fill="#c9ccd2" stroke={INK} strokeWidth={6} />
      <path d="M70 75 L196 110 L204 96 L86 66 Z" fill="#d7dbe0" stroke={INK} strokeWidth={6} />
      {/* mangos (anillas) */}
      <circle cx={40} cy={50} r={22} fill={GOLD} stroke={INK} strokeWidth={7} />
      <circle cx={40} cy={100} r={22} fill={GOLD} stroke={INK} strokeWidth={7} />
      <path d="M58 60 L80 72 M58 90 L80 78" stroke={INK} strokeWidth={7} fill="none" />
      <circle cx={74} cy={75} r={6} fill={INK} />
    </g>,
    style
  );

// Carretera que se pierde en el horizonte.
export const DoodleRoad: React.FC<D> = ({height = 160, style}) =>
  box(
    height,
    220 / 160,
    '0 0 220 160',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M30 152 L92 26 L128 26 L190 152 Z" fill="#8a8076" stroke={INK} strokeWidth={7} />
      <path d="M110 34 L110 148" stroke={GOLD} strokeWidth={7} strokeDasharray="10 18" />
    </g>,
    style
  );

// Colegio (con bandera).
export const DoodleSchool: React.FC<D> = ({height = 170, style}) =>
  box(
    height,
    200 / 170,
    '0 0 200 170',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M100 30 L100 10" stroke={INK} strokeWidth={5} />
      <path d="M100 12 L126 19 L100 26 Z" fill={RED} stroke={INK} strokeWidth={4} />
      <rect x={40} y={72} width={120} height={84} fill={CREAM} stroke={INK} strokeWidth={7} />
      <path d="M32 72 L100 34 L168 72 Z" fill={RED} stroke={INK} strokeWidth={7} />
      <rect x={86} y={108} width={28} height={48} fill="#8a5a2b" stroke={INK} strokeWidth={6} />
      <rect x={52} y={92} width={24} height={22} fill="#bfe3f2" stroke={INK} strokeWidth={5} />
      <rect x={124} y={92} width={24} height={22} fill="#bfe3f2" stroke={INK} strokeWidth={5} />
    </g>,
    style
  );

// Gota de agua (agua potable).
export const DoodleWaterDrop: React.FC<D> = ({height = 160, style}) =>
  box(
    height,
    120 / 160,
    '0 0 120 160',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M60 16 C 94 70, 104 96, 104 112 A 44 44 0 1 1 16 112 C 16 96, 26 70, 60 16 Z" fill="#3aa0d0" stroke={INK} strokeWidth={8} />
      <path d="M40 108 a 18 18 0 0 0 14 24" fill="none" stroke="#bfe9fb" strokeWidth={7} />
    </g>,
    style
  );

// Camioneta 4x4 (la del corrupto).
export const DoodleCar: React.FC<D> = ({height = 150, style}) =>
  box(
    height,
    240 / 150,
    '0 0 240 150',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M18 98 L44 58 L150 58 L184 98 L214 98 L218 120 L18 120 Z" fill={RED} stroke={INK} strokeWidth={7} />
      <rect x={58} y={64} width={78} height={30} fill="#bfe3f2" stroke={INK} strokeWidth={5} />
      <circle cx={68} cy={122} r={22} fill="#2b2b2b" stroke={INK} strokeWidth={7} />
      <circle cx={68} cy={122} r={8} fill={CREAM} stroke={INK} strokeWidth={3} />
      <circle cx={178} cy={122} r={22} fill="#2b2b2b" stroke={INK} strokeWidth={7} />
      <circle cx={178} cy={122} r={8} fill={CREAM} stroke={INK} strokeWidth={3} />
    </g>,
    style
  );

// Edificio / departamento de lujo.
export const DoodleBuilding: React.FC<D> = ({height = 200, style}) =>
  box(
    height,
    140 / 200,
    '0 0 140 200',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={24} y={20} width={92} height={170} fill="#cfcabd" stroke={INK} strokeWidth={7} />
      {[42, 72, 102, 132].map((y) =>
        [36, 62, 88].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={16} height={20} fill="#bfe3f2" stroke={INK} strokeWidth={4} />
        ))
      )}
      <rect x={58} y={162} width={24} height={28} fill="#8a5a2b" stroke={INK} strokeWidth={5} />
    </g>,
    style
  );

// Lupa (auditor que revisa).
export const DoodleMagnifier: React.FC<D> = ({height = 170, style}) =>
  box(
    height,
    170 / 170,
    '0 0 170 170',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M104 104 L152 152" stroke={INK} strokeWidth={18} />
      <circle cx={68} cy={68} r={50} fill="#bfe9fb" stroke={INK} strokeWidth={9} />
      <circle cx={68} cy={68} r={50} fill="none" stroke="#fff" strokeWidth={3} opacity={0.6} />
      <path d="M48 52 q14 -12 30 -2" fill="none" stroke="#fff" strokeWidth={6} opacity={0.7} />
    </g>,
    style
  );

// Factura / recibo (jagged abajo + líneas).
export const DoodleReceipt: React.FC<D> = ({height = 180, style}) =>
  box(
    height,
    130 / 180,
    '0 0 130 180',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M22 16 L108 16 L108 150 L96 142 L84 152 L72 142 L60 152 L48 142 L36 152 L22 142 Z" fill={CREAM} stroke={INK} strokeWidth={7} />
      {[44, 64, 84].map((y) => (
        <path key={y} d={`M36 ${y} H94`} stroke="#9a917f" strokeWidth={6} />
      ))}
      <path d="M36 104 H78" stroke={RED} strokeWidth={7} />
    </g>,
    style
  );

// Curul / banca parlamentaria (con micrófono). El personaje se sienta detrás.
export const DoodleCurul: React.FC<D> = ({height = 200, style}) =>
  box(
    height,
    280 / 200,
    '0 0 280 200',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M150 92 L150 52" stroke={INK} strokeWidth={5} />
      <circle cx={150} cy={44} r={11} fill="#3a3a3a" stroke={INK} strokeWidth={5} />
      <rect x={18} y={92} width={244} height={92} fill="#8a5a2b" stroke={INK} strokeWidth={7} />
      <rect x={10} y={78} width={260} height={18} rx={5} fill="#9c6a38" stroke={INK} strokeWidth={6} />
      <rect x={42} y={110} width={66} height={50} rx={5} fill="#7a4f28" stroke={INK} strokeWidth={5} />
      <rect x={172} y={110} width={66} height={50} rx={5} fill="#7a4f28" stroke={INK} strokeWidth={5} />
    </g>,
    style
  );

// Calculadora.
export const DoodleCalculator: React.FC<D> = ({height = 180, style}) =>
  box(
    height,
    130 / 180,
    '0 0 130 180',
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={20} y={16} width={90} height={148} rx={10} fill="#3a3f4a" stroke={INK} strokeWidth={7} />
      <rect x={32} y={28} width={66} height={30} rx={4} fill="#9DCD67" stroke={INK} strokeWidth={4} />
      {[72, 100, 128].map((y) =>
        [38, 58, 78].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={14} height={14} rx={3} fill={CREAM} stroke={INK} strokeWidth={3} />
        ))
      )}
    </g>,
    style
  );

// Detector de metales.
export const DoodleDetector: React.FC<D> = ({height = 200, style}) =>
  box(
    height,
    140 / 200,
    '0 0 140 200',
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M70 28 L70 150" stroke={INK} strokeWidth={9} />
      <path d="M50 28 h40" stroke={INK} strokeWidth={9} />
      <rect x={54} y={58} width={32} height={36} rx={5} fill="#5AA6D8" stroke={INK} strokeWidth={6} />
      <ellipse cx={70} cy={168} rx={48} ry={17} fill="none" stroke={INK} strokeWidth={9} />
      <ellipse cx={70} cy={168} rx={30} ry={9} fill="#cfcabd" stroke={INK} strokeWidth={4} />
    </g>,
    style
  );
