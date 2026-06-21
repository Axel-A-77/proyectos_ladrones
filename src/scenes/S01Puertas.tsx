import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {DrawPath} from '../effects/DrawPath';
import {DoodleDoor, DoodleThrone, DoodleWallet, DoodleCountry} from './doodles';
import {beatAt} from './util';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Official: React.FC = () => (
  <svg width={190} height={360} viewBox="0 0 190 360">
    <ellipse cx="95" cy="351" rx="60" ry="11" fill="rgba(21,18,13,0.12)" />
    <path d="M74 230 L70 330" stroke="#1c2740" strokeWidth={26} strokeLinecap="round" />
    <path d="M116 230 L120 330" stroke="#1c2740" strokeWidth={26} strokeLinecap="round" />
    <path d="M52 332 q-6 16 16 16 l12 0 q8 0 5 -15 z" fill={COLORS.ink} />
    <path d="M138 332 q6 16 -16 16 l-12 0 q-8 0 -5 -15 z" fill={COLORS.ink} />
    <path d="M52 140 C 32 175, 32 210, 44 232" fill="none" stroke="#23314d" strokeWidth={24} strokeLinecap="round" />
    <path d="M138 140 C 158 175, 158 210, 146 232" fill="none" stroke="#23314d" strokeWidth={24} strokeLinecap="round" />
    <circle cx="44" cy="236" r="12" fill="#E8B98A" stroke={COLORS.ink} strokeWidth={4} />
    <circle cx="146" cy="236" r="12" fill="#E8B98A" stroke={COLORS.ink} strokeWidth={4} />
    <path d="M95 110 C 48 116, 46 170, 52 236 L 138 236 C 144 170, 142 116, 95 110 Z" fill="#23314d" stroke={COLORS.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M112 118 C 140 132, 142 178, 138 236 L 116 236 C 120 178, 118 138, 112 118 Z" fill="#1b2740" opacity={0.55} />
    <path d="M95 112 L74 132 L95 150 L116 132 Z" fill="#fff" stroke={COLORS.ink} strokeWidth={3} />
    <path d="M95 134 L88 186 L95 201 L102 186 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth={3} strokeLinejoin="round" />
    <rect x="86" y="98" width="18" height="20" fill="#E8B98A" stroke={COLORS.ink} strokeWidth={4} />
    <ellipse cx="95" cy="66" rx="34" ry="36" fill="#E8B98A" stroke={COLORS.ink} strokeWidth={6} />
    <path d="M62 54 C 64 20, 126 20, 128 54 C 119 38, 71 38, 62 54 Z" fill="#3a2a1a" stroke={COLORS.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx="84" cy="67" r="3.6" fill={COLORS.ink} />
    <circle cx="106" cy="67" r="3.6" fill={COLORS.ink} />
    <path d="M81 83 q14 12 28 0" fill="none" stroke={COLORS.ink} strokeWidth={4} strokeLinecap="round" />
  </svg>
);

// 01 — FLUJO CONTINUO: cada elemento entra en su palabra y SALE cuando la voz avanza.
// puerta (entra→sale) · trono (entra, se sienta) · país=billetera (entra). Nada estático.
export const S01Puertas: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec, durationInFrames}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const W = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tPuerta = W('puertas', 18.7);
  const tSillon = W('sillón', 20.8);
  const tBillet = W('billetera', 24.3);

  // PUERTA: BASE desde frame 0 (la "puerta del poder"); se va hacia arriba en "sillón".
  const doorOp = interpolate(frame, [0, 10, tSillon - 6, tSillon + 6], [0, 1, 1, 0], clamp);
  const doorY = interpolate(frame, [0, 14, tSillon - 6, tSillon + 8], [-220, 0, 0, -300], clamp);

  // FIGURA: camina desde la izquierda (en "puertas") y se sienta (en "sillón"). Siempre presente.
  const figX = interpolate(frame, [tPuerta, tPuerta + 26, tSillon, tSillon + 16], [-360, 470, 470, 560], clamp);
  const figY = interpolate(frame, [tSillon, tSillon + 16], [402, 470], clamp);
  const figScale = interpolate(frame, [tSillon, tSillon + 16], [1, 0.82], clamp);
  const figOp = interpolate(frame, [tPuerta, tPuerta + 6], [0, 1], clamp);
  const walking = frame > tPuerta + 4 && frame < tSillon;
  const lean = walking ? Math.sin(frame / 3.5) * 3 : Math.sin(frame / 26) * 1.2;

  // TRONO: entra deslizando desde la derecha en "sillón"; se queda (es su asiento).
  const thrOp = interpolate(frame, [tSillon, tSillon + 10], [0, 1], clamp);
  const thrX = interpolate(frame, [tSillon, tSillon + 16], [360, 0], clamp);

  // PAÍS = BILLETERA: entra en "billetera" desde la derecha; la billetera late.
  const payOp = interpolate(frame, [tBillet, tBillet + 10], [0, 1], clamp);
  const payX = interpolate(frame, [tBillet, tBillet + 16], [340, 0], clamp);
  const walletBob = Math.sin((frame - tBillet) / 9) * 8;

  return (
    <AbsoluteFill>
      {/* suelo (se dibuja una vez, queda de base) */}
      <svg width={1920} height={120} viewBox="0 0 1920 120" style={{position: 'absolute', left: 0, top: 820}}>
        <DrawPath d="M120 60 C 700 30, 1300 30, 1800 60" delay={6} duration={24} stroke={COLORS.ink} strokeWidth={6} />
      </svg>

      {/* TRONO (detrás de la figura) */}
      <div style={{position: 'absolute', left: 470, top: 300, opacity: thrOp, transform: `translateX(${thrX}px)`}}>
        <DoodleThrone height={540} />
      </div>

      {/* FIGURA */}
      <div style={{position: 'absolute', left: 0, top: 0, opacity: figOp, transform: `translate(${figX}px, ${figY}px) rotate(${lean}deg) scale(${figScale})`, transformOrigin: 'bottom center'}}>
        <Official />
      </div>

      {/* PUERTA (entra y sale) */}
      <div style={{position: 'absolute', left: 190, top: 280, opacity: doorOp, transform: `translateY(${doorY}px)`}}>
        <DoodleDoor height={520} />
      </div>
      <div style={{position: 'absolute', left: 250, top: 232, opacity: doorOp, fontFamily: FONTS.display, color: COLORS.ink, fontSize: 46, transform: 'rotate(-4deg)', textShadow: '0 2px 6px rgba(251,248,241,0.9)', whiteSpace: 'nowrap'}}>PODER</div>

      {/* PAÍS = BILLETERA (entra al final) */}
      <div style={{position: 'absolute', left: 1110, top: 450, opacity: payOp, transform: `translateX(${payX}px)`}}>
        <DoodleCountry height={180} />
      </div>
      <div style={{position: 'absolute', left: 1330, top: 470, opacity: payOp, transform: `translateX(${payX}px)`}}>
        <div style={{fontFamily: 'system-ui, sans-serif', fontSize: 88, fontWeight: 900, color: COLORS.ink}}>=</div>
      </div>
      <div style={{position: 'absolute', left: 1430, top: 440, opacity: payOp, transform: `translateX(${payX}px) translateY(${walletBob}px)`}}>
        <DoodleWallet height={200} />
      </div>
      <div style={{position: 'absolute', left: 1140, top: 400, opacity: payOp, fontFamily: FONTS.display, color: COLORS.ink, fontSize: 40, transform: 'rotate(-4deg)', textShadow: '0 2px 6px rgba(251,248,241,0.9)', whiteSpace: 'nowrap'}}>EL PAÍS</div>
    </AbsoluteFill>
  );
};
