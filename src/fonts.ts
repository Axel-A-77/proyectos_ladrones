// Tipografías manuscritas (escritas a mano) + una legible para subtítulos.
import {loadFont as loadMarker} from '@remotion/google-fonts/PermanentMarker';
import {loadFont as loadKalam} from '@remotion/google-fonts/Kalam';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';

const marker = loadMarker();
const kalam = loadKalam('normal', {weights: ['400', '700']});
const nunito = loadNunito('normal', {weights: ['700', '800', '900'], subsets: ['latin']});

export const FONTS = {
  display: marker.fontFamily, // títulos, rótulos, carteles (marcador a mano)
  poster: marker.fontFamily, // alias de display (compatibilidad)
  hand: kalam.fontFamily, // bocadillos, notas, texto doodle (manuscrito)
  body: nunito.fontFamily, // subtítulos (legible)
};
