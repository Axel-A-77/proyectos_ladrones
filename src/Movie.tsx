import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {COLORS} from './theme';
import {FONTS} from './fonts';
import {PapaBase} from './components/PapaBase';
import {Overlay} from './components/Overlay';
import {SCENES} from './scenes/allV2';
import {Segment} from './segments';
import {ReducedMotionProvider} from './lib/reducedMotion';

const FADE = 12;

export const Movie: React.FC<{segments: Segment[]; reducedMotion?: boolean}> = ({segments, reducedMotion}) => {
  const {fps} = useVideoConfig();

  return (
    <ReducedMotionProvider force={reducedMotion}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.sun,
          fontFamily: FONTS.body,
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'geometricPrecision',
          textShadow: '0 1px 0 rgba(255,248,231,0.95), 0 0 1px rgba(21,18,13,0.35)',
        }}
      >
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
              <Overlay tone={seg.tone} durationInFrames={durationInFrames} fadeIn={fadeIn} fadeOut={fadeOut}>
                <Comp durationInFrames={durationInFrames} fromSec={fromF / fps} />
              </Overlay>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </ReducedMotionProvider>
  );
};
