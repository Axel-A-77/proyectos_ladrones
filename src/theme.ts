// Paleta y constantes globales del proyecto.
// Dirección artística: infografía ilustrada doodle con fondo amarillo cálido uniforme.
export const COLORS = {
  white: '#FFFFFF',
  paper: '#FFF8E7', // paneles internos, tarjetas y recortes ilustrados
  cream: '#FFF1C9', // rellenos internos; ya no se usa como fondo exterior de escenas
  sun: '#F4C95D', // fondo principal uniforme de todas las escenas ilustradas
  ink: '#15120D', // tinta (contornos, texto)
  red: '#E94B3C',
  gold: '#F2B84B',
  night: '#17140E',
  green: '#79B84A',
  blue: '#5AA6D8',
  orange: '#F29A4A',
  purple: '#7454C8',
  muted: '#8E877A',
} as const;

// Ruta del video base (resuelve a /assets por setPublicDir).
// El medio no se versiona por tamaño, pero debe existir antes del render final.
export const PAPA_SRC = 'video/papa_h264.mp4';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
