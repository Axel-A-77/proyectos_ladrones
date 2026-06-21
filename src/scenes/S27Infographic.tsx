import React from 'react';
import {useVideoConfig} from 'remotion';
import {FlowItem} from '../effects/flow';
import {PersonBase} from '../visual/People';
import {ChapterBadge} from '../visual/ChapterBadge';
import {IllustratedSlide, MiniCard, ObjectLabel, PaperPanel, StampLabel} from '../visual/Infographic';
import {DoodleSpreadsheet} from './doodles';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {beatAt} from './util';

type P = {durationInFrames: number; fromSec: number};

export const S27Infographic: React.FC<P> = ({fromSec}) => {
  const {fps} = useVideoConfig();
  const f = (kw: string, fb: number) => beatAt(kw, fb, fromSec, fps);
  const tColumns = f('columnas', 819.5);
  const tTruth = f('verdad', 823);

  const columns = [
    ['MONTO', 'S/ 9 800 000', COLORS.red],
    ['FECHA', 'RECIENTE', COLORS.blue],
    ['PROVEEDOR', 'EMPRESA NUEVA', COLORS.orange],
  ] as const;

  return (
    <IllustratedSlide title="LA VERDAD EN COLUMNAS">
      <FlowItem inAt={0} enter="left" style={{left: 40, top: 220}}>
        <PersonBase outfit="suit" expression="worried" height={470} />
      </FlowItem>
      <FlowItem inAt={4} enter="scale" style={{left: 130, top: 95}}>
        <StampLabel text="JUSTICIA" color={COLORS.muted} size={30} />
      </FlowItem>

      <FlowItem inAt={f('cuadro', 815)} enter="scale" style={{left: 500, top: 60}}>
        <PaperPanel style={{width: 1100, height: 720}}>
          <div style={{position: 'absolute', left: 325, top: 30}}>
            <DoodleSpreadsheet height={300} />
          </div>
          <StampLabel text="HOJA DE GASTOS" color={COLORS.red} size={42} style={{left: 360, top: 275}} />

          {columns.map(([title, value, color], i) => (
            <FlowItem key={title} inAt={tColumns + i * 7} enter="up" style={{left: 50 + i * 340, top: 420}}>
              <MiniCard title={title} accent={color} style={{width: 300, height: 190}}>
                <div style={{position: 'absolute', left: 15, right: 15, top: 88, textAlign: 'center', fontFamily: FONTS.display, fontSize: 31, lineHeight: 1.05}}>{value}</div>
              </MiniCard>
            </FlowItem>
          ))}

          <FlowItem inAt={tTruth} enter="scale" style={{left: 365, top: 630}}>
            <ObjectLabel text="LA VERDAD NO NECESITA MAQUILLAJE" color={COLORS.red} size={34} />
          </FlowItem>
        </PaperPanel>
      </FlowItem>
      <ChapterBadge outfit="auditor" label="LOS GASTOS" at={8} />
    </IllustratedSlide>
  );
};
