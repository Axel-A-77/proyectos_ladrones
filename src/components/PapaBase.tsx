import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, staticFile} from 'remotion';
import {PAPA_SRC} from '../theme';

// Capa base continua.
// - El AUDIO de papá suena de principio a fin (la columna vertebral del video).
// - Su IMAGEN (muteada) corre sincronizada por debajo.
// Donde una escena de animación lo tape, no se ve a papá pero su voz sigue.
// Donde no hay escena, se ve a papá limpio.
export const PapaBase: React.FC = () => {
  return (
    <>
      <Audio src={staticFile(PAPA_SRC)} />
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(PAPA_SRC)}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AbsoluteFill>
    </>
  );
};
