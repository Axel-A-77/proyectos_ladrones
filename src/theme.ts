// Paleta y constantes globales del proyecto.
export const COLORS = {
  white: '#FFFFFF',
  paper: '#FFFDF7', // casi blanco cálido (rellenos que deben resaltar sobre el amarillo)
  cream: '#FBF8F1', // crema (descansos / momentos serios, sin negros)
  sun: '#FBE7A1', // amarillo cálido (fondo principal de comedia)
  ink: '#15120D', // tinta (contornos, texto)
  red: '#E0392B',
  gold: '#F2B705',
  night: '#17140E', // (sin uso por ahora: el usuario pidió sin negros)
  green: '#1F9E5A',
  blue: '#5AA6D8',
  orange: '#F29A4A',
  purple: '#7454C8',
  muted: '#9A917F',
} as const;

// Ruta del video base (resuelve a /assets por setPublicDir).
// Usamos la copia H.264 para que se previsualice en el navegador (el HEVC original
// solo se decodifica en el render). El render final también usa esta copia.
export const PAPA_SRC = 'video/papa_h264.mp4';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
