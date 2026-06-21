import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {RoleTitle, KenBurns, MoneyRain, ill} from '../effects/kit';
import {FlowItem, Idle, FreeText} from '../effects/flow';
import {DoodleRoad, DoodleHospital, DoodleSchool, DoodleWaterDrop, DoodleMoneyBag} from './doodles';
import {beatAt} from './util';

// 13_magia_negra (4:50–5:51) — "el gran sacrificio" + la oficina de magia donde el
// dinero entra, se apagan las luces y… ya no está. Flujo continuo todo el tramo.
export const MagiaScene: React.FC<{durationInFrames: number; fromSec: number}> = ({durationInFrames, fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const tIlusion = f('ilusionismo', 308);
  const tEntra = f('contribuyentes', 319.5);
  const tYaNo = f('está', 329.5);

  // adiós: pistas, hospitales, colegios, agua (íconos en fila, abajo)
  const adios: Array<[string, string, number, React.FC<{height?: number}>, number]> = [
    ['adiós pistas', 'pistas', 295, DoodleRoad, 170],
    ['adiós hospitales', 'hospitales', 296, DoodleHospital, 620],
    ['adiós colegios', 'colegios', 297, DoodleSchool, 1080],
    ['adiós agua', 'agua', 298.5, DoodleWaterDrop, 1560],
  ];

  // secuencia: cada frase entra y SALE cuando llega la siguiente (flujo).
  const beats: Array<[string, string, number, 'ink' | 'red']> = [
    ['puro «ilusionismo administrativo»', 'ilusionismo', 308, 'ink'],
    ['no son oficinas… son de MAGIA NEGRA', 'negra', 316, 'red'],
    ['entra el dinero de los contribuyentes…', 'contribuyentes', 319.5, 'ink'],
    ['se apagan las luces…', 'luces', 324, 'ink'],
    ['alguien dice «gestión transparente»', 'transparente', 325.8, 'ink'],
    ['…y el dinero YA NO ESTÁ', 'está', 329.5, 'red'],
    ['solo queda: una carpeta, 3 sellos, 5 comisiones', 'carpeta', 333.5, 'ink'],
    ['«estamos evaluando responsabilidades»', 'evaluando', 338.5, 'ink'],
    ['la región no avanza… se eleva hacia la DEUDA', 'deuda', 347, 'red'],
  ];
  const beatAtN = (i: number) => f(beats[i][1], beats[i][2]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 30}}>
        <KenBurns src={ill('13_magia_negra.png')} durationInFrames={durationInFrames} from={1.04} to={1.16} style={{height: 520, objectFit: 'contain'}} />
      </AbsoluteFill>
      <MoneyRain count={16} width={1920} height={1080} color="green" />
      <RoleTitle at={6} text="EL GRAN SACRIFICIO" width={600} style={{left: 120, top: 60}} />

      {/* adiós a las obras (íconos que se sacrifican) */}
      {adios.map(([t, kw, sec, Icon, x], i) => (
        <React.Fragment key={i}>
          <FlowItem inAt={f(kw, sec)} outAt={tIlusion - 6} enter="down" exit="up" style={{left: x, top: 600}}>
            <Icon height={150} />
          </FlowItem>
          <FlowItem inAt={f(kw, sec) + 4} outAt={tIlusion - 6} enter="up" exit="fade" style={{left: x - 6, top: 780}}>
            <FreeText text={t} color={i === 3 ? 'red' : 'ink'} fontSize={42} rotate={i % 2 ? 2 : -2} font="display" />
          </FlowItem>
        </React.Fragment>
      ))}

      {/* la bolsa de dinero: entra… y desaparece */}
      <FlowItem inAt={tEntra} outAt={tYaNo} enter="right" exit="scale" style={{left: 1480, top: 320}}>
        <Idle amp={6} speed={22}>
          <DoodleMoneyBag height={220} shades />
        </Idle>
      </FlowItem>

      {/* secuencia de frases (una a la vez) */}
      {beats.map(([t, , , color], i) => (
        <FlowItem key={i} inAt={beatAtN(i)} outAt={i < beats.length - 1 ? beatAtN(i + 1) - 2 : undefined} enter={i % 2 ? 'right' : 'left'} exit="fade" style={{left: 360, top: 640}}>
          <FreeText text={t} color={color} fontSize={50} rotate={i % 2 ? 2 : -2} />
        </FlowItem>
      ))}
    </AbsoluteFill>
  );
};
