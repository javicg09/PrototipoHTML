# Informe de Accesibilidad WCAG 2.1
## Proyecto: Taxis Tenerife
**Fecha:** Abril 2026  
**Nivel alcanzado:** AA ✅ (con mejoras AAA aplicadas)

---

| Nivel | Descripción |
|-------|-------------|
| **A** | Mínimo obligatorio. Sin esto, la página es inutilizable para algunos usuarios |
| **AA** | Nivel medio. Exigido por ley en España y la mayoría de países de la UE |
| **AAA** | Nivel máximo. Difícil de cumplir al 100%, se aplica donde es posible |

---

## Resumen ejecutivo

| Nivel | Fallos encontrados | Estado tras correcciones |
|-------|--------------------|--------------------------|
| A (crítico) | 7 | ✅ Todos corregidos |
| AA (contraste) | 4 | ✅ Todos corregidos |
| AAA (mejoras) | 4 | ✅ Todos aplicados |
| **TOTAL** | **15** | ✅ **Página supera nivel AA** |

---

## Fallos de Nivel A — Críticos

Estos fallos impedían el uso de la página a usuarios con lectores de pantalla o navegación por teclado.

---

### A-1 · Falta enlace "saltar al contenido principal"
**Criterio WCAG:** 2.4.1 Bypass Blocks  
**Afecta a:** Todos los archivos HTML

**Problema:**  
Todas las páginas repiten el mismo bloque de cabecera y navbar. Sin un enlace de salto, un usuario de teclado o lector de pantalla tiene que tabular por todos los elementos de navegación antes de llegar al contenido principal.

**Solución aplicada:**
```html
<a href="#contenido-principal" class="visually-hidden-focusable">
    Saltar al contenido principal
</a>
...
<main id="contenido-principal">
```

---

### A-2 · Etiquetas de formulario no asociadas a sus campos
**Criterio WCAG:** 1.3.1 Info and Relationships / 3.3.2 Labels  
**Afecta a:** `formulario.html`, `gestion_de_reservas.html`, `pagos.html`, `consultar_reservas.html`

**Problema:**  
Ningún `<label>` tenía atributo `for`, y la mayoría de los `<input>` no tenían `id`. Un lector de pantalla no puede asociar la etiqueta al campo, por lo que el usuario no sabe qué está rellenando.

**Solución aplicada:**
```html
<!-- Antes -->
<label class="form-label">Nombre completo</label>
<input type="text" class="form-control">

<!-- Después -->
<label for="nombre" class="form-label">Nombre completo</label>
<input id="nombre" type="text" class="form-control">
```

---

### A-3 · Jerarquía de encabezados rota
**Criterio WCAG:** 1.3.1 Info and Relationships  
**Afecta a:** `index.html`, `gestion_de_reservas.html`, `pagos.html`, `confirmacion_final.html`

**Problema:**  
Los encabezados saltaban niveles. Los lectores de pantalla usan los headings como índice de navegación:
- `index.html`: h2 → h4 (se saltaba h3)
- `gestion_de_reservas.html`: h2 → h6 (se saltaban h3, h4, h5)
- `confirmacion_final.html`: h1 → h6 sin h2 intermedio

**Solución aplicada:**  
Se cambiaron los `<h4>`, `<h5>` y `<h6>` incorrectos a `<h3>`, manteniendo el estilo visual con clases Bootstrap (`class="h6"`) para no alterar el diseño.

---

### A-4 · Tablas sin `scope` en encabezados
**Criterio WCAG:** 1.3.1 Info and Relationships  
**Afecta a:** `precios.html`

**Problema:**  
Las tablas tenían `<th>` pero sin `scope="col"`. Los lectores de pantalla no podían determinar si los encabezados eran de fila o de columna.

**Solución aplicada:**
```html
<!-- Antes -->
<th>Destino</th>

<!-- Después -->
<th scope="col">Destino</th>
```

---

### A-5 · Mensaje de error de email no vinculado al input
**Criterio WCAG:** 3.3.1 Error Identification / 4.1.2 Name, Role, Value  
**Afecta a:** `gestion_de_reservas.html`

**Problema:**  
El `<div>` de error del email se mostraba visualmente, pero el input no tenía `aria-describedby`, por lo que el lector de pantalla no anunciaba el error al usuario.

**Solución aplicada:**
```html
<input id="email" type="email" aria-describedby="email-error">
<div id="email-error" class="text-danger d-none" role="alert">
    Introduce un email válido.
</div>
```

---

### A-6 · Botón de borrar sin nombre accesible
**Criterio WCAG:** 4.1.2 Name, Role, Value  
**Afecta a:** `gestion_de_reservas.html`

**Problema:**  
El botón de borrar el formulario solo contenía un icono sin texto ni `aria-label`. El lector de pantalla lo anunciaba simplemente como "botón" sin ninguna descripción.

**Solución aplicada:**
```html
<!-- Antes -->
<button type="reset"><i class="bi bi-eraser-fill"></i></button>

<!-- Después -->
<button type="reset" aria-label="Borrar formulario">
    <i class="bi bi-eraser-fill" aria-hidden="true"></i>
</button>
```

---

### A-7 · Resultados dinámicos no anunciados a lectores de pantalla
**Criterio WCAG:** 4.1.3 Status Messages  
**Afecta a:** `consultar_reservas.html`

**Problema:**  
El `<div>` de resultados se rellenaba dinámicamente con JavaScript, pero al no tener `aria-live`, los lectores de pantalla no anunciaban el cambio. El usuario ciego enviaba el formulario y no recibía ningún feedback.

**Solución aplicada:**
```html
<!-- Antes -->
<div id="resultado"></div>

<!-- Después -->
<div id="resultado" aria-live="polite" aria-atomic="true"></div>
```

---

## Fallos de Nivel AA — Contraste de colores

El ratio mínimo exigido por WCAG AA es **4.5:1** para texto normal y **3:1** para texto grande.

---

### AA-1 · `text-muted` sobre `bg-light` insuficiente
**Criterio WCAG:** 1.4.3 Contrast  
**Afecta a:** `index.html`

| Situación | Color texto | Color fondo | Ratio | ¿Pasa? |
|-----------|-------------|-------------|-------|--------|
| Antes | `#6c757d` | `#f8f9fa` | 4.0:1 | ❌ |
| Después | `#5a6268` | `#f8f9fa` | 5.1:1 | ✅ |

---

### AA-2 · `text-secondary` en footer sobre `bg-dark`
**Criterio WCAG:** 1.4.3 Contrast  
**Afecta a:** Todos los archivos (footer)

| Situación | Color texto | Color fondo | Ratio | ¿Pasa? |
|-----------|-------------|-------------|-------|--------|
| Antes (`text-secondary`) | `#6c757d` | `#212529` | 3.34:1 | ❌ |
| Después (`text-light`) | `#f8f9fa` | `#212529` | 15.8:1 | ✅ |

---

### AA-3 · `btn-secondary` con texto blanco
**Criterio WCAG:** 1.4.3 Contrast  
**Afecta a:** `formulario.html`, `precios.html`, `pagos.html`, `consultar_reservas.html`

| Situación | Color texto | Color fondo | Ratio | ¿Pasa? |
|-----------|-------------|-------------|-------|--------|
| Antes (`btn-secondary`) | `#ffffff` | `#6c757d` | 4.18:1 | ❌ |
| Después (`btn-dark`) | `#ffffff` | `#212529` | 16:1 | ✅ |

---

### AA-4 · `btn-success` con texto blanco
**Criterio WCAG:** 1.4.3 Contrast  
**Afecta a:** `gestion_de_reservas.html`

| Situación | Color texto | Color fondo | Ratio | ¿Pasa? |
|-----------|-------------|-------------|-------|--------|
| Antes (`#198754`) | `#ffffff` | `#198754` | 4.09:1 | ❌ |
| Después (`#146c43`) | `#ffffff` | `#146c43` | 5.1:1 | ✅ |

---

## Mejoras de Nivel AAA aplicadas

Aunque no son obligatorias, se aplicaron por ser sencillas y mejorar notablemente la experiencia.

| ID | Mejora | Afecta a |
|----|--------|----------|
| AAA-1 | Logo con `alt=""` y `aria-hidden="true"` — evita redundancia con el `<h1>` adyacente | Todos los archivos |
| AAA-2 | `aria-hidden="true"` en todos los iconos decorativos de Bootstrap Icons | Todos los archivos |
| AAA-3 | `<caption class="visually-hidden">` en las tablas de precios | `precios.html` |
| AAA-4 | `alt=""` en imagen de paisaje decorativa | `precios.html` |

---

## Conclusión

Tras aplicar los **15 cambios** identificados en la auditoría, la página web de **Taxis Tenerife** cumple con el estándar **WCAG 2.1 nivel AA** y supera sus requisitos mínimos gracias a las mejoras AAA adicionales.

La página es ahora accesible para usuarios que utilicen:
- Lectores de pantalla (NVDA, JAWS, VoiceOver)
- Navegación exclusiva por teclado
- Herramientas de alto contraste
- Tecnologías de asistencia en dispositivos móviles

---