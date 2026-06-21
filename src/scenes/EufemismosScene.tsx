import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {PhraseSwap, RoleTitle} from '../effects/kit';
import {FlowItem, Idle} from '../effects/flow';
import {DoodleBook} from './doodles';
import {beatAt} from './util';

// 18_eufemismos (8:51–9:26) — "el diccionario del corrupto": cada frase cruda se
// tacha y se vuelve eufemismo, sincronizada a la palabra; se van acumulando (lista).
export const EufemismosScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const pairs: Array<{from: string; to: string; at: number; soft: number}> = [
    {from: '«robé»', to: '«errores administrativos»', at: f('robé', 536.5), soft: f('errores', 539.5)},
    {from: '«metí a mi primo»', to: '«personal técnico de confianza»', at: f('primo', 542), soft: f('personal', 545)},
    {from: '«me descubrieron»', to: '«hay persecución política»', at: f('descubrieron', 548), soft: f('persecución', 550.5)},
    {from: '«me enriquecí»', to: '«ingresos con sustento legal»', at: f('enriquecí', 553), soft: f('sustento', 556)},
  ];

  return (
    <AbsoluteFill>
      <RoleTitle at={6} text="EL DICCIONARIO DEL CORRUPTO" width={760} style={{left: 120, top: 70}} />
      <FlowItem inAt={10} enter="scale" style={{left: 1480, top: 250}}>
        <Idle amp={6} speed={26}>
          <DoodleBook height={210} />
        </Idle>
      </FlowItem>
      {pairs.map((p, i) => (
        <FlowItem key={i} inAt={p.at} enter="left" style={{left: 200, top: 250 + i * 158}}>
          <PhraseSwap from={p.from} to={p.to} at={p.at} strikeAt={p.soft - 6} toAt={p.soft} fontSize={48} />
        </FlowItem>
      ))}
    </AbsoluteFill>
  );
};
