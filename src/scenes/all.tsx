import React from 'react';
import {TitleScene} from './TitleScene';
import {IntroReflectionScene} from './IntroReflectionScene';
import {EufemismosScene} from './EufemismosScene';
import {AlcaldeScene} from './AlcaldeScene';
import {GobernadorInfographic} from './GobernadorInfographic';
import {CongresistaScene} from './CongresistaScene';
import {PresidenteInfographic} from './PresidenteInfographic';
import {MagiaInfographic} from './MagiaInfographic';
import {PuebloAuditorScene} from './PuebloAuditorScene';
import {S19, S20} from './Act2';
import {
  S21Infographic,
  S22Infographic,
  S23Infographic,
  S24Infographic,
  S26Infographic,
  S28Infographic,
  S29Infographic,
} from './Act3Infographic';
import {S31HonestyScene} from './S31HonestyScene';
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
  gobernador: GobernadorInfographic,
  '13_magia_negra': MagiaInfographic,
  congresista: CongresistaScene,
  presidente: PresidenteInfographic,
  '18_eufemismos': EufemismosScene,
  '19_empresa_champinon': S19,
  '20_inauguracion_piedra': S20,
  '21_campana_vs_alcapone': S21Infographic,
  '22_ladron_control_remoto': S22Infographic,
  '23_espias_clave': S23Infographic,
  '24_antes_despues_mansion': S24Infographic,
  '25_orquesta': S25Infographic,
  '26_kiosko_hospital': S26Infographic,
  '27_excel_monstruo': S27Infographic,
  '28_cuatro_juntos': S28Infographic,
  '29_whatsapp_desvanece': S29Infographic,
  '30_pueblo_auditor': PuebloAuditorScene,
  '31_diogenes_lampara': S31HonestyScene,
};
