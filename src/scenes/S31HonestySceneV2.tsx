import React from 'react';
import {FlowItem, Idle} from '../effects/flow';
import {Diogenes} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleDetector, DoodleMagnifier, DoodleReceipt, DoodleSpreadsheet} from './doodles';
import {COLORS} from '../theme';

export const S31HonestySceneV2: React.FC<{durationInFrames: number; fromSec: number}> = () => (
  <IllustratedSlide title="BUSCANDO HONESTIDAD">
    <PaperPanel style={{left: 90, top: 45, width: 1540, height: 745}}>
      <FlowItem inAt={0} enter="left" style={{left: 35, top: 150}}>
        <Idle amp={3} speed={30}><Diogenes height={500} /></Idle>
      </FlowItem>
      <FlowItem inAt={0} enter="scale" style={{left: 390, top: 75}}>
        <MiniCard title="DIOGENES" accent={COLORS.red} style={{width: 350, height: 190}}>
          <StampLabel text="BUSCA HONESTIDAD" color={COLORS.green} size={28} maxWidth={270} style={{left: 35, top: 90}} />
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={84} enter="up" style={{left: 780, top: 70}}>
        <MiniCard title="LAMPARA" accent={COLORS.gold} style={{width: 300, height: 240}}>
          <div style={{position: 'absolute', left: 92, top: 92, width: 110, height: 110, borderRadius: '50%', background: COLORS.gold, border: `7px solid ${COLORS.ink}`}} />
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={220} enter="up" style={{left: 1085, top: 70}}>
        <MiniCard title="LINTERNA + EXCEL" accent={COLORS.blue} style={{width: 385, height: 240}}>
          <div style={{position: 'absolute', left: 35, top: 95}}><DoodleMagnifier height={120} /></div>
          <div style={{position: 'absolute', left: 205, top: 90}}><DoodleSpreadsheet height={135} /></div>
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={286} enter="up" style={{left: 735, top: 390}}>
        <MiniCard title="AUDITORIA" accent={COLORS.blue} style={{width: 360, height: 265}}>
          <div style={{position: 'absolute', left: 55, top: 95}}><DoodleReceipt height={145} /></div>
          <div style={{position: 'absolute', left: 205, top: 100}}><DoodleMagnifier height={130} /></div>
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={375} enter="right" style={{left: 1120, top: 380}}>
        <MiniCard title="DETECTOR" accent={COLORS.red} style={{width: 340, height: 285}}>
          <div style={{position: 'absolute', left: 78, top: 88}}><DoodleDetector height={180} /></div>
          <StampLabel text="DE METALES" color={COLORS.red} size={27} maxWidth={230} style={{left: 52, top: 220}} />
        </MiniCard>
      </FlowItem>
    </PaperPanel>
    <ChapterBadge outfit="auditor" label="DIOGENES" at={4} />
  </IllustratedSlide>
);
