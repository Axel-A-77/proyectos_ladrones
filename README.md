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
  Root.tsx              composiciones: LosLadrones (16:33), LosLadronesDemo, QAPeople
  LosLadrones.tsx       video completo (Movie con SEGMENTS)
  Movie.tsx             ensamblado: PapaBase + escenas Overlay + Subtitles (última capa)
  theme.ts              paleta (sun/cream/ink…), rutas, fps/medidas
  fonts.ts              Permanent Marker (display) · Kalam (mano) · Nunito (subtítulos)
  segments.ts           línea de tiempo: tramos PAPA / ANIM / TITLE
  components/           PapaBase · Overlay (tono) · Subtitles
  effects/              flow.tsx (FlowItem/FreeText/BubbleBox) · kit.tsx · DrawPath
  visual/               People.tsx (PersonBase + Diogenes) · ChapterBadge.tsx
  scenes/               all.tsx (registro) · Act1/Act1b/Act2/Act3 · *Scene.tsx · doodles.tsx
  data/                 captions.json (desde subtitulos_corregidos.srt) · words.json (Whisper)
```

Sistema visual y reglas: ver **`docs/VISUAL_SYSTEM.md`**. Auditoría: `docs/EDICION_AUDIT.md`.

## Flujo de trabajo

```bash
npm run captions     # regenera captions.json desde subtitulos_corregidos.srt (fuente maestra)
npm run typecheck    # tsc --noEmit
npm run qa           # typecheck + qa:timeline + qa:captions + qa:assets
npm run qa:stills    # fotogramas de control -> out/qa/
node scripts/contact-sheets.mjs   # docs/qa/contact-sheet.png + timeline-every-10s.png
npm run studio       # preview interactivo
npm run render       # video completo -> out/ladrones_FINAL.mp4
```

Requiere `assets/video/papa_h264.mp4` (proxy del video de papá) para el render con el medio real.

### Subtítulos
`subtitulos_corregidos.srt` es la **fuente maestra** (corregida con el guion). `subtitulos_original.srt`
es la transcripción cruda. `npm run captions` SIEMPRE lee el corregido (no reintroduce typos).

### Reduced motion
Se respeta `prefers-reduced-motion`; en render se fuerza con `--props '{"reducedMotion":true}'`.

## Notas de assets
- Video proxy H.264 en `assets/video/`; master HEVC fuera de `assets/` (no se sube a Git).
- Personajes humanos: **SVG (`PersonBase`)**, un solo estilo. PNGs del banco solo para props
  detallados aún en uso (ver `docs/ASSETS_QA.md`); el recorte vive en `trimmed/` (gitignored).
- Textos/carteles van como **texto en código**, nunca dentro de las imágenes.
