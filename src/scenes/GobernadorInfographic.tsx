import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, PaperPanel, PriceTag, StampLabel} from '../visual/Infographic';
import {CaribbeanIllustration} from '../visual/CaribbeanIllustration';
import {DoodleBench, DoodleBridge, DoodleBulb, DoodleHospital, DoodleMoneyBag, DoodleRoad, DoodleSchool, DoodleStone, DoodleTrafficLight} from './doodles';
import {COLORS} from '../theme';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const GobernadorInfographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tBancas = f('bancas', 205);
  const tHosp = f('hospitales', 218);
  const tPuente = f('puente', 229.5);
  const tCaribe = f('caribe', 258);
  const tPiedra = f('piedra', 279);

  return (
    <IllustratedSlide title="EL GOBERNADOR: LIGAS MAYORES">
      <FlowItem inAt={0} outAt={tBancas + 12} enter="left" exit="up" style={{left: 70, top: 190}}>
        <PersonBase outfit="governor" expression="smug" height={520} />
      </FlowItem>
      <FlowItem inAt={8} outAt={tBancas + 12} enter="scale" exit="fade" style={{left: 610, top: 220}}>
        <StampLabel text="SUEÑA EN GRANDE" color={COLORS.purple} size={54} maxWidth={520} />
      </FlowItem>

      <FlowItem inAt={tBancas} outAt={tHosp - 8} enter="scale" exit="up" style={{left: 80, top: 55}}>
        <PaperPanel style={{width: 1560, height: 730}}>
          <MiniCard title="BANCAS" accent={COLORS.blue} style={{left: 35, top: 80, width: 430, height: 520}}>
            <div style={{position: 'absolute', left: 85, top: 150}}><DoodleBench height={250} /></div>
          </MiniCard>
          <MiniCard title="FOCOS" accent={COLORS.gold} style={{left: 545, top: 80, width: 430, height: 520}}>
            <div style={{position: 'absolute', left: 120, top: 145}}><DoodleBulb height={280} /></div>
          </MiniCard>
          <MiniCard title="SEMÁFOROS" accent={COLORS.green} style={{left: 1055, top: 80, width: 430, height: 520}}>
            <div style={{position: 'absolute', left: 140, top: 130}}><DoodleTrafficLight height={300} /></div>
          </MiniCard>
          <PriceTag text="LE QUEDA CHICO" style={{left: 610, top: 600}} />
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tHosp} outAt={tPuente - 8} enter="scale" exit="up" style={{left: 70, top: 40}}>
        <PaperPanel style={{width: 1580, height: 760}}>
          <MiniCard title="HOSPITAL" accent={COLORS.red} style={{left: 20, top: 90, width: 360, height: 520}}><div style={{position: 'absolute', left: 55, top: 150}}><DoodleHospital height={260} /></div></MiniCard>
          <MiniCard title="CARRETERA" accent={COLORS.orange} style={{left: 410, top: 90, width: 360, height: 520}}><div style={{position: 'absolute', left: 45, top: 190}}><DoodleRoad height={210} /></div></MiniCard>
          <MiniCard title="COLEGIO" accent={COLORS.blue} style={{left: 800, top: 90, width: 360, height: 520}}><div style={{position: 'absolute', left: 75, top: 155}}><DoodleSchool height={250} /></div></MiniCard>
          <MiniCard title="PUENTE" accent={COLORS.purple} style={{left: 1190, top: 90, width: 360, height: 520}}><div style={{position: 'absolute', left: 25, top: 210}}><DoodleBridge height={150} /></div></MiniCard>
          <StampLabel text="MEGAPROYECTOS" color={COLORS.red} size={46} maxWidth={520} style={{left: 520, top: 625}} />
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tPuente} outAt={tCaribe - 8} enter="scale" exit="up" style={{left: 100, top: 80}}>
        <PaperPanel style={{width: 1500, height: 690}}>
          <MiniCard title="PUENTE" accent={COLORS.purple} style={{left: 40, top: 90, width: 650, height: 480}}>
            <div style={{position: 'absolute', left: 70, top: 180}}><DoodleBridge height={200} /></div>
            <StampLabel text="UNE DOS CUENTAS" color={COLORS.red} size={32} maxWidth={420} style={{left: 120, top: 390}} />
          </MiniCard>
          <FlowItem inAt={tPuente + 10} enter="scale" style={{left: 715, top: 300}}><Arrow from={[0, 0]} to={[120, 0]} color={COLORS.red} /></FlowItem>
          <MiniCard title="HOSPITAL" accent={COLORS.red} style={{left: 850, top: 90, width: 600, height: 480}}>
            <div style={{position: 'absolute', left: 145, top: 120}}><DoodleHospital height={270} /></div>
            <PriceTag text="MÁS PLACAS" style={{left: 135, top: 375, transform: 'scale(.84)'}} />
          </MiniCard>
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tCaribe} enter="scale" style={{left: 70, top: 35}}>
        <PaperPanel style={{width: 1600, height: 770}}>
          <div style={{position: 'absolute', left: 35, top: 65}}><CaribbeanIllustration width={980} /></div>
          <FlowItem inAt={tCaribe + 5} enter="right" style={{left: 1080, top: 190}}><DoodleMoneyBag height={230} /></FlowItem>
          <FlowItem inAt={tCaribe + 9} enter="scale" style={{left: 1040, top: 420}}>
            <StampLabel text="CUENTA DEL CARIBE" color={COLORS.red} size={34} maxWidth={430} />
          </FlowItem>
          <FlowItem inAt={tPiedra} enter="up" style={{left: 1160, top: 545}}><DoodleStone height={160} /></FlowItem>
          <FlowItem inAt={tPiedra + 6} enter="scale" style={{left: 1000, top: 645}}><PriceTag text="PRIMERA PIEDRA" /></FlowItem>
        </PaperPanel>
      </FlowItem>

      <ChapterBadge outfit="governor" label="EL GOBERNADOR" at={4} />
    </IllustratedSlide>
  );
};
