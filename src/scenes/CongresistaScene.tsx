import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, MiniCard, PaperPanel, PriceTag, StampLabel} from '../visual/Infographic';
import {DoodleClock, DoodleCurul, DoodleMoneyBag, DoodleScroll, DoodleStamp} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const CongresistaScene: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tRules = f('reglamento', 360.2);
  const tDebate = f('debate', 374);
  const tVote = f('votar', 376.5);
  const tClock = f('reloj', 381.6);
  const tFurniture = f('mueble', 391);
  const tSalary = f('sueldo', 416.2);
  const tBonus = f('bono', 417.5);
  const tTrip = f('viaje', 418.8);
  const tGas = f('gasolina', 422.5);

  return (
    <IllustratedSlide title="EL CONGRESISTA DE MUSEO">
      <FlowItem inAt={0} outAt={tDebate - 8} enter="left" exit="up" style={{left: 70, top: 180}}>
        <PersonBase outfit="congress" expression="smug" height={520} />
      </FlowItem>

      <FlowItem inAt={tRules} outAt={tDebate - 8} enter="scale" exit="up" style={{left: 520, top: 90}}>
        <PaperPanel style={{width: 1080, height: 650}}>
          <MiniCard title="REGLAMENTO" accent={COLORS.blue} style={{left: 55, top: 130, width: 300, height: 360}}>
            <div style={{position: 'absolute', left: 72, top: 130}}><DoodleScroll height={180} /></div>
          </MiniCard>
          <MiniCard title="SELLO" accent={COLORS.red} style={{left: 390, top: 130, width: 300, height: 360}}>
            <div style={{position: 'absolute', left: 82, top: 125}}><DoodleStamp height={190} /></div>
          </MiniCard>
          <MiniCard title="PROYECTO" accent={COLORS.purple} style={{left: 725, top: 130, width: 300, height: 360}}>
            <div style={{position: 'absolute', left: 70, top: 130}}><DoodleScroll height={180} /></div>
          </MiniCard>
          <StampLabel text="NO NECESITA PALA" color={COLORS.red} size={42} style={{left: 345, top: 535}} />
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tDebate} outAt={tFurniture - 8} enter="scale" exit="up" style={{left: 110, top: 65}}>
        <PaperPanel style={{width: 1500, height: 720}}>
          <MiniCard title="DEBATE" accent={COLORS.blue} style={{left: 35, top: 95, width: 620, height: 520}}>
            <div style={{position: 'absolute', left: 135, top: 160}}><DoodleCurul height={250} /></div>
            <div style={{position: 'absolute', left: 190, top: 100}}><PersonBase outfit="congress" expression="tired" height={330} /></div>
            <StampLabel text="ZZZ" color={COLORS.muted} size={38} style={{left: 420, top: 130}} />
          </MiniCard>
          <MiniCard title="DECISIÓN" accent={COLORS.green} style={{left: 710, top: 95, width: 320, height: 520}}>
            <FlowItem inAt={tVote} enter="scale" style={{left: 85, top: 190}}>
              <div style={{width: 140, height: 140, borderRadius: '50%', background: COLORS.red, border: `9px solid ${COLORS.ink}`, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 28, color: COLORS.paper}}>BOTÓN</div>
            </FlowItem>
          </MiniCard>
          <MiniCard title="PAGO" accent={COLORS.gold} style={{left: 1070, top: 95, width: 350, height: 520}}>
            <FlowItem inAt={tClock} enter="scale" style={{left: 80, top: 150}}><DoodleClock height={190} /></FlowItem>
            <StampLabel text="PUNTUAL" color={COLORS.green} size={34} style={{left: 68, top: 370}} />
          </MiniCard>
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tFurniture} enter="scale" style={{left: 100, top: 55}}>
        <PaperPanel style={{width: 1520, height: 735}}>
          <MiniCard title="MUEBLE DE LUJO" accent={COLORS.purple} style={{left: 35, top: 100, width: 520, height: 500}}>
            <div style={{position: 'absolute', left: 85, top: 160, width: 340, height: 190, borderRadius: 40, background: COLORS.purple, border: `9px solid ${COLORS.ink}`}} />
            <div style={{position: 'absolute', left: 65, top: 260, width: 380, height: 120, borderRadius: 30, background: '#5C43A8', border: `9px solid ${COLORS.ink}`}} />
            <PriceTag text="SOBREPRECIO" style={{left: 120, top: 395}} />
          </MiniCard>
          <div style={{position: 'absolute', left: 625, top: 255}}><DoodleMoneyBag height={260} shades /></div>
          <MiniCard title="BENEFICIOS" accent={COLORS.red} style={{left: 930, top: 100, width: 520, height: 500}}>
            {[
              ['SUELDO', tSalary, 80],
              ['BONO', tBonus, 165],
              ['VIAJE', tTrip, 250],
              ['GASOLINA', tGas, 335],
            ].map(([label, at, top]) => (
              <FlowItem key={String(label)} inAt={Number(at)} enter="right" style={{left: 70, top: Number(top)}}>
                <StampLabel text={String(label)} color={COLORS.green} size={30} />
              </FlowItem>
            ))}
          </MiniCard>
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="congress" label="EL CONGRESISTA" at={8} />
    </IllustratedSlide>
  );
};
