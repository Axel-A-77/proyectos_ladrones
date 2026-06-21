import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem, Idle} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleEnvelope, DoodleMoneyBag} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const InstrumentCard: React.FC<{title: string; children: React.ReactNode; accent: string}> = ({title, children, accent}) => (
  <MiniCard title={title} accent={accent} style={{width: 300, height: 250}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 72, bottom: 10, display: 'grid', placeItems: 'center'}}>{children}</div>
  </MiniCard>
);

export const S25Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tContrato = f('contrato', 759);
  const tSobre = f('sobre', 761);
  const tFirma = f('firma', 762.5);
  const tSilencio = f('silencio', 765);
  const tConcierto = f('concierto', 772);

  return (
    <IllustratedSlide title="LA ORQUESTA DE LA CORRUPCIÓN">
      <PaperPanel style={{left: 80, top: 40, width: 1580, height: 760}}>
        <FlowItem inAt={0} enter="up" style={{left: 600, top: 250}}>
          <Idle amp={3} speed={30}>
            <PersonBase outfit="suit" expression="smug" arm="up" height={420} />
          </Idle>
        </FlowItem>
        <FlowItem inAt={4} enter="scale" style={{left: 565, top: 165}}>
          <StampLabel text="DIRECTOR" color={COLORS.purple} size={34} />
        </FlowItem>

        <FlowItem inAt={tContrato} enter="left" style={{left: 30, top: 40}}>
          <InstrumentCard title="CONTRATO" accent={COLORS.blue}><DoodleEnvelope height={130} /></InstrumentCard>
        </FlowItem>
        <FlowItem inAt={tSobre} enter="right" style={{left: 1190, top: 40}}>
          <InstrumentCard title="SOBRE" accent={COLORS.gold}><DoodleMoneyBag height={140} /></InstrumentCard>
        </FlowItem>
        <FlowItem inAt={tFirma} enter="left" style={{left: 30, top: 430}}>
          <InstrumentCard title="FIRMA" accent={COLORS.green}>
            <div style={{fontFamily: FONTS.hand, fontSize: 70, transform: 'rotate(-9deg)', color: COLORS.ink}}>Rrrr…</div>
          </InstrumentCard>
        </FlowItem>
        <FlowItem inAt={tSilencio} enter="right" style={{left: 1190, top: 430}}>
          <InstrumentCard title="SILENCIO" accent={COLORS.red}>
            <div style={{position: 'relative', width: 150, height: 95}}>
              <div style={{position: 'absolute', left: 18, top: 30, width: 114, height: 38, borderRadius: '50%', border: `7px solid ${COLORS.ink}`, background: COLORS.paper}} />
              <div style={{position: 'absolute', left: 10, top: 44, width: 130, height: 10, background: COLORS.red, transform: 'rotate(-7deg)', borderRadius: 8}} />
            </div>
          </InstrumentCard>
        </FlowItem>

        <FlowItem inAt={tConcierto} enter="up" style={{left: 430, top: 590}}>
          <PaperPanel style={{width: 700, height: 120, textAlign: 'center', padding: 18}}>
            <div style={{fontFamily: FONTS.display, fontSize: 42, lineHeight: 1}}>PARTITURA: PRESUPUESTO EN FUGA</div>
          </PaperPanel>
        </FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="suit" label="LA ORQUESTA" at={8} />
    </IllustratedSlide>
  );
};
