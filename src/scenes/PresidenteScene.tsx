import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {RoleTitle, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {beatAt} from './util';

// EL PRESIDENTE (7:22–8:51) — molde: personaje transitorio, texto libre, un visual
// por concepto (caen hacia arriba / comisión), flujo continuo.
export const PresidenteScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const tCaiga = f('caiga', 449.5);
  const tArriba = f('arriba', 465);
  const tAsesor = f('asesor', 466.5);
  const tAmigo = f('amigo', 469.5);
  const tAportante = f('aportante', 471);
  const tFamiliar = f('familiar', 474.5);
  const tCrea = f('crea', 485);
  const tComision = f('comisión', 487.7);
  const tMensaje = f('mensaje', 490.2);
  const tUnidad = f('unidad', 494.5);
  const tDemocracia = f('democracia', 501.1);
  const tIndignado = f('indignado', 512.2);
  const tPatria = f('patria', 526);

  const Hero: React.FC<{src: string; at: number; out?: number; h?: number}> = ({src, at, out, h = 620}) => (
    <FlowItem inAt={at} outAt={out} enter="scale" exit="up" style={{left: 640, top: 170}}>
      <Idle amp={5} speed={30}>
        <Img src={ill(src)} style={{height: h, objectFit: 'contain'}} />
      </Idle>
    </FlowItem>
  );

  // pares "el país pide X… él da Y" (rápidos, uno a la vez)
  const pares: Array<[string, string, number, number]> = [
    ['piden respuestas…', '…un mensaje a la nación', tMensaje, tUnidad - 2],
    ['piden pruebas…', '…habla de unidad', tUnidad, tDemocracia - 2],
    ['la fiscalía toca…', '…«preocupación por la democracia»', tDemocracia, tIndignado - 4],
  ];

  return (
    <AbsoluteFill>
      {/* INTRO — presidente (transitorio) + «caiga quien caiga» */}
      <FlowItem inAt={4} outAt={tArriba - 6} enter="left" exit="left" style={{left: 470, top: 280}}>
        <Idle amp={6} speed={26}>
          <Img src={ill('presidente.png')} style={{height: 580, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tCaiga} outAt={tArriba - 6} enter="scale" exit="fade" style={{left: 700, top: 180}}>
        <BubbleBox text={<>«combato la corrupción…<br />caiga quien caiga»</>} tailX={40} />
      </FlowItem>
      <RoleTitle at={6} text="EL PRESIDENTE" width={580} style={{left: 120, top: 80}} />

      {/* todos caen… hacia arriba (PNG) */}
      <Hero src="16_caen_hacia_arriba.png" at={tArriba} out={tCrea - 8} />
      <FlowItem inAt={tArriba + 6} outAt={tAsesor + 6} enter="down" exit="fade" style={{left: 560, top: 110}}>
        <FreeText text="…pero todos caen hacia ARRIBA" color="red" fontSize={52} rotate={-2} />
      </FlowItem>

      {/* lista: cada uno "cae"… hacia arriba (texto libre) */}
      <FlowItem inAt={tAsesor} outAt={tCrea - 8} enter="left" exit="fade" style={{left: 340, top: 300}}>
        <FreeText text="el asesor → un ministerio" color="ink" fontSize={44} rotate={-3} />
      </FlowItem>
      <FlowItem inAt={tAmigo} outAt={tCrea - 8} enter="right" exit="fade" style={{left: 1180, top: 360}}>
        <FreeText text="el amigo → un directorio" color="ink" fontSize={44} rotate={3} />
      </FlowItem>
      <FlowItem inAt={tAportante} outAt={tCrea - 8} enter="left" exit="fade" style={{left: 320, top: 620}}>
        <FreeText text="el aportante → una embajada" color="ink" fontSize={44} rotate={2} />
      </FlowItem>
      <FlowItem inAt={tFamiliar} outAt={tCrea - 8} enter="right" exit="fade" style={{left: 1160, top: 660}}>
        <FreeText text="el familiar → cargo de confianza" color="red" fontSize={44} rotate={-2} />
      </FlowItem>

      {/* piden justicia → él crea una COMISIÓN (PNG) */}
      <Hero src="17_presidente_comision.png" at={tCrea} out={tIndignado - 6} />
      <FlowItem inAt={tCrea + 4} outAt={tMensaje - 2} enter="down" exit="fade" style={{left: 540, top: 110}}>
        <FreeText text="piden justicia… él crea una COMISIÓN" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      {pares.map(([a, b, inn, out], i) => (
        <FlowItem key={i} inAt={inn} outAt={out} enter={i % 2 ? 'right' : 'left'} exit="fade" style={{left: 520, top: 760}}>
          <FreeText text={`${a} ${b}`} color={i === 2 ? 'red' : 'ink'} fontSize={46} rotate={i % 2 ? 2 : -2} />
        </FlowItem>
      ))}

      {/* «yo también estoy indignado» — el presidente vuelve, voz de mártir */}
      <FlowItem inAt={tIndignado - 6} enter="left" style={{left: 470, top: 300}}>
        <Idle amp={5} speed={26}>
          <Img src={ill('presidente.png')} style={{height: 560, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tIndignado} outAt={tPatria - 2} enter="scale" exit="fade" style={{left: 720, top: 200}}>
        <BubbleBox text={<>«yo también<br />estoy indignado»</>} tailX={40} />
      </FlowItem>
      <FlowItem inAt={tPatria} enter="down" style={{left: 720, top: 760}}>
        <FreeText text="…salvando la patria entre donas y café" color="red" fontSize={48} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};
