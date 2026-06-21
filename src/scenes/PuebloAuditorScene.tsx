import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {RoleTitle} from '../effects/kit';
import {FlowItem, Idle, FreeText} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {DoodleMagnifier, DoodleReceipt, DoodleCalculator} from './doodles';
import {beatAt} from './util';

// 30_pueblo_auditor — el pueblo deja de ser público y se vuelve AUDITOR y FISCALIZADOR.
// Base desde frame 0 (el ciudadano) y se LLENA progresivamente (frase visual).
export const PuebloAuditorScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const tCiud = f('ciudadanos', 889);
  const tTijera = f('tijera', 894);
  const tFactura = f('factura', 898.8);
  const tPublico = f('público', 911.9);
  const tAuditor = f('auditor', 914.6);
  const tFiscal = f('fiscalizador', 916.8);

  return (
    <AbsoluteFill>
      <RoleTitle at={6} text="EL CIUDADANO AUDITOR" width={700} style={{left: 120, top: 60}} />

      {/* BASE desde frame 0: el ciudadano (mira con sospecha) */}
      <FlowItem inAt={0} enter="scale" style={{left: 130, top: 300}}>
        <Idle amp={5} speed={28}>
          <PersonBase outfit="auditor" expression="smug" height={440} arm="chest" />
        </Idle>
      </FlowItem>

      {/* más ciudadanos se suman (derecha) */}
      {[0, 1, 2].map((i) => (
        <FlowItem key={i} inAt={tCiud + i * 8} enter="up" style={{left: 1300 + i * 150, top: 430}}>
          <PersonBase outfit="citizen" expression={i === 1 ? 'hopeful' : 'neutral'} height={290} skin={i === 2 ? '#d9a06b' : '#E8B98A'} />
        </FlowItem>
      ))}

      {/* factura + lupa (revisan cuánto costó) */}
      <FlowItem inAt={tFactura} enter="scale" style={{left: 600, top: 360}}>
        <Idle amp={4} speed={24}>
          <DoodleReceipt height={300} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tTijera} enter="scale" style={{left: 700, top: 320}}>
        <DoodleMagnifier height={240} />
      </FlowItem>
      <FlowItem inAt={tTijera + 2} enter="down" style={{left: 540, top: 180}}>
        <FreeText text="¿cuánto costó la tijera?" color="ink" fontSize={46} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tFactura + 2} enter="left" style={{left: 560, top: 700}}>
        <FreeText text="…revisan la FACTURA" color="red" fontSize={48} rotate={2} font="display" />
      </FlowItem>

      {/* calculadora */}
      <FlowItem inAt={tPublico} enter="up" style={{left: 950, top: 480}}>
        <DoodleCalculator height={250} />
      </FlowItem>

      {/* CLÍMAX: AUDITOR + FISCALIZADOR */}
      <FlowItem inAt={tAuditor} enter="scale" style={{left: 1180, top: 150}}>
        <FreeText text="AUDITOR" color="green" fontSize={76} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={tFiscal} enter="scale" style={{left: 1150, top: 270}}>
        <FreeText text="FISCALIZADOR" color="green" fontSize={62} rotate={2} font="display" />
      </FlowItem>

      <ChapterBadge outfit="auditor" label="EL AUDITOR" at={10} />
    </AbsoluteFill>
  );
};
