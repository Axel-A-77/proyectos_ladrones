import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {PhraseSwap, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {ThinHumble, FatGlutton, DoodlePot, DoodleSpoon} from './doodles';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};
type CK = 'ink' | 'red' | 'gold' | 'green' | 'cream' | 'white' | 'night' | 'muted';

// 04 — llega "muerto de hambre", discurso lleno de palabras nobles (texto libre).
export const S04: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const palabras: Array<[string, string, number, {left: number; top: number; color: CK; rot: number; big?: boolean}]> = [
    ['PUEBLO', 'pueblo', 113, {left: 980, top: 230, color: 'green', rot: -3, big: true}],
    ['FUTURO', 'futuro', 113.6, {left: 1400, top: 300, color: 'gold', rot: 3, big: true}],
    ['transparencia', 'transparencia', 114, {left: 940, top: 430, color: 'ink', rot: -2}],
    ['desarrollo', 'desarrollo', 114.6, {left: 1380, top: 470, color: 'green', rot: 3}],
    ['cambio', 'cambio', 115, {left: 1010, top: 600, color: 'red', rot: -3}],
    ['justicia social', 'justicia', 115.5, {left: 1300, top: 660, color: 'ink', rot: 2}],
  ];
  return (
    <AbsoluteFill>
      {/* BASE desde frame 0: el candidato humilde (muerto de hambre) */}
      <FlowItem inAt={0} enter="left" style={{left: 250, top: 280}}>
        <Idle amp={5} speed={28}>
          <ThinHumble height={640} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={10} outAt={f('palabras', 111)} enter="scale" exit="fade" style={{left: 330, top: 140}}>
        <BubbleBox text={<>«vengo a servir<br />al pueblo…»</>} tailX={48} />
      </FlowItem>
      {/* las palabras nobles se ACUMULAN alrededor (nube) */}
      {palabras.map(([t, kw, sec, p], i) => (
        <FlowItem key={i} inAt={f(kw, sec)} enter={i % 2 ? 'right' : 'left'} style={{left: p.left, top: p.top}}>
          <FreeText text={t} color={p.color} fontSize={p.big ? 58 : 48} rotate={p.rot} font={p.big ? 'display' : 'hand'} />
        </FlowItem>
      ))}
    </AbsoluteFill>
  );
};

// 05 — descubre el "PRESUPUESTO" y se sirve con cuchara grande (texto libre).
export const S05: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  return (
    <AbsoluteFill>
      <FlowItem inAt={6} enter="left" style={{left: 280, top: 250}}>
        <Idle amp={5} speed={24}>
          <FatGlutton height={640} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={f('presupuesto', 124.5)} enter="down" style={{left: 320, top: 660}}>
        <DoodlePot height={230} />
      </FlowItem>
      <FlowItem inAt={f('cuchara', 134.5)} enter="scale" style={{left: 545, top: 410}}>
        <DoodleSpoon height={240} />
      </FlowItem>
      <FlowItem inAt={f('presupuesto', 124.5)} outAt={f('servir', 130)} enter="scale" exit="up" style={{left: 1080, top: 220}}>
        <FreeText text="¡PRESUPUESTO!" color="gold" fontSize={64} rotate={-3} font="display" />
      </FlowItem>
      <PhraseSwap from="«servir al ciudadano»" to="«servirse»" at={f('servir', 130)} strikeAt={f('servirse', 132.5)} toAt={f('servirse', 132.5) + 8} fontSize={46} style={{left: 1060, top: 360}} />
      <FlowItem inAt={f('plato', 135.8)} outAt={f('postre', 137.5) + 50} enter="left" exit="fade" style={{left: 1100, top: 560}}>
        <FreeText text="…repetir el plato" color="ink" fontSize={46} rotate={2} />
      </FlowItem>
      <FlowItem inAt={f('postre', 137.5)} enter="right" style={{left: 1080, top: 680}}>
        <FreeText text="…y postre con viáticos" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 06 — abraza al pueblo… para robarle la billetera. Bocadillo apuntando al político (derecha).
export const S06: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  return (
    <AbsoluteFill>
      <FlowItem inAt={6} enter="scale" style={{left: 320, top: 240}}>
        <Idle amp={4} speed={28}>
          <Img src={ill('06_abrazo_roba_billetera.png')} style={{height: 660, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      {/* el político (derecha) es quien habla: la viñeta lo apunta */}
      <FlowItem inAt={f('abrazando', 146.5)} outAt={f('billetera', 149) + 4} enter="scale" exit="fade" style={{left: 700, top: 120}}>
        <BubbleBox text={<>«te abrazo,<br />pueblo querido»</>} tailX={56} />
      </FlowItem>
      <PhraseSwap from="«por amor al pueblo»" to="«…por amor a la billetera»" at={f('amor', 144)} strikeAt={f('billetera', 149)} toAt={f('billetera', 149) + 8} fontSize={46} style={{left: 1060, top: 470}} />
    </AbsoluteFill>
  );
};
