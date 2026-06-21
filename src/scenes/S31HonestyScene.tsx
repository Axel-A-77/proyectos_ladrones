import React from 'react';
import {FlowItem, Idle} from '../effects/flow';
import {Diogenes} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleDetector, DoodleMagnifier, DoodleReceipt} from './doodles';
import {COLORS} from '../theme';

export const S31HonestyScene: React.FC<{durationInFrames: number; fromSec: number}> = () => (
  <IllustratedSlide title="BUSCANDO HONESTIDAD">
    <PaperPanel style={{left: 95, top: 42, width: 1530, height: 748}}>
      <FlowItem inAt={0} enter="left" style={{left: 40, top: 145}}>
        <Idle amp={3} speed={30}><Diogenes height={500} /></Idle>
      </FlowItem>
      <FlowItem inAt={0} enter="scale" style={{left: 420, top: 80}}>
        <MiniCard title="LA BÚSQUEDA" accent={COLORS.red} style={{width: 410, height: 210}}>
          <StampLabel text="HONESTIDAD" color={COLORS.green} size={38} maxWidth={300} style={{left: 50, top: 105}} />
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={18} enter="up" style={{left: 760, top: 75}}>
        <MiniCard title="LÁMPARA" accent={COLORS.gold} style={{width: 300, height: 250}}>
          <div style={{position: 'absolute', left: 90, top: 95, width: 112, height: 112, borderRadius: '50%', background: COLORS.gold, border: `7px solid ${COLORS.ink}`}} />
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={150} enter="up" style={{left: 760, top: 390}}>
        <MiniCard title="AUDITORÍA" accent={COLORS.blue} style={{width: 350, height: 270}}>
          <div style={{position: 'absolute', left: 52, top: 95}}><DoodleReceipt height={145} /></div>
          <div style={{position: 'absolute', left: 195, top: 100}}><DoodleMagnifier height={135} /></div>
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={300} enter="right" style={{left: 1130, top: 365}}>
        <MiniCard title="DETECTOR" accent={COLORS.red} style={{width: 330, height: 300}}>
          <div style={{position: 'absolute', left: 70, top: 90}}><DoodleDetector height={185} /></div>
          <StampLabel text="DE METALES" color={COLORS.red} size={27} maxWidth={230} style={{left: 48, top: 225}} />
        </MiniCard>
      </FlowItem>
    </PaperPanel>
    <ChapterBadge outfit="auditor" label="DIÓGENES" at={4} />
  </IllustratedSlide>
);
