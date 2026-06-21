# Sistema visual — Los ladrones de cuello y corbata

Doodle 2D animado (Remotion 4 · React 18 · TS · 1920×1080 · 30fps). Estilo: contornos
negros gruesos, colores planos, fondos cálidos, jerarquía clara, **frase visual** (los
elementos se acumulan hasta cerrar cada metáfora).

## Personajes — `src/visual/People.tsx`
`PersonBase` es el sistema ÚNICO de personajes (SVG original, no clipart).
- `outfit`: `citizen | suit | mayor | governor | congress | president | auditor | father`
- `expression`: `neutral | sad | greedy | worried | smug | angry | hopeful | tired`
- `build`: `normal | thin | fat` (solo cambia el torso; cabeza/altura iguales)
- `arm`: `down | chest | up | wave` · `shades` (lentes) · `flip` · `skin` · `height`
- `Diogenes`: figura propia en el mismo lenguaje (toga, barba, lámpara).
- `ChapterBadge` (`src/visual/ChapterBadge.tsx`): medallón del capítulo (esq. sup. der.).

Todos los personajes humanos del video usan PersonBase. NO debe quedar ningún PNG
humano realista (p. ej. el viejo `14_congresista_dormido`).

## Objetos — `src/scenes/doodles.tsx`
SVG originales creados por necesidad de escena: puerta, trono, billetera, país, casa,
ventana, sofá, peaje, llave, olla, cuchara, árbol, banca, foco, semáforo, puente,
hospital, carretera, colegio, gota de agua, camioneta, edificio, sello, documento,
reloj, libro, tijera+cinta, lupa, recibo, calculadora, curul, detector, TV, control,
sobre, hoja de gastos (sin marca). PNGs del banco solo para ilustraciones-prop
detalladas que aún se usan (ver `docs/ASSETS_QA.md`).

## Fondos y subtítulos
- `Overlay` (`src/components/Overlay.tsx`): tono por escena — `sun` (amarillo cálido,
  comedia) / `cream` (serio). SIN negros. Degradado cálido sutil.
- `Subtitles` (`src/components/Subtitles.tsx`): última capa, ≤2 líneas, ancho ≤78%,
  `pointerEvents:none`, placa semitransparente. Zona y≈860–1020 (nada importante debajo de y=850).

## Animación / flujo — `src/effects/flow.tsx`
`FlowItem` (inAt/outAt, enter/exit, opacity-gated). Convenciones de "frase visual":
- Cada escena tiene **composición base desde el frame 0**.
- Los elementos de una metáfora **se acumulan** (sin `outAt`) hasta cerrarla.
- Sincronía por palabra: `beatAt` + Whisper (`src/data/words.json`), fallback al tiempo del SRT.

## Capas (Movie.tsx)
`PapaBase` (video+audio continuos) → escenas `Overlay` por segmento → `Subtitles` (encima).
