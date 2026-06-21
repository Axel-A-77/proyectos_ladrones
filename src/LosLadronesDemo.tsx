import React from 'react';
import {Movie} from './Movie';
import {DEMO_SEGMENTS} from './segments';

export const LosLadronesDemo: React.FC<{reducedMotion?: boolean}> = ({reducedMotion}) => (
  <Movie segments={DEMO_SEGMENTS} reducedMotion={reducedMotion} />
);
