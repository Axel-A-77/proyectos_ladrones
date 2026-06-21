import {Config} from '@remotion/cli/config';

// Las ilustraciones y el video viven en /assets, no en /public.
// Con esto, staticFile('video/papa.mp4') y staticFile('ilustraciones/xx.png') resuelven a /assets.
Config.setPublicDir('assets');

// Calidad para el render final (1080p H.264).
Config.setVideoImageFormat('jpeg');
Config.setCrf(18);
Config.setOverwriteOutput(true);
