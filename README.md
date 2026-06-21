# Los ladrones de cuello y corbata — video doodle 2D

Video explicativo animado (estilo doodle) renderizado a MP4 1080p con **Remotion**.
Duración objetivo: **16:33**.

## El modelo: por CORTES (no overlay sobre la cara)

- El **audio** de papá corre de principio a fin (columna vertebral).
- El **video** corta entre dos cosas, siempre a pantalla completa:
  - 🎤 **PAPÁ**: su grabación, limpia, sin nada encima.
  - 🎨 **ANIMACIÓN**: una escena de gráficos cubre toda la pantalla; su voz sigue debajo.
- Lo único constante: los **subtítulos** (abajo).

### Cómo está implementado

`PapaBase` es una capa continua con `<Audio>` (sonido) + `<OffthreadVideo muted>` (imagen),
ambos sincronizados al timeline absoluto. Encima se montan **escenas opacas** (`Overlay`)
solo en los tramos de animación: tapan a papá sin tocar su cara, con fundidos cortos.
Donde no hay escena, se ve a papá limpio. Los `Subtitles` van siempre arriba de todo.

Así el audio nunca se corta ni se desincroniza (el elemento de video/audio nunca se desmonta).

## Estructura

```
src/
  Root.tsx              registro de composiciones
  LosLadronesDemo.tsx   ensamblado (capa base + cortes + subtítulos)
  theme.ts              paleta, rutas, fps/medidas
  fonts.ts              tipografías (Nunito, Patrick Hand, Luckiest Guy)
  segments.ts           línea de tiempo: array de tramos PAPA / ANIM
  components/
    PapaBase.tsx        audio + video continuos
    Overlay.tsx         fondo por tono + fundidos de cada corte
    Subtitles.tsx       subtítulos desde el .srt
  effects/
    Appear.tsx          "aparecer" (rebote suave, escalonado)
    DrawPath.tsx        "se dibuja" (trazo SVG)
  scenes/
    registry.ts         id de escena -> componente
    TitleScene.tsx      00_titulo
    Scene01Puerta.tsx   01_puerta_sillon_billetera
  data/captions.json    generado desde subtitulos.srt
```

## Flujo de trabajo

```bash
npm run captions     # regenera subtítulos si cambia el .srt
npm run studio       # preview interactivo (http://localhost:3000)
npm run render       # renderiza el DEMO -> out/demo.mp4
npm run render:full  # (cuando exista) video completo -> out/ladrones.mp4
```

### Reduced motion

Se respeta `prefers-reduced-motion`: en preview detecta el ajuste del sistema;
en render se puede forzar con `--props '{"reducedMotion":true}'` (desactiva rebotes y trazos).

## Notas de assets

- El video se transcodifica a H.264 (`assets/video/papa_h264.mp4`) para que se previsualice
  en el navegador (el HEVC original solo se decodifica en el render). El master HEVC se
  guarda fuera de `assets/` para no copiarlo en cada bundle.
- Viñetas, carteles y etiquetas (PODER, EL PAÍS, HOSPITAL…) van como **texto en el código**,
  nunca dentro de las imágenes.
- `assets/ilustraciones/31_diogenes_lampara .png` tiene un espacio en el nombre: renombrar
  antes de usarlo (`31_diogenes_lampara.png`).
