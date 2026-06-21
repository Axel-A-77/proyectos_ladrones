import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {RoleTitle, PhraseSwap, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {PersonBase, Outfit, Diogenes} from '../visual/People';
import {DoodleHospital, DoodleCar, DoodleWallet, DoodleCountry, DoodleDetector} from './doodles';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const Hero: React.FC<{src: string; at: number; out?: number; h?: number; left?: number; top?: number}> = ({src, at, out, h = 600, left = 640, top = 140}) => (
  <FlowItem inAt={at} outAt={out} enter="scale" exit="up" style={{left, top}}>
    <Idle amp={5} speed={30}>
      <Img src={ill(src)} style={{height: h, objectFit: 'contain'}} />
    </Idle>
  </FlowItem>
);

// 21 — ama al pueblo de lejos: en campaña lo abraza; al ganar, se desplaza (Al Capone).
export const S21: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tAlergia = f('alergia', 648);
  const tAlcapone = f('capone', 661);
  return (
    <AbsoluteFill>
      {/* divisoria: campaña | poder */}
      <div style={{position: 'absolute', left: 957, top: 150, width: 4, height: 620, background: COLORS.muted}} />
      {/* IZQUIERDA — en campaña: abraza al pueblo (PersonBase) */}
      <FlowItem inAt={0} enter="left" style={{left: 250, top: 290}}>
        <Idle amp={4} speed={28}>
          <PersonBase outfit="suit" expression="hopeful" arm="wave" height={420} flip />
        </Idle>
      </FlowItem>
      <FlowItem inAt={6} enter="up" style={{left: 110, top: 480}}>
        <PersonBase outfit="citizen" expression="hopeful" height={230} />
      </FlowItem>
      <FlowItem inAt={9} enter="up" style={{left: 560, top: 490}}>
        <PersonBase outfit="citizen" expression="neutral" height={210} skin="#d9a06b" flip />
      </FlowItem>
      <FlowItem inAt={f('campaña', 631.5)} enter="left" style={{left: 120, top: 150}}>
        <FreeText text="en campaña: te abraza" color="green" fontSize={46} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('mercados', 634)} enter="left" style={{left: 150, top: 770}}>
        <FreeText text="…besos, fotos, caldo común" color="ink" fontSize={40} rotate={2} />
      </FlowItem>
      {/* DERECHA — al ganar: se desplaza (Al Capone) */}
      <FlowItem inAt={0} enter="right" style={{left: 1080, top: 280}}>
        <Idle amp={4} speed={26}>
          <PersonBase outfit="suit" expression="smug" height={440} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tAlcapone - 24} enter="right" style={{left: 1360, top: 540}}>
        <DoodleCar height={170} />
      </FlowItem>
      <FlowItem inAt={tAlergia} enter="right" style={{left: 1140, top: 150}}>
        <FreeText text="al ganar: «alergia»" color="red" fontSize={46} rotate={3} font="display" />
      </FlowItem>
      <FlowItem inAt={tAlcapone} enter="up" style={{left: 1080, top: 770}}>
        <FreeText text="…«se desplaza» (Al Capone)" color="red" fontSize={42} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 22 — «todos roban pero hace obras»: te roba el TV pero te deja el control remoto.
export const S22: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tTele = f('televisor', 677);
  return (
    <AbsoluteFill>
      <FlowItem inAt={f('defensores', 665)} outAt={tTele - 6} enter="down" exit="up" style={{left: 480, top: 220}}>
        <FreeText text="«todos roban… pero hace obras»" color="ink" fontSize={54} rotate={-2} />
      </FlowItem>
      <Hero src="22_ladron_control_remoto.png" at={tTele} h={640} />
      <FlowItem inAt={tTele + 6} outAt={f('bondad', 680) + 4} enter="left" exit="fade" style={{left: 520, top: 120}}>
        <FreeText text="te roba el televisor…" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={f('bondad', 680)} enter="scale" style={{left: 600, top: 790}}>
        <FreeText text="…pero te deja el control. ¡qué bondad!" color="red" fontSize={48} rotate={2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 23 — «no hay pruebas»: deja consultorías, recibos, transferencias… espías de la KGB.
export const S23: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tEspias = f('espías', 697);
  return (
    <AbsoluteFill>
      <FlowItem inAt={f('pruebas', 684)} outAt={tEspias + 60} enter="scale" style={{left: 560, top: 150}}>
        <FreeText text="«no hay pruebas»…" color="ink" fontSize={54} rotate={-2} />
      </FlowItem>
      <Hero src="23_espias_clave.png" at={f('consultorías', 689.5)} h={620} />
      <FlowItem inAt={f('consultorías', 689.5) + 6} outAt={tEspias - 2} enter="left" exit="fade" style={{left: 300, top: 760}}>
        <FreeText text="…solo consultorías y recibos ambiguos" color="ink" fontSize={44} rotate={2} />
      </FlowItem>
      <FlowItem inAt={tEspias} enter="right" style={{left: 1180, top: 790}}>
        <FreeText text="…hablan en clave, como espías" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 24 — entra muerto de hambre, sale con Rolex y mansión (antes/después).
export const S24: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tMansion = f('mansión', 717);
  return (
    <AbsoluteFill>
      {/* BASE desde frame 0: el panel antes/después */}
      <Hero src="24_antes_despues_mansion.png" at={0} h={650} />
      <FlowItem inAt={f('hambre', 708)} enter="left" style={{left: 130, top: 180}}>
        <FreeText text="ANTES: muerto de hambre" color="ink" fontSize={46} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('rolex', 712.5)} enter="right" style={{left: 1230, top: 180}}>
        <FreeText text="DESPUÉS: Rolex y mansión" color="red" fontSize={46} rotate={3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('esfuerzo', 725)} enter="up" style={{left: 560, top: 790}}>
        <FreeText text="«¿cómo lo logré? con mucho esfuerzo»" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 25 — la orquesta de la corrupción: músicos desde frame 0; cada parte SE QUEDA (acumula).
export const S25: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tOrquesta = f('orquesta', 756);
  const tConcierto = f('concierto', 772);
  const partes: Array<[string, number, {left: number; top: number; rot: number}]> = [
    ['uno toca el contrato', f('contrato', 759), {left: 70, top: 250, rot: -3}],
    ['otro, el sobre', f('sobre', 761), {left: 1390, top: 250, rot: 3}],
    ['otro, la firma', f('firma', 762.5), {left: 80, top: 470, rot: 2}],
    ['otro, el silencio', f('silencio', 765), {left: 1390, top: 470, rot: -2}],
  ];
  return (
    <AbsoluteFill>
      {/* BASE desde frame 0: la "orquesta" de cómplices (PersonBase) + director */}
      {[0, 1, 2, 3].map((i) => (
        <FlowItem key={`m${i}`} inAt={i * 3} enter="up" style={{left: 560 + i * 168, top: 300}}>
          <Idle amp={4} speed={24 + i * 3}>
            <PersonBase outfit="suit" expression={i === 1 ? 'smug' : 'neutral'} arm={i === 1 ? 'up' : 'down'} height={330} />
          </Idle>
        </FlowItem>
      ))}
      <FlowItem inAt={4} outAt={tOrquesta + 8} enter="down" exit="up" style={{left: 470, top: 56}}>
        <FreeText text="un ecosistema de sabandijas…" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      {/* cada parte aparece y SE QUEDA (acumula hasta cerrar la metáfora) */}
      {partes.map(([t, at, p], i) => (
        <FlowItem key={i} inAt={at} enter={i % 2 ? 'right' : 'left'} style={{left: p.left, top: p.top}}>
          <FreeText text={t} color="ink" fontSize={42} rotate={p.rot} />
        </FlowItem>
      ))}
      <FlowItem inAt={tConcierto} enter="up" style={{left: 430, top: 790}}>
        <FreeText text="«Concierto para bribones y presupuesto en fuga»" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 26 — funcionario indignado «¿por qué a mí?»: costó como hospital, quedó como kiosko (acumula).
export const S26: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tMi = f('mí', 786);
  const tHospital = f('hospital', 791);
  const tKiosko = f('kiosko', 792.5);
  const t4x4 = f('camioneta', 803);
  const tOffshore = f('offshore', 807);
  return (
    <AbsoluteFill>
      {/* BASE desde frame 0: el funcionario indignado (mano al pecho) */}
      <FlowItem inAt={0} enter="scale" style={{left: 120, top: 300}}>
        <Idle amp={5} speed={26}>
          <PersonBase outfit="suit" expression="worried" arm="chest" height={440} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tMi} enter="down" style={{left: 150, top: 56}}>
        <BubbleBox text={<>«¿por qué a mí?»</>} tailX={56} />
      </FlowItem>
      {/* costó como HOSPITAL → quedó como KIOSKO (acumula) */}
      <FlowItem inAt={tHospital + 2} enter="down" style={{left: 540, top: 210}}>
        <FreeText text="costó como HOSPITAL…" color="ink" fontSize={44} rotate={-2} font="display" />
      </FlowItem>
      <FlowItem inAt={tHospital} enter="scale" style={{left: 600, top: 330}}>
        <DoodleHospital height={230} />
      </FlowItem>
      <FlowItem inAt={tKiosko + 2} enter="down" style={{left: 1150, top: 210}}>
        <FreeText text="…quedó como KIOSKO" color="red" fontSize={44} rotate={3} font="display" />
      </FlowItem>
      <FlowItem inAt={tKiosko} enter="scale" style={{left: 1120, top: 320}}>
        <Idle amp={4} speed={24}>
          <Img src={ill('26_kiosko_hospital.png')} style={{height: 340, objectFit: 'contain'}} />
        </Idle>
      </FlowItem>
      {/* camioneta 4x4 + cuenta offshore (acumula) */}
      <FlowItem inAt={t4x4} enter="up" style={{left: 760, top: 600}}>
        <DoodleCar height={160} />
      </FlowItem>
      <FlowItem inAt={tOffshore} enter="up" style={{left: 540, top: 790}}>
        <FreeText text="«coincidencias»: camioneta 4x4 y cuenta offshore" color="ink" fontSize={44} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 27 — no teme a la justicia: teme al Excel (la verdad desnuda en columnas).
export const S27: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tColumnas = f('columnas', 819.5);
  return (
    <AbsoluteFill>
      <Hero src="27_excel_monstruo.png" at={f('cuadro', 815)} h={640} />
      <PhraseSwap from="no teme a la justicia…" to="…teme al EXCEL" at={f('cuadro', 815)} strikeAt={f('daño', 817)} toAt={f('daño', 817) + 8} fontSize={50} style={{left: 540, top: 110}} />
      <FlowItem inAt={tColumnas} outAt={f('verdad', 823) - 2} enter="left" exit="fade" style={{left: 220, top: 780}}>
        <FreeText text="columnas · montos · fechas · proveedores" color="ink" fontSize={44} rotate={2} />
      </FlowItem>
      <FlowItem inAt={f('verdad', 823)} enter="up" style={{left: 600, top: 790}}>
        <FreeText text="…la verdad desnuda, sin maquillaje" color="red" fontSize={48} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 28 — los cuatro: «servir al pueblo» → «servirse». Dejan huella (digital, bancaria, psicológica).
export const S28: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tServir = f('servir', 841);
  const tServirse = f('servirse', 848);
  const cuatro: Array<[Outfit, string, number]> = [
    ['mayor', 'ALCALDE', f('alcalde', 836.5)],
    ['governor', 'GOBERNADOR', f('gobernador', 838)],
    ['congress', 'CONGRESISTA', f('congresista', 839)],
    ['president', 'PRESIDENTE', f('presidente', 840)],
  ];
  return (
    <AbsoluteFill>
      <RoleTitle at={6} text="LOS CUATRO" width={420} style={{left: 120, top: 60}} />
      {/* los cuatro (PersonBase) entran y SE QUEDAN como ancla visual */}
      {cuatro.map(([o, label, at], i) => (
        <React.Fragment key={i}>
          <FlowItem inAt={at} enter="down" style={{left: 170 + i * 410, top: 180}}>
            <Idle amp={5} speed={26 + i * 3}>
              <PersonBase outfit={o} expression="smug" height={360} />
            </Idle>
          </FlowItem>
          <FlowItem inAt={at + 4} enter="up" style={{left: 210 + i * 410, top: 540, width: 220, textAlign: 'center'}}>
            <FreeText text={label} color="ink" fontSize={32} rotate={i % 2 ? 2 : -2} font="display" />
          </FlowItem>
        </React.Fragment>
      ))}
      <PhraseSwap from="«servir al pueblo»" to="«servirse»" at={tServir} strikeAt={tServirse - 6} toAt={tServirse} fontSize={56} style={{left: 660, top: 590}} />
      {/* huellas: una a la vez, abajo */}
      <FlowItem inAt={f('digital', 853)} outAt={f('bancaria', 856) - 2} enter="left" exit="fade" style={{left: 540, top: 790}}>
        <FreeText text="huella digital en contratos…" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={f('bancaria', 856)} outAt={f('psicológica', 858) - 2} enter="right" exit="fade" style={{left: 540, top: 790}}>
        <FreeText text="…huella bancaria en depósitos…" color="red" fontSize={46} rotate={2} />
      </FlowItem>
      <FlowItem inAt={f('psicológica', 858)} enter="up" style={{left: 520, top: 790}}>
        <FreeText text="…y huella psicológica en el país" color="ink" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 29 — el optimista (base frame 0) y sus creencias que se acumulan; la memoria = un estado de WhatsApp.
export const S29: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tWhatsapp = f('whatsapp', 881);
  const creencias: Array<[string, number, number]> = [
    ['«nadie se dará cuenta»', f('nadie', 870), 300],
    ['«todo se olvidará»', f('olvidará', 872), 392],
    ['«el pueblo se cansará»', f('cansará', 874), 484],
    ['«la justicia se demorará»', f('justicia', 876), 576],
  ];
  return (
    <AbsoluteFill>
      {/* BASE desde frame 0: el corrupto optimista */}
      <FlowItem inAt={0} enter="scale" style={{left: 110, top: 300}}>
        <Idle amp={5} speed={26}>
          <PersonBase outfit="suit" expression="smug" height={440} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={4} outAt={creencias[0][1]} enter="down" exit="fade" style={{left: 470, top: 120}}>
        <FreeText text="el optimista cree que…" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      {/* sus creencias se ACUMULAN */}
      {creencias.map(([t, at, top], i) => (
        <FlowItem key={i} inAt={at} enter="left" style={{left: 470, top}}>
          <FreeText text={t} color="ink" fontSize={44} rotate={i % 2 ? 2 : -2} />
        </FlowItem>
      ))}
      {/* el "estado" efímero que se desvanece */}
      <Hero src="29_whatsapp_desvanece.png" at={tWhatsapp} h={420} left={1360} top={250} />
      <FlowItem inAt={tWhatsapp + 6} enter="up" style={{left: 560, top: 790}}>
        <FreeText text="…la memoria dura lo que un estado de WhatsApp" color="red" fontSize={42} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 31 — Diógenes buscaba un honesto con lámpara; aquí, con linterna, Excel, auditoría y detector.
export const S31: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tHonesto = f('honesto', 956);
  return (
    <AbsoluteFill>
      {/* BASE frame 0: jurar por la patria… calcular cuánto pesa la billetera nacional */}
      <FlowItem inAt={0} outAt={tHonesto - 6} enter="scale" exit="up" style={{left: 700, top: 320}}>
        <Idle amp={6} speed={20}>
          <DoodleWallet height={210} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={10} outAt={tHonesto - 6} enter="right" exit="up" style={{left: 1010, top: 360}}>
        <DoodleCountry height={150} />
      </FlowItem>
      <FlowItem inAt={f('jurar', 934)} outAt={tHonesto - 6} enter="down" exit="fade" style={{left: 380, top: 140}}>
        <FreeText text="al jurar por la patria… mírale los dedos" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={f('pesa', 944)} outAt={tHonesto - 6} enter="up" exit="fade" style={{left: 560, top: 700}}>
        <FreeText text="…ya calcula cuánto pesa la billetera nacional" color="red" fontSize={46} rotate={2} />
      </FlowItem>

      {/* Diógenes (SVG propio) busca un honesto */}
      <FlowItem inAt={tHonesto} enter="scale" style={{left: 200, top: 230}}>
        <Idle amp={4} speed={28}>
          <Diogenes height={560} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={tHonesto + 6} enter="down" style={{left: 560, top: 150}}>
        <FreeText text="Diógenes buscaba un hombre honesto…" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={f('linterna', 964)} enter="scale" style={{left: 1140, top: 420}}>
        <DoodleDetector height={300} />
      </FlowItem>
      <FlowItem inAt={f('linterna', 964) + 2} enter="up" style={{left: 520, top: 790}}>
        <FreeText text="…aquí: con linterna, Excel, auditoría y detector" color="red" fontSize={44} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};
