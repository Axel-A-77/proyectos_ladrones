import React from 'react';
import {Movie} from './Movie';
import {SEGMENTS} from './segments';

export const LosLadrones: React.FC<{reducedMotion?: boolean}> = ({reducedMotion}) => (
  <Movie segments={SEGMENTS} reducedMotion={reducedMotion} />
);
