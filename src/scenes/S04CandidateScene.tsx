import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem, Idle} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, PaperPanel} from '../visual/Infographic';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const IdeaCard: React.FC<{text: string; mark: string; color: string}> = ({text, mark, color}) => {
  const fontSize = text.length > 12 ? 24 : text.length > 9 ? 27 : 31;
  return (
    <div style={{width: 310, height: 112, boxSizing: 'border-box', border: `5px solid ${COLORS.ink}`, borderRadius: 22, background: COLORS.paper, display: 'flex', alignItems: 'center', gap: 13, padding: '10px 14px', boxShadow: '5px 6px 0 rgba(21,18,13,.13)', overflow: 'hidden'}}>
      <div style={{width: 58, height: 58, flex: '0 0 58px', borderRadius: '50%', background: color, border: `4px solid ${COLORS.ink}`, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 26}}>{mark}</div>
      <div style={{minWidth: 0, flex: 1, fontFamily: FONTS.display, fontSize, lineHeight: 0.95, textAlign: 'left', whiteSpace: 'nowrap'}}>{text}</div>
    </div>
  );
};

export const S04CandidateScene: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const ideas = [
    ['PUEBLO', 'P', COLORS.green, f('pueblo', 113)],
    ['FUTURO', 'F', COLORS.gold, f('futuro', 113.6)],
    ['TRANSPARENCIA', 'T', COLORS.blue, f('transparencia', 114)],
    ['DESARROLLO', 'D', COLORS.green, f('desarrollo', 114.6)],
    ['CAMBIO', 'C', COLORS.orange, f('cambio', 115)],
    ['JUSTICIA', 'J', COLORS.purple, f('justicia', 115.5)],
  ] as const;

  return (
    <IllustratedSlide title="EL CANDIDATO EJEMPLAR">
      <FlowItem inAt={0} enter="left" style={{left: 685, top: 180}}>
        <Idle amp={4} speed={30}><PersonBase outfit="suit" expression="hopeful" build="thin" arm="chest" height={560} /></Idle>
      </FlowItem>
      <FlowItem inAt={8} enter="scale" style={{left: 665, top: 30}}>
        <PaperPanel style={{width: 410, height: 125, textAlign: 'center', padding: 20}}>
          <div style={{fontFamily: FONTS.hand, fontSize: 36, lineHeight: 1.02}}>Vengo a servir al pueblo</div>
        </PaperPanel>
      </FlowItem>
      {ideas.map(([text, mark, color, at], i) => (
        <FlowItem key={text} inAt={at} enter={i < 3 ? 'left' : 'right'} style={{left: i < 3 ? 35 : 1390, top: 80 + (i % 3) * 210}}>
          <IdeaCard text={text} mark={mark} color={color} />
        </FlowItem>
      ))}
      <ChapterBadge outfit="suit" label="EL CANDIDATO" at={4} />
    </IllustratedSlide>
  );
};
