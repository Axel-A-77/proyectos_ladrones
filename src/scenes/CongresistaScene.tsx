import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {RoleTitle, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {DoodleStamp, DoodleScroll, DoodleClock, DoodleMoneyBag, DoodleCurul} from './doodles';
import {ChapterBadge} from '../visual/ChapterBadge';
import {PersonBase} from '../visual/People';
import {beatAt} from './util';

// EL CONGRESISTA (5:59–7:12) — molde: personaje transitorio, un visual por concepto
// (sello/ley/reloj + dormido/mueble), texto libre, flujo continuo.
export const CongresistaScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const tReglamento = f('reglamento', 360.2);
  const tSello = f('sello', 360.5);
  const tLey = f('ley', 361);
  const tDebate = f('debate', 374);
  const tVotar = f('votar', 376.5);
  const tReloj = f('reloj', 381.6);
  const tDefendiendo = f('defendiendo', 387.3);
  const tMueble = f('mueble', 391);
  const tSobreprecio = f('sobreprecio', 395.7);
  const tFiscalizar = f('fiscalizar', 408.4);
  const tSueldo = f('sueldo', 416.2);
  const tBono = f('bono', 417.5);
  const tViaje = f('viaje', 418.8);
  const tGasolina = f('gasolina', 422.5);
  const tDignidad = f('dignidad', 426.5);

  const Hero: React.FC<{src: string; at: number; out?: number}> = ({src, at, out}) => (
    <FlowItem inAt={at} outAt={out} enter="scale" exit="up" style={{left: 640, top: 170}}>
      <Idle amp={5} speed={30}>
        <Img src={ill(src)} style={{height: 620, objectFit: 'contain'}} />
      </Idle>
    </FlowItem>
  );

  return (
    <AbsoluteFill>
      {/* INTRO — congresista (transitorio) */}
      <FlowItem inAt={4} outAt={tDebate - 6} enter="left" exit="left" style={{left: 470, top: 250}}>
        <Idle amp={6} speed={26}>
          <PersonBase outfit="congress" expression="smug" height={580} />
        </Idle>
      </FlowItem>
      <RoleTitle at={6} text="EL CONGRESISTA" width={600} style={{left: 120, top: 80}} />

      {/* "no roba con pala… roba con reglamento, sello, proyectos de ley" */}
      <FlowItem inAt={tReglamento} outAt={tDebate - 6} enter="down" exit="fade" style={{left: 600, top: 180}}>
        <FreeText text="no roba con pala…" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tSello} outAt={tDebate - 6} enter="scale" exit="up" style={{left: 1000, top: 440}}>
        <DoodleStamp height={180} />
      </FlowItem>
      <FlowItem inAt={tLey} outAt={tDebate - 6} enter="scale" exit="up" style={{left: 1280, top: 430}}>
        <DoodleScroll height={200} />
      </FlowItem>
      <FlowItem inAt={tSello + 6} outAt={tDebate - 6} enter="right" exit="fade" style={{left: 760, top: 320}}>
        <FreeText text="…roba con reglamento, sello, ley" color="red" fontSize={44} rotate={2} />
      </FlowItem>

      {/* duerme en el debate: congresista en su CURUL (PersonBase, sin clipart realista) */}
      <FlowItem inAt={tDebate} outAt={tMueble - 8} enter="scale" exit="up" style={{left: 660, top: 250}}>
        <Idle amp={3} speed={34}>
          <PersonBase outfit="congress" expression="tired" height={440} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tDebate} outAt={tMueble - 8} enter="up" exit="up" style={{left: 600, top: 500}}>
        <DoodleCurul height={230} />
      </FlowItem>
      <FlowItem inAt={tDebate + 10} outAt={tMueble - 8} enter="scale" exit="fade" style={{left: 920, top: 240}}>
        <FreeText text="Zzz" color="muted" fontSize={60} rotate={8} font="display" />
      </FlowItem>
      <FlowItem inAt={tDebate + 6} outAt={tVotar - 2} enter="left" exit="fade" style={{left: 70, top: 330}}>
        <FreeText text="duerme en el debate…" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tVotar} outAt={tReloj - 2} enter="left" exit="fade" style={{left: 70, top: 330}}>
        <FreeText text="…despierta para votar" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>

      {/* puntual como reloj suizo (reloj a la derecha, texto a la izquierda) */}
      <FlowItem inAt={tReloj} outAt={tMueble - 8} enter="scale" exit="up" style={{left: 1430, top: 520}}>
        <DoodleClock height={200} />
      </FlowItem>
      <FlowItem inAt={tReloj + 2} outAt={tDefendiendo - 2} enter="left" exit="fade" style={{left: 70, top: 330}}>
        <FreeText text="puntual como reloj suizo" color="red" fontSize={46} rotate={-2} />
      </FlowItem>

      {/* «defendiendo la democracia» — bocadillo ARRIBA apuntando al congresista,
          presente toda la sección (la ironía: duerme pero "defiende la democracia") */}
      <FlowItem inAt={tDebate + 14} outAt={tMueble - 6} enter="down" exit="fade" style={{left: 700, top: 40}}>
        <BubbleBox text={<>«…defendiendo la democracia»</>} tailX={70} />
      </FlowItem>

      {/* mueble de lujo con SOBREPRECIO (PNG) */}
      <Hero src="15_mueble_lujo.png" at={tMueble} out={tFiscalizar - 6} />
      <FlowItem inAt={tMueble + 6} outAt={tFiscalizar - 6} enter="down" exit="fade" style={{left: 560, top: 110}}>
        <FreeText text="un mueble de lujo…" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tSobreprecio} outAt={tFiscalizar - 6} enter="scale" exit="fade" style={{left: 1280, top: 760}}>
        <FreeText text="¡SOBREPRECIO!" color="red" fontSize={58} rotate={4} font="display" />
      </FlowItem>

      {/* se fiscalizan solos — bolsa central (se llena el bolsillo) + lista */}
      <FlowItem inAt={tFiscalizar} enter="scale" style={{left: 560, top: 130}}>
        <FreeText text="«fiscalizo el poder»… se fiscalizan solos:" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tSueldo - 8} enter="up" style={{left: 830, top: 420}}>
        <Idle amp={6} speed={22}>
          <DoodleMoneyBag height={300} shades />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tSueldo} enter="left" style={{left: 360, top: 380}}>
        <FreeText text="+ su sueldo" color="green" fontSize={52} rotate={-4} font="display" />
      </FlowItem>
      <FlowItem inAt={tBono} enter="right" style={{left: 1300, top: 400}}>
        <FreeText text="+ el bono" color="green" fontSize={52} rotate={4} font="display" />
      </FlowItem>
      <FlowItem inAt={tViaje} enter="left" style={{left: 320, top: 620}}>
        <FreeText text="+ el viaje" color="green" fontSize={52} rotate={3} font="display" />
      </FlowItem>
      <FlowItem inAt={tGasolina} enter="right" style={{left: 1300, top: 640}}>
        <FreeText text="+ la gasolina" color="green" fontSize={52} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={tDignidad} enter="down" style={{left: 620, top: 790}}>
        <FreeText text="…hasta viáticos a la dignidad" color="red" fontSize={50} rotate={-2} />
      </FlowItem>
      <ChapterBadge outfit="congress" label="EL CONGRESISTA" at={10} />
    </AbsoluteFill>
  );
};
