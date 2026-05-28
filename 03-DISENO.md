# Diseño — "Indie Dev Japonés a las 2am"

## Identidad Visual

**Nombre del proyecto:** 夜間計算 — Yakan Keisan (Cálculo Nocturno)

**Concepto:** Un apartamento en Shibuya, 2am, café derramado sobre apuntes de微分方程式. La pantalla brilla en la oscuridad. No es un dashboard corporativo. No es un SaaS. Es una herramienta construida por alguien que necesita entender — y la necesita ahora. Minimal, preciso, con el peso del vacío nocturno. La matemática habla por sí sola. La UI apenas existe. Lo que queda respira.

**Mood:** Cyberpunk silencioso. No neon agresivo — neon visto desde un tatami. Terminal limpia. Números que se sienten como código. Oscuro como primera lengua.

---

## Paleta de Colores

### Dark Mode (primario, el proyecto vive en oscuro)

| Elemento | Color | Hex | Uso |
|---|---|---|---|
| Fondo base | Void Black | `#0A0A0C` | Body, fondo principal |
| Fondo elevado | Deep Night | `#111114` | Cards, sidebar, inputs |
| Fondo superficie | Charcoal | `#18181B` | Hover, campos activos |
| Texto principal | Ghost White | `#E4E4E7` | Headings, datos, números |
| Texto secundario | Mist | `#71717A` | Labels, descripciones |
| Texto terciario | Dim | `#3F3F46` | Placeholders, disabled |
| Primario | Electric Cyan | `#06D6A0` | Botones, links, acentos principales, active |
| Primario glow | Cyan Aura | `#06D6A033` | Box-shadow, focus ring, hover background |
| Secundario | Warm Amber | `#F5A623` | Acentos secundarios, highlights |
| Alerta | Signal Red | `#EF4444` | Errores, límites, alertas críticas |
| Éxito | Neon Mint | `#34D399` | Convergencia, resultados correctos |
| Info | Soft Lavender | `#A78BFA` | Fórmulas, tooltips, info |
| Borde | Subtle Edge | `#27272A` | Bordes de cards, inputs, separators |
| Borde glow | Neon Edge | `#06D6A044` | Bordes activos con resplandor cyan |
| Muted surface | Ash | `#1E1E22` | Tablas striped, backgrounds sutiles |

### Light Mode (secundario, para los que prefieren luz de día)

| Elemento | Color | Hex |
|---|---|---|
| Fondo base | Paper | `#F4F4F5` |
| Fondo elevado | White | `#FFFFFF` |
| Texto principal | Ink | `#18181B` |
| Texto secundario | Smoke | `#71717A` |
| Primario | Deep Cyan | `#059669` |
| Secundario | Burnt Amber | `#D97706` |
| Borde | Zinc 200 | `#E4E4E7` |

---

## Texturas y Efectos

### Dot Grid (fondo sutil)

```css
background-image: radial-gradient(circle, #27272A 1px, transparent 1px);
background-size: 24px 24px;
```

Fondo de la página principal. Puntos diminutos como papel cuadriculado de ingeniería. Sutil, casi invisible, da textura sin distraer.

### Scanlines (efecto CRT suave, solo en hero)

```css
background-image: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 0, 0, 0.03) 2px,
  rgba(0, 0, 0, 0.03) 4px
);
```

Solo en el hero section. Da sensación de monitor viejo sin ser molesto.

### Grain (ruido de película)

```css
background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
opacity: 0.02;
```

Capa overlay ultradelgada sobre todo. No se nota conscientemente pero da profundidad. Se implementa como un pseudo-element `:before` en el body.

### Glow Effects

- **Botón primario:** `box-shadow: 0 0 20px #06D6A033, 0 0 60px #06D6A011`
- **Card activa:** `border: 1px solid #06D6A044` con `box-shadow: 0 0 30px #06D6A015`
- **Número de resultado:** `text-shadow: 0 0 10px #06D6A055`
- **Línea de gráfica primaria:** glow cyan suave debajo
- **Focus en inputs:** `border-color: #06D6A0; box-shadow: 0 0 0 3px #06D6A022`

---

## Tipografía

| Uso | Fuente | Peso | Tamaño | Estilo |
|---|---|---|---|---|
| Título principal (H1) | Geist Mono | 700 | 2.5rem (40px) | Uppercase, tracking-wide, cyan glow |
| Título de módulo (H2) | Geist Sans | 300 | 2rem (32px) | Light, espaciado |
| Título de sección (H3) | Geist Sans | 500 | 1.25rem (20px) | Normal |
| Subtítulo (H4) | Geist Sans | 400 | 1.125rem (18px) | Normal |
| Body | Geist Sans | 400 | 0.9375rem (15px) | Normal |
| Small/Caption | Geist Sans | 400 | 0.8125rem (13px) | Muted |
| Código/Números | Geist Mono | 600 | 1rem (16px) | Monospace, cyan tint |
| Números de resultado | Geist Mono | 700 | 2rem (32px) | Mono, glow, NumberFlow |
| Datos de tabla | Geist Mono | 400 | 0.8125rem (13px) | Monospace |
| Labels formulario | Geist Sans | 500 | 0.8125rem (13px) | Uppercase, tracking-wider |
| Fórmulas | KaTeX | - | 1.1rem | Color lavender en dark |
| Botones | Geist Sans | 500 | 0.875rem (14px) | Uppercase, tracking-wider |

**Regla:** Geist Mono para todo lo que sea numérico, datos, código. Geist Sans para texto legible. KaTeX para fórmulas. Geist Mono en el H1 del hero para sentir como una terminal.

---

## Espaciado y Grid

- **Grid base:** 4px (más denso, más japonés)
- **Padding de página:** 32px lateral, 48px vertical
- **Max width:** 1200px (más estrecho = más enfocado)
- **Gap entre secciones:** 48px (mucho aire, como ma)
- **Gap entre cards:** 16px
- **Padding de card:** 24px
- **Sidebar width:** 260px (compacta, no invasion)

La filosofía: **ma** (間) — el espacio vacío es tan importante como el contenido. No amontonar. Dejar respirar.

---

## Componentes de Diseño

### Navbar

- Transparente, borrosa: `backdrop-blur-xl bg-void-black/70`
- Logo "夜間計算" en Geist Mono, cyan, tracking-widest, pequeño glow
- A la derecha: toggles minimalistas (tema, idioma si aplica)
- Línea inferior: `border-bottom: 1px solid #27272A`
- Altura: 56px, slim
- Fixed top, aparece/desaparece con scroll (Motion)

### Sidebar

- Fondo `#111114`, sin borde derecho, se funde con el contenido
- Módulos como lista vertical minimalista:
  - Icono pequeño (14px) + nombre
  - Texto en `mist` cuando inactivo, `electric-cyan` cuando activo
  - Indicador: barra vertical cyan 2px a la izquierda del activo
  - Hover: texto en `ghost-white`, sutiil
- Separador entre navegación y módulos: línea `#27272A`
- En móvil: drawer desde la izquierda con backdrop oscuro
- Animación: slide suave con Motion, spring physics

### Card (contenedor base)

- Fondo `#111114`
- Borde `1px solid #27272A` → hover: `1px solid #06D6A044`
- Border-radius: `8px` (no redondeado excesivo, más sharp)
- Sin shadow por default, glow sutil en hover
- Padding: 24px
- Cuando la card muestra resultados: Shimmer border de Magic UI

### Formulario — Estilo Terminal

La estética de los inputs debe sentirse como una terminal, no como un formulario corporate:

- **Labels:** uppercase, tracking-wider, font-size 11px, color `mist`, ARIA label always
- **Inputs:** fondo `#0A0A0C`, borde `#27272A`, focus: `#06D6A0` con glow ring
- **Inputs monospace:** para valores numéricos, usar Geist Mono
- **Select:** estilo custom con flecha angular, no chevron redondeado
- **Botón "Calcular":**
  - Fondo cyan, texto void-black
  - Hover: brightness up + glow expansion
  - Active: scale(0.97)
  - uppercase, tracking-widest
- **Botón "Limpiar":** ghost button, sin borde, texto muted, hover: texto ghost-white
- **Validación:** error en signal red, sin fondo rojo. Texto pequeño debajo del input
- **Grid:** 2 columnas en desktop, 1 en móvil, gap 16px

### Tabla de Iteraciones — Estilo Logs

- Fondo `#0A0A0C` (más oscuro que la card, como un log)
- Headers: uppercase, tracking-wider, font-size 11px, color `mist`
- Rows: Geist Mono 13px
- Striped rows: alternando `#0A0A0C` y `#111114`
- Fila final (resultado): texto en electric-cyan
- Líneas horizontales sutiles entre filas: `1px solid #1E1E22`
- Sin bordes verticales
- Scroll horizontal con scrollbar custom (thin, cyan)

### Gráfica — Estilo Monitor

- Contenedor con fondo `#0A0A0C`, border `1px solid #27272A`
- Grid lines: `#1E1E22`, dashed
- Axis labels: Geist Mono 11px, color `mist`
- Series:
  - Método 1: Electric Cyan `#06D6A0`
  - Método 2: Warm Amber `#F5A623`
  - Método 3: Soft Lavender `#A78BFA`
  - Datos originales: Mist dots `#71717A`
  - Línea crítica: Signal Red `#EF4444`, dashed, con glow
- Tooltip: fondo `#18181B`, borde cyan, Geist Mono
- Animación de entrada: las líneas se dibujan de izquierda a derecha
- Glow de las líneas: filter drop-shadow cyan suave

### ResultCard — Estilo Readout

- Fondo `#111114`, border-left 3px en color semántico (cyan/amber/red/mint)
- Número: Geist Mono 700 32px, NumberFlow animated
- Glow del número: `text-shadow` con el color semántico
- Label: uppercase, 11px, tracking-widest, muted
- Animación: el número aparece con glitch suave (skewX momentáneo)

### InterpretationCard — Estilo Nota

- Fondo `#06D6A008` (cyan ultra transparente)
- Border-left: 3px solid electric-cyan
- Icono: luz de info minimalista, cyan
- Texto: Geist Sans normal, color ghost-white
- Label arriba: uppercase "INTERPRETACIÓN" en muted

### FormulaDisplay — Estilo黑板

- Fondo `#0A0A0C` con borde `1px solid #27272A`
- KaTeX renderizado en color lavender `#A78BFA`
- Label arriba: nombre del método en Geist Mono 11px, uppercase, cyan
- Padding generoso (24px)
- Animación: fade-in con slight scale (0.98 → 1) al cambiar método
- Borde izquierdo 3px cyan

---

## Animaciones

| Elemento | Animación | Librería | Detalle |
|---|---|---|---|
| Transición entre páginas | Blur + fade | Motion | La página vieja se va con blur, la nueva entra nítida |
| Aparición de resultados | Stagger fade-up | Motion | ResultCards aparecen una por una, 80ms de delay |
| Números de resultado | Glitch + count up | NumberFlow | El número titila una vez (skewX rápido) y sube |
| Gráficas | Draw-in desde izquierda | Recharts + Motion | La línea se dibuja, no aparece de golpe |
| Cards | Border shimmer | Magic UI | Borde con brillo que viaja suavemente |
| Botón calcular | Pulse glow | Motion | Al hacer hover, el glow se expande. Al click, se contrae |
| Formulario error | Shake horizontal | Motion | 3 shakes rápidos pocos píxeles |
| Tabla filas | Fade in stagger | Motion | Las filas aparecen de arriba a abajo |
| Navbar | Blur de fondo | CSS | backdrop-blur-xl, always |
| Sidebar | Slide con spring | Motion | Physics-based, no linear |
| Fórmula al cambiar | Scale + fade | Motion | 0.98 → 1 con opacity 0 → 1 |
| Hover en card | Border glow | CSS | border transiciona a cyan con box-shadow |
| Logo | Typewriter | Motion | Efecto de escritura al cargar la página |
| Página error | Glitch | Motion | El texto hace un glitch rápido (skew + translate) |

---

## Layout por Módulo

```
┌──────────────────────────────────────────────────────────────────┐
│  夜間計算   ····  Sistemas  Raíces  Interp  Integral  EDOs  ◐  │
├──────────┬───────────────────────────────────────────────────────┤
│          │                                                       │
│  ◆ Sist. │  SISTEMAS DE ECUACIONES LINEALES                    │
│  ○ Raíces│  Optimización de abastecimiento y transporte         │
│  ○ Inter.│                                                       │
│  ○ Integ.│  ┌──────────────────────────────────────────────────┐│
│  ○ EDOs  │  │ Método: [Jacobi ▾]      f(x) = ...              ││
│          │  └──────────────────────────────────────────────────┘│
│ ──────── │                                                       │
│          │  ┌──────────────────────────────────────────────────┐│
│  CONTEXTO│  │  A₁₁  A₁₂  A₁₃  │  b₁                          ││
│  ─────── │  │  A₂₁  A₂₂  A₂₃  │  b₂    Tolerancia [1e-6]     ││
│  ─────── │  │  A₃₁  A₃₂  A₃₃  │  b₃    Iteraciones  [100]    ││
│          │  │                                                    ││
│          │  │           [ CALCULAR ]   limpiar                   ││
│          │  └──────────────────────────────────────────────────┘│
│          │                                                       │
│          │  ┌────────┐  ┌────────┐  ┌────────┐                 │
│          │  │ x₁     │  │ x₂     │  │ x₃     │                 │
│          │  │ 12.7852│  │ 5.3411 │  │ 8.9023 │                 │
│          │  └────────┘  └────────┘  └────────┘                 │
│          │                                                       │
│          │  ┌───────────────────────┐ ┌──────────────────────┐ │
│          │  │  Convergencia         │ │  i  x₁     error     │ │
│          │  │  ╭─╮  ── ── ──      │ │  1  8.2    1.2e-1    │ │
│          │  │  │  │   ╲            │ │  2  10.5   3.4e-2    │ │
│          │  │  ╰─╯     ─── ── ──  │ │  ...                   │ │
│          │  └───────────────────────┘ └──────────────────────┘ │
│          │                                                       │
│          │  ┌──────────────────────────────────────────────────┐│
│          │  │ ■ El sistema converge en 12 iteraciones. La     ││
│          │  │ zona norte recibe 12.78 unidades, mientras que   ││
│          │  │ la zona sur queda más vulnerable con solo 5.34.  ││
│          │  └──────────────────────────────────────────────────┘│
├──────────┴───────────────────────────────────────────────────────┤
│  Yakan Keisan v1.0 · Métodos Numéricos · 2025                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Responsive

| Breakpoint | Ancho | Sidebar | Grid |
|---|---|---|---|
| Móvil | <640px | hidden (drawer desde izquierda) | 1 col |
| Tablet | 640-1024px | hidden (drawer desde izquierda) | 2 cols |
| Desktop | >1024px | visible (260px) | 2 cols |
| Wide | >1400px | visible | 3 cols en resultados |

---

## Página de Inicio — Hero

```
┌──────────────────────────────────────────────────────────────┐
│  夜間計算                                               ◐    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                                                              │
│              夜間計算                                         │
│              YAKAN KEISAN                                    │
│                                                              │
│      Simulación numérica de abastecimiento,                  │
│      precios y conflicto social en crisis.                   │
│                                                              │
│      Cinco módulos. Quince métodos.                         │
│      Un país en los datos.                                   │
│                                                              │
│              [ INICIAR SIMULACIÓN ]                         │
│                                                              │
│       ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·               │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ ◇ SIST.  │  │ ◇ RAÍCES │  │ ◇ INTERP. │                 │
│  │ LINEALES │  │          │  │          │                   │
│  └──────────┘  └──────────┘  └──────────┘                  │
│  ┌──────────┐  ┌──────────┐                                 │
│  │ ◇ INTEG. │  │ ◇  EDOs  │                                 │
│  │          │  │          │                                 │
│  └──────────┘  └──────────┘                                 │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  En el contexto actual, el país enfrenta problemas de       │
│  abastecimiento, transporte, precios y conflicto social.    │
│  Este proyecto usa métodos numéricos para modelar y         │
│  simular esos escenarios.                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

El hero tiene:
- Logo en Geist Mono uppercase con cyan glow
- Tipo animación: efecto typewriter que escribe "YAKAN KEISAN"
- Dot grid visible sutilmente de fondo
- Scanlines ultradelgadas
- Cards de módulos con hover glow cyan
- Botón principal con pulse glow cyan

---

## Página de Conclusiones

Fondo oscuro. Secciones separadas por líneas sutiles. Texto en Geist Sans, preguntas en Geist Mono. Sin cards excesivas. Más proximidad a un ensayo que a un dashboard.

---

## Detalles Especiales

### Cursor personalizado

No necessário, pero si se quiere: cursor crosshair en las gráficas.

### Scrollbar custom

Thin, color cyan cuando hover, `#1E1E22` por default.

### Selection color

Texto seleccionado: fondo cyan con texto void-black.

### Placeholder de inputs

Texto en `dim` (#3F3F46), estilo terminal: `> ingrese valor aquí_`

### Loading state

Cuando se está calculando: el botón cambia a un spinner minimalista, y los resultados muestran un shimmer effect (Magic UI).

### Error state

Errores en signal red, sin fondo. Texto pequeño. Shake del formulario.

### Vacío

Cuando no hay resultados: texto "Sin datos. Ingrese parámetros y presione calcular." en muted, centrado, Geist Mono.

### Favicon

Un ◇ (diamond) en cyan sobre fondo negro. SVG simple.

### SEO

- Title: "夜間計算 — Simulación Numérica de Crisis"
- Description: "Simulación interactiva de abastecimiento, precios y conflicto social usando métodos numéricos."
- Og-image: captura del hero con el título visible