# Roadmap — Sitio Parroquia Nuestra Señora de la Merced

Funcionalidades pendientes, en orden de **valor / esfuerzo**.

---

## 1. SEO básico
**Esfuerzo:** ~30 min · **Estado:** pendiente

Para que cuando alguien busque "parroquia san justo santa fe" en Google aparezca el sitio.

- Crear `sitemap.xml` con las 5 páginas y submitearlo a Google Search Console.
- Crear `robots.txt` permitiendo indexar todo.
- Verificar que cada página tenga `<title>` y `<meta description>` distintos y descriptivos (ya están — repasar nomás).
- Agregar `<meta name="keywords">` por página (relevancia menor, pero suma).
- Agregar JSON-LD con schema `Church` o `PlaceOfWorship` en la home (datos estructurados que Google entiende).

---

## 2. Pedidos de oración
**Esfuerzo:** 1-2 hs · **Estado:** pendiente

Formulario donde un fiel deja una intención de oración y le llega por email a la secretaría parroquial.

- Página nueva `oracion.html` o sección dentro de `contacto.html`.
- Formulario con: nombre (opcional), intención (textarea), email de contacto (opcional).
- Backend: **Formspree** (free tier 50 envíos/mes, alcanza de sobra). Solo es agregar `action="https://formspree.io/f/XXXXX"` al `<form>`. Sin código de servidor.
- Mensaje de gracias visual al enviar.
- Importante: el email destinatario lo configura el dueño del Formspree (vos o la parroquia).

Alternativas a Formspree: Web3Forms, Getform, FabForm — todas tienen free tier similar.

---

## 3. Calendario de eventos / próximas celebraciones
**Esfuerzo:** 2-3 hs · **Estado:** pendiente

Tarjeta visual en la home con los próximos eventos: Fiesta Patronal (24/sept), Semana Santa, Navidad, etc.

- Componente con cuenta regresiva ("Faltan 142 días para la Patrona").
- Datos en un JSON simple, ordenados por fecha, filtrando los pasados.
- Visualmente: lista o cards con fecha grande + título + breve descripción.
- Opcional avanzado: vista de calendario mensual (más trabajo, menos ROI).

---

## 4. Donaciones / Cáritas online
**Esfuerzo:** ~30 min (técnico) · **Estado:** pendiente

Permite colaborar con un click vía Mercado Pago.

- Página nueva `colaborar.html` (o sección en `nosotros.html`).
- La parroquia genera un **link de cobro** en Mercado Pago (cuenta institucional o personal autorizada).
- Embebemos botón "Colaborar" que abre el link.
- Texto explicativo: a qué se destina lo recaudado (Cáritas, mantenimiento del templo, etc.).
- **Bloqueante:** requiere que la parroquia tenga cuenta de Mercado Pago activa.

---

## 5. Analytics privado
**Esfuerzo:** ~15 min · **Estado:** pendiente

Saber cuánta gente entra, desde dónde, qué páginas leen — sin invadir privacidad.

- **Cloudflare Web Analytics** (gratis, sin cookies, sin tracking de usuarios). Se activa con un script chico.
- Alternativa: **Plausible** (paid, $9/mes) o **Umami self-hosted** (gratis pero requiere servidor).
- Útil para decidir qué mejorar después: si nadie entra a "Nosotros" tal vez hay que reorganizar el menú.

---

## 6. Migrar a CMS real (Astro + Sanity)
**Esfuerzo:** 1 tarde · **Estado:** pendiente

Para que el párroco publique anuncios desde un panel visual sin tocar código.

- Migrar el HTML estático a Astro (mismo diseño, mismo deploy en GitHub Pages).
- Configurar Sanity Studio: schema con `Anuncio` (título, fecha, cuerpo, imagen).
- Sanity ofrece editor WYSIWYG en `parroquia.sanity.studio`.
- Deploy del studio a Sanity gratis.
- Quedan free tier ambos: Sanity (3 usuarios + miles de docs) + GitHub Pages.

**Cuándo hacerlo:** recién cuando el párroco/secretaría esté listo para tomar la posta. Antes de eso, mantener el HTML editado a mano es más simple.

---

## 7. Reactivar botón de WhatsApp
**Esfuerzo:** 5 min · **Estado:** condicionado

Si la parroquia consigue un número de WhatsApp dedicado (sea de la secretaría, párroco o teléfono nuevo de la parroquia), reactivar el botón flotante verde.

- En `css/styles.css`: borrar la regla `.wa-float { display: none !important; }`.
- En las 5 HTML: actualizar el número (buscar `5493498427515`).

---

## Otras ideas que pueden venir bien algún día

- **Galería de fotos** de eventos parroquiales y comunidad.
- **Página de equipo / clero** con foto + bio del párroco, vicarios, secretaría.
- **Embed de homilías / podcast** si suben audio a YouTube/Spotify.
- **Newsletter** vía Mailchimp free tier.
- **Modo oscuro** (poco usado en sitios parroquiales, baja prioridad).
