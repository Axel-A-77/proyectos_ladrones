import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem, Idle} from '../effects/flow';
import {DoodleHouse, DoodleWindow, DoodleSofa, DoodleTollbooth, DoodleKey, DoodleWallet} from './doodles';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, HangingSign, IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

// 02 — diagrama causal: robo + silencio = impunidad.
export const S02: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tCallar = f('callar', 78);
  const tImpunidad = f('impunidad', 79.5);

  return (
    <IllustratedSlide title="EL SILENCIO CÓMPLICE">
      <FlowItem inAt={0} enter="left" style={{left: 20, top: 170}}>
        <MiniCard title="1. ALGUIEN ROBA" accent={COLORS.red} style={{width: 420, height: 470}}>
          <div style={{position: 'absolute', left: 55, top: 105}}>
            <PersonBase outfit="suit" expression="smug" height={300} />
          </div>
          <div style={{position: 'absolute', left: 225, top: 245}}>
            <DoodleWallet height={135} />
          </div>
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tCallar} enter="up" style={{left: 635, top: 110}}>
        <PaperPanel style={{width: 520, height: 590}}>
          <div style={{fontFamily: FONTS.display, fontSize: 42, textAlign: 'center'}}>2. EL PUEBLO CALLA</div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{position: 'absolute', left: 40 + i * 150, top: 130 + (i % 2) * 24}}>
              <PersonBase
                outfit="citizen"
                expression={i === 1 ? 'worried' : 'tired'}
                height={300}
                skin={i === 1 ? '#D9A06B' : i === 2 ? '#C98A5A' : undefined}
                flip={i === 2}
              />
              <div style={{position: 'absolute', left: 45, top: 110, width: 74, height: 10, borderRadius: 7, background: COLORS.red, transform: 'rotate(-4deg)'}} />
            </div>
          ))}
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tCallar + 5} enter="scale" style={{left: 470, top: 340}}>
        <Arrow from={[0, 0]} to={[135, 0]} color={COLORS.ink} />
      </FlowItem>
      <FlowItem inAt={tImpunidad - 4} enter="scale" style={{left: 1170, top: 340}}>
        <Arrow from={[0, 0]} to={[145, 0]} color={COLORS.ink} />
      </FlowItem>

      <FlowItem inAt={tImpunidad} enter="scale" style={{left: 1320, top: 275}}>
        <StampLabel text="IMPUNIDAD" size={52} />
      </FlowItem>
      <FlowItem inAt={tImpunidad + 5} enter="up" style={{left: 1320, top: 410}}>
        <div style={{fontFamily: FONTS.hand, fontSize: 40, width: 320, textAlign: 'center', lineHeight: 1.1}}>
          El robo deja de parecer una excepción.
        </div>
      </FlowItem>
      <ChapterBadge outfit="citizen" label="EL PUEBLO" at={8} />
    </IllustratedSlide>
  );
};

// 03 — la casa se mantiene como ancla; cada abuso se integra dentro de ella.
export const S03: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tLlaves = f('llaves', 89.6);
  const tVent = f('ventanas', 93.7);
  const tSala = f('sala', 95.4);
  const tPeaje = f('peaje', 96.4);

  return (
    <IllustratedSlide title="LA CASA DEL PUEBLO">
      <FlowItem inAt={0} enter="scale" style={{left: 530, top: 80}}>
        <Idle amp={3} speed={34}>
          <DoodleHouse height={650} />
        </Idle>
      </FlowItem>

      <FlowItem inAt={tLlaves} enter="left" style={{left: 30, top: 250}}>
        <PersonBase outfit="suit" expression="smug" arm="up" height={440} />
      </FlowItem>
      <FlowItem inAt={tLlaves + 4} enter="scale" style={{left: 330, top: 410}}>
        <DoodleKey height={110} />
      </FlowItem>

      <FlowItem inAt={tVent} enter="left" style={{left: 255, top: 70}}>
        <DoodleWindow height={185} />
      </FlowItem>
      <FlowItem inAt={tVent + 4} enter="scale" style={{left: 220, top: 20}}>
        <HangingSign text="SE VENDE" />
      </FlowItem>
      <FlowItem inAt={tVent + 7} enter="scale" style={{left: 460, top: 195}}>
        <Arrow from={[0, 0]} to={[140, 35]} color={COLORS.red} />
      </FlowItem>

      <FlowItem inAt={tSala} enter="up" style={{left: 330, top: 570}}>
        <MiniCard title="SALA" accent={COLORS.blue} style={{width: 360, height: 230}}>
          <div style={{position: 'absolute', left: 55, top: 70}}><DoodleSofa height={135} /></div>
          <HangingSign text="EN ALQUILER" color={COLORS.ink} style={{left: 62, top: 155, transform: 'scale(0.72)'}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tPeaje} enter="right" style={{left: 1320, top: 380}}>
        <MiniCard title="BAÑO" accent={COLORS.red} style={{width: 340, height: 350}}>
          <div style={{position: 'absolute', left: 70, top: 80}}><DoodleTollbooth height={220} /></div>
          <HangingSign text="PEAJE" style={{left: 90, top: 280, transform: 'scale(0.8)'}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tPeaje + 5} enter="scale" style={{left: 1160, top: 490}}>
        <Arrow from={[0, 0]} to={[150, 0]} color={COLORS.red} />
      </FlowItem>

      <ChapterBadge outfit="suit" label="EL PODER" at={8} />
    </IllustratedSlide>
  );
};
