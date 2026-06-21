import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, PaperPanel, PriceTag, StampLabel} from '../visual/Infographic';
import {DoodleCar, DoodleHospital, DoodleMoneyBag} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const DoodleKiosk: React.FC<{height?: number}> = ({height = 250}) => (
  <svg height={height} viewBox="0 0 360 300" role="img" aria-label="Kiosko pequeño e improvisado">
    <path d="M48 92 L180 28 L312 92 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth="9" strokeLinejoin="round" />
    <rect x="62" y="92" width="236" height="168" rx="10" fill="#D8B27C" stroke={COLORS.ink} strokeWidth="9" />
    <rect x="96" y="132" width="168" height="78" rx="8" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="8" />
    <path d="M112 178 H248" stroke={COLORS.ink} strokeWidth="7" strokeLinecap="round" />
    <rect x="145" y="210" width="70" height="50" rx="6" fill="#8A5A2B" stroke={COLORS.ink} strokeWidth="8" />
    <rect x="92" y="54" width="176" height="50" rx="12" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="7" />
    <text x="180" y="88" textAnchor="middle" fontFamily={FONTS.display} fontSize="34" fill={COLORS.ink}>KIOSKO</text>
    <path d="M72 260 L42 286 M288 260 L318 286" stroke={COLORS.ink} strokeWidth="9" strokeLinecap="round" />
    <path d="M28 286 H332" stroke={COLORS.ink} strokeWidth="9" strokeLinecap="round" />
  </svg>
);

export const S26WorkSceneV2: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tHospital = f('hospital', 791);
  const tKiosk = f('kiosko', 792.5);
  const tCar = f('camioneta', 803);
  const tOffshore = f('offshore', 807);

  return (
    <IllustratedSlide title="EL CORRUPTO INDIGNADO">
      <FlowItem inAt={0} outAt={tHospital - 10} enter="left" exit="up" style={{left: 120, top: 175}}>
        <PersonBase outfit="suit" expression="worried" arm="chest" height={520} />
      </FlowItem>
      <FlowItem inAt={0} outAt={tHospital - 10} enter="scale" exit="fade" style={{left: 590, top: 210}}>
        <MiniCard title="POR QUÉ A MÍ" accent={COLORS.red} style={{width: 650, height: 320}}>
          <StampLabel text="TODO ES COINCIDENCIA" color={COLORS.purple} size={38} maxWidth={520} style={{left: 65, top: 120}} />
          <StampLabel text="YO NO FUI" color={COLORS.red} size={34} maxWidth={300} style={{left: 170, top: 220}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tHospital} enter="scale" style={{left: 70, top: 55}}>
        <PaperPanel style={{width: 1580, height: 735}}>
          <MiniCard title="LO QUE COSTÓ" accent={COLORS.blue} style={{left: 55, top: 75, width: 620, height: 500}}>
            <div style={{position: 'absolute', left: 145, top: 125}}><DoodleHospital height={300} /></div>
            <PriceTag text="HOSPITAL" style={{left: 145, top: 410}} />
          </MiniCard>
          <div style={{position: 'absolute', left: 710, top: 300}}><Arrow from={[0, 0]} to={[130, 0]} color={COLORS.red} /></div>
          <MiniCard title="LO QUE HICIERON" accent={COLORS.red} style={{left: 870, top: 75, width: 620, height: 500}}>
            <FlowItem inAt={tKiosk} enter="scale" style={{left: 145, top: 125}}><DoodleKiosk height={270} /></FlowItem>
            <StampLabel text="KIOSKO" color={COLORS.red} size={42} maxWidth={300} style={{left: 165, top: 405}} />
          </MiniCard>
          <FlowItem inAt={tCar} enter="up" style={{left: 455, top: 585}}><DoodleCar height={150} /></FlowItem>
          <FlowItem inAt={tOffshore} enter="up" style={{left: 935, top: 585}}><DoodleMoneyBag height={150} /></FlowItem>
          <StampLabel text="4 × 4" color={COLORS.orange} size={27} maxWidth={180} style={{left: 610, top: 625}} />
          <StampLabel text="OFFSHORE" color={COLORS.purple} size={27} maxWidth={230} style={{left: 1080, top: 625}} />
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="suit" label="LA OBRA" at={4} />
    </IllustratedSlide>
  );
};
