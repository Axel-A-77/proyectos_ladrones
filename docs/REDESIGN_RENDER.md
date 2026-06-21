# Versión alternativa — Infografía ilustrada

Esta rama contiene una segunda dirección artística del video, preparada como respaldo de la versión principal.

## Dirección visual

- Fondo amarillo cálido uniforme en todas las escenas ilustradas.
- Sin subtítulos visibles: la voz narra; la pantalla muestra títulos, palabras clave e ilustraciones.
- Diseño de lámina 16:9: primero se construye una composición final clara y luego se revelan sus capas.
- Palabras integradas a objetos: carteles, sellos, etiquetas, carpetas y precios.
- Personajes del sistema SVG `PersonBase`.
- Intercalado entre el presentador y las láminas ilustradas.

## Criterio de montaje

El presentador aparece en:

- saludo inicial;
- tesis humana de apertura;
- presentación de alcalde, gobernador, congresista y presidente;
- respiración al cerrar el gobernador;
- introducción de la red de cómplices;
- introducción de la hoja de gastos;
- tesis final;
- saludo por el Día del Padre.

Las láminas ilustradas cubren metáforas, comparaciones, cadenas causales y remates visuales.

## Medio necesario

Antes de renderizar debe existir:

```text
assets/video/papa_h264.mp4
```

El archivo no se guarda en Git por su tamaño.

## Preparación

```bash
npm ci
npm run captions
npm run typecheck
npm run qa:timeline
npm run qa:captions
npm run qa:assets
```

## Render final

```bash
npm run render
```

Salida esperada:

```text
out/ladrones_FINAL.mp4
```

## Diferencias respecto de `main`

- Se eliminó la capa visible de subtítulos.
- Todas las animaciones comparten fondo amarillo.
- Se sustituyeron listas de texto por layouts de infografía.
- Se añadieron rutas causales, comparaciones, paneles, etiquetas y sellos.
- Se ajustaron los cortes para devolver periódicamente el video al rostro del presentador.

## Estado

La rama está diseñada para quedar lista para render cuando el medio del presentador esté disponible localmente. La validación final debe incluir un render completo y revisión de sincronía con el archivo real de video.
