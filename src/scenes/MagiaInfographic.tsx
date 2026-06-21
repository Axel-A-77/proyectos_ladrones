import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleEnvelope, DoodleHospital, DoodleMoneyBag, DoodleRoad, DoodleSchool, DoodleStamp, DoodleWaterDrop} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const MagiaInfographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tIlusion = f('ilusionismo', 308);
  const tMoney = f('contribuyentes', 319.5);
  const tGone = f('está', 329.5);
  const tFolder = f('carpeta', 333.5);
  const tDebt = f('deuda', 347);

  return (
    <IllustratedSlide title="MAGIA ADMINISTRATIVA">
      <FlowItem inAt={0} outAt={tIlusion - 6} enter="scale" exit="up" style={{left: 70, top: 70}}>
        <PaperPanel style={{width: 1580, height: 720}}>
          <MiniCard title="PISTAS" accent={COLORS.orange} style={{left: 20, top: 110, width: 350, height: 450}}><div style={{position: 'absolute', left: 45, top: 170}}><DoodleRoad height={190} /></div></MiniCard>
          <MiniCard title="HOSPITALES" accent={COLORS.red} style={{left: 400, top: 110, width: 350, height: 450}}><div style={{position: 'absolute', left: 65, top: 135}}><DoodleHospital height={240} /></div></MiniCard>
          <MiniCard title="COLEGIOS" accent={COLORS.blue} style={{left: 780, top: 110, width: 350, height: 450}}><div style={{position: 'absolute', left: 80, top: 140}}><DoodleSchool height={230} /></div></MiniCard>
          <MiniCard title="AGUA" accent={COLORS.blue} style={{left: 1160, top: 110, width: 350, height: 450}}><div style={{position: 'absolute', left: 105, top: 150}}><DoodleWaterDrop height={220} /></div></MiniCard>
          <StampLabel text="SACRIFICADOS" color={COLORS.red} size={48} style={{left: 590, top: 600}} />
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tIlusion} enter="scale" style={{left: 100, top: 90}}>
        <PaperPanel style={{width: 1500, height: 690}}>
          <MiniCard title="ENTRA" accent={COLORS.green} style={{left: 35, top: 150, width: 360, height: 380}}>
            <div style={{position: 'absolute', left: 85, top: 115}}><DoodleMoneyBag height={190} /></div>
          </MiniCard>

          <FlowItem inAt={tMoney} enter="scale" style={{left: 425, top: 320}}><Arrow from={[0, 0]} to={[160, 0]} color={COLORS.green} /></FlowItem>

          <div style={{position: 'absolute', left: 590, top: 95, width: 360, height: 500, background: COLORS.purple, border: `8px solid ${COLORS.ink}`, borderRadius: 42, boxShadow: '10px 12px 0 rgba(21,18,13,.18)'}}>
            <div style={{position: 'absolute', left: 48, right: 48, top: 80, height: 260, borderRadius: 24, background: COLORS.night, border: `7px solid ${COLORS.ink}`}} />
            <div style={{position: 'absolute', left: 60, right: 60, bottom: 55, textAlign: 'center', color: COLORS.paper, fontFamily: FONTS.display, fontSize: 42}}>OFICINA PÚBLICA</div>
            <FlowItem inAt={tGone} enter="scale" style={{left: 48, top: 170}}><StampLabel text="DESAPARECE" color={COLORS.red} size={34} /></FlowItem>
          </div>

          <FlowItem inAt={tFolder} enter="scale" style={{left: 990, top: 150}}>
            <MiniCard title="SALE" accent={COLORS.red} style={{width: 450, height: 380}}>
              <div style={{position: 'absolute', left: 45, top: 120}}><DoodleEnvelope height={140} /></div>
              <div style={{position: 'absolute', left: 255, top: 115}}><DoodleStamp height={150} /></div>
              <StampLabel text="COMISIÓN" color={COLORS.blue} size={32} style={{left: 120, top: 285}} />
            </MiniCard>
          </FlowItem>

          <FlowItem inAt={tDebt} enter="up" style={{left: 1060, top: 560}}>
            <StampLabel text="DEUDA" color={COLORS.red} size={62} />
          </FlowItem>
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="governor" label="LA REGIÓN" at={8} />
    </IllustratedSlide>
  );
};
