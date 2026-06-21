import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {RoleTitle, Sparkles, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {beatAt} from './util';

// Doodle "vereda con huecos" (código) — el visual de la "oportunidad".
const PistaHuecos: React.FC = () => (
  <svg width={460} height={180} viewBox="0 0 460 180">
    <path d="M20 165 L90 55 L370 55 L440 165 Z" fill={COLORS.muted} stroke={COLORS.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M230 70 L230 155" stroke={COLORS.gold} strokeWidth={7} strokeDasharray="11 15" strokeLinecap="round" />
    <ellipse cx="160" cy="116" rx="34" ry="15" fill={COLORS.ink} />
    <ellipse cx="295" cy="132" rx="40" ry="17" fill={COLORS.ink} />
    <path d="M370 165 L388 108 L406 165 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

// EL ALCALDE (2:38–3:14). Personaje transitorio (solo intro). Cada concepto con su
// visual; texto libre (sin cuadro); bocadillo apuntando al personaje; flujo continuo.
export const AlcaldeScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const tOport = f('oportunidad', 160.8);
  const tVac = f('vacaciones', 171.5);
  const tArbol = f('árbol', 174.1);
  const tPrimos = f('primos', 176.7);
  const tPlaya = f('playa', 186.3);

  return (
    <AbsoluteFill>
      {/* INTRO — el alcalde aparece, lo presentamos y se va (no se queda) */}
      <FlowItem inAt={4} outAt={tOport + 18} enter="left" exit="left" style={{left: 470, top: 280}}>
        <Idle amp={6} speed={26}>
          <Img src={ill('alcalde.png')} style={{height: 560, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={22} outAt={tOport + 14} enter="scale" exit="fade" style={{left: 700, top: 170}}>
        <BubbleBox text={<>«soy un<br />artista municipal»</>} tailX={40} />
      </FlowItem>
      <RoleTitle at={6} text="EL ALCALDE" width={440} style={{left: 120, top: 80}} />

      {/* DEED 1 — la "obra": vereda con huecos (visual) + eufemismos en texto libre */}
      <FlowItem inAt={tOport + 22} outAt={tArbol - 8} enter="down" exit="up" style={{left: 700, top: 470}}>
        <PistaHuecos />
      </FlowItem>
      <FlowItem inAt={tOport + 26} outAt={tVac - 4} enter="left" exit="fade" style={{left: 560, top: 250}}>
        <FreeText text="«una oportunidad de crecimiento»" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tVac} outAt={tArbol - 8} enter="right" exit="fade" style={{left: 700, top: 740}}>
        <FreeText text="…o sea, una vereda rota" color="red" fontSize={48} rotate={2} />
      </FlowItem>

      {/* DEED 2 — el árbol genealógico (ilustración) + parientes en texto libre */}
      <FlowItem inAt={tArbol} outAt={tPlaya - 8} enter="scale" exit="up" style={{left: 660, top: 150}}>
        <Idle amp={5} speed={30}>
          <Img src={ill('08_alcalde_arbol_genealogico.png')} style={{height: 660, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tArbol + 6} outAt={tPlaya - 8} enter="down" exit="fade" style={{left: 540, top: 110}}>
        <FreeText text="el único árbol que crece…" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tPrimos} outAt={tPlaya - 8} enter="left" exit="fade" style={{left: 440, top: 320}}>
        <FreeText text="primo" color="green" fontSize={52} rotate={-6} font="display" />
      </FlowItem>
      <FlowItem inAt={tPrimos + 10} outAt={tPlaya - 8} enter="right" exit="fade" style={{left: 1390, top: 360}}>
        <FreeText text="cuñado" color="red" fontSize={52} rotate={5} font="display" />
      </FlowItem>
      <FlowItem inAt={tPrimos + 20} outAt={tPlaya - 8} enter="left" exit="fade" style={{left: 430, top: 650}}>
        <FreeText text="sobrino" color="green" fontSize={52} rotate={4} font="display" />
      </FlowItem>
      <FlowItem inAt={tPrimos + 30} outAt={tPlaya - 8} enter="right" exit="fade" style={{left: 1390, top: 660}}>
        <FreeText text="yerno" color="red" fontSize={52} rotate={-4} font="display" />
      </FlowItem>

      {/* DEED 3 — la casa de playa (ilustración) + sol/destellos + texto libre */}
      <FlowItem inAt={tPlaya} enter="scale" style={{left: 600, top: 180}}>
        <Idle amp={6} speed={26}>
          <Img src={ill('07_alcalde_casa_playa.png')} style={{height: 660, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tPlaya + 4} enter="down" style={{left: 520, top: 110}}>
        <FreeText text="su casa de playa aparece…" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tPlaya + 22} enter="scale" style={{left: 1280, top: 720}}>
        <FreeText text="¡casi milagrosa!" color="gold" fontSize={60} rotate={4} font="display" />
      </FlowItem>
      <FlowItem inAt={tPlaya} enter="fade" style={{left: 0, top: 0, width: 1920, height: 1080}}>
        <Sparkles points={[{x: 540, y: 240}, {x: 1360, y: 250, delay: 8}, {x: 1160, y: 700, delay: 14}]} />
      </FlowItem>
    </AbsoluteFill>
  );
};
