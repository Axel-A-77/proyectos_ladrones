# QA visual

Imágenes:
- `docs/qa/contact-sheet.png` — un fotograma representativo de cada escena (28).
- `docs/qa/timeline-every-10s.png` — un fotograma cada 10s (extraído del MP4 final).
- `docs/qa/contact-sheet.html` — versión navegable.
- `docs/qa/uni_*.png`, `pilot_*.png`, `audit_*.png`, `people.png` — verificaciones puntuales.

## Checklist (revisado en los stills)
- [x] Ningún comienzo vacío — composición base desde frame 0 en cada ANIM.
- [x] Protagonista grande y legible (h≈420–640).
- [x] Subtítulos como última capa, ≤2 líneas, sin tapar rostros.
- [x] Ningún elemento importante debajo de y=850.
- [x] Medallón de capítulo (esq. sup. der.) sin tapar títulos ni personajes.
- [x] Los objetos de cada metáfora permanecen hasta su cierre (acumulación).
- [x] Estilo SVG consistente: TODOS los personajes humanos son PersonBase (sin clipart incompatible).
- [x] Sin marca "Excel" (se usa "HOJA DE GASTOS").
- [x] TypeScript pasa; qa:timeline/captions/assets sin errores.

## Notas
- Los PNG que quedan son props detallados (árbol, casa de playa, puente, hospital, Caribe,
  piedra, magia, mueble, caen-arriba, comisión, champiñón, inauguración, kiosko, whatsapp);
  conviven con PersonBase sin chocar (son objetos/escenas, no personajes humanos).
- `timeline-every-10s.png` se genera tras el render con ffmpeg (extrae del MP4, sin re-render
  pesado) para no saturar el disco con 100 renderStill.
