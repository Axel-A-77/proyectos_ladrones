import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, PaperPanel, PriceTag, StampLabel} from '../visual/Infographic';
import {DoodleBuilding, DoodleCar, DoodleHospital, DoodleMoneyBag} from './doodles';
import {COLORS} from '../theme';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

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
        <MiniCard title="POR QUE A MI" accent={COLORS.red} style={{width: 650, height: 320}}>
          <StampLabel text="TODO ES COINCIDENCIA" color={COLORS.purple} size={38} maxWidth={520} style={{left: 65, top: 120}} />
          <StampLabel text="YO NO FUI" color={COLORS.red} size={34} maxWidth={300} style={{left: 170, top: 220}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tHospital} enter="scale" style={{left: 70, top: 55}}>
        <PaperPanel style={{width: 1580, height: 735}}>
          <MiniCard title="LO QUE COSTO" accent={COLORS.blue} style={{left: 55, top: 75, width: 620, height: 500}}>
            <div style={{position: 'absolute', left: 145, top: 125}}><DoodleHospital height={300} /></div>
            <PriceTag text="HOSPITAL" style={{left: 145, top: 410}} />
          </MiniCard>
          <div style={{position: 'absolute', left: 710, top: 300}}><Arrow from={[0, 0]} to={[130, 0]} color={COLORS.red} /></div>
          <MiniCard title="LO QUE HICIERON" accent={COLORS.red} style={{left: 870, top: 75, width: 620, height: 500}}>
            <FlowItem inAt={tKiosk} enter="scale" style={{left: 145, top: 145}}><DoodleBuilding height={250} /></FlowItem>
            <StampLabel text="KIOSKO" color={COLORS.red} size={42} maxWidth={300} style={{left: 165, top: 405}} />
          </MiniCard>
          <FlowItem inAt={tCar} enter="up" style={{left: 455, top: 585}}><DoodleCar height={150} /></FlowItem>
          <FlowItem inAt={tOffshore} enter="up" style={{left: 935, top: 585}}><DoodleMoneyBag height={150} /></FlowItem>
          <StampLabel text="4 X 4" color={COLORS.orange} size={27} maxWidth={180} style={{left: 610, top: 625}} />
          <StampLabel text="OFFSHORE" color={COLORS.purple} size={27} maxWidth={230} style={{left: 1080, top: 625}} />
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="suit" label="LA OBRA" at={4} />
    </IllustratedSlide>
  );
};
