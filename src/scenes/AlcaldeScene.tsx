import React from 'react';
import {useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {FlowItem, Idle} from '../effects/flow';
import {ChapterBadge} from '../visual/ChapterBadge';
import {PersonBase} from '../visual/People';
import {Arrow, IllustratedSlide, MiniCard, ObjectLabel, PriceTag, StampLabel} from '../visual/Infographic';
import {DoodleBeach, DoodleEnvelope, DoodleHouse, DoodleTree} from './doodles';
import {beatAt} from './util';

const PistaHuecos: React.FC = () => (
  <svg width={390} height={170} viewBox="0 0 460 180">
    <path d="M20 165 L90 55 L370 55 L440 165 Z" fill={COLORS.muted} stroke={COLORS.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M230 70 L230 155" stroke={COLORS.gold} strokeWidth={7} strokeDasharray="11 15" strokeLinecap="round" />
    <ellipse cx="160" cy="116" rx="34" ry="15" fill={COLORS.ink} />
    <ellipse cx="295" cy="132" rx="40" ry="17" fill={COLORS.ink} />
    <path d="M370 165 L388 108 L406 165 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

// EL ALCALDE — una sola ruta visual: problema público → licitación → familia → beneficio privado.
export const AlcaldeScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tOportunidad = f('oportunidad', 160.8);
  const tArbol = f('árbol', 174.1);
  const tPrimos = f('primos', 176.7);
  const tPlaya = f('playa', 186.3);

  return (
    <IllustratedSlide title="EL ALCALDE ARTISTA">
      <FlowItem inAt={0} enter="left" style={{left: 20, top: 180}}>
        <Idle amp={3} speed={30}>
          <PersonBase outfit="mayor" expression="smug" height={520} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={8} enter="scale" style={{left: 145, top: 80}}>
        <StampLabel text="GESTIÓN" color={COLORS.purple} size={44} />
      </FlowItem>

      <FlowItem inAt={tOportunidad} enter="up" style={{left: 425, top: 110}}>
        <MiniCard title="HUECOS" accent={COLORS.red} style={{width: 430, height: 290}}>
          <div style={{position: 'absolute', left: 20, top: 90}}><PistaHuecos /></div>
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={tOportunidad + 5} enter="scale" style={{left: 860, top: 245}}>
        <Arrow from={[0, 0]} to={[145, 0]} color={COLORS.ink} label="licitación" />
      </FlowItem>

      <FlowItem inAt={tArbol - 8} enter="scale" style={{left: 1030, top: 110}}>
        <MiniCard title="CONTRATO" accent={COLORS.gold} style={{width: 330, height: 290}}>
          <div style={{position: 'absolute', left: 84, top: 95}}><DoodleEnvelope height={150} /></div>
          <PriceTag text="VACACIONES" style={{left: 28, top: 196, transform: 'scale(.82)'}} />
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={tArbol} enter="scale" style={{left: 1370, top: 245}}>
        <Arrow from={[0, 0]} to={[110, 0]} color={COLORS.ink} />
      </FlowItem>

      <FlowItem inAt={tArbol} enter="right" style={{left: 1450, top: 95}}>
        <MiniCard title="FAMILIA" accent={COLORS.green} style={{width: 260, height: 320}}>
          <div style={{position: 'absolute', left: 44, top: 85}}><DoodleTree height={210} /></div>
          <ObjectLabel text="PRIMOS" color={COLORS.red} size={28} style={{left: 82, top: 265}} />
        </MiniCard>
      </FlowItem>

      <FlowItem inAt={tPrimos} enter="up" style={{left: 560, top: 510}}>
        <Arrow from={[0, 0]} to={[700, 0]} color={COLORS.red} label="la obra se demora" />
      </FlowItem>

      <FlowItem inAt={tPlaya} enter="up" style={{left: 760, top: 455}}>
        <MiniCard title="RESULTADO PERSONAL" accent={COLORS.red} style={{width: 760, height: 350}}>
          <div style={{position: 'absolute', left: 20, top: 80, overflow: 'hidden', width: 700, height: 220}}>
            <DoodleBeach width={700} />
          </div>
          <div style={{position: 'absolute', left: 410, top: 120}}><DoodleHouse height={210} /></div>
          <PriceTag text="CASA DE PLAYA" style={{left: 360, top: 245, transform: 'scale(.86)'}} />
        </MiniCard>
      </FlowItem>

      <ChapterBadge outfit="mayor" label="EL ALCALDE" at={8} />
    </IllustratedSlide>
  );
};
