import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleCalculator, DoodleMagnifier, DoodleReceipt} from './doodles';
import {COLORS} from '../theme';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const PuebloAuditorScene: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tCitizens = f('ciudadanos', 889);
  const tScissors = f('tijera', 894);
  const tInvoice = f('factura', 898.8);
  const tPublic = f('público', 911.9);
  const tAuditor = f('auditor', 914.6);
  const tFiscal = f('fiscalizador', 916.8);

  return (
    <IllustratedSlide title="EL CIUDADANO AUDITOR">
      <PaperPanel style={{left: 100, top: 55, width: 1510, height: 730}}>
        <FlowItem inAt={0} enter="left" style={{left: 55, top: 170}}>
          <MiniCard title="PÚBLICO" accent={COLORS.muted} style={{width: 360, height: 430}}>
            <div style={{position: 'absolute', left: 85, top: 120}}><PersonBase outfit="citizen" expression="tired" height={300} /></div>
          </MiniCard>
        </FlowItem>

        <FlowItem inAt={tScissors} enter="scale" style={{left: 445, top: 330}}>
          <Arrow from={[0, 0]} to={[155, 0]} color={COLORS.green} />
        </FlowItem>

        <FlowItem inAt={tInvoice} enter="up" style={{left: 630, top: 80}}>
          <MiniCard title="HERRAMIENTAS" accent={COLORS.blue} style={{width: 480, height: 550}}>
            <div style={{position: 'absolute', left: 45, top: 115}}><DoodleReceipt height={230} /></div>
            <div style={{position: 'absolute', left: 215, top: 110}}><DoodleMagnifier height={210} /></div>
            <div style={{position: 'absolute', left: 150, top: 330}}><DoodleCalculator height={180} /></div>
            <StampLabel text="REVISAR" color={COLORS.red} size={30} style={{left: 150, top: 465}} />
          </MiniCard>
        </FlowItem>

        <FlowItem inAt={tPublic} enter="scale" style={{left: 1135, top: 330}}>
          <Arrow from={[0, 0]} to={[145, 0]} color={COLORS.green} />
        </FlowItem>

        <FlowItem inAt={tAuditor} enter="right" style={{left: 1280, top: 145}}>
          <MiniCard title="AUDITOR" accent={COLORS.green} style={{width: 300, height: 470}}>
            <div style={{position: 'absolute', left: 58, top: 110}}><PersonBase outfit="auditor" expression="hopeful" arm="chest" height={320} /></div>
            <FlowItem inAt={tFiscal} enter="scale" style={{left: 42, top: 395}}><StampLabel text="FISCALIZADOR" color={COLORS.green} size={25} /></FlowItem>
          </MiniCard>
        </FlowItem>

        {[0, 1, 2].map((i) => (
          <FlowItem key={i} inAt={tCitizens + i * 7} enter="up" style={{left: 1140 + i * 115, top: 545}}>
            <PersonBase outfit="citizen" expression={i === 1 ? 'hopeful' : 'neutral'} height={180} skin={i === 2 ? '#D9A06B' : undefined} />
          </FlowItem>
        ))}
      </PaperPanel>
      <ChapterBadge outfit="auditor" label="EL AUDITOR" at={8} />
    </IllustratedSlide>
  );
};
