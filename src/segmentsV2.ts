import {SEGMENTS as BASE_SEGMENTS, Segment} from './segments';

const base = BASE_SEGMENTS.filter((s) => s.id !== 'papa-tesis' && s.id !== 's31' && s.id !== 'papa-cierre');

const end: Segment[] = [
  {id: 'papa-tesis', kind: 'PAPA', from: 917, to: 955.691},
  {id: 's31', kind: 'ANIM', scene: '31_diogenes_lampara', tone: 'sun', from: 955.691, to: 970.827},
  {id: 'papa-cierre', kind: 'PAPA', from: 970.827, to: 995},
];

export const SEGMENTS: Segment[] = [...base, ...end].sort((a, b) => a.from - b.from);
