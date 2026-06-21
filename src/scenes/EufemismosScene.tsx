import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleBuilding, DoodleEnvelope, DoodleMoneyBag} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type Row = {
  crime: string;
  excuse: string;
  at: number;
  soft: number;
  icon: React.ReactNode;
};

export const EufemismosScene: React.FC<{durationInFrames: number; fromSec: number}> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);

  const rows: Row[] = [
    {
      crime: 'ROBÉ',
      excuse: 'ERRORES ADMINISTRATIVOS',
      at: f('robé', 536.5),
      soft: f('errores', 539.5),
      icon: <DoodleMoneyBag height={86} />,
    },
    {
      crime: 'METÍ A MI PRIMO',
      excuse: 'PERSONAL DE CONFIANZA',
      at: f('primo', 542),
      soft: f('personal', 545),
      icon: <PersonBase outfit="suit" expression="smug" height={110} />,
    },
    {
      crime: 'ME DESCUBRIERON',
      excuse: 'PERSECUCIÓN POLÍTICA',
      at: f('descubrieron', 548),
      soft: f('persecución', 550.5),
      icon: <DoodleEnvelope height={92} />,
    },
    {
      crime: 'ME ENRIQUECÍ',
      excuse: 'INGRESOS CON SUSTENTO',
      at: f('enriquecí', 553),
      soft: f('sustento', 556),
      icon: <DoodleBuilding height={105} />,
    },
  ];

  return (
    <IllustratedSlide title="EL DICCIONARIO DEL CORRUPTO">
      <PaperPanel style={{left: 120, top: 45, width: 1490, height: 770, padding: 0}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: '50%', height: 92, background: COLORS.red, borderRadius: '20px 0 0 0', borderBottom: `6px solid ${COLORS.ink}`, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 44, color: COLORS.paper}}>
          LO QUE HIZO
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: '50%', height: 92, background: COLORS.blue, borderRadius: '0 20px 0 0', borderBottom: `6px solid ${COLORS.ink}`, display: 'grid', placeItems: 'center', fontFamily: FONTS.display, fontSize: 44}}>
          LO QUE DICE
        </div>
        <div style={{position: 'absolute', left: '50%', top: 0, width: 7, height: '100%', background: COLORS.ink}} />

        {rows.map((row, i) => {
          const top = 105 + i * 158;
          return (
            <React.Fragment key={row.crime}>
              <FlowItem inAt={row.at} enter="left" style={{left: 25, top}}>
                <div style={{width: 675, height: 135, borderBottom: i < rows.length - 1 ? `4px dashed ${COLORS.muted}` : undefined, display: 'flex', alignItems: 'center', gap: 24, padding: '0 18px', boxSizing: 'border-box'}}>
                  <div style={{width: 120, display: 'grid', placeItems: 'center'}}>{row.icon}</div>
                  <div style={{fontFamily: FONTS.display, fontSize: 40, color: COLORS.ink}}>{row.crime}</div>
                  <div style={{marginLeft: 'auto', color: COLORS.red, fontSize: 68, fontWeight: 900, transform: 'rotate(-7deg)'}}>×</div>
                </div>
              </FlowItem>
              <FlowItem inAt={row.soft} enter="right" style={{left: 785, top}}>
                <div style={{width: 660, height: 135, borderBottom: i < rows.length - 1 ? `4px dashed ${COLORS.muted}` : undefined, display: 'flex', alignItems: 'center', padding: '0 26px', boxSizing: 'border-box'}}>
                  <div style={{fontFamily: FONTS.display, fontSize: 35, color: COLORS.ink, lineHeight: 1.05}}>{row.excuse}</div>
                  <StampLabel text="VERSIÓN OFICIAL" color={COLORS.blue} size={24} style={{right: 12, bottom: 16, transform: 'rotate(3deg) scale(.72)'}} />
                </div>
              </FlowItem>
            </React.Fragment>
          );
        })}
      </PaperPanel>
      <ChapterBadge outfit="suit" label="EL LENGUAJE" at={8} />
    </IllustratedSlide>
  );
};
