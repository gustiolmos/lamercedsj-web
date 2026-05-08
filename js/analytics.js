// Analytics — placeholder.
// Recomendado: Cloudflare Web Analytics (gratis, sin cookies, RGPD-friendly).
// NO requiere apuntar el DNS a Cloudflare: el modo "Free, host-only" funciona sólo con este beacon.
//
// Activación (una sola vez):
//   1) Crear/entrar a https://dash.cloudflare.com
//   2) Web Analytics → Add a site → seleccionar "Free, host-only"
//   3) Copiar el token (string de ~32 chars) y pegarlo abajo en TU_TOKEN
//   4) Descomentar el bloque (quitar las líneas /* y */)
//
// Mientras esté comentado, no se carga nada y no hay tracking.

/*
(function () {
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', '{"token": "TU_TOKEN"}');
  document.head.appendChild(s);
})();
*/
