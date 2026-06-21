import React from 'react';
import {Composition} from 'remotion';
import {LosLadrones} from './LosLadrones';
import {LosLadronesDemo} from './LosLadronesDemo';
import {FPS, WIDTH, HEIGHT} from './theme';
import {CAPTIONS} from './lib/captions';

// Duración del video completo: hasta el final del último subtítulo + un respiro.
const lastEnd = CAPTIONS[CAPTIONS.length - 1].end;
const FULL_FRAMES = Math.ceil((lastEnd + 1.2) * FPS);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video completo (16:33) */}
      <Composition
        id="LosLadrones"
        component={LosLadrones}
        durationInFrames={FULL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{reducedMotion: false}}
      />

      {/* DEMO de 30s para validar el modelo de cortes */}
      <Composition
        id="LosLadronesDemo"
        component={LosLadronesDemo}
        durationInFrames={30 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{reducedMotion: false}}
      />
    </>
  );
};
