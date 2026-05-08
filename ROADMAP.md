# Roadmap — Sitio Parroquia Nuestra Señora de la Merced

Funcionalidades pendientes, en orden de **valor / esfuerzo**.

---

## 1. SEO básico
**Esfuerzo:** ~30 min · **Estado:** ✅ hecho · **Pendiente:** submitear `sitemap.xml` a Google Search Console.

- ✅ `sitemap.xml` con las 7 páginas en la raíz.
- ✅ `robots.txt` permitiendo indexar todo + apuntando al sitemap.
- ✅ Canonical en las 7 páginas.
- ✅ JSON-LD `CatholicChurch` en home con dirección, teléfono, geo, horarios y redes.
- 🔲 Submitir el sitemap en Google Search Console (manual, una vez).

---

## 2. Pedidos de oración
**Esfuerzo:** 1-2 hs · **Estado:** ✅ hecho · **Pendiente:** crear cuenta Formspree y reemplazar `TU_FORM_ID`.

- ✅ `oracion.html` con formulario (nombre opcional, email opcional, intención requerida).
- ✅ Honeypot anti-spam (`_gotcha`) y `_subject` configurados.
- ✅ Linkeado desde `contacto.html` (CTA) y desde el chatbot.
- 🔲 Crear cuenta en https://formspree.io con email parroquial, generar form ID y reemplazar `TU_FORM_ID` en el `action` del `<form>` (oracion.html).
- 🔲 Confirmar el email destinatario en el panel de Formspree.

---

## 3. Calendario de eventos / próximas celebraciones
**Esfuerzo:** 2-3 hs · **Estado:** ✅ hecho.

- ✅ Sección "Próximas celebraciones" en home con cards y cuenta regresiva ("Faltan X días").
- ✅ Datos en `js/events.js` (array editable). Eventos pasados se filtran solos.
- ✅ Card destacada para la Fiesta Patronal (estilo `event-featured`).
- 🔲 (Opcional) Mantener el array de `js/events.js` actualizado año a año.

---

## 4. Donaciones / Cáritas online
**Esfuerzo:** ~30 min (técnico) · **Estado:** ✅ página hecha · **Bloqueante:** falta link de Mercado Pago.

- ✅ `colaborar.html` con botón Mercado Pago + 3 destinos del aporte (Cáritas, templo, catequesis).
- ✅ Linkeada desde el chatbot (FAQ Cáritas).
- 🔲 Parroquia: crear cuenta de Mercado Pago y generar link de cobro reutilizable.
- 🔲 Reemplazar `https://mpago.la/TU_LINK` en `colaborar.html` por el link real.
- 🔲 Eliminar el bloque `.donate-disabled` ("En proceso…") cuando el link esté activo.

---

## 5. Analytics privado
**Esfuerzo:** ~15 min · **Estado:** ✅ scaffolding hecho · **Pendiente:** generar token Cloudflare.

- ✅ `js/analytics.js` con bloque comentado listo, incluido en las 7 páginas.
- ✅ Modo "Free, host-only": no requiere DNS ni cambiar nameservers.
- 🔲 Crear cuenta Cloudflare → Web Analytics → Add a site → "Free, host-only".
- 🔲 Pegar el token en `js/analytics.js` (reemplazar `TU_TOKEN`) y descomentar el bloque.

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
