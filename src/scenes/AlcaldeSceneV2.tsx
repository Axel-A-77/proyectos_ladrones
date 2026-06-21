import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem, Idle} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, ObjectLabel, PriceTag, StampLabel} from '../visual/Infographic';
import {DoodleBeach, DoodleEnvelope, DoodleHouse, DoodleTree} from './doodles';
import {COLORS} from '../theme';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const RoadHoles: React.FC = () => (
  <svg width="330" height="145" viewBox="0 0 460 180">
    <path d="M20 165 L90 55 L370 55 L440 165 Z" fill={COLORS.muted} stroke={COLORS.ink} strokeWidth="8" strokeLinejoin="round" />
    <path d="M230 70 L230 155" stroke={COLORS.gold} strokeWidth="7" strokeDasharray="11 15" strokeLinecap="round" />
    <ellipse cx="160" cy="116" rx="34" ry="15" fill={COLORS.ink} />
    <ellipse cx="295" cy="132" rx="40" ry="17" fill={COLORS.ink} />
    <path d="M370 165 L388 108 L406 165 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth="6" strokeLinejoin="round" />
  </svg>
);

export const AlcaldeSceneV2: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tOpportunity = f('oportunidad', 160.8);
  const tTree = f('arbol', 174.1);
  const tCousins = f('primos', 176.7);
  const tBeach = f('playa', 186.3);

  return (
    <IllustratedSlide title="EL ALCALDE ARTISTA">
      <FlowItem inAt={0} enter="left" style={{left: 20, top: 165}}>
        <Idle amp={3} speed={30}><PersonBase outfit="mayor" expression="smug" height={520} /></Idle>
      </FlowItem>
      <FlowItem inAt={6} enter="scale" style={{left: 120, top: 50}}>
        <StampLabel text="GESTIÓN" color={COLORS.purple} size={38} maxWidth={250} />
      </FlowItem>

      <FlowItem inAt={tOpportunity} enter="up" style={{left: 350, top: 90}}>
        <MiniCard title="HUECOS" accent={COLORS.red} style={{width: 420, height: 280}}>
          <div style={{position: 'absolute', left: 30, top: 92}}><RoadHoles /></div>
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tOpportunity + 4} enter="scale" style={{left: 790, top: 220}}>
        <Arrow from={[0, 0]} to={[125, 0]} color={COLORS.ink} />
      </FlowItem>
      <FlowItem inAt={tOpportunity + 5} enter="scale" style={{left: 800, top: 160}}>
        <ObjectLabel text="LICITACIÓN" size={27} maxWidth={150} />
      </FlowItem>

      <FlowItem inAt={tTree - 8} enter="scale" style={{left: 940, top: 90}}>
        <MiniCard title="CONTRATO" accent={COLORS.gold} style={{width: 350, height: 280}}>
          <div style={{position: 'absolute', left: 92, top: 88}}><DoodleEnvelope height={145} /></div>
          <PriceTag text="VACACIONES" style={{left: 20, top: 190, transform: 'scale(.82)'}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tTree} enter="scale" style={{left: 1310, top: 220}}>
        <Arrow from={[0, 0]} to={[70, 0]} color={COLORS.ink} />
      </FlowItem>

      <FlowItem inAt={tTree} enter="right" style={{left: 1400, top: 80}}>
        <MiniCard title="FAMILIA" accent={COLORS.green} style={{width: 285, height: 300}}>
          <div style={{position: 'absolute', left: 50, top: 80}}><DoodleTree height={185} /></div>
          <ObjectLabel text="PRIMOS" color={COLORS.red} size={27} maxWidth={150} style={{left: 70, top: 245}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tCousins} enter="scale" style={{left: 1080, top: 390}}>
        <Arrow from={[0, 0]} to={[0, 95]} color={COLORS.red} />
      </FlowItem>
      <FlowItem inAt={tCousins + 2} enter="scale" style={{left: 760, top: 405}}>
        <ObjectLabel text="LA OBRA SE DEMORA" color={COLORS.red} size={27} maxWidth={290} />
      </FlowItem>

      <FlowItem inAt={tBeach} enter="up" style={{left: 500, top: 485}}>
        <MiniCard title="RESULTADO PERSONAL" accent={COLORS.red} style={{width: 930, height: 315}}>
          <div style={{position: 'absolute', left: 30, top: 75, overflow: 'hidden', width: 850, height: 190}}><DoodleBeach width={850} /></div>
          <div style={{position: 'absolute', left: 540, top: 100}}><DoodleHouse height={180} /></div>
          <PriceTag text="CASA DE PLAYA" style={{left: 520, top: 215, transform: 'scale(.85)'}} />
        </MiniCard>
      </FlowItem>

      <ChapterBadge outfit="mayor" label="EL ALCALDE" at={4} />
    </IllustratedSlide>
  );
};
