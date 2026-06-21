# Auditoría de edición — defectos corregidos

| # | Defecto | Estado |
|---|---|---|
| 2.1 | `<Subtitles/>` no montado en Movie | ✅ montado como última capa, ≤2 líneas, sin tapar |
| 2.2 | `Overlay` ignoraba `tone` (siempre crema) | ✅ tono por escena: amarillo cálido / crema (sin negros) |
| 2.3 | Escenas que empezaban vacías | ✅ composición base desde frame 0 (S01–S06, alcalde, gobernador, S13, S18–S29, S31, auditor) |
| 2.4 | PNG con lienzo transparente enorme | ✅ `scripts/trim-transparent-assets.mjs` (recorte → trimmed/) + reporte |
| 2.5 | Patrón `Hero` muy chico | ✅ protagonistas h≈420–640; layouts por escena |
| 2.6 | Objetos desaparecían en vez de construir la idea | ✅ "frase visual": acumulación hasta cerrar la metáfora |
| 2.7 | Título sin mapa | ✅ `TitleScene` con galería del recorrido (PersonBase) |
| 2.8 | Ciudadano auditor ausente | ✅ `30_pueblo_auditor` (escena nueva) + split de papa-giro en `segments.ts` |
| 2.9 | Fuente de subtítulos inestable | ✅ `subtitulos_corregidos.srt` es la fuente maestra; `npm run captions` no reintroduce typos |
| 2.10 | Elementos chocando con subtítulos | ✅ nada importante bajo y=850 |
| 2.11 | README desactualizado | ✅ actualizado |

## Unificación de personajes (todos → PersonBase, sin clipart incompatible)
alcalde · gobernador · congresista (intro **y dormido en curul**) · presidente (intro+indignado) ·
candidato humilde (thin) · funcionario enriquecido (fat) · silencio cómplice · abrazo ·
campaña vs Al Capone · los cuatro · orquesta · optimista · ladrón TV · espías · **Diógenes** (SVG propio) ·
antes/después mansión. El PNG realista `14_congresista_dormido` ya NO se usa.

## Subtítulos: typos corregidos con el guion
latrocinio (no "tocino") · "el Espíritu Santo" (no "tu Santo") · "proveedor de confianza" ·
"espías de la KGB" (no "caja b") · "Gestión que cumple" · "ángel guardián" · "me enriquecí" ·
"la tijera" · "no teme a la justicia" · etc. Ver `docs/CAPTIONS_QA.md`.

## QA
`npm run typecheck` · `qa:timeline` · `qa:captions` · `qa:assets` · `qa:stills`
(+ `scripts/contact-sheets.mjs` → `docs/qa/contact-sheet.png` y `timeline-every-10s.png`).
