import React from 'react';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, StampLabel} from '../visual/Infographic';
import {DoodleCountry, DoodleWallet} from './doodles';
import {COLORS} from '../theme';

export const IntroReflectionSceneV2: React.FC = () => (
  <IllustratedSlide title="EL VERDADERO PELIGRO">
    <FlowItem inAt={0} enter="left" style={{left: 45, top: 145}}>
      <MiniCard title="LA PATRIA" accent={COLORS.blue} style={{width: 420, height: 500}}>
        <div style={{position: 'absolute', left: 70, top: 125}}><DoodleCountry height={275} /></div>
      </MiniCard>
    </FlowItem>
    <FlowItem inAt={8} enter="scale" style={{left: 490, top: 330}}>
      <Arrow from={[0, 0]} to={[155, 0]} color={COLORS.red} />
    </FlowItem>
    <FlowItem inAt={14} enter="up" style={{left: 675, top: 135}}>
      <MiniCard title="EL ROBO" accent={COLORS.red} style={{width: 400, height: 500}}>
        <div style={{position: 'absolute', left: 85, top: 165}}><DoodleWallet height={220} /></div>
      </MiniCard>
    </FlowItem>
    <FlowItem inAt={22} enter="scale" style={{left: 1095, top: 330}}>
      <Arrow from={[0, 0]} to={[150, 0]} color={COLORS.red} />
    </FlowItem>
    <FlowItem inAt={30} enter="right" style={{left: 1275, top: 120}}>
      <MiniCard title="LA COSTUMBRE" accent={COLORS.muted} style={{width: 340, height: 520}}>
        <div style={{position: 'absolute', left: 70, top: 130}}><PersonBase outfit="citizen" expression="tired" height={320} /></div>
        <StampLabel text="NORMAL" color={COLORS.red} size={32} maxWidth={210} style={{left: 62, top: 405}} />
      </MiniCard>
    </FlowItem>
    <FlowItem inAt={42} enter="up" style={{left: 430, top: 650}}>
      <StampLabel text="CUANDO NADIE SE INDIGNA, EL ROBO GANA" color={COLORS.red} size={30} maxWidth={820} style={{transform: 'rotate(-2deg)'}} />
    </FlowItem>
    <ChapterBadge outfit="citizen" label="LA SOCIEDAD" at={4} />
  </IllustratedSlide>
);
