import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem, Idle} from '../effects/flow';
import {DoodlePot, DoodleSpoon, DoodleWallet, DoodleCoin} from './doodles';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, ObjectLabel, PaperPanel, StampLabel} from '../visual/Infographic';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

const IdeaCard: React.FC<{text: string; symbol: string; color: string}> = ({text, symbol, color}) => (
  <div style={{width: 250, height: 112, border: `5px solid ${COLORS.ink}`, borderRadius: 22, background: COLORS.paper, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', boxShadow: '5px 6px 0 rgba(21,18,13,.13)'}}>
    <div style={{width: 58, height: 58, borderRadius: '50%', background: color, border: `4px solid ${COLORS.ink}`, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 32}}>{symbol}</div>
    <div style={{fontFamily: FONTS.display, fontSize: 31, lineHeight: 1}}>{text}</div>
  </div>
);

// 04 — candidato humilde rodeado por una corona ordenada de promesas.
export const S04: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const ideas = [
    ['PUEBLO', '♥', COLORS.green, f('pueblo', 113)],
    ['FUTURO', '★', COLORS.gold, f('futuro', 113.6)],
    ['TRANSPARENCIA', '◇', COLORS.blue, f('transparencia', 114)],
    ['DESARROLLO', '↗', COLORS.green, f('desarrollo', 114.6)],
    ['CAMBIO', '↻', COLORS.orange, f('cambio', 115)],
    ['JUSTICIA', '⚖', COLORS.purple, f('justicia', 115.5)],
  ] as const;

  return (
    <IllustratedSlide title="EL CANDIDATO EJEMPLAR">
      <FlowItem inAt={0} enter="left" style={{left: 635, top: 180}}>
        <Idle amp={4} speed={30}>
          <PersonBase outfit="suit" expression="hopeful" build="thin" arm="chest" height={560} />
        </Idle>
      </FlowItem>
      <FlowItem inAt={8} enter="scale" style={{left: 690, top: 40}}>
        <PaperPanel style={{width: 350, height: 120, textAlign: 'center'}}>
          <div style={{fontFamily: FONTS.hand, fontSize: 38, lineHeight: 1.05}}>«Vengo a servir al pueblo»</div>
        </PaperPanel>
      </FlowItem>

      {ideas.map(([text, symbol, color, at], i) => {
        const left = i < 3 ? 90 : 1320;
        const top = 80 + (i % 3) * 210;
        return (
          <FlowItem key={text} inAt={at} enter={i < 3 ? 'left' : 'right'} style={{left, top}}>
            <IdeaCard text={text} symbol={symbol} color={color} />
          </FlowItem>
        );
      })}

      <FlowItem inAt={f('presupuesto', 124.5) - 18} enter="scale" style={{left: 1060, top: 620}}>
        <Arrow from={[0, 0]} to={[190, 70]} color={COLORS.red} label="hasta que oye…" />
      </FlowItem>
      <ChapterBadge outfit="suit" label="EL CANDIDATO" at={8} />
    </IllustratedSlide>
  );
};

// 05 — el texto se integra a la olla y a los objetos del banquete.
export const S05: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tPresupuesto = f('presupuesto', 124.5);
  const tServirse = f('servirse', 132.5);
  const tCuchara = f('cuchara', 134.5);
  const tPlato = f('plato', 135.8);
  const tPostre = f('postre', 137.5);

  return (
    <IllustratedSlide title="EL BANQUETE DEL PODER">
      <FlowItem inAt={0} enter="left" style={{left: 80, top: 190}}>
        <PersonBase outfit="suit" expression="greedy" build="fat" height={570} />
      </FlowItem>

      <FlowItem inAt={tPresupuesto} enter="scale" style={{left: 650, top: 245}}>
        <Idle amp={3} speed={28}><DoodlePot height={390} /></Idle>
      </FlowItem>
      <FlowItem inAt={tPresupuesto + 3} enter="scale" style={{left: 735, top: 345}}>
        <ObjectLabel text="PRESUPUESTO" color={COLORS.ink} size={48} />
      </FlowItem>
      {[0, 1, 2, 3].map((i) => (
        <FlowItem key={i} inAt={tPresupuesto + 5 + i * 3} enter="down" style={{left: 710 + i * 82, top: 170 - (i % 2) * 28}}>
          <DoodleCoin height={74} />
        </FlowItem>
      ))}

      <FlowItem inAt={tCuchara} enter="right" style={{left: 1030, top: 275}}>
        <DoodleSpoon height={330} />
      </FlowItem>
      <FlowItem inAt={tServirse} enter="scale" style={{left: 1180, top: 120}}>
        <StampLabel text="SERVIRSE" color={COLORS.red} size={54} />
      </FlowItem>

      <FlowItem inAt={tPlato} enter="up" style={{left: 1260, top: 440}}>
        <MiniCard title="SEGUNDO PLATO" accent={COLORS.orange} style={{width: 330, height: 180}}>
          <div style={{position: 'absolute', left: 72, top: 75, width: 190, height: 54, borderRadius: '50%', background: COLORS.paper, border: `6px solid ${COLORS.ink}`}} />
          <div style={{position: 'absolute', left: 120, top: 88, width: 94, height: 26, borderRadius: '50%', background: COLORS.orange, border: `4px solid ${COLORS.ink}`}} />
        </MiniCard>
      </FlowItem>
      <FlowItem inAt={tPostre} enter="up" style={{left: 1240, top: 650}}>
        <MiniCard title="POSTRE" accent={COLORS.red} style={{width: 360, height: 160}}>
          <div style={{position: 'absolute', left: 112, top: 72, width: 120, height: 54, borderRadius: '60px 60px 18px 18px', background: '#F3A6B8', border: `5px solid ${COLORS.ink}`}} />
          <ObjectLabel text="VIÁTICOS" color={COLORS.red} size={30} style={{left: 120, top: 126}} />
        </MiniCard>
      </FlowItem>

      <ChapterBadge outfit="suit" label="PRESUPUESTO" at={8} />
    </IllustratedSlide>
  );
};

// 06 — viñeta única: el abrazo distrae mientras la billetera cambia de dueño.
export const S06: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tAbrazo = f('abrazando', 146.5);
  const tBilletera = f('billetera', 149);

  return (
    <IllustratedSlide title="EL ABRAZO ESTRATÉGICO">
      <PaperPanel style={{left: 230, top: 70, width: 1260, height: 690}}>
        <FlowItem inAt={0} enter="left" style={{left: 120, top: 160}}>
          <PersonBase outfit="citizen" expression="hopeful" height={450} flip />
        </FlowItem>
        <FlowItem inAt={tAbrazo} enter="right" style={{left: 475, top: 145}}>
          <PersonBase outfit="suit" expression="smug" arm="wave" height={470} flip />
        </FlowItem>
        <FlowItem inAt={tAbrazo + 3} enter="scale" style={{left: 730, top: 75}}>
          <ObjectLabel text="ABRAZO" color={COLORS.green} size={58} />
        </FlowItem>
        <FlowItem inAt={tBilletera} enter="right" style={{left: 465, top: 420}}>
          <DoodleWallet height={170} />
        </FlowItem>
        <FlowItem inAt={tBilletera + 2} enter="scale" style={{left: 660, top: 455}}>
          <Arrow from={[0, 0]} to={[240, -55]} color={COLORS.red} />
        </FlowItem>
        <FlowItem inAt={tBilletera + 5} enter="scale" style={{left: 900, top: 330}}>
          <StampLabel text="ROBO" color={COLORS.red} size={58} />
        </FlowItem>
      </PaperPanel>
      <ChapterBadge outfit="suit" label="DOBLE DISCURSO" at={8} />
    </IllustratedSlide>
  );
};
