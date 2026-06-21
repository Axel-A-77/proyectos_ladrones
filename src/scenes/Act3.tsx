import React from 'react';
import {AbsoluteFill, Img, useVideoConfig} from 'remotion';
import {RoleTitle, PhraseSwap, ill} from '../effects/kit';
import {FlowItem, Idle, BubbleBox, FreeText} from '../effects/flow';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const Hero: React.FC<{src: string; at: number; out?: number; h?: number; left?: number; top?: number}> = ({src, at, out, h = 620, left = 640, top = 170}) => (
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
      <Hero src="21_campana_vs_alcapone.png" at={f('lejos', 629)} h={640} />
      <FlowItem inAt={f('campaña', 631.5)} outAt={tAlergia - 4} enter="left" exit="fade" style={{left: 150, top: 150}}>
        <FreeText text="en campaña: te abraza" color="green" fontSize={50} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('mercados', 634)} outAt={tAlergia - 4} enter="left" exit="fade" style={{left: 180, top: 760}}>
        <FreeText text="…besos, fotos, caldo común" color="ink" fontSize={44} rotate={2} />
      </FlowItem>
      <FlowItem inAt={tAlergia} outAt={tAlcapone + 60} enter="right" exit="fade" style={{left: 1180, top: 160}}>
        <FreeText text="al ganar: «alergia al ciudadano»" color="red" fontSize={44} rotate={3} />
      </FlowItem>
      <FlowItem inAt={tAlcapone} enter="up" style={{left: 720, top: 800}}>
        <FreeText text="ahora «se desplaza», como Al Capone S. XXI" color="red" fontSize={46} rotate={-2} font="display" />
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
      <FlowItem inAt={f('bondad', 680)} enter="scale" style={{left: 600, top: 800}}>
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
      <FlowItem inAt={tEspias} enter="right" style={{left: 1180, top: 800}}>
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
      <Hero src="24_antes_despues_mansion.png" at={f('milagros', 706)} h={640} />
      <FlowItem inAt={f('hambre', 708)} outAt={tMansion + 70} enter="left" exit="fade" style={{left: 160, top: 200}}>
        <FreeText text="ANTES: muerto de hambre" color="ink" fontSize={48} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('rolex', 712.5)} outAt={tMansion + 70} enter="right" exit="fade" style={{left: 1280, top: 200}}>
        <FreeText text="DESPUÉS: Rolex y mansión" color="red" fontSize={48} rotate={3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('esfuerzo', 725)} enter="up" style={{left: 560, top: 810}}>
        <FreeText text="«¿cómo lo logré? con mucho esfuerzo»" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 25 — la orquesta de la corrupción: cada uno toca su parte (contrato, sobre, firma, silencio).
export const S25: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tOrquesta = f('orquesta', 756);
  const tConcierto = f('concierto', 772);
  const partes: Array<[string, number, {left: number; top: number; rot: number}]> = [
    ['uno toca el contrato', f('contrato', 759), {left: 240, top: 200, rot: -3}],
    ['otro, el sobre', f('sobre', 761), {left: 1380, top: 240, rot: 3}],
    ['otro, la firma', f('firma', 762.5), {left: 220, top: 760, rot: 2}],
    ['otro, el silencio', f('silencio', 765), {left: 1340, top: 780, rot: -2}],
  ];
  return (
    <AbsoluteFill>
      <FlowItem inAt={f('sabandijas', 743)} outAt={tOrquesta - 6} enter="down" exit="up" style={{left: 440, top: 220}}>
        <FreeText text="necesita un ecosistema de sabandijas…" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <Hero src="25_orquesta.png" at={tOrquesta} h={620} />
      {partes.map(([t, at, p], i) => (
        <FlowItem key={i} inAt={at} outAt={tConcierto - 4} enter={i % 2 ? 'right' : 'left'} exit="fade" style={{left: p.left, top: p.top}}>
          <FreeText text={t} color="ink" fontSize={44} rotate={p.rot} />
        </FlowItem>
      ))}
      <FlowItem inAt={tConcierto} enter="scale" style={{left: 430, top: 820}}>
        <FreeText text="«Concierto para bribones y presupuesto en fuga»" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 26 — «¿por qué a mí?»: la obra costó como hospital y quedó como kiosko.
export const S26: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tKiosko = f('kiosko', 792.5);
  return (
    <AbsoluteFill>
      <Hero src="26_kiosko_hospital.png" at={f('mí', 786)} h={710} />
      <FlowItem inAt={f('mí', 786)} outAt={f('hospital', 791) - 4} enter="scale" exit="fade" style={{left: 700, top: 110}}>
        <BubbleBox text={<>«¿por qué a mí?»</>} tailX={48} />
      </FlowItem>
      <FlowItem inAt={f('hospital', 791)} outAt={f('coincidencia', 799) + 50} enter="left" exit="fade" style={{left: 150, top: 200}}>
        <FreeText text="costó como HOSPITAL…" color="ink" fontSize={48} rotate={-3} font="display" />
      </FlowItem>
      <FlowItem inAt={tKiosko} outAt={f('coincidencia', 799) + 50} enter="right" exit="fade" style={{left: 1320, top: 780}}>
        <FreeText text="…quedó como KIOSKO" color="red" fontSize={48} rotate={3} font="display" />
      </FlowItem>
      <FlowItem inAt={f('offshore', 807)} enter="up" style={{left: 440, top: 930}}>
        <FreeText text="«coincidencias» con camioneta 4x4 y cuenta offshore" color="ink" fontSize={44} rotate={-2} />
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
      <FlowItem inAt={f('verdad', 823)} enter="up" style={{left: 600, top: 800}}>
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
  const cuatro: Array<[string, string, number]> = [
    ['alcalde.png', 'ALCALDE', f('alcalde', 836.5)],
    ['gobernador.png', 'GOBERNADOR', f('gobernador', 838)],
    ['congresista.png', 'CONGRESISTA', f('congresista', 839)],
    ['presidente.png', 'PRESIDENTE', f('presidente', 840)],
  ];
  return (
    <AbsoluteFill>
      <RoleTitle at={6} text="LOS CUATRO" width={420} style={{left: 120, top: 60}} />
      {/* los cuatro entran y SE QUEDAN como ancla visual */}
      {cuatro.map(([src, label, at], i) => (
        <React.Fragment key={i}>
          <FlowItem inAt={at} enter="down" style={{left: 150 + i * 430, top: 150}}>
            <Idle amp={5} speed={26 + i * 3}>
              <Img src={ill(src)} style={{height: 330, objectFit: 'contain'}} />
            </Idle>
          </FlowItem>
          <FlowItem inAt={at + 4} enter="up" style={{left: 180 + i * 430, top: 500}}>
            <FreeText text={label} color="ink" fontSize={32} rotate={i % 2 ? 2 : -2} font="display" />
          </FlowItem>
        </React.Fragment>
      ))}
      <PhraseSwap from="«servir al pueblo»" to="«servirse»" at={tServir} strikeAt={tServirse - 6} toAt={tServirse} fontSize={56} style={{left: 660, top: 590}} />
      {/* huellas: una a la vez, abajo */}
      <FlowItem inAt={f('digital', 853)} outAt={f('bancaria', 856) - 2} enter="left" exit="fade" style={{left: 540, top: 830}}>
        <FreeText text="huella digital en contratos…" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={f('bancaria', 856)} outAt={f('psicológica', 858) - 2} enter="right" exit="fade" style={{left: 540, top: 830}}>
        <FreeText text="…huella bancaria en depósitos…" color="red" fontSize={46} rotate={2} />
      </FlowItem>
      <FlowItem inAt={f('psicológica', 858)} enter="up" style={{left: 520, top: 830}}>
        <FreeText text="…y huella psicológica en el país" color="ink" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 29 — optimista: «nadie se dará cuenta»… la memoria dura lo que un estado de WhatsApp.
export const S29: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tWhatsapp = f('whatsapp', 881);
  const creencias: Array<[string, number, {left: number; top: number; rot: number}]> = [
    ['…todo se olvidará', f('olvidará', 872), {left: 230, top: 250, rot: -3}],
    ['…el pueblo se cansará', f('cansará', 874), {left: 1280, top: 300, rot: 3}],
    ['…la justicia se demorará', f('justicia', 876), {left: 260, top: 560, rot: 2}],
  ];
  return (
    <AbsoluteFill>
      <FlowItem inAt={f('nadie', 870)} outAt={tWhatsapp - 6} enter="scale" exit="fade" style={{left: 520, top: 130}}>
        <FreeText text="«nadie se dará cuenta»…" color="ink" fontSize={54} rotate={-2} />
      </FlowItem>
      {creencias.map(([t, at, p], i) => (
        <FlowItem key={i} inAt={at} outAt={tWhatsapp - 6} enter={i % 2 ? 'right' : 'left'} exit="fade" style={{left: p.left, top: p.top}}>
          <FreeText text={t} color="ink" fontSize={46} rotate={p.rot} />
        </FlowItem>
      ))}
      <Hero src="29_whatsapp_desvanece.png" at={tWhatsapp} h={560} />
      <FlowItem inAt={tWhatsapp + 6} enter="up" style={{left: 520, top: 820}}>
        <FreeText text="…la memoria dura lo que un estado de WhatsApp" color="red" fontSize={46} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};

// 31 — Diógenes buscaba un honesto con lámpara; aquí, con linterna, Excel, auditoría y detector.
export const S31: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tLampara = f('lámpara', 959);
  return (
    <AbsoluteFill>
      <FlowItem inAt={f('jurar', 934)} outAt={f('honesto', 956) - 6} enter="down" exit="up" style={{left: 480, top: 200}}>
        <FreeText text="al jurar por la patria… mírale los dedos" color="ink" fontSize={50} rotate={-2} />
      </FlowItem>
      <Hero src="31_diogenes_lampara.png" at={f('honesto', 956)} h={710} />
      <FlowItem inAt={f('honesto', 956) + 6} outAt={f('linterna', 964) - 2} enter="left" exit="fade" style={{left: 480, top: 110}}>
        <FreeText text="Diógenes buscaba un hombre honesto…" color="ink" fontSize={48} rotate={-2} />
      </FlowItem>
      <FlowItem inAt={f('linterna', 964)} enter="up" style={{left: 360, top: 930}}>
        <FreeText text="…aquí: linterna, Excel, auditoría y detector de metales" color="red" fontSize={44} rotate={-2} />
      </FlowItem>
    </AbsoluteFill>
  );
};
