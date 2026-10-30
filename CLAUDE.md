# Sitio de Rubén Ponce · guía de mantenimiento

Repositorio único de la landing y de todas las herramientas, servido por GitHub Pages en
https://rubenisaiponcebarcelo-wq.github.io/ (repositorio `rubenisaiponcebarcelo-wq/rubenisaiponcebarcelo-wq.github.io`, rama `main`).
Es HTML estático: no hay build, ni dependencias, ni framework. Cada página es un `index.html` autocontenido.

## Estructura

```
index.html                      landing (modo noche, marca v1.1)
404.html                        página de error con la marca
assets/marca/                   isotipo, favicons, og-image y tokens CSS de la marca v1.1
assets/img/                     fotos del fondo de la landing (Wikimedia Commons, crédito en el pie)
herramientas/<slug>/index.html  una carpeta por herramienta
cursos/<slug>/index.html        una carpeta por curso
archivo/<slug>/index.html       piezas retiradas: sin enlace desde la landing, con noindex
```

| Ruta | Pieza | Notas |
|---|---|---|
| `herramientas/atlas-esg/` | Atlas ESG | Diseño congelado: no tocar salvo petición expresa |
| `herramientas/diagnostico-tnfd/` | Autodiagnóstico TNFD v1.0 | Registro en Google Sheets |
| `herramientas/diagnostico-s1/` | Autodiagnóstico IFRS S1 | Registro en Google Sheets, campo `diagnostico: "NIIF S1"` |
| `herramientas/diagnostico-s2/` | Autodiagnóstico IFRS S2 | Registro en Google Sheets, campo `diagnostico: "NIIF S2"` |
| `herramientas/glosario-esg/` | Glosario ESG | |
| `herramientas/tracker-issb/` | Tracker de adopción del ISSB | |
| `cursos/de-cero-a-profesional/` | Curso De cero a profesional | Diseño congelado; guarda respuestas en Google Sheets |
| `archivo/diagnostico-s1-s2/` | Diagnóstico combinado S1+S2 | Retirado el 13 oct 2026; se conserva por si se reactiva |

Próximamente (solo en la landing, sin carpeta todavía): **Diagnóstico integrado ISSB (S1 y S2)**
y las cuatro rutas de especialización del curso.

## Reglas

- **Marca v2.0 (29 oct 2026): la landing es la referencia visual.** Fuente de verdad: la carpeta
  `Marca personal/` del proyecto local; `assets/marca/` es una copia de lo necesario (tokens, componentes,
  isotipos, favicons, og-image). Space Grotesk en titulares (700 el principal, 600 el resto), DM Sans en
  texto, JetBrains Mono solo en códigos técnicos. Papel claro, Azul Ponce `#1567B0` como único acento,
  banda azul a todo lo ancho para abrir cada pieza, botones en pastilla. Sin latón, sin negro, sin Barlow.
- **Capa de herramientas:** cada herramienta carga, después de su `<style>` propio,
  `../../assets/marca/marca.tokens.css` y `../../assets/marca/herramienta.css`. Esa capa le pone la
  cabecera de la landing, la banda azul (`#screen-intro` en diagnósticos, `.rp-hero` en las de consulta)
  y la tipografía. Una herramienta nueva debe cargarla igual.
- **Modo oscuro:** cada página carga `assets/marca/tema.js` en el `<head>` (antes del CSS). Pone
  `data-theme="light|dark"` en `<html>`, recuerda la elección en `localStorage` (`rp-tema`) y coloca el botón en
  cada elemento con `data-rp-tema` (si no hay, flota abajo a la izquierda). Las herramientas llevan
  `data-rp-herramienta="diagnostico|glosario|tracker|atlas"` en `<html>` para que `herramienta.css` sepa qué
  variables propias reasignar. Una herramienta nueva: escribe colores contra los alias `--rp-*` y pruébala en los dos modos.
- **Atlas ESG y el curso** conservan su diseño propio (Barlow; el Atlas usa latón para la familia ISSB)
  por decisión de Rubén. Solo se les cambió el favicon.
- **Cita exacta:** toda afirmación normativa lleva el párrafo o la página del estándar.
- **Texto para el estudiante:** nada de notas de producción, de piloto o de revisión en el texto visible.
- **Enlaces internos relativos:** desde una herramienta, el inicio es `../../`. Nunca URLs absolutas
  al propio dominio, para que el sitio funcione igual en local y en Pages.
- **Registros:** los diagnósticos envían a un Apps Script de Google (`APPS_SCRIPT_URL`). No cambiar
  el endpoint ni los nombres de campo sin avisar a Rubén: alimentan su hoja de cálculo.
- **Al probar los diagnósticos**, interceptar `fetch` en el navegador para no escribir datos de prueba
  en la hoja real.

## Agregar una herramienta nueva

1. Crear `herramientas/<slug>/index.html` partiendo de la plantilla `herramienta.html` de la marca
   (o de una herramienta existente). Enlace al inicio: `../../`.
2. En `index.html` (landing):
   - sumar una fila `<li class="tool">` al índice completo (el comentario del bloque explica cómo);
   - si corresponde, sumar el enlace en la tarjeta de su familia (Cursos, Autodiagnósticos, Referencia);
   - actualizar el contador "N herramientas" del hero.
3. Si pasa de "Próximamente" a activa: cambiar `tool soon` por `tool` y el `<span>` por un `<a class="tool-cta">`.
4. Probar en local (`python -m http.server --directory .`), revisar enlaces y vista móvil.
5. Commit y push a `main`. Pages publica en 1–2 minutos.

## Retirar una herramienta

Mover su carpeta a `archivo/`, añadir `<meta name="robots" content="noindex, nofollow">`, ajustar
el enlace al inicio si cambió la profundidad y quitarla de la landing.
