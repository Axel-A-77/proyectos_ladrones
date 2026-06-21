import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {COLORS} from './theme';
import {FONTS} from './fonts';
import {PapaBase} from './components/PapaBase';
import {Overlay} from './components/Overlay';
import {Subtitles} from './components/Subtitles';
import {SCENES} from './scenes/all';
import {Segment} from './segments';
import {ReducedMotionProvider} from './lib/reducedMotion';

const FADE = 12; // frames — fundido corto (~0.4s)

// Renderizador del modelo de cortes:
// - PapaBase: audio + video de papá, continuos por debajo (papá limpio donde no hay escena).
// - Cada tramo ANIM/TITLE se dibuja como escena opaca a pantalla completa.
// - Cortes suaves: crossfade con papá al entrar/salir de un bloque de animación;
//   entre animaciones contiguas, la entrante se solapa sobre la saliente (papá no asoma).
export const Movie: React.FC<{segments: Segment[]; reducedMotion?: boolean}> = ({
  segments,
  reducedMotion,
}) => {
  const {fps} = useVideoConfig();

  return (
    <ReducedMotionProvider force={reducedMotion}>
      <AbsoluteFill style={{backgroundColor: COLORS.cream, fontFamily: FONTS.body}}>
        <PapaBase />

        {segments.map((seg, i) => {
          if (seg.kind === 'PAPA' || !seg.scene) return null;
          const Comp = SCENES[seg.scene];
          if (!Comp) return null;

          const prev = segments[i - 1];
          const next = segments[i + 1];
          const prevAnim = !!prev && prev.kind !== 'PAPA';
          const nextAnim = !!next && next.kind !== 'PAPA';
          const isStart = seg.from === 0;

          const fadeIn = isStart ? 0 : FADE;
          const fadeOut = nextAnim ? 0 : FADE;
          const fromF = Math.round(seg.from * fps) - (prevAnim ? FADE : 0);
          const toF = Math.round(seg.to * fps);
          const durationInFrames = toF - fromF;

          return (
            <Sequence key={seg.id} from={fromF} durationInFrames={durationInFrames} name={seg.id}>
              <Overlay
                tone={seg.tone}
                durationInFrames={durationInFrames}
                fadeIn={fadeIn}
                fadeOut={fadeOut}
              >
                <Comp durationInFrames={durationInFrames} fromSec={fromF / fps} />
              </Overlay>
            </Sequence>
          );
        })}

        {/* Subtítulos: última capa, encima de papá y de todas las animaciones. */}
        <Subtitles />
      </AbsoluteFill>
    </ReducedMotionProvider>
  );
};
