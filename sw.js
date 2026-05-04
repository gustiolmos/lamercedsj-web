// Service Worker — Parroquia Nuestra Señora de la Merced
// Estrategia: cache-first para assets estáticos, network con fallback al cache.
// Bumpear CACHE_NAME cuando se cambien los assets para forzar reinstalación.

const CACHE_NAME = 'lamerced-v5';
const ASSETS = [
  './',
  './index.html',
  './anuncios.html',
  './horarios.html',
  './nosotros.html',
  './contacto.html',
  './css/styles.css',
  './js/main.js',
  './js/chatbot.js',
  './manifest.json',
  './img/escudo.png',
  './img/app-icon.jpg',
  './img/fachada.jpg',
  './img/interior.jpg',
  './img/virgen.jpg',
  './img/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // No cachear requests cross-origin (Google Fonts, Facebook, OpenStreetMap embed)
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Si la página HTML no está disponible offline, servir index como fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
