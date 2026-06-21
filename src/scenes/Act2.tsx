import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleBuilding, DoodleHospital, DoodleRoad, DoodleScissors, DoodleScroll, DoodleStone, DoodleTree} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const S19: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tMystery = f('novelas', 569);
  const tMushroom = f('champiñones', 581.5);
  const tExperience = f('experiencia', 584.2);
  const tGarage = f('cochera', 595);

  return (
    <IllustratedSlide title="EL CONTRATO MISTERIOSO">
      <PaperPanel style={{left: 90, top: 55, width: 1540, height: 735}}>
        <FlowItem inAt={0} enter="scale" style={{left: 565, top: 120}}><DoodleScroll height={330} /></FlowItem>
        <FlowItem inAt={tMystery} enter="scale" style={{left: 490, top: 60}}><StampLabel text="NOVELA DE MISTERIO" color={COLORS.purple} size={44} /></FlowItem>

        <FlowItem inAt={tMushroom} enter="left" style={{left: 40, top: 390}}>
          <MiniCard title="EMPRESA NUEVA" accent={COLORS.orange} style={{width: 420, height: 260}}>
            <div style={{position: 'absolute', left: 110, top: 90}}><DoodleBuilding height={135} /></div>
            <StampLabel text="NACIÓ AYER" color={COLORS.red} size={28} style={{left: 90, top: 190}} />
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tExperience} enter="up" style={{left: 560, top: 420}}>
          <MiniCard title="EXPERIENCIA" accent={COLORS.green} style={{width: 420, height: 230}}>
            <div style={{position: 'absolute', left: 35, right: 35, top: 95, fontFamily: FONTS.display, fontSize: 34, textAlign: 'center'}}>JUSTO EN LO QUE SE NECESITA</div>
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tGarage} enter="right" style={{left: 1080, top: 390}}>
          <MiniCard title="DOMICILIO" accent={COLORS.blue} style={{width: 400, height: 260}}>
            <div style={{position: 'absolute', left: 88, top: 88}}><DoodleBuilding height={135} /></div>
            <StampLabel text="COCHERA + WIFI" color={COLORS.red} size={28} style={{left: 62, top: 190}} />
          </MiniCard>
        </FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="suit" label="EL CONTRATO" at={8} />
    </IllustratedSlide>
  );
};

export const S20: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tStairs = f('escalera', 600.4);
  const tClinic = f('posta', 603);
  const tRoad = f('carretera', 603.6);
  const tSquare = f('plaza', 605.9);
  const tRibbon = f('cinta', 611.3);
  const tStone = f('piedra', 619.4);
  const tSign = f('cartel', 624.5);

  return (
    <IllustratedSlide title="EL ARTE DE INAUGURAR">
      <PaperPanel style={{left: 70, top: 45, width: 1580, height: 750}}>
        <FlowItem inAt={tStairs} enter="left" style={{left: 35, top: 60}}>
          <MiniCard title="ESCALERA" accent={COLORS.orange} style={{width: 350, height: 270}}>
            <div style={{position: 'absolute', left: 85, top: 100}}>{[0, 1, 2, 3].map((i) => <div key={i} style={{width: 160 - i * 25, height: 28, background: COLORS.muted, border: `4px solid ${COLORS.ink}`, marginLeft: i * 25}} />)}</div>
            <StampLabel text="SIN BARANDA" color={COLORS.red} size={25} style={{left: 72, top: 210}} />
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tClinic} enter="up" style={{left: 420, top: 60}}>
          <MiniCard title="POSTA" accent={COLORS.red} style={{width: 350, height: 270}}>
            <div style={{position: 'absolute', left: 70, top: 92}}><DoodleHospital height={150} /></div>
            <StampLabel text="SIN MÉDICOS" color={COLORS.red} size={25} style={{left: 75, top: 210}} />
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tRoad} enter="up" style={{left: 805, top: 60}}>
          <MiniCard title="CARRETERA" accent={COLORS.blue} style={{width: 350, height: 270}}>
            <div style={{position: 'absolute', left: 45, top: 115}}><DoodleRoad height={135} /></div>
            <StampLabel text="SIN ASFALTO" color={COLORS.red} size={25} style={{left: 75, top: 210}} />
          </MiniCard>
        </FlowItem>
        <FlowItem inAt={tSquare} enter="right" style={{left: 1190, top: 60}}>
          <MiniCard title="PLAZA" accent={COLORS.green} style={{width: 350, height: 270}}>
            <div style={{position: 'absolute', left: 100, top: 86}}><DoodleTree height={150} /></div>
            <StampLabel text="SIN ÁRBOLES" color={COLORS.red} size={25} style={{left: 72, top: 210}} />
          </MiniCard>
        </FlowItem>

        <FlowItem inAt={tRibbon} enter="scale" style={{left: 260, top: 390}}>
          <div style={{width: 1040, height: 28, background: COLORS.red, border: `6px solid ${COLORS.ink}`, borderRadius: 10}} />
        </FlowItem>
        <FlowItem inAt={tRibbon + 4} enter="scale" style={{left: 690, top: 345}}><DoodleScissors height={210} /></FlowItem>
        <FlowItem inAt={tStone} enter="up" style={{left: 610, top: 500}}><DoodleStone height={190} /></FlowItem>
        <FlowItem inAt={tSign} enter="scale" style={{left: 970, top: 560}}><StampLabel text="GESTIÓN QUE CUMPLE" color={COLORS.gold} size={42} /></FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="mayor" label="LA CINTA" at={8} />
    </IllustratedSlide>
  );
};
