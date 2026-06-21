import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase, Diogenes} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, ObjectLabel, PaperPanel, PriceTag, StampLabel} from '../visual/Infographic';
import {
  DoodleBuilding,
  DoodleCalculator,
  DoodleCar,
  DoodleCountry,
  DoodleDetector,
  DoodleEnvelope,
  DoodleHospital,
  DoodleMagnifier,
  DoodleMoneyBag,
  DoodleReceipt,
  DoodleRemote,
  DoodleTv,
  DoodleWallet,
} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const S21Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tCampaign = f('campaña', 631.5);
  const tAllergy = f('alergia', 648);
  const tCar = f('capone', 661);
  return (
    <IllustratedSlide title="ANTES Y DESPUÉS DE LA CAMPAÑA">
      <PaperPanel style={{left: 80, top: 55, width: 1580, height: 730}}>
        <div style={{position: 'absolute', left: 785, top: 45, width: 8, height: 640, background: COLORS.ink}} />
        <ObjectLabel text="CAMPAÑA" color={COLORS.green} size={52} style={{left: 260, top: 45}} />
        <ObjectLabel text="DESPUÉS" color={COLORS.red} size={52} style={{left: 1110, top: 45}} />

        <FlowItem inAt={tCampaign} enter="left" style={{left: 120, top: 175}}>
          <PersonBase outfit="suit" expression="hopeful" arm="wave" height={420} flip />
        </FlowItem>
        <FlowItem inAt={tCampaign + 4} enter="up" style={{left: 390, top: 270}}>
          <PersonBase outfit="citizen" expression="hopeful" height={280} />
        </FlowItem>
        <StampLabel text="ABRAZO" color={COLORS.green} size={36} style={{left: 250, top: 560}} />

        <FlowItem inAt={tAllergy} enter="right" style={{left: 940, top: 175}}>
          <PersonBase outfit="suit" expression="smug" height={420} />
        </FlowItem>
        <FlowItem inAt={tAllergy + 5} enter="scale" style={{left: 1235, top: 215}}>
          <div style={{width: 250, height: 150, border: `7px solid ${COLORS.ink}`, borderRadius: 24, background: COLORS.paper, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 34}}>EN REUNIÓN</div>
        </FlowItem>
        <FlowItem inAt={tCar} enter="up" style={{left: 1180, top: 465}}><DoodleCar height={180} /></FlowItem>
        <StampLabel text="ALERGIA AL CIUDADANO" color={COLORS.red} size={34} style={{left: 1020, top: 590}} />
      </PaperPanel>
      <ChapterBadge outfit="suit" label="LA CAMPAÑA" at={8} />
    </IllustratedSlide>
  );
};

export const S22Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tTV = f('televisor', 677);
  const tRemote = f('bondad', 680);
  return (
    <IllustratedSlide title="TODOS ROBAN, PERO HACE OBRAS">
      <PaperPanel style={{left: 220, top: 80, width: 1280, height: 680}}>
        <FlowItem inAt={0} enter="left" style={{left: 90, top: 180}}><PersonBase outfit="citizen" expression="worried" height={420} /></FlowItem>
        <FlowItem inAt={tTV} enter="right" style={{left: 790, top: 150}}><PersonBase outfit="suit" expression="smug" height={420} flip /></FlowItem>
        <FlowItem inAt={tTV + 3} enter="scale" style={{left: 1000, top: 315}}><DoodleTv height={190} /></FlowItem>
        <FlowItem inAt={tRemote} enter="up" style={{left: 420, top: 410}}><DoodleRemote height={170} /></FlowItem>
        <FlowItem inAt={tRemote + 5} enter="scale" style={{left: 520, top: 490}}><Arrow from={[0, 0]} to={[250, -80]} color={COLORS.red} /></FlowItem>
        <PriceTag text="LA OBRA" style={{left: 360, top: 555}} />
        <StampLabel text="SE LLEVA TODO" color={COLORS.red} size={42} style={{left: 850, top: 560}} />
      </PaperPanel>
      <ChapterBadge outfit="citizen" label="LA EXCUSA" at={8} />
    </IllustratedSlide>
  );
};

export const S23Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tConsult = f('consultorías', 689.5);
  const tSpies = f('espías', 697);
  return (
    <IllustratedSlide title="NO HAY PRUEBAS">
      <PaperPanel style={{left: 100, top: 55, width: 1520, height: 735}}>
        <StampLabel text="NO HAY PRUEBAS" color={COLORS.red} size={48} style={{left: 560, top: 35}} />
        <FlowItem inAt={tConsult} enter="left" style={{left: 80, top: 170}}>
          <MiniCard title="CONSULTORÍAS" accent={COLORS.blue} style={{width: 360, height: 260}}><div style={{position: 'absolute', left: 95, top: 95}}><DoodleEnvelope height={140} /></div></MiniCard>
        </FlowItem>
        <FlowItem inAt={tConsult + 5} enter="up" style={{left: 500, top: 170}}>
          <MiniCard title="RECIBOS" accent={COLORS.orange} style={{width: 360, height: 260}}><div style={{position: 'absolute', left: 100, top: 85}}><DoodleReceipt height={160} /></div></MiniCard>
        </FlowItem>
        <FlowItem inAt={tConsult + 10} enter="right" style={{left: 920, top: 170}}>
          <MiniCard title="TRANSFERENCIAS" accent={COLORS.green} style={{width: 420, height: 260}}><div style={{position: 'absolute', left: 120, top: 92}}><DoodleMoneyBag height={150} /></div></MiniCard>
        </FlowItem>
        <FlowItem inAt={tSpies} enter="up" style={{left: 380, top: 450}}><PersonBase outfit="suit" expression="smug" shades height={300} /></FlowItem>
        <FlowItem inAt={tSpies + 3} enter="up" style={{left: 750, top: 450}}><PersonBase outfit="suit" expression="neutral" shades height={300} flip /></FlowItem>
        <StampLabel text="HABLAN EN CLAVE" color={COLORS.purple} size={36} style={{left: 570, top: 590}} />
      </PaperPanel>
      <ChapterBadge outfit="suit" label="LAS PRUEBAS" at={8} />
    </IllustratedSlide>
  );
};

export const S24Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tBefore = f('hambre', 708);
  const tAfter = f('rolex', 712.5);
  const tEffort = f('esfuerzo', 725);
  return (
    <IllustratedSlide title="EL MILAGRO PRIVADO">
      <PaperPanel style={{left: 80, top: 55, width: 1580, height: 730}}>
        <div style={{position: 'absolute', left: 785, top: 35, width: 8, height: 650, background: COLORS.ink}} />
        <ObjectLabel text="ANTES" color={COLORS.muted} size={54} style={{left: 260, top: 35}} />
        <ObjectLabel text="DESPUÉS" color={COLORS.red} size={54} style={{left: 1080, top: 35}} />
        <FlowItem inAt={tBefore} enter="left" style={{left: 220, top: 190}}><PersonBase outfit="citizen" expression="sad" build="thin" height={430} /></FlowItem>
        <FlowItem inAt={tAfter} enter="right" style={{left: 950, top: 180}}><PersonBase outfit="suit" expression="greedy" build="fat" height={430} /></FlowItem>
        <FlowItem inAt={tAfter + 4} enter="scale" style={{left: 1240, top: 230}}><DoodleBuilding height={310} /></FlowItem>
        <PriceTag text="ROLEX" style={{left: 1050, top: 555}} />
        <FlowItem inAt={tEffort} enter="scale" style={{left: 570, top: 560}}><StampLabel text="MUCHO ESFUERZO" color={COLORS.green} size={42} /></FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="suit" label="EL CAMBIO" at={8} />
    </IllustratedSlide>
  );
};

export const S26Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tHospital = f('hospital', 791);
  const tKiosk = f('kiosko', 792.5);
  const tCar = f('camioneta', 803);
  const tOffshore = f('offshore', 807);
  return (
    <IllustratedSlide title="LO QUE COSTÓ Y LO QUE HICIERON">
      <PaperPanel style={{left: 70, top: 55, width: 1580, height: 730}}>
        <MiniCard title="PRESUPUESTO" accent={COLORS.blue} style={{left: 60, top: 80, width: 620, height: 500}}>
          <FlowItem inAt={tHospital} enter="scale" style={{left: 145, top: 125}}><DoodleHospital height={300} /></FlowItem>
          <PriceTag text="COSTÓ COMO HOSPITAL" style={{left: 150, top: 410, transform: 'scale(.85)'}} />
        </MiniCard>
        <div style={{position: 'absolute', left: 715, top: 300}}><Arrow from={[0, 0]} to={[130, 0]} color={COLORS.red} /></div>
        <MiniCard title="RESULTADO" accent={COLORS.red} style={{left: 870, top: 80, width: 620, height: 500}}>
          <FlowItem inAt={tKiosk} enter="scale" style={{left: 145, top: 150}}><DoodleBuilding height={250} /></FlowItem>
          <StampLabel text="KIOSKO" color={COLORS.red} size={46} style={{left: 200, top: 405}} />
        </MiniCard>
        <FlowItem inAt={tCar} enter="up" style={{left: 470, top: 585}}><DoodleCar height={150} /></FlowItem>
        <FlowItem inAt={tOffshore} enter="up" style={{left: 930, top: 585}}><DoodleMoneyBag height={150} /></FlowItem>
        <StampLabel text="4×4" color={COLORS.orange} size={28} style={{left: 620, top: 625}} />
        <StampLabel text="OFFSHORE" color={COLORS.purple} size={28} style={{left: 1080, top: 625}} />
      </PaperPanel>
      <ChapterBadge outfit="suit" label="LA OBRA" at={8} />
    </IllustratedSlide>
  );
};

export const S28Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tServe = f('servir', 841);
  const tSelf = f('servirse', 848);
  const tBank = f('bancaria', 856);
  return (
    <IllustratedSlide title="SERVIR O SERVIRSE">
      <PaperPanel style={{left: 100, top: 55, width: 1520, height: 730}}>
        <FlowItem inAt={tServe} enter="left" style={{left: 80, top: 120}}>
          <MiniCard title="SERVIR AL PUEBLO" accent={COLORS.green} style={{width: 560, height: 470}}>
            <div style={{position: 'absolute', left: 70, top: 130}}><PersonBase outfit="citizen" expression="hopeful" height={300} /></div>
            <div style={{position: 'absolute', left: 310, top: 150}}><DoodleCountry height={230} /></div>
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tSelf} enter="scale" style={{left: 700, top: 320}}><Arrow from={[0, 0]} to={[130, 0]} color={COLORS.red} /></FlowItem>
        <FlowItem inAt={tSelf} enter="right" style={{left: 860, top: 120}}>
          <MiniCard title="SERVIRSE DEL PUEBLO" accent={COLORS.red} style={{width: 560, height: 470}}>
            <div style={{position: 'absolute', left: 70, top: 130}}><PersonBase outfit="suit" expression="greedy" build="fat" height={300} /></div>
            <div style={{position: 'absolute', left: 330, top: 175}}><DoodleWallet height={180} /></div>
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tBank} enter="up" style={{left: 510, top: 615}}><StampLabel text="HUELLA EN CONTRATOS · BANCO · PAÍS" color={COLORS.purple} size={34} /></FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="president" label="SERVIRSE" at={8} />
    </IllustratedSlide>
  );
};

export const S29Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const beliefs = [
    ['NADIE SE DARÁ CUENTA', f('nadie', 870), 70],
    ['TODO SE OLVIDARÁ', f('olvidará', 872), 230],
    ['EL PUEBLO SE CANSARÁ', f('cansará', 874), 390],
    ['LA JUSTICIA DEMORARÁ', f('justicia', 876), 550],
  ] as const;
  const tWhats = f('whatsapp', 881);
  return (
    <IllustratedSlide title="EL OPTIMISTA DEL OLVIDO">
      <FlowItem inAt={0} enter="left" style={{left: 120, top: 210}}><PersonBase outfit="suit" expression="smug" height={500} /></FlowItem>
      <PaperPanel style={{left: 520, top: 55, width: 1030, height: 730}}>
        {beliefs.map(([text, at, top], i) => (
          <FlowItem key={text} inAt={at} enter="right" style={{left: 55, top: Number(top)}}>
            <MiniCard title={`${i + 1}`} accent={i === 3 ? COLORS.red : COLORS.blue} style={{width: 780, height: 125}}>
              <div style={{position: 'absolute', left: 100, top: 52, fontFamily: FONTS.display, fontSize: 33}}>{text}</div>
            </MiniCard>
          </FlowItem>
        ))}
        <FlowItem inAt={tWhats} enter="scale" style={{left: 820, top: 250}}>
          <div style={{width: 145, height: 250, border: `8px solid ${COLORS.ink}`, borderRadius: 28, background: COLORS.paper, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 32}}>24 h</div>
        </FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="suit" label="EL OLVIDO" at={8} />
    </IllustratedSlide>
  );
};

export const S31Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tHonest = f('honesto', 956);
  const tLamp = f('lámpara', 958);
  const tExcel = f('excel', 965);
  const tDetector = f('detector', 970);
  return (
    <IllustratedSlide title="BUSCANDO HONESTIDAD">
      <PaperPanel style={{left: 130, top: 70, width: 1460, height: 690}}>
        <FlowItem inAt={tHonest} enter="left" style={{left: 80, top: 140}}><Diogenes height={470} /></FlowItem>
        <FlowItem inAt={tLamp} enter="scale" style={{left: 520, top: 85}}>
          <MiniCard title="LÁMPARA" accent={COLORS.gold} style={{width: 300, height: 230}}><div style={{position: 'absolute', left: 95, top: 95, width: 100, height: 100, borderRadius: '50%', background: COLORS.gold, border: `7px solid ${COLORS.ink}`}} /></MiniCard>
        </FlowItem>
        <FlowItem inAt={tExcel} enter="scale" style={{left: 880, top: 85}}>
          <MiniCard title="AUDITORÍA" accent={COLORS.blue} style={{width: 350, height: 230}}><div style={{position: 'absolute', left: 100, top: 85}}><DoodleReceipt height={135} /></div></MiniCard>
        </FlowItem>
        <FlowItem inAt={tDetector} enter="up" style={{left: 700, top: 390}}><DoodleDetector height={250} /></FlowItem>
        <FlowItem inAt={tDetector + 5} enter="scale" style={{left: 850, top: 550}}><StampLabel text="DETECTOR DE METALES" color={COLORS.red} size={34} /></FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="auditor" label="DIÓGENES" at={8} />
    </IllustratedSlide>
  );
};
