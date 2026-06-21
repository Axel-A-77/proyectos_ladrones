import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {RoleTitle, KenBurns, ill} from '../effects/kit';
import {FlowItem, Idle, FreeText} from '../effects/flow';
import {DoodleHouse, DoodleWindow, DoodleSofa, DoodleTollbooth, DoodleKey} from './doodles';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

// 02 — el silencio cómplice de los que callan (texto libre, sin cuadros).
export const S02: React.FC<P> = ({fromSec, durationInFrames}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 120}}>
        <KenBurns src={ill('02_silencio_complice.png')} durationInFrames={durationInFrames} from={1.04} to={1.16} style={{height: 600, objectFit: 'contain'}} />
      </AbsoluteFill>
      <RoleTitle at={6} text="EL SILENCIO CÓMPLICE" width={620} style={{left: 120, top: 90}} />
      <FlowItem inAt={f('callar', 78)} enter="left" style={{left: 230, top: 760}}>
        <FreeText text="los que callan…" color="ink" fontSize={50} rotate={-3} />
      </FlowItem>
      <FlowItem inAt={f('impunidad', 79.5)} enter="right" style={{left: 1260, top: 740}}>
        <FreeText text="…son la IMPUNIDAD" color="red" fontSize={54} rotate={3} font="display" />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 03 — recibe las LLAVES de la CASA del pueblo y empieza a vender las VENTANAS,
// alquilar la SALA y poner PEAJE al baño. Doodles en código, texto libre, flujo.
export const S03: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tLlaves = f('llaves', 89.6);
  const tCasa = f('casa', 90.2);
  const tVent = f('ventanas', 93.7);
  const tSala = f('sala', 95.4);
  const tPeaje = f('peaje', 96.4);
  return (
    <AbsoluteFill>
      {/* definición: entra y se va antes de la casa (texto libre) */}
      <FlowItem inAt={f('poder', 82)} outAt={tLlaves - 8} enter="left" exit="up" style={{left: 520, top: 120}}>
        <FreeText text="abuso del PODER" color="ink" fontSize={56} rotate={-2} font="display" />
      </FlowItem>
      <FlowItem inAt={f('privado', 85.5)} outAt={tLlaves - 8} enter="right" exit="up" style={{left: 1050, top: 130}}>
        <FreeText text="= beneficio PRIVADO" color="red" fontSize={56} rotate={2} font="display" />
      </FlowItem>

      {/* las llaves (breve) */}
      <FlowItem inAt={tLlaves} outAt={tCasa + 22} enter="scale" exit="up" style={{left: 600, top: 210}}>
        <DoodleKey height={90} />
      </FlowItem>

      {/* la casa: ancla (se queda con flote sutil) */}
      <FlowItem inAt={tCasa} enter="scale" style={{left: 690, top: 300}}>
        <Idle amp={5} speed={30}>
          <DoodleHouse height={460} />
        </Idle>
      </FlowItem>

      {/* ventana SE VENDE (entra y sale) */}
      <FlowItem inAt={tVent} outAt={tSala + 28} enter="left" exit="left" style={{left: 230, top: 380}}>
        <DoodleWindow height={200} />
      </FlowItem>
      <FlowItem inAt={tVent + 4} outAt={tSala + 28} enter="left" exit="fade" style={{left: 215, top: 330}}>
        <FreeText text="SE VENDE" color="red" fontSize={46} rotate={-4} font="display" />
      </FlowItem>

      {/* sofá EN ALQUILER (entra y sale) */}
      <FlowItem inAt={tSala} outAt={tPeaje + 30} enter="left" exit="left" style={{left: 250, top: 660}}>
        <DoodleSofa height={170} />
      </FlowItem>
      <FlowItem inAt={tSala + 4} outAt={tPeaje + 30} enter="left" exit="fade" style={{left: 240, top: 610}}>
        <FreeText text="EN ALQUILER" color="ink" fontSize={44} rotate={3} font="display" />
      </FlowItem>

      {/* peaje (entra y se queda) */}
      <FlowItem inAt={tPeaje} enter="right" style={{left: 1420, top: 470}}>
        <DoodleTollbooth height={230} />
      </FlowItem>
      <FlowItem inAt={tPeaje + 4} enter="right" style={{left: 1340, top: 410}}>
        <FreeText text="PEAJE AL BAÑO" color="red" fontSize={46} rotate={3} font="display" />
      </FlowItem>
    </AbsoluteFill>
  );
};
