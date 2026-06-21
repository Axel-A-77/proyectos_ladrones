import React from 'react';
import {SCENES as BASE_SCENES, SceneProps} from './all';
import {S04CandidateScene} from './S04CandidateScene';
import {AlcaldeSceneV2} from './AlcaldeSceneV2';
import {S31HonestySceneV2} from './S31HonestySceneV2';

export const SCENES: Record<string, React.FC<SceneProps>> = {
  ...BASE_SCENES,
  '04_politico_flaco_palabras': S04CandidateScene,
  alcalde: AlcaldeSceneV2,
  '31_diogenes_lampara': S31HonestySceneV2,
};
