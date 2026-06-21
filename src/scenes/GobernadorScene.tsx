import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {RoleTitle, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {DoodleBench, DoodleBulb, DoodleTrafficLight, DoodleHospital, DoodleRoad, DoodleSchool, DoodleBridge} from './doodles';
import {beatAt} from './util';

// EL GOBERNADOR (3:22–4:50) — molde: personaje transitorio, texto libre, un visual
// por concepto (banca/foco/semáforo + puente/hospital/Caribe/piedra), flujo continuo.
export const GobernadorScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const tBancas = f('bancas', 205);
  const tFocos = f('focos', 207);
  const tSemaforos = f('semáforos', 209);
  const tHosp1 = f('hospitales', 218);
  const tCarreteras = f('carreteras', 219.3);
  const tColegios = f('colegios', 220.3);
  const tPuentes = f('puentes', 221.3);
  const tMega = f('megaproyectos', 222);
  const tMonumental = f('monumental', 227);
  const tPuente = f('puente', 229.5);
  const tHospital = f('hospital', 240);
  const tCaribe = f('caribe', 258);
  const tSacrif = f('sacrifico', 264);
  const tPiedra = f('piedra', 279);

  const Hero: React.FC<{src: string; at: number; out?: number}> = ({src, at, out}) => (
    <FlowItem inAt={at} outAt={out} enter="scale" exit="up" style={{left: 620, top: 150}}>
      <Idle amp={5} speed={30}>
        <Img src={ill(src)} style={{height: 660, objectFit: 'contain'}} />
      </Idle>
    </FlowItem>
  );

  return (
    <AbsoluteFill>
      {/* INTRO — gobernador (transitorio) + bocadillo apuntándolo */}
      <FlowItem inAt={4} outAt={tBancas + 10} enter="left" exit="left" style={{left: 470, top: 300}}>
        <Idle amp={6} speed={26}>
          <Img src={ill('gobernador.png')} style={{height: 560, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={20} outAt={tBancas + 6} enter="scale" exit="fade" style={{left: 700, top: 190}}>
        <BubbleBox text={<>«yo juego en<br />ligas mayores»</>} tailX={40} />
      </FlowItem>
      <RoleTitle at={6} text="EL GOBERNADOR" width={560} style={{left: 120, top: 80}} />

      {/* "no le bastan bancas, focos, semáforos" — visual + etiqueta por cosa */}
      <FlowItem inAt={tBancas + 14} outAt={tHosp1 - 16} enter="left" exit="fade" style={{left: 600, top: 150}}>
        <FreeText text="…eso le queda chico" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tBancas + 14} outAt={tHosp1 - 16} enter="down" exit="up" style={{left: 250, top: 360}}>
        <DoodleBench height={260} />
      </FlowItem>
      <FlowItem inAt={tBancas + 18} outAt={tHosp1 - 16} enter="up" exit="fade" style={{left: 360, top: 730}}>
        <FreeText text="bancas" color="ink" fontSize={52} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={tFocos} outAt={tHosp1 - 16} enter="down" exit="up" style={{left: 870, top: 350}}>
        <DoodleBulb height={290} />
      </FlowItem>
      <FlowItem inAt={tFocos + 4} outAt={tHosp1 - 16} enter="up" exit="fade" style={{left: 900, top: 730}}>
        <FreeText text="focos" color="gold" fontSize={52} rotate={2} font="display" />
      </FlowItem>
      <FlowItem inAt={tSemaforos} outAt={tHosp1 - 16} enter="down" exit="up" style={{left: 1410, top: 340}}>
        <DoodleTrafficLight height={300} />
      </FlowItem>
      <FlowItem inAt={tSemaforos + 4} outAt={tHosp1 - 16} enter="up" exit="fade" style={{left: 1330, top: 730}}>
        <FreeText text="semáforos" color="green" fontSize={52} rotate={-2} font="display" />
      </FlowItem>

      {/* "sueña en grande: hospitales, carreteras, colegios, puentes" — un ícono por cosa */}
      <FlowItem inAt={tHosp1 - 12} outAt={tPuente - 10} enter="scale" style={{left: 580, top: 70}}>
        <FreeText text="él sueña en GRANDE…" color="ink" fontSize={56} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tHosp1} outAt={tPuente - 10} enter="down" exit="up" style={{left: 150, top: 360}}>
        <DoodleHospital height={210} />
      </FlowItem>
      <FlowItem inAt={tHosp1 + 4} outAt={tPuente - 10} enter="up" exit="fade" style={{left: 160, top: 610}}>
        <FreeText text="hospitales" color="ink" fontSize={40} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tCarreteras} outAt={tPuente - 10} enter="down" exit="up" style={{left: 560, top: 390}}>
        <DoodleRoad height={185} />
      </FlowItem>
      <FlowItem inAt={tCarreteras + 4} outAt={tPuente - 10} enter="up" exit="fade" style={{left: 580, top: 610}}>
        <FreeText text="carreteras" color="ink" fontSize={40} rotate={2} />
      </FlowItem>
      <FlowItem inAt={tColegios} outAt={tPuente - 10} enter="down" exit="up" style={{left: 1000, top: 375}}>
        <DoodleSchool height={195} />
      </FlowItem>
      <FlowItem inAt={tColegios + 4} outAt={tPuente - 10} enter="up" exit="fade" style={{left: 1030, top: 610}}>
        <FreeText text="colegios" color="ink" fontSize={40} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tPuentes} outAt={tPuente - 10} enter="down" exit="up" style={{left: 1430, top: 410}}>
        <DoodleBridge height={170} />
      </FlowItem>
      <FlowItem inAt={tPuentes + 4} outAt={tPuente - 10} enter="up" exit="fade" style={{left: 1470, top: 610}}>
        <FreeText text="puentes" color="ink" fontSize={40} rotate={2} />
      </FlowItem>
      <FlowItem inAt={tMonumental} outAt={tPuente - 8} enter="up" style={{left: 520, top: 820}}>
        <FreeText text="…todo «monumental» y difícil de fiscalizar" color="red" fontSize={46} rotate={-2} />
      </FlowItem>

      {/* puente = dos cuentas */}
      <Hero src="09_gobernador_puente_cuentas.png" at={tPuente} out={tHospital - 10} />
      <FlowItem inAt={tPuente + 6} outAt={tHospital - 10} enter="down" exit="fade" style={{left: 560, top: 120}}>
        <FreeText text="no une pueblos… une dos CUENTAS" color="red" fontSize={50} rotate={-2} />
      </FlowItem>

      {/* hospital con más placas que médicos */}
      <Hero src="10_hospital_placas.png" at={tHospital} out={tCaribe - 10} />
      <FlowItem inAt={tHospital + 6} outAt={tCaribe - 10} enter="down" exit="fade" style={{left: 560, top: 120}}>
        <FreeText text="más placas que médicos" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>

      {/* el Caribe + su frase */}
      <Hero src="11_dinero_caribe.png" at={tCaribe} out={tPiedra - 10} />
      <FlowItem inAt={tCaribe + 6} outAt={tSacrif - 4} enter="down" exit="fade" style={{left: 560, top: 120}}>
        <FreeText text="…o en una cuenta del Caribe" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tSacrif} outAt={tPiedra - 10} enter="scale" exit="fade" style={{left: 560, top: 120}}>
        <FreeText text="«yo me sacrifico por mi pueblo»" color="red" fontSize={50} rotate={-2} />
      </FlowItem>

      {/* primera piedra, pero sin segunda */}
      <Hero src="12_primera_piedra.png" at={tPiedra} />
      <FlowItem inAt={tPiedra + 6} enter="down" style={{left: 560, top: 120}}>
        <FreeText text="primera piedra…" color="ink" fontSize={52} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={tPiedra + 30} enter="right" style={{left: 1180, top: 760}}>
        <FreeText text="…pero sin segunda" color="red" fontSize={48} rotate={3} />
      </FlowItem>
    </AbsoluteFill>
  );
};
