# La Piedra Bruta del Aprendiz

App web instalable (PWA) para acompañar la instrucción del Primer Grado de la
Resp∴ Log∴ Simb∴ Lázaro Cárdenas No. 8. Los 33 temas del Aprendiz son 33 fragmentos de
una piedra bruta: al estudiar un tema y retirar su fragmento, aparece poco a poco la frase
que la piedra lleva dentro.

Publicada en <https://yzsntn.github.io/piedra-bruta/>.

## Contenido

- Fuente: Adolfo Terrones Benítez y Alfonso León García, *Los 33 temas del Aprendiz Masón*.
- Los 33 temas se agrupan en las tres prendas de trabajo del Aprendiz según el tema 12 del
  libro: **martillo**, **regla** y **mandil** (11 temas cada una).
- Cada tema trae idea central, sentido **filosófico**, **moral** y **esotérico**, páginas del
  libro y una pregunta para meditar.
- Los temas **reservados** (14, 15, 17, 18 y 20) muestran solo su sentido moral.
  Nunca se publican palabras, signos, toques, marchas, baterías, la edad simbólica ni
  detalles de ceremonias.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | La página completa: diseño, piedra interactiva, bitácora y ficha. |
| `temas.js` | El texto de las 33 fichas. Aquí se corrigen los contenidos. |
| `sw.js` | Service worker: guarda la app para usarla sin internet. |
| `manifest.webmanifest`, `icons/` | Datos e íconos para instalarla como app. |
| `fonts/` | Cinzel y Cormorant Garamond (licencia OFL). |
| `assets/` | Fotografías de archivo; su procedencia y licencia están en `assets/credits.json` y en el pie de la página. |
| `og-image.jpg` | Imagen que aparece al compartir el enlace. |

## Cómo corregir un texto

1. Abre `temas.js` y busca el tema por su número (`n:`).
2. Cambia solo lo que está entre comillas; conserva comas y llaves.
3. En `sw.js`, sube el número de `VERSION` (por ejemplo, de `v6.1` a `v6.2`).
   Sin este paso, las apps ya instaladas no reciben el cambio.
4. Sube los cambios a GitHub; GitHub Pages publica en unos minutos.

## Datos de los Aprendices

El avance y las notas se guardan solo en el navegador de cada dispositivo (`localStorage`),
nunca en un servidor. La app recuerda descargar un respaldo (archivo `.json`) y permite
cargarlo en otro dispositivo.
