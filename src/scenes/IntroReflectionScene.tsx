import React from 'react';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, StampLabel} from '../visual/Infographic';
import {DoodleCountry, DoodleWallet} from './doodles';
import {COLORS} from '../theme';

// Intercala al presentador con una lámina de tesis visual antes de entrar a los casos.
export const IntroReflectionScene: React.FC = () => (
  <IllustratedSlide title="EL VERDADERO PELIGRO">
    <FlowItem inAt={0} enter="left" style={{left: 80, top: 180}}>
      <MiniCard title="LA PATRIA" accent={COLORS.blue} style={{width: 430, height: 500}}>
        <div style={{position: 'absolute', left: 75, top: 125}}><DoodleCountry height={280} /></div>
      </MiniCard>
    </FlowItem>

    <FlowItem inAt={8} enter="scale" style={{left: 540, top: 350}}>
      <Arrow from={[0, 0]} to={[175, 0]} color={COLORS.red} />
    </FlowItem>

    <FlowItem inAt={14} enter="up" style={{left: 760, top: 170}}>
      <MiniCard title="EL ROBO" accent={COLORS.red} style={{width: 400, height: 500}}>
        <div style={{position: 'absolute', left: 85, top: 165}}><DoodleWallet height={220} /></div>
      </MiniCard>
    </FlowItem>

    <FlowItem inAt={22} enter="scale" style={{left: 1185, top: 350}}>
      <Arrow from={[0, 0]} to={[170, 0]} color={COLORS.red} />
    </FlowItem>

    <FlowItem inAt={30} enter="right" style={{left: 1380, top: 155}}>
      <MiniCard title="LA COSTUMBRE" accent={COLORS.muted} style={{width: 310, height: 520}}>
        <div style={{position: 'absolute', left: 55, top: 130}}>
          <PersonBase outfit="citizen" expression="tired" height={320} />
        </div>
        <StampLabel text="NORMAL" color={COLORS.red} size={36} style={{left: 68, top: 400}} />
      </MiniCard>
    </FlowItem>

    <FlowItem inAt={42} enter="up" style={{left: 570, top: 700}}>
      <StampLabel text="CUANDO NADIE SE INDIGNA, EL ROBO GANA" color={COLORS.red} size={42} />
    </FlowItem>
    <ChapterBadge outfit="citizen" label="LA SOCIEDAD" at={8} />
  </IllustratedSlide>
);
