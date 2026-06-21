import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {RoleTitle} from '../effects/kit';
import {FlowItem, Idle, FreeText} from '../effects/flow';
import {DoodleHouse, DoodleWindow, DoodleSofa, DoodleTollbooth, DoodleKey, DoodleWallet} from './doodles';
import {PersonBase} from '../visual/People';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

// 02 — el silencio cómplice: ciudadanos que callan mientras roban (PersonBase).
export const S02: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  return (
    <AbsoluteFill>
      <RoleTitle at={6} text="EL SILENCIO CÓMPLICE" width={620} style={{left: 120, top: 70}} />
      {/* BASE frame 0: los ciudadanos que callan (boca sellada) */}
      <FlowItem inAt={0} enter="left" style={{left: 170, top: 300}}>
        <Idle amp={4} speed={30}>
          <PersonBase outfit="citizen" expression="tired" height={430} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={6} enter="up" style={{left: 430, top: 320}}>
        <Idle amp={4} speed={26}>
          <PersonBase outfit="citizen" expression="worried" height={410} skin="#d9a06b" flip />
        </Idle>
      </FlowItem>
      <FlowItem inAt={12} enter="right" style={{left: 690, top: 300}}>
        <Idle amp={4} speed={28}>
          <PersonBase outfit="citizen" expression="tired" height={430} skin="#c98a5a" />
        </Idle>
      </FlowItem>
      {/* la billetera que se roban mientras callan */}
      <FlowItem inAt={f('callar', 78)} enter="right" style={{left: 1180, top: 380}}>
        <Idle amp={7} speed={20}>
          <DoodleWallet height={190} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={f('callar', 78)} enter="left" style={{left: 230, top: 770}}>
        <FreeText text="al callar…" color="ink" fontSize={50} rotate={-3} />
      </FlowItem>
      <FlowItem inAt={f('impunidad', 79.5)} enter="right" style={{left: 1160, top: 720}}>
        <FreeText text="…le dan IMPUNIDAD" color="red" fontSize={54} rotate={3} font="display" />
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

      {/* la casa: BASE desde frame 0 (ancla con flote sutil) */}
      <FlowItem inAt={4} enter="scale" style={{left: 690, top: 300}}>
        <Idle amp={5} speed={30}>
          <DoodleHouse height={460} />
        </Idle>
      </FlowItem>

      {/* ventana SE VENDE — SE QUEDA (acumula) */}
      <FlowItem inAt={tVent} enter="left" style={{left: 230, top: 380}}>
        <DoodleWindow height={200} />
      </FlowItem>
      <FlowItem inAt={tVent + 4} enter="left" style={{left: 215, top: 330}}>
        <FreeText text="SE VENDE" color="red" fontSize={46} rotate={-4} font="display" />
      </FlowItem>

      {/* sofá EN ALQUILER — SE QUEDA (acumula) */}
      <FlowItem inAt={tSala} enter="left" style={{left: 250, top: 660}}>
        <DoodleSofa height={170} />
      </FlowItem>
      <FlowItem inAt={tSala + 4} enter="left" style={{left: 240, top: 610}}>
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
