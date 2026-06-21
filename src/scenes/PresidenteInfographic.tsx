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

  return (
    <IllustratedSlide title="EL CAMPEÓN DEL YO NO FUI">
      <FlowItem inAt={0} outAt={tUp - 8} enter="left" exit="up" style={{left: 130, top: 170}}>
        <PersonBase outfit="president" expression="smug" height={520} />
      </FlowItem>
      <FlowItem inAt={10} outAt={tUp - 8} enter="scale" exit="fade" style={{left: 650, top: 280}}>
        <StampLabel text="CAIGA QUIEN CAIGA" color={COLORS.red} size={60} />
      </FlowItem>

      <FlowItem inAt={tUp} outAt={tCreate - 8} enter="scale" exit="up" style={{left: 85, top: 65}}>
        <PaperPanel style={{width: 1560, height: 730}}>
          <StampLabel text="TODOS CAEN HACIA ARRIBA" color={COLORS.red} size={46} style={{left: 460, top: 35}} />
          <div style={{position: 'absolute', left: 590, top: 280}}><PersonBase outfit="president" expression="smug" height={380} /></div>
          {[
            ['ASESOR', 'MINISTERIO', 60, 145],
            ['AMIGO', 'DIRECTORIO', 400, 95],
            ['APORTANTE', 'EMBAJADA', 760, 145],
            ['FAMILIAR', 'CARGO', 1120, 95],
          ].map(([who, where, left, top], i) => (
            <MiniCard key={String(who)} title={String(who)} accent={i % 2 ? COLORS.blue : COLORS.orange} style={{left: Number(left), top: Number(top), width: 300, height: 230}}>
              <div style={{position: 'absolute', left: 70, top: 80}}><DoodleBuilding height={120} /></div>
              <StampLabel text={String(where)} color={COLORS.green} size={24} style={{left: 55, top: 175, transform: 'scale(.82)'}} />
            </MiniCard>
          ))}
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tCreate} outAt={tIndignant - 8} enter="scale" exit="up" style={{left: 90, top: 60}}>
        <PaperPanel style={{width: 1540, height: 730}}>
          <div style={{position: 'absolute', left: 70, top: 45, fontFamily: FONTS.display, fontSize: 46, color: COLORS.blue}}>EL PAÍS PIDE</div>
          <div style={{position: 'absolute', right: 100, top: 45, fontFamily: FONTS.display, fontSize: 46, color: COLORS.red}}>ÉL ENTREGA</div>
          <div style={{position: 'absolute', left: 760, top: 95, width: 8, height: 560, background: COLORS.ink}} />
          {[
            ['JUSTICIA', 'COMISIÓN', 160],
            ['RESPUESTAS', 'MENSAJE', 330],
            ['PRUEBAS', 'UNIDAD', 500],
          ].map(([ask, reply, top], i) => (
            <React.Fragment key={String(ask)}>
              <StampLabel text={String(ask)} color={COLORS.blue} size={34} style={{left: 90, top: Number(top)}} />
              <div style={{position: 'absolute', left: 620, top: Number(top) + 30}}><Arrow from={[0, 0]} to={[120, 0]} /></div>
              <MiniCard title={String(reply)} accent={COLORS.red} style={{left: 900, top: Number(top) - 15, width: 430, height: 125}}>
                <div style={{position: 'absolute', left: 28, top: 57}}>{i === 0 ? <DoodleStamp height={58} /> : <DoodleEnvelope height={60} />}</div>
              </MiniCard>
            </React.Fragment>
          ))}
        </PaperPanel>
      </FlowItem>

      <FlowItem inAt={tIndignant} enter="scale" style={{left: 150, top: 75}}>
        <PaperPanel style={{width: 1450, height: 700}}>
          <div style={{position: 'absolute', left: 120, top: 145}}><PersonBase outfit="president" expression="worried" arm="chest" height={470} /></div>
          <StampLabel text="YO TAMBIÉN ESTOY INDIGNADO" color={COLORS.red} size={46} style={{left: 520, top: 90}} />
          <MiniCard title="ESCENOGRAFÍA" accent={COLORS.purple} style={{left: 760, top: 225, width: 530, height: 300}}>
            <StampLabel text="BANDERA" color={COLORS.blue} size={28} style={{left: 45, top: 100}} />
            <StampLabel text="CAFÉ" color={COLORS.orange} size={28} style={{left: 200, top: 100}} />
            <StampLabel text="DONAS" color={COLORS.red} size={28} style={{left: 335, top: 100}} />
          </MiniCard>
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="president" label="EL PRESIDENTE" at={8} />
    </IllustratedSlide>
  );
};
