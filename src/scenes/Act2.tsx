import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {RoleTitle, ill} from '../effects/kit';
import {FlowItem, Idle, FreeText} from '../effects/flow';
import {DoodleScroll, DoodleScissors} from './doodles';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const Hero: React.FC<{src: string; at: number; out?: number; h?: number}> = ({src, at, out, h = 620}) => (
  <FlowItem inAt={at} outAt={out} enter="scale" exit="up" style={{left: 640, top: 170}}>
    <Idle amp={5} speed={30}>
      <Img src={ill(src)} style={{height: h, objectFit: 'contain'}} />
    </Idle>
  </FlowItem>
);

// 19 — no firma contratos, firma "novelas de misterio"; empresas champiñón (9:26–9:57).
export const S19: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tNovelas = f('novelas', 569);
  const tChampinon = f('champiñones', 581.5);
  const tExperiencia = f('experiencia', 584.2);
  const tCochera = f('cochera', 595);
  return (
    <AbsoluteFill>
      {/* BASE frame 0: el "contrato" (novela de misterio) + intro */}
      <FlowItem inAt={0} outAt={tChampinon - 8} enter="scale" exit="up" style={{left: 840, top: 380}}>
        <Idle amp={5} speed={26}>
          <DoodleScroll height={250} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={4} outAt={tChampinon - 8} enter="down" exit="up" style={{left: 360, top: 250}}>
        <FreeText text="no firma contratos…" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tNovelas + 6} outAt={tChampinon - 8} enter="right" exit="fade" style={{left: 380, top: 620}}>
        <FreeText text="…firma novelas de misterio" color="red" fontSize={48} rotate={2} />
      </FlowItem>

      {/* las empresas champiñón */}
      <Hero src="19_empresa_champinon.png" at={tChampinon} h={640} />
      <FlowItem inAt={tChampinon + 4} outAt={tExperiencia - 2} enter="down" exit="fade" style={{left: 520, top: 110}}>
        <FreeText text="empresas que aparecen de la nada…" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tExperiencia} outAt={tCochera - 2} enter="left" exit="fade" style={{left: 540, top: 110}}>
        <FreeText text="…con «experiencia» justo en lo que se necesita" color="ink" fontSize={46} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tCochera} enter="up" style={{left: 600, top: 790}}>
        <FreeText text="…creadas el martes, en una cochera con wifi" color="red" fontSize={46} rotate={2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 20 — el arte de la inauguración; lo importante es cortar la cinta (9:57–10:28).
export const S20: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tEscalera = f('escalera', 600.4);
  const tPosta = f('posta', 603);
  const tCarretera = f('carretera', 603.6);
  const tPlaza = f('plaza', 605.9);
  const tCinta = f('cinta', 611.3);
  const tPiedra = f('piedra', 619.4);
  const tCartel = f('cartel', 624.5);
  const sinObra: Array<[string, number, {left: number; top: number; rot: number}]> = [
    ['una escalera sin baranda', tEscalera, {left: 340, top: 300, rot: -3}],
    ['una posta sin médicos', tPosta, {left: 1240, top: 340, rot: 3}],
    ['una carretera sin asfalto', tCarretera, {left: 320, top: 600, rot: 2}],
    ['una plaza sin árboles', tPlaza, {left: 1260, top: 640, rot: -2}],
  ];
  return (
    <AbsoluteFill>
      <RoleTitle at={6} text="EL ARTE DE INAUGURAR" width={640} style={{left: 120, top: 80}} />
      {sinObra.map(([t, at, p], i) => (
        <FlowItem key={i} inAt={at} outAt={tCinta - 6} enter={i % 2 ? 'right' : 'left'} exit="fade" style={{left: p.left, top: p.top}}>
          <FreeText text={t} color="ink" fontSize={46} rotate={p.rot} />
        </FlowItem>
      ))}

      {/* lo importante: cortar la cinta (sagrada) */}
      <FlowItem inAt={tCinta} outAt={tPiedra - 8} enter="scale" exit="up" style={{left: 840, top: 420}}>
        <Idle amp={6} speed={24}>
          <DoodleScissors height={240} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tCinta + 2} outAt={tPiedra - 8} enter="down" exit="fade" style={{left: 560, top: 200}}>
        <FreeText text="lo importante es cortar la cinta…" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tCinta + 16} outAt={tPiedra - 8} enter="left" exit="fade" style={{left: 700, top: 720}}>
        <FreeText text="¡la cinta es SAGRADA!" color="red" fontSize={54} rotate={3} font="display" />
      </FlowItem>

      {/* inauguran… una piedra (PNG) + cartel */}
      <Hero src="20_inauguracion_piedra.png" at={tPiedra} h={620} />
      <FlowItem inAt={tPiedra + 6} outAt={tCartel - 2} enter="down" exit="fade" style={{left: 560, top: 110}}>
        <FreeText text="mañana inauguran… una PIEDRA" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tCartel} enter="scale" style={{left: 640, top: 790}}>
        <FreeText text="«Gestión que cumple»" color="gold" fontSize={58} rotate={-2} font="display" />
      </FlowItem>
    </AbsoluteFill>
  );
};
