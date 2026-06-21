import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, StampLabel} from '../visual/Infographic';
import {DoodleCountry, DoodleDoor, DoodleThrone, DoodleWallet} from './doodles';
import {COLORS} from '../theme';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const S01Puertas: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (word: string, fallback: number) => beatAt(word, fallback, fromSec, fps);
  const tDoor = f('puertas', 18.7);
  const tChair = f('sillón', 20.8);
  const tWallet = f('billetera', 24.3);

  return (
    <IllustratedSlide title="EL PODER COMO BOTÍN">
      <FlowItem inAt={0} enter="left" style={{left: 35, top: 120}}>
        <MiniCard title="1. ENTRA AL PODER" accent={COLORS.purple} style={{width: 440, height: 560}}>
          <div style={{position: 'absolute', left: 85, top: 125}}><DoodleDoor height={360} /></div>
          <StampLabel text="PODER" color={COLORS.purple} size={36} style={{left: 120, top: 455}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tDoor + 4} enter="scale" style={{left: 485, top: 355}}>
        <Arrow from={[0, 0]} to={[120, 0]} color={COLORS.ink} />
      </FlowItem>

      <FlowItem inAt={tChair} enter="up" style={{left: 620, top: 105}}>
        <MiniCard title="2. SE ACOMODA" accent={COLORS.red} style={{width: 480, height: 590}}>
          <div style={{position: 'absolute', left: 95, top: 145}}><DoodleThrone height={350} /></div>
          <div style={{position: 'absolute', left: 160, top: 170}}><PersonBase outfit="suit" expression="smug" height={300} /></div>
          <StampLabel text="SILLÓN" color={COLORS.red} size={36} style={{left: 155, top: 500}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tChair + 5} enter="scale" style={{left: 1110, top: 355}}>
        <Arrow from={[0, 0]} to={[120, 0]} color={COLORS.ink} />
      </FlowItem>

      <FlowItem inAt={tWallet} enter="right" style={{left: 1240, top: 105}}>
        <MiniCard title="3. SE APROPIA" accent={COLORS.gold} style={{width: 440, height: 590}}>
          <div style={{position: 'absolute', left: 95, top: 135}}><DoodleCountry height={220} /></div>
          <div style={{position: 'absolute', left: 185, top: 360}}><DoodleWallet height={170} /></div>
          <StampLabel text="MI BILLETERA" color={COLORS.red} size={31} style={{left: 110, top: 500}} />
        </MiniCard>
      </FlowItem>
      <ChapterBadge outfit="suit" label="EL PODER" at={8} />
    </IllustratedSlide>
  );
};
