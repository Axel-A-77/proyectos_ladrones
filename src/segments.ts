import {Tone} from './components/Overlay';

export type Segment = {
  id: string;
  kind: 'PAPA' | 'ANIM' | 'TITLE';
  from: number; // segundos — timeline absoluto (= tiempo del audio/video de papá)
  to: number;
  scene?: string; // id en SCENES (ANIM/TITLE)
  tone?: Tone; // fondo de la animación: 'cream' (comedia) | 'dark' (grave)
  note?: string;
};

const t = (m: number, s: number) => m * 60 + s;

// DEMO — primeros 30s para validar el modelo de cortes.
export const DEMO_SEGMENTS: Segment[] = [
  {id: 'titulo', kind: 'TITLE', scene: '00_titulo', tone: 'cream', from: 0, to: 4, note: 'Título (se dibuja)'},
  {id: 'papa-intro', kind: 'PAPA', from: 4, to: 17, note: 'Papá a cámara — saludo'},
  {id: 'anim-01', kind: 'ANIM', scene: '01_puerta_sillon_billetera', tone: 'cream', from: 17, to: 27},
  {id: 'papa-2', kind: 'PAPA', from: 27, to: 30},
];

// VIDEO COMPLETO — según Plan_de_Edicion.md.
// Solo se dibujan los tramos ANIM/TITLE (cubren a papá); en los PAPA se ve el
// video base. Los huecos del plan se cierran para que no parpadee papá entre animaciones.
export const SEGMENTS: Segment[] = [
  {id: 'titulo', kind: 'TITLE', scene: '00_titulo', tone: 'cream', from: 0, to: t(0, 4), note: 'Título'},
  {id: 'papa-intro', kind: 'PAPA', from: t(0, 4), to: t(0, 17), note: 'Saludo e intro ⭐'},
  {id: 's01', kind: 'ANIM', scene: '01_puerta_sillon_billetera', tone: 'cream', from: t(0, 17), to: t(0, 27)},
  {id: 'papa-reflexion', kind: 'PAPA', from: t(0, 27), to: t(1, 9), note: 'humor / verdades / la patria ⭐'},
  {id: 's02', kind: 'ANIM', scene: '02_silencio_complice', tone: 'cream', from: t(1, 9), to: t(1, 20)},
  {id: 's03', kind: 'ANIM', scene: '03_casa_del_pueblo', tone: 'cream', from: t(1, 20), to: t(1, 40)},
  {id: 's04', kind: 'ANIM', scene: '04_politico_flaco_palabras', tone: 'cream', from: t(1, 40), to: t(2, 0)},
  {id: 's05', kind: 'ANIM', scene: '05_presupuesto_cuchara', tone: 'cream', from: t(2, 0), to: t(2, 20)},
  {id: 's06', kind: 'ANIM', scene: '06_abrazo_roba_billetera', tone: 'cream', from: t(2, 20), to: t(2, 32)},
  {id: 'papa-alcalde', kind: 'PAPA', from: t(2, 32), to: t(2, 38), note: 'presenta al alcalde ⭐'},
  {id: 'r-alcalde', kind: 'ANIM', scene: 'alcalde', tone: 'cream', from: t(2, 38), to: t(3, 14)},
  {id: 'papa-gobernador', kind: 'PAPA', from: t(3, 14), to: t(3, 22), note: 'presenta al gobernador ⭐'},
  {id: 'r-gobernador', kind: 'ANIM', scene: 'gobernador', tone: 'cream', from: t(3, 22), to: t(4, 50)},
  {id: 's13', kind: 'ANIM', scene: '13_magia_negra', tone: 'cream', from: t(4, 50), to: t(5, 51)},
  {id: 'papa-congresista', kind: 'PAPA', from: t(5, 51), to: t(5, 59), note: 'presenta al congresista ⭐'},
  {id: 'r-congresista', kind: 'ANIM', scene: 'congresista', tone: 'cream', from: t(5, 59), to: t(7, 12)},
  {id: 'papa-presidente', kind: 'PAPA', from: t(7, 12), to: t(7, 22), note: 'presenta al presidente ⭐'},
  {id: 'r-presidente', kind: 'ANIM', scene: 'presidente', tone: 'cream', from: t(7, 22), to: t(8, 51)},
  {id: 's18', kind: 'ANIM', scene: '18_eufemismos', tone: 'cream', from: t(8, 51), to: t(9, 26)},
  {id: 's19', kind: 'ANIM', scene: '19_empresa_champinon', tone: 'cream', from: t(9, 26), to: t(9, 57)},
  {id: 's20', kind: 'ANIM', scene: '20_inauguracion_piedra', tone: 'cream', from: t(9, 57), to: t(10, 28)},
  {id: 's21', kind: 'ANIM', scene: '21_campana_vs_alcapone', tone: 'cream', from: t(10, 28), to: t(11, 4)},
  {id: 's22', kind: 'ANIM', scene: '22_ladron_control_remoto', tone: 'cream', from: t(11, 4), to: t(11, 22)},
  {id: 's23', kind: 'ANIM', scene: '23_espias_clave', tone: 'cream', from: t(11, 22), to: t(11, 40)},
  {id: 's24', kind: 'ANIM', scene: '24_antes_despues_mansion', tone: 'cream', from: t(11, 40), to: t(12, 18)},
  {id: 's25', kind: 'ANIM', scene: '25_orquesta', tone: 'cream', from: t(12, 18), to: t(12, 54)},
  {id: 's26', kind: 'ANIM', scene: '26_kiosko_hospital', tone: 'cream', from: t(12, 54), to: t(13, 28)},
  {id: 'papa-excel', kind: 'PAPA', from: t(13, 28), to: t(13, 34), note: 'no teme a la justicia, teme al Excel ⭐'},
  {id: 's27', kind: 'ANIM', scene: '27_excel_monstruo', tone: 'cream', from: t(13, 34), to: t(13, 54)},
  {id: 's28', kind: 'ANIM', scene: '28_cuatro_juntos', tone: 'cream', from: t(13, 54), to: t(14, 27)},
  {id: 's29', kind: 'ANIM', scene: '29_whatsapp_desvanece', tone: 'cream', from: t(14, 27), to: t(14, 48)},
  {id: 'papa-giro', kind: 'PAPA', from: t(14, 48), to: t(15, 32), note: 'el giro + la tesis ⭐ (a cámara)'},
  {id: 's31', kind: 'ANIM', scene: '31_diogenes_lampara', tone: 'cream', from: t(15, 32), to: t(16, 11)},
  {id: 'papa-cierre', kind: 'PAPA', from: t(16, 11), to: t(16, 35), note: 'cierre día del padre ⭐'},
];
