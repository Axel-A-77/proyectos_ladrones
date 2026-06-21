import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {Arrow, IllustratedSlide, MiniCard, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleBuilding, DoodleEnvelope, DoodleStamp} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const PresidenteInfographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tUp = f('arriba', 465);
  const tCreate = f('crea', 485);
  const tIndignant = f('indignado', 512.2);

  const promotions = [
    ['ASESOR', 'MINISTERIO', 45, 160, COLORS.orange],
    ['AMIGO', 'DIRECTORIO', 405, 125, COLORS.blue],
    ['APORTANTE', 'EMBAJADA', 765, 160, COLORS.orange],
    ['FAMILIAR', 'CARGO', 1125, 125, COLORS.blue],
  ] as const;

  return (
    <IllustratedSlide title="EL CAMPEON DEL YO NO FUI">
      <FlowItem inAt={0} outAt={tUp - 8} enter="left" exit="up" style={{left: 130, top: 170}}>
        <PersonBase outfit="president" expression="smug" height={520} />
      </FlowItem>
      <FlowItem inAt={10} outAt={tUp - 8} enter="scale" exit="fade" style={{left: 650, top: 280}}>
        <StampLabel text="CAIGA QUIEN CAIGA" color={COLORS.red} size={54} maxWidth={540} />
      </FlowItem>

      <FlowItem inAt={tUp} outAt={tCreate - 8} enter="scale" exit="up" style={{left: 85, top: 55}}>
        <PaperPanel style={{width: 1560, height: 740}}>
          <StampLabel text="TODOS CAEN HACIA ARRIBA" color={COLORS.red} size={39} maxWidth={620} style={{left: 470, top: 28, transform: 'rotate(-2deg)'}} />
          {promotions.map(([who, where, left, top, color]) => (
            <MiniCard key={who} title={who} accent={color} style={{left, top, width: 300, height: 230}}>
              <div style={{position: 'absolute', left: 70, top: 80}}><DoodleBuilding height={120} /></div>
              <StampLabel text={where} color={COLORS.green} size={23} maxWidth={200} style={{left: 50, top: 176, transform: 'rotate(-2deg)'}} />
            </MiniCard>
          ))}
          <div style={{position: 'absolute', left: 610, top: 380}}><PersonBase outfit="president" expression="smug" height={330} /></div>
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tCreate} outAt={tIndignant - 8} enter="scale" exit="up" style={{left: 90, top: 55}}>
        <PaperPanel style={{width: 1540, height: 735}}>
          <div style={{position: 'absolute', left: 70, top: 45, fontFamily: FONTS.display, fontSize: 44, color: COLORS.blue}}>EL PAIS PIDE</div>
          <div style={{position: 'absolute', right: 100, top: 45, fontFamily: FONTS.display, fontSize: 44, color: COLORS.red}}>EL ENTREGA</div>
          <div style={{position: 'absolute', left: 760, top: 95, width: 8, height: 560, background: COLORS.ink}} />
          {[
            ['JUSTICIA', 'COMISION', 160],
            ['RESPUESTAS', 'MENSAJE', 330],
            ['PRUEBAS', 'UNIDAD', 500],
          ].map(([ask, reply, top], i) => (
            <React.Fragment key={String(ask)}>
              <StampLabel text={String(ask)} color={COLORS.blue} size={32} maxWidth={300} style={{left: 90, top: Number(top)}} />
              <div style={{position: 'absolute', left: 620, top: Number(top) + 30}}><Arrow from={[0, 0]} to={[120, 0]} /></div>
              <MiniCard title={String(reply)} accent={COLORS.red} style={{left: 900, top: Number(top) - 15, width: 430, height: 125}}>
                <div style={{position: 'absolute', left: 28, top: 57}}>{i === 0 ? <DoodleStamp height={58} /> : <DoodleEnvelope height={60} />}</div>
              </MiniCard>
            </React.Fragment>
          ))}
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tIndignant} enter="scale" style={{left: 150, top: 70}}>
        <PaperPanel style={{width: 1450, height: 705}}>
          <div style={{position: 'absolute', left: 120, top: 145}}><PersonBase outfit="president" expression="worried" arm="chest" height={470} /></div>
          <StampLabel text="YO TAMBIEN ESTOY INDIGNADO" color={COLORS.red} size={39} maxWidth={650} style={{left: 500, top: 80}} />
          <MiniCard title="ESCENOGRAFIA" accent={COLORS.purple} style={{left: 760, top: 225, width: 530, height: 300}}>
            <StampLabel text="BANDERA" color={COLORS.blue} size={27} maxWidth={150} style={{left: 40, top: 100}} />
            <StampLabel text="CAFE" color={COLORS.orange} size={27} maxWidth={120} style={{left: 205, top: 100}} />
            <StampLabel text="DONAS" color={COLORS.red} size={27} maxWidth={140} style={{left: 345, top: 100}} />
          </MiniCard>
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="president" label="EL PRESIDENTE" at={4} />
    </IllustratedSlide>
  );
};
