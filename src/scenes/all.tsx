import React from 'react';
import {TitleScene} from './TitleScene';
import {IntroReflectionScene} from './IntroReflectionScene';
import {EufemismosScene} from './EufemismosScene';
import {AlcaldeScene} from './AlcaldeScene';
import {GobernadorScene} from './GobernadorScene';
import {CongresistaScene} from './CongresistaScene';
import {PresidenteScene} from './PresidenteScene';
import {MagiaScene} from './MagiaScene';
import {PuebloAuditorScene} from './PuebloAuditorScene';
import {S19, S20} from './Act2';
import {S21, S22, S23, S24, S26, S28, S29, S31} from './Act3';
import {S02, S03} from './Act1';
import {S04, S05, S06} from './Act1b';
import {S01Puertas} from './S01Puertas';
import {S25Infographic} from './S25Infographic';
import {S27Infographic} from './S27Infographic';

export type SceneProps = {durationInFrames: number; fromSec: number};

const S00: React.FC<SceneProps> = () => <TitleScene />;
const S00Reflection: React.FC<SceneProps> = () => <IntroReflectionScene />;

export const SCENES: Record<string, React.FC<SceneProps>> = {
  '00_titulo': S00,
  '00_reflexion': S00Reflection,
  '01_puerta_sillon_billetera': S01Puertas,
  '02_silencio_complice': S02,
  '03_casa_del_pueblo': S03,
  '04_politico_flaco_palabras': S04,
  '05_presupuesto_cuchara': S05,
  '06_abrazo_roba_billetera': S06,
  alcalde: AlcaldeScene,
  gobernador: GobernadorScene,
  '13_magia_negra': MagiaScene,
  congresista: CongresistaScene,
  presidente: PresidenteScene,
  '18_eufemismos': EufemismosScene,
  '19_empresa_champinon': S19,
  '20_inauguracion_piedra': S20,
  '21_campana_vs_alcapone': S21,
  '22_ladron_control_remoto': S22,
  '23_espias_clave': S23,
  '24_antes_despues_mansion': S24,
  '25_orquesta': S25Infographic,
  '26_kiosko_hospital': S26,
  '27_excel_monstruo': S27Infographic,
  '28_cuatro_juntos': S28,
  '29_whatsapp_desvanece': S29,
  '30_pueblo_auditor': PuebloAuditorScene,
  '31_diogenes_lampara': S31,
};
